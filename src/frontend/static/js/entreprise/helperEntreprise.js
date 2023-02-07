class Profil {
    constructor(login, entreprise, email) {
        this.login = login;
        this.entreprise = entreprise;
        this.email = email;
    }
}

//Vérifie si la personne est connecté et possède un compte entreprise
//Si oui : ok
//Si non : redirection vers connexionEntreprise.html
$.ajax({
    type: "POST",
    url: "/isConnectedEntreprise",
    success: function (data) {
        if (data == "true") {
            menuHautStr = "<a class=\"hrefLink\" onclick=\"accueilEntreprise()\">Accueil</a> | "
                + "<a class=\"hrefLink\" onclick=\"compteEntreprise()\">Compte</a> | "
                + "<a class=\"hrefLink\" onclick=\"seDeconnecter()\">Se Déconnecter</a> ";
            document.getElementsByClassName("menuHaut")[0].innerHTML = menuHautStr;
        }
        else 
            seDeconnecter();
    }
});

//Récupère id utilisateur
const idString = localStorage.getItem('id');
const idObj = JSON.parse(idString);

id = idObj.id;

//Redirection vers la page passé en paramètre
function allerA(fichier) {
    str = "/" + fichier;
    window.location.href = str;
}

//Bouton accueil du menu
//Redirection vers accueilEntreprise.html
function accueilEntreprise() {
    $.ajax({
        type: "POST",
        url: "/accueilEntreprise",
        success: function (data) {
            window.location.href = "/accueilEntreprise";
        }
    });
}

//Bouton compte du menu
//Redirection vers compteEntreprise.html
function compteEntreprise() {
    $.ajax({
        type: "POST",
        url: "/compteEntreprise",
        success: function (data) {
            window.location.href = "/compteEntreprise";
        }
    });
}

//Bouton se déconnecter du menu
//Redirection vers connexionEntreprise.html
function seDeconnecter() {
    $.ajax({
        type: "POST",
        url: "/connexionEntreprise",
        success: function (data) {
            window.location.href = "/connexionEntreprise";
        }
    });
}

//Redirection vers inscriptionEntreprise.html
function inscrire() {
    $.ajax({
        type: "POST",
        url: "/inscriptionEntreprise",
        success: function (data) {
            window.location.href = "/inscriptionEntreprise";
        }
    });
}

//Redirection vers pubEntreprise
//Sauvegarde dans le localStorage l'id de la pub sélectionner
function pubEntreprise(idPub) {
    $.ajax({
        type: "POST",
        url: "/pubEntreprise",
        success: function (data) {
            const idPubObj = { idPub: idPub };
            const idPubString = JSON.stringify(idPubObj);
            localStorage.setItem('idPub', idPubString);

            window.location.href = "/pubEntreprise";
        }
    });
}
