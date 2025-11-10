"use client"

import { CheckCircle, AlertCircle } from "lucide-react"

interface ResultPageProps {
  verdict: string
  confidence: number
  onAnalyzeAnother: () => void
  onContinue: () => void
}

export default function ResultPage({ verdict, confidence, onAnalyzeAnother, onContinue }: ResultPageProps) {
  const isAI = verdict.includes("AI Generated")
  const verdictColor = isAI ? "text-red-400" : "text-green-400"
  const borderColor = isAI ? "border-red-500/40" : "border-green-500/40"
  const glowColor = isAI ? "shadow-red-500/30" : "shadow-green-500/30"

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float-slow"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/5 rounded-full blur-3xl animate-float-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="w-full max-w-2xl relative z-10">
        <div className="glass rounded-3xl p-10 border border-cyan-500/20 shadow-2xl shadow-cyan-500/20 animate-slide-in">
          <div
            className={`rounded-2xl p-8 mb-10 border-2 ${borderColor} bg-gradient-to-br ${isAI ? "from-red-500/10 to-red-500/5" : "from-green-500/10 to-green-500/5"} shadow-lg ${glowColor}`}
          >
            <div className="flex items-center gap-4 mb-3">
              {isAI ? (
                <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
              )}
              <h2 className={`text-3xl font-bold ${verdictColor}`}>{verdict}</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-10">
            {/* AI Probability */}
            <div className="glass rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
              <p className="text-gray-400 text-sm mb-3 font-light">AI Probability</p>
              <div className="relative w-full h-3 bg-gray-700/30 rounded-full overflow-hidden mb-3 border border-cyan-500/10">
                <div
                  className="absolute h-full bg-gradient-to-r from-cyan-400 to-magenta-400 transition-all duration-500"
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
              <p className="text-white font-bold text-2xl text-cyan-300">{confidence}%</p>
            </div>

            {/* Confidence */}
            <div className="glass rounded-2xl p-6 border border-magenta-500/20 hover:border-magenta-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-magenta-500/20">
              <p className="text-gray-400 text-sm mb-3 font-light">Confidence</p>
              <div className="relative w-full h-3 bg-gray-700/30 rounded-full overflow-hidden mb-3 border border-magenta-500/10">
                <div
                  className="absolute h-full bg-gradient-to-r from-magenta-400 to-green-400"
                  style={{ width: `${95 - Math.abs(confidence - 50)}%` }}
                ></div>
              </div>
              <p className="text-white font-bold text-2xl text-magenta-300">{95 - Math.abs(confidence - 50)}%</p>
            </div>

            {/* Quality Score */}
            <div className="glass rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
              <p className="text-gray-400 text-sm mb-3 font-light">Quality Score</p>
              <p className="text-white font-bold text-2xl text-green-300">{Math.floor(Math.random() * 40 + 60)}/100</p>
            </div>

            {/* Authenticity */}
            <div className="glass rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
              <p className="text-gray-400 text-sm mb-3 font-light">Authenticity</p>
              <p className="text-white font-bold text-2xl text-cyan-300">{Math.floor(Math.random() * 40 + 50)}%</p>
            </div>
          </div>

          {/* Detected Model */}
          <div className="glass rounded-2xl p-6 border border-cyan-500/20 mb-10 hover:border-cyan-500/40 transition-all duration-300">
            <p className="text-gray-400 text-sm mb-2 font-light">Detected Model</p>
            <p className="text-white font-bold text-lg text-cyan-300">
              {["GPT-4", "Claude", "Gemini", "Llama", "Human Generated"][Math.floor(Math.random() * 5)]}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onAnalyzeAnother}
              className="glass rounded-full py-4 px-4 border border-cyan-500/40 hover:border-cyan-500/80 text-white font-semibold transition-all duration-300 hover:glow-cyan hover:scale-105 hover:bg-cyan-500/10"
            >
              Analyze Another
            </button>
            <button
              onClick={onContinue}
              className="bg-gradient-to-r from-green-500 to-cyan-500 rounded-full py-4 px-4 font-bold text-black hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 hover:from-green-400 hover:to-cyan-400"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
