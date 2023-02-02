menuHautStr = "<a onclick=\"playlists()\">Playlists</a> | "
    + "<a onclick=\"compte()\">Compte</a> | "
    + "<a onclick=\"seDeconnecter()\">Se Déconnecter</a> ";
document.getElementsByClassName("menuHaut")[0].innerHTML = menuHautStr;

//id utilisateur
const idString = localStorage.getItem('id');
const idObj = JSON.parse(idString);

id = idObj.id;
console.log("id : " + id);

function allerA(fichier) {
    str = "/" + fichier;
    window.location.href = str;
}

function playlists() {
    window.location.href = "/playlist";
}

function compte() {
    window.location.href = "/compte";
}

function seDeconnecter() {
    window.location.href = "/connexion";
}

function boutonAjouter(idBouton) {
    $.ajax({
        type: "POST",
        url: "/getPlaylist",
        data: { id: id },
        success: function (data) {
            // console.log(data);
            playlistDivInit(data, idBouton);
        }
    });
}

function playlistDivInit(data, idBouton) {
    code = "<ol class=\"zone_playlist\">"
    data.forEach(function (playlist) {
        code += "<li id=\"playlistLi" + playlist[0] + "\">"
            + "<p>" + playlist[1] + "</p>"
            + "<input type=\"button\" class=\"ajouterPlaylistBouton\" value=\"+\" onclick=\"ajouterVideoAPlaylist(" + playlist[0] + ")\"></input>"
            + "</li>"
    });
    code += "</ol>"

    ajouterBouton = document.getElementById(idBouton);
    var rect = ajouterBouton.getBoundingClientRect();

    popUpDiv = document.getElementsByClassName("popUpListePlaylist")[0]
    popUpDiv.innerHTML = code;
    popUpDiv.style.left = rect.left - 190 + "px";
    popUpDiv.style.top = rect.top + window.scrollY - 75 + "px";
    popUpDiv.style.display = "block";

}

function ajouterVideoAPlaylist(idPlaylist) {
    console.log(idPlaylist);
}
