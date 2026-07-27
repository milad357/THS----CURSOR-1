import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-input bg-[#090d14] px-3 py-2 text-base text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-text-muted hover:border-white/60 focus-visible:border-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red/40 disabled:cursor-not-allowed disabled:opacity-50 read-only:bg-white/[0.04] read-only:text-text-secondary md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
