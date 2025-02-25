// ----------------------------------------------------------------------------

// Les Intents

// tableau des keywords 
let greetingsKeywords = [];
let goodbyeKeywords = [];
let thanksKeywords = [];

let introKeywords = [];
let jokeKeywords = [];
let talkaboutKeywords = [];
let favsongKeywords = [];
let upcomingKeywords = [];
let fanKeywords = [];
let userleaveKeywords = [];


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
        } else if (intentType === 'thanks') {
            thanksKeywords = data;
        } else if (intentType === "introduce") {
            introKeywords = data;
        } else if (intentType === "jokes") {
            jokeKeywords = data;
        } else if (intentType === "talk_about_monsta") {
            talkaboutKeywords = data;
        } else if (intentType === "fav_song") {
            favsongKeywords = data;
        } else if (intentType === "upcoming_project") {
            upcomingKeywords = data;
        } else if (intentType === "fansupport") {
            fanKeywords = data;
        } else {
            userleaveKeywords = data;
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

    loadIntents('introduce');
    loadIntents('jokes');
    loadIntents('talk_about_monsta');
    loadIntents('fav_song');
    loadIntents('upcoming_project');
    loadIntents('fansupport');
    loadIntents('userleave');

    // ------------------------

    // loading answers

    loadAnswers('greetings');
    loadAnswers('goodbye');
    loadAnswers('thanks');

    loadAnswers('introduce_self');
    loadAnswers('jokes');
    loadAnswers('talk_about_monstax');
    loadAnswers('favorite_song');
    loadAnswers('upcoming_projects');
    loadAnswers('fan_support');
    loadAnswers('user_wants_to_leave');

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

// fonction de random


// la fonction de reponse

/*function getBotResponse(message, username) {
    
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

       /*     message = message.toLowerCase(); // Normalisation

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

}*/

function getBotResponse(message, username) {
    message = message.toLowerCase(); // Normalisation

    // Fonction pour vérifier si un message contient un mot-clé entier
    function containsWholeWord(sentence, wordsArray) {
        return wordsArray.some(word => new RegExp(`\\b${word.toLowerCase()}\\b`).test(sentence));
    }

    // Vérifier si le message contient un mot-clé de salutation
    if (containsWholeWord(message, greetingsKeywords)) {
        // Sélectionner une réponse aléatoire parmi greetingsAnswers
        const response = greetingsAnswers[Math.floor(Math.random() * greetingsAnswers.length)];
        return response.replace("{username}", username); // Remplacer le {username} par l'utilisateur
    } 
    // Vérifier si le message contient un mot-clé de salutation d'adieu
    else if (containsWholeWord(message, goodbyeKeywords)) {
        // Sélectionner une réponse aléatoire parmi goodbyeAnswers
        const response = goodbyeAnswers[Math.floor(Math.random() * goodbyeAnswers.length)];
        return response.replace("{username}", username);
    } 
    // Vérifier si le message contient un mot-clé de remerciement
    else if (containsWholeWord(message, thanksKeywords)) {
        // Sélectionner une réponse aléatoire parmi thanksAnswers
        const response = thanksAnswers[Math.floor(Math.random() * thanksAnswers.length)];
        return response.replace("{username}", username);
    }
    // Vérifier si le message contient un mot-clé de remerciement
    else if (containsWholeWord(message, introKeywords)) {
        // Sélectionner une réponse aléatoire parmi thanksAnswers
        const response = introAnswers[Math.floor(Math.random() * introAnswers.length)];
        return response.replace("{username}", username);
    }
    // Vérifier si le message contient un mot-clé de remerciement
    else if (containsWholeWord(message, jokeKeywords)) {
        // Sélectionner une réponse aléatoire parmi thanksAnswers
        const response = jokesAnswers[Math.floor(Math.random() * jokesAnswers.length)];
        return response.replace("{username}", username);
    }
    // Vérifier si le message contient un mot-clé de remerciement
    else if (containsWholeWord(message, talkaboutKeywords)) {
        // Sélectionner une réponse aléatoire parmi thanksAnswers
        const response = talkaboutmonstaAnswers[Math.floor(Math.random() * talkaboutmonstaAnswers.length)];
        return response.replace("{username}", username);
    }
    // Vérifier si le message contient un mot-clé de remerciement
    else if (containsWholeWord(message, favsongKeywords)) {
        // Sélectionner une réponse aléatoire parmi thanksAnswers
        const response = favsongAnswers[Math.floor(Math.random() * favsongAnswers.length)];
        return response.replace("{username}", username);
    }
    // Vérifier si le message contient un mot-clé de remerciement
    else if (containsWholeWord(message, fanKeywords)) {
        // Sélectionner une réponse aléatoire parmi thanksAnswers
        const response = fansupportAnswers[Math.floor(Math.random() * fansupportAnswers.length)];
        return response.replace("{username}", username);
    }
    // Vérifier si le message contient un mot-clé de remerciement
    else if (containsWholeWord(message, upcomingKeywords)) {
        // Sélectionner une réponse aléatoire parmi thanksAnswers
        const response = upcomingAnswers[Math.floor(Math.random() * upcomingAnswers.length)];
        return response.replace("{username}", username);
    }
    // Vérifier si le message contient un mot-clé de remerciement
    else if (containsWholeWord(message, userleaveKeywords)) {
        // Sélectionner une réponse aléatoire parmi thanksAnswers
        const response = userleaveAnswers[Math.floor(Math.random() * userleaveAnswers.length)];
        return response.replace("{username}", username);
    } else {
        return "I don't understand, can you repeat please?";
    }
}

// ----------------------------------------------------------------------------

// Les answers

let greetingsAnswers = [];
let thanksAnswers = [];
let goodbyeAnswers = [];

let introAnswers = [];
let jokesAnswers = [];
let talkaboutmonstaAnswers = [];
let favsongAnswers = [];
let upcomingAnswers = [];
let fansupportAnswers = [];
let userleaveAnswers = [];


// on charge les keywords pour chaque catégorie

function loadAnswers(answerType) {
    fetch(`load_answers.php?answer=${answerType}`)
    .then(response => response.json())
    .then(data => {
        if (answerType === 'greetings') {
            greetingsAnswers = data;
            console.log('Greetings Answers:', greetingsAnswers);

        } else if (answerType === 'goodbye') {
            goodbyeAnswers = data;
            console.log('goodbye Answers:', goodbyeAnswers);

        } else if (answerType === 'thanks') {
            thanksAnswers = data;
            console.log('thanks Answers:', thanksAnswers);

        } else if (answerType === 'introduce_self') {
            introAnswers = data;
            console.log('intro Answers:', introAnswers);

        } else if (answerType === 'jokes') {
            jokesAnswers = data;
            console.log('jokes Answers:', jokesAnswers);

        } else if (answerType === 'talk_about_monstax') {
            talkaboutmonstaAnswers = data;
        } else if (answerType === 'favorite_song') {
            favsongAnswers = data;
        } else if (answerType === 'upcoming_projects') {
            upcomingAnswers = data;
        } else if (answerType === 'fan_support') {
            fansupportAnswers= data;
        } else {
             userleaveAnswers = data;
        }   

        console.log(`${answerType} Answers:`, data); // Debugging
    })
    .catch(error => console.error('Error loading answers:', error));
}


// -----------------------------------------------------------------

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
// ___________________________ mode sombre et light __________________________


document.addEventListener("DOMContentLoaded", function () {
    const settingsIcon = document.querySelector(".icon"); // L'icône des paramètres
    const settingsMenu = document.getElementById("settings-menu");
    const toggleDarkModeBtn = document.getElementById("darkmode-switch");
    const toggleMonbebemodeBtn = document.getElementById("monbebe-switch");

    // Vérifier si le mode sombre est activé dans le stockage local
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        toggleDarkModeBtn.checked = true;
        localStorage.setItem("monbebeMode", "disabled");
    }

    if (localStorage.getItem("monbebeMode") === "enabled") {
        document.body.classList.add("monbebe-mode");
        toggleMonbebemodeBtn.checked = true;
        localStorage.setItem("darkMode", "disabled");
    }

    // Ouvrir/fermer le menu des paramètres
    settingsIcon.addEventListener("click", function () {
        settingsMenu.classList.toggle("hidden");
    });

    // Activer/Désactiver le mode sombre
    toggleDarkModeBtn.addEventListener("change", function () {
        document.body.classList.toggle("dark-mode");

        if(toggleDarkModeBtn.checked) {
            document.body.classList.add("dark-mode");
            document.body.classList.remove("monbebe-mode"); // Désactiver Monbebe mode
            toggleMonbebemodeBtn.checked = false; // Décocher Monbebe mode
            localStorage.setItem("darkMode", "enabled");
            localStorage.setItem("monbebeMode", "disabled");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("darkMode", "disabled");
        }

        // Sauvegarder l'état du mode sombre dans le localStorage
        /*if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }*/
    });

        toggleMonbebemodeBtn.addEventListener("change", function () {
        document.body.classList.toggle("monbebe-mode");

        if(toggleMonbebemodeBtn.checked) {
            document.body.classList.add("monbebe-mode");
            document.body.classList.remove("dark-mode"); // Désactiver Dark mode
            toggleDarkModeBtn.checked = false; // Décocher Dark mode
            localStorage.setItem("monbebeMode", "enabled");
            localStorage.setItem("darkMode", "disabled");
        } else {
            document.body.classList.remove("monbebe-mode");
            localStorage.setItem("monbebeMode", "disabled");
        }

    });
});

// ________________
// bouton de exit
document.getElementById("logout-btn").addEventListener("click", function() {
    fetch("logout2.php").then(() => {
        user = sessionStorage.getItem("username");
        alert("Bye " + user + " !👋🏻 I love you  :): ")
        sessionStorage.removeItem("username");
        window.location.href = "home2.html";
    });
});


