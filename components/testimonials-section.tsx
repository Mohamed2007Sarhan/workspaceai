"use client"

import { motion } from "framer-motion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-animations"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Quote } from "lucide-react"
import { useLanguage } from "@/lib/providers"

const testimonials = [
  {
    name: { ar: "أحمد محمد", en: "Ahmed Mohammed" },
    role: { ar: "الرئيس التنفيذي", en: "CEO" },
    company: { ar: "شركة التقنية المتقدمة", en: "Advanced Tech Company" },
    content: {
      ar: "منصة رائعة غيرت طريقة عملنا بالكامل. الذكاء الاصطناعي يوفر علينا ساعات من العمل يومياً",
      en: "Amazing platform that completely changed how we work. AI saves us hours of work daily",
    },
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
  {
    name: { ar: "فاطمة العلي", en: "Fatima Al-Ali" },
    role: { ar: "مديرة التسويق", en: "Marketing Director" },
    company: { ar: "مجموعة الابتكار", en: "Innovation Group" },
    content: {
      ar: "خدمة العملاء أصبحت أكثر فعالية بـ 400%. عملاؤنا سعداء جداً بالاستجابة السريعة",
      en: "Customer service became 400% more effective. Our customers are very happy with the quick response",
    },
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
  {
    name: { ar: "خالد السعيد", en: "Khalid Al-Saeed" },
    role: { ar: "مدير العمليات", en: "Operations Manager" },
    company: { ar: "شركة المستقبل", en: "Future Company" },
    content: {
      ar: "التحليلات والتقارير تساعدنا في اتخاذ قرارات أفضل. النتائج فاقت توقعاتنا بكثير",
      en: "Analytics and reports help us make better decisions. Results exceeded our expectations by far",
    },
    rating: 5,
    avatar: "/placeholder-user.jpg",
  },
]

export function TestimonialsSection() {
  const { language } = useLanguage()

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              {language === "ar" ? "آراء العملاء" : "Customer Reviews"}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              {language === "ar" ? "ماذا يقول" : "What Our"}
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                {language === "ar" ? "عملاؤنا عنا" : "Customers Say"}
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {language === "ar"
                ? "اكتشف كيف ساعدت منصتنا آلاف الشركات في تحقيق أهدافها"
                : "Discover how our platform helped thousands of companies achieve their goals"}
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <motion.div whileHover={{ y: -10 }} className="h-full">
                  <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-primary/30" />
                      </div>

                      <p className="text-lg mb-6 leading-relaxed">"{testimonial.content[language]}"</p>

                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{testimonial.name[language].charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{testimonial.name[language]}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role[language]} - {testimonial.company[language]}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
