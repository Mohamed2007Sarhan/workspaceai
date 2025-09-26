import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TrustedBySection } from "@/components/trusted-by-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingPreviewSection } from "@/components/pricing-preview-section"
import { CTASection } from "@/components/cta-section"
import dynamic from "next/dynamic"
import Footer from "@/components/footer"
import { Suspense } from "react"

// تحسين الأداء مع lazy loading للمكونات الثقيلة
const BusinessScene3D = dynamic(() => import("@/components/3d-business-scene"), { 
  ssr: false,
  loading: () => (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
        <p className="text-white text-lg">جاري تحميل المشهد ثلاثي الأبعاد...</p>
      </div>
    </div>
  )
})

const AnimatedBackground = dynamic(() => import("@/components/animated-background").then(mod => ({ default: mod.AnimatedBackground })), { 
  ssr: false 
})

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section مع تحسين الأداء */}
      <Suspense fallback={
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-purple-400/20 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-purple-400/20 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      }>
        <HeroSection />
      </Suspense>
      
      <TrustedBySection />
      <StatsSection />
      <FeaturesSection />
      
      {/* 3D Scene مع تحسين الأداء */}
      <div className="h-screen relative">
        <Suspense fallback={
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
              <p className="text-white text-lg">جاري تحميل المشهد ثلاثي الأبعاد...</p>
            </div>
          </div>
        }>
          <BusinessScene3D />
        </Suspense>
      </div>
      
      <TestimonialsSection />
      <PricingPreviewSection />
      <CTASection />
      <Footer />
    </main>
  )
}
