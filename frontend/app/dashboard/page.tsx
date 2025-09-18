"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, FileText, ImageIcon, Video, Music, User, Settings, LogOut, Bot, Shield, Upload } from "lucide-react"

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
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
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/upload/text",
    },
    {
      title: "Image",
      description: "Analyze images for AI generation",
      icon: ImageIcon,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/upload/image",
    },
    {
      title: "Video",
      description: "Check video content authenticity",
      icon: Video,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/upload/video",
    },
    {
      title: "Audio",
      description: "Detect AI-generated audio",
      icon: Music,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/upload/audio",
    },
  ]

  const Sidebar = () => (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-accent rounded-lg">
            <Bot className="h-6 w-6 text-accent-foreground" />
          </div>
          <Shield className="h-6 w-6 text-accent" />
          <span className="font-semibold text-sidebar-foreground">AI Detector</span>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="space-y-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setIsOpen(false)
              router.push("/profile")
            }}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => {
              setIsOpen(false)
              router.push("/settings")
            }}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar>
            <AvatarFallback className="bg-accent text-accent-foreground">
              {userEmail.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{userEmail}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-accent rounded-lg">
            <Bot className="h-6 w-6 text-accent-foreground" />
          </div>
          <Shield className="h-6 w-6 text-accent" />
          <span className="font-semibold">AI Detector</span>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-80">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80">
          <div className="fixed w-80 h-screen">
            <Sidebar />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">AI Content Detection Dashboard</h1>
                <p className="text-muted-foreground">
                  Upload and analyze your content to detect AI generation across multiple formats
                </p>
              </div>

              {/* Content Type Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contentTypes.map((type) => {
                  const IconComponent = type.icon
                  return (
                    <Card
                      key={type.title}
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 border-border hover:border-accent/50"
                      onClick={() => router.push(type.href)}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-lg ${type.bgColor}`}>
                            <IconComponent className={`h-8 w-8 ${type.color}`} />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{type.title}</CardTitle>
                            <CardDescription className="mt-1">{type.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button className="w-full bg-transparent" variant="outline">
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
