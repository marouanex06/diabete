<?php
// patients.php - Patients CRUD API handler

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'db.php';

$method = $_SERVER['REQUEST_METHOD'];

// Helper to generate the next patient ID like P-1028
function generateNextId($pdo) {
    try {
        $stmt = $pdo->query("SELECT id FROM `patients` WHERE id LIKE 'P-%'");
        $ids = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        $maxNum = 1023; // base number
        foreach ($ids as $id) {
            $num = intval(substr($id, 2));
            if ($num > $maxNum) {
                $maxNum = $num;
            }
        }
        return 'P-' . ($maxNum + 1);
    } catch (PDOException $e) {
        return 'P-' . time(); // fallback
    }
}

try {
    if ($method === 'GET') {
        // Retrieve all patients
        $stmt = $pdo->query("SELECT * FROM `patients` ORDER BY `id` ASC");
        $patients = $stmt->fetchAll();
        echo json_encode([
            'success' => true,
            'patients' => $patients
        ]);
        exit;
    }

    if ($method === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        if (!$input) {
            echo json_encode(['success' => false, 'error' => 'Données invalides']);
            exit;
        }

        $action = isset($input['action']) ? $input['action'] : 'create';

        if ($action === 'create') {
            // Validate required fields
            if (empty($input['nom']) || empty($input['username']) || empty($input['password'])) {
                echo json_encode(['success' => false, 'error' => 'Le nom complet, l\'identifiant et le mot de passe sont requis']);
                exit;
            }

            $nom = trim($input['nom']);
            $age = !empty($input['age']) ? intval($input['age']) : null;
            $type = isset($input['type']) ? $input['type'] : 'Type 1';
            $tel = isset($input['tel']) ? trim($input['tel']) : '';
            $email = isset($input['email']) ? trim($input['email']) : '';
            $ville = isset($input['ville']) ? trim($input['ville']) : '';
            $username = trim($input['username']);
            $password = password_hash(trim($input['password']), PASSWORD_DEFAULT);
            $notes = isset($input['notes']) ? trim($input['notes']) : '';
            $statut = isset($input['statut']) ? trim($input['statut']) : 'Actif';

            // Check if username is already taken
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM `patients` WHERE `username` = :username");
            $stmt->execute(['username' => $username]);
            if ($stmt->fetchColumn() > 0) {
                echo json_encode(['success' => false, 'error' => 'Cet identifiant est déjà utilisé']);
                exit;
            }

            // Generate ID
            $id = generateNextId($pdo);

            // Insert into db
            $sql = "INSERT INTO `patients` (id, nom, age, type, tel, email, ville, username, password, statut, notes)
                    VALUES (:id, :nom, :age, :type, :tel, :email, :ville, :username, :password, :statut, :notes)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                'id' => $id,
                'nom' => $nom,
                'age' => $age,
                'type' => $type,
                'tel' => $tel,
                'email' => $email,
                'ville' => $ville,
                'username' => $username,
                'password' => $password,
                'statut' => $statut,
                'notes' => $notes
            ]);

            // Retrieve and return the created patient
            $stmt = $pdo->prepare("SELECT * FROM `patients` WHERE `id` = :id");
            $stmt->execute(['id' => $id]);
            $createdPatient = $stmt->fetch();

            echo json_encode([
                'success' => true,
                'patient' => $createdPatient
            ]);
            exit;

        } else if ($action === 'update') {
            if (empty($input['id'])) {
                echo json_encode(['success' => false, 'error' => 'ID patient requis pour la modification']);
                exit;
            }

            $id = $input['id'];
            $nom = trim($input['nom']);
            $age = !empty($input['age']) ? intval($input['age']) : null;
            $type = $input['type'];
            $tel = trim($input['tel']);
            $statut = $input['statut'];
            $email = isset($input['email']) ? trim($input['email']) : '';
            $ville = isset($input['ville']) ? trim($input['ville']) : '';
            
            // Optional fields to update if admin edited username/password
            $username = isset($input['username']) ? trim($input['username']) : null;
            $password = !empty($input['password']) ? password_hash(trim($input['password']), PASSWORD_DEFAULT) : null;

            // Check if username is taken by another user
            if ($username) {
                $stmt = $pdo->prepare("SELECT COUNT(*) FROM `patients` WHERE `username` = :username AND `id` != :id");
                $stmt->execute(['username' => $username, 'id' => $id]);
                if ($stmt->fetchColumn() > 0) {
                    echo json_encode(['success' => false, 'error' => 'Cet identifiant est déjà utilisé par un autre patient']);
                    exit;
                }
            }

            // Build dynamic update query
            $fields = [
                '`nom` = :nom',
                '`age` = :age',
                '`type` = :type',
                '`tel` = :tel',
                '`statut` = :statut',
                '`email` = :email',
                '`ville` = :ville'
            ];
            
            $params = [
                'id' => $id,
                'nom' => $nom,
                'age' => $age,
                'type' => $type,
                'tel' => $tel,
                'statut' => $statut,
                'email' => $email,
                'ville' => $ville
            ];

            if ($username !== null) {
                $fields[] = '`username` = :username';
                $params['username'] = $username;
            }

            if (!empty($password)) {
                $fields[] = '`password` = :password';
                $params['password'] = $password;
            }

            // For updates from patient's own dashboard
            if (isset($input['adresse'])) {
                $fields[] = '`adresse` = :adresse';
                $params['adresse'] = trim($input['adresse']);
            }

            $sql = "UPDATE `patients` SET " . implode(', ', $fields) . " WHERE `id` = :id";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);

            // Fetch updated
            $stmt = $pdo->prepare("SELECT * FROM `patients` WHERE `id` = :id");
            $stmt->execute(['id' => $id]);
            $updatedPatient = $stmt->fetch();

            echo json_encode([
                'success' => true,
                'patient' => $updatedPatient
            ]);
            exit;

        } else if ($action === 'delete') {
            if (empty($input['id'])) {
                echo json_encode(['success' => false, 'error' => 'ID patient requis pour la suppression']);
                exit;
            }

            $id = $input['id'];
            $stmt = $pdo->prepare("DELETE FROM `patients` WHERE `id` = :id");
            $stmt->execute(['id' => $id]);

            echo json_encode([
                'success' => true,
                'id' => $id
            ]);
            exit;
        } else {
            echo json_encode(['success' => false, 'error' => 'Action inconnue']);
            exit;
        }
    }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'error' => 'Erreur de base de données : ' . $e->getMessage()
    ]);
    exit;
}
