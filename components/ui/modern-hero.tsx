"use client"

import React from "react"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"

export function ModernHero({ className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-gradient-to-b from-sky-50 to-blue-100 ${className}`}>
      {/* Modern 3D-like hero with animations */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-64 h-64 md:w-80 md:h-80"
        >
          {/* Animated shield icon */}
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              rotateX: [0, 15, 0, -15, 0],
              scale: [1, 1.05, 1, 1.05, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 flex items-center justify-center z-10"
          >
            <Shield className="h-32 w-32 md:h-40 md:w-40 text-blue-600" />
          </motion.div>
          
          {/* Animated glow effects */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          />
          
          {/* Animated rings */}
          <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute inset-0 border-4 border-blue-300/30 rounded-full"
          />
          
          <motion.div 
            animate={{ 
              rotate: [360, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute inset-0 border-8 border-blue-400/20 rounded-full"
          />
        </motion.div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${10 + (i * 15)}%`, 
              y: -20,
              opacity: 0.3 + (i * 0.05)
            }}
            animate={{ 
              y: "120%",
              x: `${5 + (i * 15)}%`,
              opacity: [0.3 + (i * 0.05), 0.5 + (i * 0.05), 0.3 + (i * 0.05), 0.1, 0]
            }}
            transition={{ 
              duration: 10 + (i * 2),
              repeat: Infinity,
              delay: i * 2,
              ease: "linear"
            }}
            className="absolute w-3 h-3 bg-blue-300 rounded-full blur-sm"
          />
        ))}
      </div>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50/80 via-transparent to-blue-100/80 pointer-events-none"></div>
    </div>
  )
}