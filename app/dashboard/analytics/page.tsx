"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Activity,
  Brain,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

// Sample data for charts
const revenueData = [
  { month: "يناير", revenue: 45000, expenses: 32000, profit: 13000 },
  { month: "فبراير", revenue: 52000, expenses: 35000, profit: 17000 },
  { month: "مارس", revenue: 48000, expenses: 33000, profit: 15000 },
  { month: "أبريل", revenue: 61000, expenses: 38000, profit: 23000 },
  { month: "مايو", revenue: 55000, expenses: 36000, profit: 19000 },
  { month: "يونيو", revenue: 67000, expenses: 41000, profit: 26000 },
]

const customerData = [
  { month: "يناير", new: 120, returning: 340, total: 460 },
  { month: "فبراير", new: 150, returning: 380, total: 530 },
  { month: "مارس", new: 180, returning: 420, total: 600 },
  { month: "أبريل", new: 200, returning: 450, total: 650 },
  { month: "مايو", new: 170, returning: 480, total: 650 },
  { month: "يونيو", new: 220, returning: 520, total: 740 },
]

const platformData = [
  { name: "واتساب", value: 45, color: "#25D366" },
  { name: "فيسبوك", value: 30, color: "#1877F2" },
  { name: "تويتر", value: 15, color: "#1DA1F2" },
  { name: "إيميل", value: 10, color: "#EA4335" },
]

const performanceData = [
  { metric: "معدل الاستجابة", current: 94, target: 95, trend: "up" },
  { metric: "رضا العملاء", current: 4.8, target: 4.5, trend: "up" },
  { metric: "معدل التحويل", current: 12.5, target: 15, trend: "down" },
  { metric: "متوسط قيمة الطلب", current: 850, target: 800, trend: "up" },
]

