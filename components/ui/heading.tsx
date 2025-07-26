import type { HTMLAttributes } from "react"

import { cn } from "@/src/lib/utils"

interface HeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export function Heading({ title, description, className, ...props }: HeadingProps) {
  return (
    <div className={cn("grid gap-1", className)} {...props}>
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  )
}
