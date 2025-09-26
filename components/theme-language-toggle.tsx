"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun, Languages } from "lucide-react"
import { useTheme, useLanguage } from "@/lib/providers"
import { motion } from "framer-motion"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button variant="ghost" size="icon" onClick={toggleTheme} className="relative overflow-hidden">
        <motion.div
          initial={false}
          animate={{ rotate: theme === "dark" ? 0 : 180, opacity: theme === "dark" ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Moon className="h-4 w-4" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ rotate: theme === "light" ? 0 : 180, opacity: theme === "light" ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <Sun className="h-4 w-4" />
        </motion.div>
      </Button>
    </motion.div>
  )
}

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-2">
        <Languages className="h-4 w-4" />
        <motion.span
          key={language}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {language === "ar" ? "العربية" : "English"}
        </motion.span>
      </Button>
    </motion.div>
  )
}
