<?php
// Database configuration
$host = 'localhost';
$username = 'root';
$password = '';

try {
    // Create connection
    $conn = new mysqli($host, $username, $password);
    
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }

    echo "Connected successfully<br>";

    // Create login_system database
    $sql = "CREATE DATABASE IF NOT EXISTS login_system";
    if ($conn->query($sql) === TRUE) {
        echo "Database login_system created successfully<br>";
    } else {
        throw new Exception("Error creating database: " . $conn->error);
    }

    // Select login_system database
    $conn->select_db("login_system");

    // Create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    if ($conn->query($sql) === TRUE) {
        echo "Table users created successfully<br>";
    } else {
        throw new Exception("Error creating table: " . $conn->error);
    }

    // Create sleep_tracker database
    $sql = "CREATE DATABASE IF NOT EXISTS sleep_tracker";
    if ($conn->query($sql) === TRUE) {
        echo "Database sleep_tracker created successfully<br>";
    } else {
        throw new Exception("Error creating database: " . $conn->error);
    }

    // Select sleep_tracker database
    $conn->select_db("sleep_tracker");

    // Create sleep_tracker table
    $sql = "CREATE TABLE IF NOT EXISTS sleep_tracker (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        day VARCHAR(10),
        sleep_time TIME,
        wake_time TIME,
        FOREIGN KEY (user_id) REFERENCES login_system.users(id)
    )";

    if ($conn->query($sql) === TRUE) {
        echo "Table sleep_tracker created successfully<br>";
    } else {
        throw new Exception("Error creating table: " . $conn->error);
    }

    echo "<br>Setup completed successfully!<br>";
    echo "<a href='login_system/login.html'>Go to Login Page</a>";

} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}

$conn->close();
?> 