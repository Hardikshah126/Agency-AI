import * as React from "react"
import { AppSidebar } from "@/components/agency/AppSidebar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlatformToggle } from "@/components/agency/PlatformToggle"
import { EmotionSlider } from "@/components/agency/EmotionSlider"
import { PreviewTabs } from "@/components/agency/PreviewTabs"
import { BrandVoicePanel } from "@/components/agency/BrandVoicePanel"
import { Wand2 } from "lucide-react"
import api from "@/lib/api"

const AppDashboard = () => {
  // ---------------- CORE STATE ----------------
  const [inputText, setInputText] = React.useState("")
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>([
    "linkedin",
  ])
  const [emotionLevel, setEmotionLevel] = React.useState(1)
  const [activeTab, setActiveTab] = React.useState("linkedin")
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [generatedOutputs, setGeneratedOutputs] = React.useState<
    Record<string, string>
  >({})
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  // ---------------- BRAND VOICE STATE ----------------
  const [brandVoice, setBrandVoice] = React.useState({
    keywords: "authentic, insightful, inspiring, practical",
    tone: "Conversational yet authoritative, warm but professional",
    sampleText:
      "I believe in the power of authentic storytelling. Every person has a unique voice that deserves to be heard.",
  })


const normalizePlatform = (platform: string) => {
  const p = platform.toLowerCase()

  if (p === "linkedin") return "linkedin"
  if (p === "x" || p === "twitter" || p.includes("x")) return "x"
  if (p.includes("reel")) return "instagram_reel"

  return p
}



  // ---------------- GENERATE HANDLER ----------------
  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setErrorMessage("Please enter some text.")
      return
    }

    setIsGenerating(true)
    setErrorMessage(null)

    try {
      const payload = {
        input_type: "text",
        content: inputText,
        platforms: selectedPlatforms.map(normalizePlatform),

        intensity:
          emotionLevel === 0
            ? "calm"
            : emotionLevel === 1
            ? "medium"
            : "deep",
        variants: 1,

        // 🔥 Brand Voice
        brand_keywords: brandVoice.keywords,
        brand_tone: brandVoice.tone,
        brand_sample: brandVoice.sampleText,
      }

      const res = await api.post("/api/generate", payload)

      const outputs: Record<string, string> = {}
      ;(res.data || []).forEach((item: any) => {
        outputs[item.platform] = item.text
      })

      setGeneratedOutputs(outputs)
      console.log("API RESPONSE RAW:", res.data);
      console.log("GENERATED OUTPUTS STATE:", outputs);

      const first = selectedPlatforms[0];

if (first === "Reel Script") {
  setActiveTab("reel");
} else if (first === "X" || first === "X / Thread") {
  setActiveTab("x");
} else {
  setActiveTab("linkedin");
}

    } catch (err) {
      console.error(err)
      setErrorMessage("Failed to generate content.")
    } finally {
      setIsGenerating(false)
    }
  }

  // ---------------- UI ----------------
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* MAIN COMPOSER */}
        <main className="flex-1 p-6 space-y-6">
          <h1 className="text-2xl font-bold">Content Composer</h1>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5" />
                Your Rough Idea
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your rough thoughts here..."
              />

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? "Generating..." : "Generate Human Content"}
              </Button>

              {errorMessage && (
                <p className="text-sm text-red-500">{errorMessage}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <PlatformToggle
                selected={selectedPlatforms}
                onChange={setSelectedPlatforms}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emotional Tone</CardTitle>
            </CardHeader>
            <CardContent>
              <EmotionSlider
                value={emotionLevel}
                onChange={setEmotionLevel}
              />
            </CardContent>
          </Card>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-[420px] p-6 border-l gap-6">
          <BrandVoicePanel
            keywords={brandVoice.keywords}
            tone={brandVoice.tone}
            sampleText={brandVoice.sampleText}
            onChange={setBrandVoice}
          />

          <PreviewTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            generated={generatedOutputs}
          />
        </aside>
      </div>
    </div>
  )
}

export default AppDashboard
