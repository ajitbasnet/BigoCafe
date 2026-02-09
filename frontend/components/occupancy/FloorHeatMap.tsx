"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DEMAND_LOW_MAX, DEMAND_MEDIUM_MAX } from "@/lib/occupancy-prediction/constants"
import type { FloorDemand } from "@/lib/occupancy-prediction/types"
import { cn } from "@/lib/utils"

const FLOORS: { id: keyof FloorDemand; label: string }[] = [
  { id: "groundFloorDemand", label: "Ground" },
  { id: "firstFloorDemand", label: "First" },
  { id: "secondFloorDemand", label: "Second" },
]

function demandLevel(demand: number): "low" | "medium" | "high" {
  if (demand < DEMAND_LOW_MAX) return "low"
  if (demand < DEMAND_MEDIUM_MAX) return "medium"
  return "high"
}

interface FloorHeatMapProps {
  floorDemand: FloorDemand
  className?: string
}

export function FloorHeatMap({ floorDemand, className }: FloorHeatMapProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.05 }}
      className={className}
    >
      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden">
        <CardHeader>
          <CardTitle>Floor demand</CardTitle>
          <p className="text-sm text-muted-foreground">Color-coded occupancy</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {FLOORS.map(({ id, label }) => {
            const value = floorDemand[id]
            const level = demandLevel(value)
            return (
              <div key={id} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-foreground">{label}</span>
                  <span className="text-muted-foreground">{Math.round(value)}%</span>
                </div>
                <div className="h-8 rounded-lg overflow-hidden bg-muted flex">
                  <motion.div
                    className={cn(
                      "h-full rounded-lg",
                      level === "low" && "bg-green-500",
                      level === "medium" && "bg-yellow-500",
                      level === "high" && "bg-red-500"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, value)}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            )
          })}
          <div className="flex gap-4 pt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Low</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Medium</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> High</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
