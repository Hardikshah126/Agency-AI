import { Heart, Layers, GitBranch, Mic, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const features = [
  {
    icon: Heart,
    title: "Emotional Writing Engine",
    description: "AI trained on thousands of high-performing posts to understand what makes content resonate emotionally.",
  },
  {
    icon: Layers,
    title: "Multi-Platform Generation",
    description: "One idea, multiple formats. Instantly adapt your message for LinkedIn, X, and Instagram Reels.",
  },
  {
    icon: GitBranch,
    title: "A/B Variants",
    description: "Generate multiple versions of each post to test what works best with your audience.",
  },
  {
    icon: Mic,
    title: "Voice-to-Post",
    description: "Speak your ideas naturally and let AI transform them into polished, platform-ready content.",
  },
  {
    icon: Brain,
    title: "Brand Voice Memory",
    description: "AI learns your unique style over time, ensuring every piece of content sounds authentically you.",
  },
]

export function Features() {
  return (
    <section className="py-24 gradient-hero">
      <div className="container px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Features Built for{" "}
            <span className="text-gradient">Modern Creators</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to build a powerful personal brand, faster than ever
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                variant="elevated"
                className="group cursor-pointer"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-2 group-hover:gradient-primary transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
