"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { 
  Shield, 
  Users, 
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
  MemoryStick,
  Lock,
  Key,
  FileText,
  Mail,
  Bell,
  Zap,
  RefreshCw,
  Save,
  X,
  AlertCircle,
  Info,
  Wifi,
  WifiOff,
  Monitor,
  Smartphone,
  Tablet,
  Calendar,
  UserCheck,
  UserX,
  LogIn,
  LogOut,
  ShieldCheck,
  ShieldAlert,
  Archive,
  FileArchive,
  Cloud,
  CloudOff
} from "lucide-react"

interface SystemStats {
  total_users: number
  active_users: number
  total_revenue: number
  system_health: number
  storage_used: number
  cpu_usage: number
  memory_usage: number
  api_requests_today: number
  failed_logins_today: number
  backup_size_total: number
}

interface SystemLog {
  id: number
  log_level: 'info' | 'warning' | 'error' | 'critical'
  category: string
  message: string
  user_id?: number
  ip_address?: string
  created_at: string
}

interface SystemSetting {
  id: number
  setting_key: string
  setting_value: string
  setting_type: 'string' | 'number' | 'boolean' | 'json' | 'encrypted'
  description: string
  is_public: boolean
  updated_at: string
}

interface UserSession {
  id: number
  user_id: number
  ip_address: string
  user_agent: string
  is_admin: boolean
  last_activity: string
  expires_at: string
}

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null)
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([])
  const [systemSettings, setSystemSettings] = useState<SystemSetting[]>([])
  const [userSessions, setUserSessions] = useState<UserSession[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLogLevel, setSelectedLogLevel] = useState("all")
  const [showSettingsDialog, setShowSettingsDialog] = useState(false)
  const [editingSetting, setEditingSetting] = useState<SystemSetting | null>(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // تحميل الإحصائيات
      const statsResponse = await fetch('/api/admin/system-stats', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
      })
      const statsData = await statsResponse.json()
      if (statsData.success) {
        setSystemStats(statsData.stats)
      }

      // تحميل السجلات
      const logsResponse = await fetch('/api/admin/system-logs', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
      })
      const logsData = await logsResponse.json()
      if (logsData.success) {
        setSystemLogs(logsData.logs)
      }

      // تحميل الإعدادات
      const settingsResponse = await fetch('/api/admin/system-settings', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
      })
      const settingsData = await settingsResponse.json()
      if (settingsData.success) {
        setSystemSettings(settingsData.settings)
      }

      // تحميل الجلسات
      const sessionsResponse = await fetch('/api/admin/user-sessions', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
      })
      const sessionsData = await sessionsResponse.json()
      if (sessionsData.success) {
        setUserSessions(sessionsData.sessions)
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateSetting = async (setting: SystemSetting, newValue: string) => {
    try {
      const response = await fetch('/api/admin/update-setting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          setting_key: setting.setting_key,
          setting_value: newValue
        })
      })

      const data = await response.json()
      if (data.success) {
        setShowSettingsDialog(false)
        setEditingSetting(null)
        loadDashboardData()
        alert('تم تحديث الإعداد بنجاح')
      } else {
        alert(data.error || 'حدث خطأ في تحديث الإعداد')
      }
    } catch (error) {
      console.error('Error updating setting:', error)
      alert('حدث خطأ في الاتصال بالخادم')
    }
  }

  const handleCreateBackup = async () => {
    try {
      const response = await fetch('/api/admin/create-backup', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
      })

      const data = await response.json()
      if (data.success) {
        alert('تم بدء إنشاء النسخة الاحتياطية')
        loadDashboardData()
      } else {
        alert(data.error || 'حدث خطأ في إنشاء النسخة الاحتياطية')
      }
    } catch (error) {
      console.error('Error creating backup:', error)
      alert('حدث خطأ في الاتصال بالخادم')
    }
  }

  const handleTerminateSession = async (sessionId: number) => {
    try {
      const response = await fetch(`/api/admin/terminate-session/${sessionId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('auth_token')}` }
      })

      const data = await response.json()
      if (data.success) {
        alert('تم إنهاء الجلسة بنجاح')
        loadDashboardData()
      } else {
        alert(data.error || 'حدث خطأ في إنهاء الجلسة')
      }
    } catch (error) {
      console.error('Error terminating session:', error)
      alert('حدث خطأ في الاتصال بالخادم')
    }
  }

  const getLogLevelIcon = (level: string) => {
    switch (level) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />
      case 'error': return <X className="w-4 h-4 text-red-400" />
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default: return <Info className="w-4 h-4 text-blue-500" />
    }
  }

  const getLogLevelBadge = (level: string) => {
    switch (level) {
      case 'critical': return <Badge variant="destructive">حرج</Badge>
      case 'error': return <Badge variant="destructive">خطأ</Badge>
      case 'warning': return <Badge variant="secondary">تحذير</Badge>
      default: return <Badge variant="outline">معلومات</Badge>
    }
  }

  const filteredLogs = systemLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = selectedLogLevel === 'all' || log.log_level === selectedLogLevel
    return matchesSearch && matchesLevel
  })

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            لوحة الإدارة الشاملة
          </h1>
          <p className="text-muted-foreground">إدارة ومراقبة النظام بالكامل</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadDashboardData}>
            <RefreshCw className="w-4 h-4 mr-2" />
            تحديث
          </Button>
          <Button onClick={handleCreateBackup}>
            <Archive className="w-4 h-4 mr-2" />
            نسخة احتياطية
          </Button>
        </div>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">صحة النظام</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats?.system_health || 0}%</div>
            <Progress value={systemStats?.system_health || 0} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {systemStats?.system_health && systemStats.system_health > 90 ? 'ممتاز' : 
               systemStats?.system_health && systemStats.system_health > 70 ? 'جيد' : 'يحتاج انتباه'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">المستخدمون النشطون</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats?.active_users || 0}</div>
            <p className="text-xs text-muted-foreground">
              من أصل {systemStats?.total_users || 0} مستخدم
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">استخدام التخزين</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats?.storage_used || 0}%</div>
            <Progress value={systemStats?.storage_used || 0} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {systemStats?.backup_size_total || 0} MB نسخ احتياطية
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">استخدام المعالج</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats?.cpu_usage || 0}%</div>
            <Progress value={systemStats?.cpu_usage || 0} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {systemStats?.memory_usage || 0}% ذاكرة
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="logs">سجلات النظام</TabsTrigger>
          <TabsTrigger value="settings">إعدادات النظام</TabsTrigger>
          <TabsTrigger value="sessions">الجلسات النشطة</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="backup">النسخ الاحتياطية</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  النشاط الأخير
                </CardTitle>
                <CardDescription>آخر الأحداث في النظام</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      {getLogLevelIcon(log.log_level)}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{log.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {log.category} • {new Date(log.created_at).toLocaleString('ar-SA')}
                        </p>
                      </div>
                      {getLogLevelBadge(log.log_level)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  حالة النظام
                </CardTitle>
                <CardDescription>حالة الخدمات والمكونات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-green-500" />
                      <span>قاعدة البيانات</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">متصل</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-green-500" />
                      <span>خادم الويب</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">نشط</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-yellow-500" />
                      <span>خدمة البريد</span>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">تحذير</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>نظام الأمان</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">محمي</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Logs Tab */}
        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    سجلات النظام
                  </CardTitle>
                  <CardDescription>مراقبة جميع أحداث النظام</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Select value={selectedLogLevel} onValueChange={setSelectedLogLevel}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع المستويات</SelectItem>
                      <SelectItem value="info">معلومات</SelectItem>
                      <SelectItem value="warning">تحذير</SelectItem>
                      <SelectItem value="error">خطأ</SelectItem>
                      <SelectItem value="critical">حرج</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="البحث في السجلات..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50">
                    {getLogLevelIcon(log.log_level)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{log.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{log.category}</span>
                        <span>•</span>
                        <span>{log.ip_address}</span>
                        <span>•</span>
                        <span>{new Date(log.created_at).toLocaleString('ar-SA')}</span>
                      </div>
                    </div>
                    {getLogLevelBadge(log.log_level)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                إعدادات النظام
              </CardTitle>
              <CardDescription>إدارة إعدادات النظام العامة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{setting.setting_key}</h4>
                        {setting.setting_type === 'encrypted' && (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        النوع: {setting.setting_type} • آخر تحديث: {new Date(setting.updated_at).toLocaleString('ar-SA')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {setting.setting_type === 'encrypted' ? '••••••••' : setting.setting_value}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingSetting(setting)
                          setShowSettingsDialog(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Sessions Tab */}
        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                الجلسات النشطة
              </CardTitle>
              <CardDescription>مراقبة وإدارة جلسات المستخدمين</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {userSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {session.is_admin ? (
                          <Shield className="w-5 h-5 text-primary" />
                        ) : (
                          <Users className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">المستخدم #{session.user_id}</p>
                        <p className="text-sm text-muted-foreground">{session.ip_address}</p>
                        <p className="text-xs text-muted-foreground">
                          آخر نشاط: {new Date(session.last_activity).toLocaleString('ar-SA')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={session.is_admin ? "default" : "secondary"}>
                        {session.is_admin ? "مدير" : "مستخدم"}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTerminateSession(session.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  إحصائيات الأمان
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>محاولات تسجيل الدخول اليوم</span>
                    <Badge variant="outline">{systemStats?.api_requests_today || 0}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>فشل تسجيل الدخول</span>
                    <Badge variant="destructive">{systemStats?.failed_logins_today || 0}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>الجلسات النشطة</span>
                    <Badge variant="secondary">{userSessions.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>جلسات المديرين</span>
                    <Badge variant="default">{userSessions.filter(s => s.is_admin).length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  إعدادات الأمان
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">وضع الصيانة</p>
                      <p className="text-sm text-muted-foreground">إيقاف الموقع للصيانة</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تسجيل محاولات الدخول</p>
                      <p className="text-sm text-muted-foreground">تسجيل جميع محاولات تسجيل الدخول</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تشفير البيانات الحساسة</p>
                      <p className="text-sm text-muted-foreground">تشفير جميع البيانات الحساسة</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Backup Tab */}
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="w-5 h-5" />
                النسخ الاحتياطية
              </CardTitle>
              <CardDescription>إدارة النسخ الاحتياطية للنظام</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">إنشاء نسخة احتياطية جديدة</h4>
                    <p className="text-sm text-muted-foreground">إنشاء نسخة احتياطية كاملة للنظام</p>
                  </div>
                  <Button onClick={handleCreateBackup}>
                    <Plus className="w-4 h-4 mr-2" />
                    إنشاء نسخة
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">النسخ الاحتياطية المتاحة</h4>
                  <div className="text-sm text-muted-foreground">
                    لا توجد نسخ احتياطية متاحة حالياً
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تعديل الإعداد</DialogTitle>
            <DialogDescription>
              تعديل قيمة الإعداد: {editingSetting?.setting_key}
            </DialogDescription>
          </DialogHeader>
          {editingSetting && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="setting-value">القيمة الجديدة</Label>
                {editingSetting.setting_type === 'boolean' ? (
                  <Select 
                    value={editingSetting.setting_value} 
                    onValueChange={(value) => handleUpdateSetting(editingSetting, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">مفعل</SelectItem>
                      <SelectItem value="false">معطل</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="setting-value"
                    type={editingSetting.setting_type === 'number' ? 'number' : 'text'}
                    defaultValue={editingSetting.setting_value}
                    placeholder="أدخل القيمة الجديدة"
                  />
                )}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowSettingsDialog(false)}>
                  إلغاء
                </Button>
                <Button onClick={() => {
                  const input = document.getElementById('setting-value') as HTMLInputElement
                  if (input) {
                    handleUpdateSetting(editingSetting, input.value)
                  }
                }}>
                  <Save className="w-4 h-4 mr-2" />
                  حفظ
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
