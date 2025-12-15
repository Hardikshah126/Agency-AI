import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Sparkles, Hash, Volume2, FileText } from "lucide-react"

export interface BrandVoicePanelProps {
  keywords: string
  tone: string
  sampleText: string
  onChange: (data: {
    keywords: string
    tone: string
    sampleText: string
  }) => void
  className?: string
}

export const BrandVoicePanel: React.FC<BrandVoicePanelProps> = ({
  keywords,
  tone,
  sampleText,
  onChange,
  className,
}) => {
  return (
    <Card variant="glass" className={cn("", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-primary" />
          Brand Voice
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Hash className="w-4 h-4 text-muted-foreground" />
            Keywords
          </label>
          <Input
            value={keywords}
            onChange={(e) =>
              onChange({ keywords: e.target.value, tone, sampleText })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <Volume2 className="w-4 h-4 text-muted-foreground" />
            Tone Preferences
          </label>
          <Input
            value={tone}
            onChange={(e) =>
              onChange({ keywords, tone: e.target.value, sampleText })
            }
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <FileText className="w-4 h-4 text-muted-foreground" />
            Sample Writing
          </label>
          <Textarea
            value={sampleText}
            onChange={(e) =>
              onChange({ keywords, tone, sampleText: e.target.value })
            }
            textareaSize="lg"
          />
        </div>
      </CardContent>
    </Card>
  )
}
