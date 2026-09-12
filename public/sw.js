/**
 * Bappa Morya - Service Worker
 * Provides offline caching for Marathi Aarti texts, temple darshan, wallpapers,
 * synthesized audio utilities, and high-definition Ganesha imagery.
 */

const CACHE_VERSION = 'v8';
const CACHE_STATIC_NAME = `bappa-morya-static-${CACHE_VERSION}`;
const CACHE_IMAGES_NAME = `bappa-morya-images-${CACHE_VERSION}`;
const CACHE_FONTS_NAME = `bappa-morya-fonts-${CACHE_VERSION}`;

// Core static app shell files to precache during install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Offline SVG image placeholder in case an uncached external image fails
const OFFLINE_IMAGE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400" fill="none">
  <rect width="600" height="400" fill="#72370F"/>
  <rect x="20" y="20" width="560" height="360" rx="16" stroke="#D4AF37" stroke-width="2" stroke-dasharray="8 8" fill="#5D2B0D"/>
  <circle cx="300" cy="180" r="50" fill="#FFD700" fill-opacity="0.2" stroke="#FFD700" stroke-width="2"/>
  <text x="300" y="195" font-size="42" font-family="serif" text-anchor="middle" fill="#FFD700">ॐ</text>
  <text x="300" y="270" font-size="20" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#FFFDD0">॥ गणपती बाप्पा मोरया ॥</text>
  <text x="300" y="300" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#FFD700">Offline Mode • Aarti & Prayers Available</text>
</svg>`;

// Install Event: Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((err) => {
        console.warn('[SW] Install precache warning:', err);
      })
  );
});

// Activate Event: Clean up outdated caches & take control immediately
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_STATIC_NAME, CACHE_IMAGES_NAME, CACHE_FONTS_NAME];

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!currentCaches.includes(cacheName) && cacheName.startsWith('bappa-morya-')) {
              console.log('[SW] Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Helper: Determine if URL is an image request
function isImageRequest(request) {
  const url = request.url.toLowerCase();
  return (
    request.destination === 'image' ||
    url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)(\?.*)?$/i) ||
    url.includes('images.unsplash.com') ||
    url.includes('upload.wikimedia.org') ||
    url.includes('/assets/') && (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.svg'))
  );
}

// Helper: Determine if URL is a font request
function isFontRequest(request) {
  const url = request.url.toLowerCase();
  return (
    request.destination === 'font' ||
    url.includes('fonts.googleapis.com') ||
    url.includes('fonts.gstatic.com') ||
    url.match(/\.(woff|woff2|ttf|otf|eot)(\?.*)?$/i)
  );
}

// Fetch Event: Network-First for Navigation, Cache-First for Images/Fonts/Assets
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Ignore non-GET requests and chrome-extension / internal schemes
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // 1. Navigation requests (HTML pages): Network first with instant cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_STATIC_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          // If offline, serve from cache
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;

          const cachedRoot = await caches.match('/index.html') || await caches.match('/');
          if (cachedRoot) return cachedRoot;

          return new Response(
            '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Bappa Morya - Offline</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;background:#8B4513;color:#FFFDD0;"><h1>॥ गणपती बाप्पा मोरया ॥</h1><p>Bappa Morya is ready offline. Please reload.</p></body></html>',
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // 2. Images: Network-First strategy with cache fallback for offline
  if (isImageRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const copy = networkResponse.clone();
            caches.open(CACHE_IMAGES_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request, { ignoreSearch: true });
          if (cachedResponse) {
            return cachedResponse;
          }
          return new Response(OFFLINE_IMAGE_SVG, {
            headers: { 'Content-Type': 'image/svg+xml' }
          });
        })
    );
    return;
  }

  // 3. Fonts & Stylesheets: Stale-While-Revalidate
  if (isFontRequest(request)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              const copy = networkResponse.clone();
              caches.open(CACHE_FONTS_NAME).then((cache) => cache.put(request, copy));
            }
            return networkResponse;
          })
          .catch(() => null);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 4. Scripts & Bundled Static Assets: Cache-First / Network-Fallback with Dynamic Cache
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_STATIC_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and request is an asset, try matching ignoreSearch
          return caches.match(request, { ignoreSearch: true });
        });
    })
  );
});

// Listen for message from client (e.g. skipWaiting or cache refresh)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
