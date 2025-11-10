"use client"
import { useState, useEffect } from "react"
import LoginPage from "@/components/pages/login-page"
import DashboardPage from "@/components/pages/dashboard-page"
import InputPage from "@/components/pages/input-page"
import AnalyzingPage from "@/components/pages/analyzing-page"
import ResultPage from "@/components/pages/result-page"
import ThankYouPage from "@/components/pages/thank-you-page"

type PageType = "login" | "dashboard" | "input" | "analyzing" | "result" | "thank-you"

interface AppState {
  contentType?: "text" | "image" | "video"
  content?: string | File
  verdict?: string
  confidence?: number
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>("login")
  const [appState, setAppState] = useState<AppState>({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (isLoggedIn && currentPage === "login") {
      setCurrentPage("dashboard")
    }
  }, [isLoggedIn, currentPage])

  const handleLogin = () => {
    setIsLoggedIn(true)
    setCurrentPage("dashboard")
  }

  const handleSelectContentType = (type: "text" | "image" | "video") => {
    setAppState({ ...appState, contentType: type })
    setCurrentPage("input")
  }

  const handleAnalyze = (content: string | File) => {
    setAppState({ ...appState, content })
    setCurrentPage("analyzing")

    // Simulate analysis
    setTimeout(() => {
      setAppState((prev) => ({
        ...prev,
        verdict: Math.random() > 0.5 ? "Likely AI Generated" : "Likely Human Created",
        confidence: Math.floor(Math.random() * 40 + 60),
      }))
      setCurrentPage("result")
    }, 3500)
  }

  const handleAnalyzeAnother = () => {
    setCurrentPage("dashboard")
  }

  const handleContinue = () => {
    setCurrentPage("thank-you")
  }

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard")
  }

  return (
    <main className="min-h-screen gradient-bg">
      {/* Background animated elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-floating"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl animate-floating"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-floating"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Page content */}
      <div className="relative z-10">
        {currentPage === "login" && <LoginPage onLogin={handleLogin} />}
        {currentPage === "dashboard" && <DashboardPage onSelectContentType={handleSelectContentType} />}
        {currentPage === "input" && appState.contentType && (
          <InputPage
            contentType={appState.contentType}
            onAnalyze={handleAnalyze}
            onBack={() => setCurrentPage("dashboard")}
          />
        )}
        {currentPage === "analyzing" && <AnalyzingPage />}
        {currentPage === "result" && appState.verdict && (
          <ResultPage
            verdict={appState.verdict}
            confidence={appState.confidence || 0}
            onAnalyzeAnother={handleAnalyzeAnother}
            onContinue={handleContinue}
          />
        )}
        {currentPage === "thank-you" && <ThankYouPage onBackToDashboard={handleBackToDashboard} />}
      </div>
    </main>
  )
}
