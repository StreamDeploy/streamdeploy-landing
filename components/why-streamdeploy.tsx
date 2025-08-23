"use client";

import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Rocket, Undo2, Cpu, MonitorSmartphone, Settings2 } from "lucide-react"
import { motion } from "motion/react"

export default function WhyStreamDeploy() {
  return (
    <div className="mx-auto max-w-5xl">
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h3 
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Why StreamDeploy
        </motion.h3>
        <motion.p 
          className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          The container marketplace and OTA platform built for edge AI devices, robotics fleets, and IoT platforms.
        </motion.p>
        {/* SEO keywords called out explicitly as requested */}
        <p className="sr-only">
          SEO: fleet deployment, edge AI containers, robot OTA updates, container marketplace, edge device fleet
          management
        </p>
      </motion.div>
      
      <div className="grid gap-6 sm:grid-cols-2">
        <Feature
          icon={Settings2}
          title="Curated, production‑ready containers"
          desc="Hardened images tuned for edge AI hardware, robotics, and computer vision workloads."
          delay={0}
        />
        <Feature
          icon={Rocket}
          title="OTA that scales 1 → 10,000"
          desc="Rollouts with canaries, health checks, and phased updates for huge fleets."
          delay={0.1}
        />
        <Feature
          icon={Undo2}
          title="Version control + one‑command rollbacks"
          desc="Track every change and revert instantly with safe state management."
          delay={0.2}
        />
        <Feature
          icon={ShieldCheck}
          title="Hardware driver–safe updates"
          desc="Driver compatibility and kernel guardrails reduce field failures across platforms."
          delay={0.3}
        />
        <Feature
          icon={MonitorSmartphone}
          title="Works across edge AI"
          desc="Robotics, vision systems, kiosks — any containerized edge workload."
          delay={0.4}
        />
        <Feature 
          icon={Cpu} 
          title="Faster than DIY" 
          desc="No custom OTA tooling. Ship once, update fleets instantly." 
          delay={0.5}
        />
      </div>
    </div>
  )
}

function Feature({
  icon: Icon,
  title,
  desc,
  delay = 0,
}: {
  icon: any
  title: string
  desc: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: "easeOut" 
      }}
    >
      <Card className="group border-2 border-emerald-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80 dark:border-emerald-800 dark:hover:border-emerald-700 h-full overflow-hidden">
        <CardContent className="flex items-start gap-4 p-6 relative h-full">
          {/* Animated background gradient */}
          <motion.div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-emerald-50/60 to-green-100/40 dark:from-emerald-950/40 dark:to-green-900/20"
            initial={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          <motion.div 
            className="relative z-10 mt-1 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 text-emerald-600 dark:text-emerald-400 group-hover:from-emerald-500/30 group-hover:to-green-500/30 transition-all duration-300"
            whileHover={{ 
              scale: 1.1,
              rotate: 5,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon className="h-6 w-6" />
          </motion.div>
          
          <div className="relative z-10 flex-1">
            <motion.h4 
              className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: delay + 0.2 }}
            >
              {title}
            </motion.h4>
            <motion.p 
              className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: delay + 0.3 }}
            >
              {desc}
            </motion.p>
          </div>
          
          {/* Animated accent line */}
          <motion.div
            className="absolute left-0 top-0 w-1 bg-gradient-to-b from-emerald-500 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ height: "100%" }}
            initial={{ scaleY: 0, transformOrigin: "top" }}
            whileHover={{ scaleY: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
