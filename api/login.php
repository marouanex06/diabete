<?php
// login.php - Login API handler

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'db.php';

// Get request body
$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['username']) || !isset($input['password']) || !isset($input['role'])) {
    echo json_encode([
        'success' => false,
        'error' => 'Champs requis manquants'
    ]);
    exit;
}

$username = trim($input['username']);
$password = trim($input['password']);
$role = $input['role']; // "direction" | "patient"

if ($role === 'direction') {
    // Admin login
    if ($username === 'admin' && $password === 'admin') {
        echo json_encode([
            'success' => true,
            'role' => 'direction',
            'user' => [
                'nom' => 'Kadous Oumaima',
                'role' => 'Présidente'
            ]
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Identifiant ou mot de passe administrateur incorrect'
        ]);
    }
} else if ($role === 'patient') {
    // Patient login
    try {
        $stmt = $pdo->prepare("SELECT * FROM `patients` WHERE `username` = :username");
        $stmt->execute(['username' => $username]);
        $patient = $stmt->fetch();

        // Verify hashed password
        if ($patient && password_verify($password, $patient['password'])) {
            // Remove sensitive password before sending back
            unset($patient['password']);
            echo json_encode([
                'success' => true,
                'role' => 'patient',
                'patient' => $patient
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Identifiant ou mot de passe incorrect'
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'error' => 'Erreur lors de la connexion : ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Rôle invalide'
    ]);
}
