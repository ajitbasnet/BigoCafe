"use client"

import { motion } from "framer-motion"
import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { cakeCeremonyTypes } from "@/lib/mock-data/cake-options"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Cake, Gift, Heart, Sparkles, User, GraduationCap } from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Cake,
  Gift,
  Sparkles,
  User,
  GraduationCap,
}

export function CeremonySelector() {
  const ceremonyId = useCakeBuilderStore((s) => s.ceremonyId)
  const ceremonyOther = useCakeBuilderStore((s) => s.ceremonyOther)
  const setCeremony = useCakeBuilderStore((s) => s.setCeremony)
  const setCeremonyOther = useCakeBuilderStore((s) => s.setCeremonyOther)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Select the occasion. We&apos;ll suggest designs and themes that match.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {cakeCeremonyTypes.map((c) => {
          const Icon = iconMap[c.icon] ?? Gift
          const selected = ceremonyId === c.id
          return (
            <motion.button
              key={c.id}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCeremony(c.id)}
              aria-pressed={selected}
              aria-label={`Select ${c.label}`}
            >
              <Card className={cn("card-luxury transition-all h-full", selected && "ring-2 ring-primary")}>
                <CardContent className="pt-6 pb-6 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-sm text-center">{c.label}</span>
                </CardContent>
              </Card>
            </motion.button>
          )
        })}
      </div>
      {ceremonyId === "other" && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <Label htmlFor="ceremony-other">Other occasion (please specify)</Label>
          <Input
            id="ceremony-other"
            value={ceremonyOther}
            onChange={(e) => setCeremonyOther(e.target.value)}
            placeholder="e.g. Housewarming"
            className="max-w-sm"
          />
        </motion.div>
      )}
    </div>
  )
}
