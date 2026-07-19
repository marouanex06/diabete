<?php
// db.php - Database connection and initialization

$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'diabete_ma';

try {
    // 1. Connect to MySQL server first (without database)
    $pdo = new PDO("mysql:host=$host", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // 2. Create database if it doesn't exist
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

    // 3. Connect to the specific database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    // 4. Create patients table if it doesn't exist
    $createTableSQL = "
        CREATE TABLE IF NOT EXISTS `patients` (
            `id` VARCHAR(50) PRIMARY KEY,
            `nom` VARCHAR(255) NOT NULL,
            `age` INT DEFAULT NULL,
            `type` VARCHAR(50) DEFAULT 'Type 1',
            `tel` VARCHAR(50) DEFAULT NULL,
            `email` VARCHAR(100) DEFAULT NULL,
            `ville` VARCHAR(100) DEFAULT NULL,
            `username` VARCHAR(100) UNIQUE NOT NULL,
            `password` VARCHAR(255) NOT NULL,
            `statut` VARCHAR(50) DEFAULT 'Actif',
            `diagnostic` VARCHAR(100) DEFAULT '15 mars 2019',
            `medecin` VARCHAR(100) DEFAULT 'Dr. Karim B.',
            `traitement` VARCHAR(255) DEFAULT 'Metformine 850 mg',
            `adresse` VARCHAR(255) DEFAULT 'Avenue Hassan II, Casablanca',
            `notes` TEXT DEFAULT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    $pdo->exec($createTableSQL);

    // Create messages table if it doesn't exist
    $createMessagesTableSQL = "
        CREATE TABLE IF NOT EXISTS `messages` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `email` VARCHAR(255) NOT NULL,
            `message` TEXT NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    ";
    $pdo->exec($createMessagesTableSQL);

    // 5. Seed default patients if table is empty
    $stmt = $pdo->query("SELECT COUNT(*) FROM `patients`");
    $count = $stmt->fetchColumn();

    if ($count == 0) {
        $defaultPatients = [
            [
                'id' => 'P-1024',
                'nom' => 'Fatima Zahra B.',
                'age' => 54,
                'type' => 'Type 2',
                'tel' => '0661-23-45-67',
                'email' => 'fatima@email.ma',
                'ville' => 'Casablanca',
                'username' => 'fatima',
                'password' => 'fatima123',
                'statut' => 'Actif',
                'diagnostic' => '15 mars 2019',
                'medecin' => 'Dr. Karim B.',
                'traitement' => 'Metformine 850 mg',
                'adresse' => 'Avenue Hassan II, Casablanca',
                'notes' => 'Notes initiales'
            ],
            [
                'id' => 'P-1025',
                'nom' => 'Ahmed L.',
                'age' => 41,
                'type' => 'Type 1',
                'tel' => '0662-98-76-54',
                'email' => 'ahmed@email.ma',
                'ville' => 'Rabat',
                'username' => 'ahmed',
                'password' => 'ahmed123',
                'statut' => 'Actif',
                'diagnostic' => '10 juin 2021',
                'medecin' => 'Dr. Karim B.',
                'traitement' => 'Insuline NovoRapid',
                'adresse' => 'Rue de France, Rabat',
                'notes' => ''
            ],
            [
                'id' => 'P-1026',
                'nom' => 'Sanae M.',
                'age' => 33,
                'type' => 'Gestationnel',
                'tel' => '0663-11-22-33',
                'email' => 'sanae@email.ma',
                'ville' => 'Casablanca',
                'username' => 'sanae',
                'password' => 'sanae123',
                'statut' => 'Suivi',
                'diagnostic' => '02 mai 2026',
                'medecin' => 'Dr. Nadia L.',
                'traitement' => 'Régime alimentaire + suivi glycémique',
                'adresse' => 'Boulevard Ghandi, Casablanca',
                'notes' => 'Enceinte de 6 mois'
            ],
            [
                'id' => 'P-1027',
                'nom' => 'Youssef R.',
                'age' => 60,
                'type' => 'Type 2',
                'tel' => '0664-44-55-66',
                'email' => 'youssef@email.ma',
                'ville' => 'Fès',
                'username' => 'youssef',
                'password' => 'youssef123',
                'statut' => 'Actif',
                'diagnostic' => '12 sept. 2015',
                'medecin' => 'Dr. Karim B.',
                'traitement' => 'Metformine + Glibenclamide',
                'adresse' => 'Ville Nouvelle, Fès',
                'notes' => ''
            ]
        ];

        $insertSQL = "
            INSERT INTO `patients` (id, nom, age, type, tel, email, ville, username, password, statut, diagnostic, medecin, traitement, adresse, notes)
            VALUES (:id, :nom, :age, :type, :tel, :email, :ville, :username, :password, :statut, :diagnostic, :medecin, :traitement, :adresse, :notes)
        ";
        $insertStmt = $pdo->prepare($insertSQL);

        foreach ($defaultPatients as $p) {
            $p['password'] = password_hash($p['password'], PASSWORD_DEFAULT);
            $insertStmt->execute($p);
        }
    }

} catch (PDOException $e) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'error' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit;
}
