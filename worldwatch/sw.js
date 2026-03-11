// WorldWatch Service Worker
const CACHE = 'worldwatch-v19';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = e.request.url;
  if (url.includes('api.') || url.includes('.m3u8') || url.includes('finnhub') || url.includes('anthropic')) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
