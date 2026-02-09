"use client"

import { useBookingStore } from "@/stores/booking-store"
import { getTablesByFloor } from "@/lib/mock-data/booking"
import type { FloorId } from "@/lib/cafe-layout/types"
import { FLOORS } from "@/lib/cafe-layout/constants"
import { cn } from "@/lib/utils"

const FLOOR_ORDER: FloorId[] = ["ground", "first", "second"]

export function FloorSelector() {
  const selectedFloorId = useBookingStore((s) => s.selectedFloorId)
  const selectedTableId = useBookingStore((s) => s.selectedTableId)
  const setSelectedFloor = useBookingStore((s) => s.setSelectedFloor)
  const setSelectedTable = useBookingStore((s) => s.setSelectedTable)

  const handleFloorChange = (floorId: FloorId) => {
    setSelectedFloor(floorId)
    const onFloor = getTablesByFloor(floorId).some((t) => t.id === selectedTableId)
    if (!onFloor) setSelectedTable(null)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {FLOOR_ORDER.map((floorId) => {
        const floor = FLOORS[floorId]
        if (!floor) return null
        return (
          <button
            key={floorId}
            type="button"
            onClick={() => handleFloorChange(floorId)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              selectedFloorId === floorId
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
          >
            {floor.label}
          </button>
        )
      })}
    </div>
  )
}
