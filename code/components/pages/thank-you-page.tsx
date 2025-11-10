"use client"

import { CheckCircle, Sparkles } from "lucide-react"

interface ThankYouPageProps {
  onBackToDashboard: () => void
}

export default function ThankYouPage({ onBackToDashboard }: ThankYouPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float-slow"></div>
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-magenta-500/5 rounded-full blur-3xl animate-float-slow"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-float-slow"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="text-center max-w-2xl relative z-10 animate-fade-in">
        <div className="relative w-32 h-32 mx-auto mb-12">
          <CheckCircle className="w-32 h-32 text-green-400 animate-floating drop-shadow-2xl shadow-2xl shadow-green-500/30" />
          <Sparkles
            className="absolute top-0 right-0 w-10 h-10 text-cyan-400 animate-spin drop-shadow-lg"
            style={{ animationDuration: "3s" }}
          />
          <Sparkles
            className="absolute bottom-0 left-0 w-10 h-10 text-magenta-400 drop-shadow-lg"
            style={{
              animationDuration: "2s",
              animationDirection: "reverse",
              animation: "spin 2s linear reverse infinite",
            }}
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-white to-magenta-300 bg-clip-text text-transparent mb-6 drop-shadow-lg leading-tight text-balance">
          Thank You for Using AI vs Human Detector
        </h1>
        <p className="text-gray-300 text-lg font-light mb-12 max-w-xl mx-auto">
          Your content has been successfully analyzed. We appreciate your trust in our platform to help identify
          AI-generated content.
        </p>

        <button
          onClick={onBackToDashboard}
          className="inline-block px-10 py-4 rounded-full border-2 border-cyan-400/60 text-cyan-300 font-bold hover:bg-cyan-400/10 hover:border-cyan-300 transition-all duration-300 hover:glow-cyan hover:scale-110 hover:shadow-xl"
        >
          Back to Dashboard
        </button>

        <div className="mt-16 pt-12 border-t border-cyan-500/10">
          <div className="flex justify-center gap-8 text-sm text-gray-400 font-light">
            <span className="hover:text-cyan-400 transition-colors duration-300">Privacy Protected</span>
            <span>·</span>
            <span className="hover:text-cyan-400 transition-colors duration-300">Instant Analysis</span>
            <span>·</span>
            <span className="hover:text-cyan-400 transition-colors duration-300">AI Powered</span>
          </div>
        </div>
      </div>
    </div>
  )
}
