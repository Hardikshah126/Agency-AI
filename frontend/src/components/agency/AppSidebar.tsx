import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { 
  PenLine, 
  History, 
  Settings, 
  Sparkles, 
  User,
  LayoutDashboard,
  ChevronLeft,
  Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface AppSidebarProps {
  className?: string
}

const navItems = [
  { icon: PenLine, label: "Composer", href: "/app", exact: true },

]

export function AppSidebar({ className }: AppSidebarProps) {
  const [collapsed, setCollapsed] = React.useState(false)
  const location = useLocation()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return location.pathname === href
    return location.pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 h-screen sticky top-0",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">Agency.AI</span>
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href, item.exact)
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        <div className={cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl bg-sidebar-accent/50",
          collapsed && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">Hardik</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">Pro Plan</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
