"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Download,
  Eye,
  Search,
  Shield,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  ImageIcon,
  FileText,
  Globe,
  TrendingUp,
} from "lucide-react"

const brandAssets = [
  {
    id: 1,
    name: "الشعار الرئيسي",
    type: "logo",
    format: "SVG",
    size: "2.4 MB",
    lastModified: "2024-01-15",
    status: "approved",
    downloads: 245,
  },
  {
    id: 2,
    name: "شعار مبسط",
    type: "logo",
    format: "PNG",
    size: "1.8 MB",
    lastModified: "2024-01-10",
    status: "pending",
    downloads: 89,
  },
  {
    id: 3,
    name: "بطاقة العمل",
    type: "template",
    format: "PDF",
    size: "3.2 MB",
    lastModified: "2024-01-08",
    status: "approved",
    downloads: 156,
  },
]

const competitors = [
  {
    id: 1,
    name: "شركة المنافس الأول",
    domain: "competitor1.com",
    status: "active",
    similarity: 85,
    lastCheck: "منذ ساعة",
    alerts: 2,
  },
  {
    id: 2,
    name: "شركة المنافس الثاني",
    domain: "competitor2.com",
    status: "monitoring",
    similarity: 72,
    lastCheck: "منذ 3 ساعات",
    alerts: 0,
  },
  {
    id: 3,
    name: "شركة المنافس الثالث",
    domain: "competitor3.com",
    status: "flagged",
    similarity: 91,
    lastCheck: "منذ 30 دقيقة",
    alerts: 5,
  },
]

const trademarkStatus = [
  {
    region: "المملكة العربية السعودية",
    status: "مسجل",
    registrationDate: "2023-06-15",
    expiryDate: "2033-06-15",
    number: "TM-2023-001234",
  },
  {
    region: "دولة الإمارات العربية المتحدة",
    status: "قيد المراجعة",
    registrationDate: "-",
    expiryDate: "-",
    number: "TM-2024-005678",
  },
  {
    region: "الولايات المتحدة الأمريكية",
    status: "مرفوض",
    registrationDate: "-",
    expiryDate: "-",
    number: "TM-2024-009876",
  },
]

