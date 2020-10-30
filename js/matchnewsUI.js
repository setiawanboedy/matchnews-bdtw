// showStanding data
function showStandings(data){
    let content = '';
    let no = 1;

    data.standings[0].table.forEach(standing => {
        content += `
            <tr>
            <td>${no}</td>
            <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="${standing.team.name}"/></td>
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
    document.getElementById('standing').innerHTML = `
    <h6>Math Day : ${data.season.currentMatchday}</h6>
    <table class="striped centered bordered" style="margin-top: 20px;">
       <thead>
          <tr>
             <th>#</th>
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

function showDataTeam(data) {
    let content = '';

    data.teams.forEach(team => {
        content += `
            <div class="col s12 info">
                <div class="card horizontal" >
                <div class="responsive-img" style="margin:10px;">
                    <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="${team.name}"/>
                </div>
                <div class="card-stacked">
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
                </div>
            </div>
        `;
    });

    document.getElementById('team').innerHTML = content; 

}

function showDataMatches(data) {
    let content = '';
    let no = 1;

    data.matches.forEach((matches) => {
        content += `
            <tr>
            <td>${no}</td>
            <td>${matches.homeTeam.name}</td>
            <td>VS</td>
            <td>${matches.awayTeam.name}</td>
            <td>${matches.status}</td>
            <td>${moment.utc(matches.utcDate).format("DD/MM/YYYY, h:mm:ss a")}</td>
            <td>
            
                <a class="waves-effect waves-light btn-small blue" onClick="savedMatchesById(${matches.id})">
                    <i class="small material-icons">save</i>
                </a>
            
            </td>
            </tr>
        `;

        no++;
});

document.getElementById('matches').innerHTML = `
    <h6>Math Day : ${data.matches[0].season.currentMatchday}</h6>
    <table class="responsive-table centered" style="margin-top: 20px;">
        <thead>
            <tr>
            <th>#</th>
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
function savedMatches(){
    getAllData().then(data => {
        // if(data.length == 0) return document.getElementById("saved").innerHTML = '';
        let content = '';
        let no = 1;
        data.forEach(matches => {
            content += `
            <tr>
            <td>${no}</td>
            <td>${matches.homeTeam.name}</td>
            <td>VS</td>
            <td>${matches.awayTeam.name}</td>
            <td>${matches.status}</td>
            <td>${moment.utc(matches.utcDate).format("DD/MM/YYYY, h:mm:ss a")}</td>
            <td>
            
               <a class="waves-effect waves-light btn-small red" onClick="deleteMatchesById(${matches.id})">
                  <i class="small material-icons">delete</i>
               </a>
            
            </td>
          </tr>
            `;
            no++;
        })
        document.getElementById("saved").innerHTML = `
       <table class="responsive-table centered" style="margin-top: 20px;">
          <thead>
             <tr>
                <th>#</th>
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
        `
    })
}

// Loader
function showLoader(){
    let loader = `
    <div class="preloader-wrapper big active">
        <div class="spinner-layer spinner-blue-only">
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
    document.getElementById('loader').innerHTML = loader;
}

function hideLoader(){
    document.getElementById('loader').innerHTML = '';
}