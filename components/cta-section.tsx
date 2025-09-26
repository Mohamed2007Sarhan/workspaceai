"use client"

import { motion } from "framer-motion"
import { ScrollReveal } from "@/components/scroll-animations"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles, Rocket } from "lucide-react"
import { useLanguage } from "@/lib/providers"
import Link from "next/link"

export function CTASection() {
  const { language } = useLanguage()

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1)_0%,transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center"
            >
              <Rocket className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              {language === "ar" ? "جاهز لتحويل" : "Ready to Transform"}
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                {language === "ar" ? "شركتك؟" : "Your Business?"}
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              {language === "ar"
                ? "انضم إلى آلاف الشركات التي تستخدم منصتنا لتحسين كفاءتها وزيادة أرباحها"
                : "Join thousands of companies using our platform to improve efficiency and increase profits"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/register">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                  >
                    <Sparkles className="w-5 h-5 ml-2" />
                    {language === "ar" ? "ابدأ مجاناً الآن" : "Start Free Now"}
                  </Button>
                </motion.div>
              </Link>

              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                    <ArrowLeft className="w-5 h-5 ml-2" />
                    {language === "ar" ? "تحدث مع خبير" : "Talk to Expert"}
                  </Button>
                </motion.div>
              </Link>
            </div>

            <div className="mt-8 text-sm text-muted-foreground">
              {language === "ar"
                ? "✨ لا حاجة لبطاقة ائتمان • إعداد في دقائق • دعم مجاني"
                : "✨ No credit card required • Setup in minutes • Free support"}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
