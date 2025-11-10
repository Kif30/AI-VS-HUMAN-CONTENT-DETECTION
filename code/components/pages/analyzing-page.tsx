"use client"

export default function AnalyzingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float-slow"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-500/5 rounded-full blur-3xl animate-float-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="text-center relative z-10">
        <div className="relative w-56 h-56 mx-auto mb-12">
          {/* Outer rings with gradient glow */}
          <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-cyan-400 border-r-cyan-400 animate-scan shadow-2xl shadow-cyan-500/30"></div>
          <div
            className="absolute inset-6 rounded-full border-3 border-transparent border-t-magenta-400 border-r-magenta-400 animate-scan shadow-2xl shadow-magenta-500/30"
            style={{ animationDirection: "reverse" }}
          ></div>
          <div className="absolute inset-12 rounded-full border-2 border-transparent border-t-green-400 border-r-green-400 animate-scan shadow-lg shadow-green-500/20"></div>

          {/* Center glowing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-cyan-400 animate-pulse shadow-lg shadow-cyan-500/50"></div>
          </div>

          {/* Pulsing waves with enhanced glow */}
          <div
            className="absolute inset-0 rounded-full border-2 border-cyan-400/40 animate-ping shadow-lg shadow-cyan-500/40"
            style={{ animationDuration: "1.5s" }}
          ></div>
          <div
            className="absolute inset-4 rounded-full border-2 border-magenta-400/40 animate-ping shadow-lg shadow-magenta-500/40"
            style={{ animationDuration: "2s", animationDelay: "0.3s" }}
          ></div>
        </div>

        <h2 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
          Analyzing your content
          <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full ml-3 animate-pulse shadow-lg shadow-cyan-500/50"></span>
        </h2>
        <p className="text-gray-300 font-light text-lg">This will take a few seconds</p>
      </div>
    </div>
  )
}
