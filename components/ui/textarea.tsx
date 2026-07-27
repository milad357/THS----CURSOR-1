import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-24 w-full rounded-md border border-input bg-[#090d14] px-3 py-2 text-base text-foreground shadow-sm transition-colors placeholder:text-text-muted hover:border-white/60 focus-visible:border-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red/40 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
