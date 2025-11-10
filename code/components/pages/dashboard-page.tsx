"use client"

import { FileText, ImageIcon, Video } from "lucide-react"

interface DashboardPageProps {
  onSelectContentType: (type: "text" | "image" | "video") => void
}

export default function DashboardPage({ onSelectContentType }: DashboardPageProps) {
  const detectors = [
    {
      id: "text",
      title: "Text Detector",
      description: "Analyze text content for AI generation",
      icon: FileText,
      color: "cyan",
    },
    {
      id: "image",
      title: "Image Detector",
      description: "Detect AI-generated images",
      icon: ImageIcon,
      color: "magenta",
    },
    {
      id: "video",
      title: "Video Detector",
      description: "Analyze video content for AI synthesis",
      icon: Video,
      color: "green",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float-slow"></div>
      <div
        className="absolute bottom-32 right-1/4 w-96 h-96 bg-magenta-500/5 rounded-full blur-3xl animate-float-slow"
        style={{ animationDelay: "3s" }}
      ></div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-300 via-white to-magenta-300 bg-clip-text text-transparent mb-6 drop-shadow-lg leading-tight">
            AI vs Human Detector
          </h1>
          <p className="text-gray-300 text-lg font-light max-w-2xl mx-auto">
            Detect whether your content is Human-made or AI-generated with advanced accuracy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {detectors.map((detector, index) => {
            const Icon = detector.icon
            const colorClass =
              detector.color === "cyan"
                ? "glass-cyan glow-cyan"
                : detector.color === "magenta"
                  ? "glass-magenta glow-magenta"
                  : "glass-green glow-green"

            return (
              <button
                key={detector.id}
                onClick={() => onSelectContentType(detector.id as "text" | "image" | "video")}
                className={`${colorClass} group rounded-3xl p-8 transition-all duration-500 text-left hover:scale-110 hover:shadow-2xl relative overflow-hidden`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Inner glow effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      detector.color === "cyan"
                        ? "radial-gradient(circle at 30% 30%, rgba(0, 230, 255, 0.1), transparent)"
                        : detector.color === "magenta"
                          ? "radial-gradient(circle at 30% 30%, rgba(255, 0, 255, 0.1), transparent)"
                          : "radial-gradient(circle at 30% 30%, rgba(0, 255, 179, 0.1), transparent)",
                  }}
                ></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`p-4 rounded-2xl backdrop-blur-sm ${
                        detector.color === "cyan"
                          ? "bg-cyan-500/15 border border-cyan-500/30"
                          : detector.color === "magenta"
                            ? "bg-magenta-500/15 border border-magenta-500/30"
                            : "bg-green-500/15 border border-green-500/30"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${
                          detector.color === "cyan"
                            ? "text-cyan-300"
                            : detector.color === "magenta"
                              ? "text-magenta-300"
                              : "text-green-300"
                        }`}
                      />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-200 transition-colors duration-300">
                    {detector.title}
                  </h3>
                  <p className="text-gray-300 text-sm font-light group-hover:text-gray-100 transition-colors duration-300">
                    {detector.description}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
