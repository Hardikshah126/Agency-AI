import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Linkedin, Twitter, Film } from "lucide-react"

export function Preview() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-muted-foreground">
            Watch how Agency.AI transforms your ideas into platform-perfect content
          </p>
        </div>

        {/* Preview UI Mock */}
        <Card variant="glass" className="max-w-5xl mx-auto p-6 sm:p-8 shadow-elevated">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Side */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Your Idea</label>
                <Textarea
                  placeholder="I want to share my thoughts on why authenticity matters more than perfection in personal branding..."
                  textareaSize="xl"
                  className="resize-none"
                  defaultValue="I want to share my thoughts on why authenticity matters more than perfection in personal branding..."
                />
              </div>

              {/* Platform chips */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg gradient-primary text-primary-foreground text-sm">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm">
                    <Twitter className="w-4 h-4" /> X
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm">
                    <Film className="w-4 h-4" /> Reels
                  </span>
                </div>
              </div>

              <Button variant="hero" className="w-full">
                <Sparkles className="w-5 h-5" />
                Generate Content
              </Button>
            </div>

            {/* Output Side */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">LinkedIn Preview</label>
                <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-accent">
                  Auto-generated
                </span>
              </div>
              
              <Card variant="outline" className="p-5 min-h-[300px] bg-background/50">
                <div className="space-y-4">
                  {/* Mock LinkedIn post */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary" />
                    <div>
                      <p className="text-sm font-medium">Your Name</p>
                      <p className="text-xs text-muted-foreground">Just now • 🌍</p>
                    </div>
                  </div>
                  
                  <div className="text-sm leading-relaxed space-y-3">
                    <p>🎯 Here's something most people get wrong about personal branding...</p>
                    <p>It's not about being perfect. It's about being REAL.</p>
                    <p>In a world of polished feeds and curated content, authenticity is your superpower.</p>
                    <p className="text-muted-foreground">...</p>
                    <p className="text-primary text-xs">#PersonalBranding #Authenticity</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
