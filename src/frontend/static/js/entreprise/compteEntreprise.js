//Objet profil
let profil;

//Au chargement de la page
//Récupère l'utilisateur correspondant à l'id de la personne connectée
function onLoad() {
    $.ajax({
        type: "POST",
        url: "/getUserById",
        data: { id: id },
        success: function (data) {
            if (data == "Erreur")
                console.log(data);
            else
                affichageProfil(data);
                getPub(data);
        }
    });   
}

//Remplie les champs html avec les données de data (utilisateur)
//Entrée : tableau d'info de l'utilisateur connecté
function affichageProfil(data) {
    profil = new Profil(data[1], data[5], data[7]);

    document.getElementById("zone_login").innerHTML += profil.login;
    document.getElementById("zone_entreprise").innerHTML += profil.entreprise;
    document.getElementById("zone_email").innerHTML += profil.email;
}

//Récupère les pubs appartenant à l'utilisateur
//Entrée : Pas utilisée
function getPub(data) {
    $.ajax({
        type: "POST",
        url: "/getPubByIdUtilisateur",
        data: { id: id },
        success: function (data) {
            if (data == "Erreur")
                console.log(data);
            else
                affichagePub(data);
        }
    });   
}

//Affiche les différentes pubs de l'utilisateur
//Entrée : tableau des pubs l'utilisateur connecté
function affichagePub(data) {
    code = "";
    data.forEach(function (pub) {
        idPub = "pubImg" + pub[0];
        pathPub = "/static/data/pub/" + pub[5] + "/" + pub[0] + pub[4];
        code += "<div class=\"publiciteDiv\">"
            + "<img class=\"pubImgClass\" id=\"" + idPub + "\" src=\"" + pathPub + "\" onclick=\"pubEntreprise(this.id)\"/>"
            + "</div>";
    });
    // <img id=\"pubImg\" src=\"/static/data/pub/9.jpg\"/>
    document.getElementById("zone_pubCompte").innerHTML = code;
}