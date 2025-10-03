"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Cpu, Network, TerminalSquare } from "lucide-react"
import { motion } from "motion/react"

const snippet = `curl -fsSL https://get.streamdeploy.com/streamdeploy-agent-linux-arm64 | sudo env SD_BOOTSTRAP_TOKEN='<token>' sh -c "t=\$(mktemp); cat >\"\$t\"; chmod +x \"\$t\"; \"\$t\""`

export default function PlatformShowcase() {
  const [copied, setCopied] = useState(false)
  
  const features = [
    {
      icon: Cpu,
      text: "Hardware-optimized containers",
      delay: 0
    },
    {
      icon: ShieldCheck,
      text: "Automatic compatibility checks",
      delay: 0.1
    },
    {
      icon: Network,
      text: "Rollouts with canary and health checks",
      delay: 0.2
    }
  ]
  
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 grid items-center gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.h3 
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            Edge AI Platform Deployment
          </motion.h3>
          <motion.p 
            className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.15 }}
          >
            Deploy to robotics fleets and edge devices in minutes — version‑controlled configs, automatic rollback, hardware-safe updates.
            Unlike generic IoT platforms, StreamDeploy is optimized for edge AI workloads and robotics workflows.
          </motion.p>
          
          <motion.ul 
            className="mt-6 space-y-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.2, delay: 0.25 + feature.delay * 0.5 }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-500/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <span className="font-medium">{feature.text}</span>
                </motion.li>
              )
            })}
          </motion.ul>
          
          <motion.div 
            className="mt-8 flex items-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                asChild 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25"
              >
                <a href="/marketplace">Browse Marketplace</a>
              </Button>
            </motion.div>
            
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        >
          <Card className="overflow-hidden border-2 border-blue-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80 dark:border-blue-800 dark:hover:border-blue-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
              {/* Animated background gradient */}
              <motion.div 
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-blue-50/60 to-blue-100/40 dark:from-blue-950/40 dark:to-blue-900/20"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="flex items-center gap-2 relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <TerminalSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <CardTitle className="text-base text-gray-900 dark:text-white">Streamlined Device Setup</CardTitle>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative z-10"
              >
                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/30 bg-white/80"
                  onClick={async () => {
                    await navigator.clipboard.writeText(snippet)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                >
                  {copied ? "Copied" : "Copy"}
                </Button>
              </motion.div>
            </CardHeader>
            
            <CardContent className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <pre className="overflow-x-auto rounded-md bg-gradient-to-br from-neutral-950 to-neutral-900 p-3 sm:p-4 text-xs sm:text-sm text-blue-100 border border-blue-800/30 max-w-full">
                  <code className="whitespace-pre-wrap break-all sm:whitespace-pre sm:break-normal">{snippet}</code>
                </pre>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.2, delay: 0.25 }}
              >
                <CardDescription className="mt-3 text-gray-600 dark:text-gray-300">
                  Monospace output is illustrative.
                </CardDescription>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
