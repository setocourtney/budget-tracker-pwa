const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/assets/css/styles.css",
  "/dist/app.bundle.js",
  "/dist/icon_192x192.png",
  "/dist/icon_512x512.png",
  '/dist/manifest.json'
];

const CACHE_NAME = "static-cache-v1";
const DATA_CACHE_NAME = "data-cache-v1"
importScripts("./dist/indexedDb.bundle.js");

// install
self.addEventListener("install", function(evt) {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

// activate
self.addEventListener("activate", function(evt) {
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

// fetch
self.addEventListener("fetch", function(evt) {
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(evt.request)
          .then(response => {
            // If the response was good, clone it and store it in the cache.
            if (response.status === 200) {
              cache.put(evt.request.url, response.clone());
            }

            return response;
          })
          .catch(err => {
            // Network request failed, try to get it from the cache.
            return cache.match(evt.request);
          });
      }).catch(err => console.log(err))
    );

    return;
  }

  evt.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(evt.request).then(response => {
        return response || fetch(evt.request);
      });
    })
  );
});

//post transactions when back online
self.addEventListener('sync', function(evt) {
  if (evt.tag === "post-offline-transactions") {
    evt.waitUntil(
      idb.useIndexedDb("offlineDb", "offlineTransactions", "get")
      .then(transactions => {
        fetch("/api/transaction/bulk", {
          method: "POST",
          body: JSON.stringify(transactions),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          idb.useIndexedDb("offlineDb", "offlineTransactions", "clear")
          .then(() => {
            console.log("offlineTransactionshas been cleared");
          })
          .catch((err) => {
            console.error(`Problem with clearing offlineTransactions ${err}`);
          })
        })
      })
      .catch((err) => {
        console.error(`Problem with posting offlineTransactions to MongoDB ${err}`);
      })
    );
  }
});