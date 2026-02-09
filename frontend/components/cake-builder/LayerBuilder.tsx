"use client"

import { motion } from "framer-motion"
import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { baseLayerOptions } from "@/lib/mock-data/cake-options"
import { CAKE_EXTRA_LAYER_NPR } from "@/lib/pricing/npr-config"
import { formatNPR } from "@/lib/pricing/format"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function LayerBuilder() {
  const baseLayers = useCakeBuilderStore((s) => s.baseLayers)
  const extraLayerCount = useCakeBuilderStore((s) => s.extraLayerCount)
  const setBaseLayers = useCakeBuilderStore((s) => s.setBaseLayers)
  const setExtraLayerCount = useCakeBuilderStore((s) => s.setExtraLayerCount)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Choose base tiers, then add extra layers if you like.</p>
      <div className="flex flex-wrap gap-3">
        {baseLayerOptions.map((opt) => {
          const selected = baseLayers === opt.id
          return (
            <motion.button
              key={opt.id}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setBaseLayers(opt.id as "1" | "2" | "3")}
              aria-pressed={selected}
              aria-label={`${opt.label} base`}
            >
              <Card className={cn("card-luxury transition-all", selected && "ring-2 ring-primary")}>
                <CardContent className="pt-6 pb-6">
                  <p className="font-medium text-foreground">{opt.label}</p>
                </CardContent>
              </Card>
            </motion.button>
          )
        })}
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <Button
          type="button"
          variant="outline"
          onClick={() => setExtraLayerCount(Math.min(3, extraLayerCount + 1))}
          disabled={extraLayerCount >= 3}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Add extra layer
        </Button>
        {extraLayerCount > 0 && (
          <span className="text-sm text-muted-foreground">
            +{extraLayerCount} layer{extraLayerCount !== 1 ? "s" : ""} — {formatNPR(extraLayerCount * CAKE_EXTRA_LAYER_NPR)}
          </span>
        )}
      </div>
    </div>
  )
}
