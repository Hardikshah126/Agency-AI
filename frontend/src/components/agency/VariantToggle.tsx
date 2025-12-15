import * as React from "react"
import { cn } from "@/lib/utils"

interface VariantToggleProps {
  activeVariant: "A" | "B"
  onChange: (variant: "A" | "B") => void
  className?: string
}

export function VariantToggle({ activeVariant, onChange, className }: VariantToggleProps) {
  return (
    <div className={cn("flex gap-2", className)}>
      <button
        onClick={() => onChange("A")}
        className={cn(
          "flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
          activeVariant === "A"
            ? "gradient-primary text-primary-foreground shadow-soft"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
        )}
      >
        Variant A
      </button>
      <button
        onClick={() => onChange("B")}
        className={cn(
          "flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
          activeVariant === "B"
            ? "gradient-primary text-primary-foreground shadow-soft"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
        )}
      >
        Variant B
      </button>
    </div>
  )
}
