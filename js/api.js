const API_KEY = "ef72570ff371408f9668e414353b7b2e";
const BASE_URL = "https://api.football-data.org/v2/";
const END_POINT = `${BASE_URL}competitions/2021/`;

// cek status
function status(response) {
  if (response.status !== 200) {
    console.log(`status error: ${response.status}`);
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

// get response json
function jsonRes(response) {
  return response.json();
}

// catch error
function err(err) {
  console.log(err);
}

// headers
let headers = {
  method: "GET",
  headers: {
    "X-Auth-Token": API_KEY,
  },
};

// Match Score Result
function getMatchResult() {
  cachesScoreResultById();
  fetch(`${END_POINT}matches?status=FINISHED`, headers)
    .then(status)
    .then(jsonRes)
    .then((data) => {
      let i = data.matches.length - 1;
      let id = data.matches[i].id;
      console.log(id);
      getMatchResultById(id);
      // console.log(data);
    })
    .catch(err);
}

function getMatchResultById(id) {
  showLoader();
  cachesScoreResult(id);
  fetch(`${BASE_URL}matches/${id}`, headers)
    .then(status)
    .then(jsonRes)
    .then((data) => {
      showScoreResult(data);
      hideLoader();
      console.log(data);
    })
    .catch(err);
}

// multi parsing
function getDataStandings() {
  showLoader();
  const categoryElements = document.querySelectorAll(".filter-item");

  let category = document
    .querySelector(".filter-item.active")
    .getAttribute("data-value");
  let getStandings = async () => {
    try {
      let paramString = "";

      if (category) {
        paramString += `${category}`;
      }
      cachesDataStandings(category);
      const result = await fetch(
        `${BASE_URL}competitions/${paramString}/standings`,
        headers
      );

      const resultJson = await result.json();
      if (resultJson) {
        renderResult(resultJson);
      } else {
        fallbackResult(
          `Tidak ada berita dengan kata kunci di kategori ${category}.`
        );
      }
    } catch (err) {
      fallbackResult(err);
    }
  };

  const renderResult = (results) => {
    showStandings(results);
    hideLoader();
  };

  const fallbackResult = (message) => {
    console.log(message);
  };

  const onFilterItemClicked = (event) => {
    document.querySelector(".filter-item.active").classList.remove("active");

    event.target.classList.add("active");
    category = event.target.getAttribute("data-value");
    getStandings();
  };

  categoryElements.forEach((item) => {
    item.addEventListener("click", onFilterItemClicked);
  });
  getStandings();
}

function getDataTeam() {
  showLoader();
  cachesDataTeam();
  fetch(`${END_POINT}teams`, headers)
    .then(status)
    .then(jsonRes)
    .then((data) => {
      showDataTeam(data);
      hideLoader();
    })
    .catch(err);
}

// Kita get artikel by id
function getTeamById() {
  showLoader();
  // Ambil nilai query parameter (?id=)
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  cachesTeamById(idParam);

  // fetch data
  fetch(`${BASE_URL}teams/${idParam}`, headers)
    .then(status)
    .then(jsonRes)
    .then((data) => {
      console.log(data);
      showTeamById(data);
      hideLoader();
    })
    .catch(err);
}

// get data from matches
function getDataMatches() {
  showLoader();
  cachesDataMatches();
  fetch(`${END_POINT}matches?status=SCHEDULED`, headers)
    .then(status)
    .then(jsonRes)
    .then((data) => {
      showDataMatches(data);
      hideLoader();
    })
    .catch(err);
}

// function for get match
function getMatchesById(id) {
  return new Promise((resolve, reject) => {
    cachesMatchesById(id);
    fetch(`${BASE_URL}matches/${id}`, headers)
      .then(status)
      .then(jsonRes)
      .then((data) => {
        resolve(data);

        console.log(data);
      });
  }).catch(err);
}
