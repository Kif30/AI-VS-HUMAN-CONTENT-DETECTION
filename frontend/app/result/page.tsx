"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { ConnectionStatus } from "@/components/connection-status"
import {
  ArrowLeft,
  FileText,
  ImageIcon,
  Video,
  Music,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  FileIcon,
  TrendingUp,
  Shield,
  Bot,
  Sparkles,
  Download,
  Share2,
} from "lucide-react"

interface AnalysisData {
  type: "text" | "image" | "video" | "audio"
  content?: string
  fileName?: string
  fileSize?: number
  timestamp: string
}

interface AnalysisResult {
  aiProbability: number
  confidence: number
  verdict: "human" | "ai" | "uncertain"
  details: {
    patterns: string[]
    indicators: string[]
    recommendations: string[]
  }
  processingTime: number
}

export default function ResultPage() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    const storedData = localStorage.getItem("analysisData")
    if (!storedData) {
      router.push("/dashboard")
      return
    }

    const data: AnalysisData = JSON.parse(storedData)
    setAnalysisData(data)

    // Simulate result generation based on content type
    setTimeout(() => {
      const mockResult = generateMockResult(data.type)
      setResult(mockResult)
      setIsLoading(false)
    }, 1500)
  }, [router])

  const generateMockResult = (type: string): AnalysisResult => {
    const aiProbability = Math.random() * 100
    const confidence = Math.random() * 40 + 60 // 60-100% confidence

    let verdict: "human" | "ai" | "uncertain"
    if (aiProbability > 70) verdict = "ai"
    else if (aiProbability < 30) verdict = "human"
    else verdict = "uncertain"

    const detailsMap = {
      text: {
        patterns: [
          "Repetitive sentence structures detected",
          "Unusual vocabulary distribution",
          "Consistent punctuation patterns",
          "Limited stylistic variation",
        ],
        indicators: [
          "High coherence across paragraphs",
          "Formal tone consistency",
          "Limited personal expressions",
          "Structured argument flow",
        ],
        recommendations: [
          "Cross-reference with known AI writing samples",
          "Analyze metadata for generation timestamps",
          "Check for human editing traces",
          "Verify source attribution",
        ],
      },
      image: {
        patterns: [
          "Pixel-level inconsistencies found",
          "Unusual compression artifacts",
          "Symmetric noise distribution",
          "Artificial lighting patterns",
        ],
        indicators: [
          "EXIF data anomalies",
          "Color space irregularities",
          "Edge detection artifacts",
          "Texture synthesis markers",
        ],
        recommendations: [
          "Perform reverse image search",
          "Analyze generation metadata",
          "Check for watermark traces",
          "Verify camera model consistency",
        ],
      },
      video: {
        patterns: [
          "Frame interpolation artifacts",
          "Temporal inconsistencies",
          "Unnatural motion blur",
          "Synthetic facial movements",
        ],
        indicators: [
          "Compression signature analysis",
          "Audio-visual synchronization",
          "Lighting consistency issues",
          "Background generation markers",
        ],
        recommendations: [
          "Analyze frame-by-frame consistency",
          "Check audio generation patterns",
          "Verify source camera metadata",
          "Cross-reference with deepfake databases",
        ],
      },
      audio: {
        patterns: [
          "Spectral analysis anomalies",
          "Unnatural frequency distribution",
          "Voice synthesis markers",
          "Artificial background noise",
        ],
        indicators: [
          "Pitch consistency irregularities",
          "Formant frequency analysis",
          "Breathing pattern synthesis",
          "Audio compression artifacts",
        ],
        recommendations: [
          "Compare with voice samples",
          "Analyze generation timestamps",
          "Check for cloning signatures",
          "Verify recording environment",
        ],
      },
    }

    return {
      aiProbability,
      confidence,
      verdict,
      details: detailsMap[type as keyof typeof detailsMap],
      processingTime: Math.random() * 3 + 1,
    }
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "human":
        return "text-green-600"
      case "ai":
        return "text-red-600"
      case "uncertain":
        return "text-yellow-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "human":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Human Generated
          </Badge>
        )
      case "ai":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            AI Generated
          </Badge>
        )
      case "uncertain":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Uncertain
          </Badge>
        )
      default:
        return null
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "text":
        return <FileText className="h-5 w-5" />
      case "image":
        return <ImageIcon className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "audio":
        return <Music className="h-5 w-5" />
      default:
        return <FileIcon className="h-5 w-5" />
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

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case "text":
        return "bg-blue-50 dark:bg-blue-950/30"
      case "image":
        return "bg-green-50 dark:bg-green-950/30"
      case "video":
        return "bg-purple-50 dark:bg-purple-950/30"
      case "audio":
        return "bg-orange-50 dark:bg-orange-950/30"
      default:
        return "bg-muted"
    }
  }

  if (isLoading || !analysisData || !result) {
    return (
      <div className="min-h-screen bg-background relative">
        <div className="floating-bg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-6 animate-fade-in">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto" />
              <Bot className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-accent animate-pulse" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Analyzing Content</h2>
              <p className="text-muted-foreground">Our AI is processing your content for detection...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background relative">
      <div className="floating-bg" />

      <div className="sticky top-0 z-50 border-b border-border glass-effect">
        <div className="p-4 lg:p-6">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4 animate-fade-in">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="hover-lift hover:bg-accent/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-accent rounded-lg animate-glow">
                  <Shield className="h-5 w-5 text-accent-foreground" />
                </div>
                <h1 className="text-xl font-bold text-foreground">Analysis Results</h1>
                <Sparkles className="h-5 w-5 text-accent animate-pulse" />
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <ConnectionStatus />
              <ThemeToggle />
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {new Date(analysisData.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <Card className="border-border glass-effect hover-lift animate-scale-in">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${getTypeBgColor(analysisData.type)} animate-glow`}>
                    <div className={`${getTypeColor(analysisData.type)}`}>{getTypeIcon(analysisData.type)}</div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl capitalize flex items-center space-x-2">
                      <span>{analysisData.type} Analysis</span>
                      <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    </CardTitle>
                    <CardDescription className="text-base mt-1">
                      {analysisData.fileName
                        ? `${analysisData.fileName} (${(analysisData.fileSize! / 1024 / 1024).toFixed(2)} MB)`
                        : `${analysisData.content?.substring(0, 60)}...`}
                    </CardDescription>
                  </div>
                </div>
                <div className="animate-slide-up">{getVerdictBadge(result.verdict)}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    <span>AI Generation Probability</span>
                  </h3>
                  <div className="text-right">
                    <span className={`text-3xl font-bold ${getVerdictColor(result.verdict)}`}>
                      {result.aiProbability.toFixed(1)}%
                    </span>
                    <p className="text-sm text-muted-foreground">Confidence</p>
                  </div>
                </div>
                <div className="relative">
                  <Progress value={result.aiProbability} className="h-4 animate-fade-in" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-yellow-500/20 to-red-500/20 rounded-full" />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                    <span>Human Generated</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <XCircle className="h-3 w-3 text-red-500" />
                    <span>AI Generated</span>
                  </span>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-accent" />
                    <h4 className="font-semibold">Analysis Confidence</h4>
                  </div>
                  <div className="text-2xl font-bold text-accent">{result.confidence.toFixed(1)}%</div>
                  <Progress value={result.confidence} className="h-2" />
                </div>

                <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <h4 className="font-semibold">Processing Time</h4>
                  </div>
                  <div className="text-2xl font-bold text-foreground">{result.processingTime.toFixed(2)}s</div>
                  <p className="text-sm text-muted-foreground">Deep Learning Analysis</p>
                </div>

                <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-accent" />
                    <h4 className="font-semibold">Detection Method</h4>
                  </div>
                  <div className="text-lg font-semibold text-foreground">Neural Network</div>
                  <p className="text-sm text-muted-foreground">Advanced AI Detection</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="border-border glass-effect hover-lift animate-scale-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-1 rounded-full animate-pulse" />
                  <span>Patterns Detected</span>
                </CardTitle>
                <CardDescription>Key patterns found in the analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.details.patterns.map((pattern, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 text-sm animate-fade-in"
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <div className="w-2 h-2 bg-chart-1 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                      <span className="leading-relaxed">{pattern}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border glass-effect hover-lift animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-2 rounded-full animate-pulse" />
                  <span>Technical Indicators</span>
                </CardTitle>
                <CardDescription>Technical markers analyzed</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.details.indicators.map((indicator, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 text-sm animate-fade-in"
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <div className="w-2 h-2 bg-chart-2 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                      <span className="leading-relaxed">{indicator}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border glass-effect hover-lift animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <div className="w-2 h-2 bg-chart-3 rounded-full animate-pulse" />
                  <span>Recommendations</span>
                </CardTitle>
                <CardDescription>Next steps for verification</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {result.details.recommendations.map((recommendation, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 text-sm animate-fade-in"
                      style={{ animationDelay: `${0.1 * index}s` }}
                    >
                      <div className="w-2 h-2 bg-chart-3 rounded-full mt-2 flex-shrink-0 animate-pulse" />
                      <span className="leading-relaxed">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift px-8 py-3 text-lg"
              size="lg"
            >
              <Bot className="mr-2 h-5 w-5" />
              Analyze Another File
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("analysisData")
                router.push("/dashboard")
              }}
              className="hover-lift px-8 py-3 text-lg"
              size="lg"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Button>
            <Button variant="ghost" className="hover-lift px-8 py-3 text-lg" size="lg">
              <Download className="mr-2 h-5 w-5" />
              Export Report
            </Button>
            <Button variant="ghost" className="hover-lift px-8 py-3 text-lg" size="lg">
              <Share2 className="mr-2 h-5 w-5" />
              Share Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
