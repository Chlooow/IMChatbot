<?php
// Vérifie si un paramètre 'intent' est passé dans l'URL
$intent = isset($_GET['intent']) ? $_GET['intent'] : 'greetings';

// Charger le fichier CSV correspondant
$csvFile = fopen($intent . '.csv', 'r');
$keywords = [];

while (($line = fgetcsv($csvFile)) !== FALSE) {
    $keywords[] = $line[0]; // Ajouter le mot-clé
}

fclose($csvFile);

// Retourner les mots-clés sous forme de JSON
echo json_encode($keywords);
?>
