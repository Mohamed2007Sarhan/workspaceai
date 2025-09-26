<?php
require_once __DIR__ . '/../config/database.php';

class Database {
    private $connection;
    
    public function __construct() {
        try {
            $this->connection = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch (PDOException $e) {
            $this->sendError('Database connection error: ' . $e->getMessage(), 500);
        }
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    private function sendError($message, $code = 400) {
        http_response_code($code);
        echo json_encode(['error' => $message, 'success' => false]);
        exit();
    }
}
?>
