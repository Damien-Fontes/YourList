function boutonConnexion() {
    var identifiant = document.getElementById("identifiant").value;
    var mdp = document.getElementById("mdp").value;
    var err = document.getElementById("erreur");
    
    $.ajax({
        type: "POST",
        url: "/test"
    });

    $.ajax({
        type : "POST",
        url: "/testConnexion",
        data: {id : identifiant, mdp : mdp},
        success: function(data){
            if (data === "True")
                window.location.href = "/accueil";
            else
                err.innerHTML="Mot de passe ou identifiant incorrect"
        }
    }); 
}

const btn = document.getElementById('annulerBtn');

btn.addEventListener('click', function handleClick(event) {
    var identifiant = document.getElementById("identifiant");
    var mdp = document.getElementById('mdp');
    identifiant.value = '';
    mdp.value = '';
});

