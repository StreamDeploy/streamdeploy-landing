import { Button } from "@/components/ui/button"

export default function CtaBanner({
  title = "Stop Fighting Your Deployments. Start StreamDeploy.",
}: {
  title?: string
}) {
  return (
    <div
      id="marketplace"
      className="relative overflow-hidden rounded-2xl border bg-gradient-to-r from-emerald-500 to-sky-500 p-8 text-white"
    >
      <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="mx-auto max-w-5xl">
        <div className="grid items-center gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="mt-2 text-white/90">
              Browse curated containers and deploy to your fleet with driver‑safe OTA updates.
            </p>
          </div>
          <div className="flex items-center gap-3 md:justify-end">
            <Button asChild className="bg-white text-emerald-600 hover:bg-white/90">
              <a href="/marketplace" aria-label="Browse Marketplace">
                Browse Marketplace
              </a>
            </Button>
            <Button asChild variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
              <a href="app.streamdeploy/signin" aria-label="Deploy Now">
                Deploy Now
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
