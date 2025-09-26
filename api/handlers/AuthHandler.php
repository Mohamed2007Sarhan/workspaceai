<?php
require_once '../config/database.php';
require_once '../classes/Database.php';
require_once '../classes/Auth.php';

class AuthHandler {
    private $auth;
    
    public function __construct() {
        $db = new Database();
        $this->auth = new Auth($db);
    }
    
    public function handleRequest($method, $action) {
        switch ($action) {
            case 'register':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    $result = $this->auth->register($data);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'login':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    $result = $this->auth->login($data['email'], $data['password']);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'logout':
                if ($method === 'POST') {
                    $headers = getallheaders();
                    $token = $headers['Authorization'] ?? '';
                    $token = str_replace('Bearer ', '', $token);
                    
                    $result = $this->auth->logout($token);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            default:
                $this->sendError('Action not found', 404);
        }
    }
    
    private function sendError($message, $code = 400) {
        http_response_code($code);
        echo json_encode(['error' => $message, 'success' => false]);
        exit();
    }
}
?>
