//Récupère les valeurs des champs
//Créé un nouvel utilisateur non Entreprise si login n'existe pas déjà
//Redirection vers connexion.html
function boutonInscription() {
    var login = document.getElementById("login").value;
    var mdp = document.getElementById("mdp").value;
    var mdpConfirm = document.getElementById("mdpConfirm").value;
    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var email = document.getElementById("email").value;
    var err = document.getElementById("erreur");

    $.ajax({
        type: "POST",
        url: "/createUser",
        data: { login: login, mdp: mdp, mdpConfirm: mdpConfirm, nom: nom, prenom: prenom, email: email },
        success: function (data) {
            if (data === "ok")
                window.location.href = "/connexion";
            else
                err.innerHTML = data;
        }
    });
}