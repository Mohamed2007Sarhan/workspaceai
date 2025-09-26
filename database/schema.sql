-- إنشاء قاعدة البيانات
CREATE DATABASE IF NOT EXISTS ai_business_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE ai_business_platform;

-- جدول المستخدمين
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    role ENUM('admin', 'moderator', 'user') DEFAULT 'user',
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    avatar VARCHAR(500),
    bio TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status)
);

-- جدول رموز المصادقة
CREATE TABLE user_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(64) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at)
);

-- جدول الفرق
CREATE TABLE teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_owner_id (owner_id)
);

-- جدول أعضاء الفرق
CREATE TABLE team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    user_id INT NOT NULL,
    role ENUM('admin', 'moderator', 'member') DEFAULT 'member',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_team_user (team_id, user_id),
    INDEX idx_team_id (team_id),
    INDEX idx_user_id (user_id)
);

-- جدول دعوات الفرق
CREATE TABLE team_invitations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    role ENUM('admin', 'moderator', 'member') DEFAULT 'member',
    invitation_token VARCHAR(64) UNIQUE NOT NULL,
    invited_by INT NOT NULL,
    status ENUM('pending', 'accepted', 'expired', 'cancelled') DEFAULT 'pending',
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP NULL,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (invited_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_team_id (team_id),
    INDEX idx_email (email),
    INDEX idx_invitation_token (invitation_token),
    INDEX idx_status (status),
    INDEX idx_expires_at (expires_at)
);

-- جدول رموز الفرق المشتركة
CREATE TABLE team_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    team_id INT NOT NULL,
    token VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    permissions JSON,
    created_by INT NOT NULL,
    expires_at TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_team_id (team_id),
    INDEX idx_token (token),
    INDEX idx_is_active (is_active)
);

-- جدول إعدادات المستخدمين
CREATE TABLE user_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    setting_key VARCHAR(100) NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_setting (user_id, setting_key),
    INDEX idx_user_id (user_id)
);

-- جدول أنشطة المستخدمين
CREATE TABLE user_activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_type VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_activity_type (activity_type),
    INDEX idx_created_at (created_at)
);

-- جدول الإشعارات
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'warning', 'error', 'success') DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
);

-- جدول جلسات المستخدمين
CREATE TABLE user_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    session_token VARCHAR(64) UNIQUE NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_session_token (session_token),
    INDEX idx_expires_at (expires_at)
);

-- جدول إحصائيات النظام
CREATE TABLE system_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    stat_name VARCHAR(100) NOT NULL,
    stat_value DECIMAL(15,2) NOT NULL,
    stat_unit VARCHAR(20),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_stat_name (stat_name),
    INDEX idx_recorded_at (recorded_at)
);

-- جدول سجلات النظام
CREATE TABLE system_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    log_level ENUM('info', 'warning', 'error', 'critical') NOT NULL,
    category VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    user_id INT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    additional_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_log_level (log_level),
    INDEX idx_category (category),
    INDEX idx_created_at (created_at),
    INDEX idx_user_id (user_id)
);

-- جدول إعدادات النظام
CREATE TABLE system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    setting_type ENUM('string', 'number', 'boolean', 'json', 'encrypted') DEFAULT 'string',
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_setting_key (setting_key),
    INDEX idx_is_public (is_public)
);

-- جدول النسخ الاحتياطية
CREATE TABLE system_backups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    backup_name VARCHAR(255) NOT NULL,
    backup_type ENUM('full', 'incremental', 'database', 'files') NOT NULL,
    file_path VARCHAR(500),
    file_size BIGINT,
    status ENUM('pending', 'in_progress', 'completed', 'failed') DEFAULT 'pending',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_backup_type (backup_type),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- جدول جلسات النظام
CREATE TABLE system_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_id VARCHAR(128) UNIQUE NOT NULL,
    user_id INT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_session_id (session_id),
    INDEX idx_user_id (user_id),
    INDEX idx_expires_at (expires_at),
    INDEX idx_is_admin (is_admin)
);

-- جدول محاولات تسجيل الدخول
CREATE TABLE login_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    success BOOLEAN DEFAULT FALSE,
    failure_reason VARCHAR(255),
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_ip_address (ip_address),
    INDEX idx_attempted_at (attempted_at),
    INDEX idx_success (success)
);

-- جدول ملفات النظام
CREATE TABLE system_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    file_hash VARCHAR(64),
    uploaded_by INT,
    is_public BOOLEAN DEFAULT FALSE,
    download_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_file_hash (file_hash),
    INDEX idx_uploaded_by (uploaded_by),
    INDEX idx_is_public (is_public),
    INDEX idx_created_at (created_at)
);