const aiInsights = [
  {
    title: "زيادة في المبيعات متوقعة",
    description: "بناءً على البيانات الحالية، نتوقع زيادة 15% في المبيعات الشهر القادم",
    impact: "high",
    action: "تحسين المخزون",
  },
  {
    title: "انخفاض في معدل الاستجابة",
    description: "لوحظ انخفاض طفيف في معدل الاستجابة لخدمة العملاء",
    impact: "medium",
    action: "تدريب إضافي للفريق",
  },
  {
    title: "فرصة تسويقية جديدة",
    description: "العملاء في الفئة العمرية 25-35 يظهرون اهتماماً متزايداً بالمنتج الجديد",
    impact: "high",
    action: "حملة تسويقية مستهدفة",
  },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">التحليلات والتقارير</h1>
          <p className="text-muted-foreground">رؤى شاملة لأداء شركتك مع اقتراحات الذكاء الاصطناعي</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">آخر 7 أيام</SelectItem>
              <SelectItem value="30days">آخر 30 يوم</SelectItem>
              <SelectItem value="90days">آخر 3 أشهر</SelectItem>
              <SelectItem value="1year">آخر سنة</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
          <Button className="animate-pulse-glow">
            <Calendar className="w-4 h-4 ml-2" />
            تقرير مخصص
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="animate-float">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$328,000</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="h-4 w-4 ml-1" />
              <span>+12.5%</span>
              <span className="text-muted-foreground mr-1">من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-float" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">العملاء النشطين</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="h-4 w-4 ml-1" />
              <span>+8.2%</span>
              <span className="text-muted-foreground mr-1">من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-float" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل التحويل</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <div className="flex items-center text-xs text-red-500">
              <ArrowDownRight className="h-4 w-4 ml-1" />
              <span>-2.1%</span>
              <span className="text-muted-foreground mr-1">من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card className="animate-float" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">رضا العملاء</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <div className="flex items-center text-xs text-green-500">
              <ArrowUpRight className="h-4 w-4 ml-1" />
              <span>+0.3</span>
              <span className="text-muted-foreground mr-1">من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="revenue">الإيرادات</TabsTrigger>
          <TabsTrigger value="customers">العملاء</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
          <TabsTrigger value="ai-insights">رؤى الذكاء الاصطناعي</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>الإيرادات والأرباح</CardTitle>
                <CardDescription>مقارنة الإيرادات والمصروفات والأرباح</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" name="الإيرادات" />
                    <Bar dataKey="expenses" fill="hsl(var(--muted))" name="المصروفات" />
                    <Bar dataKey="profit" fill="hsl(var(--chart-2))" name="الأرباح" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Platform Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>توزيع العملاء حسب المنصة</CardTitle>
                <CardDescription>نسبة التفاعل من كل منصة</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>مؤشرات الأداء الرئيسية</CardTitle>
              <CardDescription>مقارنة الأداء الحالي مع الأهداف المحددة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {performanceData.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="text-2xl font-bold">
                      {typeof metric.current === "number" && metric.current < 10
                        ? metric.current.toFixed(1)
                        : metric.current}
                      {metric.metric.includes("رضا") ? "" : metric.metric.includes("معدل") ? "%" : ""}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      الهدف: {metric.target}
                      {metric.metric.includes("رضا") ? "" : metric.metric.includes("معدل") ? "%" : ""}
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          metric.current >= metric.target ? "bg-green-500" : "bg-yellow-500"
                        }`}
                        style={{
                          width: `${Math.min((metric.current / metric.target) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليل الإيرادات التفصيلي</CardTitle>
              <CardDescription>تتبع الإيرادات والنمو عبر الوقت</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.6}
                    name="الإيرادات"
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stackId="2"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.6}
                    name="الأرباح"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليل العملاء</CardTitle>
              <CardDescription>نمو قاعدة العملاء والعملاء الجدد مقابل العائدين</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={customerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    name="إجمالي العملاء"
                  />
                  <Line type="monotone" dataKey="new" stroke="hsl(var(--chart-2))" strokeWidth={2} name="عملاء جدد" />
                  <Line
                    type="monotone"
                    dataKey="returning"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    name="عملاء عائدون"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="ai-insights" className="space-y-6">
          <Card className="bg-gradient-to-l from-primary/10 to-purple-500/10 border-primary/20">
            <CardHeader>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Brain className="h-6 w-6 text-primary" />
                <CardTitle>رؤى الذكاء الاصطناعي</CardTitle>
                <Badge variant="secondary">محدث</Badge>
              </div>
              <CardDescription>تحليلات ذكية واقتراحات لتحسين أداء شركتك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className="bg-card/50 rounded-lg p-4 border border-border/50 animate-float"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Brain className="h-5 w-5 text-primary" />
                      <h4 className="font-semibold">{insight.title}</h4>
                    </div>
                    <Badge
                      variant={
                        insight.impact === "high"
                          ? "destructive"
                          : insight.impact === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {insight.impact === "high"
                        ? "تأثير عالي"
                        : insight.impact === "medium"
                          ? "تأثير متوسط"
                          : "تأثير منخفض"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">الإجراء المقترح: {insight.action}</span>
                    <Button size="sm" variant="outline">
                      تطبيق الاقتراح
                    </Button>
                  </div>
                </div>
              ))}

              {/* AI Predictions */}
              <Card className="bg-card/30">
                <CardHeader>
                  <CardTitle className="text-lg">التنبؤات الذكية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-green-500/10 rounded-lg">
                      <div className="text-2xl font-bold text-green-500">+18%</div>
                      <div className="text-sm text-muted-foreground">نمو متوقع في المبيعات</div>
                      <div className="text-xs text-muted-foreground mt-1">الشهر القادم</div>
                    </div>
                    <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                      <div className="text-2xl font-bold text-blue-500">2.1 دقيقة</div>
                      <div className="text-sm text-muted-foreground">تحسن وقت الاستجابة</div>
                      <div className="text-xs text-muted-foreground mt-1">الأسبوع القادم</div>
                    </div>
                    <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                      <div className="text-2xl font-bold text-purple-500">340</div>
                      <div className="text-sm text-muted-foreground">عملاء جدد متوقعين</div>
                      <div className="text-xs text-muted-foreground mt-1">هذا الشهر</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
