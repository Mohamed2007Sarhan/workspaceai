import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Users, Target, Globe, Zap } from "lucide-react"

const team = [
  {
    name: "أحمد محمد",
    role: "الرئيس التنفيذي",
    image: "/user-avatar.jpg",
    description: "خبير في الذكاء الاصطناعي مع أكثر من 15 عاماً في التقنية",
  },
  {
    name: "فاطمة أحمد",
    role: "مديرة التقنية",
    image: "/user-avatar.jpg",
    description: "متخصصة في تطوير الأنظمة الذكية والتعلم الآلي",
  },
  {
    name: "محمد علي",
    role: "مدير المنتج",
    image: "/user-avatar.jpg",
    description: "خبير في تجربة المستخدم وتطوير المنتجات التقنية",
  },
]

const values = [
  {
    icon: Brain,
    title: "الابتكار",
    description: "نسعى دائماً لتطوير حلول مبتكرة تواكب أحدث التقنيات",
  },
  {
    icon: Users,
    title: "التعاون",
    description: "نؤمن بقوة العمل الجماعي وبناء شراكات قوية مع عملائنا",
  },
  {
    icon: Target,
    title: "التميز",
    description: "نلتزم بتقديم أعلى مستويات الجودة في جميع خدماتنا",
  },
  {
    icon: Globe,
    title: "الشمولية",
    description: "نصمم حلولاً تخدم الشركات من جميع الأحجام والقطاعات",
  },
]

const stats = [
  { number: "10,000+", label: "شركة تثق بنا" },
  { number: "50M+", label: "إيميل تم معالجته" },
  { number: "99.9%", label: "وقت التشغيل" },
  { number: "24/7", label: "دعم فني" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">من نحن</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            نحن نبني
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              مستقبل الأعمال
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto text-pretty">
            منصة الذكاء الاصطناعي الرائدة التي تساعد الشركات على أتمتة عملياتها وتحسين كفاءتها باستخدام أحدث التقنيات
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-slate-700 bg-slate-800/50 backdrop-blur-sm text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-slate-300">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission */}
        <div className="mb-16">
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-white mb-4">مهمتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-slate-300 text-center max-w-4xl mx-auto leading-relaxed">
                نسعى لتمكين الشركات من جميع الأحجام من الاستفادة من قوة الذكاء الاصطناعي لتحسين عملياتها وزيادة
                إنتاجيتها. نؤمن أن التقنية يجب أن تكون في خدمة الإنسان، ولذلك نصمم حلولاً سهلة الاستخدام وقوية في الأداء.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">قيمنا</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card
                  key={index}
                  className="border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all"
                >
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-white">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">فريق العمل</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all"
              >
                <CardHeader className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{member.name.charAt(0)}</span>
                  </div>
                  <CardTitle className="text-xl text-white">{member.name}</CardTitle>
                  <CardDescription className="text-purple-300">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm max-w-2xl mx-auto">
            <CardHeader>
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white">انضم إلى رحلة التحول الرقمي</CardTitle>
              <CardDescription className="text-slate-400">
                ابدأ رحلتك مع الذكاء الاصطناعي اليوم واكتشف كيف يمكن لمنصتنا تحويل أعمالك
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
