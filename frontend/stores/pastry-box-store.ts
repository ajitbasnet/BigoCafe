import { create } from "zustand"
import { pastryBoxSizes } from "@/lib/mock-data/pastry-flavors"
import type { PastryFlavor } from "@/lib/mock-data/pastry-flavors"
import { calculatePastryBoxPriceNPR } from "@/lib/pricing/calculator"

export type BoxSizeId = (typeof pastryBoxSizes)[number]["id"]

export interface PastrySelection {
  flavor: PastryFlavor
  slotIndex: number
}

interface PastryBoxStore {
  boxSizeId: BoxSizeId
  selections: PastrySelection[]
  setBoxSize: (sizeId: BoxSizeId) => void
  addPastry: (flavor: PastryFlavor) => void
  removePastry: (slotIndex: number) => void
  clearBox: () => void
  getCapacity: () => number
  getTotalPrice: () => number
  isFull: () => boolean
}

export const usePastryBoxStore = create<PastryBoxStore>((set, get) => ({
  boxSizeId: "6",
  selections: [],

  setBoxSize: (sizeId) => {
    const size = pastryBoxSizes.find((s) => s.id === sizeId)
    const capacity = size?.pieces ?? 3
    set((state) => ({
      boxSizeId: sizeId,
      selections: state.selections.slice(0, capacity),
    }))
  },

  addPastry: (flavor) => {
    const capacity = get().getCapacity()
    const { selections } = get()
    if (selections.length >= capacity) return

    const slotIndex = selections.length
    set((state) => ({
      selections: [...state.selections, { flavor, slotIndex }],
    }))
  },

  removePastry: (slotIndex) => {
    set((state) => {
      const newSelections = state.selections
        .filter((s) => s.slotIndex !== slotIndex)
        .map((s, i) => ({ ...s, slotIndex: i }))
      return { selections: newSelections }
    })
  },

  clearBox: () => set({ selections: [] }),

  getCapacity: () => {
    const size = pastryBoxSizes.find((s) => s.id === get().boxSizeId)
    return size?.pieces ?? 3
  },

  getTotalPrice: () => {
    const { selections, boxSizeId } = get()
    const premiumCount = selections.filter((s) => s.flavor.isPremium).length
    return calculatePastryBoxPriceNPR({
      boxSizeId,
      premiumCount,
      pieceCount: selections.length,
    })
  },

  isFull: () => get().selections.length >= get().getCapacity(),
}))
