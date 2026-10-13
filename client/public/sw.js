/* Service worker for the garden guide PWA (GitHub Pages, /garden-guide/ scope).
 * Strategy: precache the app shell on install, then network-first with a
 * cache fallback so the guide stays readable offline. All paths are taken
 * from the registration scope so nothing assumes the domain root.
 */
const CACHE_NAME = 'garden-guide-v2';
const SCOPE = self.registration.scope;
const PRECACHE = [
  SCOPE,
  SCOPE + 'index.html',
  SCOPE + 'manifest.json',
  SCOPE + 'icons/icon-192.png',
  SCOPE + 'icons/icon-512.png',
  SCOPE + 'icons/apple-touch-icon-180.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match(SCOPE + 'index.html');
          }
          return new Response('Offline', { status: 503 });
        })
      )
  );
});
