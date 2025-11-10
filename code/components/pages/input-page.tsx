"use client"

import type React from "react"
import { useState } from "react"
import { Upload, ArrowLeft } from "lucide-react"

interface InputPageProps {
  contentType: "text" | "image" | "video"
  onAnalyze: (content: string | File) => void
  onBack: () => void
}

export default function InputPage({ contentType, onAnalyze, onBack }: InputPageProps) {
  const [content, setContent] = useState<string | File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const titles = {
    text: "Paste or Type Text to Analyze",
    image: "Upload an Image to Detect AI Content",
    video: "Upload a Video to Detect AI Content",
  }

  const placeholders = {
    text: "Paste or type your content here...",
    image: "Drag and drop an image or click to browse",
    video: "Drag and drop a video (MP4, MOV) or click to browse",
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setContent(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setContent(e.target.files[0])
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleAnalyze = () => {
    if (content) {
      onAnalyze(content)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-float-slow"></div>
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl animate-float-slow"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="w-full max-w-3xl relative z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-12 transition-all duration-300 hover:glow-cyan font-light"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-300 via-white to-magenta-300 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            {titles[contentType]}
          </h1>
        </div>

        <div className="glass-cyan rounded-3xl p-10 mb-8 border-2 border-cyan-500/30 shadow-2xl">
          {contentType === "text" ? (
            <textarea
              value={typeof content === "string" ? content : ""}
              onChange={handleTextChange}
              placeholder={placeholders.text}
              className="w-full h-96 glass rounded-2xl p-6 text-white placeholder-gray-500/50 border border-cyan-500/30 focus:border-cyan-400/80 focus:outline-none transition-all duration-300 resize-none focus:glow-cyan font-light"
            />
          ) : (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 ${
                dragActive
                  ? "border-cyan-400 bg-cyan-500/15 shadow-lg shadow-cyan-500/20"
                  : "border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/5"
              }`}
            >
              <Upload className="w-16 h-16 text-cyan-400 mx-auto mb-6 opacity-60" />
              <p className="text-gray-300 mb-4 font-light text-lg">{placeholders[contentType]}</p>
              <input
                type="file"
                onChange={handleFileChange}
                accept={contentType === "image" ? "image/*" : "video/*"}
                className="hidden"
                id="file-input"
              />
              <label
                htmlFor="file-input"
                className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 border border-cyan-400/50 text-black font-semibold hover:from-cyan-400 hover:to-cyan-300 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 hover:scale-105"
              >
                Browse Files
              </label>
              {content && content instanceof File && (
                <p className="text-green-400 mt-6 font-light">✓ Selected: {content.name}</p>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!content}
          className="w-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full py-4 px-6 font-bold text-black text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 hover:from-cyan-400 hover:to-cyan-300"
        >
          Analyze Now
        </button>
      </div>
    </div>
  )
}
