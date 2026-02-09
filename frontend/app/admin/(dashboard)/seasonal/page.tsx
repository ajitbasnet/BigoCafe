"use client"

import { motion } from "framer-motion"
import { SeasonalManager } from "@/components/admin/seasonal-manager"

export default function AdminSeasonalPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-1"
      >
        <p className="text-primary uppercase tracking-[0.3em] text-sm">Seasonal</p>
        <h1 className="font-serif text-3xl text-foreground">Seasonal menu manager</h1>
        <p className="text-muted-foreground">
          Activate seasonal products, set date ranges, and highlight featured items.
        </p>
      </motion.div>

      <SeasonalManager />
    </div>
  )
}
