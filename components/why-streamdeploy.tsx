import { Card, CardContent } from "@/components/ui/card"
import { ShieldCheck, Rocket, Undo2, Cpu, MonitorSmartphone, Settings2 } from "lucide-react"

export default function WhyStreamDeploy() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold">Why StreamDeploy</h3>
        <p className="mt-3 text-gray-700 dark:text-gray-300">
          The container marketplace and OTA platform built for NVIDIA Orins, robotics fleets, and edge AI.
        </p>
        {/* SEO keywords called out explicitly as requested */}
        <p className="sr-only">
          SEO: fleet deployment, NVIDIA Orin containers, robot OTA updates, container marketplace, Jetson fleet
          management
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Feature
          icon={Settings2}
          title="Curated, production‑ready containers"
          desc="Hardened images tuned for Jetson Orin GPUs, robotics, and vision workloads."
        />
        <Feature
          icon={Rocket}
          title="OTA that scales 1 → 10,000"
          desc="Rollouts with canaries, health checks, and phased updates for huge fleets."
        />
        <Feature
          icon={Undo2}
          title="Version control + one‑command rollbacks"
          desc="Track every change and revert instantly with safe state management."
        />
        <Feature
          icon={ShieldCheck}
          title="GPU driver–safe updates"
          desc="Driver compatibility and kernel guardrails reduce field failures."
        />
        <Feature
          icon={MonitorSmartphone}
          title="Works across edge AI"
          desc="Robotics, vision systems, kiosks — any containerized edge workload."
        />
        <Feature icon={Cpu} title="Faster than DIY" desc="No custom OTA tooling. Ship once, update fleets instantly." />
      </div>
    </div>
  )
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: any
  title: string
  desc: string
}) {
  return (
    <Card className="border-gray-200/70">
      <CardContent className="flex items-start gap-4 p-6">
        <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-md bg-sky-500/10 text-sky-600">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-semibold">{title}</h4>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{desc}</p>
        </div>
      </CardContent>
    </Card>
  )
}
