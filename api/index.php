<?php
// config.php - إعدادات قاعدة البيانات والتطبيق
define('DB_HOST', 'localhost');
define('DB_NAME', 'ai_business_platform');
define('DB_USER', 'root');
define('DB_PASS', '');
define('JWT_SECRET', 'your-secret-key-here');
define('API_VERSION', 'v1');

// إعدادات CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=utf-8');

// التعامل مع طلبات OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// فئة الاتصال بقاعدة البيانات
class Database {
    private $connection;
    
    public function __construct() {
        try {
            $this->connection = new PDO(
                "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
                DB_USER,
                DB_PASS,
                [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]
            );
        } catch (PDOException $e) {
            $this->sendError('خطأ في الاتصال بقاعدة البيانات: ' . $e->getMessage(), 500);
        }
    }
    
    public function getConnection() {
        return $this->connection;
    }
    
    private function sendError($message, $code = 400) {
        http_response_code($code);
        echo json_encode(['error' => $message, 'success' => false]);
        exit();
    }
}

// فئة المصادقة
class Auth {
    private $db;
    
    public function __construct($database) {
        $this->db = $database->getConnection();
    }
    
    // تسجيل مستخدم جديد
    public function register($data) {
        try {
            // التحقق من البيانات المطلوبة
            $required_fields = ['name', 'email', 'password', 'company'];
            foreach ($required_fields as $field) {
                if (empty($data[$field])) {
                    throw new Exception("حقل {$field} مطلوب");
                }
            }
            
            // التحقق من صحة البريد الإلكتروني
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                throw new Exception("البريد الإلكتروني غير صحيح");
            }
            
            // التحقق من وجود المستخدم
            $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$data['email']]);
            if ($stmt->fetch()) {
                throw new Exception("البريد الإلكتروني مستخدم بالفعل");
            }
            
            // تشفير كلمة المرور
            $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);
            
            // إدراج المستخدم الجديد
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
            
            // إنشاء رمز المصادقة
            $token = $this->generateToken($user_id);
            
            return [
                'success' => true,
                'message' => 'تم إنشاء الحساب بنجاح',
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
    
    // تسجيل الدخول
    public function login($email, $password) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ? AND status = 'active'");
            $stmt->execute([$email]);
            $user = $stmt->fetch();
            
            if (!$user || !password_verify($password, $user['password'])) {
                throw new Exception("البريد الإلكتروني أو كلمة المرور غير صحيحة");
            }
            
            // تحديث آخر تسجيل دخول
            $stmt = $this->db->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
            $stmt->execute([$user['id']]);
            
            // إنشاء رمز المصادقة
            $token = $this->generateToken($user['id']);
            
            return [
                'success' => true,
                'message' => 'تم تسجيل الدخول بنجاح',
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
    
    // التحقق من صحة الرمز
    public function verifyToken($token) {
        try {
            $stmt = $this->db->prepare("SELECT u.* FROM users u JOIN user_tokens t ON u.id = t.user_id WHERE t.token = ? AND t.expires_at > NOW() AND u.status = 'active'");
            $stmt->execute([$token]);
            $user = $stmt->fetch();
            
            if (!$user) {
                throw new Exception("رمز المصادقة غير صحيح أو منتهي الصلاحية");
            }
            
            return $user;
            
        } catch (Exception $e) {
            return false;
        }
    }
    
    // إنشاء رمز مصادقة
    private function generateToken($user_id) {
        $token = bin2hex(random_bytes(32));
        $expires_at = date('Y-m-d H:i:s', strtotime('+7 days'));
        
        $stmt = $this->db->prepare("INSERT INTO user_tokens (user_id, token, expires_at) VALUES (?, ?, ?)");
        $stmt->execute([$user_id, $token, $expires_at]);
        
        return $token;
    }
    
    // تسجيل الخروج
    public function logout($token) {
        try {
            $stmt = $this->db->prepare("DELETE FROM user_tokens WHERE token = ?");
            $stmt->execute([$token]);
            
            return ['success' => true, 'message' => 'تم تسجيل الخروج بنجاح'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}

// فئة إدارة المستخدمين
class UserManager {
    private $db;
    
    public function __construct($database) {
        $this->db = $database->getConnection();
    }
    
    // الحصول على جميع المستخدمين
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
            
            // الحصول على العدد الإجمالي
            $count_sql = "SELECT COUNT(*) as total FROM users {$where_clause}";
            $count_stmt = $this->db->prepare($count_sql);
            $count_stmt->execute($params);
            $total = $count_stmt->fetch()['total'];
            
            // الحصول على المستخدمين
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
    
    // تحديث مستخدم
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
                throw new Exception("لا توجد بيانات للتحديث");
            }
            
            $params[] = $user_id;
            $sql = "UPDATE users SET " . implode(', ', $update_fields) . " WHERE id = ?";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            
            return ['success' => true, 'message' => 'تم تحديث المستخدم بنجاح'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // حذف مستخدم
    public function deleteUser($user_id) {
        try {
            $stmt = $this->db->prepare("DELETE FROM users WHERE id = ?");
            $stmt->execute([$user_id]);
            
            if ($stmt->rowCount() === 0) {
                throw new Exception("المستخدم غير موجود");
            }
            
            return ['success' => true, 'message' => 'تم حذف المستخدم بنجاح'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}

// فئة التشفير
class Encryption {
    private $encryption_key;
    
    public function __construct() {
        $this->encryption_key = $this->getEncryptionKey();
    }
    
    private function getEncryptionKey() {
        // في التطبيق الحقيقي، يجب تخزين المفتاح في مكان آمن
        return 'your-32-character-secret-key-here!';
    }
    
    public function encrypt($data) {
        $iv = openssl_random_pseudo_bytes(16);
        $encrypted = openssl_encrypt($data, 'AES-256-CBC', $this->encryption_key, 0, $iv);
        return base64_encode($iv . $encrypted);
    }
    
    public function decrypt($encrypted_data) {
        $data = base64_decode($encrypted_data);
        $iv = substr($data, 0, 16);
        $encrypted = substr($data, 16);
        return openssl_decrypt($encrypted, 'AES-256-CBC', $this->encryption_key, 0, $iv);
    }
}

// فئة إدارة النظام
class SystemManager {
    private $db;
    private $encryption;
    
    public function __construct($database) {
        $this->db = $database->getConnection();
        $this->encryption = new Encryption();
    }
    
    // الحصول على إحصائيات النظام
    public function getSystemStats() {
        try {
            $stats = [];
            
            // إحصائيات المستخدمين
            $stmt = $this->db->prepare("SELECT COUNT(*) as total FROM users");
            $stmt->execute();
            $stats['total_users'] = $stmt->fetch()['total'];
            
            $stmt = $this->db->prepare("SELECT COUNT(*) as active FROM users WHERE status = 'active'");
            $stmt->execute();
            $stats['active_users'] = $stmt->fetch()['active'];
            
            // إحصائيات النظام
            $stmt = $this->db->prepare("
                SELECT stat_name, stat_value 
                FROM system_stats 
                WHERE recorded_at >= DATE_SUB(NOW(), INTERVAL 1 DAY)
                ORDER BY recorded_at DESC
            ");
            $stmt->execute();
            $system_stats = $stmt->fetchAll();
            
            foreach ($system_stats as $stat) {
                $stats[$stat['stat_name']] = $stat['stat_value'];
            }
            
            // إحصائيات إضافية
            $stats['system_health'] = $this->calculateSystemHealth();
            $stats['storage_used'] = $this->getStorageUsage();
            $stats['cpu_usage'] = $this->getCpuUsage();
            $stats['memory_usage'] = $this->getMemoryUsage();
            
            return ['success' => true, 'stats' => $stats];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // الحصول على سجلات النظام
    public function getSystemLogs($limit = 100, $level = 'all') {
        try {
            $where_clause = '';
            $params = [];
            
            if ($level !== 'all') {
                $where_clause = 'WHERE log_level = ?';
                $params[] = $level;
            }
            
            $stmt = $this->db->prepare("
                SELECT * FROM system_logs 
                {$where_clause}
                ORDER BY created_at DESC 
                LIMIT ?
            ");
            $params[] = $limit;
            $stmt->execute($params);
            $logs = $stmt->fetchAll();
            
            return ['success' => true, 'logs' => $logs];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // الحصول على إعدادات النظام
    public function getSystemSettings() {
        try {
            $stmt = $this->db->prepare("SELECT * FROM system_settings ORDER BY setting_key");
            $stmt->execute();
            $settings = $stmt->fetchAll();
            
            // فك تشفير البيانات المشفرة
            foreach ($settings as &$setting) {
                if ($setting['setting_type'] === 'encrypted' && !empty($setting['setting_value'])) {
                    $setting['setting_value'] = $this->encryption->decrypt($setting['setting_value']);
                }
            }
            
            return ['success' => true, 'settings' => $settings];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // تحديث إعداد النظام
    public function updateSystemSetting($setting_key, $setting_value, $user_id) {
        try {
            // الحصول على نوع الإعداد
            $stmt = $this->db->prepare("SELECT setting_type FROM system_settings WHERE setting_key = ?");
            $stmt->execute([$setting_key]);
            $setting = $stmt->fetch();
            
            if (!$setting) {
                throw new Exception("الإعداد غير موجود");
            }
            
            // تشفير البيانات إذا كانت من نوع encrypted
            if ($setting['setting_type'] === 'encrypted') {
                $setting_value = $this->encryption->encrypt($setting_value);
            }
            
            // تحديث الإعداد
            $stmt = $this->db->prepare("
                UPDATE system_settings 
                SET setting_value = ?, updated_by = ?, updated_at = NOW() 
                WHERE setting_key = ?
            ");
            $stmt->execute([$setting_value, $user_id, $setting_key]);
            
            // تسجيل التغيير
            $this->logSystemEvent('info', 'settings', "تم تحديث الإعداد: {$setting_key}", $user_id);
            
            return ['success' => true, 'message' => 'تم تحديث الإعداد بنجاح'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // الحصول على الجلسات النشطة
    public function getActiveSessions() {
        try {
            $stmt = $this->db->prepare("
                SELECT * FROM system_sessions 
                WHERE expires_at > NOW() 
                ORDER BY last_activity DESC
            ");
            $stmt->execute();
            $sessions = $stmt->fetchAll();
            
            return ['success' => true, 'sessions' => $sessions];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // إنهاء جلسة
    public function terminateSession($session_id, $user_id) {
        try {
            $stmt = $this->db->prepare("DELETE FROM system_sessions WHERE id = ?");
            $stmt->execute([$session_id]);
            
            $this->logSystemEvent('info', 'security', "تم إنهاء الجلسة: {$session_id}", $user_id);
            
            return ['success' => true, 'message' => 'تم إنهاء الجلسة بنجاح'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // إنشاء نسخة احتياطية
    public function createBackup($user_id) {
        try {
            $backup_name = 'backup_' . date('Y-m-d_H-i-s');
            $backup_path = '../backups/' . $backup_name . '.sql';
            
            // إنشاء مجلد النسخ الاحتياطية إذا لم يكن موجوداً
            if (!is_dir('../backups')) {
                mkdir('../backups', 0755, true);
            }
            
            // تسجيل بداية النسخة الاحتياطية
            $stmt = $this->db->prepare("
                INSERT INTO system_backups (backup_name, backup_type, status, created_by) 
                VALUES (?, 'full', 'in_progress', ?)
            ");
            $stmt->execute([$backup_name, $user_id]);
            $backup_id = $this->db->lastInsertId();
            
            // إنشاء النسخة الاحتياطية (في التطبيق الحقيقي، استخدم mysqldump)
            $this->logSystemEvent('info', 'backup', "تم بدء إنشاء النسخة الاحتياطية: {$backup_name}", $user_id);
            
            // محاكاة إنشاء النسخة الاحتياطية
            sleep(2);
            
            // تحديث حالة النسخة الاحتياطية
            $stmt = $this->db->prepare("
                UPDATE system_backups 
                SET status = 'completed', file_path = ?, file_size = 1024000, completed_at = NOW() 
                WHERE id = ?
            ");
            $stmt->execute([$backup_path, $backup_id]);
            
            $this->logSystemEvent('info', 'backup', "تم إنشاء النسخة الاحتياطية بنجاح: {$backup_name}", $user_id);
            
            return ['success' => true, 'message' => 'تم إنشاء النسخة الاحتياطية بنجاح'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // تسجيل حدث في النظام
    public function logSystemEvent($level, $category, $message, $user_id = null, $ip_address = null, $user_agent = null) {
        try {
            if (!$ip_address) {
                $ip_address = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
            }
            if (!$user_agent) {
                $user_agent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
            }
            
            $stmt = $this->db->prepare("
                INSERT INTO system_logs (log_level, category, message, user_id, ip_address, user_agent) 
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            $stmt->execute([$level, $category, $message, $user_id, $ip_address, $user_agent]);
            
        } catch (Exception $e) {
            // لا نريد أن يفشل التطبيق بسبب خطأ في التسجيل
            error_log("Failed to log system event: " . $e->getMessage());
        }
    }
    
    // حساب صحة النظام
    private function calculateSystemHealth() {
        $health = 100;
        
        // فحص قاعدة البيانات
        try {
            $stmt = $this->db->prepare("SELECT 1");
            $stmt->execute();
        } catch (Exception $e) {
            $health -= 30;
        }
        
        // فحص استخدام التخزين
        $storage_usage = $this->getStorageUsage();
        if ($storage_usage > 90) {
            $health -= 20;
        } elseif ($storage_usage > 80) {
            $health -= 10;
        }
        
        // فحص استخدام المعالج
        $cpu_usage = $this->getCpuUsage();
        if ($cpu_usage > 90) {
            $health -= 20;
        } elseif ($cpu_usage > 80) {
            $health -= 10;
        }
        
        return max(0, $health);
    }
    
    // الحصول على استخدام التخزين
    private function getStorageUsage() {
        // في التطبيق الحقيقي، استخدم disk_free_space و disk_total_space
        return rand(20, 80);
    }
    
    // الحصول على استخدام المعالج
    private function getCpuUsage() {
        // في التطبيق الحقيقي، استخدم sys_getloadavg أو exec
        return rand(10, 60);
    }
    
    // الحصول على استخدام الذاكرة
    private function getMemoryUsage() {
        // في التطبيق الحقيقي، استخدم memory_get_usage
        return rand(30, 70);
    }
}

// فئة إدارة الفرق
class TeamManager {
    private $db;
    
    public function __construct($database) {
        $this->db = $database->getConnection();
    }
    
    // إنشاء فريق جديد
    public function createTeam($data) {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO teams (name, description, owner_id, created_at) 
                VALUES (?, ?, ?, NOW())
            ");
            
            $stmt->execute([
                $data['name'],
                $data['description'],
                $data['owner_id']
            ]);
            
            $team_id = $this->db->lastInsertId();
            
            // إضافة المالك كعضو في الفريق
            $this->addTeamMember($team_id, $data['owner_id'], 'admin');
            
            return [
                'success' => true,
                'message' => 'تم إنشاء الفريق بنجاح',
                'team_id' => $team_id
            ];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // إضافة عضو للفريق
    public function addTeamMember($team_id, $user_id, $role = 'member') {
        try {
            $stmt = $this->db->prepare("
                INSERT INTO team_members (team_id, user_id, role, joined_at) 
                VALUES (?, ?, ?, NOW())
            ");
            
            $stmt->execute([$team_id, $user_id, $role]);
            
            return ['success' => true, 'message' => 'تم إضافة العضو للفريق بنجاح'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // إزالة عضو من الفريق
    public function removeTeamMember($team_id, $user_id) {
        try {
            $stmt = $this->db->prepare("DELETE FROM team_members WHERE team_id = ? AND user_id = ?");
            $stmt->execute([$team_id, $user_id]);
            
            return ['success' => true, 'message' => 'تم إزالة العضو من الفريق بنجاح'];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // إرسال دعوة للفريق
    public function inviteToTeam($team_id, $email, $role, $invited_by) {
        try {
            // التحقق من وجود الدعوة السابقة
            $stmt = $this->db->prepare("SELECT id FROM team_invitations WHERE team_id = ? AND email = ? AND status = 'pending'");
            $stmt->execute([$team_id, $email]);
            if ($stmt->fetch()) {
                throw new Exception("تم إرسال دعوة لهذا البريد الإلكتروني مسبقاً");
            }
            
            // التحقق من أن المستخدم ليس عضواً بالفعل
            $stmt = $this->db->prepare("SELECT u.id FROM users u JOIN team_members tm ON u.id = tm.user_id WHERE u.email = ? AND tm.team_id = ?");
            $stmt->execute([$email, $team_id]);
            if ($stmt->fetch()) {
                throw new Exception("هذا المستخدم عضو في الفريق بالفعل");
            }
            
            // إنشاء رمز الدعوة
            $invitation_token = bin2hex(random_bytes(32));
            $expires_at = date('Y-m-d H:i:s', strtotime('+7 days'));
            
            // إدراج الدعوة
            $stmt = $this->db->prepare("
                INSERT INTO team_invitations (team_id, email, role, invitation_token, invited_by, expires_at) 
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([$team_id, $email, $role, $invitation_token, $invited_by, $expires_at]);
            
            return [
                'success' => true,
                'message' => 'تم إرسال الدعوة بنجاح',
                'invitation_token' => $invitation_token,
                'expires_at' => $expires_at
            ];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // قبول الدعوة وإنشاء حساب
    public function acceptInvitation($invitation_token, $user_data) {
        try {
            // التحقق من صحة الدعوة
            $stmt = $this->db->prepare("
                SELECT ti.*, t.name as team_name 
                FROM team_invitations ti 
                JOIN teams t ON ti.team_id = t.id 
                WHERE ti.invitation_token = ? AND ti.status = 'pending' AND ti.expires_at > NOW()
            ");
            $stmt->execute([$invitation_token]);
            $invitation = $stmt->fetch();
            
            if (!$invitation) {
                throw new Exception("الدعوة غير صحيحة أو منتهية الصلاحية");
            }
            
            // التحقق من وجود المستخدم
            $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$invitation['email']]);
            $existing_user = $stmt->fetch();
            
            $user_id = null;
            
            if ($existing_user) {
                // المستخدم موجود، إضافته للفريق
                $user_id = $existing_user['id'];
            } else {
                // إنشاء مستخدم جديد
                $hashed_password = password_hash($user_data['password'], PASSWORD_DEFAULT);
                
                $stmt = $this->db->prepare("
                    INSERT INTO users (name, email, password, company, role, status, created_at) 
                    VALUES (?, ?, ?, ?, 'user', 'active', NOW())
                ");
                
                $stmt->execute([
                    $user_data['name'],
                    $invitation['email'],
                    $hashed_password,
                    $user_data['company'] ?? ''
                ]);
                
                $user_id = $this->db->lastInsertId();
            }
            
            // إضافة المستخدم للفريق
            $stmt = $this->db->prepare("
                INSERT INTO team_members (team_id, user_id, role) 
                VALUES (?, ?, ?)
            ");
            $stmt->execute([$invitation['team_id'], $user_id, $invitation['role']]);
            
            // تحديث حالة الدعوة
            $stmt = $this->db->prepare("
                UPDATE team_invitations 
                SET status = 'accepted', accepted_at = NOW() 
                WHERE invitation_token = ?
            ");
            $stmt->execute([$invitation_token]);
            
            // إنشاء رمز مصادقة
            $auth = new Auth($this->db);
            $token = $this->generateTeamToken($invitation['team_id'], $user_id);
            
            return [
                'success' => true,
                'message' => 'تم قبول الدعوة بنجاح',
                'team_name' => $invitation['team_name'],
                'user_id' => $user_id,
                'team_token' => $token
            ];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // إنشاء رمز فريق مشترك
    private function generateTeamToken($team_id, $user_id) {
        $token = bin2hex(random_bytes(32));
        
        $stmt = $this->db->prepare("
            INSERT INTO team_tokens (team_id, token, name, description, permissions, created_by) 
            VALUES (?, ?, 'رمز الفريق المشترك', 'رمز مشترك للوصول لبيانات الفريق', '{\"read\": true, \"write\": true}', ?)
        ");
        $stmt->execute([$team_id, $token, $user_id]);
        
        return $token;
    }
    
    // الحصول على بيانات الفريق بالرمز المشترك
    public function getTeamByToken($team_token) {
        try {
            $stmt = $this->db->prepare("
                SELECT t.*, tt.permissions 
                FROM teams t 
                JOIN team_tokens tt ON t.id = tt.team_id 
                WHERE tt.token = ? AND tt.is_active = TRUE AND (tt.expires_at IS NULL OR tt.expires_at > NOW())
            ");
            $stmt->execute([$team_token]);
            $team = $stmt->fetch();
            
            if (!$team) {
                throw new Exception("رمز الفريق غير صحيح أو منتهي الصلاحية");
            }
            
            // الحصول على أعضاء الفريق
            $stmt = $this->db->prepare("
                SELECT u.id, u.name, u.email, u.company, tm.role, tm.joined_at 
                FROM team_members tm 
                JOIN users u ON tm.user_id = u.id 
                WHERE tm.team_id = ?
            ");
            $stmt->execute([$team['id']]);
            $members = $stmt->fetchAll();
            
            $team['members'] = $members;
            
            return [
                'success' => true,
                'team' => $team
            ];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // الحصول على دعوات الفريق
    public function getTeamInvitations($team_id) {
        try {
            $stmt = $this->db->prepare("
                SELECT ti.*, u.name as invited_by_name 
                FROM team_invitations ti 
                JOIN users u ON ti.invited_by = u.id 
                WHERE ti.team_id = ? 
                ORDER BY ti.created_at DESC
            ");
            $stmt->execute([$team_id]);
            $invitations = $stmt->fetchAll();
            
            return [
                'success' => true,
                'invitations' => $invitations
            ];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
    
    // الحصول على معلومات الدعوة
    public function getInvitationInfo($invitation_token) {
        try {
            $stmt = $this->db->prepare("
                SELECT ti.*, t.name as team_name, t.description as team_description, u.name as invited_by_name 
                FROM team_invitations ti 
                JOIN teams t ON ti.team_id = t.id 
                JOIN users u ON ti.invited_by = u.id 
                WHERE ti.invitation_token = ? AND ti.status = 'pending' AND ti.expires_at > NOW()
            ");
            $stmt->execute([$invitation_token]);
            $invitation = $stmt->fetch();
            
            if (!$invitation) {
                throw new Exception("الدعوة غير صحيحة أو منتهية الصلاحية");
            }
            
            return [
                'success' => true,
                'invitation' => $invitation
            ];
            
        } catch (Exception $e) {
            return ['success' => false, 'error' => $e->getMessage()];
        }
    }
}

// معالج الطلبات الرئيسي
class APIHandler {
    private $db;
    private $auth;
    private $userManager;
    private $teamManager;
    private $systemManager;
    
    public function __construct() {
        $this->db = new Database();
        $this->auth = new Auth($this->db);
        $this->userManager = new UserManager($this->db);
        $this->teamManager = new TeamManager($this->db);
        $this->systemManager = new SystemManager($this->db);
    }
    
    public function handleRequest() {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $path_parts = explode('/', trim($path, '/'));
        
        // تجاهل المجلدات الأساسية
        if (count($path_parts) >= 2 && $path_parts[0] === 'api') {
            $endpoint = $path_parts[1];
            $action = $path_parts[2] ?? '';
            
            switch ($endpoint) {
                case 'auth':
                    $this->handleAuth($method, $action);
                    break;
                case 'users':
                    $this->handleUsers($method, $action);
                    break;
                case 'teams':
                    $this->handleTeams($method, $action);
                    break;
                case 'admin':
                    $this->handleAdmin($method, $action);
                    break;
                default:
                    $this->sendError('نقطة النهاية غير موجودة', 404);
            }
        } else {
            $this->sendError('مسار غير صحيح', 404);
        }
    }
    
    private function handleAuth($method, $action) {
        switch ($action) {
            case 'register':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    $result = $this->auth->register($data);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'login':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    $result = $this->auth->login($data['email'], $data['password']);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'logout':
                if ($method === 'POST') {
                    $headers = getallheaders();
                    $token = $headers['Authorization'] ?? '';
                    $token = str_replace('Bearer ', '', $token);
                    
                    $result = $this->auth->logout($token);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            default:
                $this->sendError('عملية غير مدعومة', 404);
        }
    }
    
    private function handleUsers($method, $action) {
        // التحقق من المصادقة
        $user = $this->authenticateUser();
        if (!$user) {
            $this->sendError('غير مصرح', 401);
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
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'update':
                if ($method === 'PUT') {
                    $user_id = $_GET['id'] ?? '';
                    $data = json_decode(file_get_contents('php://input'), true);
                    
                    $result = $this->userManager->updateUser($user_id, $data);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'delete':
                if ($method === 'DELETE') {
                    $user_id = $_GET['id'] ?? '';
                    
                    $result = $this->userManager->deleteUser($user_id);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            default:
                $this->sendError('عملية غير مدعومة', 404);
        }
    }
    
    private function handleTeams($method, $action) {
        // التحقق من المصادقة
        $user = $this->authenticateUser();
        if (!$user) {
            $this->sendError('غير مصرح', 401);
            return;
        }
        
        switch ($action) {
            case 'create':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    $data['owner_id'] = $user['id'];
                    
                    $result = $this->teamManager->createTeam($data);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'add-member':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    
                    $result = $this->teamManager->addTeamMember($data['team_id'], $data['user_id'], $data['role'] ?? 'member');
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'remove-member':
                if ($method === 'DELETE') {
                    $team_id = $_GET['team_id'] ?? '';
                    $user_id = $_GET['user_id'] ?? '';
                    
                    $result = $this->teamManager->removeTeamMember($team_id, $user_id);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'invite':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    
                    $result = $this->teamManager->inviteToTeam($data['team_id'], $data['email'], $data['role'], $user['id']);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'invitations':
                if ($method === 'GET') {
                    $team_id = $_GET['team_id'] ?? '';
                    
                    $result = $this->teamManager->getTeamInvitations($team_id);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'accept-invitation':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    
                    $result = $this->teamManager->acceptInvitation($data['invitation_token'], $data);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'team-by-token':
                if ($method === 'GET') {
                    $team_token = $_GET['token'] ?? '';
                    
                    $result = $this->teamManager->getTeamByToken($team_token);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'invitation-info':
                if ($method === 'GET') {
                    $invitation_token = $_GET['token'] ?? '';
                    
                    $result = $this->teamManager->getInvitationInfo($invitation_token);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            default:
                $this->sendError('عملية غير مدعومة', 404);
        }
    }
    
    private function handleAdmin($method, $action) {
        // التحقق من المصادقة والصلاحيات
        $user = $this->authenticateUser();
        if (!$user) {
            $this->sendError('غير مصرح', 401);
            return;
        }
        
        // التحقق من أن المستخدم مدير
        if ($user['role'] !== 'admin') {
            $this->sendError('غير مصرح - صلاحيات إدارية مطلوبة', 403);
            return;
        }
        
        switch ($action) {
            case 'system-stats':
                if ($method === 'GET') {
                    $result = $this->systemManager->getSystemStats();
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'system-logs':
                if ($method === 'GET') {
                    $limit = $_GET['limit'] ?? 100;
                    $level = $_GET['level'] ?? 'all';
                    $result = $this->systemManager->getSystemLogs($limit, $level);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'system-settings':
                if ($method === 'GET') {
                    $result = $this->systemManager->getSystemSettings();
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'update-setting':
                if ($method === 'POST') {
                    $data = json_decode(file_get_contents('php://input'), true);
                    $result = $this->systemManager->updateSystemSetting(
                        $data['setting_key'], 
                        $data['setting_value'], 
                        $user['id']
                    );
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'user-sessions':
                if ($method === 'GET') {
                    $result = $this->systemManager->getActiveSessions();
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'terminate-session':
                if ($method === 'DELETE') {
                    $session_id = $_GET['session_id'] ?? '';
                    $result = $this->systemManager->terminateSession($session_id, $user['id']);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            case 'create-backup':
                if ($method === 'POST') {
                    $result = $this->systemManager->createBackup($user['id']);
                    echo json_encode($result);
                } else {
                    $this->sendError('طريقة غير مدعومة', 405);
                }
                break;
                
            default:
                $this->sendError('عملية غير مدعومة', 404);
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

// تشغيل المعالج
$api = new APIHandler();
$api->handleRequest();
?>
