"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

type Props = {
  defaultInterest?: string
}

const DEPRECATED_NOTE = "StreamDeploy has been discontinued. This site is preserved as a showcase."

export default function ContactForm({ defaultInterest }: Props) {
  const params = useSearchParams()
  const [interest, setInterest] = useState(defaultInterest || params.get("interest") || "")

  useEffect(() => {
    if (!defaultInterest) {
      setInterest(params.get("interest") || "")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  // The service is shut down: this form no longer submits anywhere.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-describedby="contact-deprecated-note">
      <div
        id="contact-deprecated-note"
        role="note"
        className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200"
      >
        <span className="font-semibold">Deprecated.</span> {DEPRECATED_NOTE} This form is shown for
        reference only and no longer accepts submissions.
      </div>

      <fieldset disabled className="space-y-4 opacity-60">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="firstName">First name*</Label>
            <Input id="firstName" name="firstName" placeholder="Ada" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName">Last name*</Label>
            <Input id="lastName" name="lastName" placeholder="Lovelace" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="email">Work email*</Label>
            <Input id="email" name="email" type="email" placeholder="you@company.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="jobTitle">Job title*</Label>
            <Input id="jobTitle" name="jobTitle" placeholder="Robotics Engineer" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="company">Company*</Label>
            <Input id="company" name="company" placeholder="Acme Robotics" />
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
          <Button
            type="submit"
            disabled
            aria-label="Request access — deprecated"
            title={DEPRECATED_NOTE}
            className="bg-gray-300 text-gray-600 dark:bg-neutral-800 dark:text-gray-400 cursor-not-allowed"
          >
            Deprecated
          </Button>
        </div>
      </fieldset>
    </form>
  )
}
