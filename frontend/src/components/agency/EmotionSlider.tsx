import * as React from "react"
import { cn } from "@/lib/utils"

interface EmotionSliderProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

const emotionLevels = [
  { label: "Calm", emoji: "😌", color: "from-blue-400 to-blue-500" },
  { label: "Neutral", emoji: "😐", color: "from-gray-400 to-gray-500" },
  { label: "Deep", emoji: "💫", color: "from-purple-500 to-pink-500" },
]

export function EmotionSlider({
  value,
  onChange,
  className,
}: EmotionSliderProps) {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const isDragging = React.useRef(false)

  const updateValueFromClientX = (clientX: number) => {
    if (!trackRef.current) return

    const rect = trackRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = x / rect.width

    let newValue = 0
    if (percent < 0.33) newValue = 0
    else if (percent < 0.66) newValue = 1
    else newValue = 2

    onChange(newValue)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    updateValueFromClientX(e.clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    updateValueFromClientX(e.clientX)
  }

  const stopDragging = () => {
    isDragging.current = false
  }

  return (
    <div
      className={cn("space-y-3 select-none", className)}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      <div className="flex items-center justify-between text-sm">
        <span>Emotion Level</span>
        <span className="font-medium">
          {emotionLevels[value].label}
        </span>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-2 rounded-full bg-secondary cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
      >
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all",
            emotionLevels[value].color
          )}
          style={{ width: `${((value + 1) / 3) * 100}%` }}
        />

        {/* Thumb */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-background border-2 border-primary shadow-md"
          style={{
            left: `calc(${(value / 2) * 100}% - 12px)`,
          }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-muted-foreground">
        {emotionLevels.map((level) => (
          <span key={level.label}>{level.label}</span>
        ))}
      </div>
    </div>
  )
}
