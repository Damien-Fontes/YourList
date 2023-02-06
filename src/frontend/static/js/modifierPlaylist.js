playlist = new Playlist()
videos = new Array()

function onLoad() {
    const idPlaylistString = localStorage.getItem('idPlaylist');
    const idPlaylistObj = JSON.parse(idPlaylistString);

    idPlaylist = idPlaylistObj.idPlaylist;

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

function getPlaylistById(idPlaylist) {
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
        data: { id: playlist.id },
        success: function (data) {
            data.forEach(function (element) {
                video = new Video(element[1], element[2], element[3], element[4], element[5], element[6]);
                video.ajouterId(element[0]);
                videos.push(video);
            });
            affichage();
        }
    });
}

function affichage() {
    document.getElementById("zone_titrePlaylist").innerHTML = playlist.titre;
    idSupprimerBouton = 0;
    code = "";
    videos.forEach(function (video) {
        code += "<li class='videoList'>"
            + "<img class='thumbnail' src=\"" + video.thumbnail
            + " \" onclick=clickVideo(\"" + video.lien + "\",\"" + video.titre + "\",\"" + video.vues + "\",\"" + video.thumbnail + "\")>"
            + "<div id=\"videoListTitleDiv\"><p class=\"textVideoInfo\"><b>" + video.titre + "</b></p></div>"
            + "<div id=\"videoListPlateformeDiv\"><p class=\"textVideoInfo\">" + "Youtube" + "</p></div>"
            + "<div id=\"videoListViewsDiv\"><p class=\"textVideoInfo\">" + video.vues + " vues</p></div>"
            + "<input type=\"button\" class=\"ajouterBouton\" id=\"boutonSupprimer" + idSupprimerBouton + "\" value=\"-\" onclick=\"boutonSupprimer(this.id)\"/>"
            + "</li>";

        video.ajouterBoutonId("boutonSupprimer" + idSupprimerBouton);

        idSupprimerBouton++;
    })
    document.getElementById("zone_videoThumbnail").innerHTML = code;
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

    const modeObj = { mode: "playlist" };
    const modeString = JSON.stringify(modeObj);

    const idPlaylistObj = { idPlaylist: playlist.id };
    const idPlaylistString = JSON.stringify(idPlaylistObj);

    localStorage.setItem('urlVideo', urlString);
    localStorage.setItem('titleVideo', titleString);
    localStorage.setItem('viewsVideo', viewsString);
    localStorage.setItem('thumbnailVideo', thumbnailString);
    localStorage.setItem('modeVideo', modeString);
    localStorage.setItem('idPlaylist', idPlaylistString);
    window.location.href = "/video";
}

function boutonSupprimer(idBouton) {
    videos.forEach(function (video) {
        if (video.boutonID == idBouton)
            $.ajax({
                type: "POST",
                url: "/supprimerVideoPlaylist",
                data: { idVideo: video.id, idPlaylist: idPlaylist },
                success: function (data) {
                    if (data == "ok")
                        window.location.href = "/modifierPlaylist";
                    else
                        console.log(data);
                }
            });
    });
}

function modifierTitreAffichage() {
    document.getElementById("zone_modifierTitre").style.display = "block";
}

function modifierTitre() {
    titre = document.getElementById("titrePlaylistText").value;
    $.ajax({
        type: "POST",
        url: "/modifierTitrePlaylist",
        data: { idPlaylist: idPlaylist, titre: titre },
        success: function (data) {
            if (data == "ok")
                window.location.href = "/modifierPlaylist";
            else
                console.log(data);
        }
    });
}

function supprimerPlaylist() {
    if (confirm('Etes-vous sur de vouloir supprimer la playlist : ' + playlist.titre + ' ?')) {
        $.ajax({
            type: "POST",
            url: "/supprimerPlaylist",
            data: { idPlaylist: playlist.id, idUtilisateur : id },
            success: function (data) {
                playlists();
            }
        });
      }
}