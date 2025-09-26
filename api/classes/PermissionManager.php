<?php

class PermissionManager {
    private $db;
    
    public function __construct($database) {
        $this->db = $database->getConnection();
    }
    
    // Check if user has permission
    public function hasPermission($user_id, $permission) {
        try {
            $stmt = $this->db->prepare("
                SELECT p.permission_name 
                FROM user_permissions up 
                JOIN permissions p ON up.permission_id = p.id 
                WHERE up.user_id = ? AND p.permission_name = ?
            ");
            $stmt->execute([$user_id, $permission]);
            
            return $stmt->fetch() !== false;
            
        } catch (Exception $e) {
            return false;
        }
    }
    
    // Get user permissions
    public function getUserPermissions($user_id) {
        try {
            $stmt = $this->db->prepare("
                SELECT p.permission_name, p.description 
                FROM user_permissions up 
                JOIN permissions p ON up.permission_id = p.id 
                WHERE up.user_id = ?
            ");
            $stmt->execute([$user_id]);
            
            return $stmt->fetchAll();
            
        } catch (Exception $e) {
            return [];
        }
    }
    
    // Add permission to user
    public function addUserPermission($user_id, $permission_id) {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO user_permissions (user_id, permission_id) 
                VALUES (?, ?)
            ");
            $stmt->execute([$user_id, $permission_id]);
            
            return ['success' => true, 'message' => 'Permission added successfully'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Remove permission from user
    public function removeUserPermission($user_id, $permission_id) {
        try {
            $stmt = $this->db->prepare("
                DELETE FROM user_permissions 
                WHERE user_id = ? AND permission_id = ?
            ");
            $stmt->execute([$user_id, $permission_id]);
            
            return ['success' => true, 'message' => 'Permission removed successfully'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Get all permissions
    public function getAllPermissions() {
        try {
            $stmt = $this->db->prepare("SELECT * FROM permissions ORDER BY permission_name");
            $stmt->execute();
            
            return ['success' => true, 'permissions' => $stmt->fetchAll()];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // Create new permission
    public function createPermission($name, $description) {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO permissions (permission_name, description) 
                VALUES (?, ?)
            ");
            $stmt->execute([$name, $description]);
            
            return ['success' => true, 'message' => 'Permission created successfully'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}
?>
