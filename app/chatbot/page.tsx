"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Send, Volume2, Loader2, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Message {
  role: "user" | "assistant" | "system"
  content: string
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [country, setCountry] = useState("United States")
  const [customCountry, setCustomCountry] = useState("")
  const [language, setLanguage] = useState("English")
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false)
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Insurance type buttons
  const insuranceTypes = [
    { emoji: "🚗", name: "Auto" },
    { emoji: "🏠", name: "Home" },
    { emoji: "🏥", name: "Health" },
    { emoji: "❤️", name: "Life" },
    { emoji: "✈️", name: "Travel" },
    { emoji: "🏢", name: "Business" },
    { emoji: "⚖️", name: "Liability" },
    { emoji: "🐾", name: "Pet" },
  ]

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Clean up audio URL when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  // Function to format message content with proper line breaks and lists
  const formatMessageContent = (content: string) => {
    // Replace newlines with <br> tags
    let formattedContent = content.replace(/\n/g, "<br>")

    // Format bullet points
    formattedContent = formattedContent.replace(/- (.*?)(?=<br|$)/g, "• $1")

    // Format numbered lists
    formattedContent = formattedContent.replace(/(\d+)\. (.*?)(?=<br|$)/g, '<span class="font-bold">$1.</span> $2')

    return formattedContent
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() && !selectedInsuranceType) return

    // Prepare message content based on input and selected insurance type
    let messageContent = input.trim()
    if (selectedInsuranceType) {
      if (messageContent) {
        messageContent = `Regarding ${selectedInsuranceType} insurance: ${messageContent}`
      } else {
        messageContent = `Tell me about ${selectedInsuranceType} insurance.`
      }
    }

    // Add user message
    const userMessage: Message = { role: "user" as const, content: messageContent }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Get the actual country value
    const actualCountry = country === "Other" ? customCountry : country

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageContent,
          country: actualCountry,
          language,
          history: messages.filter((msg) => msg.role !== "system"),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Add assistant message
      setMessages((prev) => [...prev, { role: "assistant" as const, content: data.content }])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ])
    } finally {
      setIsLoading(false)
      setSelectedInsuranceType(null) // Reset selected insurance type after sending
    }
  }

  const handleInsuranceTypeClick = (type: string) => {
    setSelectedInsuranceType((prev) => (prev === type ? null : type))
  }

  const generateAudio = async () => {
    if (messages.length === 0) return

    // Clean up previous audio URL
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }

    setIsGeneratingAudio(true)

    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
          language,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate audio")
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)

      // Auto-play the audio
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => {
            console.error("Failed to auto-play audio:", err)
          })
        }
      }, 100)
    } catch (error) {
      console.error("Error generating audio:", error)
      alert("Failed to generate audio. Please try again.")
    } finally {
      setIsGeneratingAudio(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
    }
    setSelectedInsuranceType(null)
  }

  // Function to export conversation
  const exportConversation = () => {
    if (messages.length === 0) return

    let conversationText = "Insurance Chatbot Conversation\n\n"
    messages.forEach((msg) => {
      if (msg.role === "user") {
        conversationText += `You: ${msg.content}\n\n`
      } else if (msg.role === "assistant") {
        conversationText += `Insurance Expert: ${msg.content}\n\n`
      }
    })

    const blob = new Blob([conversationText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "insurance-conversation.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100">
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold text-slate-800">AI Insurance Chatbot</h1>
          <div className="flex gap-2">
            {messages.length > 0 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={exportConversation}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Export conversation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={clearChat}>
                    Clear
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear conversation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Card className="backdrop-blur-lg bg-white/40 border border-white/20 shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">🛡️ AI Insurance Chatbot</h2>
            <p className="text-center text-slate-600 mb-6">
              Welcome! Pick your country, choose a language, and describe your insurance-related query.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="country">🌍 Country for Insurance Regulations</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Spain">Spain</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="China">China</SelectItem>
                    <SelectItem value="Lebanon">Lebanon</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>

                {country === "Other" && (
                  <div className="mt-2">
                    <Input
                      placeholder="Enter country name"
                      value={customCountry}
                      onChange={(e) => setCustomCountry(e.target.value)}
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="language">🗣️ Language Output</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Mandarin">Mandarin</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="h-[400px] overflow-y-auto border rounded-lg p-4 mb-4 bg-white/70">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-400">
                  Your conversation will appear here
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map(
                    (message, index) =>
                      message.role !== "system" && (
                        <div
                          key={index}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-800"
                            }`}
                          >
                            {message.role === "assistant" ? (
                              <div dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }} />
                            ) : (
                              message.content
                            )}
                          </div>
                        </div>
                      ),
                  )}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-[80%] rounded-lg p-3 bg-slate-200 text-slate-800">
                        <div className="flex space-x-2">
                          <div
                            className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {insuranceTypes.map((type) => (
                <Button
                  key={type.name}
                  variant={selectedInsuranceType === type.name ? "default" : "outline"}
                  className={`
                    ${
                      selectedInsuranceType === type.name
                        ? "bg-blue-600 text-white transform scale-105"
                        : "border-blue-300 hover:bg-blue-50"
                    }
                    transition-all duration-200
                  `}
                  onClick={() => handleInsuranceTypeClick(type.name)}
                >
                  {type.emoji} {type.name}
                </Button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  selectedInsuranceType
                    ? `Ask about ${selectedInsuranceType} insurance...`
                    : "Describe your insurance query..."
                }
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>

            {messages.length > 0 && (
              <div className="mt-6">
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                  onClick={generateAudio}
                  disabled={isGeneratingAudio || messages.length === 0}
                >
                  {isGeneratingAudio ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating Audio...
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4" />
                      Read Conversation
                    </>
                  )}
                </Button>

                {audioUrl && (
                  <div className="mt-2">
                    <audio ref={audioRef} controls className="w-full" src={audioUrl}>
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
