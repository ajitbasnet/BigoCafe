"use client"

import { motion } from "framer-motion"
import { Coffee } from "lucide-react"

export function CoffeeLoader() {
  return (
    <span className="inline-flex items-center justify-center gap-2">
      <motion.span
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.98, 1, 0.98],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Coffee className="w-5 h-5" aria-hidden />
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-sm font-medium"
      >
        Signing in...
      </motion.span>
    </span>
  )
}
