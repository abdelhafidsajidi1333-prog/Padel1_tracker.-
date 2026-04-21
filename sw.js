
const cacheName = 'padel-tracker-v1';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// 1. Installation: Khzen l-fichiers f l-mémoire (Cache)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(assets);
    })
  );
});

// 2. Activation: Msa7 l-cache l-9dim ila kan
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName).map((key) => caches.delete(key))
      );
    })
  );
});

// 3. Fetch: Khdem b l-fichiers li f l-cache ila makantch conx
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
