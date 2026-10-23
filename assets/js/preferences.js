(() => {
  const translations = {
    'Майстерня Фенікс':'Phoenix Workshop','картини та історії':'paintings and stories',
    'Мистецтво ближче, ніж здається · Доставка по Україні':'Art is closer than you think · Delivery across Ukraine',
    'Каталог':'Catalog','Готові картини':'Finished paintings','На замовлення':'Custom order','Про нас':'About us','Доставка':'Delivery','Обране':'Favorites','Кошик':'Cart','Головна':'Home','Про майстерню':'About the studio',
    'картини та історії':'paintings & stories','Майстерня':'The Art Studio','Картини за номерами':'Paint by numbers','Індивідуальне замовлення':'Custom artwork','Покупцям':'For customers','Доставка та оплата':'Delivery & payment','Питання та відповіді':'FAQ','Контакти':'Contact','Мистецтво — ближче, ніж здається':'Art is closer than you think',
    'Знайти свій сюжет ↗':'Find your painting ↗','Обрати картину':'Choose a painting','Готові роботи':'Ready-made art','Переглянути роботи ↗':'Browse paintings ↗','Увесь каталог ↗':'View the full catalog ↗','Переглянути каталог':'Browse catalog','До каталогу':'Go to catalog','Перейти до каталогу':'Go to catalog',
    'Зараз обирають':'Popular picks','ВИБІР МАЙСТЕРНІ':'STUDIO PICKS','ЗНАЙДІТЬ СВІЙ СЮЖЕТ':'FIND YOUR STYLE','Що вам ближче?':'What speaks to you?','Квіти':'Flowers','Пейзажі':'Landscapes','Тварини':'Animals','Міста':'Cities','Натюрморти':'Still life','Абстракція':'Abstract',
    'Трохи мистецтва.':'A little art.','Більше вашого.':'More of you.','МАЛЮЙТЕ · ВІДЧУВАЙТЕ · ЗБЕРІГАЙТЕ':'PAINT · FEEL · KEEP','Картини за номерами, набори за вашими фотографіями та готові роботи для дому чи подарунка. Оберіть сюжет або створіть картину зі своєю історією.':'Paint-by-number kits made from your photos and finished artwork for your home or as a gift. Choose a design or create a painting with your own story.',
    'Творчість без досвіду':'Creativity for everyone','Зрозумілий процес і готовий набір':'An easy process and a complete kit','Для вашого інтер’єру':'For your interior','Сюжети, які пасують вашому простору':'Art that suits your space','Людське оформлення':'Personal order support','Замовлення підтверджуємо особисто':'Every order is confirmed personally',
    'ГОТОВІ РОБОТИ':'READY-MADE ART','Картина, яка вже знайшла свій настрій':'A painting with its own mood','Не хочеться чекати, поки висохне останній мазок? Обирайте готові картини для дому, робочого кабінету або подарунка.':'Do not want to wait for the last brushstroke to dry? Choose finished paintings for your home, office, or as a gift.',
    'Картина за вашим фото':'A painting from your photo','ОСОБЛИВИЙ ПОДАРУНОК':'A PERSONAL GIFT','Перетворіть фотографію близької людини, улюбленця чи важливого моменту на набір для малювання за номерами. До замовлення можна додати святкове пакування.':'Turn a photo of someone you love, a pet, or a special moment into a paint-by-number kit. Festive gift wrapping is available.',
    'Створити індивідуальне замовлення ↗':'Create a custom order ↗','На замовлення':'Custom order','НЕ ЗНАЙШЛИ СВІЙ СЮЖЕТ?':'DIDN’T FIND YOUR DESIGN?','Створимо картину за вашим фото':'We can create a painting from your photo','Дізнатися більше ↗':'Learn more ↗',
    'Листи з майстерні':'Letters from the studio','Нові сюжети, ідеї для подарунків і трохи натхнення.':'New designs, gift ideas, and a little inspiration.','Ваша електронна пошта':'Your email address','Підписатися ↗':'Subscribe ↗','Дякуємо! Підписку демонстраційно прийнято.':'Thank you! Your demo subscription has been received.',
    'ЗНАЙДІТЬ СВІЙ НАСТУПНИЙ СЮЖЕТ':'FIND YOUR NEXT DESIGN','Каталог картин':'Painting catalog','Оберіть картину за настроєм, тематикою або бюджетом. Усі ціни вказані в гривнях; замовлення підтверджуємо особисто.':'Choose a painting by mood, theme, or budget. Prices are in Ukrainian hryvnias; every order is confirmed personally.',
    'Знайти картину…':'Search paintings…','Усі теми':'All themes','Сортування':'Sort by','Спочатку популярні':'Most popular first','Від дешевших':'Price: low to high','Від дорожчих':'Price: high to low','За назвою':'Name','НЕ ПРО ІДЕАЛЬНІСТЬ':'NOT ABOUT PERFECTION','Про задоволення від процесу':'Enjoy the process',
    'Про концепцію та підхід майстерні.':'The studio concept and approach.','НАША ІДЕЯ':'OUR IDEA','Майстерня — концепція невеликого магазину, де картина може бути і тихим вечором із фарбами, і готовою деталлю інтер’єру.':'The Art Studio is a small shop concept where a painting can mean a quiet evening with paints or a finished interior detail.',
    'Просто обрати':'Easy to choose','Каталог із темами, цінами та розмірами, без зайвих кроків.':'A catalog with themes, prices, and sizes, without unnecessary steps.','Чесно пояснити':'Clear information','До підтвердження замовлення можна уточнити наявність і доставку.':'You can confirm availability and delivery before placing your order.','Залишити простір':'Take your time','Жодного поспіху — обирайте те, що вам справді подобається.':'No rush — choose what you truly like.',
    'ВАШ ВИБІР':'YOUR SELECTION','Перевірте товари та залиште контакти. Онлайн-оплати немає — підтвердимо деталі замовлення особисто.':'Review your items and leave your contact details. There is no online payment; we will confirm the order personally.',
    'ВАШІ ВПОДОБАННЯ':'YOUR FAVORITES','Зберігайте картини, до яких хочете повернутися.':'Save paintings you would like to revisit.','Картка товару':'Product details','Опис, ціна та замовлення картини.':'Painting details, price, and ordering information.',
    'ПЕРЕД ЗАМОВЛЕННЯМ':'BEFORE ORDERING','Питання та відповіді':'Frequently asked questions','Коротко про те, як працює магазин і що очікувати після оформлення замовлення.':'How the shop works and what to expect after placing an order.',
    'Що входить у картину за номерами?':'What is included in a paint-by-number kit?','Чи можна оплатити онлайн?':'Can I pay online?','Як зберігається кошик?':'How is the cart saved?','Чи можна замовити картину за власним фото?':'Can I order a painting from my own photo?','Як зв’язатися з магазином?':'How can I contact the shop?','Чи є святкове пакування?':'Is festive gift wrapping available?',
    'Так, його можна вибрати в кошику або зазначити в заявці на індивідуальну картину. Перед підтвердженням замовлення узгоджуються доступність і вартість.':'Yes. Select it in the cart or request it with a custom painting. Availability and price are confirmed before the order is finalized.',
    'Ваше ім’я':'Your name','Телефон':'Phone','Місто та відділення пошти':'City and postal branch','Коментар':'Comment','Як до вас звертатися':'How should we address you?','Місто, номер відділення':'City, branch number','Побажання до пакування, привітання на листівці тощо':'Gift wrapping, a greeting card, or other requests','Сформувати замовлення':'Prepare order','Святкове пакування':'Festive gift wrapping','Товари':'Items','Разом':'Total','без доплати':'no extra charge','Доставка оплачується окремо. Онлайн-оплата відсутня.':'Delivery is charged separately. Online payment is unavailable.',
    'Кошик порожній':'Your cart is empty','Додайте картини з каталогу, щоб оформити замовлення.':'Add paintings from the catalog to place an order.','Зберігайте картини, які вам сподобалися, натискаючи на сердечко.':'Save paintings you like by clicking the heart.','Нічого не знайдено':'Nothing found','Спробуйте змінити пошуковий запит або фільтри.':'Try changing your search or filters.','Знайдено:':'Found:','Додано до кошика':'Added to cart','Готова до відправлення':'Ready to ship','Набір доступний до замовлення':'Kit available to order','Розмір':'Size','Доставка':'Delivery','У комплекті':'Included in the kit','Полотно з нанесеним контуром':'Canvas with printed outlines','Акрилові фарби з номерами':'Numbered acrylic paints','Пензлики різної товщини':'Brushes in different sizes','Коротка інструкція':'Quick instructions','Про роботу':'About this artwork','Додати до кошика':'Add to cart','Без онлайн-оплати. Підтвердимо замовлення особисто.':'No online payment. We will confirm your order personally.',
    'Заявку збережено у файл. Налаштуйте email у HTML-файлах.':'Request saved to a file. Configure your email in the HTML files.','Замовлення збережено у файл. Налаштуйте email у файлі index.html.':'Order saved to a file. Configure your email in index.html.','Повідомлення збережено у файл. Налаштуйте email у файлі index.html.':'Message saved to a file. Configure your email in index.html.',
    'Без онлайн-оплати · Замовлення підтверджуємо особисто':'No online payment · Orders confirmed personally','Речі, створені руками, і картини, що роблять простір трохи більш вашим.':'Handmade things and paintings that make your space feel more like yours.','Каталог із темами, цінами та розмірами, без зайвих кроків.':'A catalog with themes, prices, and sizes, without unnecessary steps.',
    'Маки на світанку':'Poppies at Dawn','Тиша біля моря':'Silence by the Sea','Сонячна тераса':'Sunny Terrace','Гори у тумані':'Mountains in Mist','Груші та кераміка':'Pears and Ceramics','Кіт у сонячному вікні':'Cat in a Sunny Window','Тепла абстракція':'Warm Abstraction','Поле після дощу':'Field After Rain','Квіти у білій вазі':'Flowers in a White Vase','Місто після заходу':'City After Sunset','Теплий квітковий сюжет із насиченими червоними маками та м’яким ранковим світлом. Гарний вибір для першої картини.':'A warm floral design with vivid red poppies and soft morning light. A lovely choice for your first painting.','Спокійний морський пейзаж у блакитно-піщаних відтінках.':'A peaceful seascape in blue and sandy tones.','Затишна вуличка, квіти й тепла архітектура південного міста.':'A cozy street, flowers, and the warm architecture of a southern town.','Лаконічний гірський краєвид із багатошаровими силуетами.':'A minimalist mountain landscape with layered silhouettes.','Стриманий натюрморт для кухні, їдальні або творчого простору.':'A restrained still life for a kitchen, dining room, or creative space.','Милий домашній сюжет із котом, який гріється на сонці.':'A cozy scene of a cat basking in the sunlight.','Готова декоративна картина в природній палітрі. Підійде до сучасного інтер’єру.':'A finished decorative painting in a natural palette, suited to a modern interior.','Готова картина з м’яким світлом над полем після літньої зливи.':'A finished painting of soft light over a field after a summer shower.','Готова картина з квітковою композицією у спокійних пастельних кольорах.':'A finished floral painting in calm pastel colors.','Вечірнє місто, відблиски світла та глибокі сині відтінки.':'An evening city with reflections of light and deep blue tones.','Бестселер':'Bestseller','Для початківців':'For beginners','Новинка':'New','Популярне':'Popular','Єдиний екземпляр':'One of a kind','Ручна робота':'Handmade','ГОТОВА КАРТИНА':'FINISHED PAINTING','КАРТИНА ЗА НОМЕРАМИ':'PAINT-BY-NUMBER KIT','Набір доступний до замовлення':'Kit available to order','Пошук картин':'Search paintings','Додати в обране':'Add to favorites','Відкрити меню':'Open menu','Перемкнути тему':'Toggle theme','Мова / Language':'Language','Світла / темна тема':'Light / dark theme','Тема':'Theme',
    'Місто, номер відділення':'City, branch number','Знайдіть картину…':'Search for a painting…','Усі теми':'All themes',
    'Дані отримувача':'Recipient details','Повне ПІБ':'Full name','Прізвище Ім’я По батькові':'Full name (surname, first name, patronymic)','Служба доставки':'Delivery service','Нова пошта':'Nova Poshta','Укрпошта':'Ukrposhta','Відділення або поштомат':'Branch or parcel locker','Поштове відділення':'Post office','Місто':'City','Почніть вводити назву міста':'Start typing a city name','Введіть населений пункт':'Enter a settlement','Тип пункту отримання':'Pickup point type','Відділення':'Branch','Поштомат':'Parcel locker','Відділення / поштомат':'Branch / parcel locker','Оберіть місто, потім знайдіть пункт':'Select a city, then find a pickup point','Введіть номер або адресу пункту':'Enter a branch number or address','Введіть номер або адресу поштомата.':'Enter a parcel locker number or address.','Введіть номер або адресу відділення.':'Enter a branch number or address.','Коментар':'Comment','Побажання до пакування, листівки тощо':'Gift wrapping, card, or other requests','Виберіть місто й пункт зі списку, якщо доступне автодоповнення. Якщо довідник не підключений, дані можна ввести вручну. Замовлення не надсилається автоматично.':'Choose a city and pickup point from suggestions when available. If the directory is not connected, enter the details manually. Orders are not sent automatically.','Введіть щонайменше 2 символи й оберіть місто зі списку.':'Type at least 2 characters and choose a city from the list.','Оберіть місто зі списку, щоб завантажити пункти доставки.':'Choose a city from the list to load pickup points.','Шукаємо міста…':'Searching cities…','Шукаємо…':'Searching…','Нічого не знайдено. Спробуйте інший запит або введіть адресу вручну.':'No results. Try another query or enter the address manually.','Пункт вибрано.':'Pickup point selected.','Оберіть місто, потім знайдіть пункт.':'Select a city, then find a pickup point.','Для автодоповнення Укрпошти потрібно підключити її адресний довідник.':'Ukrposhta autocomplete requires its address directory integration.','Автодоповнення Нової пошти потребує API-ключа. Поки що місто можна ввести вручну.':'Nova Poshta autocomplete requires an API key. You can enter the city manually for now.','Автодоповнення Нової пошти потребує API-ключа. Введіть пункт вручну.':'Nova Poshta autocomplete requires an API key. Enter the pickup point manually.','Довідник міст недоступний. Можна ввести місто вручну.':'City directory unavailable. You can enter the city manually.','Довідник пунктів недоступний. Введіть номер або адресу вручну.':'Pickup point directory unavailable. Enter the number or address manually.','Для реального автодоповнення додайте API-ключ Нової пошти.':'Add a Nova Poshta API key to enable autocomplete.','Для реального автодоповнення Укрпошти потрібен її адресний довідник.':'Ukrposhta autocomplete requires its address directory.','Вкажіть повне ПІБ отримувача.':'Enter the recipient’s full name.','Повне ПІБ:':'Full name:','Служба доставки:':'Delivery service:','Замовлення збережено у файл. Налаштуйте email у HTML-файлах.':'Order saved to a file. Configure the email in the HTML files.'
  };
  const originalText = new WeakMap();
  const originalAttrs = new WeakMap();
  const attrNames = ['placeholder','aria-label','title','alt'];
  function translate(lang) {
    document.documentElement.lang = lang;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const original = originalText.get(node);
      if (lang === 'uk') node.nodeValue = original;
      else {
        const trimmed = original.trim();
        const translated = translations[trimmed];
        if (translated) node.nodeValue = original.replace(trimmed, translated);
        else {
          let result = original;
          Object.keys(translations).sort((a,b)=>b.length-a.length).forEach(uk => { if (result.includes(uk)) result = result.split(uk).join(translations[uk]); });
          node.nodeValue = result;
        }
      }
    }
    document.querySelectorAll('*').forEach(el => {
      attrNames.forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        if (!originalAttrs.has(el)) originalAttrs.set(el, {});
        const bag = originalAttrs.get(el);
        if (!(attr in bag)) bag[attr] = el.getAttribute(attr);
        const val = bag[attr];
        if (lang === 'uk') el.setAttribute(attr, val);
        else el.setAttribute(attr, translations[val] || val);
      });
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      const active = button.dataset.language === lang;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-active', active);
    });
    document.dispatchEvent(new CustomEvent('site-language-change', {detail:{language:lang}}));
  }
  function setTheme(theme) {
    document.documentElement.dataset.theme = theme;
    const btn = document.querySelector('[data-theme-toggle]');
    if (btn) {
      const dark = theme === 'dark';
      const icon = btn.querySelector('.theme-toggle__icon');
      if (icon) icon.textContent = dark ? '☼' : '☾';
      const english = document.documentElement.lang === 'en';
      btn.setAttribute('aria-label', dark ? (english ? 'Switch to light theme' : 'Увімкнути світлу тему') : (english ? 'Switch to dark theme' : 'Увімкнути темну тему'));
      btn.title = dark ? (english ? 'Switch to light theme' : 'Увімкнути світлу тему') : (english ? 'Switch to dark theme' : 'Увімкнути темну тему');
      btn.setAttribute('aria-pressed', String(dark));
    }
  }

  const systemTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const savedTheme = localStorage.getItem('art-theme');
  const savedLang = localStorage.getItem('art-language') || 'uk';

  // Apply the theme immediately to avoid a flash of the wrong palette.
  setTheme(savedTheme || systemTheme);

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-language]').forEach(button => {
      button.addEventListener('click', () => {
        const lang = button.dataset.language;
        localStorage.setItem('art-language', lang);
        translate(lang);
      });
    });

    const themeBtn = document.querySelector('[data-theme-toggle]');
    if (themeBtn) themeBtn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('art-theme', next);
      setTheme(next);
    });

    setTheme(localStorage.getItem('art-theme') || systemTheme);
    translate(savedLang);
    document.addEventListener('site-content-updated', () => translate(localStorage.getItem('art-language') || 'uk'));

    // Follow OS theme changes only while the user has not selected a theme manually.
    if (window.matchMedia) {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const onSystemThemeChange = event => {
        if (!localStorage.getItem('art-theme')) setTheme(event.matches ? 'dark' : 'light');
      };
      if (media.addEventListener) media.addEventListener('change', onSystemThemeChange);
      else if (media.addListener) media.addListener(onSystemThemeChange);
    }
  });
})();
