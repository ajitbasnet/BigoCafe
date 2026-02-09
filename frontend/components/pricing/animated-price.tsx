"use client"

import { motion } from "framer-motion"
import { formatNPR } from "@/lib/pricing/format"

interface AnimatedPriceProps {
  amount: number
  className?: string
}

/**
 * Displays NPR amount with a short animation when the value changes.
 */
export function AnimatedPrice({ amount, className }: AnimatedPriceProps) {
  return (
    <motion.span
      key={amount}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={className}
    >
      {formatNPR(amount)}
    </motion.span>
  )
}
