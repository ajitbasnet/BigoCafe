"use client"

import { motion } from "framer-motion"
import { Lock } from "lucide-react"
import { useMembershipStore } from "@/stores/membership-store"

interface GoldenLockOverlayProps {
  children: React.ReactNode
  onSelectGolden?: () => void
}

export function GoldenLockOverlay({ children, onSelectGolden }: GoldenLockOverlayProps) {
  const isGold = useMembershipStore((s) => s.isGold())

  if (isGold()) return <>{children}</>

  return (
    <div className="relative">
      {children}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 rounded-xl bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 p-6"
      >
        <div className="w-14 h-14 rounded-full bg-[var(--bigo-gold)]/20 flex items-center justify-center">
          <Lock className="w-7 h-7 text-[var(--bigo-gold)]" />
        </div>
        <p className="font-serif text-lg text-foreground text-center">Gold members only</p>
        <p className="text-sm text-muted-foreground text-center max-w-xs">
          Upgrade to Gold to access this premium seating area.
        </p>
        <button
          type="button"
          onClick={onSelectGolden}
          className="px-6 py-2 rounded-xl bg-[var(--bigo-gold)] text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Learn more
        </button>
      </motion.div>
    </div>
  )
}
