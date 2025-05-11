"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Leaf } from "lucide-react"

export function LeafParticles({ count = 3, type = "leaf" }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return null
  
  const positions = [
    { x: "10%", rotate: 180, scale: 0.7, opacity: 0.6, duration: 25 },
    { x: "30%", rotate: 320, scale: 0.5, opacity: 0.4, duration: 20 },
    { x: "50%", rotate: 90, scale: 0.8, opacity: 0.7, duration: 30 },
    { x: "70%", rotate: 270, scale: 0.6, opacity: 0.5, duration: 22 },
    { x: "90%", rotate: 45, scale: 0.9, opacity: 0.8, duration: 28 }
  ]
  
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const pos = positions[i % positions.length]
        
        return (
          <motion.div 
            key={i}
            initial={{ 
              x: pos.x, 
              y: -20,
              scale: pos.scale,
              rotate: pos.rotate,
              opacity: pos.opacity
            }}
            animate={{ 
              y: "120%",
              rotate: pos.rotate * 2,
              opacity: [pos.opacity, pos.opacity + 0.1, pos.opacity, pos.opacity - 0.2, 0]
            }}
            transition={{ 
              duration: pos.duration,
              repeat: Infinity,
              delay: i * 3,
              ease: "linear"
            }}
            className="absolute w-8 h-8 text-green-500"
          >
            {type === "leaf" ? (
              <Leaf className="w-full h-full" />
            ) : (
              <div className="w-full h-full rounded-full bg-blue-400 opacity-30" />
            )}
          </motion.div>
        )
      })}
    </>
  )
}

export function BubbleParticles({ count = 5 }) {
  return <LeafParticles count={count} type="bubble" />
}