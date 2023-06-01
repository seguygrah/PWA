var cacheName = "petstore-v1";
var cacheFiles = [
    'index.html',
    'products.js',
    'petstore1.webmanifest',
    'images/one.jpg',
    'images/two.jpg',
    'images/three.jpg',
    'images/four.jpg',
    'images/one.jpg',
    'images/icon-store-512.png',
]

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching app shell');
            return cache.addAll(cacheFiles);
        })
    );
});

// self.addEventListener('fetch', function (e) {
//     e.respondWith(
//         caches.match(e.request).then(function (r) {
//             console.log('[Service Worker] Fetching resources', e.request.url);
//             return r
//         })
//     );
    
// });

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            })
        })
    );
    
});