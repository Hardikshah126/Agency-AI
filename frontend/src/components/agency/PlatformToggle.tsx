import * as React from "react"
import { cn } from "@/lib/utils"
import { Linkedin, Twitter, Film } from "lucide-react"

interface Platform {
  id: string
  label: string
  icon: React.ReactNode
}

const platforms: Platform[] = [
  { id: "linkedin", label: "LinkedIn", icon: <Linkedin className="w-4 h-4" /> },
  { id: "twitter", label: "X", icon: <Twitter className="w-4 h-4" /> },
  { id: "reels", label: "Reel Script", icon: <Film className="w-4 h-4" /> },
]

interface PlatformToggleProps {
  selected: string[]
  onChange: (selected: string[]) => void
  className?: string
}

export function PlatformToggle({ selected, onChange, className }: PlatformToggleProps) {
  const togglePlatform = (platformId: string) => {
    if (selected.includes(platformId)) {
      onChange(selected.filter((id) => id !== platformId))
    } else {
      onChange([...selected, platformId])
    }
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {platforms.map((platform) => {
        const isSelected = selected.includes(platform.id)
        return (
          <button
            key={platform.id}
            onClick={() => togglePlatform(platform.id)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              isSelected
                ? "gradient-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
            )}
          >
            {platform.icon}
            {platform.label}
          </button>
        )
      })}
    </div>
  )
}
