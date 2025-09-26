"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Users,
  Search,
  Filter,
  Mail,
  Phone,
  Calendar,
  Star,
  CheckCircle,
  UserPlus,
  FileText,
  BarChart3,
} from "lucide-react"

const employees = [
  {
    id: 1,
    name: "أحمد محمد",
    email: "ahmed@company.com",
    phone: "+966501234567",
    position: "مطور واجهات أمامية",
    department: "التطوير",
    status: "active",
    joinDate: "2023-01-15",
    salary: 8000,
    performance: 4.8,
    avatar: "/employee1.jpg",
    skills: ["React", "TypeScript", "CSS"],
    projects: 12,
  },
  {
    id: 2,
    name: "فاطمة علي",
    email: "fatima@company.com",
    phone: "+966507654321",
    position: "مديرة التسويق",
    department: "التسويق",
    status: "active",
    joinDate: "2022-08-20",
    salary: 12000,
    performance: 4.9,
    avatar: "/employee2.jpg",
    skills: ["التسويق الرقمي", "إدارة الحملات", "التحليلات"],
    projects: 8,
  },
  {
    id: 3,
    name: "محمد خالد",
    email: "mohamed@company.com",
    phone: "+966509876543",
    position: "مطور خلفي",
    department: "التطوير",
    status: "vacation",
    joinDate: "2023-03-10",
    salary: 9000,
    performance: 4.6,
    avatar: "/employee3.jpg",
    skills: ["Node.js", "Python", "قواعد البيانات"],
    projects: 15,
  },
]

const departments = [
  { name: "التطوير", count: 15, budget: 120000 },
  { name: "التسويق", count: 8, budget: 80000 },
  { name: "المبيعات", count: 12, budget: 90000 },
  { name: "الدعم الفني", count: 6, budget: 45000 },
]

const performanceData = [
  { month: "يناير", performance: 4.2 },
  { month: "فبراير", performance: 4.4 },
  { month: "مارس", performance: 4.6 },
  { month: "أبريل", performance: 4.7 },
  { month: "مايو", performance: 4.8 },
  { month: "يونيو", performance: 4.9 },
]

