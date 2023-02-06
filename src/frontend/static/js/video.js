let url, title, views, mode;
let obj;
let pubNmb = 0;
let playlist = new Playlist()
let videosPlaylist = new Array()
let videosSuggestion = new Array();
let videoPrincipale;

function onLoad() {
    loadJSON();


    const urlString = localStorage.getItem('urlVideo');
    const urlObj = JSON.parse(urlString);

    const titleString = localStorage.getItem('titleVideo');
    const titleObj = JSON.parse(titleString);

    const viewsString = localStorage.getItem('viewsVideo');
    const viewsObj = JSON.parse(viewsString);

    const thumbnailString = localStorage.getItem('thumbnailVideo');
    const thumbnailsObj = JSON.parse(thumbnailString);

    url = urlObj.url;
    title = titleObj.title;
    views = viewsObj.views;
    thumbnail = thumbnailsObj.thumbnail;

    videoPrincipale = new Video(title, url, "0", "Youtube", thumbnail, views);
    codeVideoP = "<iframe class=\"box\" id=\"player\" src=\"" + url + "\" frameborder=\"0\" scrolling=\"yes\" seamless=\"seamless\"></iframe>"
    document.getElementById("playerVideo").innerHTML = codeVideoP;

    codeInfoV = "<p class=\"textVideoInfoEtendu\"><b> " + title + "</b> | " + views + " vues</p>"
        + "<input type=\"button\" class=\"ajouterBouton\" id=\"ajouterBoutonVideoPrincipale\" value=\"+\" onclick=\"boutonAjouterVideoPrincipale()\"/>"
        + "<p class=\"textVideoInfoEtendu\">Plateforme : Youtube </p>";
    document.getElementById("informationsVideo").innerHTML = codeInfoV;

    // let box = document.querySelector(".box");
    // let widthV = box.offsetWidth;
    // let heigthV = (widthV * 574) / 1021;
    // let heigthStr = heigthV + "px";
    // document.getElementById("playerVideo").style.height = heigthStr;
    // document.getElementById("playerVideo").style.width = heigthStr;
    // console.log((widthV * 574) / 1021 + "px");

    const modeString = localStorage.getItem('modeVideo');
    const modeObj = JSON.parse(modeString);
    mode = modeObj.mode;
    console.log(mode);

    if (mode == "playlist") {
        const idPlaylistString = localStorage.getItem('idPlaylist');
        const idPlaylistObj = JSON.parse(idPlaylistString);
        idPlaylist = idPlaylistObj.idPlaylist;
        console.log(idPlaylist);

        $.ajax({
            type: "POST",
            url: "/verifPossede",
            data: { id: id, idPlaylist: idPlaylist },
            success: function (data) {
                if ("ok")
                    getPlaylistById(idPlaylist);
                else
                    console.log(data);
            }
        });
    }
}

function boutonAjouterVideoPrincipale() {
    codeDiv = "<ol class=\"zone_playlist\">";
    $.ajax({
        type: "POST",
        url: "/getPlaylist",
        data: { id: id },
        success: function (data) {
            data.forEach(function (playlist) {
                codeDiv += "<li id=\"playlistLi" + playlist[0] + "\">"
                    + "<p>" + playlist[1] + "</p>"
                    + "<input type=\"button\" class=\"ajouterPlaylistBouton\" value=\"+\" onclick=\"ajouterVideoPlaylist(" + playlist[0] + ")\"></input>"
                    + "</li>";
            });
            codeDiv += "</ol>";

            ajouterBouton = document.getElementById("ajouterBoutonVideoPrincipale");
            var rect = ajouterBouton.getBoundingClientRect();

            popUpDiv = document.getElementsByClassName("popUpListePlaylist")[0];
            popUpDiv.innerHTML = codeDiv;
            popUpDiv.style.left = rect.left + 20 + "px";
            popUpDiv.style.top = rect.top + window.scrollY - 75 + "px";

            $.ajax({
                type: "POST",
                url: "/isConnected",
                success: function (data) {
                    if (data == "true")
                        popUpDiv.style.display = "block";
                }
            });
        }
    });
}

function ajouterVideoPlaylist(idPlaylist) {
    $.ajax({
        type: "POST",
        url: "/addVideoPlaylist",
        data: { id: id, idPlaylist: idPlaylist, titre: videoPrincipale.titre, lien: videoPrincipale.lien, duree: videoPrincipale.duree, site: videoPrincipale.site, thumbnail: videoPrincipale.thumbnail, vues: videoPrincipale.vues },
        success: function (data) {
            console.log(data);
            if (data == "alreadyExist")
                confirm('Vidéo déjà ajoutée à la Playlist');
        }
    });
    document.getElementsByClassName("popUpListePlaylist")[0].style.display = "none";
}

