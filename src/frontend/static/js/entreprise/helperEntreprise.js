class Profil {
    constructor(login, entreprise, email) {
        this.login = login;
        this.entreprise = entreprise;
        this.email = email;
    }
}

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

//id utilisateur
const idString = localStorage.getItem('id');
const idObj = JSON.parse(idString);

id = idObj.id;
function allerA(fichier) {
    str = "/" + fichier;
    window.location.href = str;
}

function accueilEntreprise() {
    $.ajax({
        type: "POST",
        url: "/accueilEntreprise",
        success: function (data) {
            window.location.href = "/accueilEntreprise";
        }
    });
}

function compteEntreprise() {
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
