"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const AnimatedBackground = dynamic(() => import("@/components/animated-background").then(mod => ({ default: mod.AnimatedBackground })), { ssr: false })

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
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
        alert(data.error || 'حدث خطأ في تسجيل الدخول')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('حدث خطأ في الاتصال بالخادم')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
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
              تسجيل الدخول
            </Badge>
          </div>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">مرحباً بعودتك</CardTitle>
              <CardDescription>سجل دخولك للوصول إلى لوحة التحكم</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="flex items-center justify-between">
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <Button type="submit" className="w-full animate-pulse-glow" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>جاري تسجيل الدخول...</span>
                    </div>
                  ) : (
                    <>
                      <ArrowLeft className="w-4 h-4 ml-2" />
                      تسجيل الدخول
                    </>
                  )}
                </Button>

                <div className="text-center">
                  <span className="text-muted-foreground">ليس لديك حساب؟ </span>
                  <Link href="/auth/register" className="text-primary hover:underline">
                    إنشاء حساب جديد
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
