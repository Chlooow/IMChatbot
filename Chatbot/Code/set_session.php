<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["username"])) {
    $_SESSION["username"] = $_POST["username"];
}
?>
