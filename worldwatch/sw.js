const CACHE = 'worldwatch-v1';
const STATIC = [
  './worldwatch-19.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(STATIC)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Only cache same-origin requests — never intercept live streams or APIs
  if (!e.request.url.startsWith(self.location.origin)) return;
  if (e.request.url.includes('api.anthropic') || e.request.url.includes('finnhub')) return;

  e.respondWith(
    fetch(e.request)
      .then(resp => {
        const clone = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return resp;
      })
      .catch(() => caches.match(e.request))
  );
});
