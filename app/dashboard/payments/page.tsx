"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Calendar, Download, DollarSign, TrendingUp } from "lucide-react"

const currentPlan = {
  name: "المتقدمة",
  price: 299,
  billing: "شهرياً",
  nextBilling: "2025-02-15",
  status: "نشط",
}

const paymentHistory = [
  {
    id: "INV-2025-001",
    date: "2025-01-15",
    amount: 299,
    status: "مدفوع",
    description: "اشتراك شهري - خطة المتقدمة",
  },
  {
    id: "INV-2024-012",
    date: "2024-12-15",
    amount: 299,
    status: "مدفوع",
    description: "اشتراك شهري - خطة المتقدمة",
  },
  {
    id: "INV-2024-011",
    date: "2024-11-15",
    amount: 299,
    status: "مدفوع",
    description: "اشتراك شهري - خطة المتقدمة",
  },
]

const usageStats = [
  { label: "الإيميلات المُعالجة", value: "7,234", limit: "10,000", percentage: 72 },
  { label: "المستخدمين النشطين", value: "18", limit: "25", percentage: 72 },
  { label: "التخزين المستخدم", value: "45 GB", limit: "100 GB", percentage: 45 },
  { label: "استعلامات الذكاء الاصطناعي", value: "2,156", limit: "5,000", percentage: 43 },
]

export default function PaymentsPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مدفوع":
        return "bg-green-500/20 text-green-300 border-green-500/30"
      case "معلق":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
      case "متأخر":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">المدفوعات والفوترة</h1>
        <p className="text-muted-foreground">إدارة اشتراكك ومراجعة تاريخ المدفوعات</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            الخطة الحالية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">الخطة</p>
              <p className="text-2xl font-bold">{currentPlan.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">السعر</p>
              <p className="text-2xl font-bold">${currentPlan.price}</p>
              <p className="text-sm text-muted-foreground">{currentPlan.billing}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الفوترة التالية</p>
              <p className="text-lg font-semibold">{currentPlan.nextBilling}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">الحالة</p>
              <Badge className="bg-green-500/20 text-green-300 border-green-500/30">{currentPlan.status}</Badge>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Button>ترقية الخطة</Button>
            <Button variant="outline">تغيير طريقة الدفع</Button>
            <Button variant="outline">إلغاء الاشتراك</Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="usage" className="space-y-6">
        <TabsList>
          <TabsTrigger value="usage">الاستخدام</TabsTrigger>
          <TabsTrigger value="history">تاريخ المدفوعات</TabsTrigger>
          <TabsTrigger value="billing">معلومات الفوترة</TabsTrigger>
        </TabsList>

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                استخدام الخطة الحالية
              </CardTitle>
              <CardDescription>مراجعة استخدامك للميزات في الشهر الحالي</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {usageStats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{stat.label}</span>
                      <span className="text-sm text-muted-foreground">
                        {stat.value} / {stat.limit}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.percentage}% من الحد المسموح</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                تاريخ المدفوعات
              </CardTitle>
              <CardDescription>جميع المعاملات والفواتير السابقة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-sm text-muted-foreground">{payment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">${payment.amount}</p>
                        <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        تحميل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Info Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>معلومات الفوترة</CardTitle>
              <CardDescription>إدارة طرق الدفع ومعلومات الفوترة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">طريقة الدفع</h4>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <CreditCard className="w-8 h-8 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">انتهاء الصلاحية: 12/27</p>
                  </div>
                  <Button variant="outline" size="sm">
                    تعديل
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">عنوان الفوترة</h4>
                <div className="p-4 border rounded-lg">
                  <p className="font-medium">شركة التقنية المتقدمة</p>
                  <p className="text-sm text-muted-foreground">
                    الرياض، المملكة العربية السعودية
                    <br />
                    الرمز البريدي: 12345
                  </p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    تعديل العنوان
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
