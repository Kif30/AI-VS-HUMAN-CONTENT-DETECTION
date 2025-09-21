"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="sm" className="w-10 h-10 p-0">
        <div className="h-5 w-5" />
      </Button>
    )
  }

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
  }

  const isDark = theme === "dark"

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-10 h-10 p-0 relative overflow-hidden transition-all duration-300 hover:scale-105 
                 hover:bg-accent/20 border border-transparent hover:border-accent/30
                 hover:text-accent-foreground"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500 hover:text-yellow-300 transition-colors duration-300" />
      ) : (
        <Moon className="h-5 w-5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300" />
      )}

      <div
        className={`absolute inset-0 rounded-md transition-opacity duration-300 ${
          isDark
            ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-100"
            : "bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100"
        }`}
      />

      <span className="sr-only">Switch to {isDark ? "light" : "dark"} theme</span>
    </Button>
  )
}
