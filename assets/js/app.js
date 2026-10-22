(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const money = n => `${Number(n).toLocaleString('uk-UA')} ₴`;
  const getCart = () => { try { return JSON.parse(localStorage.getItem('art-cart') || '[]'); } catch { return []; } };
  const saveCart = cart => { localStorage.setItem('art-cart', JSON.stringify(cart)); updateCartCount(); };
  function updateCartCount(){ const count = getCart().reduce((n,item)=>n+item.qty,0); $$('.cart-count').forEach(el=>{el.textContent=count;el.hidden=count===0;}); }
  function addToCart(id){ const product=window.ART_PRODUCTS?.find(p=>p.id===id); if(!product)return; const cart=getCart(); const found=cart.find(i=>i.id===id); if(found)found.qty++; else cart.push({id,qty:1}); saveCart(cart); toast('Додано до кошика'); }
  function toast(text){ let el=$('.toast'); if(!el){el=document.createElement('div');el.className='toast';el.setAttribute('role','status');document.body.append(el);} el.textContent=text;el.classList.add('is-visible');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove('is-visible'),2400); }
  function card(p){return `<article class="product-card"><a class="product-card__image" href="product.html?id=${encodeURIComponent(p.id)}"><img src="${p.image}" alt="${p.name}" loading="lazy">${p.tag?`<span class="product-card__tag">${p.tag}</span>`:''}<button class="favorite-button" type="button" data-favorite="${p.id}" aria-label="Додати в обране">♡</button></a><div class="product-card__body"><p class="eyebrow">${p.category==='ready'?'Готова картина':'Картина за номерами'} · ${p.size}</p><h3><a href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a></h3><div class="product-card__bottom"><strong>${money(p.price)}</strong><button class="icon-button add-cart" type="button" data-add="${p.id}" aria-label="Додати ${p.name} до кошика">＋</button></div></div></article>`;}
  function renderProducts(){
    const grid=$('[data-product-grid]'); if(!grid||!window.ART_PRODUCTS)return;
    const params=new URLSearchParams(location.search); const category=grid.dataset.category||params.get('category')||'all';
    const search=$('[data-search]')?.value.trim().toLocaleLowerCase('uk'); const genre=params.get('genre')||$('[data-genre]')?.value||'all'; if($('[data-genre]') && params.get('genre')) $('[data-genre]').value=params.get('genre'); const sort=$('[data-sort]')?.value||'popular';
    let products=window.ART_PRODUCTS.filter(p=>(category==='all'||p.category===category)&&(genre==='all'||p.genre===genre)&&(!search||`${p.name} ${p.genre} ${p.description}`.toLocaleLowerCase('uk').includes(search)));
    if(sort==='price-up')products.sort((a,b)=>a.price-b.price); if(sort==='price-down')products.sort((a,b)=>b.price-a.price); if(sort==='name')products.sort((a,b)=>a.name.localeCompare(b.name,'uk'));
    grid.innerHTML=products.length?products.map(card).join(''):'<div class="empty-state"><span>⌕</span><h3>Нічого не знайдено</h3><p>Спробуйте змінити пошуковий запит або фільтри.</p></div>';
    const result=$('[data-results-count]');if(result)result.textContent=`Знайдено: ${products.length}`;
    syncFavorites();
  }
  function syncFavorites(){const fav=getFavorites();$$('[data-favorite]').forEach(btn=>{const active=fav.includes(btn.dataset.favorite);btn.classList.toggle('is-active',active);btn.textContent=active?'♥':'♡';btn.setAttribute('aria-pressed',String(active));});}
  const getFavorites=()=>{try{return JSON.parse(localStorage.getItem('art-favorites')||'[]')}catch{return[]}};
  function toggleFavorite(id){let fav=getFavorites();fav=fav.includes(id)?fav.filter(x=>x!==id):[...fav,id];localStorage.setItem('art-favorites',JSON.stringify(fav));syncFavorites();if($('[data-favorites-grid]'))renderFavorites();}
  function renderFavorites(){const grid=$('[data-favorites-grid]');if(!grid)return;const fav=getFavorites();const products=window.ART_PRODUCTS.filter(p=>fav.includes(p.id));grid.innerHTML=products.length?products.map(card).join(''):'<div class="empty-state"><span>♡</span><h3>Тут поки порожньо</h3><p>Зберігайте картини, які вам сподобалися, натискаючи на сердечко.</p><a class="button button--dark" href="catalog.html">Перейти до каталогу</a></div>';syncFavorites();}
  function renderProduct(){const root=$('[data-product-detail]');if(!root)return;const id=new URLSearchParams(location.search).get('id');const p=window.ART_PRODUCTS.find(item=>item.id===id)||window.ART_PRODUCTS[0];document.title=`${p.name} — Фенікс Арт (Phoenix Art)`;root.innerHTML=`<div class="product-detail__visual"><img src="${p.image}" alt="${p.name}"></div><div class="product-detail__info"><p class="eyebrow">${p.category==='ready'?'ГОТОВА КАРТИНА':'КАРТИНА ЗА НОМЕРАМИ'} · ${p.genre}</p><h1>${p.name}</h1><p class="product-detail__description">${p.description}</p><div class="product-detail__price">${money(p.price)}</div><p class="stock-note"><span></span>${p.category==='ready'?'Готова до відправлення':'Набір доступний до замовлення'}</p><div class="detail-specs"><div><span>Розмір</span><strong>${p.size}</strong></div><div><span>Доставка</span><strong>Нова пошта / Укрпошта</strong></div></div>${p.category==='numbers'?'<div class="kit-includes"><strong>У комплекті</strong><ul><li>Полотно з нанесеним контуром</li><li>Акрилові фарби з номерами</li><li>Пензлики різної товщини</li><li>Коротка інструкція</li></ul></div>':'<div class="kit-includes"><strong>Про роботу</strong><p>Готова декоративна картина. Уточніть спосіб оформлення та наявність перед замовленням.</p></div>'}<button class="button button--dark button--wide" data-add="${p.id}">Додати до кошика — ${money(p.price)}</button><p class="microcopy">Без онлайн-оплати. Підтвердимо замовлення особисто.</p></div>`;}
  function renderCart(){
    const root=$('[data-cart]'); if(!root)return;
    const cart=getCart();
    const products=cart.map(item=>({...window.ART_PRODUCTS.find(p=>p.id===item.id),qty:item.qty})).filter(p=>p.id);
    if(!products.length){root.innerHTML='<div class="empty-state"><span>⌑</span><h2>Кошик порожній</h2><p>Додайте картини з каталогу, щоб оформити замовлення.</p><a class="button button--dark" href="catalog.html">До каталогу</a></div>';return;}
    const giftWrap=localStorage.getItem('art-gift-wrap')==='yes';
    const wrapPrice=Number(window.ART_GIFT_WRAP_PRICE)||0;
    const subtotal=products.reduce((n,p)=>n+p.price*p.qty,0);
    const total=subtotal+(giftWrap?wrapPrice:0);
    const savedDelivery=(()=>{try{return JSON.parse(localStorage.getItem('art-checkout-details')||'{}')}catch{return {}}})();
    const carrier=savedDelivery.carrier||'nova-poshta';
    root.innerHTML=`<div class="cart-list">${products.map(p=>`<article class="cart-item"><img src="${p.image}" alt="${p.name}"><div class="cart-item__info"><a href="product.html?id=${p.id}"><strong>${p.name}</strong></a><span>${p.size}</span><strong>${money(p.price)}</strong><div class="quantity"><button type="button" data-qty="${p.id}" data-delta="-1" aria-label="Зменшити кількість">−</button><span>${p.qty}</span><button type="button" data-qty="${p.id}" data-delta="1" aria-label="Збільшити кількість">＋</button></div></div><button class="remove-item" type="button" data-remove="${p.id}" aria-label="Видалити ${p.name}">×</button></article>`).join('')}</div>
    <aside class="cart-summary"><p>Товари <strong>${money(subtotal)}</strong></p><label class="check-option"><input type="checkbox" data-gift-wrap ${giftWrap?'checked':''}> Святкове пакування <strong>${wrapPrice?money(wrapPrice):'без доплати'}</strong></label><p>Разом <strong>${money(total)}</strong></p><p class="microcopy">Доставка оплачується окремо. Онлайн-оплата відсутня.</p>
    <form data-order-form class="order-form">
      <h2 class="checkout-heading">Дані отримувача</h2>
      <label>Повне ПІБ<input name="name" autocomplete="name" required minlength="5" placeholder="Прізвище Ім’я По батькові" value="${escapeAttr(savedDelivery.name||'')}"></label>
      <label>Номер телефону<input name="phone" type="tel" autocomplete="tel" inputmode="tel" required placeholder="+380 XX XXX XX XX" value="${escapeAttr(savedDelivery.phone||'')}"></label>
      <fieldset class="delivery-method"><legend>Служба доставки</legend><label class="delivery-choice"><input type="radio" name="carrier" value="nova-poshta" ${carrier==='nova-poshta'?'checked':''}> <span><strong>Нова пошта</strong><small>Відділення або поштомат</small></span></label><label class="delivery-choice"><input type="radio" name="carrier" value="ukrposhta" ${carrier==='ukrposhta'?'checked':''}> <span><strong>Укрпошта</strong><small>Поштове відділення</small></span></label></fieldset>
      <div class="delivery-fields" data-delivery-fields>
        <label>Місто<input name="city" data-city-autocomplete autocomplete="address-level2" required placeholder="Почніть вводити назву міста" value="${escapeAttr(savedDelivery.city||'')}" aria-autocomplete="list" aria-controls="city-suggestions"><span class="autocomplete-list" id="city-suggestions" data-city-suggestions role="listbox" hidden></span><small class="field-hint" data-city-hint>Введіть щонайменше 2 символи й оберіть місто зі списку.</small></label>
        <label class="branch-type-wrap" data-branch-type-wrap>Тип пункту отримання<select name="branchType" data-branch-type><option value="branch">Відділення</option><option value="locker">Поштомат</option></select></label>
        <label data-branch-label>Відділення / поштомат<input name="branch" data-branch-autocomplete autocomplete="off" required placeholder="Оберіть місто, потім знайдіть пункт" value="${escapeAttr(savedDelivery.branch||'')}" aria-autocomplete="list" aria-controls="branch-suggestions" disabled><span class="autocomplete-list" id="branch-suggestions" data-branch-suggestions role="listbox" hidden></span><small class="field-hint" data-branch-hint>Список пунктів з’явиться після вибору міста.</small></label>
      </div>
      <label>Коментар<textarea name="comment" rows="3" placeholder="Побажання до пакування, листівки тощо">${escapeHtml(savedDelivery.comment||'')}</textarea></label>
      <button class="button button--dark button--wide" type="submit">Сформувати замовлення</button>
      <p class="microcopy">Виберіть місто й пункт зі списку, якщо доступне автодоповнення. Якщо довідник не підключений, дані можна ввести вручну. Замовлення не надсилається автоматично.</p>
    </form></aside>`;
    setupDeliveryAutocomplete(root);
    document.dispatchEvent(new CustomEvent('site-content-updated'));
  }
  function escapeHtml(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function escapeAttr(value){return escapeHtml(value);}
  const shippingConfig=window.ART_SHIPPING_CONFIG||{};
  const NP_URL='https://api.novaposhta.ua/v2.0/json/';
  const apiBase=String(shippingConfig.apiBaseUrl||'').replace(/\/$/,'');
  async function proxyRequest(path,payload={}){
    if(!apiBase)throw new Error('missing-proxy');
    const response=await fetch(`${apiBase}${path}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
    const json=await response.json().catch(()=>({}));
    if(!response.ok||json.success===false)throw new Error(json.error||'proxy-error');
    return json.data||[];
  }
  // Direct Nova Poshta access is deliberately disabled unless an owner explicitly enables it.
  // A key in client-side JavaScript is visible to every visitor. Prefer the Cloudflare Worker.
  async function novaPostRequest(modelName,calledMethod,methodProperties={}){
    if(apiBase){
      if(modelName==='Address'&&calledMethod==='getCities')return proxyRequest('/api/nova/cities',{query:methodProperties.FindByString||''});
      if(modelName==='Address'&&calledMethod==='getWarehouses')return proxyRequest('/api/nova/branches',{cityRef:methodProperties.CityRef,query:methodProperties.FindByString||'',type:methodProperties.TypeOfWarehouseRef?'locker':'branch'});
      throw new Error('unsupported-api-call');
    }
    throw new Error('missing-proxy');
  }
  function setupDeliveryAutocomplete(root){
    const form=$('[data-order-form]',root); if(!form)return;
    const city=form.querySelector('[data-city-autocomplete]');
    const branch=form.querySelector('[data-branch-autocomplete]');
    const cityList=form.querySelector('[data-city-suggestions]');
    const branchList=form.querySelector('[data-branch-suggestions]');
    const cityHint=form.querySelector('[data-city-hint]');
    const branchHint=form.querySelector('[data-branch-hint]');
    const branchType=form.querySelector('[data-branch-type]');
    let cityTimer,branchTimer,cityRef='',selectedCity='',selectedBranch='';
    const saved=(()=>{try{return JSON.parse(localStorage.getItem('art-checkout-details')||'{}')}catch{return {}}})();
    const currentCarrier=()=>form.querySelector('[name="carrier"]:checked')?.value||'nova-poshta';
    const closeList=list=>{list.hidden=true;list.innerHTML='';};
    const showMessage=(list,message)=>{list.innerHTML=`<div class="autocomplete-message" role="option" aria-disabled="true">${escapeHtml(message)}</div>`;list.hidden=false;};
    const addOption=(list,label,value,onChoose)=>{const btn=document.createElement('button');btn.type='button';btn.className='autocomplete-option';btn.setAttribute('role','option');btn.textContent=label;btn.addEventListener('click',()=>onChoose(value,label));list.append(btn);};
    const showOptions=(list,items,labeler,onChoose)=>{list.innerHTML='';if(!items.length){showMessage(list,'Нічого не знайдено. Спробуйте інший запит або введіть адресу вручну.');return;}items.forEach(item=>addOption(list,labeler(item),item,onChoose));list.hidden=false;};
    function resetBranch(){selectedBranch='';branch.value='';branch.disabled=true;branch.dataset.branchRef='';closeList(branchList);}
    async function searchCities(query){
      if(!apiBase)throw new Error('missing-proxy');
      if(currentCarrier()==='nova-poshta')return proxyRequest('/api/nova/cities',{query});
      return proxyRequest('/api/ukrposhta/cities',{query});
    }
    async function searchBranches(query){
      if(!apiBase)throw new Error('missing-proxy');
      if(!cityRef)throw new Error('choose-city');
      if(currentCarrier()==='nova-poshta')return proxyRequest('/api/nova/branches',{cityRef,query,type:branchType.value||'branch'});
      return proxyRequest('/api/ukrposhta/branches',{cityId:cityRef,query});
    }
    function saveDetails(){
      const data=new FormData(form);
      localStorage.setItem('art-checkout-details',JSON.stringify({name:data.get('name')||'',phone:data.get('phone')||'',carrier:currentCarrier(),city:city.value,cityRef,branch:branch.value,branchRef:branch.dataset.branchRef||'',branchType:branchType.value||'branch',comment:data.get('comment')||''}));
    }
    city.addEventListener('input',()=>{
      clearTimeout(cityTimer);cityRef='';selectedCity='';resetBranch();const q=city.value.trim();
      if(q.length<2){closeList(cityList);cityHint.textContent='Введіть щонайменше 2 символи й оберіть місто зі списку.';return;}
      branch.disabled=false;branch.placeholder='Оберіть місто зі списку або введіть пункт вручну';
      cityHint.textContent='Шукаємо міста…';showMessage(cityList,'Шукаємо…');
      cityTimer=setTimeout(async()=>{try{const rows=await searchCities(q);if(city.value.trim()!==q)return;cityHint.textContent='Оберіть місто зі списку, щоб завантажити пункти доставки.';showOptions(cityList,rows,x=>x.label,(item,label)=>{city.value=label;cityRef=String(item.ref||item.id||'');selectedCity=label;closeList(cityList);branch.disabled=false;branch.placeholder=currentCarrier()==='nova-poshta'?'Введіть номер або адресу пункту':'Введіть номер, індекс або адресу відділення';branchHint.textContent='Введіть номер або адресу пункту та оберіть результат зі списку.';saveDetails();});}catch(err){closeList(cityList);cityHint.textContent=err.message==='missing-proxy'?'Автодоповнення потребує налаштованого API-проксі. Можна ввести адресу вручну.':'Довідник міст недоступний. Перевірте налаштування API або введіть місто вручну.';}},300);
    });
    branch.addEventListener('input',()=>{
      clearTimeout(branchTimer);selectedBranch='';branch.dataset.branchRef='';const q=branch.value.trim();
      if(!cityRef||q.length<1){closeList(branchList);return;}
      branchTimer=setTimeout(async()=>{showMessage(branchList,'Шукаємо пункти…');try{const rows=await searchBranches(q);if(branch.value.trim()!==q)return;showOptions(branchList,rows,x=>x.label,(item,label)=>{branch.value=label;selectedBranch=label;branch.dataset.branchRef=String(item.ref||item.id||item.index||'');closeList(branchList);branchHint.textContent='Пункт вибрано.';saveDetails();});}catch(err){closeList(branchList);branchHint.textContent='Довідник пунктів недоступний. Перевірте налаштування API або введіть номер вручну.';}},300);
    });
    form.querySelectorAll('[name="carrier"]').forEach(radio=>radio.addEventListener('change',()=>{
      const isNP=currentCarrier()==='nova-poshta';cityRef='';selectedCity='';resetBranch();city.value='';closeList(cityList);
      branchType.closest('[data-branch-type-wrap]').hidden=!isNP;
      branchType.innerHTML=isNP?'<option value="branch">Відділення</option><option value="locker">Поштомат</option>':'<option value="branch">Відділення</option>';
      cityHint.textContent=apiBase?'Введіть щонайменше 2 символи та оберіть результат зі списку.':'Для автодоповнення обох перевізників спочатку налаштуйте API-проксі (інструкція в README).';
      branchHint.textContent='Оберіть місто зі списку, потім знайдіть пункт.';
      city.placeholder=isNP?'Почніть вводити назву міста':'Введіть населений пункт';saveDetails();
      document.dispatchEvent(new CustomEvent('site-content-updated'));
    }));
    branchType.addEventListener('change',()=>{resetBranch();branch.disabled=!cityRef;branchHint.textContent=branchType.value==='locker'?'Введіть номер або адресу поштомата.':'Введіть номер або адресу відділення.';saveDetails();});
    document.addEventListener('click',e=>{if(!cityList.contains(e.target)&&e.target!==city)closeList(cityList);if(!branchList.contains(e.target)&&e.target!==branch)closeList(branchList);});
    form.addEventListener('input',saveDetails);
    const isNP=currentCarrier()==='nova-poshta';branchType.closest('[data-branch-type-wrap]').hidden=!isNP;
    if(saved.cityRef&&saved.carrier===currentCarrier()&&city.value.trim()){cityRef=String(saved.cityRef);selectedCity=city.value.trim();branch.disabled=false;branch.placeholder='Можна ввести пункт вручну або обрати зі списку';}
    if(saved.branchRef&&saved.carrier===currentCarrier())branch.dataset.branchRef=String(saved.branchRef);
    if(saved.branchType&&isNP)branchType.value=saved.branchType;
    cityHint.textContent=apiBase?'Введіть щонайменше 2 символи й оберіть місто зі списку.':'Для автодоповнення обох перевізників налаштуйте API-проксі. Поки що адресу можна ввести вручну.';
  }
  function handleOrder(e){
    if(!e.target.matches('[data-order-form]'))return;e.preventDefault();
    const form=e.target;const data=new FormData(form);const carrier=data.get('carrier');
    const name=String(data.get('name')||'').trim();
    if(name.split(/\s+/).filter(Boolean).length<3){toast('Вкажіть повне ПІБ отримувача (прізвище, ім’я та по батькові).');form.querySelector('[name="name"]').focus();return;}
    const cart=getCart();const lines=cart.map(i=>{const p=window.ART_PRODUCTS.find(x=>x.id===i.id);return p?`• ${p.name} (${p.size}) × ${i.qty} — ${money(p.price*i.qty)}`:''}).filter(Boolean);
    const subtotal=cart.reduce((sum,i)=>{const p=window.ART_PRODUCTS.find(x=>x.id===i.id);return sum+(p?p.price*i.qty:0)},0);
    const giftWrap=localStorage.getItem('art-gift-wrap')==='yes';const wrapPrice=Number(window.ART_GIFT_WRAP_PRICE)||0;const total=subtotal+(giftWrap?wrapPrice:0);
    const carrierLabel=carrier==='ukrposhta'?'Укрпошта':'Нова пошта';
    const branchType=carrier==='nova-poshta'&&data.get('branchType')==='locker'?'Поштомат':'Відділення';
    const body=`Замовлення з сайту «Фенікс Арт (Phoenix Art)»\n\n${lines.join('\n')}\nСвяткове пакування: ${giftWrap?'так ('+money(wrapPrice)+')':'ні'}\n\nРазом: ${money(total)}\n\nПовне ПІБ: ${name}\nТелефон: ${data.get('phone')}\nСлужба доставки: ${carrierLabel}\nМісто: ${data.get('city')}\n${branchType}: ${data.get('branch')}\nКоментар: ${data.get('comment')||'—'}\n\nПрошу підтвердити замовлення.`;
    const email=document.body.dataset.orderEmail||'YOUR_EMAIL@example.com';
    if(email==='YOUR_EMAIL@example.com'){const blob=new Blob([body],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='zamovlennya.txt';a.click();URL.revokeObjectURL(url);toast('Замовлення збережено у файл. Налаштуйте email у HTML-файлах.');return;}
    location.href=`mailto:${email}?subject=${encodeURIComponent('Нове замовлення з сайту')}&body=${encodeURIComponent(body)}`;
  }
  function bind(){document.addEventListener('click',e=>{const add=e.target.closest('[data-add]');if(add){e.preventDefault();addToCart(add.dataset.add);return;}const fav=e.target.closest('[data-favorite]');if(fav){e.preventDefault();toggleFavorite(fav.dataset.favorite);return;}const qty=e.target.closest('[data-qty]');if(qty){const cart=getCart();const item=cart.find(i=>i.id===qty.dataset.qty);if(item){item.qty+=Number(qty.dataset.delta);saveCart(cart.filter(i=>i.qty>0));renderCart();}return;}const remove=e.target.closest('[data-remove]');if(remove){saveCart(getCart().filter(i=>i.id!==remove.dataset.remove));renderCart();}});document.addEventListener('submit',handleOrder);document.addEventListener('change',e=>{if(e.target.matches('[data-gift-wrap]')){localStorage.setItem('art-gift-wrap',e.target.checked?'yes':'no');renderCart();}});const customForm=$('[data-custom-order-form]');if(customForm)customForm.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(customForm);const email=document.body.dataset.orderEmail||'YOUR_EMAIL@example.com';const body=`Заявка на індивідуальну картину\n\nТип: ${d.get('kind')}\nРозмір: ${d.get('size')}\nІм’я: ${d.get('name')}\nКонтакт: ${d.get('contact')}\nСвяткове пакування: ${d.get('giftWrap')?'так':'ні'}\nПобажання: ${d.get('message')||'—'}\n\nФото надішлю окремо після узгодження каналу зв’язку.`;if(email==='YOUR_EMAIL@example.com'){const blob=new Blob([body],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='zayavka-na-kartynu.txt';a.click();URL.revokeObjectURL(url);toast('Заявку збережено у файл. Налаштуйте email у HTML-файлах.');return;}location.href=`mailto:${email}?subject=${encodeURIComponent('Заявка на індивідуальну картину')}&body=${encodeURIComponent(body)}`;});const contact=$('[data-contact-form]');if(contact)contact.addEventListener('submit',e=>{e.preventDefault();const d=new FormData(contact);const email=document.body.dataset.orderEmail||'YOUR_EMAIL@example.com';const body=`Ім’я: ${d.get('name')}\nКонтакт: ${d.get('contact')}\n\n${d.get('message')}`;if(email==='YOUR_EMAIL@example.com'){const blob=new Blob([body],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='povidomlennya.txt';a.click();URL.revokeObjectURL(url);toast('Повідомлення збережено у файл. Налаштуйте email у файлі index.html.');return;}location.href=`mailto:${email}?subject=${encodeURIComponent('Повідомлення з сайту')}&body=${encodeURIComponent(body)}`;});const menu=$('.menu-toggle');if(menu)menu.addEventListener('click',()=>{const nav=$('.site-nav');const open=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(open));});$$('[data-search],[data-genre],[data-sort]').forEach(el=>el.addEventListener(el.matches('[data-search]')?'input':'change',renderProducts));const newsletter=$('[data-newsletter]');if(newsletter)newsletter.addEventListener('submit',e=>{e.preventDefault();toast('Дякуємо! Підписку демонстраційно прийнято.');newsletter.reset();});}
  document.addEventListener('DOMContentLoaded',()=>{updateCartCount();bind();renderProducts();renderProduct();renderCart();renderFavorites();});
})();
