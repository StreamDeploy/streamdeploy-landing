"use client"

import { motion } from "motion/react"
import { ReactNode } from "react"

interface HighlightProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function Highlight({ children, className = "", delay = 0 }: HighlightProps) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay }}
    >
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-emerald-200/60 to-green-200/60 dark:from-emerald-500/30 dark:to-green-500/30 rounded-lg -skew-y-1"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
      />
      <span className="relative z-10 font-semibold text-emerald-800 dark:text-emerald-200">
        {children}
      </span>
    </motion.span>
  )
}
