"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
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
  RefreshCw,
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

  if (isLoading || !analysisData || !result) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <RefreshCw className="h-8 w-8 animate-spin text-accent mx-auto" />
          <p className="text-muted-foreground">Processing analysis results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
                className="hover:bg-accent/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-accent" />
                <h1 className="text-2xl font-bold text-foreground">Analysis Results</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {new Date(analysisData.timestamp).toLocaleString()}
            </div>
          </div>

          {/* Main Result Card */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`${getTypeColor(analysisData.type)}`}>{getTypeIcon(analysisData.type)}</div>
                  <div>
                    <CardTitle className="capitalize">{analysisData.type} Analysis Complete</CardTitle>
                    <CardDescription>
                      {analysisData.fileName
                        ? `${analysisData.fileName} (${(analysisData.fileSize! / 1024 / 1024).toFixed(2)} MB)`
                        : `${analysisData.content?.substring(0, 50)}...`}
                    </CardDescription>
                  </div>
                </div>
                {getVerdictBadge(result.verdict)}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* AI Probability Score */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">AI Generation Probability</h3>
                  <span className={`text-2xl font-bold ${getVerdictColor(result.verdict)}`}>
                    {result.aiProbability.toFixed(1)}%
                  </span>
                </div>
                <Progress value={result.aiProbability} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Human Generated</span>
                  <span>AI Generated</span>
                </div>
              </div>

              <Separator />

              {/* Confidence Score */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Analysis Confidence</h3>
                  <span className="text-xl font-semibold text-accent">{result.confidence.toFixed(1)}%</span>
                </div>
                <Progress value={result.confidence} className="h-2" />
              </div>

              <Separator />

              {/* Processing Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Processing Time:</span>
                  <span className="font-medium">{result.processingTime.toFixed(2)}s</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Analysis Method:</span>
                  <span className="font-medium">Deep Learning</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patterns Detected */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Patterns Detected</CardTitle>
                <CardDescription>Key patterns found in the analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.details.patterns.map((pattern, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      <span>{pattern}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Technical Indicators */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Technical Indicators</CardTitle>
                <CardDescription>Technical markers analyzed</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.details.indicators.map((indicator, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <div className="w-2 h-2 bg-chart-2 rounded-full mt-2 flex-shrink-0" />
                      <span>{indicator}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Recommendations</CardTitle>
                <CardDescription>Next steps for verification</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.details.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <div className="w-2 h-2 bg-chart-3 rounded-full mt-2 flex-shrink-0" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.push("/dashboard")} className="bg-primary hover:bg-primary/90">
              Analyze Another File
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("analysisData")
                router.push("/dashboard")
              }}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
