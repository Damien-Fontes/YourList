menuHautStr = "<a onclick=\"playlists()\">Playlists</a> | " 
    + "<a onclick=\"compte()\">Compte</a> | "
    + "<a onclick=\"seDeconnecter()\">Se Déconnecter</a> ";
document.getElementsByClassName("menuHaut")[0].innerHTML = menuHautStr;

function allerA(fichier) {
    str = "/" + fichier;
    window.location.href = str;
}

function playlists() {
    window.location.href = "/playlist";
}

function compte() {
    window.location.href = "/compte";
}

function seDeconnecter() {
    window.location.href = "/connexion";
}