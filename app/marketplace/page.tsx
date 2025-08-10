import type { Metadata } from "next"
import SiteHeader from "@/components/site-header"
import MarketplaceClient from "@/components/marketplace/marketplace-client"
import { marketplaceIntro } from "@/data/marketplace"

export const metadata: Metadata = {
  title: "StreamDeploy Marketplace — Curated Containers for Robotics & Edge AI",
  description:
    "Fast-start containers for ROS 2 camera streaming, TensorRT inference, and Coral Edge TPU detection. Designed for NVIDIA Orin/Jetson and edge AI hardware.",
  alternates: { canonical: "/marketplace" },
}

export default function MarketplacePage() {
  return (
    <main className="min-h-screen w-full text-gray-900 dark:text-gray-100">
      <SiteHeader />
      <MarketplaceClient intro={marketplaceIntro} />
      <footer className="border-t bg-white/70 backdrop-blur dark:bg-neutral-950/60">
        <div className="container mx-auto flex flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {"© "} {new Date().getFullYear()} StreamDeploy. All rights reserved.
          </p>
          <div className="text-xs text-gray-600 dark:text-gray-400">Contact us for access to curated images.</div>
        </div>
      </footer>
    </main>
  )
}
