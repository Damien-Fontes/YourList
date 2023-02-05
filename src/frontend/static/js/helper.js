class Profil {
    constructor(login, nom, prenom, email) {
        this.login = login;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
    }
}

class Playlist {
    constructor(id, titre, createur) {
        this.id = id;
        this.titre = titre;
        this.createur = createur;
    }
}

class Video {
    constructor(titre, lien, duree, site, thumbnail, vues) {
        this.titre = titre;
        this.lien = lien;
        this.duree = duree;
        this.site = site;
        this.thumbnail = thumbnail;
        this.vues = vues;
    }

    ajouterId(id) {
        this.id = id;
    }

    ajouterBoutonId(boutonID) {
        this.boutonID = boutonID;
    }
}


$.ajax({
    type: "POST",
    url: "/isConnected",
    success: function (data) {
        if (data == "true")
            menuHautStr = "<a class=\"hrefLink\" onclick=\"playlists()\">Playlists</a> | "
                + "<a class=\"hrefLink\" onclick=\"compte()\">Compte</a> | "
                + "<a class=\"hrefLink\" onclick=\"seDeconnecter()\">Se Déconnecter</a> ";
        else
            menuHautStr = "<a class=\"hrefLink\" onclick=\"allerA('')\">Accueil</a> | "
                + "<a class=\"hrefLink\" onclick=\"seDeconnecter()\">Se Connecter</a> | "
                + "<a class=\"hrefLink\" onclick=\"inscrire()\">S'inscrire</a> ";
    
        document.getElementsByClassName("menuHaut")[0].innerHTML = menuHautStr;
    }
});

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
    $.ajax({
        type: "POST",
        url: "/playlist",
        success: function (data) {    
            window.location.href = "/playlist";
        }
    });
}

function compte() {
    $.ajax({
        type: "POST",
        url: "/compte",
        success: function (data) {    
            window.location.href = "/compte";
        }
    });
}

function seDeconnecter() {
    $.ajax({
        type: "POST",
        url: "/connexion",
        success: function (data) {    
            window.location.href = "/connexion";
        }
    });
}

function inscrire() {
    $.ajax({
        type: "POST",
        url: "/inscription",
        success: function (data) {    
            window.location.href = "/inscription";
        }
    });
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
    console.log(idBouton);
    newIdBouton = idBouton;
    code = "<ol class=\"zone_playlist\">";
    data.forEach(function (playlist) {
        code += "<li id=\"playlistLi" + playlist[0] + "\">"
            + "<p>" + playlist[1] + "</p>"
            + "<input type=\"button\" class=\"ajouterPlaylistBouton\" value=\"+\" onclick=\"ajouterVideo(" + playlist[0] + ",\'" + idBouton + "\')\"></input>"
            + "</li>";
    });
    code += "</ol>";

    ajouterBouton = document.getElementById(idBouton);
    var rect = ajouterBouton.getBoundingClientRect();

    popUpDiv = document.getElementsByClassName("popUpListePlaylist")[0];
    popUpDiv.innerHTML = code;
    popUpDiv.style.left = rect.left - 190 + "px";
    popUpDiv.style.top = rect.top + window.scrollY - 75 + "px";
    popUpDiv.style.display = "block";

}

function ajouterVideo(idPlaylist, idBouton) {
    videos.forEach(function (video) {
        if (video.boutonID == idBouton) {
            $.ajax({
                type: "POST",
                url: "/addVideoPlaylist",
                data: { id: id, idPlaylist: idPlaylist, titre: video.titre, lien: video.lien, duree: video.duree, site: video.site, thumbnail: video.thumbnail, vues: video.vues },
                success: function (data) {
                    console.log(data);
                    if (data == "alreadyExist")
                        confirm('Vidéo déjà ajoutée à la Playlist');
                }
            });
        }
    });
}
