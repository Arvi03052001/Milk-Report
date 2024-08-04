const CACHE_NAME = 'my-app-cache-v1';
const CACHE_FILES = [
    'index.html',
    'login.html',
    'main.html',
    'price.html',
    'service-worker.js',
    'payment.html',
    'am_milk.html',
    'pm_milk.html',
    'am_countlist.html',
    'morning_data.html',
    'user_list.html',
    'user_add.html',
    'user_remove.html',
    'users.html',
    'check.html',
    'style.css',
    'script.js',
];

// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CACHE_FILES))
            .then(() => self.skipWaiting())
    );
});

// Activate event
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => 
            Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
