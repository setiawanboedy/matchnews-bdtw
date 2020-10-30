const API_KEY = 'ef72570ff371408f9668e414353b7b2e';
const BASE_URL = 'https://api.football-data.org/v2/';
const END_POINT = `${BASE_URL}competitions/2021/`;

// cek status
function status(response){
    if (response.status !== 200) {
        console.log(`status error: ${response.status}`);
        return Promise.reject(new Error (response.statusText));
    }else{
        return Promise.resolve(response);
    }
}

// get response json
function json(response){
    return response.json();
}

// catch error
function err(err){
    console.log(err);
}

// data dari api
function fetchApi(BASE_URL) {
    return fetch(BASE_URL, {
      headers: {
         
            "X-Auth-Token" : API_KEY
        }
    })
    .then(status)
    .then(json)
    .catch(err)
}

// get cache DataKlasemen
function cachesDataStandings(){
   if ('caches' in window) {
      caches.match(END_POINT + 'standings')
      .then(response => {
         if(response) {
            response.json()
            .then(data => {
               console.log(data);
               showStandings(data);
            })
         }
      })
   }
}


// multi parsing
const getDataStandings = () => {
   showLoader();
   cachesDataStandings();
   const newsListElement = document.getElementById("standing");
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
         
         const result = await fetch(
               `${BASE_URL}competitions/${paramString}/standings`,
               {
                  headers: {
                     "X-Auth-Token" : API_KEY
                  },
               }
         );

         const resultJson = await result.json();
         if (resultJson) {
            renderResult(resultJson);
         
         } else {
            fallbackResult(
               `Tidak ada berita dengan kata kunci di kategori ${category}.`
            );
         }
      
      }
      catch (error) {
         fallbackResult(error);
      }
   };

   const renderResult = (results) => {
      showStandings(results);
      hideLoader();
   };

   const fallbackResult = (message) => {
      console.error(message);
   };

   const onFilterItemClicked = (event) => {
      showLoader();
      document
         .querySelector(".filter-item.active")
         .classList.remove("active");

      event.target.classList.add("active");
      category = event.target.getAttribute("data-value");
      getStandings();
   };

   categoryElements.forEach((item) => {
      item.addEventListener("click", onFilterItemClicked);
      
   });
   getStandings();
}

 // get caches DataTeam
 function cachesDataTeam(){
    if ('caches' in window){
      caches.match(END_POINT + 'teams')
      .then(response => {
         if(response){
            response.json()
            .then(data => {
               console.log(data);
               showDataTeam(data);
            })
         }
      })
    }
 }

function getDataTeam(){
    
   showLoader();
   cachesDataTeam();
   fetchApi(`${END_POINT}teams`)

   .then(data => {
        showDataTeam(data);
        hideLoader();
    })
    .catch(error => {
        console.log(error);
    })
}
 
 // get caches Data Matches
 function cachesDataMatches(){
    if('caches' in window){
       caches.match(END_POINT + 'matches?status=SCHEDULED')
       .then(response => {
          if(response){
             response.json().then(data => {
                console.log(data);
                showDataMatches(data);
             })
          }
       })
    }
 }

 // get data from matches 
function getDataMatches() {

   showLoader();
   cachesDataMatches();
   fetchApi(`${END_POINT}matches?status=SCHEDULED`)
 
   .then(data => {
         showDataMatches(data);
         hideLoader();
      })
      .catch(error => {
         console.log(error);
      })
 }
 
// function for get match 
function getMatchesById(id){
   return new Promise((resolve, reject) => {
      if('caches' in window){
         caches.match(BASE_URL + 'matches/' + id)
         .then(response => {
            if(response){
               response.json().then(data => {
                  resolve(data);
               })
            }
         })
      }

      fetchApi(BASE_URL + 'matches/' + id)

      .then(data => {
         resolve(data);
         
         console.log(data);
      })
   })
   .catch(error => {
      console.error(error);
   })
}

