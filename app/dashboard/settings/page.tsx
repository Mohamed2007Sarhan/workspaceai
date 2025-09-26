"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Globe, Palette, Database, Key, Trash2, Save, CheckCircle, AlertTriangle, Upload, Download } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    marketing: false,
  })

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: "30",
  })

  const [profile, setProfile] = useState({
    firstName: "أحمد",
    lastName: "محمد",
    email: "ahmed@company.com",
    company: "شركة التقنية المتقدمة",
    bio: "مدير تقني في شركة التقنية المتقدمة، متخصص في الذكاء الاصطناعي وتطوير الأعمال.",
  })

  const [appearance, setAppearance] = useState({
    theme: "dark",
    language: "ar",
    timezone: "riyadh",
  })

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")

  const handleSave = async (section: string) => {
    setSaveStatus("saving")
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setSaveStatus("saved")
    setTimeout(() => setSaveStatus("idle"), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">الإعدادات</h1>
        <p className="text-muted-foreground">إدارة إعدادات حسابك وتفضيلات النظام</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="appearance">المظهر</TabsTrigger>
          <TabsTrigger value="integrations">التكاملات</TabsTrigger>
          <TabsTrigger value="advanced">متقدم</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                المعلومات الشخصية
              </CardTitle>
              <CardDescription>تحديث معلومات ملفك الشخصي وإعدادات الحساب</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex items-center gap-6 p-4 border rounded-lg bg-muted/30">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/user-avatar.jpg" />
                  <AvatarFallback className="text-lg">أح</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      تغيير الصورة
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4 mr-2" />
                      حذف الصورة
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">JPG, PNG أو GIF. الحد الأقصى 2MB</p>
                </div>
              </div>

              <Separator />

              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-lg">المعلومات الشخصية</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">الاسم الأول</Label>
                    <Input 
                      id="firstName" 
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">الاسم الأخير</Label>
                    <Input 
                      id="lastName" 
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="company">اسم الشركة</Label>
                  <Input 
                    id="company" 
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">نبذة مختصرة</Label>
                  <Textarea
                    id="bio"
                    placeholder="اكتب نبذة مختصرة عنك..."
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>

              <Separator />

              {/* Save Button with Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {saveStatus === "saved" && (
                    <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800 dark:text-green-200">
                        تم حفظ التغييرات بنجاح
                      </AlertDescription>
                    </Alert>
                  )}
                  {saveStatus === "error" && (
                    <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <AlertDescription className="text-red-800 dark:text-red-200">
                        حدث خطأ في حفظ التغييرات
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                <Button 
                  onClick={() => handleSave("profile")}
                  disabled={saveStatus === "saving"}
                  className="min-w-[120px]"
                >
                  {saveStatus === "saving" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      حفظ التغييرات
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                إعدادات الإشعارات
              </CardTitle>
              <CardDescription>اختر كيف ومتى تريد تلقي الإشعارات</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">إشعارات البريد الإلكتروني</p>
                    <p className="text-sm text-muted-foreground">تلقي إشعارات مهمة عبر البريد الإلكتروني</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">الإشعارات الفورية</p>
                    <p className="text-sm text-muted-foreground">إشعارات فورية في المتصفح</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">رسائل SMS</p>
                    <p className="text-sm text-muted-foreground">تنبيهات مهمة عبر الرسائل النصية</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">التسويق والعروض</p>
                    <p className="text-sm text-muted-foreground">معلومات حول المنتجات والعروض الجديدة</p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                  />
                </div>
              </div>

              <Button>حفظ الإعدادات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                الأمان والخصوصية
              </CardTitle>
              <CardDescription>إدارة إعدادات الأمان وحماية حسابك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">المصادقة الثنائية</p>
                    <p className="text-sm text-muted-foreground">طبقة حماية إضافية لحسابك</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500/20 text-green-300 border-green-500/30">مفعل</Badge>
                    <Switch
                      checked={security.twoFactor}
                      onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">تنبيهات تسجيل الدخول</p>
                    <p className="text-sm text-muted-foreground">إشعار عند تسجيل الدخول من جهاز جديد</p>
                  </div>
                  <Switch
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>انتهاء الجلسة (بالدقائق)</Label>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 دقيقة</SelectItem>
                      <SelectItem value="30">30 دقيقة</SelectItem>
                      <SelectItem value="60">ساعة واحدة</SelectItem>
                      <SelectItem value="120">ساعتان</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t">
                <h4 className="font-medium">إدارة كلمة المرور</h4>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                  <Button>تحديث كلمة المرور</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                المظهر والتخصيص
              </CardTitle>
              <CardDescription>تخصيص مظهر واجهة المستخدم</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label>المظهر</Label>
                  <Select defaultValue="dark">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">فاتح</SelectItem>
                      <SelectItem value="dark">مظلم</SelectItem>
                      <SelectItem value="system">تلقائي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>اللغة</Label>
                  <Select defaultValue="ar">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>المنطقة الزمنية</Label>
                  <Select defaultValue="riyadh">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="riyadh">الرياض (GMT+3)</SelectItem>
                      <SelectItem value="dubai">دبي (GMT+4)</SelectItem>
                      <SelectItem value="cairo">القاهرة (GMT+2)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button>حفظ التفضيلات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                التكاملات والاتصالات
              </CardTitle>
              <CardDescription>إدارة التكاملات مع الخدمات الخارجية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">Google Workspace</p>
                      <p className="text-sm text-muted-foreground">متصل</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">نشط</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <Database className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium">Slack</p>
                      <p className="text-sm text-muted-foreground">غير متصل</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    ربط
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <Key className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp Business</p>
                      <p className="text-sm text-muted-foreground">متصل</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">نشط</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                الإعدادات المتقدمة
              </CardTitle>
              <CardDescription>إعدادات متقدمة للمطورين والمستخدمين المتقدمين</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="apiKey">مفتاح API</Label>
                  <div className="flex gap-2">
                    <Input id="apiKey" value="sk-1234567890abcdef..." readOnly className="font-mono" />
                    <Button variant="outline">نسخ</Button>
                    <Button variant="outline">تجديد</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">استخدم هذا المفتاح للوصول إلى API الخاص بنا</p>
                </div>

                <div>
                  <Label htmlFor="webhookUrl">رابط Webhook</Label>
                  <Input id="webhookUrl" placeholder="https://your-domain.com/webhook" />
                  <p className="text-sm text-muted-foreground mt-1">سيتم إرسال الأحداث إلى هذا الرابط</p>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h4 className="font-medium text-red-400 mb-4">منطقة الخطر</h4>
                <div className="space-y-4">
                  <div className="p-4 border border-red-500/20 rounded-lg bg-red-500/5">
                    <h5 className="font-medium text-red-400 mb-2">تصدير البيانات</h5>
                    <p className="text-sm text-muted-foreground mb-4">تحميل جميع بياناتك في ملف مضغوط</p>
                    <Button
                      variant="outline"
                      className="border-red-500/50 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      تصدير البيانات
                    </Button>
                  </div>

                  <div className="p-4 border border-red-500/20 rounded-lg bg-red-500/5">
                    <h5 className="font-medium text-red-400 mb-2">حذف الحساب</h5>
                    <p className="text-sm text-muted-foreground mb-4">حذف حسابك وجميع البيانات المرتبطة به نهائياً</p>
                    <Button variant="destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      حذف الحساب
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
