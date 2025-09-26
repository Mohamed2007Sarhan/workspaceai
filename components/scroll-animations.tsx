"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
}

export function ScrollReveal({ children, direction = "up", delay = 0, duration = 0.6 }: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxSection({ children, speed = 0.5 }: { children: ReactNode; speed?: number }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, staggerDelay = 0.1 }: { children: ReactNode; staggerDelay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  direction = "up",
}: { children: ReactNode; direction?: "up" | "down" | "left" | "right" }) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      x: direction === "left" ? 30 : direction === "right" ? -30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return <motion.div variants={variants}>{children}</motion.div>
}

export function FloatingElements() {
  const [elements, setElements] = useState<
    { x: number; y: number; left: string; top: string; duration: number; delay: number }[]
  >([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const width = window.innerWidth
    const height = window.innerHeight
    const generated = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
    setElements(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{ x: el.x, y: el.y }}
          animate={{ y: [null, -20, 20], x: [null, -10, 10] }}
          transition={{
            duration: el.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: el.delay,
          }}
          style={{ left: el.left, top: el.top }}
        />
      ))}
    </div>
  )
}
