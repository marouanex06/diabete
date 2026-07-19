<?php
// contact.php - API for handling contact form submissions

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'db.php';

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['email'])) {
    echo json_encode([
        'success' => false,
        'error' => 'L\'email est requis'
    ]);
    exit;
}

$email = trim($input['email']);
$message = isset($input['message']) ? trim($input['message']) : '';

if (empty($email)) {
    echo json_encode([
        'success' => false,
        'error' => 'L\'email est requis'
    ]);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO `messages` (email, message) VALUES (:email, :message)");
    $stmt->execute([
        'email' => $email,
        'message' => $message
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Votre message a été envoyé avec succès.'
    ]);
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Erreur lors de l\'envoi du message : ' . $e->getMessage()
    ]);
}
