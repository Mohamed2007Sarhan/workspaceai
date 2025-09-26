"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Users, 
  Mail, 
  User, 
  Building, 
  Lock, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  EyeOff,
  ArrowLeft
} from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"

const AnimatedBackground = dynamic(() => import("@/components/animated-background").then(mod => ({ default: mod.AnimatedBackground })), { ssr: false })

export default function AcceptInvitationPage() {
  const searchParams = useSearchParams()
  const invitationToken = searchParams.get('token')
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [invitationData, setInvitationData] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  // تحميل بيانات الدعوة
  useEffect(() => {
    if (invitationToken) {
      loadInvitationData()
    }
  }, [invitationToken])

  const loadInvitationData = async () => {
    try {
      const response = await fetch(`/api/teams/invitation-info?token=${invitationToken}`)
      const data = await response.json()
      
      if (data.success) {
        setInvitationData(data.invitation)
      } else {
        alert(data.error || 'الدعوة غير صحيحة')
      }
    } catch (error) {
      console.error('Error loading invitation:', error)
      alert('حدث خطأ في تحميل بيانات الدعوة')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert("كلمات المرور غير متطابقة")
      return
    }
    
    if (!formData.acceptTerms) {
      alert("يجب الموافقة على الشروط والأحكام")
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/teams/accept-invitation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invitation_token: invitationToken,
          name: formData.name,
          company: formData.company,
          password: formData.password,
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        // حفظ بيانات المستخدم والرمز المشترك
        localStorage.setItem('auth_token', data.auth_token || '')
        localStorage.setItem('user_data', JSON.stringify(data.user))
        localStorage.setItem('team_token', data.team_token)
        localStorage.setItem('current_team', JSON.stringify(data.team))
        
        // Redirect to team dashboard
        if (typeof window !== 'undefined') {
          window.location.href = "/dashboard/team"
        }
      } else {
        alert(data.error || 'حدث خطأ في قبول الدعوة')
      }
    } catch (error) {
      console.error('Error accepting invitation:', error)
      alert('حدث خطأ في الاتصال بالخادم')
    } finally {
      setIsLoading(false)
    }
  }

  if (!invitationData) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <AnimatedBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-md mx-auto text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
            <p className="text-white text-lg">جاري تحميل بيانات الدعوة...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative py-12">
      <AnimatedBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">مرحباً بك في الفريق!</h1>
            <p className="text-slate-300">تم دعوتك للانضمام إلى فريق</p>
            <Badge variant="secondary" className="mt-2 bg-purple-500/20 text-purple-300 border-purple-500/30">
              {invitationData.team_name}
            </Badge>
          </div>

          {/* Invitation Info */}
          <Card className="mb-6 bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                تفاصيل الدعوة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">الفريق:</span>
                <span className="font-medium">{invitationData.team_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">البريد الإلكتروني:</span>
                <span className="font-medium">{invitationData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">الدور:</span>
                <Badge variant="outline">
                  {invitationData.role === 'admin' ? 'مدير' : 
                   invitationData.role === 'moderator' ? 'مشرف' : 'عضو'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">انتهاء الصلاحية:</span>
                <span className="font-medium">{new Date(invitationData.expires_at).toLocaleDateString('ar-SA')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">إنشاء حسابك</CardTitle>
              <CardDescription>أكمل بياناتك للانضمام للفريق</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="أدخل اسمك الكامل"
                      className="pr-10"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">اسم الشركة</Label>
                  <div className="relative">
                    <Building className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      type="text"
                      placeholder="أدخل اسم شركتك"
                      className="pr-10"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="أدخل كلمة المرور"
                      className="pr-10 pl-10"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="أعد إدخال كلمة المرور"
                      className="pr-10 pl-10"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute left-0 top-0 h-full px-3"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    أوافق على{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      الشروط والأحكام
                    </Link>{" "}
                    و{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      سياسة الخصوصية
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full animate-pulse-glow" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>جاري الانضمام للفريق...</span>
                    </div>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 ml-2" />
                      انضم للفريق
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-muted-foreground text-sm">
              لديك حساب بالفعل؟{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
