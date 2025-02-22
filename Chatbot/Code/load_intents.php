<?php
// _______________________________________ with csv file _____________________________________
/*// Vérifie si un paramètre 'intent' est passé dans l'URL
$intent = isset($_GET['intent']) ? $_GET['intent'] : 'greetings';

$csvFilePath = './Data/' . $intent . '.csv';
// Charger le fichier CSV correspondant
if(file_exists($csvFilePath)) {
    $csvFile = fopen($csvFilePath, 'r');
    $keywords = [];
    
    while (($line = fgetcsv($csvFile)) !== FALSE) {
    $keywords[] = $line[0]; // Ajouter le mot-clé
    }
    
    fclose($csvFile);
    // Retourner les mots-clés sous forme de JSON
    echo json_encode($keywords);
} else {
    echo json_encode(['error' => ' Fichier CSV non trouvé']);
}*/

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
