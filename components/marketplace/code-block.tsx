"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Copy } from "lucide-react"

type CodeBlockProps = {
  code: string
  title?: string
  className?: string
}

export function CodeBlock({ code, title, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  return (
    <div className={cn("rounded-md border bg-white/60 dark:bg-neutral-900/60 backdrop-blur", className)}>
      <div className="flex items-center justify-between border-b px-3 py-2">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{title ?? "Code"}</div>
        <Button size="sm" variant="outline" onClick={onCopy} className="h-7 gap-2">
          <Copy className="h-3.5 w-3.5" />
          {copied ? "Copied" : "Copy"}
        </Button>
      </div>
      <pre className="max-h-[520px] overflow-auto p-3 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}
