"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "../../lib/framer-motion"
import { Shield, Send, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ModernHero } from "@/components/ui/modern-hero"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [validFields, setValidFields] = useState<{[key: string]: boolean}>({})
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    const newValidFields: {[key: string]: boolean} = {...validFields}
    
    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
      newValidFields.name = false
    } else {
      newValidFields.name = true
    }
    
    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
      newValidFields.email = false
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email is invalid"
      newValidFields.email = false
    } else {
      newValidFields.email = true
    }
    
    if (!formState.message.trim()) {
      newErrors.message = "Message is required"
      newValidFields.message = false
    } else {
      newValidFields.message = true
    }
    
    setErrors(newErrors)
    setValidFields(newValidFields)
    return Object.keys(newErrors).length === 0
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev}
        delete newErrors[name]
        return newErrors
      })
    }
    
    const validateField = () => {
      const newValidFields = {...validFields}
      
      if (name === 'name' && value.trim()) {
        newValidFields.name = true
      } else if (name === 'email' && value.trim() && /\S+@\S+\.\S+/.test(value)) {
        newValidFields.email = true
      } else if (name === 'message' && value.trim()) {
        newValidFields.message = true
      } else if (value.trim()) {
        newValidFields[name] = true
      } else {
        newValidFields[name] = false
      }
      
      setValidFields(newValidFields)
    }
    
    validateField()
  }
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    const form = e.currentTarget
    
    const formData = new FormData(form)
    
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        setIsSubmitting(false)
        setIsSubmitted(true)
        
        setTimeout(() => {
          setIsSubmitted(false)
          setFormState({
            name: "",
            email: "",
            company: "",
            message: ""
          })
          setValidFields({})
        }, 5000)
      } else {
        setIsSubmitting(false)
        alert('There was a problem submitting your form. Please try again.')
      }
    })
    .catch(error => {
      console.error('Error submitting form:', error)
      setIsSubmitting(false)
      alert('There was a problem submitting your form. Please try again.')
    })
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100">
      {/* Header */}
      <header className="container mx-auto py-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
              SCOPE AI
            </span>
          </Link>
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
          {/* Contact Form - Now on the right */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-8"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                className="h-full flex flex-col items-center justify-center text-center p-8"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2
                  }}
                >
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-2xl font-bold text-gray-800 mb-2"
                >
                  Thank You!
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-gray-600 mb-6"
                >
                  Your message has been received. We'll get back to you shortly.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.05]"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
                <form 
                  action="https://formsubmit.co/iftekharanwar1002@gmail.com" 
                  method="POST" 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  {/* FormSubmit Configuration */}
                  <input type="hidden" name="_subject" value="New Contact Form Submission - SCOPE AI" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_next" value={typeof window !== 'undefined' ? window.location.href : ''} />
                  <input type="hidden" name="_captcha" value="false" />
                  
                  {/* Honeypot field for spam protection */}
                  <div className="hidden">
                    <input type="text" name="_honey" />
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className={`w-full pr-10 ${
                          errors.name 
                            ? 'border-red-500 focus:ring-red-500' 
                            : validFields.name 
                              ? 'border-green-500 focus:ring-green-500' 
                              : ''
                        }`}
                        placeholder="Your name"
                      />
                      {validFields.name && !errors.name && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                    {errors.name && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center text-red-500 text-sm mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span>{errors.name}</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className={`w-full pr-10 ${
                          errors.email 
                            ? 'border-red-500 focus:ring-red-500' 
                            : validFields.email 
                              ? 'border-green-500 focus:ring-green-500' 
                              : ''
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {validFields.email && !errors.email && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                    {errors.email && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center text-red-500 text-sm mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span>{errors.email}</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className="w-full"
                      placeholder="Your company (optional)"
                    />
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <div className="relative">
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        className={`w-full min-h-[120px] pr-10 ${
                          errors.message 
                            ? 'border-red-500 focus:ring-red-500' 
                            : validFields.message 
                              ? 'border-green-500 focus:ring-green-500' 
                              : ''
                        }`}
                        placeholder="How can we help you?"
                      />
                      {validFields.message && !errors.message && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="absolute right-3 top-6 text-green-500"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}
                    </div>
                    {errors.message && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center text-red-500 text-sm mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          <span>{errors.message}</span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="pt-2"
                  >
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className={`w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <motion.div 
                          className="flex items-center justify-center"
                          initial={{ opacity: 0.8 }}
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending your message...</span>
                        </motion.div>
                      ) : (
                        <motion.div 
                          className="flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          <span>Send Message</span>
                        </motion.div>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </>
            )}
          </motion.div>
          
          {/* 3D Animation Section - Now on the left */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 h-[400px] relative rounded-2xl overflow-hidden shadow-xl"
          >
            <ModernHero className="h-full rounded-2xl" />
            
            {/* Floating Text Elements */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-4"
              >
                Get in Touch
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg text-white drop-shadow-md max-w-md"
              >
                Have questions about SCOPE AI? Our team is here to help you with all your European insurance needs.
              </motion.p>
            </div>
          </motion.div>
        </div>
        
        {/* 3D Animated Contact Info Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {[
            { 
              title: "Email Us", 
              description: "Our team typically responds within 24 hours.", 
              contact: "iftekharanwar1002@gmail.com",
              icon: "mail"
            },
            { 
              title: "Call Us", 
              description: "Available Monday-Friday, 9am-5pm CET.", 
              contact: "+39 02 1234 5678",
              icon: "phone"
            },
            { 
              title: "Visit Us", 
              description: "Our headquarters in Milan, Italy.", 
              contact: "Via Roma 123, 20121 Milan",
              icon: "map"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: 0.1 * index 
              }}
              whileHover={{ 
                y: -10,
                scale: 1.03,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div 
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4"
                >
                  {item.icon === "mail" && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                  {item.icon === "phone" && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                  {item.icon === "map" && <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 + (0.1 * index) }}
                  className="text-xl font-semibold text-gray-800 mb-2"
                >
                  {item.title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + (0.1 * index) }}
                  className="text-gray-600 mb-3"
                >
                  {item.description}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + (0.1 * index) }}
                  className="text-blue-600 font-medium"
                >
                  {item.contact}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
      
      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
      
      {/* Footer */}
      <footer className="bg-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                SCOPE AI
              </span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Home</Link>
              <Link href="/chatbot" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Chatbot</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Contact</Link>
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} SCOPE AI. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
