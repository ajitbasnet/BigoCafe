"use client"

import { motion } from "framer-motion"
import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { creamTypes } from "@/lib/mock-data/cake-options"
import { CAKE_CREAM_NPR } from "@/lib/pricing/npr-config"
import { formatNPR } from "@/lib/pricing/format"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export function CreamSelector() {
  const creamIds = useCakeBuilderStore((s) => s.creamIds)
  const toggleCream = useCakeBuilderStore((s) => s.toggleCream)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Select one or more cream types. Price updates in the summary.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {creamTypes.map((c) => {
          const checked = creamIds.includes(c.id)
          return (
            <motion.label
              key={c.id}
              whileHover={{ y: -2 }}
              className="cursor-pointer block"
            >
              <Card className={cn("card-luxury transition-all", checked && "ring-2 ring-primary")}>
                <CardContent className="pt-4 pb-4 flex items-start gap-3">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggleCream(c.id)}
                    aria-label={`Select ${c.name}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{c.name}</p>
                    {c.description && (
                      <p className="text-xs text-muted-foreground mt-1">{c.description}</p>
                    )}
                    {c.texture && (
                      <p className="text-xs text-muted-foreground">Texture: {c.texture}</p>
                    )}
                    <p className="text-primary text-sm font-serif mt-1">
                      {(CAKE_CREAM_NPR[c.id] ?? 0) === 0 ? "Included" : `+ ${formatNPR(CAKE_CREAM_NPR[c.id] ?? 0)}`}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.label>
          )
        })}
      </div>
    </div>
  )
}
