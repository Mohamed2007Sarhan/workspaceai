"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  MessageSquare,
  BarChart3,
  Users,
  Palette,
  CreditCard,
  Headphones,
  Lightbulb,
  Shield,
  Zap,
  Globe,
  Target,
} from "lucide-react"

const features = [
  {
    icon: Mail,
    title: "إدارة الإيميلات الذكية",
    description: "نظام متطور لإدارة وتنظيم الإيميلات مع الرد التلقائي الذكي",
    badge: "AI-Powered",
  },
  {
    icon: MessageSquare,
    title: "خدمة العملاء متعددة المنصات",
    description: "رد تلقائي على العملاء من جميع وسائل التواصل الاجتماعي بلغات متعددة",
    badge: "Multi-Language",
  },
  {
    icon: BarChart3,
    title: "تحليلات وتقارير متقدمة",
    description: "رسوم بيانية تفاعلية واقتراحات لتطوير الشركة",
    badge: "Analytics",
  },
  {
    icon: Users,
    title: "إدارة الموظفين",
    description: "نظام شامل لإدارة الموظفين واختبارهم وتقييم أدائهم",
    badge: "HR Management",
  },
  {
    icon: Palette,
    title: "إدارة العلامة التجارية",
    description: "تسجيل العلامة التجارية وإنشاء اللوجوهات ومتابعة الشركات المنافسة",
    badge: "Brand Tools",
  },
  {
    icon: CreditCard,
    title: "نظام الدفع والاشتراكات",
    description: "نظام دفع متكامل مع إدارة الاشتراكات والفواتير",
    badge: "Payment",
  },
  {
    icon: Target,
    title: "إدارة الحملات الإعلانية",
    description: "متابعة وتطوير الحملات الإعلانية بالذكاء الاصطناعي",
    badge: "Marketing",
  },
  {
    icon: Lightbulb,
    title: "طلب الميزات الجديدة",
    description: "نظام ذكي لطلب ميزات جديدة وتطويرها تلقائياً",
    badge: "Innovation",
  },
  {
    icon: Shield,
    title: "أمان متقدم",
    description: "حماية البيانات والمعلومات بأعلى معايير الأمان",
    badge: "Security",
  },
  {
    icon: Zap,
    title: "أداء فائق السرعة",
    description: "معالجة سريعة للبيانات والاستجابة الفورية",
    badge: "Performance",
  },
  {
    icon: Globe,
    title: "دعم متعدد اللغات",
    description: "واجهة ودعم بلغات متعددة لخدمة العملاء العالميين",
    badge: "Global",
  },
  {
    icon: Headphones,
    title: "دعم فني 24/7",
    description: "فريق دعم متخصص متاح على مدار الساعة",
    badge: "Support",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            الميزات الشاملة
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            كل ما تحتاجه لإدارة شركتك
            <br />
            <span className="bg-gradient-to-l from-primary to-purple-400 bg-clip-text text-transparent">
              في مكان واحد
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            منصة متكاملة تجمع جميع أدوات إدارة الأعمال مع قوة الذكاء الاصطناعي
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300 hover:scale-105 animate-float"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="w-8 h-8 text-primary" />
                  <Badge variant="outline" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
