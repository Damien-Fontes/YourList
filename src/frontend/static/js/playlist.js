//Appelé au chargement de la page
//Cache la zone de création de playlist
//Récupère toutes les playlists que possède l'utilisateur
function onLoad() {
    document.getElementById("zone_creationPlaylist").style.display = "none";

    code = "";
    $.ajax({
        type: "POST",
        url: "/getPlaylist",
        data: { id: id },
        success: function (data) {
            data.forEach(function (playlist) {
                code += "<li class='playlistList'>";
                if(playlist[3] != null)
                    code += "<img class='thumbnail' src=\"" + playlist[3] + " \" onclick=\"clickVideo(" + playlist[0] + ")\">";

                code += "<div id=\"playlistNomDiv\"><p class=\"textVideoInfo\" onclick=\"boutonModifierPlaylist(" + playlist[0] + ")\"><b>" + playlist[1] + "</b></p></div>"
                    + "<div id=\"playlistNombreDeVuesDiv\"><p class=\"textVideoInfo\">" + playlist[4] + " videos</p></div>"
                    + "<input type=\"button\" class=\"modifierBouton\" value=\"Modifier\" onclick=\"boutonModifierPlaylist(" + playlist[0] + ")\"/>"
                    + "</li>";
            })
            document.getElementById("zone_videoThumbnail").innerHTML = code;
        }
    });
}

//Bouton Créer Playlist
//Affiche la zone de création de playlist
function boutonCreerPlaylist() {
    document.getElementById("zone_creationPlaylist").style.display = "block";
}

//Récupère la valeur du champs correspondant au nom de la nouvelle playlist
//Création de la playlist
//Rechargement de la page
function boutonCreationPlaylist() {
    nomPlaylist = document.getElementById("nomPlaylist").value;

    if (nomPlaylist != "") {
        $.ajax({
            type: "POST",
            url: "/creationPlaylist",
            data: { id: id, nom: nomPlaylist },
            success: function (data) {
                if (data == "ok")
                    window.location.href = "/playlist";
                else
                    console.log(data);
            }
        });
    }
}

//Bouton modifier des playlists
//Sauvegarde dans localStorage l'id de la playlist
//Redirection vers modifierPlaylist.html
//Entrée : id de la playlist à modifier
function boutonModifierPlaylist(idPlaylist) {
    const idPlaylistObj = { idPlaylist: idPlaylist };
    const idPlaylistString = JSON.stringify(idPlaylistObj);

    localStorage.setItem('idPlaylist', idPlaylistString);
    
    $.ajax({
        type: "POST",
        url: "/modifierPlaylist",
        success: function () {
            window.location.href = "/modifierPlaylist";
        }
    });
}

//Si on clic sur une vidéo
//Sauvegarde les données de la vidéo dans localStorage et l'id de la playlist
//Redirection vers video.html en mode 'playlist'
//Entrée : id de la playlist
function clickVideo(idPlaylist) {    
    $.ajax({
        type: "POST",
        url: "/getVideoPlaylist",
        data: { id: idPlaylist },
        success: function (data) {
            console.log(data);
            const urlObj = { url: data[0][2] };
            const urlString = JSON.stringify(urlObj);
        
            const titleObj = { title: data[0][1]  };
            const titleString = JSON.stringify(titleObj);
        
            const viewsObj = { views: data[0][6]  };
            const viewsString = JSON.stringify(viewsObj);
            
            const thumbnailsObj = { thumbnail: data[0][5] };
            const thumbnailString = JSON.stringify(thumbnailsObj);

            const modeObj = { mode: "playlist" };
            const modeString = JSON.stringify(modeObj);
        
            const idPlaylistObj = { idPlaylist: idPlaylist };
            const idPlaylistString = JSON.stringify(idPlaylistObj);

            localStorage.setItem('urlVideo', urlString);
            localStorage.setItem('titleVideo', titleString);
            localStorage.setItem('viewsVideo', viewsString);
            localStorage.setItem('thumbnailVideo', thumbnailString);
            localStorage.setItem('modeVideo', modeString);
            localStorage.setItem('idPlaylist', idPlaylistString);
            window.location.href = "/video";
        }
    });
}