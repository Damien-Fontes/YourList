function boutonConnexion() {
    var identifiant = document.getElementById("identifiant").value;
    var mdp = document.getElementById("mdp").value;
    var err = document.getElementById("erreur");
    
    // $.ajax({
    //     type: "POST",
    //     url: "/test"
    // });

    $.ajax({
        type : "POST",
        url: "/testConnexion",
        data: {id : identifiant, mdp : mdp},
        success: function(data){
            if (data === "True")
                storageID(identifiant);
            else
                err.innerHTML="Mot de passe ou identifiant incorrect"
        }
    }); 
}

function storageID(identifiant) {
    $.ajax({
        type : "POST",
        url: "/getUserByLogin",
        data: {login : identifiant},
        success: function(data){
            res = JSON.parse(data);
            const idObj = { id: res["py/tuple"][0] };
            const idString = JSON.stringify(idObj);
        
            localStorage.setItem('id', idString);
            window.location.href = "/";
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

