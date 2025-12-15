import { Link } from "react-router-dom"
import { Sparkles } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">Agency.AI</span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm">
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Agency.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
