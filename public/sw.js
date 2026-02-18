/**
 * Service Worker for DMV DJ Sessions PWA
 * Provides offline support and caching strategies
 */

const CACHE_NAME = 'dmvdj-v1'
const STATIC_CACHE = 'dmvdj-static-v1'
const DYNAMIC_CACHE = 'dmvdj-dynamic-v1'

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/offline.html'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('[SW] Static assets cached')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return name.startsWith('dmvdj-') &&
                     name !== STATIC_CACHE &&
                     name !== DYNAMIC_CACHE
            })
            .map((name) => {
              console.log('[SW] Deleting old cache:', name)
              return caches.delete(name)
            })
        )
      })
      .then(() => {
        console.log('[SW] Service worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return
  }

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Skip API requests (if you have any)
  if (url.pathname.startsWith('/api/')) {
    return
  }

  // For HTML pages - Network first, fallback to cache
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the response
          const responseClone = response.clone()
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone)
          })
          return response
        })
        .catch(() => {
          return caches.match(request)
            .then((response) => {
              return response || caches.match('/offline.html')
            })
        })
    )
    return
  }

  // For other assets - Cache first, fallback to network
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse
        }

        return fetch(request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200) {
              return response
            }

            // Clone and cache the response
            const responseClone = response.clone()
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone)
            })

            return response
          })
          .catch((error) => {
            console.error('[SW] Fetch failed:', error)

            // Return placeholder for images
            if (request.destination === 'image') {
              return caches.match('/icons/icon-192x192.png')
            }

            throw error
          })
      })
  )
})

// Background sync for form submissions (future use)
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag)

  if (event.tag === 'submit-form') {
    event.waitUntil(
      // Handle form sync when implemented
      Promise.resolve()
    )
  }
})

// Push notifications (future use)
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event.data?.text())

  const data = event.data?.json() || {
    title: 'DMV DJ Sessions',
    body: 'New content available!',
    icon: '/icons/icon-192x192.png'
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      data: data.data
    })
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.notification.tag)

  event.notification.close()

  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        // Focus existing window or open new one
        for (const client of clientList) {
          if ('focus' in client) {
            return client.focus()
          }
        }
        return clients.openWindow(event.notification.data?.url || '/')
      })
  )
})
