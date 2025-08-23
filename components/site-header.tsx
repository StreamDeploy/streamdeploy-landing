"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu } from "lucide-react"
import { useState } from "react"
import { motion } from "motion/react"

export default function SiteHeader({
  logo = "StreamDeploy",
  ctaPrimaryHref = "/marketplace",
  ctaSecondaryHref = "https://app.streamdeploy.com/signin",
}: {
  logo?: string
  ctaPrimaryHref?: string
  ctaSecondaryHref?: string
}) {
  const [open, setOpen] = useState(false)
  
  return (
    <motion.header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md dark:bg-neutral-950/80 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Cpu className="h-6 w-6 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
          </motion.div>
          <span className="font-semibold tracking-tight text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {logo}
          </span>
        </Link>
        
        <nav className="hidden items-center gap-6 md:flex">
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Link
              href="/#how-it-works"
              className="text-sm text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              How it works
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Link
              href="/#showcase"
              className="text-sm text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              Orin Showcase
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Link
              href="/#why"
              className="text-sm text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              Why
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <Link
              href="/#validation"
              className="text-sm text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              Validation
            </Link>
          </motion.div>
          
          <div className="flex items-center gap-2 ml-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                asChild 
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-md shadow-emerald-500/25 border-0"
              >
                <Link href={ctaPrimaryHref} aria-label="Browse Marketplace">
                  Browse Marketplace
                </Link>
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
                <Link href={ctaSecondaryHref} aria-label="Start Deploying">
                  Start Deploying
                </Link>
              </Button>
            </motion.div>
          </div>
        </nav>
        
        <motion.button
          aria-label="Toggle Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md border-2 border-emerald-200 px-3 py-2 text-sm text-emerald-600 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400 dark:hover:bg-emerald-950/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {open ? "Close" : "Menu"}
        </motion.button>
      </div>
      
      {open && (
        <motion.div 
          className="md:hidden border-t border-emerald-100 bg-white/95 backdrop-blur-md dark:bg-neutral-950/95 dark:border-emerald-900"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="container mx-auto flex flex-col gap-2 px-4 py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Link 
                href="/#how-it-works" 
                onClick={() => setOpen(false)} 
                className="py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium block"
              >
                How it works
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <Link 
                href="/#showcase" 
                onClick={() => setOpen(false)} 
                className="py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium block"
              >
                Orin Showcase
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Link 
                href="/#why" 
                onClick={() => setOpen(false)} 
                className="py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium block"
              >
                Why
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
            >
              <Link 
                href="/#validation" 
                onClick={() => setOpen(false)} 
                className="py-2 text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors font-medium block"
              >
                Validation
              </Link>
            </motion.div>
            
            <motion.div 
              className="mt-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Button 
                asChild 
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white flex-1 shadow-md shadow-emerald-500/25"
              >
                <Link href="/marketplace" onClick={() => setOpen(false)}>
                  Browse Marketplace
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950/30 flex-1 bg-white/80"
              >
                <Link href={ctaSecondaryHref} onClick={() => setOpen(false)}>
                  Start Deploying
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
