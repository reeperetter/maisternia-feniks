/* Phoenix Art shipping autocomplete proxy for Cloudflare Workers.
 * Store NP_API_KEY, UKRPOSHTA_BEARER and ALLOWED_ORIGIN as Worker variables/secrets.
 * Never put carrier credentials into the public website JavaScript.
 */
const NP_URL = 'https://api.novaposhta.ua/v2.0/json/';
const UP_BASE = 'https://www.ukrposhta.ua/address-classifier-ws/';

function corsHeaders(origin, env) {
  const allowed = (env.ALLOWED_ORIGIN || '').split(',').map(x => x.trim()).filter(Boolean);
  const allowOrigin = allowed.includes(origin) ? origin : (allowed.includes('*') ? '*' : 'null');
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  };
}
function json(data, status, origin, env) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders(origin, env) });
}
function entries(json) {
  const e = json?.Entries?.Entry ?? json?.entries ?? json?.data ?? [];
  return Array.isArray(e) ? e : (e ? [e] : []);
}
async function np(env, modelName, calledMethod, methodProperties) {
  if (!env.NP_API_KEY) throw new Error('NP_API_KEY is not configured');
  const response = await fetch(NP_URL, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: env.NP_API_KEY, modelName, calledMethod, methodProperties })
  });
  const body = await response.json();
  if (!response.ok || body.success !== true) throw new Error((body.errors || ['Nova Poshta API error']).join('; '));
  return body.data || [];
}
async function up(env, endpoint, params) {
  if (!env.UKRPOSHTA_BEARER) throw new Error('UKRPOSHTA_BEARER is not configured; Ukrposhta issues this token for API integration');
  const url = new URL(endpoint, UP_BASE);
  for (const [key, value] of Object.entries(params)) if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value);
  const response = await fetch(url, { headers: { 'Authorization': `Bearer ${env.UKRPOSHTA_BEARER}`, 'Accept': 'application/json' } });
  const text = await response.text();
  let body;
  try { body = JSON.parse(text); } catch { throw new Error(`Ukrposhta returned non-JSON response (${response.status})`); }
  if (!response.ok) throw new Error(`Ukrposhta API error (${response.status})`);
  return entries(body);
}
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders(origin, env) });
    if (request.method !== 'POST') return json({ success: false, error: 'POST required' }, 405, origin, env);
    const allowed = (env.ALLOWED_ORIGIN || '').split(',').map(x => x.trim()).filter(Boolean);
    if (!allowed.includes('*') && !allowed.includes(origin)) return json({ success: false, error: 'Origin not allowed' }, 403, origin, env);
    let body;
    try { body = await request.json(); } catch { return json({ success: false, error: 'Invalid JSON' }, 400, origin, env); }
    const url = new URL(request.url);
    try {
      let data;
      if (url.pathname === '/api/nova/cities') {
        const query = String(body.query || '').trim();
        if (query.length < 2) return json({ success: true, data: [] }, 200, origin, env);
        data = (await np(env, 'Address', 'getCities', { FindByString: query, Limit: 20 })).map(x => ({
          label: [x.Description, x.AreaDescription, x.RegionsDescription].filter(Boolean).join(', '), ref: x.Ref, id: x.Ref
        }));
      } else if (url.pathname === '/api/nova/branches') {
        const cityRef = String(body.cityRef || '');
        const query = String(body.query || '').trim();
        if (!cityRef) return json({ success: true, data: [] }, 200, origin, env);
        const props = { CityRef: cityRef, FindByString: query, Limit: 20 };
        if (body.type === 'locker') {
          const types = await np(env, 'Address', 'getWarehouseTypes', { FindByString: 'Поштомат' });
          const locker = types.find(x => /поштомат/i.test(x.Description || ''));
          if (locker?.Ref) props.TypeOfWarehouseRef = locker.Ref;
        }
        data = (await np(env, 'Address', 'getWarehouses', props)).map(x => ({ label: x.Description, ref: x.Ref, id: x.Ref, number: x.Number }));
      } else if (url.pathname === '/api/ukrposhta/cities') {
        const query = String(body.query || '').trim();
        if (query.length < 2) return json({ success: true, data: [] }, 200, origin, env);
        data = (await up(env, 'get_city_by_region_id_and_district_id_and_city_ua', { city_ua: query })).map(x => ({
          label: [x.SHORTCITYTYPE_UA || x.CITYTYPE_UA, x.CITY_UA, x.DISTRICT_UA, x.REGION_UA].filter(Boolean).join(' '),
          id: String(x.CITY_ID || ''), ref: String(x.CITY_ID || ''), city: x.CITY_UA, region: x.REGION_UA
        })).filter(x => x.id && x.label);
      } else if (url.pathname === '/api/ukrposhta/branches') {
        const cityId = String(body.cityId || '');
        const query = String(body.query || '').trim().toLocaleLowerCase('uk');
        if (!cityId) return json({ success: true, data: [] }, 200, origin, env);
        const rows = await up(env, 'get_postoffices_by_city_id', { city_id: cityId });
        data = rows.map(x => {
          const address = [x.STREETTYPE_UA, x.STREET_UA, x.HOUSENUMBER].filter(Boolean).join(' ');
          const name = [x.POSTINDEX, x.POSTFILIALNAME || x.TYPE_SHORT, address].filter(Boolean).join(' — ');
          return { label: name, id: String(x.ID || x.POSTINDEX || ''), index: String(x.POSTINDEX || ''), address, city: x.CITY_UA || '' };
        }).filter(x => x.id && (!query || `${x.label} ${x.index}`.toLocaleLowerCase('uk').includes(query))).slice(0, 50);
      } else {
        return json({ success: false, error: 'Unknown endpoint' }, 404, origin, env);
      }
      return json({ success: true, data }, 200, origin, env);
    } catch (error) {
      // Do not return upstream credentials or raw response bodies to the browser.
      return json({ success: false, error: String(error.message || 'Upstream API error').slice(0, 220) }, 502, origin, env);
    }
  }
};
