"use client"

import { motion } from "framer-motion"
import { PastryBoxConfig } from "@/components/admin/pastry-box-config"

export default function AdminPastryBoxPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-1"
      >
        <p className="text-primary uppercase tracking-[0.3em] text-sm">Pastry Box</p>
        <h1 className="font-serif text-3xl text-foreground">Pastry Box Builder</h1>
        <p className="text-muted-foreground">
          Configure box sizes (3/6/9 pieces), allowed pastries, and pricing or discount rules.
        </p>
      </motion.div>

      <PastryBoxConfig />
    </div>
  )
}
