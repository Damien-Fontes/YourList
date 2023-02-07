//Bouton connexion
//Récupère les valeurs des champs, et les tests
//Si bon : suite de la connexion
//Si faux : message d'erreur
function boutonConnexion() {
    var identifiant = document.getElementById("identifiant").value;
    var mdp = document.getElementById("mdp").value;
    var err = document.getElementById("erreur");

    $.ajax({
        type: "POST",
        url: "/testConnexion",
        data: { id: identifiant, mdp: mdp },
        success: function (data) {
            if (data === "True")
                storageID(identifiant);
            else
                err.innerHTML = "Mot de passe ou identifiant incorrect"
        }
    });
}

//Récupère les informations de l'utilisateur et sauvegarde l'id dans le local storage
//Entrée : login de l'utilisateur
function storageID(identifiant) {
    $.ajax({
        type: "POST",
        url: "/getUserByLogin",
        data: { login: identifiant },
        success: function (data) {
            res = JSON.parse(data);
            const idObj = { id: res["py/tuple"][0] };
            const idString = JSON.stringify(idObj);

            localStorage.setItem('id', idString);
            cookieConnected();
        }
    });
}

//Modifie les cookies pour que la personne soit connectée et ne soit pas un compte entreprise
function cookieConnected() {
    $.ajax({
        type: "POST",
        url: "/cookieConnected",
        success: function (data) {
            if (data == "ok")
                window.location.href = "/";
        }
    });
}

const btn = document.getElementById('annulerBtn');

//Bouton annuler
//Supprime les valeurs des champs
btn.addEventListener('click', function handleClick(event) {
    var identifiant = document.getElementById("identifiant");
    var mdp = document.getElementById('mdp');
    identifiant.value = '';
    mdp.value = '';
});

