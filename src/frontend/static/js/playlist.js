function onLoad() {
    document.getElementById("zone_creationPlaylist").style.display = "none";

    code = "";
    $.ajax({
        type: "POST",
        url: "/getPlaylist",
        data: { id: id },
        success: function (data) {
            console.log(code);
            console.log(data);
            data.forEach(function (playlist) {
                code += "<li class='playlistList'>"
                    + "<div id=\"playlistNomDiv\" onclick=\"allerA('video')\"><p class=\"textVideoInfo\">" + playlist[1] + "</p></div>"
                    + "<div id=\"playlistNombreDeVuesDiv\"><p class=\"textVideoInfo\">" + playlist[3] + " videos</p></div>"
                    + "<input type=\"button\" class=\"modifierBouton\" value=\"Modifier\" onclick=\"boutonModifierPlaylist(" + playlist[0] + ")\"/>"
                    + "</li>";
            })
            document.getElementById("zone_videoThumbnail").innerHTML = code;
        }
    });
}

function boutonCreerPlaylist() {
    document.getElementById("zone_creationPlaylist").style.display = "block";
}

function boutonCreationPlaylist() {
    nomPlaylist = document.getElementById("nomPlaylist").value;
    console.log(nomPlaylist);

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

function boutonModifierPlaylist(idPlaylist) {
    console.log(idPlaylist);
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