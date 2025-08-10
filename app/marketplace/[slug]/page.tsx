import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import SiteHeader from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/marketplace/code-block"
import { getContainerBySlug, containers } from "@/data/marketplace"
import { Cpu, ExternalLink } from "lucide-react"

type PageProps = {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const c = getContainerBySlug(params.slug)
  if (!c) return { title: "Container not found — StreamDeploy Marketplace" }
  return {
    title: `${c.name} — StreamDeploy Marketplace`,
    description: c.tagline,
    alternates: { canonical: `/marketplace/${c.slug}` },
  }
}

export function generateStaticParams() {
  return containers.map((c) => ({ slug: c.slug }))
}

export default function ContainerDetailPage({ params }: PageProps) {
  const c = getContainerBySlug(params.slug)
  if (!c) return notFound()

  return (
    <main className="min-h-screen w-full text-gray-900 dark:text-gray-100">
      <SiteHeader />
      <section className="border-b bg-gray-50/60 py-10 dark:bg-neutral-900/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Cpu className="h-6 w-6 text-emerald-500" />
              <div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{c.name}</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{c.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {c.architectures.map((a) => (
                <Badge key={a} variant="secondary">
                  {a}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {c.tags.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>
          <div className="mt-6 flex gap-2">
            <Button asChild className="bg-emerald-500 text-white hover:bg-emerald-600">
              <Link href={`/marketplace/contact?interest=${encodeURIComponent(c.slug)}`}>
                Request access <ExternalLink className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/marketplace">Back to Marketplace</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Primary hardware</div>
                  <div className="font-medium">{c.primaryHw}</div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">What it does</div>
                  <p>{c.whatItDoes}</p>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Why it saves time</div>
                  <p>{c.whyItSavesTime}</p>
                </div>
              </CardContent>
            </Card>
            <div className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Get access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="text-gray-600 dark:text-gray-300">
                    Use StreamDeploy to manage OTA updates, versioned configs, and rollbacks across fleets.
                  </p>
                  <Button asChild className="w-full bg-emerald-500 text-white hover:bg-emerald-600">
                    <Link href={`/marketplace/contact?interest=${encodeURIComponent(c.slug)}`}>Request access</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <CodeBlock title="Dockerfile" code={c.dockerfile} />
            <CodeBlock title="entrypoint.sh" code={c.entrypoint} />
          </div>
        </div>
      </section>

      <footer className="border-t bg-white/70 backdrop-blur dark:bg-neutral-950/60">
        <div className="container mx-auto flex flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {"© "} {new Date().getFullYear()} StreamDeploy. All rights reserved.
          </p>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Contact us for access to curated images.
          </div>
        </div>
      </footer>
    </main>
  )
}
