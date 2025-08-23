"use client";

import { Button } from "@/components/ui/button"
import { motion } from "motion/react"
import { Particles } from "@/components/magicui/particles"

export default function CtaBanner({
  title = "Stop Fighting Your Deployments. Start StreamDeploy.",
}: {
  title?: string
}) {
  return (
    <motion.div
      id="marketplace"
      className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 p-8 text-white shadow-2xl shadow-emerald-500/25"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Animated particles background */}
      <div className="absolute inset-0 pointer-events-none">
        <Particles
          className="absolute inset-0"
          quantity={60}
          ease={60}
          color="#ffffff"
          refresh={false}
        />
      </div>
      
      {/* Floating background elements */}
      <motion.div 
        className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div 
        className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      {/* Additional floating elements */}
      <motion.div 
        className="pointer-events-none absolute top-1/2 left-1/2 h-32 w-32 rounded-full bg-white/5 blur-xl"
        animate={{
          x: [-20, 20, -20],
          y: [-10, 10, -10],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid items-center gap-6 md:grid-cols-3">
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            <motion.h3 
              className="text-2xl sm:text-3xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.15 }}
            >
              {title}
            </motion.h3>
            <motion.p 
              className="mt-3 text-white/90 text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              Browse curated containers and deploy to your fleet with driver‑safe OTA updates.
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3 md:justify-end"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.15 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                asChild 
                className="bg-white text-emerald-600 hover:bg-white/90 font-semibold shadow-lg"
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
                variant="secondary" 
                className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-semibold backdrop-blur-sm"
              >
                <a href="app.streamdeploy/signin" aria-label="Deploy Now">
                  Deploy Now
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
