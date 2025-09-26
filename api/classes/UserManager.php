<?php

class UserManager {
    private $db;
    
    public function __construct($database) {
        $this->db = $database->getConnection();
    }
    
    // Get all users
    public function getAllUsers($page = 1, $limit = 10, $search = '', $role = '') {
        try {
            $offset = ($page - 1) * $limit;
            $where_conditions = [];
            $params = [];
            
            if (!empty($search)) {
                $where_conditions[] = "(name LIKE ? OR email LIKE ?)";
                $params[] = "%{$search}%";
                $params[] = "%{$search}%";
            }
            
            if (!empty($role)) {
                $where_conditions[] = "role = ?";
                $params[] = $role;
            }
            
            $where_clause = !empty($where_conditions) ? 'WHERE ' . implode(' AND ', $where_conditions) : '';
            
            // Get total count
            $count_sql = "SELECT COUNT(*) as total FROM users {$where_clause}";
            $count_stmt = $this->db->prepare($count_sql);
            $count_stmt->execute($params);
            $total = $count_stmt->fetch()['total'];
            
            // Get users
            $sql = "SELECT id, name, email, company, role, status, created_at, last_login FROM users {$where_clause} ORDER BY created_at DESC LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $users = $stmt->fetchAll();
            
            return [
                'success' => true,
                'users' => $users,
                'pagination' => [
                    'current_page' => $page,
                    'total_pages' => ceil($total / $limit),
                    'total_users' => $total,
                    'per_page' => $limit
                ]
            ];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Update user
    public function updateUser($user_id, $data) {
        try {
            $allowed_fields = ['name', 'email', 'company', 'role', 'status'];
            $update_fields = [];
            $params = [];
            
            foreach ($allowed_fields as $field) {
                if (isset($data[$field])) {
                    $update_fields[] = "{$field} = ?";
                    $params[] = $data[$field];
                }
            }
            
            if (empty($update_fields)) {
                throw new Exception("No data to update");
            }
            
            $params[] = $user_id;
            $sql = "UPDATE users SET " . implode(', ', $update_fields) . " WHERE id = ?";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            
            return ['success' => true, 'message' => 'User updated successfully'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Delete user
    public function deleteUser($user_id) {
        try {
            $stmt = $this->db->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$user_id]);
            
            if ($stmt->rowCount() === 0) {
                throw new Exception("User not found");
            }
            
            return ['success' => true, 'message' => 'User deleted successfully'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}
?>
