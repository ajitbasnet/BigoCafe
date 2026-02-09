"use client"

import { FLOORS, ZONES } from "@/lib/cafe-layout/constants"
import type { FloorId } from "@/lib/cafe-layout/types"
import { cn } from "@/lib/utils"

interface ZoneLegendProps {
  floorId: FloorId
  className?: string
}

export function ZoneLegend({ floorId, className }: ZoneLegendProps) {
  const floor = FLOORS[floorId]
  if (!floor) return null

  const zoneSpecs = floor.zones
    .map((zid) => ZONES[zid])
    .filter(Boolean)

  if (zoneSpecs.length === 0) return null

  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
        Zones on this floor
      </p>
      <ul className="flex flex-wrap gap-2">
        {zoneSpecs.map((z) => (
          <li
            key={z.id}
            className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded"
            title={z.description}
          >
            {z.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