export default function EmployeesPage() {
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة الموظفين</h1>
          <p className="text-muted-foreground">إدارة شاملة للموظفين والأقسام والأداء</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline">
            <FileText className="w-4 h-4 ml-2" />
            تصدير التقرير
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="animate-pulse-glow">
                <UserPlus className="w-4 h-4 ml-2" />
                إضافة موظف جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>إضافة موظف جديد</DialogTitle>
                <DialogDescription>أدخل بيانات الموظف الجديد</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input id="name" placeholder="أدخل الاسم الكامل" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" placeholder="أدخل البريد الإلكتروني" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">المنصب</Label>
                  <Input id="position" placeholder="أدخل المنصب" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">القسم</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">التطوير</SelectItem>
                      <SelectItem value="marketing">التسويق</SelectItem>
                      <SelectItem value="sales">المبيعات</SelectItem>
                      <SelectItem value="support">الدعم الفني</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Button className="flex-1">إضافة الموظف</Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsAddDialogOpen(false)}>
                    إلغاء
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="employees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="employees">الموظفين</TabsTrigger>
          <TabsTrigger value="departments">الأقسام</TabsTrigger>
          <TabsTrigger value="performance">الأداء</TabsTrigger>
          <TabsTrigger value="recruitment">التوظيف</TabsTrigger>
        </TabsList>

        {/* Employees Tab */}
        <TabsContent value="employees" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="animate-float">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الموظفين</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">41</div>
                <p className="text-xs text-muted-foreground">+3 هذا الشهر</p>
              </CardContent>
            </Card>

            <Card className="animate-float" style={{ animationDelay: "0.1s" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">الموظفين النشطين</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">92.7% معدل الحضور</p>
              </CardContent>
            </Card>

            <Card className="animate-float" style={{ animationDelay: "0.2s" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">متوسط الأداء</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7</div>
                <p className="text-xs text-muted-foreground">من 5 نجوم</p>
              </CardContent>
            </Card>

            <Card className="animate-float" style={{ animationDelay: "0.3s" }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">إجمالي الرواتب</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$335K</div>
                <p className="text-xs text-muted-foreground">شهرياً</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Employee List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">قائمة الموظفين</CardTitle>
                    <Badge variant="secondary">{employees.length}</Badge>
                  </div>
                  <div className="flex space-x-2 space-x-reverse">
                    <div className="relative flex-1">
                      <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="البحث في الموظفين..."
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
                    {employees.map((employee) => (
                      <div
                        key={employee.id}
                        className={`p-4 cursor-pointer hover:bg-accent transition-colors border-b border-border/50 ${
                          selectedEmployee.id === employee.id ? "bg-accent" : ""
                        }`}
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={employee.avatar || "/placeholder.svg"} alt={employee.name} />
                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{employee.name}</div>
                            <div className="text-xs text-muted-foreground">{employee.position}</div>
                            <div className="flex items-center space-x-2 space-x-reverse mt-1">
                              <Badge
                                variant={
                                  employee.status === "active"
                                    ? "secondary"
                                    : employee.status === "vacation"
                                      ? "outline"
                                      : "destructive"
                                }
                                className="text-xs"
                              >
                                {employee.status === "active"
                                  ? "نشط"
                                  : employee.status === "vacation"
                                    ? "إجازة"
                                    : "غير نشط"}
                              </Badge>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-500 ml-1" />
                                <span className="text-xs">{employee.performance}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Employee Details */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedEmployee.avatar || "/placeholder.svg"} alt={selectedEmployee.name} />
                        <AvatarFallback className="text-lg">{selectedEmployee.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-xl">{selectedEmployee.name}</CardTitle>
                        <CardDescription className="text-base">{selectedEmployee.position}</CardDescription>
                        <div className="flex items-center space-x-2 space-x-reverse mt-1">
                          <Badge variant="secondary">{selectedEmployee.department}</Badge>
                          <Badge
                            variant={
                              selectedEmployee.status === "active"
                                ? "secondary"
                                : selectedEmployee.status === "vacation"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {selectedEmployee.status === "active"
                              ? "نشط"
                              : selectedEmployee.status === "vacation"
                                ? "إجازة"
                                : "غير نشط"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Contact Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedEmployee.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedEmployee.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>انضم في {selectedEmployee.joinDate}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">الراتب الشهري</span>
                        <span className="font-medium">${selectedEmployee.salary}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">تقييم الأداء</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 ml-1" />
                          <span className="font-medium">{selectedEmployee.performance}/5</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">المشاريع المكتملة</span>
                        <span className="font-medium">{selectedEmployee.projects}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="font-medium mb-2">المهارات</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 space-x-reverse">
                    <Button>تحديث البيانات</Button>
                    <Button variant="outline">عرض التقرير</Button>
                    <Button variant="outline">إرسال رسالة</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="animate-float" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-lg">{dept.name}</CardTitle>
                  <CardDescription>{dept.count} موظف</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-2xl font-bold">${dept.budget.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">الميزانية الشهرية</div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${(dept.count / 15) * 100}%` }} />
                  </div>
                  <Button size="sm" className="w-full">
                    عرض التفاصيل
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recruitment Tab */}
        <TabsContent value="recruitment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>نظام التوظيف الذكي</CardTitle>
              <CardDescription>اختبار وتقييم المرشحين بالذكاء الاصطناعي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-primary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">المرشحين الجدد</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary">24</div>
                    <p className="text-sm text-muted-foreground">في انتظار المراجعة</p>
                  </CardContent>
                </Card>

                <Card className="bg-green-500/10 border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">تم قبولهم</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-green-500">8</div>
                    <p className="text-sm text-muted-foreground">هذا الشهر</p>
                  </CardContent>
                </Card>

                <Card className="bg-blue-500/10 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-lg">في المقابلات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-blue-500">12</div>
                    <p className="text-sm text-muted-foreground">مرشح نشط</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">الوظائف المفتوحة</h4>
                <div className="space-y-3">
                  {[
                    { title: "مطور React", applications: 15, status: "نشط" },
                    { title: "مصمم UI/UX", applications: 8, status: "نشط" },
                    { title: "مدير مشروع", applications: 12, status: "مغلق" },
                  ].map((job, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h5 className="font-medium">{job.title}</h5>
                        <p className="text-sm text-muted-foreground">{job.applications} طلب توظيف</p>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Badge variant={job.status === "نشط" ? "secondary" : "outline"}>{job.status}</Badge>
                        <Button size="sm" variant="outline">
                          عرض الطلبات
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
