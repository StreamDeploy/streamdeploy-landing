"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Cpu, Network, TerminalSquare } from "lucide-react"

const snippet = `# example-robot-docker
# Deploy ROS 2 Perception stack to a Jetson Orin fleet (safe, driver-aware)
sd deploy \\
  --fleet warehouse-bots \\
  --image ghcr.io/streamdeploy/ros2-perception:2024.3 \\
  --device-type jetson-orin \\
  --rollout canary:10% \\
  --config configs/warehouse.yaml

# Update with zero downtime, instant rollback if healthcheck fails
sd update --fleet warehouse-bots --image ghcr.io/streamdeploy/ros2-perception:2024.4
sd rollback --fleet warehouse-bots --to previous
`

export default function ShowcaseOrin() {
  const [copied, setCopied] = useState(false)
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 grid items-center gap-6 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold">NVIDIA Orin Deployment</h3>
          <p className="mt-3 text-gray-700 dark:text-gray-300">
            A robotics fleet OTA in minutes — version‑controlled configs, automatic rollback, GPU driver‑safe updates.
            Unlike generic IoT platforms, StreamDeploy is optimized for the Jetson GPU stack and robotics workflows.
          </p>
          <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
            <li className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-emerald-600" /> Jetson Orin GPU‑aware containers
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> Automatic driver compatibility checks
            </li>
            <li className="flex items-center gap-2">
              <Network className="h-4 w-4 text-emerald-600" /> Rollouts with canary and health checks
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-3">
            <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <a href="/marketplace">Browse Marketplace</a>
            </Button>
            <Button asChild variant="outline" className="border-sky-500 text-sky-600 hover:bg-sky-50 bg-transparent">
              <a href="https://github.com/streamdeploy/example-robot-docker" target="_blank" rel="noreferrer">
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <TerminalSquare className="h-5 w-5 text-emerald-600" />
              <CardTitle className="text-base">example-robot-docker</CardTitle>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent"
              onClick={async () => {
                await navigator.clipboard.writeText(snippet)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
            >
              {copied ? "Copied" : "Copy"}
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-md bg-neutral-950 p-4 text-sm text-emerald-100">
              <code>{snippet}</code>
            </pre>
            <CardDescription className="mt-2">
              Monospace output is illustrative. Replace fleet name, image tags, and configs for your environment.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
