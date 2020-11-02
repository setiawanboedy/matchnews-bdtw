const CACHE_NAME = "MatchNews";
let urlToChache = [

  // html
  "/",
  "/index.html",
  "/nav.html",
  "/detailteam.html",
  "/pages/standing.html",
  "/pages/infoteam.html",
  "/pages/matches.html",
  "/pages/saved.html",

  // css
  "/css/materialize.css",
  "/css/materialize.min.css",
  "/css/style.css",

  // js
  "/manifest.json",
  "/js/api.js",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/script.js",
  "/js/moment.js",
  "/js/matchnewsUI.js",
  "/js/allcaches.js",
  "/js/db/db_op.js",
  "/js/db/db.js",
  "/js/db/idb.js",

  // images
  "/icon192x192.png",
  "/icon512x512.png",
  "/img/favicon.png",
  "/img/profile.jpg",
  "/img/bg.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlToChache);
      })
  )
});

self.addEventListener("fetch", event => {

  const base_url = "https://api.football-data.org/";

  console.log(event.request.url.indexOf(base_url));
  if (event.request.url.indexOf(base_url) > -1) {

    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return fetch(event.request).then(response => {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    )
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(response => {
        return response || fetch(event.request);
      })
    )
  }
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName)
          }
        })
      ).catch(error => {
        console.log(error);
      })
    })
  )
});

// event push
self.addEventListener('push', event => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push Message no payload';
  }
  let options = {
    body: body,
    icon: '/img/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Match News Football', options)
  );
});
