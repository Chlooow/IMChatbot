<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Permet l'accès si besoin
header("Access-Control-Allow-Methods: GET, POST");

if (isset($_SESSION["username"])) {
    echo json_encode(["username" => $_SESSION["username"]]);
} else {
    echo json_encode(["username" => null]);
}
?>
