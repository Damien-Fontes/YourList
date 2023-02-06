let profil;

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

function affichageProfil(data) {
    profil = new Profil(data[1], data[5], data[7]);

    document.getElementById("zone_login").innerHTML += profil.login;
    document.getElementById("zone_entreprise").innerHTML += profil.entreprise;
    document.getElementById("zone_email").innerHTML += profil.email;
}

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

function affichagePub(data) {
    code = "";
    console.log(data);
    data.forEach(function (pub) {
        idPub = "pubImg" + pub[0];
        pathPub = "/static/data/pub/" + pub[5] + "/" + pub[0] + pub[4];
        code += "<div class=\"publiciteDiv\">"
            + "<img class=\"pubImgClass\" id=\"" + idPub + "\" src=\"" + pathPub + "\" onclick=\"pubEntreprise(this.id)\"/>"
            + "</div>";
    });
    console.log(code);
    // <img id=\"pubImg\" src=\"/static/data/pub/9.jpg\"/>
    document.getElementById("zone_pubCompte").innerHTML = code;
}