<?php
require_once 'config/db.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';

    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }

    try {
        // Get user by email
        $stmt = $pdo->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
            exit;
        }

        // Verify password
        if (!password_verify($password, $user['password'])) {
            echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
            exit;
        }

        // Start session
        session_start();
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];
        $_SESSION['user_email'] = $user['email'];

        // Connect to sleep_tracker database
        $sleep_tracker_conn = new mysqli("localhost", "root", "", "sleep_tracker");
        if ($sleep_tracker_conn->connect_error) {
            throw new Exception("Connection to sleep_tracker database failed");
        }

        // Check if user exists in sleep_tracker database
        $check_user = $sleep_tracker_conn->prepare("SELECT id FROM sleep_tracker WHERE user_id = ?");
        $check_user->bind_param("i", $user['id']);
        $check_user->execute();
        $result = $check_user->get_result();

        if ($result->num_rows === 0) {
            // Create user entry in sleep_tracker database
            $create_user = $sleep_tracker_conn->prepare("INSERT INTO sleep_tracker (user_id) VALUES (?)");
            $create_user->bind_param("i", $user['id']);
            $create_user->execute();
        }

        $sleep_tracker_conn->close();

        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'redirect' => '/PHP_PROJECT-main/pages/tracker.php',
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ]
        ]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Login failed']);
    } catch(Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Database connection error']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?> 