importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js');

const CACHE = "pwabuilder-offline";

const offlineFiles = [
    '/index.php',
    '/pwa/manifest.json',
    '/assets/uploads/site/favicon.png',
    '/pwa/imagens/128.png',
    '/pwa/imagens/144.png',
    '/pwa/imagens/152.png',
    '/pwa/imagens/192.png',
    '/pwa/imagens/256.png',
    '/pwa/imagens/512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE).then(cache => {
            return Promise.all(
                offlineFiles.map(url => {
                    return cache.add(url).catch(err => {
                        console.error(`Falha ao cachear ${url}:`, err);
                        return null; // Ignora falhas individuais
                    });
                })
            ).then(() => {
                console.log('Cache concluído para arquivos disponíveis.');
            });
        }).catch(err => {
            console.error('Erro ao abrir o cache:', err);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE)
                    .map(name => caches.delete(name))
            );
        }).then(() => {
            console.log('Caches antigos limpos.');
        })
    );
});

self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate' || request.destination === 'document',
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: CACHE,
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            })
        ]
    })
);

workbox.routing.registerRoute(
    ({ request }) => ['image', 'style', 'script'].includes(request.destination),
    new workbox.strategies.CacheFirst({
        cacheName: 'resources-cache',
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxAgeSeconds: 60 * 24 * 60 * 60, // 60 dias
                maxEntries: 50,
            }),
            new workbox.cacheableResponse.CacheableResponsePlugin({
                statuses: [0, 200],
            })
        ]
    })
);

workbox.core.skipWaiting();
workbox.core.clientsClaim();