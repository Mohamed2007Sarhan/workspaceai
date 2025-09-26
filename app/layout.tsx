import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { ThemeProvider, LanguageProvider, LoadingScreen } from "@/lib/providers"
import dynamic from "next/dynamic"

const FloatingElements = dynamic(() => import("@/components/scroll-animations").then(mod => ({ default: mod.FloatingElements })), { ssr: false })

export const metadata: Metadata = {
  title: "AI Business Assistant - منصة الذكاء الاصطناعي للشركات",
  description: "منصة شاملة لإدارة الشركات بالذكاء الاصطناعي - إدارة الإيميلات، خدمة العملاء، التحليلات، وأكثر",
  generator: "AI Business Platform",
  keywords: "AI, Business, Assistant, الذكاء الاصطناعي, إدارة الشركات, خدمة العملاء",
  authors: [{ name: "AI Business Platform" }],
  creator: "AI Business Platform",
  publisher: "AI Business Platform",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    title: "AI Business Assistant - منصة الذكاء الاصطناعي للشركات",
    description: "منصة شاملة لإدارة الشركات بالذكاء الاصطناعي",
    siteName: "AI Business Assistant",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Business Assistant",
    description: "منصة شاملة لإدارة الشركات بالذكاء الاصطناعي",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <link rel="canonical" href="https://ai-business-assistant.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <Suspense fallback={<LoadingScreen />}>
              <FloatingElements />
              {children}
              <Analytics />
            </Suspense>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
