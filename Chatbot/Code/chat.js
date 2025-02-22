// ----------------------------------------------------------------------------

// Les Intents

// tableau des keywords 
let greetingsKeywords = [];
let goodbyeKeywords = [];
let thanksKeywords = [];

// on charge les keywords pour chaque catégorie

function loadIntents(intentType) {
    fetch(`load_intents.php?intent=${intentType}`)
    .then(response => response.json())
    .then(data => {
        if (intentType === 'greetings') {
            greetingsKeywords = data;
            console.log('Greetings Keywords:', greetingsKeywords);
        } else if (intentType === 'goodbye') {
            goodbyeKeywords = data;
        } else {
            thanksKeywords = data;
        }   

        console.log(`${intentType} Keywords:`, data); // Debugging
    })
    .catch(error => console.error('Error loading intents:', error));
}

// on charge les intents dès que la page se charge
/*document.addEventListener("DOMContentLoaded", function(){
    Promise.all([
        loadIntents('greetings'),
        loadIntents('goodbye'),
        loadIntents('thanks')
    ]).then(() => {
        console.log('Intents loaded');
        setupChat();
    });
});*/

// Charger les intents au chargement de la page
document.addEventListener("DOMContentLoaded", function() {
    loadIntents('greetings');
    loadIntents('goodbye');
    loadIntents('thanks');
    setupChat();
});


function setupChat() {
    document.getElementById("send-btn").addEventListener("click", sendMessage);
    document.getElementById("chat-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Empêche le retour à la ligne
            sendMessage();
        }
    });
}

// __________________________________________________________________________________

// -------------------------

// la fonction de reponse

function getBotResponse(message, username) {
    /*
    if (greetingsKeywords.length > 0 && greetingsKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
        return `Hey, ${username}! How are you today ?`;
    } else if (goodbyeKeywords.length > 0 && goodbyeKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
        return `Bye, ${username}!`;
    } else if (thanksKeywords.length > 0 && thanksKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
        return `your welcome, ${username}! 😊`;
    } else {
        return "I don't understand, can you repeate please ?";
    }*/

        /*message = message.toLowerCase(); // Normalisation

        if (greetingsKeywords.some(keyword => message.includes(keyword.toLowerCase()))) {
            return `Hey, ${username}! How are you today?`;
        } else if (goodbyeKeywords.some(keyword => message.includes(keyword.toLowerCase()))) {
            return `Bye, ${username}!`;
        } else if (thanksKeywords.some(keyword => message.includes(keyword.toLowerCase()))) {
            return `You're welcome, ${username}! 😊`;
        } else {
            return "I don't understand, can you repeat please?";
        }*/

            message = message.toLowerCase(); // Normalisation

    // Fonction pour vérifier si un message contient un mot-clé entier
    function containsWholeWord(sentence, wordsArray) {
        return wordsArray.some(word => new RegExp(`\\b${word.toLowerCase()}\\b`).test(sentence));
    }

    if (containsWholeWord(message, greetingsKeywords)) {
        return `Hey, ${username}! How are you today?`;
    } else if (containsWholeWord(message, goodbyeKeywords)) {
        return `Bye, ${username}!`;
    } else if (containsWholeWord(message, thanksKeywords)) {
        return `You're welcome, ${username}! 😊`;
    } else {
        return "I don't understand, can you repeat please?";
    }

}


function sendMessage() {
    let input = document.getElementById("chat-input");
    let message = input.value.trim();
    let username = sessionStorage.getItem("username") || "User";

    if (message !== "") {
        let chatBox = document.getElementById("chat-box");

        // Ajouter le message utilisateur
        let userMessage = document.createElement("div");
        userMessage.classList.add("message", "user");
        userMessage.textContent = message;
        chatBox.appendChild(userMessage);

        // Défilement automatique vers le bas
        chatBox.scrollTop = chatBox.scrollHeight;

        // Simuler une réponse du bot
        setTimeout(() => {
            let botMessage = document.createElement("div");
            botMessage.classList.add("message", "bot");
            botMessage.textContent = getBotResponse(message, username);
            //botMessage.textContent = "Hello, "+username;
            chatBox.appendChild(botMessage);

            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);

        input.value = ""; // Effacer le champ de saisie
    }
}

// Gestion du logout
/*document.getElementById("logout-btn").addEventListener("click", function() {
    //window.location.href = "home.html";
    fetch("logout.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                sessionStorage.clear(); // Supprime les données stockées côté client
                window.location.href = "home.html"; // Redirige vers la page d'accueil
            }
        });
});*/

// bouton de exit
document.getElementById("logout-btn").addEventListener("click", function() {
    fetch("logout2.php").then(() => {
        user = sessionStorage.getItem("username");
        alert("Bye " + user + " !👋🏻 I love you  :): ")
        sessionStorage.removeItem("username");
        window.location.href = "home2.html";
    });
});


