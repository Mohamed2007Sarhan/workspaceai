<?php
require_once '../config/database.php';
require_once '../classes/Database.php';
require_once '../classes/Auth.php';
require_once '../classes/UserManager.php';

class UserHandler {
    private $auth;
    private $userManager;
    
    public function __construct() {
        $db = new Database();
        $this->auth = new Auth($db);
        $this->userManager = new UserManager($db);
    }
    
    public function handleRequest($method, $action) {
        // Authenticate user
        $user = $this->authenticateUser();
        if (!$user) {
            $this->sendError('Unauthorized', 401);
            return;
        }
        
        switch ($action) {
            case '':
                if ($method === 'GET') {
                    $page = $_GET['page'] ?? 1;
                    $limit = $_GET['limit'] ?? 10;
                    $search = $_GET['search'] ?? '';
                    $role = $_GET['role'] ?? '';
                    
                    $result = $this->userManager->getAllUsers($page, $limit, $search, $role);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'update':
                if ($method === 'PUT') {
                    $user_id = $_GET['id'] ?? '';
                    $data = json_decode(file_get_contents('php://input'), true);
                    
                    $result = $this->userManager->updateUser($user_id, $data);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'delete':
                if ($method === 'DELETE') {
                    $user_id = $_GET['id'] ?? '';
                    
                    $result = $this->userManager->deleteUser($user_id);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            default:
                $this->sendError('Action not found', 404);
        }
    }
    
    private function authenticateUser() {
        $headers = getallheaders();
        $token = $headers['Authorization'] ?? '';
        $token = str_replace('Bearer ', '', $token);
        
        return $this->auth->verifyToken($token);
    }
    
    private function sendError($message, $code = 400) {
        http_response_code($code);
        echo json_encode(['error' => $message, 'success' => false]);
        exit();
    }
}
?>
