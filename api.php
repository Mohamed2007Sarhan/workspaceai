<?php
// Simple API file
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Simple routing
if (strpos($path, '/api/health') !== false) {
    echo json_encode([
        'success' => true,
        'status' => 'healthy',
        'timestamp' => date('Y-m-d H:i:s'),
        'version' => 'v1',
        'message' => 'API is working!'
    ]);
} elseif (strpos($path, '/api/auth/register') !== false && $method === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    echo json_encode([
        'success' => true,
        'message' => 'User registered successfully',
        'data' => $data,
        'token' => 'token_' . time()
    ]);
} elseif (strpos($path, '/api/auth/login') !== false && $method === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'token' => 'token_' . time(),
        'user' => [
            'id' => 1,
            'name' => $data['email'] ?? 'User',
            'email' => $data['email'] ?? '',
            'role' => 'user'
        ]
    ]);
} elseif (strpos($path, '/api/users') !== false && $method === 'GET') {
    echo json_encode([
        'success' => true,
        'data' => [
            [
                'id' => 1,
                'name' => 'John Doe',
                'email' => 'john@example.com',
                'role' => 'admin'
            ],
            [
                'id' => 2,
                'name' => 'Jane Smith',
                'email' => 'jane@example.com',
                'role' => 'user'
            ]
        ]
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Endpoint not found',
        'path' => $path,
        'method' => $method
    ]);
}
?>
