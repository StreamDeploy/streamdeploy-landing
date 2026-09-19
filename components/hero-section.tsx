export default function HeroSection({
  platforms = "edge AI, robotics and IoT",
  subheadline = "deployments feel like web deployments",
  support = "Stop wrestling with network tweaks and manual image loads. With StreamDeploy, you ship once, update fleets instantly, and roll back in seconds — safely.",
}: {
  platforms?: string
  subheadline?: string
  support?: string
}) {
  return (
    <section className="relative overflow-hidden border-b bg-white dark:bg-neutral-950">
      {/* Static engineering grid: depth without motion. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55] dark:opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgb(148 163 184 / 0.14) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgb(148 163 184 / 0.14) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 30% 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 30% 0%, black 40%, transparent 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
      />

      <div className="relative z-10 container mx-auto px-4 py-24 sm:py-28 lg:py-36">
        <div className="max-w-4xl">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Container OTA for edge fleets
          </p>

          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl leading-[1.08]">
            Make <span className="text-blue-600 dark:text-blue-400">{platforms}</span> {subheadline}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-300">
            {support}
          </p>
        </div>
      </div>
    </section>
  )
}
