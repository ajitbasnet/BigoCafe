import { create } from "zustand"
import type { SeasonalItem } from "@/lib/mock-data/seasonal-items"
import { seasonalItems as initialSeasonal } from "@/lib/mock-data/seasonal-items"

export interface SeasonalItemWithHighlight extends SeasonalItem {
  highlight: boolean
}

interface AdminSeasonalState {
  items: SeasonalItemWithHighlight[]
  setItems: (items: SeasonalItemWithHighlight[]) => void
  updateItem: (
    id: string,
    data: Partial<Pick<SeasonalItemWithHighlight, "startDate" | "endDate" | "highlight">>
  ) => void
  setHighlight: (id: string, highlight: boolean) => void
}

export const useAdminSeasonalStore = create<AdminSeasonalState>((set) => ({
  items: initialSeasonal.map((item) => ({ ...item, highlight: false })),

  setItems: (items) => set({ items }),

  updateItem: (id, data) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, ...data } : i)),
    })),

  setHighlight: (id, highlight) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, highlight } : i)),
    })),
}))
