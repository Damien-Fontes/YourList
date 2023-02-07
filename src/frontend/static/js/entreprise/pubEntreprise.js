//Appelée au chargement de la page
//Récupère l'id de la pub dans le localStorage
function onLoad() {
    const idPubString = localStorage.getItem('idPub');
    const idPubObj = JSON.parse(idPubString);

    idPub = idPubObj.idPub;
    getPub(idPub);
}

//Récupère les information de la pub en fonction de l'id pub
//Entrée : id de la pub
function getPub(idPub) {
    idPub = idPub.substr(6);
    $.ajax({
        type: "POST",
        url: "/getPubByIdUIdP",
        data: { id: id, idPub: idPub },
        success: function (data) {
            affichagePub(data);
        }
    });
}

//Affiche la pub sur la page html grâce aux données de data
//Entrée : tableau contenant les données de la pub à afficher
function affichagePub(data) {
    document.getElementById("zone_titre").innerHTML += data[1];
    document.getElementById("zone_clics").innerHTML += data[2] + " clics";
    document.getElementById("zone_url").innerHTML += data[6];
    document.getElementById("zone_paiement").innerHTML += data[3];

    document.getElementById("zone_pubCompte").innerHTML = "<a href=\"" + data[6] + "\" target=\"_blank\"><img class=\"pubImgClass\" src=\"/static/data/pub/" + data[5] + "/" + data[0] + data[4] + "\"/></a>"

}
