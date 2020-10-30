// Open or create database
let dbPromised = idb.open("MatchNews", 1, (upgradeDb) => {
   let matchObjectStore = upgradeDb.createObjectStore("match", {
     keyPath: "id"
   });

   matchObjectStore.createIndex("match", "match", { unique: false });
});



