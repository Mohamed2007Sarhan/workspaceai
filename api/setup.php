<?php
// Database Setup Script
// Run this once to create the database and tables

require_once 'config/database.php';

class DatabaseSetup {
    private $db;
    
    public function __construct() {
        try {
            $this->db = new Database();
            echo "✅ Database connection successful\n";
        } catch (Exception $e) {
            echo "❌ Database connection failed: " . $e->getMessage() . "\n";
            exit(1);
        }
    }
    
    public function createTables() {
        $sql = file_get_contents('database/schema.sql');
        
        if (!$sql) {
            echo "❌ Could not read schema.sql file\n";
            return false;
        }
        
        try {
            // Split SQL into individual statements
            $statements = array_filter(
                array_map('trim', explode(';', $sql)),
                function($stmt) {
                    return !empty($stmt) && !preg_match('/^--/', $stmt);
                }
            );
            
            foreach ($statements as $statement) {
                if (!empty(trim($statement))) {
                    $this->db->getConnection()->exec($statement);
                }
            }
            
            echo "✅ Database tables created successfully\n";
            return true;
        } catch (Exception $e) {
            echo "❌ Error creating tables: " . $e->getMessage() . "\n";
            return false;
        }
    }
    
    public function insertDefaultData() {
        try {
            // Insert default admin user
            $adminPassword = password_hash('admin123', PASSWORD_DEFAULT);
            
            $stmt = $this->db->getConnection()->prepare("
                INSERT IGNORE INTO users (name, email, password, company, role, status) 
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                'System Administrator',
                'admin@aibusiness.com',
                $adminPassword,
                'AI Business Platform',
                'super_admin',
                'active'
            ]);
            
            echo "✅ Default admin user created (admin@aibusiness.com / admin123)\n";
            
            // Insert default permissions
            $permissions = [
                ['user_management', 'Manage users and their accounts'],
                ['team_management', 'Create and manage teams'],
                ['permission_management', 'Assign and revoke permissions'],
                ['system_settings', 'Modify system settings'],
                ['system_logs', 'View system logs'],
                ['backup_management', 'Create and manage backups'],
                ['analytics_view', 'View analytics and reports'],
                ['email_management', 'Manage email settings'],
                ['customer_service', 'Access customer service tools'],
                ['brand_management', 'Manage brand settings']
            ];
            
            $stmt = $this->db->getConnection()->prepare("
                INSERT IGNORE INTO permissions (permission_name, description) 
                VALUES (?, ?)
            ");
            
            foreach ($permissions as $permission) {
                $stmt->execute($permission);
            }
            
            echo "✅ Default permissions created\n";
            
            // Insert default system settings
            $settings = [
                ['site_name', 'AI Business Platform', 'string', 'Website name'],
                ['site_description', 'Advanced AI-powered business management platform', 'string', 'Website description'],
                ['default_language', 'en', 'string', 'Default language for new users'],
                ['default_theme', 'light', 'string', 'Default theme for new users'],
                ['max_team_members', '50', 'number', 'Maximum team members per team'],
                ['session_timeout', '3600', 'number', 'Session timeout in seconds'],
                ['backup_retention_days', '30', 'number', 'Number of days to keep backups'],
                ['email_notifications', 'true', 'boolean', 'Enable email notifications'],
                ['maintenance_mode', 'false', 'boolean', 'Enable maintenance mode']
            ];
            
            $stmt = $this->db->getConnection()->prepare("
                INSERT IGNORE INTO system_settings (setting_key, setting_value, setting_type, description) 
                VALUES (?, ?, ?, ?)
            ");
            
            foreach ($settings as $setting) {
                $stmt->execute($setting);
            }
            
            echo "✅ Default system settings created\n";
            
            return true;
        } catch (Exception $e) {
            echo "❌ Error inserting default data: " . $e->getMessage() . "\n";
            return false;
        }
    }
    
    public function testConnection() {
        try {
            $stmt = $this->db->getConnection()->prepare("SELECT 1");
            $stmt->execute();
            echo "✅ Database connection test successful\n";
            return true;
        } catch (Exception $e) {
            echo "❌ Database connection test failed: " . $e->getMessage() . "\n";
            return false;
        }
    }
    
    public function runSetup() {
        echo "🚀 Starting database setup...\n\n";
        
        // Test connection
        if (!$this->testConnection()) {
            return false;
        }
        
        // Create tables
        if (!$this->createTables()) {
            return false;
        }
        
        // Insert default data
        if (!$this->insertDefaultData()) {
            return false;
        }
        
        echo "\n🎉 Database setup completed successfully!\n";
        echo "📧 Admin login: admin@aibusiness.com\n";
        echo "🔑 Admin password: admin123\n";
        echo "🌐 API endpoint: /api/health\n";
        
        return true;
    }
}

// Run setup if called directly
if (basename(__FILE__) === basename($_SERVER['SCRIPT_NAME'])) {
    $setup = new DatabaseSetup();
    $setup->runSetup();
}
?>
