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

//Vérifie si la personne est connectée et possède un compte non Entreprise
//Si tout est bon : affichage du menu pour les connectés
//Si compte Entrepise : redirection acceuil en déconnectant le compte
//Si pas connecté : affichage du menu pour les non connectés
$.ajax({
    type: "POST",
    url: "/isConnected",
    success: function (data) {
        if (data == "true") {
            menuHautStr = "<a class=\"hrefLink\" onclick=\"playlists()\">Playlists</a> | "
                + "<a class=\"hrefLink\" onclick=\"compte()\">Compte</a> | "
                + "<a class=\"hrefLink\" onclick=\"seDeconnecter()\">Se Déconnecter</a> ";
        }
        else if (data == "entreprise") {
            window.location.href = "/";
        }
        else if (data == "false") {
            menuHautStr = "<a class=\"hrefLink\" onclick=\"allerA('')\">Accueil</a> | "
                + "<a class=\"hrefLink\" onclick=\"seDeconnecter()\">Se Connecter</a> | "
                + "<a class=\"hrefLink\" onclick=\"inscrire()\">S'inscrire</a> ";
        }
        document.getElementsByClassName("menuHaut")[0].innerHTML = menuHautStr;
    }
});

//Récupère l'id utilisateur
const idString = localStorage.getItem('id');
const idObj = JSON.parse(idString);

id = idObj.id;

videosAjouter = Array();

//Permet d'aller à la page html donnée en paramètre
function allerA(fichier) {
    str = "/" + fichier;
    window.location.href = str;
}

//Bouton playlists du menu
//Redirection vers playlist.html
function playlists() {
    $.ajax({
        type: "POST",
        url: "/playlist",
        success: function (data) {
            window.location.href = "/playlist";
        }
    });
}

//Bouton compte du menu
//Redirection vers compte.html
function compte() {
    $.ajax({
        type: "POST",
        url: "/compte",
        success: function (data) {
            window.location.href = "/compte";
        }
    });
}

//Bouton se déconnecter du menu
//Redirection vers connexion.html
function seDeconnecter() {
    $.ajax({
        type: "POST",
        url: "/connexion",
        success: function (data) {
            window.location.href = "/connexion";
        }
    });
}

//Bouton s'inscrire du menu
//Redirection vers inscription.html
function inscrire() {
    $.ajax({
        type: "POST",
        url: "/inscription",
        success: function (data) {
            window.location.href = "/inscription";
        }
    });
}

//Bouton ajouter '+' d'une vidéo.
//Récupère la liste des playlist de l'utilisateur
//Entrée : id du bouton, tableau contenant toutes les vidéos de la page
function boutonAjouter(idBouton, videos) {
    videosAjouter = videos;
    $.ajax({
        type: "POST",
        url: "/getPlaylist",
        data: { id: id },
        success: function (data) {
            playlistDivInit(data, idBouton);
        }
    });
}

//Affiche les playlists disponnible de l'utilisateur lorsqu'on clic sur '+' d'une vidéo
//N'affiche pas les playlists si la personne n'est pas connecté
//Entrée : tableau contenant les playlists de l'utilisateur et les infos des playlist, id du bouton '+' cliqué
function playlistDivInit(data, idBouton) {
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

    //N'affiche pas les playlists si la personne n'est pas connecté
    $.ajax({
        type: "POST",
        url: "/isConnected",
        success: function (data) {
            if (data == "true")
                popUpDiv.style.display = "block";
        }
    });
}

//Ajoute la vidéo à la playlist (toujours suite au bouton '+')
//Cherche quelle vidéo est liée au bouton '+' appuyé, ajoute la vidéo à la playlist, désaffiche la liste des playlists
//Entrée : idde la Playlist, id du bouton '+'
function ajouterVideo(idPlaylist, idBouton) {
    videosAjouter.forEach(function (video) {
        if (video.boutonID == idBouton) {
            $.ajax({
                type: "POST",
                url: "/addVideoPlaylist",
                data: { id: id, idPlaylist: idPlaylist, titre: video.titre, lien: video.lien, duree: video.duree, site: video.site, thumbnail: video.thumbnail, vues: video.vues },
                success: function (data) {
                    if (data == "alreadyExist")
                        confirm('Vidéo déjà ajoutée à la Playlist');
                }
            });
        }
    });
    document.getElementsByClassName("popUpListePlaylist")[0].style.display = "none";
}

//Récupère l'url de redirection de la pub cliquée
//Redirection vers cet url
//Entrée : id de la pub
function clickPub(idPub) {
    $.ajax({
        type: "POST",
        url: "/clickPub",
        data: { idPub: idPub },
        success: function (data) {
            window.open(data[0][6], '_blank');
        }
    });
}

//Bouton rechercher (celui avec la loupe) lorsqu'on est pas sur la page accueil.html
//Sauvegarde dans localStorage la valeurs du champs de recherche
//Redirection vers accueil.html
function boutonRechercherHelper() {
    input = document.getElementById("rechercher").value;
    const inputObj = { input: input };
    const inputString = JSON.stringify(inputObj);

    localStorage.setItem('input', inputString);
    allerA('');
}