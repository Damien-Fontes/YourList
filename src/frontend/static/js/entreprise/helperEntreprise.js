class Profil {
    constructor(login, entreprise, email) {
        this.login = login;
        this.entreprise = entreprise;
        this.email = email;
    }
}

$.ajax({
    type: "POST",
    url: "/isConnected",
    success: function (data) {
        if (data == "true") {
            menuHautStr = "<a class=\"hrefLink\" onclick=\"accueil('')\">Accueil</a> | "
                + "<a class=\"hrefLink\" onclick=\"compte()\">Compte</a> | "
                + "<a class=\"hrefLink\" onclick=\"seDeconnecter()\">Se Déconnecter</a> ";
            document.getElementsByClassName("menuHaut")[0].innerHTML = menuHautStr;
        }
    }
});

//id utilisateur
const idString = localStorage.getItem('id');
const idObj = JSON.parse(idString);

id = idObj.id;

function allerA(fichier) {
    str = "/" + fichier;
    window.location.href = str;
}

function compte() {
    $.ajax({
        type: "POST",
        url: "/compteEntreprise",
        success: function (data) {
            window.location.href = "/compteEntreprise";
        }
    });
}

function seDeconnecter() {
    $.ajax({
        type: "POST",
        url: "/connexionEntreprise",
        success: function (data) {
            window.location.href = "/connexionEntreprise";
        }
    });
}

function inscrire() {
    $.ajax({
        type: "POST",
        url: "/inscriptionEntreprise",
        success: function (data) {
            window.location.href = "/inscriptionEntreprise";
        }
    });
}
