"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BarChart2, Clock, Leaf, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ModernHero } from "@/components/ui/modern-hero"
import { LeafParticles, BubbleParticles } from "@/components/ui/animated-particles"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">SCOPE AI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-700 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#benefits" className="text-slate-700 hover:text-blue-600 transition-colors">
              Benefits
            </Link>
            <Link href="#sustainability" className="text-slate-700 hover:text-blue-600 transition-colors">
              Sustainability
            </Link>
            <Link href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>
          <Link href="/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02]">Request Demo</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section with 3D Spline Animation */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-8">
            {/* 3D Shield Animation - Right side on desktop, top on mobile */}
            <div className="w-full md:w-5/12 h-[300px] md:h-[500px] relative">
              {/* @ts-ignore */}
              <ModernHero className="w-full h-full rounded-2xl" />
            </div>
            
            {/* Text Content - Left side on desktop, bottom on mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-full md:w-7/12 text-center md:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                SCOPE AI Insurance Assistant
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10">
                Our AI-powered assistant provides comprehensive information about insurance options across European countries.
                Get expert guidance on auto, home, health, and other insurance types, with specific focus on Italian and 
                European regulations, coverage options, and best practices for selecting the right insurance for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 shadow-lg shadow-blue-500/20">
                    Get Started
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/chatbot">
                    <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-6">
                      Try Our Chatbot
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section with 3D Animation */}
      <section id="features" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
          >
            Intelligent Features
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.1,
                type: "spring",
                stiffness: 50,
                damping: 15
              }}
              viewport={{ once: true, margin: "-100px", amount: 0.3 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="relative backdrop-blur-lg bg-white/40 p-8 rounded-xl border border-white/20 shadow-lg transition-all duration-500"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute -top-6 left-8 bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white shadow-lg shadow-blue-500/30"
              >
                <BarChart2 className="h-6 w-6" />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-800 mt-6 mb-4">Advanced Claim Analysis</h3>
              <p className="text-slate-600">
                Our AI performs deep analysis of claim details, including complexity, urgency, risk factors, and
                geographic location to determine optimal routing paths.
              </p>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.2,
                type: "spring",
                stiffness: 50,
                damping: 15
              }}
              viewport={{ once: true, margin: "-100px", amount: 0.3 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="relative backdrop-blur-lg bg-white/40 p-8 rounded-xl border border-white/20 shadow-lg transition-all duration-500"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -top-6 left-8 bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white shadow-lg shadow-blue-500/30"
              >
                <Zap className="h-6 w-6" />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-800 mt-6 mb-4">Intelligent Workload Distribution</h3>
              <p className="text-slate-600">
                Automatically routes claims to the most appropriate adjusters based on their expertise, current
                workload, historical performance, and specialized knowledge areas.
              </p>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.3,
                type: "spring",
                stiffness: 50,
                damping: 15
              }}
              viewport={{ once: true, margin: "-100px", amount: 0.3 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="relative backdrop-blur-lg bg-white/40 p-8 rounded-xl border border-white/20 shadow-lg transition-all duration-500"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute -top-6 left-8 bg-gradient-to-r from-blue-600 to-blue-800 p-3 rounded-lg text-white shadow-lg shadow-blue-500/30"
              >
                <Clock className="h-6 w-6" />
              </motion.div>
              <h3 className="text-xl font-bold text-slate-800 mt-6 mb-4">Dynamic Priority Management</h3>
              <p className="text-slate-600">
                Prioritizes claims based on multiple factors including urgency, policy terms, customer impact, and
                business rules to optimize processing sequence and resource allocation.
              </p>
            </motion.div>
          </div>
        </div>

        {/* 3D Animated Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
              rotateZ: [0, 5, 0]
            }}
            transition={{ 
              duration: 10, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl"
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              rotateZ: [0, -5, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl"
          />
        </div>
      </section>

      {/* Benefits Section with 3D Animation */}
      <section id="benefits" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl md:text-4xl font-bold text-slate-800 mb-16 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800"
            >
              Transform Your Claims Process
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 40,
                damping: 20
              }}
              viewport={{ once: true, margin: "-100px", amount: 0.2 }}
              className="backdrop-blur-lg bg-white/40 p-8 rounded-xl border border-white/20 shadow-lg transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <motion.div 
                  className="lg:w-1/2 relative"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* 3D-like image effect with hover animation */}
                  <motion.div
                    whileHover={{ 
                      rotateY: 5,
                      rotateX: -5,
                      scale: 1.02,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 20,
                      mass: 1.2
                    }}
                    className="rounded-xl overflow-hidden shadow-lg relative transition-all duration-500"
                  >
                    <Image
                      src="/images/ai-claims-routing.png"
                      alt="AI Claims Routing Process"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                    {/* Overlay gradient for 3D effect */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none"
                    />
                  </motion.div>
                  
                  {/* Decorative elements */}
                  <motion.div 
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0"
                  />
                </motion.div>

                <div className="lg:w-1/2 space-y-8">
                  {/* Benefit Item 1 */}
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 15,
                        mass: 1
                      }}
                      className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transition-all duration-300"
                    >
                      <Clock className="h-8 w-8" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Reduced Processing Time</h3>
                      <p className="text-slate-600">
                        Cut claim processing time by up to 60% with intelligent routing and prioritization.
                      </p>
                    </div>
                  </motion.div>

                  {/* Benefit Item 2 */}
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 15,
                        mass: 1
                      }}
                      className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transition-all duration-300"
                    >
                      <BarChart2 className="h-8 w-8" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Optimized Workload</h3>
                      <p className="text-slate-600">
                        Balance adjuster workloads for maximum efficiency and employee satisfaction.
                      </p>
                    </div>
                  </motion.div>

                  {/* Benefit Item 3 */}
                  <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 15,
                        mass: 1
                      }}
                      className="flex-shrink-0 h-16 w-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transition-all duration-300"
                    >
                      <Shield className="h-8 w-8" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">Improved Outcomes</h3>
                      <p className="text-slate-600">
                        Create better outcomes through expert matching and data-driven decisions.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Animated background elements */}
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity,
            ease: "linear" 
          }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] border-[40px] border-blue-300/20 rounded-full z-0"
        />
      </section>

      {/* Sustainability Section with 3D Effects */}
      <section id="sustainability" className="py-20 relative bg-gradient-to-b from-blue-50 to-green-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">Sustainability Focus</h2>
            <p className="text-xl text-slate-600">
              Our AI prioritizes sustainability by optimizing claims processing for electric vehicle owners.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 40,
              damping: 20
            }}
            viewport={{ once: true, margin: "-100px", amount: 0.2 }}
            className="backdrop-blur-lg bg-white/40 p-8 md:p-12 rounded-2xl border border-white/20 shadow-xl transition-all duration-500"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <motion.div 
                className="md:w-1/2 relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {/* 3D-like image effect with hover animation */}
                <motion.div
                  whileHover={{ 
                    rotateY: 5,
                    rotateX: -5,
                    scale: 1.02,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 20,
                    mass: 1.2
                  }}
                  className="rounded-xl overflow-hidden shadow-lg relative transition-all duration-500"
                >
                  <Image
                    src="/images/electric-car-charging.jpeg"
                    alt="Electric vehicle charging"
                    width={600}
                    height={400}
                    className="rounded-xl"
                  />
                  {/* Overlay gradient for 3D effect */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-transparent pointer-events-none"
                  />
                </motion.div>
                
                {/* Animated decorative elements */}
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0"
                />
              </motion.div>

              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 mb-6"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Leaf className="h-10 w-10 text-green-600" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-800">Electric Vehicle Priority</h3>
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-slate-600 mb-6"
                >
                  Our system identifies and prioritizes claims from electric vehicle owners, supporting the transition
                  to sustainable transportation.
                </motion.p>

                <motion.ul 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <motion.li 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-green-500/20"
                    >
                      <ArrowRight className="h-3 w-3 text-white" />
                    </motion.div>
                    <p className="text-slate-600">Specialized routing to EV-experienced adjusters</p>
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-green-500/20"
                    >
                      <ArrowRight className="h-3 w-3 text-white" />
                    </motion.div>
                    <p className="text-slate-600">Expedited processing for sustainable transportation</p>
                  </motion.li>
                  <motion.li 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center flex-shrink-0 mt-1 shadow-md shadow-green-500/20"
                    >
                      <ArrowRight className="h-3 w-3 text-white" />
                    </motion.div>
                    <p className="text-slate-600">Carbon footprint reduction through efficient claim handling</p>
                  </motion.li>
                </motion.ul>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Animated background elements */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-green-100 to-transparent opacity-30"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/3 right-10 w-60 h-60 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        
        {/* Floating leaf particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <LeafParticles count={3} />
        </div>
      </section>

      {/* CTA Section with 3D Effects */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 40,
              damping: 20
            }}
            viewport={{ once: true, margin: "-100px", amount: 0.2 }}
            className="max-w-4xl mx-auto backdrop-blur-lg bg-white/30 p-8 md:p-12 rounded-2xl border border-white/20 shadow-xl text-center relative z-10 transition-all duration-500"
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Ready to Transform Your Claims Process?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-xl text-slate-600 mb-8"
            >
              Join leading insurance companies already using our AI solution to optimize their workflow.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-lg px-8 py-6 shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]">
                    Request Demo
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* 3D decorative elements inside the card */}
            <motion.div 
              animate={{ 
                rotate: [0, 360],
                opacity: [0.05, 0.1, 0.05]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "linear" 
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-[20px] border-blue-300/10 rounded-full z-0"
            />
          </motion.div>
        </div>

        {/* Animated background elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, 20, 0]
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-1/2 left-1/4 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, -20, 0]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <BubbleParticles count={5} />
        </div>
      </section>

      {/* Footer with Animation */}
      <footer className="py-12 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated gradient background */}
        <motion.div 
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear",
            repeatType: "mirror"
          }}
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 opacity-50"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6 md:mb-0"
            >
              <motion.div
                animate={{ 
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <Shield className="h-8 w-8 text-blue-400" />
              </motion.div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">SCOPE AI</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-8 justify-center mb-6 md:mb-0"
            >
              {["Features", "Benefits", "Sustainability", "Contact"].map((item, i) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Link 
                    href={`#${item.toLowerCase()}`} 
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-slate-400 text-sm"
            >
              © 2025 SCOPE AI. All rights reserved.
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
