// showScoreResult
function showScoreResult(data) {
  let content = `
          
            <div class="row">
                <div class="col s12 center-align">
                    <div class="center-align size" >
                        <img src="${data.match.competition.area.ensignUrl.replace(
                          /^http:\/\//i,
                          "https://"
                        )}" alt="Match Area">
                    </div>
                </div>
                <div class="col s6 center-align"><h4>${
                  data.match.homeTeam.name
                }</h4></div>
                <div class="col s6 center-align"><h4>${
                  data.match.awayTeam.name
                }</h4></div>
                <div class="col s6 center-align"><h2>${
                  data.match.score.fullTime.homeTeam
                }</h2></div>
                <div class="col s6 center-align"><h2>${
                  data.match.score.fullTime.awayTeam
                }</h2></div>
            </div>

    `;
  document.getElementById("scoreResult").innerHTML = content;
}
// showStanding data
function showStandings(data) {
  let content = "";
  let no = 1;

  data.standings[0].table.forEach((standing) => {
    content += `
            <tr>
            <td>${no}</td>
            <td><img src="${standing.team.crestUrl.replace(
              /^http:\/\//i,
              "https://"
            )}" width="30px" alt="${standing.team.name}"/></td>
            <td>${standing.won}</td>
            <td>${standing.draw}</td>
            <td>${standing.lost}</td>
            <td>${standing.points}</td>
            <td>${standing.goalsFor}</td>
            <td>${standing.goalsAgainst}</td>
            <td>${standing.goalDifference}</td>
            </tr>
        `;
    no++;
  });
  document.getElementById("standing").innerHTML = `
    <h6>Math Day : ${data.season.currentMatchday}</h6>
    <table class="striped centered responsive-table" style="margin-top: 20px;">
       <thead class="cyan darken-3 white-text">
          <tr>
             <th>No</th>
             <th>Team</th>
             <th>W</th>
             <th>D</th>
             <th>L</th>
             <th>P</th>
             <th>GF</th>
             <th>GA</th>
             <th>GD</th>
          </tr>
       </thead>
       <tbody id="standings">
          ${content}
       </tbody>
    </table>
 `;
}

// show data team
function showDataTeam(data) {
  let content = "";

  data.teams.forEach((team) => {
    content += `
            <div class="col s12 info">
            <a href="./detailteam.html?id=${team.id}">
                <div class="card horizontal hoverable">
                <div class="responsive-img" style="margin:10px;">
                    <img src="${team.crestUrl.replace(
                      /^http:\/\//i,
                      "https://"
                    )}" alt="${team.name}"/>
                </div>
                <div class="card-stacked cyan darken-3 white-text hide-on-small-only">
                    <div class="card-title">
                        <h4 class="center">${team.name}</h6>
                    </div>
                    <div class="card-content">
                        <h6 class="center-align">Short Info:</h6>
                        <p class="center-align">Shor Name: ${team.shortName}</p>
                        <p class="center-align">Address: ${team.address}</p>
                        <p class="center-align">Phone: ${team.phone}</p>
                        <p class="center-align">Founded: ${team.founded}</p>
                        <p class="center-align">Venue: ${team.venue}</p>
                    </div>
                </div>
                <div class="card-stacked cyan darken-3 white-text hide-on-large-only">
                    <div class="card-title">
                        <h4 class="center">${team.name}</h6>
                    </div>
                </div>
                
                </div>
            </div>
        `;
  });

  document.getElementById("team").innerHTML = content;
}

