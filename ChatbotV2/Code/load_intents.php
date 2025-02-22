<?php
// _______________________________________ with json file _____________________________________

// Vérifie si un paramètre 'intent' est passé dans l'URL
$intent = isset($_GET['intent']) ? $_GET['intent'] : 'greetings';

// Charger le fichier JSON
$jsonFilePath = './Data/intents.json';
if (file_exists($jsonFilePath)) {
    $jsonData = file_get_contents($jsonFilePath);
    $intents = json_decode($jsonData, true);

    // Vérifie si l'intent demandé existe
    if (isset($intents[$intent])) {
        echo json_encode($intents[$intent]);
    } else {
        echo json_encode(['error' => 'Intent non trouvé']);
    }
} else {
    echo json_encode(['error' => 'Fichier JSON non trouvé']);
}
?>
