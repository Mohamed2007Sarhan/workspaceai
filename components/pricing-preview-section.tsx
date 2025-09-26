"use client"

import { motion } from "framer-motion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-animations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowLeft, Sparkles, Crown, Rocket } from "lucide-react"
import { useLanguage } from "@/lib/providers"
import Link from "next/link"

const plans = [
  {
    name: { ar: "المبتدئ", en: "Starter" },
    price: { ar: "مجاني", en: "Free" },
    description: { ar: "للشركات الناشئة", en: "For Startups" },
    icon: Rocket,
    features: [
      { ar: "إدارة 1000 إيميل شهرياً", en: "Manage 1000 emails monthly" },
      { ar: "دعم فني أساسي", en: "Basic technical support" },
      { ar: "تحليلات أساسية", en: "Basic analytics" },
      { ar: "واجهة واحدة", en: "Single interface" },
    ],
    popular: false,
  },
  {
    name: { ar: "المحترف", en: "Professional" },
    price: { ar: "299 ريال/شهر", en: "$79/month" },
    description: { ar: "للشركات المتوسطة", en: "For Medium Companies" },
    icon: Crown,
    features: [
      { ar: "إدارة غير محدودة للإيميلات", en: "Unlimited email management" },
      { ar: "خدمة عملاء متعددة المنصات", en: "Multi-platform customer service" },
      { ar: "تحليلات متقدمة", en: "Advanced analytics" },
      { ar: "إدارة الموظفين", en: "Employee management" },
      { ar: "دعم فني 24/7", en: "24/7 technical support" },
    ],
    popular: true,
  },
  {
    name: { ar: "المؤسسي", en: "Enterprise" },
    price: { ar: "حسب الطلب", en: "Custom" },
    description: { ar: "للشركات الكبيرة", en: "For Large Companies" },
    icon: Sparkles,
    features: [
      { ar: "جميع ميزات المحترف", en: "All Professional features" },
      { ar: "ذكاء اصطناعي مخصص", en: "Custom AI" },
      { ar: "تكامل مخصص", en: "Custom integrations" },
      { ar: "مدير حساب مخصص", en: "Dedicated account manager" },
      { ar: "تدريب فريق العمل", en: "Team training" },
    ],
    popular: false,
  },
]

export function PricingPreviewSection() {
  const { language } = useLanguage()

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              {language === "ar" ? "خطط الأسعار" : "Pricing Plans"}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              {language === "ar" ? "اختر الخطة" : "Choose the Plan"}
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                {language === "ar" ? "المناسبة لك" : "That Suits You"}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "ar"
                ? "خطط مرنة تناسب جميع أحجام الشركات مع إمكانية الترقية في أي وقت"
                : "Flexible plans suitable for all company sizes with upgrade options anytime"}
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <StaggerItem key={index}>
                <motion.div whileHover={{ y: -10, scale: 1.02 }} className="h-full relative">
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-primary to-purple-500 text-white px-4 py-1">
                        {language === "ar" ? "الأكثر شعبية" : "Most Popular"}
                      </Badge>
                    </div>
                  )}

                  <Card
                    className={`h-full ${plan.popular ? "border-primary/50 bg-primary/5" : "bg-card/50"} backdrop-blur-sm hover:bg-card/80 transition-all duration-300`}
                  >
                    <CardHeader className="text-center pb-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <plan.icon className="w-8 h-8 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{plan.name[language]}</CardTitle>
                      <div className="text-3xl font-bold text-primary">{plan.price[language]}</div>
                      <p className="text-muted-foreground">{plan.description[language]}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature[language]}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-6">
                        <Link href="/pricing">
                          <Button
                            className={`w-full ${plan.popular ? "bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90" : ""}`}
                            variant={plan.popular ? "default" : "outline"}
                          >
                            {language === "ar" ? "ابدأ الآن" : "Get Started"}
                            <ArrowLeft className="w-4 h-4 mr-2" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <ScrollReveal delay={0.6}>
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              {language === "ar" ? "تحتاج خطة مخصصة؟ تواصل معنا" : "Need a custom plan? Contact us"}
            </p>
            <Link href="/contact">
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                {language === "ar" ? "تواصل معنا" : "Contact Us"}
                <ArrowLeft className="w-4 h-4 mr-2" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
