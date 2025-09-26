<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'ai_business_platform');
define('DB_USER', 'root');
define('DB_PASS', '');
define('JWT_SECRET', 'your-secret-key-here');
define('API_VERSION', 'v1');

// CORS Settings
if (!headers_sent()) {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Content-Type: application/json; charset=utf-8');
}

// Handle OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
