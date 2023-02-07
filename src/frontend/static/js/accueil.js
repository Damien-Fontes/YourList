videosAccueil = Array();
pubNmb = 0;

function onLoad() {
    document.getElementsByClassName("mainSection")[0].style.display = "none";

    const inputString = localStorage.getItem('input');
    if (inputString != null) {
        const inputObj = JSON.parse(inputString);
        input = inputObj.input;
        console.log("input");
        localStorage.removeItem("input");

        console.log("chargement");
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

async function callBackGetSuccess(data) {
    document.getElementsByClassName("mainSection")[0].style.display = "block";
    idAjouterBouton = 0;
    url = '../static/js/starwars.json';
    let code = "";

    var videoThumbnail = document.getElementById('zone_videoThumbnail');
    var iPub = 0;

    data.video_results.forEach(function (element) {
        link = element.link;
        title = element.title;
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

    videosAccueil.forEach(function (video) {
        code += "<li class='videoList'>"
            + "<img class='thumbnail' src=\"" + video.thumbnail
            + " \" onclick=clickVideo(\"" + video.lien + "\",\"" + video.titre + "\",\"" + video.vues + "\",\"" + video.thumbnail + "\")>"
            + "<div id=\"videoListTitleDiv\"><p class=\"textVideoInfo\">" + video.titre + "</p></div>"
            + "<div id=\"videoListPlateformeDiv\"><p class=\"textVideoInfo\">" + "Youtube" + "</p></div>"
            + "<div id=\"videoListViewsDiv\"><p class=\"textVideoInfo\">" + video.vues + " vues</p></div>"
            + "<input type=\"button\" class=\"ajouterBouton\" id=\"" + video.boutonID + "\" value=\"+\" onclick=\"boutonAjouterAccueil(this.id)\"/>"
            + "</li>";

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

function boutonAjouterAccueil(idBouton) {
    boutonAjouter(idBouton, videosAccueil);
}

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

function affichagePub() {
    $.ajax({
        type: "POST",
        url: "/getRandomPubByFormat",
        data: { pubNmb: pubNmb, format: "728x90" },
        success: function (data) {
            console.log(data);
            i = 0;
            data.forEach(function (pub) {
                console.log(pub[0]);
                code = "<img class=\"videoListPubImg\" src=\"/static/data/pub/" + pub[5] + "/" + pub[0] + pub[4] + "\" onclick=\"clickPub(" + pub[0] + ")\"/>";
                document.getElementById("videoListPubDiv" + i).innerHTML = code;
                i++;
            });
        }
    });
}