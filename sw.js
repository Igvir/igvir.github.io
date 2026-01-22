/**
 * Service Worker for Igvir Ramirez Portfolio
 * Provides offline functionality and caching
 */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `igvir-portfolio-${CACHE_VERSION}`;

// Assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/es/',
  '/es/index.html',
  '/assets/css/main.css',
  '/assets/css/custom.css',
  '/assets/css/fontawesome-all.min.css',
  '/assets/js/jquery.min.js',
  '/assets/js/jquery.scrollex.min.js',
  '/assets/js/jquery.scrolly.min.js',
  '/assets/js/browser.min.js',
  '/assets/js/breakpoints.min.js',
  '/assets/js/util.js',
  '/assets/js/main.js',
  '/assets/js/custom.js',
  '/images/avatar.jpg',
  '/images/banner5-white-small.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/site.webmanifest'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
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

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // Return cached version and update cache in background
          event.waitUntil(
            fetch(event.request)
              .then((response) => {
                if (response && response.status === 200) {
                  const responseClone = response.clone();
                  caches.open(CACHE_NAME)
                    .then((cache) => cache.put(event.request, responseClone));
                }
              })
              .catch(() => {}) // Ignore network errors
          );
          return cachedResponse;
        }

        // Not in cache, fetch from network
        return fetch(event.request)
          .then((response) => {
            // Cache successful responses with validation
            if (response && response.status === 200) {
              const contentType = response.headers.get('content-type');
              // Only cache expected content types
              if (contentType && (
                contentType.includes('text/html') ||
                contentType.includes('text/css') ||
                contentType.includes('application/javascript') ||
                contentType.includes('image/') ||
                contentType.includes('font/')
              )) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => cache.put(event.request, responseClone));
              }
            }
            return response;
          })
          .catch(() => {
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});
