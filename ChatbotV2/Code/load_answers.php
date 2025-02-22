<?php
// _______________________________________ with json file _____________________________________

// Vérifie si un paramètre 'intent' est passé dans l'URL
$answer = isset($_GET['answer']) ? $_GET['answer'] : 'greetings';

// Charger le fichier JSON
$jsonFilePath = './Data/answers.json';
if (file_exists($jsonFilePath)) {
    $jsonData = file_get_contents($jsonFilePath);
    $answers = json_decode($jsonData, true);

    // Vérifie si l'intent demandé existe
    if (isset($answers[$answer])) {
        echo json_encode($answers[$answer]);
    } else {
        echo json_encode(['error' => 'Answers non trouvé']);
    }
} else {
    echo json_encode(['error' => 'Fichier JSON non trouvé']);
}
?>
