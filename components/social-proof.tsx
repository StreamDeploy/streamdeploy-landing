"use client";

import { motion } from "motion/react"
import Image from "next/image"

export default function SocialProof() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "StreamDeploy",
    "url": "https://streamdeploy.com",
    "slogan": "Vercel for robotics: OTA, rollbacks, fleet management",
    "knowsAbout": [
      "robotics fleet management",
      "OTA updates for edge AI",
      "NVIDIA Jetson Orin",
      "ROC-RK3588",
      "Google Coral TPU",
      "ROS 2 containers",
      "remote rollbacks",
      "device observability"
    ]
  };

  const logos = [
    { src: "/logos/nvidia-jetson.png", alt: "NVIDIA Jetson" },
    { src: "/logos/ros2.png", alt: "ROS 2" },
    { src: "/logos/coral.png", alt: "Google Coral" },
    { src: "/logos/supabase.png", alt: "Supabase" },
    { src: "/logos/t-mobile.png", alt: "T-Mobile" },
    { src: "/logos/founders-inc.png", alt: "Founders, Inc." },
    { src: "/logos/raspberry-pi.png", alt: "Raspberry Pi" },
    { src: "/logos/rockchip.png", alt: "Rockchip" },
    { src: "/logos/unitree-robotics-streamdeploy.png", alt: "Unitree" },
  ];

  return (
    <div className="mx-auto max-w-5xl">
      {/* SEO: accessible H1 for page section */}
      <h1 className="sr-only">
        StreamDeploy — Robotics Fleet Management & Zero-Downtime OTA for Edge AI
      </h1>

      {/* JSON-LD for rich results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />

      <div className="grid gap-8 lg:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          aria-label="StreamDeploy social proof and market traction"
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            Trusted by the fastest-growing robotics & edge-AI ecosystem
          </motion.h2>

          <motion.p
            className="mt-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.15 }}
          >
            StreamDeploy delivers zero-downtime OTA, instant rollbacks, and fleet management for
            NVIDIA Orin/Jetson, ROC-RK3588, Coral TPU, and more. Built for ROS 2 workloads and
            GPU-aware containers, it’s the quickest path from prototype to planet-scale robots.
          </motion.p>

          {/* Stats grid */}
          <motion.dl
            className="mt-8 grid grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            {/* Dev ecosystem */}
            <motion.div
              className="relative group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <dt className="text-sm font-medium text-blue-700 dark:text-blue-300">
                NVIDIA robotics developers
              </dt>
              <dd className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                2M+ devs
              </dd>
              <p className="mt-1 text-xs text-blue-700/80 dark:text-blue-300/80">
                Building on Jetson/Orin and the NVIDIA stack.
              </p>
            </motion.div>

            {/* Companies on Jetson */}
            <motion.div
              className="relative group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <dt className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Companies using Jetson
              </dt>
              <dd className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                10,000+
              </dd>
              <p className="mt-1 text-xs text-blue-700/80 dark:text-blue-300/80">
                From startups to global OEMs.
              </p>
            </motion.div>

            {/* Edge AI TAM */}
            <motion.div
              className="relative group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <dt className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Edge-AI market (2030)
              </dt>
              <dd className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                $66B+
              </dd>
              <p className="mt-1 text-xs text-blue-700/80 dark:text-blue-300/80">
                High-growth TAM aligned to StreamDeploy.
              </p>
            </motion.div>

            {/* Connected devices */}
            <motion.div
              className="relative group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <dt className="text-sm font-medium text-blue-700 dark:text-blue-300">
                IoT/edge devices (2025)
              </dt>
              <dd className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                18B+
              </dd>
              <p className="mt-1 text-xs text-blue-700/80 dark:text-blue-300/80">
                Massive fleet surface area for OTA & telemetry.
              </p>
            </motion.div>
          </motion.dl>
        </motion.div>

        {/* Partner/logo wall (keep placeholders or wire real logos) */}
        <motion.div
          className="grid grid-cols-2 items-center gap-6 sm:grid-cols-3"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
          aria-label="Ecosystem partners and platforms"
        >
          {logos.map((logo, i) => (
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
                className="relative p-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-blue-100 hover:border-blue-200 dark:bg-neutral-900/80 dark:border-blue-800 dark:hover:border-blue-700 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 25px rgba(16, 185, 129, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={60}
                  className="h-10 w-auto object-contain opacity-70 group-hover:opacity-90 transition-opacity duration-300 mx-auto"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 140px"
                  priority={i < 2}
                />
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50/60 to-blue-100/40 dark:from-blue-950/40 dark:to-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
