import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Bot,
  Zap,
  Shield,
  Award,
  ArrowRight,
} from "lucide-react"

const footerLinks = {
  product: [
    { name: "الميزات", href: "/#features" },
    { name: "التسعير", href: "/pricing" },
    { name: "التحديثات", href: "/updates" },
    { name: "الأمان", href: "/security" },
  ],
  company: [
    { name: "من نحن", href: "/about" },
    { name: "المدونة", href: "/blog" },
    { name: "الوظائف", href: "/careers" },
    { name: "الشركاء", href: "/partners" },
  ],
  support: [
    { name: "مركز الدعم", href: "/support" },
    { name: "طلب ميزة", href: "/feature-request" },
    { name: "الوثائق", href: "/docs" },
    { name: "API", href: "/api-docs" },
  ],
  legal: [
    { name: "الخصوصية", href: "/privacy" },
    { name: "الشروط", href: "/terms" },
    { name: "ملفات تعريف الارتباط", href: "/cookies" },
    { name: "الامتثال", href: "/compliance" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

const certifications = [
  { icon: Shield, name: "SOC 2 Type II" },
  { icon: Award, name: "ISO 27001" },
  { icon: Zap, name: "GDPR Compliant" },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Bot className="w-8 h-8 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">ابق على اطلاع</h3>
            </div>
            <p className="text-slate-300 mb-6 text-lg">
              احصل على آخر التحديثات والميزات الجديدة مباشرة في بريدك الإلكتروني
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input placeholder="بريدك الإلكتروني" className="bg-slate-800 border-slate-700 text-white flex-1" />
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                اشترك الآن
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </div>
            <p className="text-slate-400 text-sm mt-3">لا رسائل مزعجة. يمكنك إلغاء الاشتراك في أي وقت.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">AI Business</span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              منصة الذكاء الاصطناعي الشاملة للأعمال. نساعد الشركات على أتمتة عملياتها وتحسين كفاءتها باستخدام أحدث
              تقنيات الذكاء الاصطناعي.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-5 h-5 text-purple-400" />
                <span>support@aibusiness.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-5 h-5 text-purple-400" />
                <span>+966 11 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <MapPin className="w-5 h-5 text-purple-400" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold">الشهادات والامتثال</h4>
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => {
                  const Icon = cert.icon
                  return (
                    <Badge key={index} className="bg-slate-800 text-slate-300 border-slate-700">
                      <Icon className="w-3 h-3 mr-1" />
                      {cert.name}
                    </Badge>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">المنتج</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-slate-300 hover:text-purple-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">الشركة</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-slate-300 hover:text-purple-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">الدعم</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-slate-300 hover:text-purple-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">قانوني</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-slate-300 hover:text-purple-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm">© 2025 AI Business Platform. جميع الحقوق محفوظة.</div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-slate-400 text-sm">تابعنا:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-purple-400 hover:bg-slate-700 transition-all"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
