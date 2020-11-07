importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
   console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
   [
      {url: 'nav.html', revision: '1'},
      {url: 'index.html', revision: '1'},
      {url: 'detailteam.html', revision: '1'},
      {url: 'manifest.json', revision: '1'},
      {url: 'img/profile.jpg', revision: '1'},
      {url: 'img/favicon.png', revision: '1'},
      {url: 'icon192x192.png', revision: '1'},
      {url: 'icon512x512.png', revision: '1'},
      {url: 'pages/infoteam.html', revision: '1'},
      {url: 'pages/standing.html', revision: '1'},
      {url: 'pages/matches.html', revision: '1'},
      {url: 'pages/saved.html', revision: '1'},
      {url: 'css/materialize.min.css', revision: '1'},
      {url: 'css/style.css', revision: '1'},
      {url: 'js/materialize.min.js', revision: '1'},
      {url: 'js/nav.js', revision: '1'},
      {url: 'js/api.js', revision: '1'},
      {url: 'js/db.js', revision: '1'},
      {url: 'js/idb.js', revision: '1'},
      {url: 'js/allcaches.js', revision: '1'},
      {url: 'js/matchnewsui.js', revision: '1'},
      {url: 'js/moment.js', revision: '1'},
      {url: 'js/script.js', revision: '1'},
      {url: 'https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js', revision: '1' },
      {url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
   ], {
      ignoreUrlParametersMatching : [/.*/] 
   }
);

workbox.routing.registerRoute(
   new RegExp('/css/'),
      workbox.strategies.staleWhileRevalidate({
         cacheName: 'styles'
      })
);

workbox.routing.registerRoute(
   new RegExp('/js/'),
      workbox.strategies.staleWhileRevalidate({
         cacheName: 'javascript'
      })
);

workbox.routing.registerRoute(
   /\.(?:png|gif|jpg|jpeg|svg)$/,
   workbox.strategies.staleWhileRevalidate({
      plugins: [
         new workbox.expiration.Plugin({
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60
         }),
     ],
   })
);

workbox.routing.registerRoute(
   new RegExp('/pages/'),
      workbox.strategies.staleWhileRevalidate({
         cacheName: 'pages'
      })
);

workbox.routing.registerRoute(
   new RegExp('https://api.football-data.org/v2/'),
   workbox.strategies.staleWhileRevalidate({
      cacheName: 'Api-cache', 
      plugins: [
         new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
         }),
         new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
         }),
      ]
   })
);

self.addEventListener('push', (event) => {
   let body;

   if (event.data) {
      body = event.data.text();
   } else {
      body = 'Push message no payload';
   }

   let options = {
      body: body,
      icon: 'img/favicon.png',
      vibrate: [100, 50, 100],
      data: {
         dateOfArrival: Date.now(),
         primaryKey: 1
      }
   };

   event.waitUntil(
      self.registration.showNotification('Push Notification', options)
   );
});