"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Send, Download, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
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
  const [country, setCountry] = useState("Italy")
  const [customCountry, setCustomCountry] = useState("")
  const [language, setLanguage] = useState("English")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedInsuranceType, setSelectedInsuranceType] = useState<string | null>(null)
  const [savedConversations, setSavedConversations] = useState<{id: string, title: string, date: string}[]>([])
  const [showSavedConversations, setShowSavedConversations] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
  
  const [showGlossary, setShowGlossary] = useState(false)
  const insuranceGlossary = [
    { term: "RCA (Italy)", definition: "Responsabilità Civile Auto - Mandatory third-party liability insurance for vehicles in Italy" },
    { term: "MTPL", definition: "Motor Third Party Liability - Mandatory insurance across EU that covers damage to third parties" },
    { term: "Green Card", definition: "International certificate proving you have minimum insurance coverage when driving in Europe" },
    { term: "EHIC/GHIC", definition: "European/Global Health Insurance Card - Provides access to state healthcare in EU countries" },
    { term: "SSN (Italy)", definition: "Servizio Sanitario Nazionale - Italy's national health service" },
    { term: "NHS (UK)", definition: "National Health Service - UK's public healthcare system" },
    { term: "Assicurazione Casa", definition: "Home insurance in Italy covering building and contents" },
    { term: "Kapitallebensversicherung", definition: "Capital life insurance in Germany with savings component" },
    { term: "Schengen Insurance", definition: "Travel insurance required for non-EU visitors to the Schengen Area" },
    { term: "INAIL (Italy)", definition: "National Institute for Insurance against Accidents at Work - Manages workplace injury insurance" },
    { term: "Solvency II", definition: "EU directive establishing capital requirements for insurance companies" },
    { term: "IDD", definition: "Insurance Distribution Directive - EU regulation for insurance sales and advice" },
  ]

  useEffect(() => {
    const savedConvs = localStorage.getItem('scopeAI-savedConversations')
    if (savedConvs) {
      setSavedConversations(JSON.parse(savedConvs))
    }
  }, [])

  useEffect(() => {
    const lastConversation = localStorage.getItem('scopeAI-lastConversation')
    if (lastConversation) {
      const { messages: savedMessages, country: savedCountry, language: savedLanguage } = JSON.parse(lastConversation)
      setMessages(savedMessages)
      setCountry(savedCountry)
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('scopeAI-lastConversation', JSON.stringify({
        messages,
        country,
        language
      }))
    }
  }, [messages, country, language])

  // Scroll to bottom of messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const currencyMap: Record<string, { symbol: string, code: string, format: (val: number) => string }> = {
    "Italy": { 
      symbol: "€", 
      code: "EUR",
      format: (val) => `€${val.toLocaleString('it-IT')}`
    },
    "United Kingdom": { 
      symbol: "£", 
      code: "GBP",
      format: (val) => `£${val.toLocaleString('en-GB')}`
    },
    "Spain": { 
      symbol: "€", 
      code: "EUR",
      format: (val) => `€${val.toLocaleString('es-ES')}`
    },
    "France": { 
      symbol: "€", 
      code: "EUR",
      format: (val) => `€${val.toLocaleString('fr-FR')}`
    },
    "Germany": { 
      symbol: "€", 
      code: "EUR",
      format: (val) => `€${val.toLocaleString('de-DE')}`
    },
    "Portugal": { 
      symbol: "€", 
      code: "EUR",
      format: (val) => `€${val.toLocaleString('pt-PT')}`
    },
    "Greece": { 
      symbol: "€", 
      code: "EUR",
      format: (val) => `€${val.toLocaleString('el-GR')}`
    },
    "Netherlands": { 
      symbol: "€", 
      code: "EUR",
      format: (val) => `€${val.toLocaleString('nl-NL')}`
    },
    "Belgium": { 
      symbol: "€", 
      code: "EUR",
      format: (val) => `€${val.toLocaleString('fr-BE')}`
    },
    "Switzerland": { 
      symbol: "CHF", 
      code: "CHF",
      format: (val) => `CHF ${val.toLocaleString('de-CH')}`
    },
    "Austria": { 
      symbol: "€", 
      code: "EUR",
      format: (val) => `€${val.toLocaleString('de-AT')}`
    }
  };

  const defaultCurrencyFormat = (val: number) => `€${val.toLocaleString('en-US')}`;

  // Function to format currency based on selected country
  const formatCurrency = (value: string) => {
    // Get the actual country value
    const actualCountry = country === "Other" ? customCountry : country;
    
    const currencyRegex = /([€£$]|CHF)\s*(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{0,2})?)/g;
    
    return value.replace(currencyRegex, (match, currencySymbol, amount) => {
      const cleanAmount = amount.replace(/[.,]/g, '');
      const numericAmount = parseInt(cleanAmount, 10);
      
      if (isNaN(numericAmount)) return match;
      
      // Format the currency based on the selected country
      const formatter = currencyMap[actualCountry]?.format || defaultCurrencyFormat;
      return formatter(numericAmount);
    });
  };

  // Function to format message content with proper line breaks and lists
  const formatMessageContent = (content: string) => {
    let formattedContent = formatCurrency(content);
    
    // Replace newlines with <br> tags
    formattedContent = formattedContent.replace(/\n/g, "<br>")

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
        { 
          role: "assistant", 
          content: "I apologize, but I encountered an error processing your request. This could be due to network issues or service unavailability. Please try again in a moment, or try a different question about insurance." 
        },
      ])
    } finally {
      setIsLoading(false)
      setSelectedInsuranceType(null) // Reset selected insurance type after sending
    }
  }

  const handleInsuranceTypeClick = (type: string) => {
    setSelectedInsuranceType((prev) => (prev === type ? null : type))
  }

  // Function removed as per requirements to remove audio functionality

  const clearChat = () => {
    setMessages([])
    setSelectedInsuranceType(null)
    showNotification('Conversation cleared', 'success')
  }

  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  // Function to show notification for a few seconds
  
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  const saveCurrentConversation = () => {
    if (messages.length === 0) return;
    
    const firstUserMessage = messages.find(msg => msg.role === 'user');
    const title = firstUserMessage 
      ? firstUserMessage.content.substring(0, 30) + (firstUserMessage.content.length > 30 ? '...' : '')
      : 'Conversation ' + new Date().toLocaleDateString();
    
    const newConversation = {
      id: Date.now().toString(),
      title,
      date: new Date().toLocaleDateString()
    };
    
    localStorage.setItem(`scopeAI-conversation-${newConversation.id}`, JSON.stringify({
      messages,
      country,
      language
    }));
    
    const updatedConversations = [...savedConversations, newConversation];
    setSavedConversations(updatedConversations);
    localStorage.setItem('scopeAI-savedConversations', JSON.stringify(updatedConversations));
    
    showNotification('Conversation saved successfully', 'success');
  };
  
  // Function to load a saved conversation
  const loadConversation = (id: string) => {
    const savedConversation = localStorage.getItem(`scopeAI-conversation-${id}`);
    if (savedConversation) {
      const { messages: savedMessages, country: savedCountry, language: savedLanguage } = JSON.parse(savedConversation);
      setMessages(savedMessages);
      setCountry(savedCountry);
      setLanguage(savedLanguage);
      setShowSavedConversations(false);
      showNotification('Conversation loaded successfully', 'success');
    } else {
      showNotification('Failed to load conversation', 'error');
    }
  };
  
  // Function to delete a saved conversation
  const deleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the load conversation
    
    localStorage.removeItem(`scopeAI-conversation-${id}`);
    
    const updatedConversations = savedConversations.filter(conv => conv.id !== id);
    setSavedConversations(updatedConversations);
    localStorage.setItem('scopeAI-savedConversations', JSON.stringify(updatedConversations));
    showNotification('Conversation deleted', 'success');
  };

  // Function to export conversation
  const exportConversation = () => {
    if (messages.length === 0) return

    let conversationText = "SCOPE AI ChatBot Conversation\n\n"
    conversationText += `Country: ${country === "Other" ? customCountry : country}\n`
    conversationText += `Language: ${language}\n\n`
    
    messages.forEach((msg) => {
      if (msg.role === "user") {
        conversationText += `You: ${msg.content}\n\n`
      } else if (msg.role === "assistant") {
        conversationText += `SCOPE AI: ${msg.content}\n\n`
      }
    })

    const blob = new Blob([conversationText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "scope-ai-conversation.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    showNotification('Conversation exported successfully', 'success');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100">
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Return to homepage">
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
          <Link href="/" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
              <Shield className="h-5 w-5 text-blue-600 transform rotate-12" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">SCOPE AI</span>
            </h1>
          </Link>
          <div className="flex gap-2" role="toolbar" aria-label="Chatbot controls">
            {messages.length > 0 && (
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={saveCurrentConversation}
                        aria-label="Save conversation"
                        className="h-9 w-9 p-0 rounded-full hover:bg-blue-50"
                      >
                        <span className="text-blue-600 text-lg">💾</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save conversation</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={exportConversation}
                        aria-label="Export conversation"
                        className="h-9 w-9 p-0 rounded-full hover:bg-blue-50"
                      >
                        <Download className="h-5 w-5" aria-hidden="true" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Export conversation</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            )}
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowSavedConversations(!showSavedConversations)}
                    aria-label="View saved conversations"
                    aria-pressed={showSavedConversations}
                    className="h-9 w-9 p-0 rounded-full hover:bg-blue-50"
                  >
                    <span className="text-blue-600 text-lg">📂</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View saved conversations</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearChat}
                    aria-label="Clear conversation"
                    className="h-9 px-3 rounded-lg hover:bg-red-50 hover:text-red-600 text-sm"
                  >
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

      <div className="container mx-auto px-4 py-6 relative">
        {notification && (
          <div 
            className={`fixed top-20 right-4 p-3 sm:p-4 rounded-lg shadow-lg animate-fadeIn z-50 ${
              notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 
              'bg-red-100 text-red-800 border border-red-200'
            } max-w-[90vw] sm:max-w-md touch-manipulation`}
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <span className={`${notification.type === 'success' ? 'text-green-500' : 'text-red-500'} text-lg sm:text-xl flex-shrink-0`}>
                {notification.type === 'success' ? '✓' : '✗'}
              </span>
              <p className="text-sm sm:text-base font-medium">{notification.message}</p>
            </div>
          </div>
        )}
        <Card className="backdrop-blur-lg bg-white/40 border border-white/20 shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex items-center justify-center mb-2">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                  <Shield className="h-6 w-6 text-blue-600 transform rotate-12" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">SCOPE AI</span>
                </h2>
              </div>
            </div>
            <p className="text-center text-slate-600 mb-6">
              Welcome! Select your European country, choose a language, and describe your insurance-related query.
            </p>
            
            {/* Enhanced Mobile-Responsive Saved Conversations Panel */}
            {showSavedConversations && (
              <div className="mb-6 p-3 sm:p-4 border rounded-lg bg-white/90 shadow-sm animate-fadeIn">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-blue-800">Saved Conversations</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowSavedConversations(false)}
                    aria-label="Close saved conversations"
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    ✕
                  </Button>
                </div>
                
                {savedConversations.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-4">No saved conversations yet</p>
                ) : (
                  <div className="max-h-[250px] sm:max-h-[300px] overflow-y-auto pr-1">
                    {savedConversations.map((conv) => (
                      <div 
                        key={conv.id}
                        onClick={() => loadConversation(conv.id)}
                        className="flex justify-between items-center p-2 sm:p-3 border-b border-slate-100 hover:bg-blue-50 cursor-pointer rounded transition-colors mb-1"
                        role="button"
                        aria-label={`Load conversation: ${conv.title}`}
                      >
                        <div className="flex-1 min-w-0 mr-2">
                          <p className="font-medium text-sm text-blue-700 truncate">{conv.title}</p>
                          <p className="text-xs text-slate-500">{conv.date}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => deleteConversation(conv.id, e)}
                          aria-label={`Delete conversation: ${conv.title}`}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0 flex-shrink-0"
                        >
                          🗑️
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="country" className="flex items-center gap-1 text-sm sm:text-base">
                  <span className="text-blue-600">🌍</span> European Country
                </Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger 
                    id="country" 
                    className="bg-white/80 h-10 sm:h-11 text-sm sm:text-base shadow-sm rounded-lg"
                  >
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[40vh] overflow-y-auto">
                    <SelectItem value="Italy" className="py-2.5 text-sm sm:text-base">Italy</SelectItem>
                    <SelectItem value="United Kingdom" className="py-2.5 text-sm sm:text-base">United Kingdom</SelectItem>
                    <SelectItem value="Spain" className="py-2.5 text-sm sm:text-base">Spain</SelectItem>
                    <SelectItem value="France" className="py-2.5 text-sm sm:text-base">France</SelectItem>
                    <SelectItem value="Germany" className="py-2.5 text-sm sm:text-base">Germany</SelectItem>
                    <SelectItem value="Portugal" className="py-2.5 text-sm sm:text-base">Portugal</SelectItem>
                    <SelectItem value="Greece" className="py-2.5 text-sm sm:text-base">Greece</SelectItem>
                    <SelectItem value="Netherlands" className="py-2.5 text-sm sm:text-base">Netherlands</SelectItem>
                    <SelectItem value="Belgium" className="py-2.5 text-sm sm:text-base">Belgium</SelectItem>
                    <SelectItem value="Switzerland" className="py-2.5 text-sm sm:text-base">Switzerland</SelectItem>
                    <SelectItem value="Austria" className="py-2.5 text-sm sm:text-base">Austria</SelectItem>
                    <SelectItem value="Other" className="py-2.5 text-sm sm:text-base">Other</SelectItem>
                  </SelectContent>
                </Select>

                {country === "Other" && (
                  <div className="mt-2">
                    <Input
                      placeholder="Enter country name"
                      value={customCountry}
                      onChange={(e) => setCustomCountry(e.target.value)}
                      className="bg-white/80 h-10 sm:h-11 text-sm sm:text-base shadow-sm rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="language" className="flex items-center gap-1 text-sm sm:text-base">
                  <span className="text-blue-600">🗣️</span> Language Output
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger 
                    id="language" 
                    className="bg-white/80 h-10 sm:h-11 text-sm sm:text-base shadow-sm rounded-lg"
                  >
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[40vh] overflow-y-auto">
                    <SelectItem value="English" className="py-2.5 text-sm sm:text-base">English</SelectItem>
                    <SelectItem value="Italian" className="py-2.5 text-sm sm:text-base">Italian</SelectItem>
                    <SelectItem value="Spanish" className="py-2.5 text-sm sm:text-base">Spanish</SelectItem>
                    <SelectItem value="French" className="py-2.5 text-sm sm:text-base">French</SelectItem>
                    <SelectItem value="German" className="py-2.5 text-sm sm:text-base">German</SelectItem>
                    <SelectItem value="Portuguese" className="py-2.5 text-sm sm:text-base">Portuguese</SelectItem>
                    <SelectItem value="Dutch" className="py-2.5 text-sm sm:text-base">Dutch</SelectItem>
                    <SelectItem value="Greek" className="py-2.5 text-sm sm:text-base">Greek</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Enhanced Mobile-Responsive Conversation Context Indicator */}
            {messages.length > 0 && (
              <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2 sm:px-3 py-1.5 text-blue-800 shadow-sm">
                  <span className="font-medium">Country:</span> {country === "Other" ? customCountry : country}
                </div>
                <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 sm:px-3 py-1.5 text-green-800 shadow-sm">
                  <span className="font-medium">Language:</span> {language}
                </div>
                {selectedInsuranceType && (
                  <div className="flex items-center gap-1 rounded-full bg-purple-100 px-2 sm:px-3 py-1.5 text-purple-800 shadow-sm">
                    <span className="font-medium">Topic:</span> {selectedInsuranceType}
                  </div>
                )}
                <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 sm:px-3 py-1.5 text-amber-800 shadow-sm">
                  <span className="font-medium">Currency:</span> {currencyMap[country]?.symbol || "€"}
                </div>
              </div>
            )}

            <div 
              className="h-[350px] sm:h-[400px] overflow-y-auto border rounded-lg p-3 sm:p-4 mb-4 bg-white/80 shadow-md"
              role="log"
              aria-label="Chat conversation"
              aria-live="polite"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center">
                  <p className="text-slate-500 mb-4">Your conversation will appear here</p>
                  <div className="space-y-2 w-full max-w-md">
                    <p className="text-sm text-slate-500 mb-2 text-center">Try asking one of these questions:</p>
                    {[
                      "What types of auto insurance are available in Italy?",
                      "How does health insurance work in European countries?",
                      "What is covered by homeowners insurance in Spain?",
                      "Do I need travel insurance when traveling within the EU?",
                    ].map((question, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-2 rounded-lg border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm transition-colors"
                        onClick={() => {
                          setInput(question);
                          handleSubmit(new Event('click') as unknown as React.FormEvent);
                        }}
                        aria-label={`Ask: ${question}`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map(
                    (message, index) =>
                      message.role !== "system" && (
                        <div
                          key={index}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn w-full mb-4`}
                          role={message.role === "assistant" ? "status" : "none"}
                          aria-label={message.role === "assistant" ? "Assistant response" : "Your message"}
                        >
                          <div className={`flex items-start gap-1 sm:gap-2 max-w-[85%] sm:max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                            {message.role === "assistant" ? (
                              <div 
                                className="flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-blue-100 flex items-center justify-center"
                                aria-hidden="true"
                              >
                                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 transform rotate-12" />
                              </div>
                            ) : (
                              <div 
                                className="flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm"
                                aria-hidden="true"
                              >
                                <span>You</span>
                              </div>
                            )}
                            <div
                              className={`rounded-lg p-2.5 sm:p-3.5 shadow-sm ${
                                message.role === "user" 
                                  ? "bg-blue-600 text-white" 
                                  : "bg-white border border-slate-200 text-slate-800"
                              }`}
                            >
                              {message.role === "assistant" ? (
                                <div>
                                  <div dangerouslySetInnerHTML={{ __html: formatMessageContent(message.content) }} />
                                  <div className="text-[10px] sm:text-xs text-slate-400 mt-1 sm:mt-2" aria-label="Sent at">
                                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  {message.content}
                                  <div className="text-[10px] sm:text-xs text-blue-300 mt-1 sm:mt-2" aria-label="Sent at">
                                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ),
                  )}
                  {isLoading && (
                    <div className="flex justify-start animate-fadeIn">
                      <div className="flex items-start gap-1 sm:gap-2 max-w-[85%] sm:max-w-[80%]">
                        <div className="flex-shrink-0 h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 transform rotate-12" />
                        </div>
                        <div className="rounded-lg p-2 sm:p-4 bg-white border border-slate-200 shadow-sm">
                          <div className="flex flex-col space-y-2">
                            <div className="flex space-x-2 items-center">
                              <div
                                className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 animate-pulse"
                                style={{ animationDelay: "0ms" }}
                              ></div>
                              <div
                                className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 animate-pulse"
                                style={{ animationDelay: "150ms" }}
                              ></div>
                              <div
                                className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 animate-pulse"
                                style={{ animationDelay: "300ms" }}
                              ></div>
                            </div>
                            <div className="h-2 w-24 bg-slate-100 rounded animate-pulse"></div>
                            <div className="h-2 w-32 bg-slate-100 rounded animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-slate-700">Select insurance type:</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowGlossary(!showGlossary)}
                className="text-xs sm:text-sm flex items-center gap-1 sm:gap-2 border-blue-300 hover:bg-blue-50 h-8 sm:h-9 px-2 sm:px-3 rounded-lg shadow-sm touch-manipulation"
                aria-pressed={showGlossary}
                aria-label="Toggle European insurance terminology glossary"
              >
                <span className="text-base sm:text-lg">📘</span> Insurance Terms
              </Button>
            </div>
            
            {showGlossary && (
              <div className="mb-4 p-3 sm:p-4 border rounded-lg bg-white/90 shadow-sm animate-fadeIn">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-blue-800">European Insurance Terminology</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowGlossary(false)}
                    aria-label="Close glossary"
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    ✕
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[250px] sm:max-h-[300px] overflow-y-auto pr-1">
                  {insuranceGlossary.map((item, index) => (
                    <div key={index} className="border-b border-slate-100 pb-2 hover:bg-blue-50 rounded px-2 transition-colors">
                      <p className="font-medium text-sm text-blue-700">{item.term}</p>
                      <p className="text-xs text-slate-600">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Enhanced mobile-responsive insurance type grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
              {insuranceTypes.map((type) => (
                <Button
                  key={type.name}
                  variant={selectedInsuranceType === type.name ? "default" : "outline"}
                  className={`
                    ${
                      selectedInsuranceType === type.name
                        ? "bg-blue-600 text-white transform scale-105 shadow-md"
                        : "border-blue-300 hover:bg-blue-50 hover:border-blue-400"
                    }
                    transition-all duration-200 h-auto py-3 sm:py-4 flex flex-col items-center justify-center gap-1
                    text-sm sm:text-base touch-manipulation
                  `}
                  onClick={() => handleInsuranceTypeClick(type.name)}
                  aria-pressed={selectedInsuranceType === type.name}
                  title={`Ask about ${type.name} insurance`}
                >
                  <span className="text-lg sm:text-xl">{type.emoji}</span>
                  <span>{type.name}</span>
                </Button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-1 sm:gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  selectedInsuranceType
                    ? `Ask about ${selectedInsuranceType} insurance...`
                    : "Describe your insurance query..."
                }
                className="flex-1 text-sm sm:text-base h-10 sm:h-11 rounded-lg shadow-sm"
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.ctrlKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                aria-label="Insurance query input"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                aria-label="Send message"
                title="Send message (Ctrl+Enter)"
                className="h-10 sm:h-11 w-10 sm:w-11 p-0 rounded-lg shadow-sm"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </form>
            
            <div className="text-xs text-slate-500 mt-1 text-center">
              Press Ctrl+Enter to send message
            </div>

            {/* Audio options removed as requested */}
          </div>
        </Card>
      </div>
    </div>
  )
}
