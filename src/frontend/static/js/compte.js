var profil;

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
        }
    });
}

function affichageProfil(data) {
    console.log(data);

    profil = new Profil(data[1], data[3], data[4], data[7]);

    document.getElementById("zone_login").innerHTML += profil.login;
    document.getElementById("zone_Nom").innerHTML += profil.nom;
    document.getElementById("zone_Prenom").innerHTML += profil.prenom;
    document.getElementById("zone_Email").innerHTML += profil.email;
}

function modifierCompte() {
    document.getElementById("modificationCompte").style.display = "block";
    document.getElementById("champs_Login").value = profil.login;
    document.getElementById("champs_Nom").value = profil.nom;
    document.getElementById("champs_Prenom").value = profil.prenom;
    document.getElementById("champs_Email").value = profil.email;
}

function validerModifications() {
    profil.login = document.getElementById("champs_Login").value;
    profil.nom = document.getElementById("champs_Nom").value;
    profil.prenom = document.getElementById("champs_Prenom").value;
    profil.email = document.getElementById("champs_Email").value;

    console.log(profil);
    $.ajax({
        type: "POST",
        url: "/updateUser",
        data: { id: id, login: profil.login, nom: profil.nom, prenom: profil.prenom, email: profil.email },
        success: function (data) {
            if (data == "ok")
                compte();
            else
                console.log(data);
        }
    });
}