"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Lock, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

const planDetails = {
  basic: { name: "الأساسية", price: 99, features: ["مساعد ذكي أساسي", "إدارة 1000 إيميل", "5 مستخدمين"] },
  professional: { name: "المتقدمة", price: 299, features: ["مساعد ذكي متقدم", "إدارة 10,000 إيميل", "25 مستخدم"] },
  enterprise: {
    name: "المؤسسية",
    price: 799,
    features: ["مساعد ذكي مخصص", "إيميلات غير محدودة", "مستخدمين غير محدود"],
  },
}

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const [plan, setPlan] = useState("professional")
  const [billing, setBilling] = useState("monthly")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const planParam = searchParams.get("plan")
    const billingParam = searchParams.get("billing")
    if (planParam) setPlan(planParam)
    if (billingParam) setBilling(billingParam)
  }, [searchParams])

  const selectedPlan = planDetails[plan as keyof typeof planDetails]
  const finalPrice = billing === "annual" ? Math.round(selectedPlan.price * 0.8) : selectedPlan.price
  const savings = billing === "annual" ? selectedPlan.price - finalPrice : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-slate-700 bg-slate-800/50 backdrop-blur-sm text-center">
          <CardHeader>
            <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">تم الدفع بنجاح!</CardTitle>
            <CardDescription className="text-slate-400">مرحباً بك في منصة الذكاء الاصطناعي للأعمال</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-slate-300 mb-6">
              تم تفعيل اشتراكك في خطة {selectedPlan.name}. ستتلقى إيميل تأكيد قريباً.
            </p>
            <Link href="/dashboard">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                انتقل إلى لوحة التحكم
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <div className="container mx-auto max-w-6xl py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">إتمام عملية الدفع</h1>
          <p className="text-slate-300">أكمل اشتراكك واحصل على وصول فوري لجميع الميزات</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                ملخص الطلب
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">الخطة المختارة</span>
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{selectedPlan.name}</Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-300">نوع الفوترة</span>
                <span className="text-white">{billing === "annual" ? "سنوياً" : "شهرياً"}</span>
              </div>

              <Separator className="bg-slate-700" />

              <div className="space-y-2">
                <h4 className="text-white font-medium">الميزات المشمولة:</h4>
                <ul className="space-y-1">
                  {selectedPlan.features.map((feature, index) => (
                    <li key={index} className="text-slate-300 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Separator className="bg-slate-700" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-300">السعر الأساسي</span>
                  <span className="text-white">${selectedPlan.price}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-400">خصم سنوي (20%)</span>
                    <span className="text-green-400">-${savings}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">المجموع</span>
                  <span className="text-white">${finalPrice}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                معلومات الدفع
              </CardTitle>
              <CardDescription className="text-slate-400">جميع المعاملات مؤمنة ومشفرة</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">
                      الاسم الأول
                    </Label>
                    <Input
                      id="firstName"
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="أحمد"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">
                      الاسم الأخير
                    </Label>
                    <Input
                      id="lastName"
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="محمد"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">
                    البريد الإلكتروني
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="ahmed@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-white">
                    اسم الشركة
                  </Label>
                  <Input
                    id="company"
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="شركة التقنية المتقدمة"
                  />
                </div>

                <Separator className="bg-slate-700" />

                <div>
                  <Label htmlFor="cardNumber" className="text-white">
                    رقم البطاقة
                  </Label>
                  <Input
                    id="cardNumber"
                    required
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry" className="text-white">
                      تاريخ الانتهاء
                    </Label>
                    <Input
                      id="expiry"
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-white">
                      CVV
                    </Label>
                    <Input id="cvv" required className="bg-slate-700 border-slate-600 text-white" placeholder="123" />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Lock className="w-4 h-4" />
                  <span>معلوماتك محمية بتشفير SSL 256-bit</span>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={isProcessing}
                >
                  {isProcessing ? "جاري المعالجة..." : `ادفع ${finalPrice}$ الآن`}
                </Button>

                <p className="text-xs text-slate-400 text-center">
                  بالمتابعة، أنت توافق على
                  <Link href="/terms" className="text-purple-400 hover:underline">
                    {" "}
                    شروط الخدمة{" "}
                  </Link>
                  و
                  <Link href="/privacy" className="text-purple-400 hover:underline">
                    {" "}
                    سياسة الخصوصية
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
