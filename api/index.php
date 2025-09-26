<?php
// AI Business Platform API
// Main API Handler

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set timezone
date_default_timezone_set('UTC');

// Start session
session_start();

// CORS Headers
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple API Handler
class APIHandler {
    
    public function handleRequest() {
        try {
            $method = $_SERVER['REQUEST_METHOD'];
            $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
            
            // Debug: Log the full path
            error_log("Full path: " . $path);
            
            // Remove /workspace/api from path
            $path = str_replace('/workspace/api', '', $path);
            $path = str_replace('/api', '', $path);
            $path = trim($path, '/');
            
            error_log("Cleaned path: " . $path);
            
            $path_parts = explode('/', $path);
            $endpoint = $path_parts[0] ?? '';
            $action = $path_parts[1] ?? '';
            
            error_log("Endpoint: " . $endpoint . ", Action: " . $action);
            
            switch ($endpoint) {
                case 'health':
                    $this->handleHealth();
                    break;
                case 'auth':
                    $this->handleAuth($method, $action);
                    break;
                case 'users':
                    $this->handleUsers($method, $action);
                    break;
                case 'teams':
                    $this->handleTeams($method, $action);
                    break;
                case 'permissions':
                    $this->handlePermissions($method, $action);
                    break;
                default:
                    $this->sendError('Endpoint not found: ' . $endpoint, 404);
            }
        } catch (Exception $e) {
            $this->sendError('Server error: ' . $e->getMessage(), 500);
        }
    }
    
    private function handleHealth() {
        echo json_encode([
            'success' => true,
            'status' => 'healthy',
            'timestamp' => date('Y-m-d H:i:s'),
            'version' => 'v1',
            'message' => 'AI Business Platform API is running'
        ]);
    }
    
    private function handleAuth($method, $action) {
        switch ($action) {
            case 'register':
                if ($method === 'POST') {
                    $this->handleRegister();
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'login':
                if ($method === 'POST') {
                    $this->handleLogin();
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            case 'logout':
                if ($method === 'POST') {
                    $this->handleLogout();
                } else {
                    $this->sendError('Method not allowed', 405);
                }
                break;
                
            default:
                $this->sendError('Auth action not found: ' . $action, 404);
        }
    }
    
    private function handleRegister() {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (!$data) {
            $this->sendError('Invalid JSON data', 400);
            return;
        }
        
        // Validate required fields
        $required = ['name', 'email', 'password', 'company'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                $this->sendError("Field '$field' is required", 400);
                return;
            }
        }
        
        // Simulate user registration
        $user = [
            'id' => rand(1000, 9999),
            'name' => $data['name'],
            'email' => $data['email'],
            'company' => $data['company'],
            'role' => 'user',
            'status' => 'active',
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        echo json_encode([
            'success' => true,
            'message' => 'User registered successfully',
            'data' => $user,
            'token' => 'token_' . time() . '_' . rand(1000, 9999)
        ]);
    }
    
    private function handleLogin() {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (!$data) {
            $this->sendError('Invalid JSON data', 400);
            return;
        }
        
        // Validate required fields
        if (empty($data['email']) || empty($data['password'])) {
            $this->sendError('Email and password are required', 400);
            return;
        }
        
        // Simulate user login
        $user = [
            'id' => rand(1000, 9999),
            'name' => explode('@', $data['email'])[0],
            'email' => $data['email'],
            'role' => 'user',
            'status' => 'active',
            'last_login' => date('Y-m-d H:i:s')
        ];
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful',
            'data' => $user,
            'token' => 'token_' . time() . '_' . rand(1000, 9999)
        ]);
    }
    
    private function handleLogout() {
        echo json_encode([
            'success' => true,
            'message' => 'Logout successful'
        ]);
    }
    
    private function handleUsers($method, $action) {
        // Simple user management
        if ($method === 'GET' && empty($action)) {
            $users = [
                [
                    'id' => 1,
                    'name' => 'John Doe',
                    'email' => 'john@example.com',
                    'role' => 'admin',
                    'status' => 'active'
                ],
                [
                    'id' => 2,
                    'name' => 'Jane Smith',
                    'email' => 'jane@example.com',
                    'role' => 'user',
                    'status' => 'active'
                ]
            ];
            
            echo json_encode([
                'success' => true,
                'data' => $users,
                'total' => count($users)
            ]);
        } else {
            $this->sendError('Users endpoint not implemented', 501);
        }
    }
    
    private function handleTeams($method, $action) {
        // Simple team management
        if ($method === 'GET' && empty($action)) {
            $teams = [
                [
                    'id' => 1,
                    'name' => 'Development Team',
                    'description' => 'Software development team',
                    'members_count' => 5
                ],
                [
                    'id' => 2,
                    'name' => 'Marketing Team',
                    'description' => 'Marketing and sales team',
                    'members_count' => 3
                ]
            ];
            
            echo json_encode([
                'success' => true,
                'data' => $teams,
                'total' => count($teams)
            ]);
        } else {
            $this->sendError('Teams endpoint not implemented', 501);
        }
    }
    
    private function handlePermissions($method, $action) {
        // Simple permissions management
        if ($method === 'GET' && empty($action)) {
            $permissions = [
                [
                    'id' => 1,
                    'name' => 'user_management',
                    'description' => 'Manage users and their accounts'
                ],
                [
                    'id' => 2,
                    'name' => 'team_management',
                    'description' => 'Create and manage teams'
                ],
                [
                    'id' => 3,
                    'name' => 'permission_management',
                    'description' => 'Assign and revoke permissions'
                ]
            ];
            
            echo json_encode([
                'success' => true,
                'data' => $permissions,
                'total' => count($permissions)
            ]);
        } else {
            $this->sendError('Permissions endpoint not implemented', 501);
        }
    }
    
    private function sendError($message, $code = 400) {
        http_response_code($code);
        echo json_encode([
            'success' => false,
            'error' => $message,
            'code' => $code,
            'timestamp' => date('Y-m-d H:i:s')
        ]);
        exit();
    }
}

// Handle the request
try {
    $api = new APIHandler();
    $api->handleRequest();
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Internal server error',
        'message' => $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}
?>