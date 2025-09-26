"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lightbulb, Code, CheckCircle, Users, Star, Bot, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer"

const existingRequests = [
  {
    id: 1,
    title: "إضافة تكامل مع WhatsApp Business",
    description: "إمكانية الرد التلقائي على رسائل WhatsApp",
    votes: 156,
    status: "قيد التطوير",
    priority: "عالية",
    category: "تكامل",
  },
  {
    id: 2,
    title: "تحليلات متقدمة للمبيعات",
    description: "رسوم بيانية أكثر تفصيلاً وتنبؤات ذكية",
    votes: 89,
    status: "مخطط لها",
    priority: "متوسطة",
    category: "تحليلات",
  },
  {
    id: 3,
    title: "تطبيق موبايل",
    description: "تطبيق iOS و Android للوصول السريع",
    votes: 234,
    status: "قيد المراجعة",
    priority: "عالية",
    category: "منصة",
  },
]

export default function FeatureRequestPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedFeature, setGeneratedFeature] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  const handleAIGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setGeneratedFeature(`
// تم إنشاء هذه الميزة بواسطة الذكاء الاصطناعي

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function CustomFeature() {
  const [data, setData] = useState([])
  
  useEffect(() => {
    // جلب البيانات من API
    fetchData()
  }, [])
  
  const fetchData = async () => {
    // منطق جلب البيانات
  }
  
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">الميزة المخصصة</h2>
      {/* محتوى الميزة */}
    </Card>
  )
}
    `)
    setIsGenerating(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "قيد التطوير":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "مخطط لها":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "قيد المراجعة":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "عالية":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      case "متوسطة":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30"
      case "منخفضة":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 border-purple-500/30">طلب ميزة جديدة</Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            شاركنا
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> أفكارك</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto text-pretty">
            اقترح ميزات جديدة أو دع الذكاء الاصطناعي ينشئها لك تلقائياً بناءً على احتياجاتك
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Feature Request Form */}
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Lightbulb className="w-6 h-6" />
                اقتراح ميزة جديدة
              </CardTitle>
              <CardDescription className="text-slate-400">صف الميزة التي تريدها وسنعمل على تطويرها</CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">تم إرسال الاقتراح بنجاح!</h3>
                  <p className="text-slate-300">رقم الطلب: #FR-2024-001</p>
                  <p className="text-slate-400 mt-2">سنراجع اقتراحك ونبدأ التطوير قريباً</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="featureTitle" className="text-white">
                      عنوان الميزة
                    </Label>
                    <Input
                      id="featureTitle"
                      required
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="مثال: تكامل مع Slack"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category" className="text-white">
                        الفئة
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="اختر الفئة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="integration">تكامل</SelectItem>
                          <SelectItem value="analytics">تحليلات</SelectItem>
                          <SelectItem value="ui">واجهة المستخدم</SelectItem>
                          <SelectItem value="ai">ذكاء اصطناعي</SelectItem>
                          <SelectItem value="automation">أتمتة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="priority" className="text-white">
                        الأولوية
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="اختر الأولوية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">عالية</SelectItem>
                          <SelectItem value="medium">متوسطة</SelectItem>
                          <SelectItem value="low">منخفضة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-white">
                      وصف الميزة
                    </Label>
                    <Textarea
                      id="description"
                      required
                      rows={4}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="اشرح الميزة المطلوبة بالتفصيل وكيف ستساعد في تحسين عملك..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="useCase" className="text-white">
                      حالة الاستخدام
                    </Label>
                    <Textarea
                      id="useCase"
                      rows={3}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="متى وكيف ستستخدم هذه الميزة؟"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    إرسال الاقتراح
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* AI Feature Generator */}
          <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <Bot className="w-6 h-6" />
                مولد الميزات بالذكاء الاصطناعي
              </CardTitle>
              <CardDescription className="text-slate-400">
                دع الذكاء الاصطناعي ينشئ الكود والملفات تلقائياً
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="aiPrompt" className="text-white">
                  اطلب من الذكاء الاصطناعي
                </Label>
                <Textarea
                  id="aiPrompt"
                  rows={3}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="مثال: أريد ميزة لتتبع أداء الموظفين مع رسوم بيانية تفاعلية..."
                />
              </div>

              <Button
                onClick={handleAIGenerate}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    جاري الإنشاء...
                  </>
                ) : (
                  <>
                    <Code className="w-4 h-4 mr-2" />
                    إنشاء الميزة تلقائياً
                  </>
                )}
              </Button>

              {generatedFeature && (
                <div className="mt-4">
                  <Label className="text-white">الكود المُنشأ:</Label>
                  <div className="bg-slate-900 rounded-lg p-4 mt-2 overflow-x-auto">
                    <pre className="text-green-400 text-sm">
                      <code>{generatedFeature}</code>
                    </pre>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      تطبيق الميزة
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-white bg-transparent">
                      تحميل الملفات
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Existing Feature Requests */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">الميزات المطلوبة حالياً</h2>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {existingRequests.map((request) => (
              <Card
                key={request.id}
                className="border-slate-700 bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all"
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    <Badge className={getPriorityColor(request.priority)}>{request.priority}</Badge>
                  </div>
                  <CardTitle className="text-lg text-white">{request.title}</CardTitle>
                  <CardDescription className="text-slate-400">{request.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300 text-sm">{request.votes} صوت</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                    >
                      <Star className="w-4 h-4 mr-1" />
                      صوت
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
