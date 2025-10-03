"use client";

import { Button } from "@/components/ui/button"
import { Particles } from "@/components/magicui/particles"
import { Highlight } from "@/components/magicui/highlight"
import { motion } from "motion/react"
import { WavyBackground } from "@/components/ui/wavy-background"
import { CyclingText } from "@/components/ui/cycling-text"

export default function HeroSection({
  headline = "StreamDeploy — Just Push It",
  subheadline = "deployments feel like web deployments",
  support = "Stop wrestling with network tweaks and manual image loads. With StreamDeploy, you ship once, update fleets instantly, and roll back in seconds — safely.",
}: {
  headline?: string
  subheadline?: string
  support?: string
}) {
  return (
    <section className="relative min-h-screen flex items-center">
      <WavyBackground
        colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"]}
        waveWidth={50}
        blur={10}
        speed="fast"
        waveOpacity={0.5}
        containerClassName="min-h-screen"
      >
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-16 sm:pb-20 md:pb-24 lg:pb-28">
          <div className="w-full text-left">
            {/* Animated headline */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              Make <CyclingText 
                words={["Edge AI devices", "Robotics fleets", "IoT platforms"]}
                className="text-blue-500 dark:text-blue-400 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap"
              /> {subheadline}
            </motion.h1>
            
          </div>
        </div>
      </WavyBackground>
    </section>
  )
}
