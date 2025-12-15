import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Agency.AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
              How It Works
            </a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex">
            <Button asChild size="sm">
              <Link to="/app">Get Started</Link>
            </Button>
          </div>

          {/* Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </nav>

        <div
          className={cn(
            "md:hidden overflow-hidden transition-all",
            mobileMenuOpen ? "max-h-64 pb-4" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-4 pt-4 border-t">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>

            <Button asChild>
              <Link to="/app">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
