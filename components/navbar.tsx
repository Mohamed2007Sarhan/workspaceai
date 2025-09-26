"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Brain, Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { ThemeToggle, LanguageToggle } from "@/components/theme-language-toggle"
import { useLanguage } from "@/lib/providers"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, t } = useLanguage()

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Link href="/" className="flex items-center space-x-2 space-x-reverse">
              <Brain className="w-8 h-8 text-primary animate-pulse-glow" />
              <span className="text-xl font-bold">AI Business</span>
            </Link>
            <Badge variant="secondary" className="hidden md:inline-flex">
              Beta
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-6 space-x-reverse">
              <NavigationMenuItem>
                <NavigationMenuTrigger>{t("nav.features")}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <Link href="/dashboard/emails" className="block p-3 rounded-md hover:bg-accent">
                      <div className="font-medium">{t("dashboard.emails")}</div>
                      <p className="text-sm text-muted-foreground">{t("features.email.desc")}</p>
                    </Link>
                    <Link href="/dashboard/customer-service" className="block p-3 rounded-md hover:bg-accent">
                      <div className="font-medium">{t("dashboard.customers")}</div>
                      <p className="text-sm text-muted-foreground">{t("features.support.desc")}</p>
                    </Link>
                    <Link href="/dashboard/analytics" className="block p-3 rounded-md hover:bg-accent">
                      <div className="font-medium">{t("dashboard.analytics")}</div>
                      <p className="text-sm text-muted-foreground">{t("features.analytics.desc")}</p>
                    </Link>
                    <Link href="/dashboard/employees" className="block p-3 rounded-md hover:bg-accent">
                      <div className="font-medium">{t("dashboard.employees")}</div>
                      <p className="text-sm text-muted-foreground">{t("features.employees.desc")}</p>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/pricing" className="px-4 py-2 hover:text-primary transition-colors">
                  {t("nav.pricing")}
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/support" className="px-4 py-2 hover:text-primary transition-colors">
                  الدعم
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Theme and Language Controls + CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <ThemeToggle />
            <LanguageToggle />
            <Link href="/auth/login">
              <Button variant="ghost">{t("nav.login")}</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="animate-pulse-glow">{language === "ar" ? "ابدأ مجاناً" : "Start Free"}</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center gap-4 pb-4 border-b border-border/50">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              <Link href="/#features" className="px-4 py-2 hover:text-primary transition-colors">
                {t("nav.features")}
              </Link>
              <Link href="/pricing" className="px-4 py-2 hover:text-primary transition-colors">
                {t("nav.pricing")}
              </Link>
              <Link href="/support" className="px-4 py-2 hover:text-primary transition-colors">
                الدعم
              </Link>
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t border-border/50">
                <Link href="/auth/login">
                  <Button variant="ghost" className="justify-start w-full">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="justify-start w-full">{language === "ar" ? "ابدأ مجاناً" : "Start Free"}</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
