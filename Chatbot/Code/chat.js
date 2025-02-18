document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("chat-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Empêche le retour à la ligne
        sendMessage();
    }
});

function sendMessage() {
    let input = document.getElementById("chat-input");
    let message = input.value.trim();

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
            botMessage.textContent = "Hello, user";
            chatBox.appendChild(botMessage);

            chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);

        input.value = ""; // Effacer le champ de saisie
    }
}

// Gestion du logout
document.getElementById("logout-btn").addEventListener("click", function() {
    window.location.href = "home.html";
});
