document.addEventListener("DOMContentLoaded",function() {
    
    // aktivkan sidebar
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    // load navabar function
    loadNav();

    let page = window.location.hash.substr(1);
    if (page === "") page = 'standing';
    loadPage(page);

    function loadNav(){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4){
                if (this.status != 200)return;

                // muat menu
                document.querySelectorAll(".topnav, .sidenav")
                .forEach( elm => {
                    elm.innerHTML = xhttp.responseText;
                });

                // daftarkan event listerner untuk setiap tautan
                document.querySelectorAll(".sidenav a, .topnav a")
                .forEach( elm => {
                    elm.addEventListener("click", event => {
                        // tutup sidenav
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                    
                         // muat halaman konten yang dipanggil
                        page = event.target.getAttribute('href').substr(1);
                        // panggil page
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "nav.html",true);
        xhttp.send();
    }

    function loadPage(page){
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            const content = document.querySelector("#content");
            if (this.readyState === 4) {

                if (this.status === 200) {
                    content.innerHTML = xhttp.responseText;

                    if(page === 'standing'){
                        getDataStandings();
                    }
                    else if (page === 'infoteam'){
                        getDataTeam();
                    }else if (page === 'matches'){
                        getDataMatches();
    
                    }else{
                        savedMatches();
                    }
                }else if (this.status === 404) {
                    content.innerHTML = "<h1>Error 404</h1>";
                }else {
                    content.innerHTML = "<h1>Maaf halaman tidak dapat diakses</h1>";
                }
            }
        };

        xhttp.open("GET", `pages/${page}.html`,true);
        xhttp.send();
    }
});