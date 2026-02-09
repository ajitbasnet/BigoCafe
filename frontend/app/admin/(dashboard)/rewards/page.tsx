"use client"

import { motion } from "framer-motion"
import { RewardsConfig } from "@/components/admin/rewards-config"

export default function AdminRewardsPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-1"
      >
        <p className="text-primary uppercase tracking-[0.3em] text-sm">Rewards</p>
        <h1 className="font-serif text-3xl text-foreground">Rewards admin</h1>
        <p className="text-muted-foreground">
          Configure points per product, redemption rules, loyalty tiers, and seasonal bonuses.
        </p>
      </motion.div>

      <RewardsConfig />
    </div>
  )
}
