"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, WifiOff, Zap } from "lucide-react"

export function ConnectionStatus() {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleConnect = async () => {
    setIsConnecting(true)
    // Simulate connection process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsConnected(!isConnected)
    setIsConnecting(false)
  }

  return (
    <div className="flex items-center space-x-2">
      <Badge
        variant={isConnected ? "default" : "secondary"}
        className={`${isConnected ? "bg-green-500 hover:bg-green-600" : "bg-gray-500"} transition-all duration-300 ${isConnected ? "connection-pulse" : ""}`}
      >
        {isConnected ? <Wifi className="h-3 w-3 mr-1" /> : <WifiOff className="h-3 w-3 mr-1" />}
        {isConnected ? "Connected" : "Offline"}
      </Badge>

      <Button
        variant="outline"
        size="sm"
        onClick={handleConnect}
        disabled={isConnecting}
        className="hover-lift transition-all duration-300 hover:border-accent hover:text-accent bg-transparent"
      >
        {isConnecting ? (
          <>
            <div className="animate-spin h-3 w-3 mr-2 border border-current border-t-transparent rounded-full" />
            Connecting...
          </>
        ) : (
          <>
            <Zap className="h-3 w-3 mr-2" />
            {isConnected ? "Disconnect" : "Connect API"}
          </>
        )}
      </Button>
    </div>
  )
}
