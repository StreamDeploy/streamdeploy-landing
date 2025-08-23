"use client";

import { Button } from "@/components/ui/button"
import { Particles } from "@/components/magicui/particles"
import { Highlight } from "@/components/magicui/highlight"
import { motion } from "motion/react"

export default function HeroSection({
  headline = "StreamDeploy — Just Push It",
  subheadline = "Curated containers + fleet-scale OTA deployment for <highlight>edge AI devices, robotics fleets, and IoT platforms</highlight>",
  support = "Stop wrestling with network tweaks and manual image loads. With StreamDeploy, you ship once, update fleets instantly, and roll back in seconds — safely.",
}: {
  headline?: string
  subheadline?: string
  support?: string
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-emerald-50 to-green-100 dark:from-neutral-950 dark:via-emerald-950/40 dark:to-green-950/30 min-h-screen flex items-center">
      {/* Professional grid pattern background */}
      <div className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Additional background pattern for depth */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)
          `,
        }} />
      </div>
      
      {/* Subtle animated particles for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <Particles
          className="absolute inset-0"
          quantity={60}
          ease={120}
          color="#10b981"
          refresh={false}
          size={0.3}
          staticity={80}
        />
      </div>
      
      {/* Professional geometric shapes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 border border-emerald-200/40 dark:border-emerald-800/40 rounded-lg"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute bottom-32 right-32 w-24 h-24 border-2 border-emerald-300/30 dark:border-emerald-700/30 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-20 w-16 h-16 bg-gradient-to-br from-emerald-500/10 to-green-600/10 rounded-lg"
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/70 via-white/50 to-white/60 dark:from-neutral-950/80 dark:via-neutral-950/60 dark:to-neutral-900/70"
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated headline */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {headline}
          </motion.h1>
          
          {/* Animated subheadline */}
          <motion.p
            className="mt-6 text-xl sm:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1, ease: "easeOut" }}
          >
            {subheadline.includes('<highlight>') ? (
              <>
                {subheadline.split('<highlight>')[0]}
                <Highlight delay={0.4}>
                  {subheadline.split('<highlight>')[1].split('</highlight>')[0]}
                </Highlight>
                {subheadline.split('</highlight>')[1]}
              </>
            ) : (
              subheadline
            )}
          </motion.p>
          
          {/* Animated support text */}
          <motion.div
            className="mx-auto mt-8 max-w-3xl text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-lg leading-relaxed">{support}</p>
            
            {/* Feature badges */}
              <motion.ul
                className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: 0.3, ease: "easeOut" }}
              >
              <motion.li
                className="rounded-full border-2 border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Driver compatibility
              </motion.li>
              <motion.li
                className="rounded-full border-2 border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Rollback safety
              </motion.li>
              <motion.li
                className="rounded-full border-2 border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 font-medium"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Zero‑downtime updates
              </motion.li>
            </motion.ul>
          </motion.div>
          
          {/* Animated CTA buttons */}
          <motion.div
            className="mt-10 flex items-center justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.4, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg shadow-emerald-500/25 border-0 px-8 py-3 text-lg font-semibold"
              >
                <a href="/marketplace" aria-label="Browse Marketplace">
                  Browse Marketplace
                </a>
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
                size="lg"
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-300 bg-white/80 backdrop-blur-sm px-8 py-3 text-lg font-semibold"
              >
                <a href="https://app.streamdeploy.com/signin" aria-label="Start Deploying">
                  Start Deploying
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
    </section>
  )
}
