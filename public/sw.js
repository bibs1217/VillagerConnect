const CACHE_NAME = 'villagerconnect-v1'
const STATIC_ASSETS = [
  '/',
  '/entertainment',
  '/news',
  '/elections',
  '/landings',
  '/golf-carts',
  '/golf-courses',
  '/forums',
  '/events',
  '/car-events',
  '/golf-cart-search',
  '/cart-parts',
  '/cart-mechanic',
  '/cart-garage',
  '/cart-forums',
  '/cart-store',
  '/offline.html',
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(STATIC_ASSETS.map(url => cache.add(url).catch(() => null)))
    )
  )
  self.skipWaiting()
})

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return

  if (e.request.url.includes('/api/')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    )
  } else {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached
        return fetch(e.request).then(res => {
          if (!res || res.status !== 200 || res.type === 'opaque') return res
          const clone = res.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone))
          return res
        }).catch(() => caches.match('/offline.html'))
      })
    )
  }
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})
