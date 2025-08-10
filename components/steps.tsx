import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Boxes, Settings2, Rocket, Undo2 } from "lucide-react"

const steps = [
  {
    title: "Choose a curated container",
    desc: "Pick from our marketplace of production‑ready containers built for Jetson Orin and robotics.",
    icon: Boxes,
  },
  {
    title: "Customize configs",
    desc: "Tune device and fleet configs once: drivers, env, GPU, networks.",
    icon: Settings2,
  },
  {
    title: "Deploy at scale",
    desc: "Ship to 1 to 10,000 devices with a single command and safe rollout strategies.",
    icon: Rocket,
  },
  {
    title: "Update or roll back instantly",
    desc: "Zero‑downtime OTA with version‑controlled configs and automatic rollback.",
    icon: Undo2,
  },
]

export default function Steps() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => {
        const Icon = s.icon
        return (
          <Card
            key={s.title}
            className="group relative overflow-hidden border-gray-200/70 hover:shadow-md transition-shadow"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-sky-100/40 to-emerald-100/40" />
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600">
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">{`${i + 1}. ${s.title}`}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