export default function BrandPage() {
  const [isLogoDialogOpen, setIsLogoDialogOpen] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState(brandAssets[0])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">إدارة العلامة التجارية</h1>
          <p className="text-muted-foreground">إدارة شاملة للعلامة التجارية والأصول الرقمية</p>
        </div>
        <div className="flex space-x-2 space-x-reverse">
          <Button variant="outline">
            <Shield className="w-4 h-4 ml-2" />
            تسجيل العلامة التجارية
          </Button>
          <Dialog open={isLogoDialogOpen} onOpenChange={setIsLogoDialogOpen}>
            <DialogTrigger asChild>
              <Button className="animate-pulse-glow">
                <Sparkles className="w-4 h-4 ml-2" />
                إنشاء لوجو بالذكاء الاصطناعي
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>إنشاء لوجو بالذكاء الاصطناعي</DialogTitle>
                <DialogDescription>صف شركتك وسنقوم بإنشاء لوجو مخصص لك</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">اسم الشركة</Label>
                  <Input id="company-name" placeholder="أدخل اسم شركتك" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">المجال</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر مجال الشركة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">التكنولوجيا</SelectItem>
                      <SelectItem value="finance">المالية</SelectItem>
                      <SelectItem value="healthcare">الصحة</SelectItem>
                      <SelectItem value="education">التعليم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="style">النمط المفضل</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر النمط" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">عصري</SelectItem>
                      <SelectItem value="classic">كلاسيكي</SelectItem>
                      <SelectItem value="minimalist">بسيط</SelectItem>
                      <SelectItem value="creative">إبداعي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="colors">الألوان المفضلة</Label>
                  <Input id="colors" placeholder="مثال: أزرق، أبيض، رمادي" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">وصف إضافي</Label>
                  <Textarea id="description" placeholder="أي تفاصيل إضافية عن الشركة أو اللوجو المطلوب" />
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Button className="flex-1">إنشاء اللوجو</Button>
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => setIsLogoDialogOpen(false)}
                  >
                    إلغاء
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="assets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assets">الأصول الرقمية</TabsTrigger>
          <TabsTrigger value="trademark">العلامة التجارية</TabsTrigger>
          <TabsTrigger value="competitors">مراقبة المنافسين</TabsTrigger>
          <TabsTrigger value="generator">مولد التصاميم</TabsTrigger>
        </TabsList>

        {/* Assets Tab */}
        <TabsContent value="assets" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Assets List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">مكتبة الأصول</CardTitle>
                  <div className="relative">
                    <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="البحث في الأصول..." className="pr-10" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {brandAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className={`p-4 cursor-pointer hover:bg-accent transition-colors border-b border-border/50 ${
                          selectedAsset.id === asset.id ? "bg-accent" : ""
                        }`}
                        onClick={() => setSelectedAsset(asset)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium text-sm">{asset.name}</div>
                          <Badge
                            variant={
                              asset.status === "approved"
                                ? "secondary"
                                : asset.status === "pending"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {asset.status === "approved"
                              ? "معتمد"
                              : asset.status === "pending"
                                ? "قيد المراجعة"
                                : "مرفوض"}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <div>النوع: {asset.format}</div>
                          <div>الحجم: {asset.size}</div>
                          <div>التحميلات: {asset.downloads}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Asset Preview */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedAsset.name}</CardTitle>
                      <CardDescription>
                        {selectedAsset.format} • {selectedAsset.size} • آخر تعديل {selectedAsset.lastModified}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Preview Area */}
                  <div className="bg-muted/30 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center">
                    <div className="space-y-4">
                      <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">معاينة {selectedAsset.name}</p>
                    </div>
                  </div>

                  {/* Asset Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">النوع</span>
                        <span className="text-sm font-medium">{selectedAsset.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">التنسيق</span>
                        <span className="text-sm font-medium">{selectedAsset.format}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">الحجم</span>
                        <span className="text-sm font-medium">{selectedAsset.size}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">الحالة</span>
                        <Badge
                          variant={
                            selectedAsset.status === "approved"
                              ? "secondary"
                              : selectedAsset.status === "pending"
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {selectedAsset.status === "approved"
                            ? "معتمد"
                            : selectedAsset.status === "pending"
                              ? "قيد المراجعة"
                              : "مرفوض"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">التحميلات</span>
                        <span className="text-sm font-medium">{selectedAsset.downloads}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">آخر تعديل</span>
                        <span className="text-sm font-medium">{selectedAsset.lastModified}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 space-x-reverse">
                    <Button>تحميل الأصل</Button>
                    <Button variant="outline">مشاركة</Button>
                    <Button variant="outline">تحرير</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Trademark Tab */}
        <TabsContent value="trademark" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>حالة تسجيل العلامة التجارية</CardTitle>
              <CardDescription>متابعة تسجيل العلامة التجارية في مختلف البلدان</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trademarkStatus.map((trademark, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-border rounded-lg animate-float"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium">{trademark.region}</h4>
                      <p className="text-sm text-muted-foreground">رقم التسجيل: {trademark.number}</p>
                      {trademark.registrationDate !== "-" && (
                        <p className="text-xs text-muted-foreground">
                          مسجل في {trademark.registrationDate} • ينتهي في {trademark.expiryDate}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Badge
                        variant={
                          trademark.status === "مسجل"
                            ? "secondary"
                            : trademark.status === "قيد المراجعة"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {trademark.status}
                      </Badge>
                      {trademark.status === "مسجل" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {trademark.status === "قيد المراجعة" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      {trademark.status === "مرفوض" && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitors Tab */}
        <TabsContent value="competitors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مراقبة المنافسين</CardTitle>
              <CardDescription>متابعة الشركات المنافسة وتنبيهات التشابه</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {competitors.map((competitor, index) => (
                  <div
                    key={competitor.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg animate-float"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-1">
                      <h4 className="font-medium">{competitor.name}</h4>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <span>{competitor.domain}</span>
                        <span>•</span>
                        <span>آخر فحص {competitor.lastCheck}</span>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <span className="text-sm">نسبة التشابه: {competitor.similarity}%</span>
                        <div className="w-20 bg-muted rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              competitor.similarity > 85
                                ? "bg-red-500"
                                : competitor.similarity > 70
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${competitor.similarity}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {competitor.alerts > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {competitor.alerts} تنبيه
                        </Badge>
                      )}
                      <Badge
                        variant={
                          competitor.status === "active"
                            ? "secondary"
                            : competitor.status === "monitoring"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {competitor.status === "active"
                          ? "نشط"
                          : competitor.status === "monitoring"
                            ? "مراقبة"
                            : "مُعلم"}
                      </Badge>
                      <Button size="sm" variant="outline">
                        عرض التفاصيل
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Generator Tab */}
        <TabsContent value="generator" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-primary/10 to-purple-500/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 ml-2 text-primary" />
                  مولد اللوجوهات
                </CardTitle>
                <CardDescription>إنشاء لوجوهات احترافية بالذكاء الاصطناعي</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6">
                  <ImageIcon className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    استخدم الذكاء الاصطناعي لإنشاء لوجوهات مخصصة لشركتك
                  </p>
                  <Button className="w-full">إنشاء لوجو جديد</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 ml-2 text-green-500" />
                  مولد القوالب
                </CardTitle>
                <CardDescription>إنشاء قوالب تسويقية وتجارية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6">
                  <FileText className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">قوالب جاهزة لبطاقات العمل والعروض التقديمية</p>
                  <Button className="w-full bg-transparent" variant="outline">
                    تصفح القوالب
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Design Assistant */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 ml-2 text-primary" />
                مساعد التصميم الذكي
              </CardTitle>
              <CardDescription>احصل على اقتراحات تصميم مخصصة لعلامتك التجارية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-muted-foreground">تصميم تم إنشاؤه</div>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">89%</div>
                  <div className="text-sm text-muted-foreground">معدل الرضا</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg">
                  <Sparkles className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-sm text-muted-foreground">نمط متاح</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">اقتراحات التصميم</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "تحديث ألوان العلامة التجارية لتتماشى مع الاتجاهات الحديثة",
                    "إنشاء مجموعة أيقونات موحدة للمنصات الرقمية",
                    "تطوير قوالب وسائل التواصل الاجتماعي",
                    "تصميم عروض تقديمية احترافية للشركة",
                  ].map((suggestion, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg">
                      <p className="text-sm mb-3">{suggestion}</p>
                      <Button size="sm" variant="outline">
                        تطبيق الاقتراح
                      </Button>
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
