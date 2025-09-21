"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import { ConnectionStatus } from "@/components/connection-status"
import {
  Menu,
  FileText,
  ImageIcon,
  Video,
  Music,
  User,
  Settings,
  LogOut,
  Bot,
  Shield,
  Upload,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const email = localStorage.getItem("userEmail")

    if (!isAuthenticated) {
      router.push("/")
      return
    }

    setUserEmail(email || "")
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    router.push("/")
  }

  const contentTypes = [
    {
      title: "Text",
      description: "Detect AI-generated text content",
      icon: FileText,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
      borderColor: "border-blue-200 dark:border-blue-800",
      href: "/upload/text",
    },
    {
      title: "Image",
      description: "Analyze images for AI generation",
      icon: ImageIcon,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-950/30",
      borderColor: "border-green-200 dark:border-green-800",
      href: "/upload/image",
    },
    {
      title: "Video",
      description: "Check video content authenticity",
      icon: Video,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
      borderColor: "border-purple-200 dark:border-purple-800",
      href: "/upload/video",
    },
    {
      title: "Audio",
      description: "Detect AI-generated audio",
      icon: Music,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-950/30",
      borderColor: "border-orange-200 dark:border-orange-800",
      href: "/upload/audio",
    },
  ]

  const Sidebar = ({ collapsed = false }: { collapsed?: boolean }) => (
    <div
      className={`flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 ${collapsed ? "w-16" : "w-80"}`}
    >
      <div className="p-6 border-b border-sidebar-border">
        <div className={`flex items-center space-x-2 animate-fade-in ${collapsed ? "justify-center" : ""}`}>
          <div className="p-2 bg-accent rounded-lg animate-glow">
            <Bot className="h-6 w-6 text-accent-foreground" />
          </div>
          {!collapsed && (
            <>
              <Shield className="h-6 w-6 text-accent animate-pulse" />
              <span className="font-semibold text-sidebar-foreground">AI Detector</span>
            </>
          )}
        </div>
        {!collapsed && (
          <div className="mt-4 flex items-center justify-between">
            <ConnectionStatus />
            <ThemeToggle />
          </div>
        )}
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className={`w-full ${collapsed ? "justify-center px-2" : "justify-start"} hover-lift transition-all duration-300 
                       hover:bg-sidebar-accent/20 hover:text-sidebar-accent-foreground
                       text-sidebar-foreground`}
            onClick={() => {
              setIsOpen(false)
              router.push("/profile")
            }}
          >
            <User className={`h-4 w-4 ${collapsed ? "" : "mr-2"}`} />
            {!collapsed && "Profile"}
          </Button>
          <Button
            variant="ghost"
            className={`w-full ${collapsed ? "justify-center px-2" : "justify-start"} hover-lift transition-all duration-300 
                       hover:bg-sidebar-accent/20 hover:text-sidebar-accent-foreground
                       text-sidebar-foreground`}
            onClick={() => {
              setIsOpen(false)
              router.push("/settings")
            }}
          >
            <Settings className={`h-4 w-4 ${collapsed ? "" : "mr-2"}`} />
            {!collapsed && "Settings"}
          </Button>
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center space-x-3 mb-4 animate-slide-up">
            <Avatar className="ring-2 ring-accent/20">
              <AvatarFallback className="bg-accent text-accent-foreground">
                {userEmail.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">{userEmail}</p>
            </div>
          </div>
        )}
        <Button
          variant="outline"
          className={`w-full ${collapsed ? "justify-center px-2" : "justify-start"} text-destructive border-destructive 
                     hover:bg-destructive hover:text-destructive-foreground 
                     bg-transparent hover-lift transition-all duration-300`}
          onClick={handleLogout}
        >
          <LogOut className={`h-4 w-4 ${collapsed ? "" : "mr-2"}`} />
          {!collapsed && "Logout"}
        </Button>
      </div>
    </div>
  )

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="floating-bg" />
      <div className="floating-orbs">
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
        <div className="floating-orb"></div>
      </div>
      <div className="floating-shapes">
        <div className="floating-shape floating-triangle"></div>
        <div className="floating-shape floating-square"></div>
        <div className="floating-shape floating-hexagon"></div>
      </div>
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border glass-effect">
        <div className="flex items-center space-x-2 animate-fade-in">
          <div className="p-2 bg-accent rounded-lg animate-glow">
            <Bot className="h-6 w-6 text-accent-foreground" />
          </div>
          <Shield className="h-6 w-6 text-accent" />
          <span className="font-semibold">AI Detector</span>
        </div>
        <div className="flex items-center space-x-2">
          <ConnectionStatus />
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="hover-lift hover:bg-accent/20 hover:text-accent-foreground">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className={`hidden lg:block transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-80"}`}>
          <div className={`fixed h-screen transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-80"}`}>
            <Sidebar collapsed={sidebarCollapsed} />
          </div>
        </div>

        <div
          className="hidden lg:block fixed top-4 z-50 transition-all duration-300"
          style={{ left: sidebarCollapsed ? "4rem" : "20rem" }}
        >
          <Button
            variant="outline"
            size="sm"
            className="bg-background/80 backdrop-blur-sm border-border hover:bg-accent hover:text-accent-foreground hover-lift"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8 animate-fade-in">
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-3xl font-bold text-foreground">AI Content Detection Dashboard</h1>
                  <Sparkles className="h-6 w-6 text-accent animate-pulse" />
                </div>
                <p className="text-muted-foreground text-lg">
                  Upload and analyze your content to detect AI generation across multiple formats
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contentTypes.map((type, index) => {
                  const IconComponent = type.icon
                  return (
                    <Card
                      key={type.title}
                      className={`cursor-pointer hover:shadow-xl transition-all duration-500 border-border hover:border-accent/50 hover-lift animate-scale-in glass-effect ${type.borderColor}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => router.push(type.href)}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${type.bgColor} transition-all duration-300 hover:scale-110`}>
                            <IconComponent className={`h-8 w-8 ${type.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-xl flex items-center space-x-2">
                              <span>{type.title}</span>
                              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                            </CardTitle>
                            <CardDescription className="mt-1">{type.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button
                          className="w-full bg-transparent hover:bg-accent hover:text-accent-foreground 
                                     transition-all duration-300 hover-lift border-accent/50 
                                     text-foreground hover:border-accent"
                          variant="outline"
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload {type.title}
                        </Button>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
