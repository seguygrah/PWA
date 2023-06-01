var cacheName = 'petstore-v1';
var cacheFiles = 
[
    'index.html',
    'product.js',
    'petstore1.webmanifest',
    'images/one.jpg',
    'images/two.jpg',
    'images/three.jpg',
    'images/four.jpg',
    'images/icon-store-512.png'

]
self.addEventListener('install', (e) => 
{
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open (cacheName).then ((cache) =>
        {
            console.log ('[Service Worker] Caching all the files');
            return cache.addAll (cacheFiles);
        })
    )
});

self.addEventListener('fetch', function (e)
{
    e.respondWith 
(
    //check if the cache has the file
    caches.match(e.request).then (function (r)
    {
        console.log('[Service Worker] Fecthing resource: '+ e.request.url);
    //'r' is the matching file if it exists in the cache
    return r    
    })
);
});
