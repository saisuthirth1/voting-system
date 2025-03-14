"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Paperclip, Send, Video, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Message {
  id: number
  content: string
  sender: "user" | "support"
  timestamp: Date
}

interface SupportChatProps {
  isOpen: boolean
  onClose: () => void
}

export function SupportChat({ isOpen, onClose }: SupportChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! How can I help you with the voting verification system today?",
      sender: "support",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Simulate support agent typing
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout

    if (messages.length > 0 && messages[messages.length - 1].sender === "user") {
      setIsTyping(true)

      typingTimeout = setTimeout(() => {
        const responses = [
          "I understand your issue. Let me help you with that.",
          "Have you tried restarting the verification device?",
          "I can see your polling station. Let me check the system status.",
          "The fingerprint scanner might need recalibration. I'll guide you through the process.",
          "Let me connect you with our technical specialist who can help resolve this issue.",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            content: randomResponse,
            sender: "support",
            timestamp: new Date(),
          },
        ])

        setIsTyping(false)
      }, 2000)
    }

    return () => clearTimeout(typingTimeout)
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: inputValue,
          sender: "user",
          timestamp: new Date(),
        },
      ])
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Support Agent" />
                <AvatarFallback>TS</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg">Technical Support</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-2 px-4 py-2">
            <TabsTrigger value="chat">Chat Support</TabsTrigger>
            <TabsTrigger value="video">Video Call</TabsTrigger>
          </TabsList>

          <TabsContent
            value="chat"
            className="flex-1 flex flex-col data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="mt-1 text-right text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <CardFooter className="border-t p-4">
              <div className="flex w-full items-center gap-2">
                <Button variant="outline" size="icon" className="shrink-0">
                  <Paperclip className="h-5 w-5" />
                  <span className="sr-only">Attach file</span>
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1"
                />
                <Button size="icon" className="shrink-0" onClick={handleSendMessage}>
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </CardFooter>
          </TabsContent>

          <TabsContent
            value="video"
            className="flex-1 flex flex-col items-center justify-center data-[state=active]:flex data-[state=inactive]:hidden"
          >
            <div className="text-center">
              <Video className="mx-auto h-16 w-16 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-bold">Start Video Call</h3>
              <p className="mt-2 text-muted-foreground">
                Connect with a technical support specialist via video for visual troubleshooting
              </p>
              <Button className="mt-4">Start Video Call</Button>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

