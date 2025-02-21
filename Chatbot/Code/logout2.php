<?php
session_unset(); // Supprime toutes les variables de session
session_destroy(); // Détruit la session

// Répondre au client
echo json_encode(["success" => true]);
?>
