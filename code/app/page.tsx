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

  // ✅ UPDATED: supports image + text + video
  const handleAnalyze = async (content: string | File) => {
    setAppState({ ...appState, content })
    setCurrentPage("analyzing")

    try {
      let response
      const type = appState.contentType

      if (type === "image") {
        const formData = new FormData()
        formData.append("file", content as File)

        response = await fetch("http://127.0.0.1:8000/predict/image", {
          method: "POST",
          body: formData,
        })
      }

      else if (type === "video") {
        const formData = new FormData()
        formData.append("file", content as File)

        response = await fetch("http://127.0.0.1:8000/predict/video", {
          method: "POST",
          body: formData,
        })
      }

      else if (type === "text") {
        response = await fetch("http://127.0.0.1:8000/predict/text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: content }),
        })
      }

      else {
        alert("Unsupported content type")
        setCurrentPage("dashboard")
        return
      }

      const result = await response.json()

      setAppState((prev) => ({
        ...prev,
        verdict: result.label || "Unknown",
        confidence:
          result.confidence ??
          Math.round(result.prob_ai * 100) ??
          0,
      }))

      setCurrentPage("result")
    } catch (error) {
      console.error("Prediction failed:", error)
      alert("Error analyzing content. Try again.")
      setCurrentPage("dashboard")
    }
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
