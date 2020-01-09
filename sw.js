// let nameList = "v1";
// self.addEventListener("install", e => {
//   e.waitUntil(
//     caches.open(nameList).then(cache => {
//         console.log("caching");
//         return cache.addAll([
//           'index.html',
//           'about.html',
//           'contact.html',
//           'staff.html',
//           'normalize/normalize.css',
//           'css/about.css',
//           'css/contact.css',
//           'css/index.css',
//           'css/staff.css',
//           'main.js',
//           'sw.js'
//         ]);
//       })
//       .then(() => self.skipWaiting())
//   );
// });

// self.addEventListener('activate', e => {
//   console.log('Activating');
//   e.waitUntil(
//     Promise.all([
//       clients.claim(), 
//       caches.keys().then(cacheNames => {
//         return Promise.all(
//           cacheNames.map(cache => {
//             if (cache !== nameList) {
//               return caches.delete(cache);
//             }
//           })
//         )
//         }
//       )
//     ])
//   )
// });

// // self.addEventListener('fetch', e => {
// //   console.log("Fetching");
// //   e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
// // });

// self.addEventListener('fetch', function(event) {
//   console.log("Fetching");
//   event.respondWith(
//     caches.match(event.request)
//       .then(function(response) {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//     )
//   );
// })





const cacheName = 'v1';
const cachedAssets = [
 'index.html',
 'about.html',
 'contact.html',
 'staff.html',
 'normalize/normalize.css',
 'css/about.css',
 'css/contact.css',
 'css/index.css',
 'css/staff.css',
 'main.js',
 'sw.js'
];

self.addEventListener('install', e => {
  console.log('install');
  e.waitUntil(
    caches.open(cacheName).then(cache => { return cache.addAll(cachedAssets);})
    .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('Activating');
  e.waitUntil(
    Promise.all([
      clients.claim(), 
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              return caches.delete(cache);
            }
          })
        )
        }
      )
    ])
  )
});

self.addEventListener('fetch', e => {
  console.log('fetch');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});