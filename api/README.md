# API Backend Setup Guide

## 🚀 Quick Setup

### 1. **Database Setup**
```bash
# Run the setup script
php api/setup.php
```

### 2. **Manual Database Setup**
```sql
-- Create database
CREATE DATABASE ai_business_platform;

-- Import schema
mysql -u root -p ai_business_platform < database/schema.sql
```

### 3. **Configuration**
Update `api/config/database.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'ai_business_platform');
define('DB_USER', 'root');
define('DB_PASS', '');
define('JWT_SECRET', 'your-secret-key-here');
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users
- `PUT /api/users/update?id={id}` - Update user
- `DELETE /api/users/delete?id={id}` - Delete user

### Teams
- `POST /api/teams/create` - Create team
- `POST /api/teams/add-member` - Add team member
- `DELETE /api/teams/remove-member` - Remove team member
- `POST /api/teams/invite` - Invite to team
- `POST /api/teams/accept-invitation` - Accept invitation

### Permissions
- `GET /api/permissions/list` - Get all permissions
- `POST /api/permissions/create` - Create permission
- `POST /api/permissions/add-user-permission` - Add user permission
- `DELETE /api/permissions/remove-user-permission` - Remove user permission
- `GET /api/permissions/user-permissions` - Get user permissions

### Health
- `GET /api/health` - API health check

## 🛠️ Troubleshooting

### Common Issues

#### 1. **Database Connection Error**
```bash
# Check if MySQL is running
sudo service mysql start

# Check database exists
mysql -u root -p -e "SHOW DATABASES;"
```

#### 2. **Permission Denied**
```bash
# Fix file permissions
chmod 755 api/
chmod 644 api/*.php
chmod 644 api/.htaccess
```

#### 3. **CORS Issues**
- Check `.htaccess` file exists
- Verify CORS headers in `index.php`
- Test with browser dev tools

#### 4. **API Not Responding**
```bash
# Test API directly
curl -X GET http://localhost/api/health

# Check error logs
tail -f /var/log/apache2/error.log
```

## 🔍 Testing

### 1. **Health Check**
```bash
curl -X GET http://localhost/api/health
```

### 2. **Register User**
```bash
curl -X POST http://localhost/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "company": "Test Company"
  }'
```

### 3. **Login**
```bash
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 📁 File Structure

```
api/
├── .htaccess              # URL rewriting
├── index.php              # Main API handler
├── setup.php              # Database setup script
├── config/
│   └── database.php       # Database configuration
├── classes/
│   ├── Database.php       # Database connection
│   ├── Auth.php           # Authentication
│   ├── UserManager.php    # User management
│   ├── PermissionManager.php # Permission management
│   └── TeamManager.php    # Team management
└── database/
    └── schema.sql         # Database schema
```

## 🔐 Security

### 1. **Environment Variables**
Create `.env` file:
```
DB_HOST=localhost
DB_NAME=ai_business_platform
DB_USER=root
DB_PASS=your_password
JWT_SECRET=your_secret_key
```

### 2. **HTTPS Setup**
```apache
# In .htaccess
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### 3. **Rate Limiting**
```php
// Add to index.php
$rate_limit = 100; // requests per minute
// Implement rate limiting logic
```

## 🚀 Production Deployment

### 1. **Server Requirements**
- PHP 7.4+
- MySQL 5.7+
- Apache/Nginx
- SSL Certificate

### 2. **Performance Optimization**
```php
// Enable OPcache
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=4000
```

### 3. **Monitoring**
- Set up error logging
- Monitor API response times
- Track database performance

## 📊 Default Admin Account

After setup, you can login with:
- **Email**: admin@aibusiness.com
- **Password**: admin123
- **Role**: super_admin

## 🔄 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": 400,
  "timestamp": "2024-01-15 10:30:00"
}
```

## 🎯 Next Steps

1. Run `php api/setup.php` to initialize database
2. Test API endpoints with curl or Postman
3. Update frontend API configuration
4. Set up production environment
5. Configure SSL and security settings

The API is now ready for use! 🎉