function getPlaylistById() {
    $.ajax({
        type: "POST",
        url: "/playlistById",
        data: { id: idPlaylist },
        success: function (data) {
            playlist.id = data[0];
            playlist.titre = data[1];
            playlist.createur = data[2];
            getVideoPlaylist();
        }
    });
}

function getVideoPlaylist() {
    $.ajax({
        type: "POST",
        url: "/getVideoPlaylist",
        data: { id: idPlaylist },
        success: function (data) {
            data.forEach(function (element) {
                video = new Video(element[1], element[2], element[3], element[4], element[5], element[6]);
                video.ajouterId(element[0]);
                videosPlaylist.push(video);
            });
            affichageVideoPlaylist();
        }
    });
}

function affichageVideoPlaylist() {
    document.getElementById("zone_titrePlaylist").innerHTML = playlist.titre;
    code = "";
    videosPlaylist.forEach(function (video) {
        if (video.lien == url)
            code += "<li class='videoList' id='videoListActive'>";
        else
            code += "<li class='videoList'>";
        code += "<img class='thumbnail' src=\"" + video.thumbnail
            + " \" onclick=clickVideo(\"" + video.lien + "\",\"" + video.titre + "\",\"" + video.vues + "\",\"" + video.thumbnail + "\",\"playlist\")>"
            + "<div id=\"videoListTitleDiv\"><p class=\"textVideoInfo\"><b>" + video.titre + "</b></p></div>"
            + "<div id=\"videoListPlateformeDiv\"><p class=\"textVideoInfo\">" + "Youtube" + "</p></div>"
            + "<div id=\"videoListViewsDiv\"><p class=\"textVideoInfo\">" + video.vues + " vues</p></div>"
            + "</li>";
    });
    document.getElementById("zone_suitePlaylist").innerHTML = code;
}

function clickVideo(urlVideo, titleVideo, viewsVideo, videoTthumbnail, mode) {
    const urlObj = { url: urlVideo };
    const urlString = JSON.stringify(urlObj);

    const titleObj = { title: titleVideo };
    const titleString = JSON.stringify(titleObj);

    const viewsObj = { views: viewsVideo };
    const viewsString = JSON.stringify(viewsObj);

    const thumbnailsObj = { thumbnail: thumbnailVideo };
    const thumbnailString = JSON.stringify(thumbnailsObj);

    const modeObj = { mode: mode };
    const modeString = JSON.stringify(modeObj);

    if (mode == "playlist") {
        const idPlaylistObj = { idPlaylist: idPlaylist };
        const idPlaylistString = JSON.stringify(idPlaylistObj);
        localStorage.setItem('idPlaylist', idPlaylistString);
    }

    localStorage.setItem('urlVideo', urlString);
    localStorage.setItem('titleVideo', titleString);
    localStorage.setItem('viewsVideo', viewsString);
    localStorage.setItem('thumbnailVideo', thumbnailString);
    localStorage.setItem('modeVideo', modeString);
    window.location.href = "/video";
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
        videosSuggestion.push(video);
        idAjouterBouton++;
    });

    videosSuggestion.forEach(function (video) {
        code += "<li class='videoList'>"
            + "<img class='thumbnail' src=\"" + video.thumbnail
            + " \" onclick=clickVideo(\"" + video.lien + "\",\"" + video.titre + "\",\"" + video.vues + "\",\"" + video.thumbnail + "\",\"video\")>"
            + "<div class=\"suggestionDiv\">"
            + "<p class=\"textVideoInfo\"><b>" + video.titre + "</b></p>"
            + "<p class=\"textVideoInfo\">" + "Youtube" + "</p>"
            + "<p class=\"textVideoInfo\">" + video.vues + " vues</p>"
            + "<input type=\"button\" class=\"ajouterBouton\" id=\"" + video.boutonID + "\" value=\"+\" onclick=\"boutonAjouterSuggestion(this.id)\"/>"
            + "</div></li>";

        iPub++;
        if (iPub == 3) {
            iPub = 0;
            code += "<li class='videoListPubSuggestion'>"
                + "<div class=\"videoListPubDiv\" id=\"videoListPubDiv" + pubNmb + "\">"
                + "</div></li>";
            pubNmb = pubNmb + 1;
        }
        document.getElementById("suggestionVideo").innerHTML = code;
        affichagePub();
    });
}

function boutonAjouterSuggestion(idBouton) {
    boutonAjouter(idBouton, videosSuggestion);
}

function affichagePub() {
    $.ajax({
        type: "POST",
        url: "/getRandomPubByFormat",
        data: { pubNmb: pubNmb, format: "320x50" },
        success: function (data) {
            console.log(data);
            i = 0;
            data.forEach(function (pub) {
                code = "<img class=\"videoListPubImgSuggestion\" src=\"/static/data/pub/" + pub[5] + "/" + pub[0] + pub[4] + "\"/>"
                document.getElementById("videoListPubDiv" + i).innerHTML = code;
                i++;
            });
        }
    });
}
