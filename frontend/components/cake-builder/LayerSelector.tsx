"use client"

import { motion } from "framer-motion"
import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { extraLayerPrice } from "@/lib/mock-data/cake-options"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const MAX_LAYERS = 3

export function LayerSelector() {
  const extraLayerCount = useCakeBuilderStore((s) => s.extraLayerCount)
  const setExtraLayerCount = useCakeBuilderStore((s) => s.setExtraLayerCount)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Add extra layers for a taller cake. Each layer adds Rs {extraLayerPrice.toLocaleString()}.
      </p>
      <Card className="card-luxury max-w-sm">
        <CardContent className="pt-6 pb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">Extra layers</p>
              <p className="text-xs text-muted-foreground mt-1">
                Height preview: base + {extraLayerCount} layer{extraLayerCount !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setExtraLayerCount(Math.max(0, extraLayerCount - 1))}
                disabled={extraLayerCount === 0}
                aria-label="Remove layer"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-10 text-center font-mono font-medium">{extraLayerCount}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setExtraLayerCount(Math.min(MAX_LAYERS, extraLayerCount + 1))}
                disabled={extraLayerCount >= MAX_LAYERS}
                aria-label="Add layer"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {extraLayerCount > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-primary mt-3"
            >
              + Rs {(extraLayerCount * extraLayerPrice).toLocaleString()}
            </motion.p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
