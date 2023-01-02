function boutonConnexion() {
    var identifiant = document.getElementById("identifiant").value;
    var mdp = document.getElementById("mdp").value;
    window.location.href = 'menuPrincipal.html';
    console.log("boutonConnexion() ending");

    $.ajax({
        type: "POST",
        url: "~/pythoncode.py",
        data: { param: text}
      }).done(function( o ) {
         // do something
      });
}

const btn = document.getElementById('annulerBtn');

btn.addEventListener('click', function handleClick(event) {
    var identifiant = document.getElementById("identifiant");
    var mdp = document.getElementById('mdp');
    identifiant.value = '';
    mdp.value = '';
});

