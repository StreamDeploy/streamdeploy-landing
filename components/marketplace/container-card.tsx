"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ContainerMeta } from "@/data/marketplace"
import { Cpu, ExternalLink } from "lucide-react"

export function ContainerCard({ c }: { c: ContainerMeta }) {
  return (
    <Card className="h-full border-gray-200/70 dark:border-neutral-800/70">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">{c.name}</CardTitle>
          <Cpu className="h-4 w-4 text-emerald-500" />
        </div>
        <CardDescription className="text-xs sm:text-sm">{c.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-xs">
          <div className="text-gray-500 dark:text-gray-400">Primary HW</div>
          <div className="font-medium">{c.primaryHw}</div>
        </div>
        <div className="text-xs">
          <div className="text-gray-500 dark:text-gray-400">What it does</div>
          <div>{c.whatItDoes}</div>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {c.architectures.map((a) => (
            <Badge key={a} variant="secondary" className="text-[10px]">
              {a}
            </Badge>
          ))}
          {c.tags.slice(0, 4).map((t) => (
            <Badge key={t} variant="outline" className="text-[10px]">
              {t}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button asChild size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white">
          <Link href={`/marketplace/${c.slug}`}>View details</Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="gap-1.5">
          <Link href={`/marketplace/contact?interest=${encodeURIComponent(c.slug)}`}>
            Request access <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
