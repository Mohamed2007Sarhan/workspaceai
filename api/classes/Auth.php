<?php

class Auth {
    private $db;
    
    public function __construct($database) {
        $this->db = $database->getConnection();
    }
    
    // Register new user
    public function register($data) {
        try {
            // Validate required fields
            $required_fields = ['name', 'email', 'password', 'company'];
            foreach ($required_fields as $field) {
                if (empty($data[$field])) {
                    throw new Exception("Field {$field} is required");
                }
            }
            
            // Validate email
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                throw new Exception("Invalid email address");
            }
            
            // Check if user exists
            $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$data['email']]);
            if ($stmt->fetch()) {
                throw new Exception("Email already exists");
            }
            
            // Hash password
            $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);
            
            // Insert new user
            $stmt = $this->db->prepare("
                INSERT INTO users (name, email, password, company, role, status, created_at) 
                VALUES (?, ?, ?, ?, 'user', 'active', NOW())
            ");
            
            $stmt->execute([
                $data['name'],
                $data['email'],
                $hashed_password,
                $data['company']
            ]);
            
            $user_id = $this->db->lastInsertId();
            
            // Generate auth token
            $token = $this->generateToken($user_id);
            
            return [
                'success' => true,
                'message' => 'Account created successfully',
                'user' => [
                    'id' => $user_id,
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'company' => $data['company'],
                    'role' => 'user'
                ],
                'token' => $token
            ];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Login user
    public function login($email, $password) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ? AND status = 'active'");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            
            if (!$user || !password_verify($password, $user['password'])) {
                throw new Exception("Invalid email or password");
            }
            
            // Update last login
            $stmt = $this->db->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
            $stmt->execute([$user['id']]);
            
            // Generate auth token
            $token = $this->generateToken($user['id']);
            
            return [
                'success' => true,
                'message' => 'Login successful',
                'user' => [
                    'id' => $user['id'],
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'company' => $user['company'],
                    'role' => $user['role']
                ],
                'token' => $token
            ];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Verify token
    public function verifyToken($token) {
        try {
            $stmt = $this->db->prepare("SELECT u.* FROM users u JOIN user_tokens t ON u.id = t.user_id WHERE t.token = ? AND t.expires_at > NOW() AND u.status = 'active'");
            $stmt->execute([$token]);
            $user = $stmt->fetch();
            
            if (!$user) {
                throw new Exception("Invalid or expired token");
            }
            
            return $user;
            
        } catch (Exception $e) {
            return false;
        }
    }
    
    // Generate auth token
    private function generateToken($user_id) {
        $token = bin2hex(random_bytes(32));
        $expires_at = date('Y-m-d H:i:s', strtotime('+7 days'));
        
        $stmt = $this->db->prepare("INSERT INTO user_tokens (user_id, token, expires_at) VALUES (?, ?, ?)");
        $stmt->execute([$user_id, $token, $expires_at]);
        
        return $token;
    }
    
    // Logout user
    public function logout($token) {
        try {
            $stmt = $this->db->prepare("DELETE FROM user_tokens WHERE token = ?");
            $stmt->execute([$token]);
            
            return ['success' => true, 'message' => 'Logout successful'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}
?>
