let url, title, views, mode;
let obj;

function onLoad() {
    loadJSON();


    const urlString = localStorage.getItem('urlVideo');
    const urlObj = JSON.parse(urlString);

    const titleString = localStorage.getItem('titleVideo');
    const titleObj = JSON.parse(titleString);

    const viewsString = localStorage.getItem('viewsVideo');
    const viewsObj = JSON.parse(viewsString);

    const modeString = localStorage.getItem('modeVideo');
    const modeObj = JSON.parse(modeString);

    url = urlObj.url;
    title = titleObj.title;
    views = viewsObj.views;
    // mode = modeObj.modeVideo;

    var player = document.getElementById("playerVideo");
    code = "<iframe class=\"box\" id=\"player\" src=\"" + url + "\" frameborder=\"0\" scrolling=\"yes\" seamless=\"seamless\"></iframe>"
        + "<div id=\"informationsVideo\">"
        + "<p class=\"textVideoInfoEtendu\"><b> " + title + "</b> | " + views + " vues</p>"
        + "<input type=\"button\" class=\"ajouterBouton\" value=\"+\" onclick=\"boutonAjouter()\"/>"
        + "<p class=\"textVideoInfoEtendu\">Plateforme : Youtube </p></div>";

    player.innerHTML = code;        
    let box = document.querySelector(".box");
    let widthV = box.offsetWidth;
    let heigthV = (widthV * 574)/1021; 
    let heigthStr = heigthV + "px";
    document.getElementById("playerVideo").style.height = heigthStr;
    // document.getElementById("playerVideo").style.width = heigthStr;
    console.log((widthV * 574)/1021 + "px");
}


function boutonRechercher() {
    var param = document.getElementById("rechercher").value;
    const obj = { parametres: param };
    const paramString = JSON.stringify(obj);
    localStorage.setItem('parametres', paramString);
    window.location.href = "/accueil";
}

async function loadJSON() {
    idAjouterBouton = 0;
    url = '../static/js/starwars.json';
    let obj, code = "";
    var iPub = 0;

    await fetch(url)
        .then((response) => response.json())
        .then((data) => { obj = data; });

    obj.video_results.forEach(function (element) {
        link = element.link
        title = element.title
        views = element.views

        link = link.replace("watch?v=", "embed/");
        title = title.replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;")
            .replace(/ /g, "&ensp;")
            .replace(/'/g, "&apos;")
            .replace(/,/g, "&#44;");

        code += "<li class='videoList'>"
            + "<img class='thumbnail' src=\"" + element.thumbnail.static
            + " \" onclick=clickVideo(\"" + link + "\",\"" + title + "\",\"" + views + "\")>"
            + "<div class=\"suggestionDiv\">"
            + "<p class=\"textVideoInfo\">" + title + "</p>"
            + "<p class=\"textVideoInfo\">" + "Youtube" + "</p>"
            + "<p class=\"textVideoInfo\">" + views + "</p>"
            + "<input type=\"button\" class=\"ajouterBouton\" id=\"boutonAjouter" + idAjouterBouton + "\" value=\"+\" onclick=\"boutonAjouter(this.id)\"/>"
            + "</div></li>";

        idAjouterBouton++;
        iPub++;
        if (iPub == 3) {
            iPub = 0;
            code += "<li class='videoList'>"
                + "<div id=\"videoListPubDiv\"><p class=\"textVideoInfo\">" + "PUB" + "</p></div>"
                + "</li>";
        }
        document.getElementById("suggestionVideo").innerHTML = code;
    });
}