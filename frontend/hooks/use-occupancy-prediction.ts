"use client"

import { useEffect } from "react"
import { useOccupancyPredictionStore } from "@/stores/occupancy-prediction-store"

/**
 * Real-time occupancy prediction. Refreshes on mount and when reference time changes.
 * Optionally refresh on an interval (e.g. every 5 min) when dashboard is visible.
 */
export function useOccupancyPrediction(options?: { refreshIntervalMs?: number }) {
  const predictions = useOccupancyPredictionStore((s) => s.predictions)
  const refreshPredictions = useOccupancyPredictionStore((s) => s.refreshPredictions)
  const setReferenceTime = useOccupancyPredictionStore((s) => s.setReferenceTime)
  const referenceTime = useOccupancyPredictionStore((s) => s.referenceTime)

  useEffect(() => {
    refreshPredictions()
  }, [refreshPredictions, referenceTime.getTime()])

  useEffect(() => {
    const intervalMs = options?.refreshIntervalMs ?? 0
    if (intervalMs <= 0) return
    const id = setInterval(refreshPredictions, intervalMs)
    return () => clearInterval(id)
  }, [options?.refreshIntervalMs, refreshPredictions])

  return { predictions, refreshPredictions, setReferenceTime, referenceTime }
}
