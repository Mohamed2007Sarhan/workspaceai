"use client"

import { motion } from "framer-motion"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-animations"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Globe, Zap } from "lucide-react"
import { useLanguage } from "@/lib/providers"

const stats = [
  {
    icon: Users,
    number: "50,000+",
    label: { ar: "شركة تثق بنا", en: "Companies Trust Us" },
    description: { ar: "من جميع أنحاء العالم", en: "From Around the World" },
  },
  {
    icon: TrendingUp,
    number: "300%",
    label: { ar: "زيادة في الكفاءة", en: "Efficiency Increase" },
    description: { ar: "في المتوسط للشركات", en: "Average for Companies" },
  },
  {
    icon: Globe,
    number: "120+",
    label: { ar: "دولة", en: "Countries" },
    description: { ar: "نخدم عملاء فيها", en: "We Serve Clients In" },
  },
  {
    icon: Zap,
    number: "99.9%",
    label: { ar: "وقت التشغيل", en: "Uptime" },
    description: { ar: "موثوقية عالية", en: "High Reliability" },
  },
]

export function StatsSection() {
  const { language } = useLanguage()

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              {language === "ar" ? "إحصائيات مذهلة" : "Amazing Statistics"}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              {language === "ar" ? "أرقام تتحدث عن" : "Numbers That Speak"}
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                {language === "ar" ? "نجاحنا المستمر" : "Our Continued Success"}
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="text-center p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring" }}
                    className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <stat.icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-xl font-semibold mb-2">{stat.label[language]}</div>
                    <div className="text-muted-foreground">{stat.description[language]}</div>
                  </motion.div>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  )
}
