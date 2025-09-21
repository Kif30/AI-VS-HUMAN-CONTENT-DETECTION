import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI Content Detector - Professional Detection Suite",
  description: "Advanced AI content detection across text, images, video, and audio",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased theme-transition`}>
        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
            <div className="floating-bg" />
            <div className="floating-orbs">
              <div className="floating-orb" />
              <div className="floating-orb" />
              <div className="floating-orb" />
            </div>

            <div className="fixed inset-0 -z-10 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-96 h-96 gradient-bg rounded-full blur-3xl animate-pulse-slow opacity-20" />
              <div className="absolute -bottom-40 -left-40 w-96 h-96 gradient-secondary rounded-full blur-3xl animate-pulse-slow delay-1000 opacity-20" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 gradient-accent rounded-full blur-3xl animate-pulse-slow delay-500 opacity-15" />
            </div>

            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
