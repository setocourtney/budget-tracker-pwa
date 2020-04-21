import { useIndexedDb } from "./assets/js/indexedDb.js";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/dist/sw.bundle.js")
        .then(reg => {
          sw = reg;
          console.log("We found your service worker file!", reg);
        })
    });
  }


self.addEventListener('sync', function(evt) {
    if (evt.tag === "post-offline-transactions") {
      evt.waitUntil(
        useIndexedDb("offlineDb", "offlineTransactions", "get")
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
            return response.json();
          })
          .then((data) => {
            useIndexedDb("offlineDb", "offlineTransactions", "clear")
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