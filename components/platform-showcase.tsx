"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Cpu, Network, TerminalSquare } from "lucide-react"
import { motion } from "motion/react"

const snippet = `# example-robot-docker
# StreamDeploy device enrollment for edge AI platform
# Device Type: JETSON ORIN-NANO
# Operating System: Linux
# Group: production

export SD_BOOTSTRAP_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4MDM5YTYwOS00NTIxLTQ5ZWUtODhjYS1jYTIxOGE1MzU5Y2QiLCJvcmdfaWQiOiJhODIyZmM1Yi01MGFjLTRlNjktYjFjMy01NWRmNjMyN2RkOGIiLCJncm91cF9pZCI6ImJhN2I3YzI4LWQwZDEtNGI3NS04ZTAyLWYyMDU3MTk1NDQ0YyIsImRldmljZV9pZCI6ImU4YzIwMGQ1LWJmY2YtNGNlOC1hZWQ2LTE0M2ZmY2ZjOTFjZCIsImlhdCI6MTc1NTkxMjk1NCwiZXhwIjoxNzU1OTE0NzU0LCJzY29wZSI6ImJvb3RzdHJhcCJ9.VNaEixwlSHTjX-2M5bYKd8MIwiViclLYV6zOmjeYo5s"
# Example installer
curl -fsSL https://get.streamdeploy.com/orin-nano-install.sh | bash -s -- --token "$SD_BOOTSTRAP_TOKEN"
`

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
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h3 
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Edge AI Platform Deployment
          </motion.h3>
          <motion.p 
            className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Deploy to robotics fleets and edge devices in minutes — version‑controlled configs, automatic rollback, hardware-safe updates.
            Unlike generic IoT platforms, StreamDeploy is optimized for edge AI workloads and robotics workflows.
          </motion.p>
          
          <motion.ul 
            className="mt-6 space-y-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
                  transition={{ duration: 0.5, delay: 0.8 + feature.delay }}
                  whileHover={{ x: 5 }}
                >
                  <motion.div
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
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
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                asChild 
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25"
              >
                <a href="/marketplace">Browse Marketplace</a>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                asChild 
                variant="outline" 
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-300 bg-white/80"
              >
                <a href="https://github.com/streamdeploy/example-robot-docker" target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Card className="overflow-hidden border-2 border-emerald-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 bg-white/80 backdrop-blur-sm dark:bg-neutral-900/80 dark:border-emerald-800 dark:hover:border-emerald-700">
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
              {/* Animated background gradient */}
              <motion.div 
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-emerald-50/60 to-green-100/40 dark:from-emerald-950/40 dark:to-green-900/20"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="flex items-center gap-2 relative z-10">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <TerminalSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
                <CardTitle className="text-base text-gray-900 dark:text-white">example-robot-docker</CardTitle>
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
                  className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/30 bg-white/80"
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
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <pre className="overflow-auto rounded-md bg-gradient-to-br from-neutral-950 to-neutral-900 p-4 text-sm text-emerald-100 border border-emerald-800/30">
                  <code>{snippet}</code>
                </pre>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <CardDescription className="mt-3 text-gray-600 dark:text-gray-300">
                  Monospace output is illustrative. Replace fleet name, image tags, and configs for your environment.
                </CardDescription>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
