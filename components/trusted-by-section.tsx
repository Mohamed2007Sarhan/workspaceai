"use client"

import { Badge } from "@/components/ui/badge"

const companies = [
  "شركة التقنية المتقدمة",
  "مؤسسة الابتكار",
  "شركة المستقبل",
  "مجموعة النجاح",
  "شركة الرؤية",
  "مؤسسة التميز",
  "شركة الإبداع",
  "مجموعة التطوير",
]

export function TrustedBySection() {
  return (
    <section className="py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            يثق بنا أكثر من 10,000 شركة
          </Badge>
          <h3 className="text-2xl font-semibold text-muted-foreground">الشركات الرائدة تختار منصتنا</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="text-center opacity-60 hover:opacity-100 transition-opacity duration-300 animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg p-4">
                <p className="font-semibold text-sm">{company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
