// get id from onClick=(savedMatchesByID)
window.savedMatchesById = (id) => {
  return new Promise(() => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("match", "readonly");
        const store = tx.objectStore("match");
        return store.get(id);
      })
      .then((data) => {
        if (data == undefined) {
          getMatchesById(id).then((match) => {
            insertDB(match);
          });
        } else {
          M.toast({
            html: "Has been saved",
          });
        }
      })
      .catch(err);
  }).catch(err);
};

// delete saved
window.deleteMatchesById = (id) => {
  deleteDB(id).then(savedMatches());
};

// insert saved
function insertDB(data) {
  dbPromised
    .then((db) => {
      const tx = db.transaction("match", "readwrite");
      const store = tx.objectStore("match");
      console.log("cek: " + data.match);
      store.put(data.match);
      return tx.complete;
    })
    .then(() => {
      M.toast({
        html: "Saved",
      });
    })
    .catch({
      html: "Error",
    });
}

// Get all data
function getAllData() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("match", "readonly");
        let store = tx.objectStore("match");
        return store.getAll();
      })
      .then((data) => {
        resolve(data);
      });
  }).catch(err);
}

// delete DB
function deleteDB(id) {
  return new Promise(() => {
    dbPromised
      .then((db) => {
        const tx = db.transaction("match", "readwrite");
        const store = tx.objectStore("match");
        console.log(id);
        store.delete(id);
        return tx.complete;
      })
      .then(
        M.toast({
          html: "Deleted",
        })
      )
      .catch({
        html: "Error",
      });
  }).catch(err);
}

const dbTeamsMatch = {
  get: async (id) => {
    return (await dbPromised)
      .transaction('match')
      .objectStore('match')
      .get(id);
  }
}