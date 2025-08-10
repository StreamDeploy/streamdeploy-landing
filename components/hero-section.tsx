import { Button } from "@/components/ui/button"
import AnimatedNetwork from "@/components/animated-network"

export default function HeroSection({
  headline = "StreamDeploy — Deploy Anywhere, Every Time",
  subheadline = "Curated containers + fleet-scale OTA deployment for NVIDIA Orin devices, robotics fleets, and edge AI.",
  support = "Stop wrestling with network tweaks and manual image loads. With StreamDeploy, you ship once, update fleets instantly, and roll back in seconds — safely.",
}: {
  headline?: string
  subheadline?: string
  support?: string
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-gray-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900">
      <div className="absolute inset-0 pointer-events-none opacity-360">
        <AnimatedNetwork />
      </div>
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/90 via-white/70 to-white/50 dark:from-neutral-950/90 dark:via-neutral-950/60 dark:to-neutral-900/40"
        aria-hidden="true"
      />
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-24 sm:pt-28 sm:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-gray-900 dark:text-white">{headline}</h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{subheadline}</p>
          <div className="mx-auto mt-6 max-w-2xl text-gray-600 dark:text-gray-300">
            <p>{support}</p>
            <ul className="mt-4 inline-flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <li className="rounded-full border px-3 py-1">Driver compatibility</li>
              <li className="rounded-full border px-3 py-1">Rollback safety</li>
              <li className="rounded-full border px-3 py-1">Zero‑downtime updates</li>
            </ul>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <a href="/marketplace" aria-label="Browse Marketplace">
                Browse Marketplace
              </a>
            </Button>
            <Button asChild variant="outline" className="border-sky-500 text-sky-600 hover:bg-sky-50 bg-transparent">
              <a href="/marketplace/contact" aria-label="Start Deploying">
                Start Deploying
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
