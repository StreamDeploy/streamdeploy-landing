"use client"

import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

type Props = {
  defaultInterest?: string
}

export default function ContactForm({ defaultInterest }: Props) {
  const { toast } = useToast()
  const params = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)
  const [submitting, setSubmitting] = useState(false)
  const [interest, setInterest] = useState(defaultInterest || params.get("interest") || "")

  useEffect(() => {
    if (!defaultInterest) {
      setInterest(params.get("interest") || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    setSubmitting(true)
    try {
      const body = new FormData(form)
      // append a subject to help triage
      body.append("_subject", `Marketplace inquiry: ${interest || "general"}`)
      // Formspree expects Accept header for JSON response
      const res = await fetch("https://formspree.io/f/manbalja", {
        method: "POST",
        headers: { Accept: "application/json" },
        body,
      })
      if (res.ok) {
        form.reset()
        setInterest("")
        toast({
          title: "Request sent",
          description: "Thanks! We will contact you with access instructions shortly.",
        })
      } else {
        const data = await res.json().catch(() => ({}))
        const msg =
          data?.errors?.[0]?.message ||
          data?.message ||
          "Submission failed. Please try again or email support."
        toast({ title: "Submission error", description: String(msg) })
      }
    } catch (err: any) {
      toast({ title: "Network error", description: String(err?.message || err) })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="firstName">First name*</Label>
          <Input id="firstName" name="firstName" placeholder="Ada" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lastName">Last name*</Label>
          <Input id="lastName" name="lastName" placeholder="Lovelace" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="email">Work email*</Label>
          <Input id="email" name="email" type="email" placeholder="you@company.com" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="jobTitle">Job title*</Label>
          <Input id="jobTitle" name="jobTitle" placeholder="Robotics Engineer" required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="company">Company*</Label>
          <Input id="company" name="company" placeholder="Acme Robotics" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" placeholder="+1 555 123 4567" />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="interest">Interested image</Label>
        <Input
          id="interest"
          name="interest"
          placeholder="ros2-vision-streamer, triton-robot-inference, coral-rtsp-detector"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Anything else?</Label>
        <Textarea id="message" name="message" placeholder="Share requirements, hardware, timelines, etc." rows={5} />
      </div>

      <div className="flex items-center gap-2">
        <input id="optIn" name="optIn" type="checkbox" className="h-4 w-4" />
        <Label htmlFor="optIn" className="text-sm text-gray-600 dark:text-gray-300">
          I agree to receive communications from StreamDeploy.
        </Label>
      </div>

      <div className="pt-2">
        <Button type="submit" disabled={submitting} className="bg-emerald-500 text-white hover:bg-emerald-600">
          {submitting ? "Submitting…" : "Request access"}
        </Button>
      </div>
    </form>
  )
}
