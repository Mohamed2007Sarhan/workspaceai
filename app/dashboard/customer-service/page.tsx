"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Send, Phone, Mail, Globe, Bot, User, Clock, CheckCircle, Smile, Frown, Meh } from "lucide-react"

const conversations = [
  {
    id: 1,
    customer: "أحمد محمد",
    platform: "واتساب",
    status: "active",
    priority: "high",
    lastMessage: "أحتاج مساعدة في المنتج الجديد",
    time: "منذ 2 دقيقة",
    sentiment: "neutral",
    language: "ar",
  },
  {
    id: 2,
    customer: "Sarah Johnson",
    platform: "فيسبوك",
    status: "waiting",
    priority: "medium",
    lastMessage: "When will my order be delivered?",
    time: "منذ 15 دقيقة",
    sentiment: "negative",
    language: "en",
  },
  {
    id: 3,
    customer: "محمد علي",
    platform: "تويتر",
    status: "resolved",
    priority: "low",
    lastMessage: "شكراً لكم على الخدمة الممتازة",
    time: "منذ ساعة",
    sentiment: "positive",
    language: "ar",
  },
]

const messages = [
  {
    id: 1,
    sender: "customer",
    content: "السلام عليكم، أحتاج مساعدة في استخدام المنتج الجديد",
    time: "14:30",
    language: "ar",
  },
  {
    id: 2,
    sender: "ai",
    content: "وعليكم السلام ورحمة الله، أهلاً بك! سأكون سعيداً لمساعدتك. ما هي المشكلة التي تواجهها تحديداً؟",
    time: "14:31",
    language: "ar",
  },
  {
    id: 3,
    sender: "customer",
    content: "لا أستطيع تسجيل الدخول إلى حسابي",
    time: "14:32",
    language: "ar",
  },
  {
    id: 4,
    sender: "ai",
    content: "أفهم مشكلتك. دعني أساعدك في حل مشكلة تسجيل الدخول. هل جربت إعادة تعيين كلمة المرور؟",
    time: "14:33",
    language: "ar",
  },
]

export default function CustomerServicePage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Smile className="h-4 w-4 text-green-500" />
      case "negative":
        return <Frown className="h-4 w-4 text-red-500" />
      default:
        return <Meh className="h-4 w-4 text-yellow-500" />
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "واتساب":
        return <MessageSquare className="h-4 w-4 text-green-500" />
      case "فيسبوك":
        return <Globe className="h-4 w-4 text-blue-500" />
      case "تويتر":
        return <Globe className="h-4 w-4 text-sky-500" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">خدمة العملاء</h1>
          <p className="text-muted-foreground">إدارة محادثات العملاء من جميع المنصات</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline">
            <Bot className="w-4 h-4 ml-2" />
            إعدادات الذكاء الاصطناعي
          </Button>
          <Button className="animate-pulse-glow">
            <MessageSquare className="w-4 h-4 ml-2" />
            محادثة جديدة
          </Button>
        </div>
      </div>

      <Tabs defaultValue="conversations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="conversations">المحادثات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="templates">القوالب</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        {/* Conversations Tab */}
        <TabsContent value="conversations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">المحادثات النشطة</CardTitle>
                    <Badge variant="secondary">5 جديد</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`p-4 cursor-pointer hover:bg-accent transition-colors border-b border-border/50 ${
                          selectedConversation.id === conversation.id ? "bg-accent" : ""
                        }`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{conversation.customer.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{conversation.customer}</div>
                              <div className="flex items-center space-x-1 space-x-reverse">
                                {getPlatformIcon(conversation.platform)}
                                <span className="text-xs text-muted-foreground">{conversation.platform}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-1">
                            <div className="text-xs text-muted-foreground">{conversation.time}</div>
                            {getSentimentIcon(conversation.sentiment)}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {conversation.lastMessage}
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge
                            variant={
                              conversation.status === "active"
                                ? "default"
                                : conversation.status === "waiting"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {conversation.status === "active"
                              ? "نشط"
                              : conversation.status === "waiting"
                                ? "في الانتظار"
                                : "محلول"}
                          </Badge>
                          <Badge
                            variant={conversation.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {conversation.priority === "high" ? "عالي" : "متوسط"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col">
                <CardHeader className="border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Avatar>
                        <AvatarFallback>{selectedConversation.customer.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{selectedConversation.customer}</CardTitle>
                        <CardDescription className="flex items-center space-x-2 space-x-reverse">
                          {getPlatformIcon(selectedConversation.platform)}
                          <span>{selectedConversation.platform}</span>
                          <Badge variant="outline" className="text-xs">
                            {selectedConversation.language === "ar" ? "عربي" : "إنجليزي"}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button variant="outline" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "customer" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "customer"
                            ? "bg-muted text-foreground"
                            : message.sender === "ai"
                              ? "bg-primary/10 text-foreground border border-primary/20"
                              : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <div className="flex items-center space-x-2 space-x-reverse mb-1">
                          {message.sender === "ai" && <Bot className="h-4 w-4 text-primary" />}
                          {message.sender === "customer" && <User className="h-4 w-4" />}
                          <span className="text-xs opacity-70">{message.sender === "ai" ? "مساعد ذكي" : "العميل"}</span>
                        </div>
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className="text-xs opacity-70 mt-1 text-left">{message.time}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>

                {/* Message Input */}
                <div className="border-t border-border/50 p-4">
                  <div className="flex space-x-2 space-x-reverse">
                    <Input
                      placeholder="اكتب رسالتك هنا..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" variant="outline">
                        <Bot className="h-4 w-4 ml-1" />
                        اقتراح رد
                      </Button>
                      <Button size="sm" variant="outline">
                        قالب سريع
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">الذكاء الاصطناعي يساعد في الترجمة التلقائية</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="animate-float">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي المحادثات</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">+12% من الشهر الماضي</p>
              </CardContent>
            </Card>

            <Card className="animate-float" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">متوسط وقت الاستجابة</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3 دقيقة</div>
                <p className="text-xs text-muted-foreground">-15% تحسن</p>
              </CardContent>
            </Card>

            <Card className="animate-float" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">معدل الحل</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">+3% تحسن</p>
              </CardContent>
            </Card>

            <Card className="animate-float" style={{ animationDelay: "0.3s" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">رضا العملاء</CardTitle>
                <Smile className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8/5</div>
                <p className="text-xs text-muted-foreground">+0.2 نقطة</p>
              </CardContent>
            </Card>
          </div>

          {/* Platform Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>توزيع المحادثات حسب المنصة</CardTitle>
              <CardDescription>المحادثات في آخر 30 يوم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <MessageSquare className="h-4 w-4 text-green-500" />
                    <span>واتساب</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }} />
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Globe className="h-4 w-4 text-blue-500" />
                    <span>فيسبوك</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "30%" }} />
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Globe className="h-4 w-4 text-sky-500" />
                    <span>تويتر</span>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div className="bg-sky-500 h-2 rounded-full" style={{ width: "25%" }} />
                    </div>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
