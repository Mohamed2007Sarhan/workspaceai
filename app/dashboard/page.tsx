"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AnalyticsWidget } from "@/components/analytics-widget"
import { Mail, MessageSquare, Users, Brain, BarChart3 } from "lucide-react"

const stats = [
  {
    title: "إجمالي الإيميلات",
    value: "2,847",
    change: "+12.5%",
    trend: "up" as const,
    data: [{ value: 2400 }, { value: 2600 }, { value: 2800 }, { value: 2847 }],
  },
  {
    title: "استفسارات العملاء",
    value: "1,234",
    change: "+8.2%",
    trend: "up" as const,
    data: [{ value: 1100 }, { value: 1200 }, { value: 1250 }, { value: 1234 }],
  },
  {
    title: "الموظفين النشطين",
    value: "45",
    change: "+2",
    trend: "up" as const,
  },
  {
    title: "الإيرادات الشهرية",
    value: "$12,847",
    change: "-3.1%",
    trend: "down" as const,
    data: [{ value: 13000 }, { value: 13200 }, { value: 12900 }, { value: 12847 }],
  },
]

const recentActivities = [
  {
    title: "تم إرسال حملة إيميل جديدة",
    description: "حملة العروض الشهرية",
    time: "منذ 5 دقائق",
    type: "email",
  },
  {
    title: "استفسار عميل جديد",
    description: "عميل يسأل عن الأسعار",
    time: "منذ 15 دقيقة",
    type: "support",
  },
  {
    title: "تم إضافة موظف جديد",
    description: "سارة أحمد - مطورة واجهات",
    time: "منذ ساعة",
    type: "employee",
  },
  {
    title: "تحديث العلامة التجارية",
    description: "تم رفع لوجو جديد",
    time: "منذ ساعتين",
    type: "brand",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold">مرحباً، أحمد محمد</h1>
        <p className="text-muted-foreground">إليك نظرة عامة على أداء شركتك اليوم</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <AnalyticsWidget
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            data={stat.data}
            className="animate-float"
            style={{ animationDelay: `${index * 0.1}s` } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>الإجراءات السريعة</CardTitle>
            <CardDescription>المهام الأكثر استخداماً</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Mail className="h-4 w-4 ml-2" />
              إنشاء حملة إيميل جديدة
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <MessageSquare className="h-4 w-4 ml-2" />
              الرد على استفسارات العملاء
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <Users className="h-4 w-4 ml-2" />
              إضافة موظف جديد
            </Button>
            <Button className="w-full justify-start bg-transparent" variant="outline">
              <BarChart3 className="h-4 w-4 ml-2" />
              عرض التقارير التفصيلية
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>النشاطات الأخيرة</CardTitle>
            <CardDescription>آخر التحديثات في نظامك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4 space-x-reverse">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-l from-primary/10 to-purple-500/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 ml-2 text-primary" />
                رؤى الذكاء الاصطناعي
              </CardTitle>
              <CardDescription>اقتراحات مخصصة لتحسين أداء شركتك</CardDescription>
            </div>
            <Badge variant="secondary">جديد</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-card/50 rounded-lg p-4">
            <h4 className="font-medium mb-2">💡 اقتراح لتحسين معدل الاستجابة</h4>
            <p className="text-sm text-muted-foreground mb-3">
              لاحظنا أن معدل الاستجابة لإيميلاتك انخفض بنسبة 15%. ننصح بإرسال الإيميلات في الساعة 10 صباحاً لزيادة
              التفاعل.
            </p>
            <Button size="sm" variant="outline">
              تطبيق الاقتراح
            </Button>
          </div>
          <div className="bg-card/50 rounded-lg p-4">
            <h4 className="font-medium mb-2">📈 فرصة لزيادة المبيعات</h4>
            <p className="text-sm text-muted-foreground mb-3">
              العملاء الذين تفاعلوا مع منتجك الأخير يظهرون اهتماماً بمنتجات مشابهة. ننصح بحملة تسويقية مستهدفة.
            </p>
            <Button size="sm" variant="outline">
              إنشاء حملة
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
