playlist = new Playlist()
videos = new Array()

function onLoad() {
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
                videos.push(video);
            });
            affichage();
            console.log(videos);
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
            + " \" onclick=clickVideo(\"" + video.lien + "\",\"" + video.titre + "\",\"" + video.vues + "\")>"
            + "<div id=\"videoListTitleDiv\"><p class=\"textVideoInfo\">" + video.titre + "</p></div>"
            + "<div id=\"videoListPlateformeDiv\"><p class=\"textVideoInfo\">" + "Youtube" + "</p></div>"
            + "<div id=\"videoListViewsDiv\"><p class=\"textVideoInfo\">" + video.vues + "</p></div>"
            + "<input type=\"button\" class=\"ajouterBouton\" id=\"boutonSupprimer" + idSupprimerBouton + "\" value=\"-\" onclick=\"boutonSupprimer(this.id)\"/>"
            + "</li>";

        video.ajouterBoutonId("boutonSupprimer" + idSupprimerBouton);

        idSupprimerBouton++;
    })
    document.getElementById("zone_videoThumbnail").innerHTML = code;
}

function boutonSupprimer(idBouton) {
    videos.forEach(function (video) {
        if (video.boutonID == idBouton)
            $.ajax({
                type: "POST",
                url: "/supprimerVideoPlaylist",
                data: { idVideo: video.id, idPlaylist: idPlaylist },
                success: function (data) {
                    if(data=="ok")
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
        data: { idPlaylist: idPlaylist, titre:titre },
        success: function (data) {
            if(data=="ok")
                window.location.href = "/modifierPlaylist";
            else
                console.log(data);
        }
    });
}