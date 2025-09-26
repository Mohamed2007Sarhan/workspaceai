"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  FileText,
  Search,
  Send,
  Bot,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

const faqData = [
  {
    question: "كيف يمكنني البدء في استخدام المنصة؟",
    answer:
      "بعد التسجيل، ستحصل على جولة إرشادية تفاعلية تشرح لك جميع الميزات. يمكنك أيضاً مشاهدة الفيديوهات التعليمية أو التواصل مع فريق الدعم.",
  },
  {
    question: "هل يمكنني تغيير خطة الاشتراك؟",
    answer: "نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت من إعدادات الحساب. التغييرات ستطبق في دورة الفوترة التالية.",
  },
  {
    question: "كيف يعمل الذكاء الاصطناعي المخصص؟",
    answer:
      "يتعلم الذكاء الاصطناعي من بيانات شركتك ويتكيف مع احتياجاتك الخاصة. كلما استخدمته أكثر، كلما أصبح أكثر دقة وفعالية.",
  },
  {
    question: "هل بياناتي آمنة؟",
    answer: "نعم، نستخدم أعلى معايير الأمان مع تشفير end-to-end وامتثال كامل لمعايير GDPR و SOC 2.",
  },
]

const supportChannels = [
  {
    icon: MessageCircle,
    title: "الدردشة المباشرة",
    description: "تواصل فوري مع فريق الدعم",
    availability: "24/7",
    responseTime: "فوري",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Mail,
    title: "البريد الإلكتروني",
    description: "للاستفسارات المفصلة والتقنية",
    availability: "دائماً متاح",
    responseTime: "خلال ساعتين",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Phone,
    title: "المكالمات الهاتفية",
    description: "للدعم العاجل والمساعدة المباشرة",
    availability: "الأحد - الخميس",
    responseTime: "فوري",
    color: "from-green-500 to-emerald-500",
  },
]

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [ticketSubmitted, setTicketSubmitted] = useState(false)
  const [chatMessages, setChatMessages] = useState([{ type: "bot", message: "مرحباً! كيف يمكنني مساعدتك اليوم؟" }])
  const [newMessage, setNewMessage] = useState("")

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTicketSubmitted(true)
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    setChatMessages((prev) => [
      ...prev,
      { type: "user", message: newMessage },
      { type: "bot", message: "شكراً لك على رسالتك. سأقوم بمراجعة استفسارك والرد عليك في أقرب وقت ممكن." },
    ])
    setNewMessage("")
  }

  const filteredFAQ = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">مركز الدعم</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            كيف يمكننا
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              مساعدتك؟
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto text-pretty">
            فريق الدعم متاح 24/7 لمساعدتك في تحقيق أقصى استفادة من منصة الذكاء الاصطناعي
          </p>
        </div>

        <Tabs defaultValue="faq" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="faq" className="data-[state=active]:bg-purple-500">
              الأسئلة الشائعة
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-purple-500">
              تواصل معنا
            </TabsTrigger>
            <TabsTrigger value="ticket" className="data-[state=active]:bg-purple-500">
              إنشاء تذكرة
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-purple-500">
              الدردشة المباشرة
            </TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <BookOpen className="w-6 h-6" />
                  الأسئلة الشائعة
                </CardTitle>
                <CardDescription className="text-slate-400">
                  ابحث في قاعدة المعرفة للحصول على إجابات سريعة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <Input
                    placeholder="ابحث في الأسئلة الشائعة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white"
                  />
                </div>

                <div className="space-y-4">
                  {filteredFAQ.map((item, index) => (
                    <Card key={index} className="border-slate-600 bg-slate-700/50">
                      <CardHeader>
                        <CardTitle className="text-lg text-white">{item.question}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300">{item.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {supportChannels.map((channel, index) => {
                const Icon = channel.icon
                return (
                  <Card
                    key={index}
                    className="border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all"
                  >
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-lg bg-gradient-to-r ${channel.color} flex items-center justify-center mb-4`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className="text-xl text-white">{channel.title}</CardTitle>
                      <CardDescription className="text-slate-400">{channel.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300 text-sm">{channel.availability}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300 text-sm">وقت الاستجابة: {channel.responseTime}</span>
                      </div>
                      <Button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                        تواصل الآن
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Ticket Tab */}
          <TabsContent value="ticket" className="space-y-6">
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  إنشاء تذكرة دعم
                </CardTitle>
                <CardDescription className="text-slate-400">
                  أرسل استفسارك المفصل وسنرد عليك في أقرب وقت
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ticketSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">تم إرسال التذكرة بنجاح!</h3>
                    <p className="text-slate-300">رقم التذكرة: #SUP-2024-001</p>
                    <p className="text-slate-400 mt-2">سنتواصل معك خلال 24 ساعة</p>
                  </div>
                ) : (
                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-white">
                          الاسم الكامل
                        </Label>
                        <Input id="name" required className="bg-slate-700 border-slate-600 text-white" />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-white">
                          البريد الإلكتروني
                        </Label>
                        <Input id="email" type="email" required className="bg-slate-700 border-slate-600 text-white" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-white">
                        موضوع الاستفسار
                      </Label>
                      <Input id="subject" required className="bg-slate-700 border-slate-600 text-white" />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white">
                        تفاصيل المشكلة
                      </Label>
                      <Textarea
                        id="message"
                        required
                        rows={6}
                        className="bg-slate-700 border-slate-600 text-white"
                        placeholder="اشرح مشكلتك بالتفصيل..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      إرسال التذكرة
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center gap-2">
                  <Bot className="w-6 h-6" />
                  الدردشة المباشرة
                </CardTitle>
                <CardDescription className="text-slate-400">
                  تحدث مع مساعد الذكاء الاصطناعي أو فريق الدعم
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-slate-700/50 rounded-lg p-4 mb-4 overflow-y-auto">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`mb-4 flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.type === "user" ? "bg-purple-500 text-white" : "bg-slate-600 text-slate-100"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="اكتب رسالتك..."
                    className="bg-slate-700 border-slate-600 text-white"
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} className="bg-purple-500 hover:bg-purple-600">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  )
}
