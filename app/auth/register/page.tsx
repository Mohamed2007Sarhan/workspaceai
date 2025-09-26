"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, Mail, Lock, User, Building, ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const AnimatedBackground = dynamic(() => import("@/components/animated-background").then(mod => ({ default: mod.AnimatedBackground })), { ssr: false })

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          password: formData.password,
        }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        // حفظ الرمز في localStorage
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('user_data', JSON.stringify(data.user))
        
        // Redirect to dashboard
        if (typeof window !== 'undefined') {
          window.location.href = "/dashboard"
        }
      } else {
        alert(data.error || 'حدث خطأ في إنشاء الحساب')
      }
    } catch (error) {
      console.error('Registration error:', error)
      alert('حدث خطأ في الاتصال بالخادم')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative py-12">
      <AnimatedBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 space-x-reverse">
              <Brain className="w-10 h-10 text-primary animate-pulse-glow" />
              <span className="text-2xl font-bold">AI Business</span>
            </Link>
            <Badge variant="secondary" className="mt-2">
              إنشاء حساب جديد
            </Badge>
          </div>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">انضم إلى منصتنا</CardTitle>
              <CardDescription>أنشئ حسابك واستمتع بجميع الميزات</CardDescription>
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
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="أدخل بريدك الإلكتروني"
                      className="pr-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                      <span>جاري إنشاء الحساب...</span>
                    </div>
                  ) : (
                    <>
                      <ArrowLeft className="w-4 h-4 ml-2" />
                      إنشاء حساب
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <span className="text-muted-foreground">لديك حساب بالفعل؟ </span>
                  <Link href="/auth/login" className="text-primary hover:underline">
                    تسجيل الدخول
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
