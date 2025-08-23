"use client";

import { motion } from "motion/react"

export default function SocialProof() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-8 lg:grid-cols-2 items-center">
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
            Trusted by the growing robotics ecosystem
          </motion.h3>
          <motion.p 
            className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.15 }}
          >
            1M+ developers and 6,000+ companies build on Jetson. Existing OTA solutions are fragmented, costly, or not
            GPU‑aware — StreamDeploy bridges that gap with a driver‑safe, robotics‑first platform.
          </motion.p>
          
          <motion.dl 
            className="mt-8 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <motion.div
              className="relative p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-green-100/50 dark:from-emerald-950/30 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <dt className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Robotics community</dt>
              <dd className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">1M+ devs</dd>
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400/10 to-green-500/10 opacity-0 group-hover:opacity-100"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            <motion.div
              className="relative p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-green-100/50 dark:from-emerald-950/30 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <dt className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Companies building</dt>
              <dd className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">6,000+</dd>
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-400/10 to-green-500/10 opacity-0 group-hover:opacity-100"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.dl>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="relative group"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.2, 
                delay: 0.15 + i * 0.05,
                type: "spring",
                stiffness: 300
              }}
            >
              <motion.div
                className="relative p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-emerald-100 hover:border-emerald-200 dark:bg-neutral-900/80 dark:border-emerald-800 dark:hover:border-emerald-700 transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 25px rgba(16, 185, 129, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <img 
                  src="/placeholder.svg?height=60&width=140" 
                  alt="Partner logo" 
                  className="h-10 w-auto opacity-60 group-hover:opacity-80 transition-opacity duration-300 mx-auto" 
                />
                
                {/* Animated background gradient on hover */}
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-50/60 to-green-100/40 dark:from-emerald-950/40 dark:to-green-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
