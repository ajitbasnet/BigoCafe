"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useOccupancyPrediction } from "@/hooks/use-occupancy-prediction"
import {
  OccupancyPredictionChart,
  FloorHeatMap,
  PeakHourCard,
  VIPDemandWidget,
  ConferenceUsageWidget,
  SmartBookingSuggestionPanel,
} from "@/components/occupancy"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AdminOccupancyPage() {
  const { predictions, refreshPredictions, setReferenceTime, referenceTime } = useOccupancyPrediction({
    refreshIntervalMs: 5 * 60 * 1000,
  })
  const [datePreset, setDatePreset] = useState<"today" | "tomorrow">("today")

  const handleDateChange = (v: string) => {
    setDatePreset(v as "today" | "tomorrow")
    const d = new Date()
    if (v === "tomorrow") d.setDate(d.getDate() + 1)
    setReferenceTime(d)
  }

  const currentHour = referenceTime.getHours()

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-serif text-3xl text-foreground">AI Occupancy</h1>
          <p className="text-muted-foreground mt-1">Real-time table occupancy prediction</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={datePreset} onValueChange={handleDateChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={refreshPredictions} aria-label="Refresh">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>

      {predictions ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <OccupancyPredictionChart hourlyPrediction={predictions.hourlyPrediction} />
            </div>
            <div className="space-y-6">
              <FloorHeatMap floorDemand={predictions.floorDemand} />
              <PeakHourCard peakHours={predictions.peakHours} currentHour={currentHour} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <VIPDemandWidget vipDemandLevel={predictions.vipDemandLevel} />
            <ConferenceUsageWidget conferenceDemandLevel={predictions.conferenceDemandLevel} />
            <SmartBookingSuggestionPanel suggestions={predictions.bookingSuggestions} />
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl border border-border bg-card p-12 text-center"
        >
          <p className="text-muted-foreground">Loading predictions...</p>
          <Button className="mt-4" variant="outline" onClick={refreshPredictions}>
            Refresh
          </Button>
        </motion.div>
      )}
    </div>
  )
}
