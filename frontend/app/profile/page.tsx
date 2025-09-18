"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  User,
  Mail,
  Calendar,
  Activity,
  FileText,
  ImageIcon,
  Video,
  Music,
  Edit2,
  Save,
  X,
} from "lucide-react"

export default function ProfilePage() {
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const email = localStorage.getItem("userEmail")

    if (!isAuthenticated) {
      router.push("/")
      return
    }

    setUserEmail(email || "")
    // Generate a name from email for demo purposes
    const name = localStorage.getItem("userName") || email?.split("@")[0] || "User"
    setUserName(name)
    setEditName(name)
    setEditEmail(email || "")
  }, [router])

  const handleSaveProfile = () => {
    localStorage.setItem("userName", editName)
    localStorage.setItem("userEmail", editEmail)
    setUserName(editName)
    setUserEmail(editEmail)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditName(userName)
    setEditEmail(userEmail)
    setIsEditing(false)
  }

  // Mock analysis history data
  const analysisHistory = [
    { type: "text", count: 12, lastUsed: "2 hours ago" },
    { type: "image", count: 8, lastUsed: "1 day ago" },
    { type: "video", count: 3, lastUsed: "3 days ago" },
    { type: "audio", count: 5, lastUsed: "1 week ago" },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Music className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "text":
        return "text-blue-600"
      case "image":
        return "text-green-600"
      case "video":
        return "text-purple-600"
      case "audio":
        return "text-orange-600"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="hover:bg-accent/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex items-center space-x-2">
              <User className="h-6 w-6 text-accent" />
              <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            </div>
          </div>

          {/* Profile Information Card */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveProfile} className="bg-primary hover:bg-primary/90">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-accent text-accent-foreground text-2xl">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  {!isEditing ? (
                    <>
                      <div>
                        <Label className="text-sm text-muted-foreground">Name</Label>
                        <p className="text-lg font-medium">{userName}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Email</Label>
                        <p className="text-lg">{userEmail}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="edit-name">Name</Label>
                        <Input
                          id="edit-name"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="bg-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-email">Email</Label>
                        <Input
                          id="edit-email"
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="bg-input"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Account Statistics</CardTitle>
              <CardDescription>Your AI content detection usage overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {analysisHistory.map((item) => (
                  <div key={item.type} className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={getTypeColor(item.type)}>{getTypeIcon(item.type)}</div>
                      <span className="font-medium capitalize">{item.type}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-foreground">{item.count}</p>
                      <p className="text-xs text-muted-foreground">Last used {item.lastUsed}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Member since</span>
                </div>
                <span className="text-sm font-medium">January 2024</span>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Account status</span>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Email verified</span>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => router.push("/dashboard")} className="bg-primary hover:bg-primary/90">
                  Start New Analysis
                </Button>
                <Button variant="outline" onClick={() => router.push("/settings")}>
                  Account Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