// show artikel get by id
function showTeamById(data) {
  let contentItem = ``;
  let no = 1;
  data.squad.forEach((item) => {
    contentItem += `
        <tr>
            <td>${no}</td>
            <td>${item.name}</td>
            <td>${item.position ? item.position : "-"}</td>
            <td>${moment.utc(item.dateOfBirth).format("DD/MM/YYYY")}</td>
            <td>${item.nationality}</td>
            <td>${item.role}</td>
            
        </tr>
        `;
    no++;
  });

  document.getElementById("content").innerHTML = `
    <div class="col s12 info">
        <div class="card">
        <div class="responsive-img center-align" style="margin-top:10px;">
            <img style="margin-top:30px;" src="${data.crestUrl.replace(
              /^http:\/\//i,
              "https://"
            )}" alt="${data.name}"/>
        </div>
        <div class="card-stacked">
            <div class="card-title">
                <h4 class="center">${data.name}</h6>
            </div>
            <div class="card-content">
                <h6 class="center-align">Short Info:</h6>
                <p class="center-align">Shor Name: ${data.shortName}</p>
                <p class="center-align">Address: ${data.address}</p>
                <p class="center-align">Phone: ${data.phone}</p>
                <p class="center-align">Founded: ${data.founded}</p>
                <p class="center-align">Venue: ${data.venue}</p>
            </div>
            </div>
            </div>
            <div class="card">
            <div><h4 class="center-align" style="padding: 5px;">Squad Team</h4></div>
            <div class="divider"></div>
            <table class="responsive-table striped centered" style="margin-top: 20px;">
            <thead class="cyan darken-3 white-text">
                <tr>
                <th>No</th>
                <th>Name</th>
                <th>Position</th>
                <th>Date Birth</th>
                <th>Nationality</th>
                <th>Role</th>
                </tr>
            </thead>
            <tbody>
                ${contentItem}
            </tbody>
        </table>
        </div>
    </div>
    `;
}

function showDataMatches(data) {
  let content = "";
  let no = 1;

  data.matches.forEach((matches) => {
    content += `
            <tr>
            <td>${no}</td>
            <td>${matches.homeTeam.name}</td>
            <td>VS</td>
            <td>${matches.awayTeam.name}</td>
            <td>${matches.status}</td>
            <td>${moment
              .utc(matches.utcDate)
              .format("DD/MM/YYYY, h:mm:ss a")}</td>
            <td>
            
                <a class="waves-effect waves-light btn-small blue" onClick="savedMatchesById(${
                  matches.id
                })">
                    <i class="small material-icons">save</i>
                </a>
            </td>
            </tr>
        `;
    no++;
  });

  document.getElementById("matches").innerHTML = `
    <h6>Math Day : ${data.matches[0].season.currentMatchday}</h6>
    <table class="responsive-table striped centered" style="margin-top: 20px;">
        <thead class="cyan darken-3 white-text">
            <tr>
            <th>No</th>
            <th>Home Team</th>
            <th></th>
            <th>Away Team</th>
            <th>Status</th>
            <th>Schedule</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody >
            ${content}
        </tbody>
    </table>
`;
}

// save match item sechedule
function savedMatches() {
  getAllData().then((data) => {
    // if(data.length == 0) return document.getElementById("saved").innerHTML = '';
    let content = "";
    let no = 1;
    data.forEach((matches) => {
      content += `
            <tr>
            <td>${no}</td>
            <td>${matches.homeTeam.name}</td>
            <td>VS</td>
            <td>${matches.awayTeam.name}</td>
            <td>${matches.status}</td>
            <td>${moment
              .utc(matches.utcDate)
              .format("DD/MM/YYYY, h:mm:ss a")}</td>
            <td>
               <a class="waves-effect waves-light btn-small red" onClick="deleteMatchesById(${
                 matches.id
               })">
                  <i class="small material-icons">delete</i>
               </a>
            </td>
          </tr>
            `;
      no++;
    });
    document.getElementById("saved").innerHTML = `
       <table class="responsive-table striped centered" style="margin-top: 20px;">
          <thead class="cyan darken-3 white-text">
             <tr>
                <th>No</th>
                <th>Home Team</th>
                <th></th>
                <th>Away Team</th>
                <th>Status</th>
                <th>Schedule</th>
                <th>Action</th>
             </tr>
          </thead>
          <tbody>
             ${content}
          </tbody>
       </table>
        `;
  });
}

// Loader
function showLoader() {
  let loader = `
    <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue">
        <div class="circle-clipper left">
            <div class="circle"></div>
        </div><div class="gap-patch">
            <div class="circle"></div>
        </div><div class="circle-clipper right">
            <div class="circle"></div>
        </div>
        </div>
    </div>
    `;
  document.getElementById("loader").innerHTML = loader;
}

function hideLoader() {
  document.getElementById("loader").innerHTML = "";
}