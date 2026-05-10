/**
 * Service Worker for Igvir Ramirez Portfolio
 * Provides offline functionality and caching
 */

const CACHE_VERSION = 'v3.0.0';
const CACHE_NAME = `igvir-portfolio-${CACHE_VERSION}`;

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/es/',
  '/es/index.html',
  '/styles.css',
  '/script.js',
  '/data/books.js',
  '/images/avatar.jpg',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/site.webmanifest'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - stale-while-revalidate strategy
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version and update in background
          event.waitUntil(
            fetch(event.request)
              .then((response) => {
                if (response && response.status === 200) {
                  const clone = response.clone();
                  caches.open(CACHE_NAME)
                    .then((cache) => cache.put(event.request, clone));
                }
              })
              .catch(() => {})
          );
          return cachedResponse;
        }

        // Not cached — fetch from network
        return fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              const contentType = response.headers.get('content-type');
              if (contentType && (
                contentType.includes('text/html') ||
                contentType.includes('text/css') ||
                contentType.includes('application/javascript') ||
                contentType.includes('image/') ||
                contentType.includes('font/')
              )) {
                const clone = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => cache.put(event.request, clone));
              }
            }
            return response;
          })
          .catch(() => {
            // Offline fallback for navigation
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});
