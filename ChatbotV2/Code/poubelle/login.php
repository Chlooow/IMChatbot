<?php
session_start();
header("Content-Type: application/json");

// Chemin du fichier JSON
$filename = __DIR__ . "/Data/user.json";

// Vérifie si le fichier existe
if (!file_exists($filename)) {
    echo json_encode(["success" => false, "message" => "User database not found."]);
    exit;
}

// Récupération des données JSON envoyées
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data["email"]) || !isset($data["password"])) {
    echo json_encode(["success" => false, "message" => "Invalid request."]);
    exit;
}

$email = $data["email"];
$password = $data["password"];

// Lire le fichier JSON
$users = json_decode(file_get_contents($filename), true) ?? [];

// Vérifier si l'email existe
foreach ($users as $user) {
    if ($user["email"] === $email && password_verify($password, $user["password"])) { // ⚠️ Sécuriser le password avec hash
        $_SESSION["username"] = $user["username"];
        echo json_encode(["success" => true, "username" => $user["username"]]);
        exit;
    }
}

echo json_encode(["success" => false, "message" => "Invalid email or password."]);
?>
