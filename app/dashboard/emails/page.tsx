"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Archive, Trash2, Star, Search, Filter, Plus, Bot, Clock, CheckCircle, AlertCircle } from "lucide-react"

const emails = [
  {
    id: 1,
    from: "أحمد محمد",
    email: "ahmed@example.com",
    subject: "استفسار عن المنتج الجديد",
    preview: "أود معرفة المزيد عن المنتج الجديد الذي أطلقتموه...",
    time: "منذ 5 دقائق",
    status: "unread",
    priority: "high",
    aiSuggestion: "يمكن الرد تلقائياً بمعلومات المنتج",
  },
  {
    id: 2,
    from: "فاطمة علي",
    email: "fatima@company.com",
    subject: "طلب عرض أسعار",
    preview: "نحتاج عرض أسعار للخدمات التي تقدمونها...",
    time: "منذ 15 دقيقة",
    status: "read",
    priority: "medium",
    aiSuggestion: "إرسال قائمة الأسعار المحدثة",
  },
  {
    id: 3,
    from: "محمد خالد",
    email: "mohamed@business.com",
    subject: "شكوى من الخدمة",
    preview: "لدي مشكلة في الخدمة المقدمة وأحتاج حل سريع...",
    time: "منذ ساعة",
    status: "replied",
    priority: "high",
    aiSuggestion: "تم الرد تلقائياً وتحويل للدعم الفني",
  },
]

const campaigns = [
  {
    id: 1,
    name: "حملة العروض الشهرية",
    status: "active",
    sent: 1250,
    opened: 890,
    clicked: 234,
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "إعلان المنتج الجديد",
    status: "draft",
    sent: 0,
    opened: 0,
    clicked: 0,
    date: "2024-01-20",
  },
  {
    id: 3,
    name: "نشرة أخبار الشركة",
    status: "completed",
    sent: 2100,
    opened: 1456,
    clicked: 567,
    date: "2024-01-10",
  },
]

