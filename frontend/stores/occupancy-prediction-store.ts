import { create } from "zustand"
import { getPredictionOutput } from "@/lib/occupancy-prediction"
import { tableOccupancyHistory, currentBookings } from "@/lib/occupancy-prediction/mock-data"
import type { PredictionOutput } from "@/lib/occupancy-prediction/types"

interface OccupancyPredictionState {
  predictions: PredictionOutput | null
  lastUpdated: number
  referenceTime: Date
  refreshPredictions: () => void
  setReferenceTime: (date: Date) => void
}

export const useOccupancyPredictionStore = create<OccupancyPredictionState>((set) => ({
  predictions: null,
  lastUpdated: 0,
  referenceTime: new Date(),

  refreshPredictions: () => {
    const referenceTime = useOccupancyPredictionStore.getState().referenceTime
    const predictions = getPredictionOutput({
      referenceTime,
      history: tableOccupancyHistory,
      currentBookings,
    })
    set({ predictions, lastUpdated: Date.now() })
  },

  setReferenceTime: (date: Date) => {
    set({ referenceTime: date })
    const predictions = getPredictionOutput({
      referenceTime: date,
      history: tableOccupancyHistory,
      currentBookings,
    })
    set({ predictions, lastUpdated: Date.now() })
  },
}))