-- إدراج مستخدم إداري افتراضي
INSERT INTO users (name, email, password, company, role, status) VALUES 
('مدير النظام', 'admin@aibusiness.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'شركة الذكاء الاصطناعي', 'admin', 'active');

-- إدراج مستخدم تجريبي
INSERT INTO users (name, email, password, company, role, status) VALUES 
('أحمد محمد', 'ahmed@company.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'شركة التقنية المتقدمة', 'user', 'active'),
('فاطمة أحمد', 'fatima@company.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'شركة التقنية المتقدمة', 'moderator', 'active');

-- إدراج إعدادات افتراضية للمستخدمين
INSERT INTO user_settings (user_id, setting_key, setting_value) VALUES 
(1, 'theme', 'dark'),
(1, 'language', 'ar'),
(1, 'notifications_email', 'true'),
(1, 'notifications_push', 'false'),
(2, 'theme', 'dark'),
(2, 'language', 'ar'),
(2, 'notifications_email', 'true'),
(2, 'notifications_push', 'true'),
(3, 'theme', 'light'),
(3, 'language', 'ar'),
(3, 'notifications_email', 'false'),
(3, 'notifications_push', 'true');

-- إدراج إحصائيات النظام الافتراضية
INSERT INTO system_stats (stat_name, stat_value, stat_unit) VALUES 
('total_users', 3, 'count'),
('active_users', 3, 'count'),
('total_revenue', 0, 'USD'),
('system_health', 100, 'percentage'),
('storage_used', 0, 'percentage'),
('cpu_usage', 0, 'percentage'),
('memory_usage', 0, 'percentage'),
('api_requests_today', 0, 'count'),
('failed_logins_today', 0, 'count'),
('backup_size_total', 0, 'MB');

-- إدراج إعدادات النظام الافتراضية
INSERT INTO system_settings (setting_key, setting_value, setting_type, description, is_public) VALUES 
('site_name', 'منصة الذكاء الاصطناعي للأعمال', 'string', 'اسم الموقع', TRUE),
('site_description', 'منصة شاملة لإدارة الأعمال باستخدام الذكاء الاصطناعي', 'string', 'وصف الموقع', TRUE),
('maintenance_mode', 'false', 'boolean', 'وضع الصيانة', FALSE),
('max_login_attempts', '5', 'number', 'الحد الأقصى لمحاولات تسجيل الدخول', FALSE),
('session_timeout', '3600', 'number', 'انتهاء الجلسة بالثواني', FALSE),
('backup_retention_days', '30', 'number', 'عدد أيام الاحتفاظ بالنسخ الاحتياطية', FALSE),
('encryption_key', 'default_encryption_key_change_me', 'encrypted', 'مفتاح التشفير الرئيسي', FALSE),
('email_smtp_host', '', 'encrypted', 'خادم SMTP', FALSE),
('email_smtp_port', '587', 'number', 'منفذ SMTP', FALSE),
('email_smtp_username', '', 'encrypted', 'اسم مستخدم SMTP', FALSE),
('email_smtp_password', '', 'encrypted', 'كلمة مرور SMTP', FALSE),
('security_log_retention_days', '90', 'number', 'عدد أيام الاحتفاظ بسجلات الأمان', FALSE);

-- إدراج سجلات النظام الافتراضية
INSERT INTO system_logs (log_level, category, message, user_id, ip_address) VALUES 
('info', 'system', 'تم تشغيل النظام بنجاح', 1, '127.0.0.1'),
('info', 'user', 'تم إنشاء مستخدم إداري جديد', 1, '127.0.0.1'),
('info', 'database', 'تم إنشاء قاعدة البيانات بنجاح', 1, '127.0.0.1'),
('warning', 'security', 'تم تجاوز الحد الأقصى لمحاولات تسجيل الدخول', NULL, '192.168.1.100'),
('info', 'backup', 'تم إنشاء نسخة احتياطية تلقائية', 1, '127.0.0.1');

-- إنشاء فريق تجريبي
INSERT INTO teams (name, description, owner_id) VALUES 
('فريق التطوير', 'فريق تطوير منصة الذكاء الاصطناعي', 1);

-- إضافة أعضاء للفريق التجريبي
INSERT INTO team_members (team_id, user_id, role) VALUES 
(1, 1, 'admin'),
(1, 2, 'moderator'),
(1, 3, 'member');

-- إضافة دعوات تجريبية للفرق
INSERT INTO team_invitations (team_id, email, role, invitation_token, invited_by, expires_at) VALUES 
(1, 'newuser1@company.com', 'member', 'invite_token_123456789', 1, DATE_ADD(NOW(), INTERVAL 7 DAY)),
(1, 'newuser2@company.com', 'moderator', 'invite_token_987654321', 1, DATE_ADD(NOW(), INTERVAL 7 DAY)),
(2, 'marketing@company.com', 'member', 'invite_token_456789123', 4, DATE_ADD(NOW(), INTERVAL 7 DAY));

-- إضافة رموز فرق تجريبية
INSERT INTO team_tokens (team_id, token, name, description, permissions, created_by) VALUES 
(1, 'team_token_dev_123', 'رمز فريق التطوير', 'رمز مشترك لفريق التطوير', '{"read": true, "write": true, "admin": false}', 1),
(2, 'team_token_marketing_456', 'رمز فريق التسويق', 'رمز مشترك لفريق التسويق', '{"read": true, "write": false, "admin": false}', 4);

-- إنشاء إشعارات تجريبية
INSERT INTO notifications (user_id, title, message, type) VALUES 
(1, 'مرحباً بك في النظام', 'تم إنشاء حسابك بنجاح في منصة الذكاء الاصطناعي', 'success'),
(2, 'تم تعيينك كمشرف', 'تم تعيينك كمشرف في فريق التطوير', 'info'),
(3, 'مرحباً بك في الفريق', 'تم إضافتك لفريق التطوير كعضو', 'info');

-- إنشاء أنشطة تجريبية
INSERT INTO user_activities (user_id, activity_type, description) VALUES 
(1, 'login', 'تسجيل دخول ناجح'),
(1, 'profile_update', 'تحديث الملف الشخصي'),
(2, 'login', 'تسجيل دخول ناجح'),
(2, 'team_join', 'انضمام لفريق التطوير'),
(3, 'register', 'إنشاء حساب جديد'),
(3, 'team_join', 'انضمام لفريق التطوير');

-- إنشاء فهارس إضافية لتحسين الأداء
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_last_login ON users(last_login);
CREATE INDEX idx_team_members_role ON team_members(role);
CREATE INDEX idx_notifications_type ON notifications(type);
CREATE INDEX idx_user_activities_created_at ON user_activities(created_at);

-- إنشاء عرض للمستخدمين مع معلومات الفرق
CREATE VIEW user_team_view AS
SELECT 
    u.id,
    u.name,
    u.email,
    u.company,
    u.role,
    u.status,
    u.created_at,
    u.last_login,
    GROUP_CONCAT(DISTINCT t.name) as team_names,
    GROUP_CONCAT(DISTINCT tm.role) as team_roles
FROM users u
LEFT JOIN team_members tm ON u.id = tm.user_id
LEFT JOIN teams t ON tm.team_id = t.id
GROUP BY u.id;

-- إنشاء إجراء مخزن للحصول على إحصائيات المستخدمين
DELIMITER //
CREATE PROCEDURE GetUserStats()
BEGIN
    SELECT 
        COUNT(*) as total_users,
        COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
        COUNT(CASE WHEN role = 'admin' THEN 1 END) as admin_count,
        COUNT(CASE WHEN role = 'moderator' THEN 1 END) as moderator_count,
        COUNT(CASE WHEN role = 'user' THEN 1 END) as user_count,
        COUNT(CASE WHEN DATE(created_at) = CURDATE() THEN 1 END) as new_today,
        COUNT(CASE WHEN DATE(last_login) = CURDATE() THEN 1 END) as login_today
    FROM users;
END //
DELIMITER ;

-- إنشاء إجراء مخزن لتنظيف الرموز المنتهية الصلاحية
DELIMITER //
CREATE PROCEDURE CleanExpiredTokens()
BEGIN
    DELETE FROM user_tokens WHERE expires_at < NOW();
    DELETE FROM user_sessions WHERE expires_at < NOW();
END //
DELIMITER ;

-- إنشاء حدث لتنظيف الرموز المنتهية الصلاحية كل ساعة
CREATE EVENT IF NOT EXISTS clean_expired_tokens
ON SCHEDULE EVERY 1 HOUR
DO CALL CleanExpiredTokens();

-- تفعيل جدول الأحداث
SET GLOBAL event_scheduler = ON;

-- إنشاء مستخدم قاعدة البيانات للAPI
CREATE USER IF NOT EXISTS 'api_user'@'localhost' IDENTIFIED BY 'api_password_123';
GRANT SELECT, INSERT, UPDATE, DELETE ON ai_business_platform.* TO 'api_user'@'localhost';
FLUSH PRIVILEGES;

-- عرض رسالة نجاح
SELECT 'تم إنشاء قاعدة البيانات والجداول بنجاح!' as message;
