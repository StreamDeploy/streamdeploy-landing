import { Button } from "@/components/ui/button"

const DEPRECATED_NOTE = "StreamDeploy has been discontinued. This site is preserved as a showcase."

export default function CtaBanner({
  title = "Stop Fighting Your Deployments. Start StreamDeploy.",
}: {
  title?: string
}) {
  return (
    <div
      id="marketplace"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 p-8 text-white shadow-lg sm:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid items-center gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{title}</h3>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              Browse curated containers and deploy to your fleet with driver‑safe OTA updates.
            </p>
          </div>

          <div className="flex items-center gap-3 md:justify-end">
            <Button asChild className="bg-white font-medium text-blue-700 hover:bg-white/90">
              <a href="/marketplace" aria-label="Browse Marketplace">
                Browse Marketplace
              </a>
            </Button>

            <Button
              disabled
              variant="secondary"
              aria-label="Deploy Now — deprecated"
              title={DEPRECATED_NOTE}
              className="cursor-not-allowed border border-white/20 bg-white/5 font-medium text-white/60"
            >
              Deprecated
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
