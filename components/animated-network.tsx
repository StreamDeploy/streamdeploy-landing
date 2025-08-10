"use client"

import { useEffect, useRef } from "react"

type Node = { x: number; y: number; vx: number; vy: number; r: number }

export default function AnimatedNetwork({
  density = 0.0016,
  lineColor = "rgba(16,185,129,0.5)",
}: { density?: number; lineColor?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const nodesRef = useRef<Node[]>([])

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    const dpr = Math.max(1, window.devicePixelRatio || 1)

    function resize() {
      const { innerWidth: w, innerHeight: h } = window
      canvas.width = w * dpr
      canvas.height = h * dpr * 0.6 // hero height
      canvas.style.width = `${w}px`
      canvas.style.height = `${h * 0.6}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seedNodes()
    }

    function seedNodes() {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const count = Math.max(24, Math.floor(w * h * density))
      nodesRef.current = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 1.2 + Math.random() * 2.2,
      }))
    }

    let t = 0
    function draw() {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      // subtle gradient backdrop
      const gradient = ctx.createLinearGradient(0, 0, w, h)
      gradient.addColorStop(0, "rgba(56,189,248,0.06)") // sky-400
      gradient.addColorStop(1, "rgba(16,185,129,0.06)") // emerald-500
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      const nodes = nodesRef.current

      // update nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
      }

      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          const max = 140
          if (dist < max) {
            const alpha = (1 - dist / max) * 0.7
            ctx.strokeStyle = lineColor.replace(/0\.5\)/, `${alpha})`)
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // pulse
      t += 0.01
      for (const n of nodes) {
        const pulse = 0.5 + Math.sin(t + n.x * 0.01 + n.y * 0.01) * 0.5
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + pulse * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(16,185,129,0.25)" // emerald
        ctx.fill()
        ctx.beginPath()
        ctx.arc(n.x, n.y, 0.6, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(20,184,166,0.9)" // teal-ish
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener("resize", resize)
    rafRef.current = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener("resize", resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [density, lineColor])

  return <canvas ref={canvasRef} className="w-full h-[55vh] block" aria-hidden="true" />
}
