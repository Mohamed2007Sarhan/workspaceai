"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { motion } from "framer-motion"

// Theme Context
type Theme = "light" | "dark"
type Language = "ar" | "en"

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
  t: (key: string) => string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations
const translations = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.features": "الميزات",
    "nav.pricing": "التسعير",
    "nav.about": "من نحن",
    "nav.contact": "تواصل معنا",
    "nav.login": "تسجيل الدخول",
    "nav.register": "إنشاء حساب",
    "nav.dashboard": "لوحة التحكم",

    // Hero Section
    "hero.title": "مساعد الذكاء الاصطناعي",
    "hero.subtitle": "للشركات العالمية",
    "hero.description":
      "منصة شاملة تدعم شركتك بالذكاء الاصطناعي المتقدم لإدارة الإيميلات، خدمة العملاء، التحليلات، والمزيد",
    "hero.cta": "ابدأ مجاناً",
    "hero.demo": "مشاهدة العرض",

    // Features
    "features.title": "ميزات متقدمة",
    "features.subtitle": "كل ما تحتاجه لنجاح شركتك",
    "features.email.title": "إدارة الإيميلات الذكية",
    "features.email.desc": "رد تلقائي ذكي وتصنيف الرسائل",
    "features.support.title": "خدمة العملاء متعددة المنصات",
    "features.support.desc": "دعم عبر جميع وسائل التواصل الاجتماعي",
    "features.analytics.title": "تحليلات متقدمة",
    "features.analytics.desc": "رؤى عميقة وتقارير تفاعلية",
    "features.employees.title": "إدارة الموظفين",
    "features.employees.desc": "نظام شامل لإدارة الفريق",
    "features.brand.title": "إدارة العلامة التجارية",
    "features.brand.desc": "حماية ومراقبة علامتك التجارية",
    "features.ai.title": "ذكاء اصطناعي مخصص",
    "features.ai.desc": "مساعد ذكي مدرب على بيانات شركتك",

    // Dashboard
    "dashboard.welcome": "مرحباً بك",
    "dashboard.overview": "نظرة عامة",
    "dashboard.emails": "الإيميلات",
    "dashboard.customers": "خدمة العملاء",
    "dashboard.analytics": "التحليلات",
    "dashboard.employees": "الموظفين",
    "dashboard.brand": "العلامة التجارية",
    "dashboard.payments": "المدفوعات",
    "dashboard.settings": "الإعدادات",

    // Common
    "common.loading": "جاري التحميل...",
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.view": "عرض",
    "common.search": "بحث...",
    "common.filter": "تصفية",
    "common.export": "تصدير",
    "common.import": "استيراد",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.register": "Sign Up",
    "nav.dashboard": "Dashboard",

    // Hero Section
    "hero.title": "AI Business Assistant",
    "hero.subtitle": "for Global Companies",
    "hero.description":
      "Comprehensive platform that supports your business with advanced AI for email management, customer service, analytics, and more",
    "hero.cta": "Start Free",
    "hero.demo": "Watch Demo",

    // Features
    "features.title": "Advanced Features",
    "features.subtitle": "Everything you need for business success",
    "features.email.title": "Smart Email Management",
    "features.email.desc": "Intelligent auto-reply and message classification",
    "features.support.title": "Multi-Platform Customer Service",
    "features.support.desc": "Support across all social media platforms",
    "features.analytics.title": "Advanced Analytics",
    "features.analytics.desc": "Deep insights and interactive reports",
    "features.employees.title": "Employee Management",
    "features.employees.desc": "Comprehensive team management system",
    "features.brand.title": "Brand Management",
    "features.brand.desc": "Protect and monitor your brand",
    "features.ai.title": "Custom AI",
    "features.ai.desc": "Smart assistant trained on your company data",

    // Dashboard
    "dashboard.welcome": "Welcome",
    "dashboard.overview": "Overview",
    "dashboard.emails": "Emails",
    "dashboard.customers": "Customer Service",
    "dashboard.analytics": "Analytics",
    "dashboard.employees": "Employees",
    "dashboard.brand": "Brand",
    "dashboard.payments": "Payments",
    "dashboard.settings": "Settings",

    // Common
    "common.loading": "Loading...",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.search": "Search...",
    "common.filter": "Filter",
    "common.export": "Export",
    "common.import": "Import",
  },
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", theme)
    document.documentElement.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"))
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["ar"]] || key
  }

  return <LanguageContext.Provider value={{ language, toggleLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

// Loading Screen Component
export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-8 h-8 bg-primary rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  )
}
