<?php
// Fichier où les utilisateurs sont stockés
$filename = __DIR__ . "/Data/user.json";


// Vérifie si le fichier existe, sinon le crée vide
if (!file_exists($filename)) {
    file_put_contents($filename, json_encode([]));
}

// Récupère les données envoyées en JSON
$data = json_decode(file_get_contents("php://input"), true);

// Vérifie si les champs requis sont présents
if (!isset($data["email"], $data["username"], $data["password"])) {
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

// Nettoyage des données
$email = filter_var($data["email"], FILTER_SANITIZE_EMAIL);
$username = htmlspecialchars($data["username"]);
$password = $data["password"];

// Vérifications côté serveur
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "message" => "Invalid email format"]);
    exit;
}

if (!preg_match("/^[a-zA-Z0-9_-]+$/", $username)) {
    echo json_encode(["success" => false, "message" => "Invalid username format"]);
    exit;
}

if (!preg_match("/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@_\-]).{8,}$/", $password)) {
    echo json_encode(["success" => false, "message" => "Password must be at least 8 characters long, include letters, numbers, and at least one special character (@, _, -)."]);
    exit;
}

// Lire les utilisateurs existants
$users = file_exists($filename) ? json_decode(file_get_contents($filename), true) : [];

// Vérifie si l'email ou le username existe déjà
foreach ($users as $user) {
    if ($user["email"] === $email) {
        echo json_encode(["success" => false, "message" => "Email already registered"]);
        exit;
    }
    if ($user["username"] === $username) {
        echo json_encode(["success" => false, "message" => "Username already taken"]);
        exit;
    }
}

// Ajouter le nouvel utilisateur
$newUser = [
    "email" => $email,
    "username" => $username,
    "password" => password_hash($password, PASSWORD_BCRYPT) // Hash du mot de passe
];

$users[] = $newUser;

// Sauvegarde dans user.json
file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));

echo json_encode(["success" => true]);
?>
