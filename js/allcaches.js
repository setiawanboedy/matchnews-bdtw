// get caches score result
function cachesScoreResultById() {
  if ("caches" in window) {
    caches.match(`${END_POINT}matches?status=FINISHED`).then((response) => {
      if (response) {
        response.json().then((data) => {
          let i = data.matches.length - 1;
          let id = data.matches[i].id;
          cachesScoreResult(id);
        });
      }
    });
  }
}
function cachesScoreResult(id) {
  if ("caches" in window) {
    caches.match(`${BASE_URL}matches/${id}`).then((response) => {
      if (response) {
        response.json().then((data) => {
          showScoreResult(data);
        });
      }
    });
  }
}

// get cache DataKlasemen
function cachesDataStandings(category) {
  if ("caches" in window) {
    caches
      .match(`${BASE_URL}competitions/${category}/standings`)
      .then((response) => {
        if (response) {
          response.json().then((data) => {
            console.log(data);
            showStandings(data);
          });
        }
      });
  }
}

// get caches DataTeam
function cachesDataTeam() {
  if ("caches" in window) {
    caches.match(`${END_POINT}teams`).then((response) => {
      if (response) {
        response.json().then((data) => {
          console.log(data);
          showDataTeam(data);
        });
      }
    });
  }
}

// get caches DataTeamId
function cachesTeamById(id) {
  if ("caches" in window) {
    caches.match(`${BASE_URL}teams/${id}`).then((response) => {
      if (response) {
        response.json().then((data) => {
          console.log(data);
          showTeamById(data);
        });
      }
    });
  }
}

// get caches Data Matches
function cachesDataMatches() {
  if ("caches" in window) {
    caches.match(`${END_POINT}matches?status=SCHEDULED`).then((response) => {
      if (response) {
        response.json().then((data) => {
          console.log(data);
          showDataMatches(data);
        });
      }
    });
  }
}

// caches Matches By Id
function cachesMatchesById(id) {
  if ("caches" in window) {
    caches.match(`${BASE_URL}matches/${id}`).then((response) => {
      if (response) {
        response.json().then((data) => {
          resolve(data);
        });
      }
    });
  }
}
