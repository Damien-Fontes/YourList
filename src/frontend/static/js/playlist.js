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
                code += "<li class='playlistList' onclick=\"allerA()\">"
                + "<div id=\"playlistNomDiv\"><p class=\"textVideoInfo\">" + playlist[1] + "</p></div>"
                + "<div id=\"playlistNombreDeVuesDiv\"><p class=\"textVideoInfo\">" + "Nombre de videos" + "</p></div>"
                + "<input type=\"button\" class=\"modifierBouton\" value=\"Modifier\" onclick=\"boutonModifierPlaylist()\"/>"
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