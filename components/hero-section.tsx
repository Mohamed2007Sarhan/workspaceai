"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Sparkles, Zap, Brain, BarChart3 } from "lucide-react"
import { AnimatedBackground } from "./animated-background"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <Badge variant="secondary" className="animate-pulse-glow text-sm px-4 py-2">
            <Sparkles className="w-4 h-4 ml-2" />
            منصة الذكاء الاصطناعي الأكثر تطوراً للشركات
          </Badge>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl font-bold text-balance leading-tight">
            <span className="bg-gradient-to-l from-primary via-purple-400 to-primary bg-clip-text text-transparent animate-gradient">
              مساعد الذكاء الاصطناعي
            </span>
            <br />
            <span className="text-foreground">الشامل للشركات</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            منصة متكاملة تجمع إدارة الإيميلات، خدمة العملاء، التحليلات، إدارة الموظفين، والعلامة التجارية في مكان واحد
            بقوة الذكاء الاصطناعي
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 py-6 animate-pulse-glow">
              <ArrowLeft className="w-5 h-5 ml-2" />
              ابدأ الآن مجاناً
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <BarChart3 className="w-5 h-5 ml-2" />
              شاهد العرض التوضيحي
            </Button>
          </div>

          {/* Features preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-float">
              <Brain className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">ذكاء اصطناعي متقدم</h3>
              <p className="text-muted-foreground">تحليل البيانات واتخاذ القرارات الذكية</p>
            </div>

            <div
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">أتمتة شاملة</h3>
              <p className="text-muted-foreground">إدارة العمليات والمهام تلقائياً</p>
            </div>

            <div
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 animate-float"
              style={{ animationDelay: "2s" }}
            >
              <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">تحليلات متقدمة</h3>
              <p className="text-muted-foreground">رؤى عميقة لتطوير أعمالك</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
