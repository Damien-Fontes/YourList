function onLoad() {
    const idPubString = localStorage.getItem('idPub');
    const idPubObj = JSON.parse(idPubString);

    idPub = idPubObj.idPub;
    getPub(idPub);
}

function getPub(idPub) {
    console.log(idPub);
    idPub = idPub.substr(6);
    console.log(idPub);
    $.ajax({
        type: "POST",
        url: "/getPubByIdUIdP",
        data: { id: id, idPub: idPub },
        success: function (data) {
            console.log(data);
            affichagePub(data);
        }
    });
}

function affichagePub(data) {
    document.getElementById("zone_titre").innerHTML += data[1];
    document.getElementById("zone_clics").innerHTML += data[2] + " clics";
    document.getElementById("zone_url").innerHTML += data[6];
    document.getElementById("zone_paiement").innerHTML += data[3];

    document.getElementById("zone_pubCompte").innerHTML = "<a href=\"" + data[6] + "\" target=\"_blank\"><img class=\"pubImgClass\" src=\"/static/data/pub/" + data[5] + "/" + data[0] + data[4] + "\"/></a>"

}
