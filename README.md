# منصة الذكاء الاصطناعي للأعمال

منصة شاملة لإدارة الأعمال باستخدام الذكاء الاصطناعي مع واجهة عربية حديثة ونظام إدارة متكامل.

## المميزات

### 🎨 الواجهة الأمامية
- **تصميم حديث ومتجاوب** مع دعم الوضع المظلم والفاتح
- **واجهة عربية كاملة** مع دعم RTL
- **مكونات UI متقدمة** باستخدام shadcn/ui
- **رسوم ثلاثية الأبعاد** تفاعلية باستخدام Three.js
- **تحسينات الأداء** مع lazy loading وcode splitting

### 🔐 نظام المصادقة والإدارة
- **تسجيل دخول وتسجيل** آمن مع تشفير كلمات المرور
- **أدوار متعددة**: مدير، مشرف، مستخدم
- **إدارة المستخدمين** مع إحصائيات مفصلة
- **إدارة الفرق** مع إضافة وإزالة الأعضاء
- **لوحة إدارة شاملة** لمراقبة النظام

### 🛠️ الباك إند
- **API PHP** مع بنية MVC نظيفة
- **قاعدة بيانات MySQL** محسنة مع فهارس
- **نظام رموز المصادقة** آمن مع انتهاء صلاحية
- **إدارة الجلسات** مع تنظيف تلقائي
- **نظام الإشعارات** والأنشطة

## التقنيات المستخدمة

### Frontend
- **Next.js 14** - إطار React مع App Router
- **TypeScript** - للكتابة الآمنة
- **Tailwind CSS** - للتصميم السريع
- **shadcn/ui** - مكونات UI جاهزة
- **Lucide React** - أيقونات حديثة
- **Three.js** - الرسوم ثلاثية الأبعاد

### Backend
- **PHP 8+** - لغة البرمجة الخلفية
- **MySQL 8+** - قاعدة البيانات
- **PDO** - للاتصال الآمن بقاعدة البيانات
- **JWT** - للمصادقة الآمنة

## التثبيت والتشغيل

### 1. متطلبات النظام
- Node.js 18+ 
- PHP 8+
- MySQL 8+
- Composer (اختياري)

### 2. تثبيت الواجهة الأمامية

```bash
# استنساخ المشروع
git clone <repository-url>
cd workspace

# تثبيت التبعيات
npm install
# أو
pnpm install

# تشغيل خادم التطوير
npm run dev
# أو
pnpm dev
```

### 3. إعداد قاعدة البيانات

```bash
# تسجيل الدخول إلى MySQL
mysql -u root -p

# تشغيل ملف SQL
source database/schema.sql
```

### 4. إعداد الباك إند

```bash
# إنشاء مجلد API (إذا لم يكن موجوداً)
mkdir api

# نسخ ملفات PHP إلى مجلد API
cp api/index.php /path/to/your/web/server/api/

# تحديث إعدادات قاعدة البيانات في api/index.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'ai_business_platform');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
```

### 5. إعداد خادم الويب

#### Apache
```apache
# في ملف .htaccess
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^api/(.*)$ api/index.php [QSA,L]
```

#### Nginx
```nginx
location /api/ {
    try_files $uri $uri/ /api/index.php?$query_string;
}
```

## هيكل المشروع

```
workspace/
├── app/                    # صفحات Next.js
│   ├── auth/              # صفحات المصادقة
│   ├── dashboard/         # لوحة التحكم
│   └── globals.css        # الأنماط العامة
├── components/            # مكونات React
│   ├── ui/               # مكونات UI الأساسية
│   └── ...               # مكونات أخرى
├── api/                   # API PHP
│   └── index.php         # نقطة الدخول الرئيسية
├── database/              # ملفات قاعدة البيانات
│   └── schema.sql        # هيكل قاعدة البيانات
├── lib/                   # مكتبات مساعدة
└── public/               # الملفات الثابتة
```

## الاستخدام

### 1. تسجيل الدخول
- انتقل إلى `/auth/login`
- استخدم البيانات التجريبية:
  - **مدير**: admin@aibusiness.com / password
  - **مستخدم**: ahmed@company.com / password

### 2. لوحة التحكم
- **لوحة عامة**: `/dashboard` - نظرة شاملة على النظام
- **لوحة الإدارة**: `/dashboard/admin` - للمديرين فقط
- **إدارة المستخدمين**: `/dashboard/admin` - إدارة المستخدمين
- **إدارة الفرق**: `/dashboard/teams` - إدارة الفرق والأعضاء
- **الإعدادات**: `/dashboard/settings` - إعدادات الحساب

### 3. API Endpoints

#### المصادقة
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/logout` - تسجيل الخروج

#### إدارة المستخدمين
- `GET /api/users` - الحصول على قائمة المستخدمين
- `PUT /api/users/update?id={id}` - تحديث مستخدم
- `DELETE /api/users/delete?id={id}` - حذف مستخدم

#### إدارة الفرق
- `POST /api/teams/create` - إنشاء فريق جديد
- `POST /api/teams/add-member` - إضافة عضو للفريق
- `DELETE /api/teams/remove-member` - إزالة عضو من الفريق

## التخصيص

### الألوان والثيمات
تعديل الألوان في `app/globals.css`:
```css
:root {
  --primary: oklch(0.65 0.25 270);
  --secondary: oklch(0.18 0 0);
  /* ... */
}
```

### إعدادات قاعدة البيانات
تعديل الإعدادات في `api/index.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database');
define('DB_USER', 'your_username');
define('DB_PASS', 'your_password');
```

## الأمان

- **تشفير كلمات المرور** باستخدام `password_hash()`
- **حماية من SQL Injection** باستخدام Prepared Statements
- **رموز المصادقة** مع انتهاء صلاحية تلقائي
- **تنظيف الجلسات** المنتهية الصلاحية
- **CORS** محدد للطلبات المسموحة

## الأداء

- **فهرسة قاعدة البيانات** لتحسين الاستعلامات
- **تنظيف تلقائي** للرموز المنتهية الصلاحية
- **ضغط الملفات** الثابتة
- **تحسين الصور** والموارد

## الدعم والمساهمة

### الإبلاغ عن المشاكل
- استخدم GitHub Issues للإبلاغ عن الأخطاء
- قدم تفاصيل كاملة عن المشكلة
- أرفق لقطات الشاشة إذا أمكن

### المساهمة
- Fork المشروع
- أنشئ branch جديد للميزة
- قدم Pull Request مع وصف واضح

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## الاتصال

- **البريد الإلكتروني**: support@aibusiness.com
- **الموقع**: https://aibusiness.com
- **الدعم**: https://aibusiness.com/support

---

تم تطوير هذا المشروع بـ ❤️ للمجتمع العربي
