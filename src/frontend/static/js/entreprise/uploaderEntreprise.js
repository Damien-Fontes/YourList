//Redirection vers accueilEntreprise.html
$.ajax({
    type: "POST",
    url: "/accueilEntreprise",
    success: function (data) {    
        window.location.href = "/accueilEntreprise";
    }
});
