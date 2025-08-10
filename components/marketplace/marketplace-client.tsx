"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ContainerCard } from "@/components/marketplace/container-card"
import { containers } from "@/data/marketplace"
import { Cpu, Filter } from "lucide-react"

const PLATFORM_FILTERS = [
  { id: "arm64", label: "arm64" },
  { id: "amd64", label: "amd64" },
  { id: "jetson", label: "Jetson" },
  { id: "coral", label: "Coral" },
] as const

export default function MarketplaceClient({ intro }: { intro: string }) {
  const [q, setQ] = useState("")
  const [active, setActive] = useState<string[]>([])

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase()
    return containers.filter((c) => {
      const hay =
        `${c.name} ${c.tagline} ${c.whatItDoes} ${c.whyItSavesTime} ${c.tags.join(" ")} ${c.primaryHw}`.toLowerCase()
      const matchesText = !text || hay.includes(text)
      const matchesFilters =
        active.length === 0 ||
        active.every((f) => {
          if (f === "arm64" || f === "amd64") return c.architectures.includes(f as "arm64" | "amd64")
          if (f === "jetson") return /jetson|orin/i.test(c.primaryHw) || c.tags.some((t) => /jetson|nvenc/i.test(t))
          if (f === "coral") return /coral/i.test(c.primaryHw) || c.tags.some((t) => /coral|edgetpu/i.test(t))
          return false
        })
      return matchesText && matchesFilters
    })
  }, [q, active])

  function toggleFilter(id: string) {
    setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <>
      <section className="relative border-b bg-gray-50/60 py-12 dark:bg-neutral-900/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Cpu className="h-6 w-6 text-emerald-500" />
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">StreamDeploy Curated Containers</h1>
          </div>
          <p className="mt-3 max-w-3xl text-sm text-gray-700 dark:text-gray-300">{intro}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-md">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search containers…"
                aria-label="Search containers"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                <Filter className="h-3.5 w-3.5" /> Filters:
              </span>
              {PLATFORM_FILTERS.map((f) => (
                <Button
                  key={f.id}
                  size="sm"
                  variant={active.includes(f.id) ? "default" : "outline"}
                  className={active.includes(f.id) ? "bg-emerald-500 text-white hover:bg-emerald-600" : ""}
                  onClick={() => toggleFilter(f.id)}
                >
                  {f.label}
                </Button>
              ))}
              {active.length > 0 && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-600 underline"
                  onClick={() => setActive([])}
                  aria-label="Clear filters"
                >
                  Clear
                </Button>
              )}
            </div>
            <div className="hidden sm:block">
              <Badge variant="secondary" className="text-[10px]">
                {filtered.length} of {containers.length} shown
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <ContainerCard key={c.slug} c={c} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="mt-10 rounded-md border p-6 text-center text-sm text-gray-600 dark:text-gray-300">
              No results. Try clearing filters or adjusting your search query.
            </div>
          )}
        </div>
      </section>
    </>
  )
}
