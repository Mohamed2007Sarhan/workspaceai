import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { ThemeProvider, LanguageProvider, LoadingScreen } from "@/lib/providers"
import { themeScript } from "@/lib/theme-script"
import dynamic from "next/dynamic"

const FloatingElements = dynamic(() => import("@/components/scroll-animations").then(mod => ({ default: mod.FloatingElements })), { ssr: false })

export const metadata: Metadata = {
  title: "AI Business Assistant - Advanced AI Platform for Companies",
  description: "Comprehensive platform that supports your business with advanced AI for email management, customer service, analytics, and more",
  generator: "AI Business Platform",
  keywords: "AI, Business, Assistant, Artificial Intelligence, Company Management, Customer Service",
  authors: [{ name: "AI Business Platform" }],
  creator: "AI Business Platform",
  publisher: "AI Business Platform",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    title: "AI Business Assistant - Advanced AI Platform for Companies",
    description: "Comprehensive platform that supports your business with advanced AI",
    siteName: "AI Business Assistant",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Business Assistant",
    description: "Comprehensive platform that supports your business with advanced AI",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="canonical" href="https://ai-business-assistant.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
