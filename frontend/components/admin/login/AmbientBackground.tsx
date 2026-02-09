"use client"

import { useReducedMotion } from "framer-motion"
import { motion } from "framer-motion"

const particles = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: `${10 + i * 12}%`,
  y: `${15 + (i % 5) * 18}%`,
  delay: i * 0.4,
  duration: 4 + (i % 3),
  size: 4 + (i % 3),
}))

export function AmbientBackground() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/10"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
