import type { Metadata } from "next"
import { Suspense } from "react"
import SiteHeader from "@/components/site-header"
import ContactForm from "@/components/marketplace/contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Request Access — StreamDeploy Curated Containers",
  description: "Request access to StreamDeploy curated images for ROS 2 streaming, TensorRT inference, and Coral Edge TPU.",
  alternates: { canonical: "/marketplace/contact" },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full text-gray-900 dark:text-gray-100">
      <SiteHeader />
      <section className="relative bg-gradient-to-b from-gray-50/70 to-white dark:from-neutral-900/50 dark:to-neutral-950 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Get Access to Curated Images</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Secure, fleet-ready containers for NVIDIA Orin/Jetson and Coral Edge TPU. Fill out the form and we'll
                reach out with download credentials and setup guidance.
              </p>
            </div>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Contact details</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="text-sm text-gray-500">Loading form…</div>}>
                  <ContactForm />
                </Suspense>
              </CardContent>
            </Card>
            <p className="mt-4 text-center text-xs text-gray-600 dark:text-gray-400">
              By submitting, you agree to receive communications from StreamDeploy. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white/70 backdrop-blur dark:bg-neutral-950/60">
        <div className="container mx-auto flex flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {"© "} {new Date().getFullYear()} StreamDeploy. All rights reserved.
          </p>
          <div className="text-xs text-gray-600 dark:text-gray-400">We’ll respond within one business day.</div>
        </div>
      </footer>
    </main>
  )
}
