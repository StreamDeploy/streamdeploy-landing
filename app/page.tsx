import type { Metadata } from "next"
import Link from "next/link"
import SiteHeader from "@/components/site-header"
import HeroSection from "@/components/hero-section"
import Steps from "@/components/steps"
import ShowcaseOrin from "@/components/showcase-orin"
import WhyStreamDeploy from "@/components/why-streamdeploy"
import SocialProof from "@/components/social-proof"
import CtaBanner from "@/components/cta-banner"

export const metadata: Metadata = {
  title: "StreamDeploy — Deploy Anywhere, Every Time",
  description:
    "StreamDeploy is the container marketplace + OTA platform for NVIDIA Orins, robotics fleets, and edge AI. Deploy once, update fleets instantly, and roll back in seconds — driver-safe and fleet-ready.",
  keywords: [
    "fleet deployment",
    "NVIDIA Orin containers",
    "robot OTA updates",
    "container marketplace",
    "Jetson fleet management",
    "edge AI deployment",
    "OTA updates",
  ],
  alternates: { canonical: "/" },
}

export default function Page() {
  return (
    <main className="min-h-screen w-full text-gray-900 dark:text-gray-100">
      <SiteHeader />
      <HeroSection />
      <section id="how-it-works" className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How StreamDeploy Works</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              From curated containers to zero‑downtime OTA, purpose‑built for NVIDIA Jetson Orin and robotics fleets.
            </p>
          </div>
          <Steps />
        </div>
      </section>

      <section id="showcase" className="relative py-20 bg-gray-50 dark:bg-neutral-900/60">
        <div className="container mx-auto px-4">
          <ShowcaseOrin />
        </div>
      </section>

      <section id="why" className="relative py-20">
        <div className="container mx-auto px-4">
          <WhyStreamDeploy />
        </div>
      </section>

      <section id="validation" className="relative py-20 bg-gray-50 dark:bg-neutral-900/60">
        <div className="container mx-auto px-4">
          <SocialProof />
        </div>
      </section>

      <section id="cta" className="relative py-20">
        <div className="container mx-auto px-4">
          <CtaBanner />
        </div>
      </section>

      <footer className="border-t bg-white/70 backdrop-blur dark:bg-neutral-950/60">
        <div className="container mx-auto flex flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {"© "} {new Date().getFullYear()} StreamDeploy. All rights reserved.
          </p>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="#how-it-works"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              How it works
            </Link>
            <Link
              href="#showcase"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Orin Showcase
            </Link>
            <Link href="#why" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Why StreamDeploy
            </Link>
            <Link
              href="#validation"
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Validation
            </Link>
            <Link href="/marketplace/contact" className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Get started
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
