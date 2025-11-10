"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Lock, Github, AlertCircle } from "lucide-react"

interface LoginPageProps {
  onLogin: () => void
}

const MOCK_GOOGLE_ACCOUNTS = [
  { id: "1", email: "user@gmail.com", name: "John Doe" },
  { id: "2", email: "work@gmail.com", name: "Work Account" },
  { id: "3", email: "personal@gmail.com", name: "Personal Account" },
]

const MOCK_GITHUB_ACCOUNTS = [
  { id: "1", username: "johndoe", name: "John Doe" },
  { id: "2", username: "work-account", name: "Work Account" },
]

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [showGoogleModal, setShowGoogleModal] = useState(false)
  const [showGithubModal, setShowGithubModal] = useState(false)

  const validateEmail = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailValue)
  }

  const validatePassword = (passwordValue: string): boolean => {
    return passwordValue.length >= 8
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = "Email is required"
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true)
      // Simulate authentication delay
      setTimeout(() => {
        onLogin()
        setIsLoading(false)
      }, 1000)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      // This opens Google's real OAuth flow
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      if (!clientId) {
        setErrors({ email: "Google OAuth not configured" })
        setIsLoading(false)
        return
      }

      const redirectUri = `${window.location.origin}/auth/callback/google`
      const scope = "openid profile email"
      const responseType = "code"
      const prompt = "select_account" // Forces account picker

      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}&prompt=${prompt}`

      window.location.href = googleAuthUrl
    } catch (error) {
      console.error("Google sign-in error:", error)
      setErrors({ email: "Failed to initiate Google sign-in" })
      setIsLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    setIsLoading(true)
    try {
      // This opens GitHub's real OAuth flow
      const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
      if (!clientId) {
        setErrors({ email: "GitHub OAuth not configured" })
        setIsLoading(false)
        return
      }

      const redirectUri = `${window.location.origin}/auth/callback/github`
      const scope = "user:email"

      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`

      window.location.href = githubAuthUrl
    } catch (error) {
      console.error("GitHub sign-in error:", error)
      setErrors({ email: "Failed to initiate GitHub sign-in" })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float-slow"></div>
      <div
        className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-magenta-500/5 rounded-full blur-3xl animate-float-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="w-full max-w-md relative z-10">
        {/* Floating Card with Glow */}
        <div className="glass-cyan rounded-3xl p-8 border-2 border-cyan-500/30 shadow-2xl animate-slide-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-white to-magenta-300 bg-clip-text text-transparent mb-2 drop-shadow-lg">
              Welcome to AI vs Human Detector
            </h1>
            <p className="text-gray-300 text-sm font-light">Sign in to begin analyzing your content</p>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => {
                setShowGoogleModal(true)
                handleGoogleSignIn()
              }}
              disabled={isLoading}
              className="w-full glass rounded-full py-3 px-4 flex items-center justify-center gap-2 border border-cyan-500/40 hover:border-cyan-400/80 transition-all duration-300 hover:glow-cyan group hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-white font-medium">Continue with Google</span>
            </button>

            <button
              onClick={() => {
                setShowGithubModal(true)
                handleGithubSignIn()
              }}
              disabled={isLoading}
              className="w-full glass rounded-full py-3 px-4 flex items-center justify-center gap-2 border border-green-500/40 hover:border-green-400/80 transition-all duration-300 hover:glow-green group hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Github className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Continue with GitHub</span>
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            <span className="text-gray-400 text-xs font-light tracking-wide">or continue with email</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors({ ...errors, email: undefined })
                }}
                className={`w-full glass rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 border transition-all duration-300 focus:outline-none ${
                  errors.email
                    ? "border-red-500/50 focus:border-red-400/80 focus:glow-red"
                    : "border-cyan-500/30 focus:border-cyan-400/80 focus:glow-cyan"
                }`}
              />
              {errors.email && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-4 w-5 h-5 text-cyan-400" />
              <input
                type="password"
                placeholder="Enter your password (min 8 characters)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password) setErrors({ ...errors, password: undefined })
                }}
                className={`w-full glass rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 border transition-all duration-300 focus:outline-none ${
                  errors.password
                    ? "border-red-500/50 focus:border-red-400/80 focus:glow-red"
                    : "border-cyan-500/30 focus:border-cyan-400/80 focus:glow-cyan"
                }`}
              />
              {errors.password && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full py-3 px-4 font-bold text-black text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 hover:from-cyan-400 hover:to-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-6">
            <a
              href="#"
              className="text-cyan-400/60 hover:text-cyan-300 text-sm font-light transition-all duration-300 hover:glow-cyan inline-block"
            >
              Forgot Password?
            </a>
          </div>
        </div>
      </div>

      {/* Google Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="glass-cyan rounded-3xl p-8 border-2 border-cyan-500/30 w-full max-w-md shadow-2xl animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Choose your Google account</h2>
              <button
                onClick={() => setShowGoogleModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <AlertCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_GOOGLE_ACCOUNTS.map((account) => (
                <button
                  key={account.id}
                  onClick={() => setShowGoogleModal(false)}
                  className="w-full glass rounded-2xl p-4 border border-cyan-500/30 hover:border-cyan-400/80 transition-all duration-300 hover:glow-cyan text-left hover:scale-105 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{account.name.charAt(0)}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{account.name}</p>
                      <p className="text-gray-400 text-sm">{account.email}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowGoogleModal(false)}
              className="w-full mt-4 glass rounded-full py-2 px-4 border border-gray-500/30 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* GitHub Modal */}
      {showGithubModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div className="glass-cyan rounded-3xl p-8 border-2 border-cyan-500/30 w-full max-w-md shadow-2xl animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Choose your GitHub account</h2>
              <button
                onClick={() => setShowGithubModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <AlertCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_GITHUB_ACCOUNTS.map((account) => (
                <button
                  key={account.id}
                  onClick={() => setShowGithubModal(false)}
                  className="w-full glass rounded-2xl p-4 border border-green-500/30 hover:border-green-400/80 transition-all duration-300 hover:glow-green text-left hover:scale-105 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <Github className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{account.name}</p>
                      <p className="text-gray-400 text-sm">@{account.username}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowGithubModal(false)}
              className="w-full mt-4 glass rounded-full py-2 px-4 border border-gray-500/30 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
