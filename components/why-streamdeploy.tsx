"use client";

import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Rocket, Undo2, Cpu, MonitorSmartphone, Settings2 } from "lucide-react"

export default function WhyStreamDeploy() {
  return (
    <div className="mx-auto max-w-5xl">
      <div 
        className="mb-12 text-center"
      >
        <h3 
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
        >
          Why StreamDeploy
        </h3>
        <p 
          className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto"
        >
          The container marketplace and OTA platform built for edge AI devices, robotics fleets, and IoT platforms.
        </p>
        {/* SEO keywords called out explicitly as requested */}
        <p className="sr-only">
          SEO: fleet deployment, edge AI containers, robot OTA updates, container marketplace, edge device fleet
          management
        </p>
      </div>
      
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
    <div
    >
      <Card className="group border-2 border-blue-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80 dark:border-blue-800 dark:hover:border-blue-700 h-full overflow-hidden">
        <CardContent className="flex items-start gap-4 p-6 relative h-full">
          {/* Animated background gradient */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-50/60 to-blue-100/40 dark:from-blue-950/40 dark:to-blue-900/20"
          />
          
          <div 
            className="relative z-10 mt-1 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:from-blue-500/30 group-hover:to-blue-500/30 transition-all duration-300"
          >
            <Icon className="h-6 w-6" />
          </div>
          
          <div className="relative z-10 flex-1">
            <h4 
              className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
            >
              {title}
            </h4>
            <p 
              className="mt-2 text-sm text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors"
            >
              {desc}
            </p>
          </div>
          
          {/* Animated accent line */}
          <div
            className="absolute left-0 top-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ height: "100%" }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
