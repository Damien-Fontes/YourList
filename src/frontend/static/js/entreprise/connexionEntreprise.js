//Récupère les valeurs des champs et les tests 
function boutonConnexion() {
    var login = document.getElementById("login").value;
    var mdp = document.getElementById("mdp").value;
    var err = document.getElementById("erreur");

    $.ajax({
        type: "POST",
        url: "/testConnexionEntreprise",
        data: { login: login, mdp: mdp },
        success: function (data) {
            if (data === "True")
                storageID(login);
            else
                err.innerHTML = "Mot de passe ou identifiant incorrect"
        }
    });
}

//Récupère les informations de l'utilisateur et sauvegarde l'id dans le local storage
//Entrée : login de l'utilisateur
function storageID(login) {
    $.ajax({
        type: "POST",
        url: "/getUserByLogin",
        data: { login: login },
        success: function (data) {
            res = JSON.parse(data);
            const idObj = { id: res["py/tuple"][0] };
            const idString = JSON.stringify(idObj);

            localStorage.setItem('id', idString);
            cookieConnected();
        }
    });
}

//Modifie les cookies pour que la personne soit connecté et compte entreprise
function cookieConnected() {
    $.ajax({
        type: "POST",
        url: "/cookieConnectedEntreprise",
        success: function (data) {
            if (data == "ok")
                window.location.href = "/accueilEntreprise";
        }
    });
}

const btn = document.getElementById('annulerBtn');

//Bouton annuler
//Supprime les valeurs des champs
btn.addEventListener('click', function handleClick(event) {
    document.getElementById("login").value = '';
    document.getElementById("mdp").value = '';
});

//Bouton s'inscrire
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