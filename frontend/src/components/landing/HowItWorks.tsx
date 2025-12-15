import { Lightbulb, Layers, Wand2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    icon: Lightbulb,
    step: "01",
    title: "Input Your Idea",
    description: "Share your raw thoughts, a rough draft, or just a simple concept. No need for polish — we work with real.",
  },
  {
    icon: Layers,
    step: "02",
    title: "Select Platforms",
    description: "Choose where your content goes: LinkedIn for professionals, X for conversations, or Reels for visual storytelling.",
  },
  {
    icon: Wand2,
    step: "03",
    title: "Generate Content",
    description: "Our emotional AI engine crafts platform-optimized content that sounds like you — only better.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Three simple steps to transform your ideas into compelling content
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card
                key={step.title}
                variant="glass"
                className="relative group hover:shadow-elevated transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  {/* Step number */}
                  <span className="text-6xl font-bold text-primary/10 absolute top-4 right-4">
                    {step.step}
                  </span>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-soft group-hover:shadow-glow transition-shadow duration-300">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Connecting line (desktop) */}
        <div className="hidden md:block max-w-4xl mx-auto mt-8">
          <div className="h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </div>
    </section>
  )
}
