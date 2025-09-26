"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserManagement } from "@/components/admin/UserManagement"
import { PermissionManagement } from "@/components/admin/PermissionManagement"
import { TeamManagement } from "@/components/admin/TeamManagement"
import { useLanguage } from "@/lib/providers"
import { 
  Users, 
  Shield, 
  Activity, 
  Database, 
  Settings, 
  Eye, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Globe,
  Server,
  HardDrive,
  Cpu,
  MemoryStick
} from "lucide-react"

export default function AdminDashboard() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")

  // Mock data
  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalRevenue: 45600,
    systemHealth: 98.5,
    storageUsed: 67.2,
    cpuUsage: 23.1,
    memoryUsage: 45.8
  }

  const recentUsers = [
    { id: 1, name: "أحمد محمد", email: "ahmed@company.com", role: "admin", status: "active", lastLogin: "2024-01-15" },
    { id: 2, name: "فاطمة أحمد", email: "fatima@company.com", role: "user", status: "active", lastLogin: "2024-01-14" },
    { id: 3, name: "محمد علي", email: "mohammed@company.com", role: "moderator", status: "inactive", lastLogin: "2024-01-10" },
    { id: 4, name: "سارة حسن", email: "sara@company.com", role: "user", status: "active", lastLogin: "2024-01-15" },
  ]

  const systemAlerts = [
    { id: 1, type: "warning", message: "استخدام التخزين يقترب من الحد الأقصى", time: "منذ 2 ساعة" },
    { id: 2, type: "info", message: "تم تحديث النظام بنجاح", time: "منذ 4 ساعات" },
    { id: 3, type: "error", message: "فشل في الاتصال بقاعدة البيانات", time: "منذ 6 ساعات" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">لوحة الإدارة</h1>
          <p className="text-muted-foreground">مراقبة وإدارة النظام والمستخدمين</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            تصدير البيانات
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            إضافة مستخدم
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> من الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المستخدمون النشطون</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> من الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الإيرادات</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15%</span> من الشهر الماضي
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">صحة النظام</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.systemHealth}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">ممتاز</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">استخدام التخزين</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.storageUsed}%</div>
            <div className="w-full bg-secondary rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full" 
                style={{ width: `${stats.storageUsed}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">استخدام المعالج</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.cpuUsage}%</div>
            <div className="w-full bg-secondary rounded-full h-2 mt-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${stats.cpuUsage}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">استخدام الذاكرة</CardTitle>
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.memoryUsage}%</div>
            <div className="w-full bg-secondary rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${stats.memoryUsage}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">{t("dashboard.overview")}</TabsTrigger>
          <TabsTrigger value="users">{t("dashboard.employees")}</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  المستخدمون الجدد
                </CardTitle>
                <CardDescription>آخر المستخدمين المسجلين</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentUsers.slice(0, 3).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Badge variant={user.status === "active" ? "default" : "secondary"}>
                        {user.status === "active" ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  تنبيهات النظام
                </CardTitle>
                <CardDescription>آخر التنبيهات والأحداث</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemAlerts.map((alert) => (
                    <Alert key={alert.id} className={`
                      ${alert.type === "error" ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950" : ""}
                      ${alert.type === "warning" ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950" : ""}
                      ${alert.type === "info" ? "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950" : ""}
                    `}>
                      <AlertDescription>
                        <div className="flex justify-between items-start">
                          <span>{alert.message}</span>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Users Management Tab */}
        <TabsContent value="users" className="space-y-4">
          <UserManagement />
        </TabsContent>

        {/* Permissions Management Tab */}
        <TabsContent value="permissions" className="space-y-4">
          <PermissionManagement />
        </TabsContent>

        {/* Teams Management Tab */}
        <TabsContent value="teams" className="space-y-4">
          <TeamManagement />
        </TabsContent>

        {/* System Management Tab */}
        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  إعدادات الخادم
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenance">وضع الصيانة</Label>
                  <Switch id="maintenance" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="debug">وضع التطوير</Label>
                  <Switch id="debug" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="backup">النسخ الاحتياطي التلقائي</Label>
                  <Switch id="backup" defaultChecked />
                </div>
                <Button className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  حفظ الإعدادات
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  إدارة قاعدة البيانات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>حجم قاعدة البيانات</Label>
                  <div className="text-2xl font-bold">2.4 GB</div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    تصدير
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    استيراد
                  </Button>
                </div>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  تنظيف قاعدة البيانات
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  إحصائيات المستخدمين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  مخطط الإحصائيات سيظهر هنا
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  توزيع الأدوار
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  مخطط التوزيع سيظهر هنا
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
