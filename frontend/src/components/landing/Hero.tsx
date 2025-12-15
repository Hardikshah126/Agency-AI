import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Play } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-primary/10 text-sm font-medium text-accent-foreground animate-fade-in">
            <Sparkles className="w-4 h-4" />
            AI-Powered Personal Branding
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Your Personal Brand.{" "}
            <span className="text-gradient">Powered by Emotion.</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Agency.AI transforms raw ideas into powerful LinkedIn posts, X threads, and Instagram Reel scripts — written in your authentic brand voice.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild variant="hero" size="xl">
              <Link to="/app">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl">
              <Play className="w-5 h-5" />
              Try Demo
            </Button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-6 pt-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-primary/20 to-accent/20"
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground"></span> Designed for creators who care about clarity, emotion, and voice.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
