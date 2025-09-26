"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, Rocket } from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

const plans = [
  {
    name: "الأساسية",
    nameEn: "Basic",
    price: 99,
    period: "شهرياً",
    description: "مثالية للشركات الناشئة والصغيرة",
    icon: Star,
    color: "from-blue-500 to-cyan-500",
    features: [
      "مساعد ذكي أساسي",
      "إدارة 1000 إيميل شهرياً",
      "تحليلات أساسية",
      "دعم عبر الإيميل",
      "5 مستخدمين",
      "تخزين 10 جيجا",
    ],
    popular: false,
  },
  {
    name: "المتقدمة",
    nameEn: "Professional",
    price: 299,
    period: "شهرياً",
    description: "الأفضل للشركات المتوسطة والمتنامية",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    features: [
      "مساعد ذكي متقدم",
      "إدارة 10,000 إيميل شهرياً",
      "تحليلات متقدمة ورسوم بيانية",
      "دعم 24/7",
      "25 مستخدم",
      "تخزين 100 جيجا",
      "إدارة وسائل التواصل الاجتماعي",
      "تحليل المشاعر",
      "تقارير مخصصة",
    ],
    popular: true,
  },
  {
    name: "المؤسسية",
    nameEn: "Enterprise",
    price: 799,
    period: "شهرياً",
    description: "حلول شاملة للمؤسسات الكبيرة",
    icon: Crown,
    color: "from-amber-500 to-orange-500",
    features: [
      "مساعد ذكي مخصص",
      "إيميلات غير محدودة",
      "تحليلات شاملة وذكية",
      "دعم مخصص ومدير حساب",
      "مستخدمين غير محدود",
      "تخزين غير محدود",
      "إدارة العلامة التجارية",
      "مراقبة المنافسين",
      "API مخصص",
      "تدريب فريق العمل",
    ],
    popular: false,
  },
]

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      {/* Header */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">خطط التسعير</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            اختر الخطة المناسبة
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> لشركتك</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto text-pretty">
            حلول ذكية ومرنة تنمو مع نمو أعمالك. جميع الخطط تشمل ضمان استرداد المال لمدة 30 يوماً
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-full p-1 border border-slate-700">
            <div className="flex items-center">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !isAnnual ? "bg-purple-500 text-white shadow-lg" : "text-slate-400 hover:text-white"
                }`}
              >
                شهرياً
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all relative ${
                  isAnnual ? "bg-purple-500 text-white shadow-lg" : "text-slate-400 hover:text-white"
                }`}
              >
                سنوياً
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">وفر 20%</Badge>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const finalPrice = isAnnual ? Math.round(plan.price * 0.8) : plan.price

            return (
              <Card
                key={index}
                className={`relative overflow-hidden border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 ${
                  plan.popular ? "ring-2 ring-purple-500 shadow-2xl shadow-purple-500/20" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-medium">
                    الأكثر شعبية
                  </div>
                )}

                <CardHeader className={plan.popular ? "pt-12" : "pt-6"}>
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <CardDescription className="text-slate-400">{plan.description}</CardDescription>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-4xl font-bold text-white">${finalPrice}</span>
                    <span className="text-slate-400">{plan.period}</span>
                    {isAnnual && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        وفر ${plan.price - finalPrice}
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Link
                    href={`/checkout?plan=${plan.nameEn.toLowerCase()}&billing=${isAnnual ? "annual" : "monthly"}`}
                    className="w-full"
                  >
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          : "bg-slate-700 hover:bg-slate-600 text-white"
                      }`}
                    >
                      ابدأ الآن
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Enterprise Contact */}
        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">هل تحتاج حلول مخصصة؟</CardTitle>
              <CardDescription className="text-slate-400">
                تواصل معنا لمناقشة احتياجاتك الخاصة والحصول على عرض مخصص
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center">
              <Link href="/contact">
                <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
                  تواصل معنا
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}
