// =========================================
// 1. ВИПАДКОВЕ ЗОБРАЖЕННЯ ГОЛОВНОГО БАНЕРА
// =========================================
(function initRandomHero() {
  const heroImg = document.getElementById('hero-banner-image');
  const heroTitle = document.getElementById('hero-banner-title');
  const heroDesc = document.getElementById('hero-banner-desc');
  
  if (!heroImg || !window.ART_PRODUCTS) return;
  
  // Збираємо унікальні пари: simple-зображення + назва з каталогу
  const uniqueImages = new Map();
  window.ART_PRODUCTS.forEach(p => {
    // assets/images/poppy.jpeg → assets/images/poppy-simple.jpeg
    const simpleSrc = p.image.replace(/\.(\w+)$/, '-simple.$1');
    if (!uniqueImages.has(simpleSrc)) {
      uniqueImages.set(simpleSrc, {
        src: simpleSrc,
        title: p.name,
        desc: `Картина за номерами · ${p.size || '40 × 50 см'}`
      });
    }
  });
  
  const heroImages = Array.from(uniqueImages.values());
  if (heroImages.length === 0) return;
  
  const randomItem = heroImages[Math.floor(Math.random() * heroImages.length)];
  
  // Попереднє завантаження, щоб уникнути мерехтіння
  const img = new Image();
  img.onload = () => {
    heroImg.src = randomItem.src;
    heroImg.alt = randomItem.title;
    if (heroTitle) heroTitle.textContent = randomItem.title;
    if (heroDesc) heroDesc.textContent = randomItem.desc;
  };
  img.src = randomItem.src;
})();

// =========================================
// 2. ОСНОВНИЙ ФУНКЦІОНАЛ МАГАЗИНУ
// =========================================
(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const money = n => `${Number(n).toLocaleString('uk-UA')} ₴`;
  const getCart = () => { try { return JSON.parse(localStorage.getItem('art-cart') || '[]'); } catch { return []; } };
  const saveCart = cart => { localStorage.setItem('art-cart', JSON.stringify(cart)); updateCartCount(); };
  
  function updateCartCount(){ 
    const count = getCart().reduce((n,item)=>n+item.qty,0); 
    $$('.cart-count').forEach(el=>{
      el.textContent=count;
      el.hidden=count===0;
    }); 
  }
  
  function addToCart(id){ 
    const product=window.ART_PRODUCTS?.find(p=>p.id===id); 
    if(!product)return; 
    const cart=getCart(); 
    const found=cart.find(i=>i.id===id); 
    if(found) found.qty++; 
    else cart.push({id,qty:1}); 
    saveCart(cart); 
    toast('Додано до кошика'); 
  }
  
  function toast(text){ 
    let el=$('.toast'); 
    if(!el){
      el=document.createElement('div');
      el.className='toast';
      el.setAttribute('role','status');
      document.body.append(el);
    } 
    el.textContent=text;
    el.classList.add('is-visible');
    clearTimeout(window.toastTimer);
    window.toastTimer=setTimeout(()=>el.classList.remove('is-visible'),2400); 
  }
  
  function card(p){
    return `<article class="product-card">
      <a class="product-card__image" href="product.html?id=${encodeURIComponent(p.id)}">
        <img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async">
        ${p.tag ? `<span class="product-card__tag">${p.tag}</span>` : ''}
      </a>
      <button class="favorite-button" type="button" data-favorite="${p.id}" aria-label="Додати до обраного">♡</button>
      <div class="product-card__body">
        <h3 class="product-card__title">${p.name}</h3>
        <p class="product-card__price">${money(p.price)}</p>
        <button class="button button--dark" type="button" data-add-to-cart="${p.id}">До кошика</button>
      </div>
    </article>`;
  }

  // Ініціалізація подій
  document.addEventListener('click', e => {
    const addBtn = e.target.closest('[data-add-to-cart]');
    if (addBtn) {
      e.preventDefault();
      addToCart(addBtn.dataset.addToCart);
    }
  });

  // Рендер сітки товарів, якщо вона є на сторінці
  const grid = document.querySelector('[data-product-grid]');
  if (grid && window.ART_PRODUCTS) {
    const category = grid.dataset.category || 'all';
    const filtered = category === 'all' 
      ? window.ART_PRODUCTS 
      : window.ART_PRODUCTS.filter(p => p.genre === category || p.type === category);
    
    grid.innerHTML = filtered.slice(0, 8).map(card).join('');
  }

  updateCartCount();
})();
