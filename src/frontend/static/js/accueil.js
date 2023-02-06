videosAccueil = Array();
pubNmb = 0;

// import myJson from 'starwars.json' assert {type: 'json'};
function onLoad() {
    document.getElementsByClassName("mainSection")[0].style.display = "none";
}

function boutonRechercher() {
    var input = document.getElementById("rechercher").value;
    var apiKey = "45ca9844fc45d3658b9a4f230f31879951769b3722ad8cf491fb3ba18dee1d66";
    // var url = "https://serpapi.com/search.json?api_key=" + apiKey + "&engine=youtube&search_query=star+wars";
    //console.log(myJson.search_metadata.id);
    // console.log("myJson.search_metadata.id");
    // const data = require('starwars.json');
    callBackGetSuccessLocal();


    document.getElementsByClassName("mainSection")[0].style.display = "block";



    // $.get(url, callBackGetSuccess).done(function () {
    // })
    //     .fail(function () {
    //         alert("error");
    //     })
    //     .always(function () {
    //     });
}

var callBackGetSuccess = function (data) {
    console.log("callBackGetSuccess");
}

async function callBackGetSuccessLocal() {
    idAjouterBouton = 0;
    url = '../static/js/starwars.json';
    let obj, code = "";

    await fetch(url)
        .then((response) => response.json())
        .then((data) => { obj = data; });

    var videoThumbnail = document.getElementById('zone_videoThumbnail');
    var iPub = 0;

    obj.video_results.forEach(function (element) {
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
            + " \" onclick=clickVideo(\"" + video.lien + "\",\"" + video.titre + "\",\"" + video.vues + "\",\"" + video.thumbnail +"\")>"
            + "<div id=\"videoListTitleDiv\"><p class=\"textVideoInfo\">" + video.titre + "</p></div>"
            + "<div id=\"videoListPlateformeDiv\"><p class=\"textVideoInfo\">" + "Youtube" + "</p></div>"
            + "<div id=\"videoListViewsDiv\"><p class=\"textVideoInfo\">" + video.vues + "</p></div>"
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
                code = "<img class=\"videoListPubImg\" src=\"/static/data/pub/" + pub[5] + "/"+ pub[0] + pub[4] + "\" onclick=\"clickPub(" + pub[0] + ")\"/>";
                document.getElementById("videoListPubDiv" + i).innerHTML = code;
                i++;
            });
        }
    });
}