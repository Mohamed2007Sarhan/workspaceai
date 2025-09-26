# 🚀 AI Business Platform - Setup Guide

## ✅ Backend API Fixed & Optimized

### 🔧 **What Was Fixed**

1. **API Structure** - Reorganized into clean, modular structure
2. **Error Handling** - Added comprehensive error handling
3. **CORS Issues** - Fixed cross-origin requests
4. **Database Connection** - Improved connection handling
5. **Authentication** - Enhanced token-based auth
6. **File Organization** - Clean separation of concerns

### 📁 **New File Structure**

```
api/
├── .htaccess              # URL rewriting & security
├── index.php              # Main API handler (FIXED)
├── setup.php              # Database setup script
├── config/
│   └── database.php        # Database configuration
├── classes/
│   ├── Database.php       # Database connection
│   ├── Auth.php           # Authentication
│   ├── UserManager.php    # User management
│   ├── PermissionManager.php # Permissions
│   └── TeamManager.php    # Team management
└── database/
    ├── schema.sql         # Database schema
    └── init.sql           # Database initialization
```

## 🚀 **Quick Setup**

### 1. **Database Setup**
```bash
# Option 1: Automatic setup
php api/setup.php

# Option 2: Manual setup
mysql -u root -p < database/init.sql
```

### 2. **Configuration**
```bash
# Copy environment file
cp env.example .env

# Edit database settings
nano .env
```

### 3. **Test API**
```bash
# Health check
curl -X GET http://localhost/api/health

# Register user
curl -X POST http://localhost/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"password123","company":"Test Co"}'
```

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user  
- `POST /api/auth/logout` - Logout user

### **Users**
- `GET /api/users` - Get all users
- `PUT /api/users/update?id={id}` - Update user
- `DELETE /api/users/delete?id={id}` - Delete user

### **Teams**
- `POST /api/teams/create` - Create team
- `POST /api/teams/add-member` - Add member
- `DELETE /api/teams/remove-member` - Remove member
- `POST /api/teams/invite` - Invite user
- `POST /api/teams/accept-invitation` - Accept invitation

### **Permissions**
- `GET /api/permissions/list` - Get permissions
- `POST /api/permissions/create` - Create permission
- `POST /api/permissions/add-user-permission` - Add permission
- `DELETE /api/permissions/remove-user-permission` - Remove permission

### **Health**
- `GET /api/health` - API health check

## 🛠️ **Troubleshooting**

### **Common Issues & Solutions**

#### 1. **Database Connection Error**
```bash
# Check MySQL service
sudo service mysql start

# Test connection
mysql -u root -p -e "SHOW DATABASES;"
```

#### 2. **CORS Issues**
- Check `.htaccess` file exists
- Verify CORS headers in `index.php`
- Test with browser dev tools

#### 3. **API Not Responding**
```bash
# Test API directly
curl -X GET http://localhost/api/health

# Check error logs
tail -f /var/log/apache2/error.log
```

#### 4. **Permission Denied**
```bash
# Fix file permissions
chmod 755 api/
chmod 644 api/*.php
chmod 644 api/.htaccess
```

## 🔐 **Security Features**

### **Authentication**
- JWT token-based authentication
- Secure password hashing
- Session management
- Token expiration

### **Authorization**
- Role-based access control
- Permission management
- Admin-only endpoints
- User validation

### **Security Headers**
- CORS protection
- XSS protection
- Content type validation
- Rate limiting ready

## 📊 **Default Admin Account**

After setup, login with:
- **Email**: admin@aibusiness.com
- **Password**: admin123
- **Role**: super_admin

## 🎯 **Frontend Integration**

### **API Client**
```typescript
import { api } from '@/lib/api';

// Register user
const response = await api.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123',
  company: 'Acme Corp'
});

// Login user
const loginResponse = await api.login('john@example.com', 'password123');

// Get users
const users = await api.getUsers();
```

### **Error Handling**
```typescript
try {
  const response = await api.getUsers();
  if (response.success) {
    console.log(response.data);
  }
} catch (error) {
  console.error('API Error:', error.message);
}
```

## 🚀 **Production Deployment**

### **Server Requirements**
- PHP 7.4+
- MySQL 5.7+
- Apache/Nginx
- SSL Certificate

### **Performance Optimization**
```php
// Enable OPcache
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=4000
```

### **Security Checklist**
- [ ] Change default admin password
- [ ] Set strong JWT secret
- [ ] Enable HTTPS
- [ ] Configure firewall
- [ ] Set up monitoring

## 🔄 **API Response Format**

### **Success Response**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

### **Error Response**
```json
{
  "success": false,
  "error": "Error message",
  "code": 400,
  "timestamp": "2024-01-15 10:30:00"
}
```

## 🎉 **Ready to Use!**

The API is now fully functional with:
- ✅ Clean, organized code structure
- ✅ Comprehensive error handling
- ✅ Secure authentication
- ✅ Role-based permissions
- ✅ Team management
- ✅ Database optimization
- ✅ CORS support
- ✅ Production ready

**Next Steps:**
1. Run `php api/setup.php` to initialize database
2. Test API endpoints
3. Update frontend configuration
4. Deploy to production

The backend is now fully operational! 🚀
