// Vérification de l'email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Vérification du username (lettres, chiffres, "_" et "-" uniquement)
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    return usernameRegex.test(username);
}

// Vérification du mot de passe (8 caractères min, 1 lettre, 1 chiffre, 1 caractère spécial)
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@_\-]).{8,}$/;
    return passwordRegex.test(password);
}

function registration() {
    document.getElementById("register-form").addEventListener("submit", function(event) {
        event.preventDefault(); // empeche le rechargement de la page

        let email= document.getElementById("new-email").value;
        let username = document.getElementById("username").value;
        let password = document.getElementById("new-password").value;

        // Vérifications côté client (optionnelles, le serveur doit aussi les faire)
        if (!validateEmail(email)) {
            alert("Invalid email format.");
            return;
        }
        if (!validateUsername(username)) {
            alert("Username can only contain letters, numbers, '-' and '_'.");
            return;
        }
        if (!validatePassword(password)) {
            alert("Password must be at least 8 characters long, include letters, numbers, and at least one special character (@, _, -).");
            return;
        }

        let userData = {
            email: email,
            username: username,
            password: password
        };

        fetch("home.php", {
            method: "POST", 
            headers : {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)    
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Registration successful!");
            } else {
                alert("Registration failed: " + data.message);
            }
        })
    .catch(error => console.error("Error:", error));
    });
    
}

function login() {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        let email= document.getElementById("email").value;
        let password = document.getElementById("password").value;

        let userData ={
            email: email,
            password: password
        };

        fetch("login.php",
                { 
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then (data => {
                if(data.success) {
                    alert("Login successful!");
                    window.location.href = "./dashboard.html"; // redirection après login
                    } else {
                        alert("Login failed: " + data.message);
                    }
            })
            .catch(error => console.error("Error:", error));
        });
}


// Le code de validation en JavaScript pur
document.addEventListener("DOMContentLoaded", function () {
    login();
    registration();

    // Passage entre login et registration
    document.getElementById("show-login").addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
    });
});

// Le code jQuery pour gérer l'affichage des formulaires
$(document).ready(function() {
    // Function to switch between login and register forms
    function showForm(formToShow) {
        if (formToShow === "login") {
            $("#login-form").show();
            $("#register-form").hide();
        } else {
            $("#register-form").show();
            $("#login-form").hide();
        }
    }

    // Handle clicks on Login and Register buttons
    $("#login-btn, #register-btn").click(function() {
        // Remove the video and add background image
        $("#video-container").fadeOut(1000, function() {
            $(this).remove();
        });

        $("body").append('<div class="background-image"></div>');
        setTimeout(() => {
            $(".background-image").css("opacity", "1");
        }, 100);

        // Show form container
        $("#form-container").fadeIn(1000);

        // Determine which form to show
        if ($(this).attr("id") === "login-btn") {
            showForm("login");
        } else {
            showForm("register");
        }
    });

    // Handle click on "I don't have an account? Register" link
    $("#show-register").click(function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        showForm("register");
    });

    // Handle click on "Already have an account? Login" link
    $("#show-login").click(function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        showForm("login");
    });
});


