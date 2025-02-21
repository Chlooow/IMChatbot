$(document).ready(function () {
    console.log("Script chargé avec succès !");

    // Vérifier si le bouton existe bien
    if ($("#register-btn").length === 0) {
        console.error("Erreur : Le bouton #register-btn n'existe pas !");
        return;
    }

    // Vérifier si le formulaire existe bien
    if ($("#form-container").length === 0) {
        console.error("Erreur : Le formulaire #form-container n'existe pas !");
        return;
    }

    // Cacher le formulaire au chargement de la page
    $("#form-container").hide();

    // Afficher le formulaire lorsque l'on clique sur "Start Now"
    $("#register-btn").click(function () {
        $("#video-container").fadeOut(1000, function() {
            $(this).remove();
        });

        $("body").append('<div class="background-image"></div>');
        setTimeout(() => {
            $(".background-image").css("opacity", "1");
        }, 100);

        console.log("Bouton 'Start Now' cliqué !");

        $("#form-container").fadeIn();
    });

    // Vérifier la soumission du formulaire
    $("#register-form").submit(function (event) {
        event.preventDefault(); // Empêcher le rechargement de la page

        let name = $("#name").val().trim();
        if (name === "") {
            alert("Veuillez entrer un nom !");
            return;
        }

        sessionStorage.setItem("username", name);

        console.log("Nom saisi :", name);
        alert("Welcome, " + name + " 🐱! ");

        // envoyer le nom à la session php
        fetch("set_session.php", {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded" },
            body: "username=" + encodeURIComponent(name),
        }).then(() => {
            window.location.href = "./dashboard.html"; // redirection après login
        });
    });
});
