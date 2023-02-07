videosAccueil = Array();
pubNmb = 0;

//Appelée au chargement de la page
//Regarde s'il y a des valeurs dans le champs input
//Si oui : Effectue une recherche de vidéo (API yt) 
//Si non : Fait rien 
function onLoad() {
    document.getElementsByClassName("mainSection")[0].style.display = "none";

    const inputString = localStorage.getItem('input');
    if (inputString != null) {
        const inputObj = JSON.parse(inputString);
        input = inputObj.input;
        localStorage.removeItem("input");

        $.ajax({
            type: "POST",
            url: "/getDataRechercher",
            data: { input: input },
            success: function (data) {
                callBackGetSuccess(data)
            }
        });
    }
}

//Bouton rechercher (celui avec la loupe)
//Récupère les valeurs du champs pour effectuer une recherche de vidéo (API)
function boutonRechercher() {
    var input = document.getElementById("rechercher").value;
    $.ajax({
        type: "POST",
        url: "/getDataRechercher",
        data: { input: input },
        success: function (data) {
            callBackGetSuccess(data)
        }
    });
}

//Affiche la liste des vidéos correspondant à la recherche associé
//Affiche une pub aléatoire 728x90 chaque 3 vidéos
//Entrée : data = JSON contenant les vidéos récupéres par la recherche de l'API
async function callBackGetSuccess(data) {
    document.getElementsByClassName("mainSection")[0].style.display = "block";
    idAjouterBouton = 0;
    url = '../static/js/starwars.json';
    let code = "";

    var videoThumbnail = document.getElementById('zone_videoThumbnail');
    var iPub = 0;

    //On créer un tableau de Video contenant toutes les vidéos présente dans le JSON data
    data.video_results.forEach(function (element) {
        link = element.link;
        title = element.title;

        //On enlève les caractères spéciaux
        link = link.replace("watch?v=", "embed/");
        title = title.replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;")
            .replace(/ /g, "&ensp;")
            .replace(/'/g, "&apos;")
            .replace(/,/g, "&#44;");

        video = new Video(title, link, element.length, "Youtube", element.thumbnail.static, element.views);
        video.ajouterBoutonId("boutonAjouter" + idAjouterBouton);
        videosAccueil.push(video);
        idAjouterBouton++;
    });

    //Pour chaque vidéo du tableau videosAccueil, on créé un <li></li> avec les informations correspondantes.
    videosAccueil.forEach(function (video) {
        code += "<li class='videoList'>"
            + "<img class='thumbnail' src=\"" + video.thumbnail
            + " \" onclick=clickVideo(\"" + video.lien + "\",\"" + video.titre + "\",\"" + video.vues + "\",\"" + video.thumbnail + "\")>"
            + "<div id=\"videoListTitleDiv\"><p class=\"textVideoInfo\">" + video.titre + "</p></div>"
            + "<div id=\"videoListPlateformeDiv\"><p class=\"textVideoInfo\">" + "Youtube" + "</p></div>"
            + "<div id=\"videoListViewsDiv\"><p class=\"textVideoInfo\">" + video.vues + " vues</p></div>"
            + "<input type=\"button\" class=\"ajouterBouton\" id=\"" + video.boutonID + "\" value=\"+\" onclick=\"boutonAjouterAccueil(this.id)\"/>"
            + "</li>";

        //On met une pub chaque 3 vidéos
        iPub++;
        if (iPub == 3) {
            iPub = 0;
            code += "<li class='videoListPub'>"
                + "<div class=\"videoListPubDiv\" id=\"videoListPubDiv" + pubNmb + "\">"
                + "</div></li>";
            pubNmb = pubNmb + 1;
        }
    })
    videoThumbnail.innerHTML = code;
    affichagePub();
}

//Appelé lorsqu'on veut ajouter une vidéo à une playlist
//Entrée : id du bouton + appuyé
function boutonAjouterAccueil(idBouton) {
    boutonAjouter(idBouton, videosAccueil);
}

//Appelé lorsqu'on clic sur une vidéo
//Sauvegarde dans le localStorage les données de la vidéo cliquée.
//Redirection vers video.html en mode vidéo
//Entrée : url, titre, nombre de vues et miniature de la vidéo
function clickVideo(urlVideo, titleVideo, viewsVideo, thumbnailVideo) {
    const urlObj = { url: urlVideo };
    const urlString = JSON.stringify(urlObj);

    const titleObj = { title: titleVideo };
    const titleString = JSON.stringify(titleObj);

    const viewsObj = { views: viewsVideo };
    const viewsString = JSON.stringify(viewsObj);

    const thumbnailsObj = { thumbnail: thumbnailVideo };
    const thumbnailString = JSON.stringify(thumbnailsObj);

    const modeObj = { mode: "video" };
    const modeString = JSON.stringify(modeObj);

    localStorage.setItem('urlVideo', urlString);
    localStorage.setItem('titleVideo', titleString);
    localStorage.setItem('viewsVideo', viewsString);
    localStorage.setItem('thumbnailVideo', thumbnailString);
    localStorage.setItem('modeVideo', modeString);
    window.location.href = "/video";
}

//Récupère un tableau contenant un nombre de pub aléatoire au format 728x90
//Affiche les pubs du tableau (1 pub chaque 3 vidéos) 
function affichagePub() {
    $.ajax({
        type: "POST",
        url: "/getRandomPubByFormat",
        data: { pubNmb: pubNmb, format: "728x90" },
        success: function (data) {
            i = 0;
            data.forEach(function (pub) {
                code = "<img class=\"videoListPubImg\" src=\"/static/data/pub/" + pub[5] + "/" + pub[0] + pub[4] + "\" onclick=\"clickPub(" + pub[0] + ")\"/>";
                document.getElementById("videoListPubDiv" + i).innerHTML = code;
                i++;
            });
        }
    });
}