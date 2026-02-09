"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DEMAND_MEDIUM_MAX } from "@/lib/occupancy-prediction/constants"
import { Crown } from "lucide-react"
import { cn } from "@/lib/utils"

interface VIPDemandWidgetProps {
  vipDemandLevel: number
  className?: string
}

export function VIPDemandWidget({ vipDemandLevel, className }: VIPDemandWidgetProps) {
  const isHigh = vipDemandLevel >= DEMAND_MEDIUM_MAX
  const isLimited = vipDemandLevel >= 70

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className={className}
    >
      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden border-[#C89B3C]/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Crown className="w-5 h-5 text-[#C89B3C]" />
            Gold lounge demand
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {isLimited
              ? "VIP lounge limited availability"
              : isHigh
                ? "Gold Member Peak Time"
                : "Normal demand"}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Demand level</span>
              <span className={cn(
                "font-semibold",
                isHigh && "text-amber-600 dark:text-amber-400"
              )}>
                {Math.round(vipDemandLevel)}%
              </span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  isHigh ? "bg-amber-500" : "bg-primary"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, vipDemandLevel)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
