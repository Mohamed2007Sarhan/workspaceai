"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, Send, X, Minimize2 } from "lucide-react"

interface Message {
  id: number
  sender: "user" | "ai"
  content: string
  time: string
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      content: "مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟",
      time: "الآن",
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: newMessage,
      time: "الآن",
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        sender: "ai",
        content: "شكراً لك على سؤالك. دعني أساعدك في ذلك...",
        time: "الآن",
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 animate-pulse-glow shadow-lg"
          size="icon"
        >
          <Bot className="w-6 h-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Card
        className={`w-80 bg-card/95 backdrop-blur-sm border-border/50 shadow-xl transition-all duration-300 ${
          isMinimized ? "h-16" : "h-96"
        }`}
      >
        <CardHeader
          className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center space-x-2 space-x-reverse">
            <Bot className="w-5 h-5 text-primary animate-pulse-glow" />
            <CardTitle className="text-lg">المساعد الذكي</CardTitle>
            <Badge variant="secondary" className="text-xs">
              متصل
            </Badge>
          </div>
          <div className="flex space-x-1 space-x-reverse">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                setIsMinimized(!isMinimized)
              }}
            >
              <Minimize2 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-80 p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-2 text-sm ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    {message.sender === "ai" && (
                      <div className="flex items-center space-x-1 space-x-reverse mb-1">
                        <Bot className="h-3 w-3 text-primary" />
                        <span className="text-xs opacity-70">مساعد ذكي</span>
                      </div>
                    )}
                    <p>{message.content}</p>
                    <div className="text-xs opacity-70 mt-1">{message.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-border/50 p-3">
              <div className="flex space-x-2 space-x-reverse">
                <Input
                  placeholder="اكتب رسالتك..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="flex-1 text-sm"
                />
                <Button size="sm" onClick={sendMessage}>
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
