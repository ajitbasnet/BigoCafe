"use client"

import { motion } from "framer-motion"
import { CoffeeLoader } from "./CoffeeLoader"

interface LuxuryButtonProps {
  type: "submit"
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  className?: string
}

export function LuxuryButton({
  type,
  disabled,
  loading,
  children,
  className,
}: LuxuryButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`${className ?? ""} ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <span className="relative block w-full overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold uppercase tracking-widest text-[#F6F1EB] transition-all duration-300 pointer-events-none">
        {/* Base gradient - don't capture clicks */}
        <span
          className="absolute inset-0 block rounded-xl pointer-events-none"
          style={{
            background: "linear-gradient(135deg, #5D4037 0%, #3E2723 100%)",
          }}
        />
        {/* Gold shimmer on hover - don't capture clicks */}
        <motion.span
          className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, transparent 40%, rgba(198,167,105,0.25) 50%, transparent 60%, transparent 100%)",
            backgroundSize: "200% 100%",
          }}
          initial={false}
          whileHover={
            disabled
              ? {}
              : {
                  opacity: 1,
                  transition: { duration: 0.6 },
                }
          }
        />
        <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
          {loading ? <CoffeeLoader /> : children}
        </span>
      </span>
    </motion.button>
  )
}
