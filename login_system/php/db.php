<?php
$host = 'localhost';      // XAMPP default
$dbname = 'auth_system';  // Your database name
$username = 'root';       // Default XAMPP username
$password = '';           // Default XAMPP password (blank)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>