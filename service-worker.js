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
        caches.open (cacheName).then((cache) =>
        {
            console.log ('[Service Worker] Caching app shell');
            return cache.addAll(cacheFiles);
        })
    )
});

// self.addEventListener('fetch', function (e)
// {
//     e.respondWith 
// (
//     //check if the cache has the file
//     caches.match(e.request).then (function (r)
//     {
//         console.log('[Service Worker] Fecthing resource: '+ e.request.url);
//     //'r' is the matching file if it exists in the cache
//     return r    
//     })
// );
// });
self.addEventListener('fetch', function (e)
{
    e.respondWith(
        caches.match(e.request).then(function (r)
        {
            //download the file if it is not in the cache,
            return r || fetch(e.request).then(function (response)
            {
                // add the new file to cache
                return caches.open(cacheName).then(function (cache)
                {
                    cache.put(e.request, response.clone());
                    return response;
                });
            })
        })
    );
});