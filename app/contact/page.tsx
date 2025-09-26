"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    details: "support@aibusiness.com",
    description: "للاستفسارات العامة والدعم الفني",
  },
  {
    icon: Phone,
    title: "الهاتف",
    details: "+966 11 123 4567",
    description: "متاح من الأحد إلى الخميس، 9 صباحاً - 6 مساءً",
  },
  {
    icon: MapPin,
    title: "العنوان",
    details: "الرياض، المملكة العربية السعودية",
    description: "مركز الملك عبدالله المالي",
  },
  {
    icon: Clock,
    title: "ساعات العمل",
    details: "الأحد - الخميس",
    description: "9:00 صباحاً - 6:00 مساءً (GMT+3)",
  },
]

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">تواصل معنا</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            نحن هنا
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              لمساعدتك
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto text-pretty">
            لديك سؤال أو تحتاج مساعدة؟ فريقنا جاهز للإجابة على جميع استفساراتك ومساعدتك في رحلتك مع الذكاء الاصطناعي
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">أرسل لنا رسالة</CardTitle>
              <CardDescription className="text-slate-400">املأ النموذج وسنتواصل معك في أقرب وقت ممكن</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">تم إرسال رسالتك بنجاح!</h3>
                  <p className="text-slate-300">سنتواصل معك خلال 24 ساعة</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white">
                        الاسم الأول
                      </Label>
                      <Input
                        id="firstName"
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="أحمد"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white">
                        الاسم الأخير
                      </Label>
                      <Input
                        id="lastName"
                        required
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="محمد"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white">
                      البريد الإلكتروني
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="ahmed@company.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-white">
                      اسم الشركة
                    </Label>
                    <Input
                      id="company"
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="شركة التقنية المتقدمة"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-white">
                      نوع الاستفسار
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="اختر نوع الاستفسار" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">المبيعات</SelectItem>
                        <SelectItem value="support">الدعم الفني</SelectItem>
                        <SelectItem value="partnership">الشراكات</SelectItem>
                        <SelectItem value="general">استفسار عام</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white">
                      الرسالة
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={5}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    إرسال الرسالة
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white">معلومات التواصل</CardTitle>
                <CardDescription className="text-slate-400">طرق مختلفة للتواصل معنا</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">{info.title}</h4>
                        <p className="text-purple-300 font-medium mb-1">{info.details}</p>
                        <p className="text-slate-400 text-sm">{info.description}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-white">هل تبحث عن إجابة سريعة؟</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-slate-300 mb-4">قد تجد إجابتك في قسم الأسئلة الشائعة أو مركز المساعدة</p>
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    className="justify-start border-slate-600 text-white bg-transparent hover:bg-slate-700"
                  >
                    الأسئلة الشائعة
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start border-slate-600 text-white bg-transparent hover:bg-slate-700"
                  >
                    مركز المساعدة
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start border-slate-600 text-white bg-transparent hover:bg-slate-700"
                  >
                    الوثائق التقنية
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
