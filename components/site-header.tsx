"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function SiteHeader({
  ctaPrimaryHref = "/marketplace",
}: {
  ctaPrimaryHref?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md dark:bg-neutral-950/80 shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-2">
        <Link href="/" className="flex items-center gap-1 group">
          <Image
            src="/android-chrome-192x192.png"
            alt="StreamDeploy Logo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
            priority
          />

          <span className="font-semibold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            StreamDeploy
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <div>
            <Link
              href="/#how-it-works"
              className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium"
            >
              How it works
            </Link>
          </div>
          <div>
            <Link
              href="/#showcase"
              className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Orin Showcase
            </Link>
          </div>
          <div>
            <Link
              href="/#why"
              className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Why
            </Link>
          </div>
          <div>
            <Link
              href="/#validation"
              className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Validation
            </Link>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <div
            >
              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md shadow-blue-500/25 border-0"
              >
                <Link href={ctaPrimaryHref} aria-label="Browse Marketplace">
                  Browse Marketplace
                </Link>
              </Button>
            </div>

            <div>
              <Button
                disabled
                variant="outline"
                aria-label="Start Deploying \u2014 deprecated"
                title="StreamDeploy has been discontinued. This site is preserved as a showcase."
                className="border-2 border-gray-300 text-gray-400 dark:border-gray-700 dark:text-gray-500 bg-white/60 dark:bg-neutral-900/60 cursor-not-allowed"
              >
                Deprecated
              </Button>
            </div>
          </div>
        </nav>

        <button
          aria-label="Toggle Menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-md border-2 border-blue-200 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950/30 transition-colors"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          className="md:hidden border-t border-blue-100 bg-white/95 backdrop-blur-md dark:bg-neutral-950/95 dark:border-blue-900"
        >
          <div className="container mx-auto flex flex-col gap-2 px-4 py-4">
            <div
            >
              <Link
                href="/#how-it-works"
                onClick={() => setOpen(false)}
                className="py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium block"
              >
                How it works
              </Link>
            </div>

            <div
            >
              <Link
                href="/#showcase"
                onClick={() => setOpen(false)}
                className="py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium block"
              >
                Orin Showcase
              </Link>
            </div>

            <div
            >
              <Link
                href="/#why"
                onClick={() => setOpen(false)}
                className="py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium block"
              >
                Why
              </Link>
            </div>

            <div
            >
              <Link
                href="/#validation"
                onClick={() => setOpen(false)}
                className="py-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium block"
              >
                Validation
              </Link>
            </div>

            <div
              className="mt-4 flex items-center gap-2"
            >
              <Button
                asChild
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex-1 shadow-md shadow-blue-500/25"
              >
                <Link href="/marketplace" onClick={() => setOpen(false)}>
                  Browse Marketplace
                </Link>
              </Button>
              <Button
                disabled
                variant="outline"
                aria-label="Start Deploying \u2014 deprecated"
                title="StreamDeploy has been discontinued. This site is preserved as a showcase."
                className="border-2 border-gray-300 text-gray-400 dark:border-gray-700 dark:text-gray-500 flex-1 bg-white/60 dark:bg-neutral-900/60 cursor-not-allowed"
              >
                Deprecated
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
