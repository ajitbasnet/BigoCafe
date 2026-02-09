"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DEMAND_MEDIUM_MAX } from "@/lib/occupancy-prediction/constants"
import { Building2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ConferenceUsageWidgetProps {
  conferenceDemandLevel: number
  className?: string
}

export function ConferenceUsageWidget({ conferenceDemandLevel, className }: ConferenceUsageWidgetProps) {
  const isHigh = conferenceDemandLevel >= DEMAND_MEDIUM_MAX

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={className}
    >
      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Building2 className="w-5 h-5 text-primary" />
            Conference usage
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {isHigh ? "Book in advance" : "Business hours demand"}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Utilization</span>
              <span className={cn(
                "font-semibold",
                isHigh && "text-amber-600 dark:text-amber-400"
              )}>
                {Math.round(conferenceDemandLevel)}%
              </span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <motion.div
                className={cn(
                  "h-full rounded-full",
                  isHigh ? "bg-amber-500" : "bg-primary"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, conferenceDemandLevel)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
