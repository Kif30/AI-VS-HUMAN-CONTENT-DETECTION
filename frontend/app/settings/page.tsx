"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Settings, Bell, Shield, Eye, EyeOff, Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPasswords, setShowPasswords] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [analysisAlerts, setAnalysisAlerts] = useState(true)
  const [dataRetention, setDataRetention] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [router])

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters!")
      return
    }
    // Simulate password change
    alert("Password updated successfully!")
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.clear()
      router.push("/")
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
              <Settings className="h-6 w-6 text-accent" />
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            </div>
          </div>

          {/* Security Settings */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Security</span>
              </CardTitle>
              <CardDescription>Manage your account security and password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPasswords ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-input pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords(!showPasswords)}
                    >
                      {showPasswords ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-input"
                  />
                </div>

                <Button
                  onClick={handlePasswordChange}
                  disabled={!currentPassword || !newPassword || !confirmPassword}
                  className="bg-primary hover:bg-primary/90"
                >
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about your account and analyses</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Analysis Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when your analysis is complete</p>
                </div>
                <Switch checked={analysisAlerts} onCheckedChange={setAnalysisAlerts} />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Privacy & Data</CardTitle>
              <CardDescription>Control how your data is handled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Data Retention</Label>
                  <p className="text-sm text-muted-foreground">Keep analysis history for improved recommendations</p>
                </div>
                <Switch checked={dataRetention} onCheckedChange={setDataRetention} />
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Clear Analysis History</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Remove all your previous analysis data from our servers
                  </p>
                  <Button variant="outline" size="sm">
                    Clear History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible and destructive actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Delete Account</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
