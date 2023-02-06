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

btn.addEventListener('click', function handleClick(event) {
    document.getElementById("login").value = '';
    document.getElementById("mdp").value = '';
});
