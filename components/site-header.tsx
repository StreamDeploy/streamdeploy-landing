"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Cpu } from "lucide-react"
import { useState } from "react"

export default function SiteHeader({
  logo = "StreamDeploy",
  ctaPrimaryHref = "/marketplace",
  ctaSecondaryHref = "#cta",
}: {
  logo?: string
  ctaPrimaryHref?: string
  ctaSecondaryHref?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur dark:bg-neutral-950/60">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Cpu className="h-6 w-6 text-emerald-500" />
          <span className="font-semibold tracking-tight">{logo}</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="#how-it-works"
            className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            How it works
          </Link>
          <Link
            href="#showcase"
            className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Orin Showcase
          </Link>
          <Link
            href="#why"
            className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Why
          </Link>
          <Link
            href="#validation"
            className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
          >
            Validation
          </Link>
          <div className="flex items-center gap-2">
              <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white">
                <Link href={ctaPrimaryHref} aria-label="Browse Marketplace">
                  Browse Marketplace
                </Link>
              </Button>
            <Button asChild variant="outline" className="border-sky-500 text-sky-600 hover:bg-sky-50 bg-transparent">
              <Link href={ctaSecondaryHref} aria-label="Start Deploying">
                Start Deploying
              </Link>
            </Button>
          </div>
        </nav>
        <button
          aria-label="Toggle Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white dark:bg-neutral-950">
          <div className="container mx-auto flex flex-col gap-2 px-4 py-4">
            <Link href="#how-it-works" onClick={() => setOpen(false)} className="py-2">
              How it works
            </Link>
            <Link href="#showcase" onClick={() => setOpen(false)} className="py-2">
              Orin Showcase
            </Link>
            <Link href="#why" onClick={() => setOpen(false)} className="py-2">
              Why
            </Link>
            <Link href="#validation" onClick={() => setOpen(false)} className="py-2">
              Validation
            </Link>
            <div className="mt-2 flex items-center gap-2">
              <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white flex-1">
                <Link href="/marketplace" onClick={() => setOpen(false)}>
                  Browse Marketplace
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-sky-500 text-sky-600 hover:bg-sky-50 flex-1 bg-transparent"
              >
                <Link href="#cta" onClick={() => setOpen(false)}>
                  Start Deploying
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
