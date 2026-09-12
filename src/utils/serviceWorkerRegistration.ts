/**
 * Service Worker Registration & Offline Network Detection Helper
 */

type SWCallback = () => void;

interface ServiceWorkerConfig {
  onSuccess?: SWCallback;
  onUpdate?: SWCallback;
  onOffline?: SWCallback;
  onOnline?: SWCallback;
}

export function registerServiceWorker(config?: ServiceWorkerConfig) {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = '/sw.js';

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          // Check for updates on page load
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New content is available and will be used when all tabs are closed
                  if (config && config.onUpdate) {
                    config.onUpdate();
                  }
                } else {
                  // Content is cached for offline use
                  if (config && config.onSuccess) {
                    config.onSuccess();
                  }
                }
              }
            };
          };
        })
        .catch((error) => {
          console.warn('[SW] Service worker registration failed:', error);
        });
    });

    // Listen for online / offline network state changes
    window.addEventListener('offline', () => {
      if (config && config.onOffline) {
        config.onOffline();
      }
    });

    window.addEventListener('online', () => {
      if (config && config.onOnline) {
        config.onOnline();
      }
    });
  }
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
