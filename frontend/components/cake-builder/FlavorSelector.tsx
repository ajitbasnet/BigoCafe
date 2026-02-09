"use client"

import { motion } from "framer-motion"
import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { cakeFlavors } from "@/lib/mock-data/cake-options"
import { useAllergyStore } from "@/stores/allergy-store"
import { allergyTypes } from "@/lib/mock-data/allergy-types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function FlavorSelector() {
  const flavorId = useCakeBuilderStore((s) => s.flavorId)
  const setFlavor = useCakeBuilderStore((s) => s.setFlavor)
  const hasAllergen = useAllergyStore((s) => s.hasAllergen)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Select a flavor. We&apos;ll check it against your allergy profile.</p>
      <TooltipProvider>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {cakeFlavors.map((f) => {
            const selected = flavorId === f.id
            const allergenLabels = (f.allergenIds ?? [])
              .map((id) => allergyTypes.find((a) => a.id === id)?.name)
              .filter(Boolean) as string[]
            const hasConflict = (f.allergenIds ?? []).some((id) => hasAllergen(id))

            return (
              <Tooltip key={f.id}>
                <TooltipTrigger asChild>
                  <motion.button
                    type="button"
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFlavor(f.id)}
                    className="text-left w-full"
                    aria-pressed={selected}
                    aria-label={`Select ${f.name} flavor`}
                  >
                    <Card
                      className={cn(
                        "card-luxury transition-all duration-200 overflow-hidden h-full",
                        selected && "ring-2 ring-primary shadow-lg shadow-primary/20",
                        hasConflict && "border-destructive/50"
                      )}
                    >
                      {f.imageUrl ? (
                        <div className="aspect-[4/3] relative bg-muted">
                          <Image
                            src={f.imageUrl}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, 25vw"
                          />
                        </div>
                      ) : (
                        <div
                          className="aspect-[4/3] w-full rounded-t-lg border-b border-border"
                          style={{ backgroundColor: f.swatchColor }}
                        />
                      )}
                      <CardContent className="p-3">
                        <p className="font-medium text-foreground truncate">{f.name}</p>
                        {hasConflict && (
                          <Badge variant="destructive" className="mt-1 text-xs">
                            Allergy
                          </Badge>
                        )}
                        {f.description && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{f.description}</p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  {f.description && <p>{f.description}</p>}
                  {allergenLabels.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">May contain: {allergenLabels.join(", ")}</p>
                  )}
                  <p className="text-xs text-primary mt-1">Price shown in summary</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </div>
  )
}
