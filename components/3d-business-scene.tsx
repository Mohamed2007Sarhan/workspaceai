"use client"

import { useState, Suspense } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Create a separate component for the Three.js content
function ThreeScene() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full h-full"
    >
      <Suspense fallback={<div className="w-full h-full bg-gray-900 animate-pulse" />}>
        <CanvasWrapper onCreated={() => setIsLoaded(true)} />
      </Suspense>
    </motion.div>
  )
}

// Dynamically import the actual Three.js canvas
const CanvasWrapper = dynamic(() => import("./3d-canvas"), { ssr: false })

export default ThreeScene