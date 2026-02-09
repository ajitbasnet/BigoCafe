"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useBookingStore } from "@/stores/booking-store"
import { getTablesByFloor } from "@/lib/mock-data/booking"
import { ZONES } from "@/lib/cafe-layout/constants"
import { Lock } from "lucide-react"
import { cn } from "@/lib/utils"

export function TableLayoutMap() {
  const selectedTableId = useBookingStore((s) => s.selectedTableId)
  const selectedFloorId = useBookingStore((s) => s.selectedFloorId)
  const setSelectedTable = useBookingStore((s) => s.setSelectedTable)

  const tables = getTablesByFloor(selectedFloorId)

  const byZone = tables.reduce<Record<string, typeof tables>>((acc, t) => {
    const z = t.zoneId ?? "main_seating"
    if (!acc[z]) acc[z] = []
    acc[z].push(t)
    return acc
  }, {})

  const zoneOrder = ["main_seating", "window", "vip", "lounge", "entrance", "waiting", "ordering", "piano_stage", "staff_kitchen"]
  const orderedZones = zoneOrder.filter((z) => byZone[z]?.length).concat(Object.keys(byZone).filter((z) => !zoneOrder.includes(z)))

  if (tables.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm space-y-2">
        {selectedFloorId === "second" ? (
          <>
            <p>No tables on this floor.</p>
            <Link
              href="/dashboard/meeting-rooms"
              className="inline-block text-primary hover:underline font-medium"
            >
              Book a meeting room →
            </Link>
          </>
        ) : (
          <p>No tables on this floor.</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {orderedZones.map((zoneId) => {
        const zoneTables = byZone[zoneId] ?? []
        const zone = ZONES[zoneId]
        const zoneLabel = zone?.label ?? zoneId
        return (
          <div key={zoneId} className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{zoneLabel}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {zoneTables.map((table) => (
                <motion.button
                  key={table.id}
                  type="button"
                  onClick={() => setSelectedTable(table.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300",
                    selectedTableId === table.id
                      ? "border-primary bg-primary/10 shadow-dashboard"
                      : "border-border bg-card hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  {table.isGolden && (
                    <span className="absolute top-2 right-2" title="Gold members only">
                      <Lock className="w-4 h-4 text-[var(--bigo-gold)]" />
                    </span>
                  )}
                  <span className="font-medium text-foreground">{table.name}</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {table.occupied}/{table.capacity} seats
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
