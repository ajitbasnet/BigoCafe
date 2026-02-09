"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PeakHourResult } from "@/lib/occupancy-prediction/types"
import { Clock, Users } from "lucide-react"
import { cn } from "@/lib/utils"

interface PeakHourCardProps {
  peakHours: PeakHourResult
  currentHour?: number
  className?: string
}

export function PeakHourCard({ peakHours, currentHour, className }: PeakHourCardProps) {
  const isPeakNow = currentHour != null && peakHours.peakHours.includes(currentHour)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={className}
    >
      <Card className={cn(
        "rounded-2xl border-border shadow-dashboard overflow-hidden",
        isPeakNow && "ring-2 ring-amber-400/50"
      )}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Peak hours
            {peakHours.isWeekend && (
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                Weekend
              </span>
            )}
            {isPeakNow && (
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 animate-pulse">
                Peak now
              </span>
            )}
          </CardTitle>
          <p className="text-sm text-muted-foreground">Busiest predicted hours</p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {peakHours.peakHours.map((h) => (
              <span
                key={h}
                className={cn(
                  "inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium",
                  currentHour === h
                    ? "bg-amber-500/20 text-amber-700 dark:text-amber-400"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {h}:00
              </span>
            ))}
          </div>
          {peakHours.membershipHeavyHours != null && peakHours.membershipHeavyHours.length > 0 && (
            <div className="pt-2 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1.5">
                <Users className="w-3.5 h-3.5" />
                Gold Member Peak Time
              </p>
              <div className="flex flex-wrap gap-1.5">
                {peakHours.membershipHeavyHours.map((h) => (
                  <span key={h} className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                    {h}:00
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
