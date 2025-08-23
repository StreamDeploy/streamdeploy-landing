"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Boxes, Settings2, Rocket, Undo2 } from "lucide-react"
import { motion } from "motion/react"

const steps = [
  {
    title: "Choose a curated container",
    desc: "Pick from our marketplace of production‑ready containers built for edge AI devices and robotics platforms.",
    icon: Boxes,
  },
  {
    title: "Customize configs",
    desc: "Tune device and fleet configs once: drivers, environment variables, hardware acceleration, and network settings.",
    icon: Settings2,
  },
  {
    title: "Deploy at scale",
    desc: "Ship to 1 to 10,000 devices with a single command and safe rollout strategies including canary deployments.",
    icon: Rocket,
  },
  {
    title: "Update or roll back instantly",
    desc: "Zero‑downtime OTA updates with version‑controlled configurations and automatic rollback on failure detection.",
    icon: Undo2,
  },
]

export default function Steps() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => {
        const Icon = s.icon
        return (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ 
              duration: 0.2, 
              delay: i * 0.04,
              ease: "easeOut" 
            }}
            className="h-full"
          >
            <Card className="group relative overflow-hidden border-2 border-emerald-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80 dark:border-emerald-800 dark:hover:border-emerald-700 h-full flex flex-col">
              {/* Animated background gradient */}
              <motion.div 
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-emerald-50/60 to-green-100/40 dark:from-emerald-950/40 dark:to-green-900/20"
                initial={{ scale: 0.9, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
              
              {/* Floating number indicator */}
              <motion.div
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white text-sm font-bold flex items-center justify-center shadow-lg z-20"
                initial={{ scale: 0, rotate: -90 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.2, 
                  delay: i * 0.04 + 0.1,
                  type: "spring",
                  stiffness: 400,
                  damping: 15
                }}
              >
                {i + 1}
              </motion.div>
              
              <CardHeader className="flex flex-row items-center gap-3 relative z-10 pb-3">
                <motion.div 
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 text-emerald-600 dark:text-emerald-400 group-hover:from-emerald-500/30 group-hover:to-green-500/30 transition-all duration-300 flex-shrink-0"
                  whileHover={{ 
                    scale: 1.05,
                    rotate: 3,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Icon className="h-6 w-6" />
                </motion.div>
                <CardTitle className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors leading-tight">
                  {s.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="relative z-10 flex-grow pt-0">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                  {s.desc}
                </p>
              </CardContent>
              
              {/* Subtle animated accent line */}
              <motion.div
                className="absolute bottom-0 left-0 bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ height: "4px", width: "100%" }}
                initial={{ scaleX: 0, transformOrigin: "left" }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
