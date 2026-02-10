"use client"

import { motion } from "framer-motion"

export default function AdminCakePage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-1"
      >
        <p className="text-primary uppercase tracking-[0.3em] text-sm">Cake</p>
        <h1 className="font-serif text-3xl text-foreground">Cake</h1>
        <p className="text-muted-foreground">
          Manage cake menu and offerings.
        </p>
      </motion.div>
    </div>
  )
}
