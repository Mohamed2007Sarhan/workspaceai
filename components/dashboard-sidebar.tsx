"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  LayoutDashboard,
  Mail,
  MessageSquare,
  BarChart3,
  Users,
  Palette,
  CreditCard,
  Headphones,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "لوحة التحكم",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "لوحة الإدارة",
    href: "/dashboard/admin",
    icon: Shield,
    adminOnly: true,
  },
  {
    title: "الإدارة الشاملة",
    href: "/dashboard/super-admin",
    icon: Shield,
    adminOnly: true,
  },
  {
    title: "إدارة الإيميلات",
    href: "/dashboard/emails",
    icon: Mail,
    badge: "12",
  },
  {
    title: "خدمة العملاء",
    href: "/dashboard/customer-service",
    icon: MessageSquare,
    badge: "5",
  },
  {
    title: "التحليلات",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "إدارة الموظفين",
    href: "/dashboard/employees",
    icon: Users,
  },
  {
    title: "إدارة الفرق",
    href: "/dashboard/teams",
    icon: Users,
  },
  {
    title: "لوحة الفريق",
    href: "/dashboard/team",
    icon: Users,
  },
  {
    title: "العلامة التجارية",
    href: "/dashboard/brand",
    icon: Palette,
  },
  {
    title: "المدفوعات",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "الدعم الفني",
    href: "/dashboard/support",
    icon: Headphones,
  },
  {
    title: "الإعدادات",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  
  // الحصول على بيانات المستخدم من localStorage
  const [userRole, setUserRole] = useState<string>('user')
  
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user_data')
      if (userData) {
        const user = JSON.parse(userData)
        setUserRole(user.role || 'user')
      }
    }
  }, [])

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-card border-l border-border transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2 space-x-reverse">
            <Brain className="w-8 h-8 text-primary animate-pulse-glow" />
            <span className="text-xl font-bold">AI Business</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="h-8 w-8">
          {isCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto nice-scrollbar">
        {sidebarItems.map((item) => {
          // إخفاء العناصر المخصصة للإدارة فقط إذا لم يكن المستخدم مدير
          if (item.adminOnly && userRole !== 'admin') {
            return null
          }
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed && "justify-center px-2",
                  pathname === item.href && "bg-primary/10 text-primary",
                )}
              >
                <item.icon className={cn("h-4 w-4", !isCollapsed && "ml-2")} />
                {!isCollapsed && (
                  <>
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="mr-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button variant="ghost" className={cn("w-full justify-start", isCollapsed && "justify-center px-2")}>
          <LogOut className={cn("h-4 w-4", !isCollapsed && "ml-2")} />
          {!isCollapsed && <span>تسجيل الخروج</span>}
        </Button>
      </div>
    </div>
  )
}
