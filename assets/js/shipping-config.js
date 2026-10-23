/* Phoenix Workshop — налаштування автодоповнення доставки.
   Після публікації Cloudflare Worker вкажіть його URL нижче.
   Секретні API-ключі зберігайте тільки в налаштуваннях Worker, не в цьому файлі. */
window.ART_SHIPPING_CONFIG = {
  apiBaseUrl: '', // наприклад: https://phoenix-art-shipping.<ваш-акаунт>.workers.dev
  // Не використовуйте ключі API в браузері: відвідувачі зможуть їх скопіювати.
  // Direct API fallback залишено вимкненим навмисно.
  novaPoshtaApiKey: '',
  parcelLockerTypeRef: ''
};
