"use client"

import { motion } from "framer-motion"
import { CustomizationBuilder } from "@/components/admin/customization-builder"

export default function AdminCustomizationPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-1"
      >
        <p className="text-primary uppercase tracking-[0.3em] text-sm">Customization</p>
        <h1 className="font-serif text-3xl text-foreground">Customization Builder</h1>
        <p className="text-muted-foreground">
          Define coffee and product options (milk, sugar, toppings, temperature) with extra price and default settings.
        </p>
      </motion.div>

      <CustomizationBuilder />
    </div>
  )
}
