let url, title, views;

function getUrl() {
    const urlString = localStorage.getItem('urlVideo');
    const urlObj = JSON.parse(urlString);

    const titleString = localStorage.getItem('titleVideo');
    const titleObj = JSON.parse(titleString);

    const viewsString = localStorage.getItem('viewsVideo');
    const viewsObj = JSON.parse(viewsString);

    url = urlObj.url;
    title = titleObj.title;
    views = viewsObj.views;

    console.log(views);
    localStorage.clear();

    var player = document.getElementById("playerVideo");
    code = "<iframe id=\"player\" width=\"640\" height=\"360\" src=\""+ url + "\"></iframe>"
        + "<div id=\"informationsVideo\">"
        + "<p> " + title + "</p>"
        + "<p> " + views + "</p>"
        + "<p>Plateforme : Youtube </p></div>";
    console.log(code);
    player.innerHTML = code;
}

function boutonRechercher() {
    var param = document.getElementById("rechercher").value;
    const obj = { parametres: param };
    const paramString = JSON.stringify(obj);
    localStorage.setItem('parametres', paramString);
    window.location.href = "/accueil";
}
