<?php
require_once '../config/database.php';
require_once '../classes/Database.php';
require_once '../classes/Auth.php';
require_once '../classes/PermissionManager.php';

class PermissionHandler {
    private $auth;
    private $permissionManager;
    
    public function __construct() {
        $db = new Database();
        $this->auth = new Auth($db);
        $this->permissionManager = new PermissionManager($db);
    }
    
    public function handleRequest($method, $action) {
        // Authenticate user
        $user = $this->authenticateUser();
        if (!$user) {
            $this->sendError('Unauthorized', 401);
            return;
        }
        
        // Check admin permissions
        if ($user['role'] !== 'admin') {
            $this->sendError('Admin permissions required', 403);
            return;
        }
        
        switch ($action) {
            case 'list':
                if ($method === 'GET') {
                    $result = $this->permissionManager->getAllPermissions();
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'create':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    
                    $result = $this->permissionManager->createPermission($data['name'], $data['description']);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'add-user-permission':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    
                    $result = $this->permissionManager->addUserPermission($data['user_id'], $data['permission_id']);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'remove-user-permission':
                if ($method === 'DELETE') {
                    $user_id = $_GET['user_id'] ?? '';
                    $permission_id = $_GET['permission_id'] ?? '';
                    
                    $result = $this->permissionManager->removeUserPermission($user_id, $permission_id);
                    echo json_encode($result);
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'user-permissions':
                if ($method === 'GET') {
                    $user_id = $_GET['user_id'] ?? '';
                    
                    $result = $this->permissionManager->getUserPermissions($user_id);
                    echo json_encode(['success' => true, 'permissions' => $result]);
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
