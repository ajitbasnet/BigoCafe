"use client"

import { motion } from "framer-motion"
import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { cakeSizes } from "@/lib/mock-data/cake-options"
import { CAKE_SIZE_BASE_NPR, CAKE_CUSTOM_PRICE_PER_POUND_NPR } from "@/lib/pricing/npr-config"
import { formatNPR } from "@/lib/pricing/format"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"

const CUSTOM_ID = "custom"

export function SizeSelector() {
  const sizeId = useCakeBuilderStore((s) => s.sizeId)
  const customPounds = useCakeBuilderStore((s) => s.customPounds)
  const setSize = useCakeBuilderStore((s) => s.setSize)
  const setCustomPounds = useCakeBuilderStore((s) => s.setCustomPounds)

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Choose size. Serves and price update in real time.</p>
      <RadioGroup
        value={sizeId ?? ""}
        onValueChange={(v) => setSize(v)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        aria-label="Cake size"
      >
        {cakeSizes.map((s) => {
          const selected = sizeId === s.id
          return (
            <label key={s.id} htmlFor={`size-${s.id}`} className="cursor-pointer">
              <RadioGroupItem value={s.id} id={`size-${s.id}`} className="sr-only" />
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="h-full"
              >
                <Card className={cn("card-luxury transition-all h-full", selected && "ring-2 ring-primary")}>
                  <CardContent className="pt-6 pb-6">
                    <p className="font-medium text-foreground">{s.label}</p>
                    {s.servings != null && (
                      <p className="text-xs text-muted-foreground mt-1">Serves ~{s.servings} people</p>
                    )}
                    <p className="text-primary font-serif mt-2">{formatNPR(CAKE_SIZE_BASE_NPR[s.id] ?? 0)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </label>
          )
        })}
        <label htmlFor="size-custom" className="cursor-pointer">
          <RadioGroupItem value={CUSTOM_ID} id="size-custom" className="sr-only" />
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="h-full">
            <Card className={cn("card-luxury transition-all h-full", sizeId === CUSTOM_ID && "ring-2 ring-primary")}>
              <CardContent className="pt-6 pb-6">
                <p className="font-medium text-foreground">Custom weight</p>
                <p className="text-xs text-muted-foreground mt-1">Use slider below</p>
                <p className="text-primary font-serif mt-2">
                  {formatNPR(customPounds * CAKE_CUSTOM_PRICE_PER_POUND_NPR)}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </label>
      </RadioGroup>

      {sizeId === CUSTOM_ID && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <Label>Custom size: {customPounds} lb</Label>
          <Slider
            value={[customPounds]}
            onValueChange={([v]) => setCustomPounds(v)}
            min={1}
            max={5}
            step={0.5}
            className="w-full"
            aria-label="Custom cake weight in pounds"
          />
        </motion.div>
      )}
    </div>
  )
}