export default function EmailsPage() {
  const [selectedEmail, setSelectedEmail] = useState(emails[0])
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة الإيميلات</h1>
          <p className="text-muted-foreground">إدارة ذكية للإيميلات مع الرد التلقائي</p>
        </div>
        <Button className="animate-pulse-glow">
          <Plus className="w-4 h-4 ml-2" />
          إنشاء حملة جديدة
        </Button>
      </div>

      <Tabs defaultValue="inbox" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inbox">صندوق الوارد</TabsTrigger>
          <TabsTrigger value="campaigns">الحملات</TabsTrigger>
          <TabsTrigger value="templates">القوالب</TabsTrigger>
          <TabsTrigger value="ai-assistant">المساعد الذكي</TabsTrigger>
        </TabsList>

        {/* Inbox Tab */}
        <TabsContent value="inbox" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Email List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">الرسائل الواردة</CardTitle>
                    <Badge variant="secondary">12 جديد</Badge>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <div className="relative flex-1">
                      <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث في الرسائل..."
                        className="pr-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {emails.map((email) => (
                      <div
                        key={email.id}
                        className={`p-4 cursor-pointer hover:bg-accent transition-colors border-b border-border/50 ${
                          selectedEmail.id === email.id ? "bg-accent" : ""
                        }`}
                        onClick={() => setSelectedEmail(email)}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <div className="font-medium text-sm">{email.from}</div>
                            {email.status === "unread" && <div className="w-2 h-2 bg-primary rounded-full" />}
                          </div>
                          <div className="text-xs text-muted-foreground">{email.time}</div>
                        </div>
                        <div className="text-sm font-medium mb-1">{email.subject}</div>
                        <div className="text-xs text-muted-foreground line-clamp-2">{email.preview}</div>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant={email.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                            {email.priority === "high" ? "عالي" : "متوسط"}
                          </Badge>
                          {email.status === "replied" && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Email Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedEmail.subject}</CardTitle>
                      <CardDescription>
                        من: {selectedEmail.from} ({selectedEmail.email})
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button variant="outline" size="icon">
                        <Star className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Content */}
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-sm leading-relaxed">
                      السلام عليكم ورحمة الله وبركاته،
                      <br />
                      <br />
                      {selectedEmail.preview} أرجو منكم تزويدي بالمعلومات التفصيلية والأسعار المتاحة. كما أود معرفة
                      إمكانية الحصول على عرض خاص للشركات.
                      <br />
                      <br />
                      في انتظار ردكم الكريم.
                      <br />
                      <br />
                      مع أطيب التحيات،
                      <br />
                      {selectedEmail.from}
                    </p>
                  </div>

                  {/* AI Suggestion */}
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <span className="font-medium text-primary">اقتراح الذكاء الاصطناعي</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{selectedEmail.aiSuggestion}</p>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm" className="bg-primary">
                        رد تلقائي
                      </Button>
                      <Button size="sm" variant="outline">
                        تخصيص الرد
                      </Button>
                    </div>
                  </div>

                  {/* Reply Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Send className="h-4 w-4" />
                      <span className="font-medium">الرد على الرسالة</span>
                    </div>
                    <textarea
                      className="w-full min-h-[120px] p-3 border border-border rounded-lg bg-background resize-none"
                      placeholder="اكتب ردك هنا..."
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2 space-x-reverse">
                        <Button>إرسال</Button>
                        <Button variant="outline">حفظ كمسودة</Button>
                      </div>
                      <Select defaultValue="template1">
                        <SelectTrigger className="w-48">
                          <SelectValue placeholder="اختر قالب" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="template1">رد شكر عام</SelectItem>
                          <SelectItem value="template2">معلومات المنتج</SelectItem>
                          <SelectItem value="template3">عرض أسعار</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="animate-float" style={{ animationDelay: `${campaign.id * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <Badge
                      variant={
                        campaign.status === "active"
                          ? "default"
                          : campaign.status === "completed"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {campaign.status === "active" ? "نشط" : campaign.status === "completed" ? "مكتمل" : "مسودة"}
                    </Badge>
                  </div>
                  <CardDescription>{campaign.date}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">{campaign.sent}</div>
                      <div className="text-xs text-muted-foreground">مُرسل</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">{campaign.opened}</div>
                      <div className="text-xs text-muted-foreground">مفتوح</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-500">{campaign.clicked}</div>
                      <div className="text-xs text-muted-foreground">نقرات</div>
                    </div>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <Button size="sm" className="flex-1">
                      عرض التفاصيل
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      تحرير
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* AI Assistant Tab */}
        <TabsContent value="ai-assistant" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 ml-2 text-primary" />
                مساعد الذكاء الاصطناعي للإيميلات
              </CardTitle>
              <CardDescription>مساعد ذكي لإدارة وتحسين حملات الإيميل</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AI Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">2.5 ساعة</div>
                  <div className="text-sm text-muted-foreground">وقت موفر يومياً</div>
                </div>
                <div className="bg-green-500/10 rounded-lg p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">89%</div>
                  <div className="text-sm text-muted-foreground">دقة الردود التلقائية</div>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-4 text-center">
                  <AlertCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-muted-foreground">رد تلقائي هذا الشهر</div>
                </div>
              </div>

              {/* AI Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg">الرد التلقائي الذكي</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      يحلل الذكاء الاصطناعي محتوى الرسائل الواردة ويقترح ردود مناسبة تلقائياً
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>الاستفسارات العامة</span>
                        <Badge variant="secondary">مفعل</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>طلبات الأسعار</span>
                        <Badge variant="secondary">مفعل</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>الشكاوى</span>
                        <Badge variant="outline">معطل</Badge>
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      إدارة الإعدادات
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50">
                  <CardHeader>
                    <CardTitle className="text-lg">تحليل المشاعر</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      يحلل مشاعر العملاء في الرسائل ويصنفها لتحسين جودة الخدمة
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>إيجابي</span>
                        <span className="text-green-500">67%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>محايد</span>
                        <span className="text-yellow-500">23%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>سلبي</span>
                        <span className="text-red-500">10%</span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      عرض التقرير التفصيلي
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
