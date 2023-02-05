function boutonInscription() {
    var login = document.getElementById("login").value;
    var mdp = document.getElementById("mdp").value;
    var mdpConfirm = document.getElementById("mdpConfirm").value;
    var entreprise = document.getElementById("entreprise").value;
    var email = document.getElementById("email").value;
    var err = document.getElementById("erreur");

    $.ajax({
        type: "POST",
        url: "/createUserEntreprise",
        data: { login: login, mdp: mdp, mdpConfirm: mdpConfirm, entreprise: entreprise, email: email },
        success: function (data) {
            if (data === "ok")
                window.location.href = "/connexionEntreprise";
            else
                err.innerHTML = data;
        }
    });
}

const btn = document.getElementById('annulerBtn');

btn.addEventListener('click', function handleClick(event) {
    document.getElementById("login").value = '';
    document.getElementById("mdp").value = '';
    document.getElementById("mdpConfirm").value = '';
    document.getElementById("entreprise").value = '';
    document.getElementById("email").value = '';
});
