import { create } from "zustand"
import { pastryFlavors, pastryBoxSizes } from "@/lib/mock-data/pastry-flavors"

export interface BoxSizeConfig {
  id: string
  pieces: number
  label: string
  baseMultiplier: number // e.g. 0.95 = 5% discount
}

const defaultSizes: BoxSizeConfig[] = pastryBoxSizes.map((s) => ({
  id: s.id,
  pieces: s.pieces,
  label: s.label,
  baseMultiplier: s.baseMultiplier,
}))

const defaultAllowedIds = pastryFlavors.map((f) => f.id)

interface AdminPastryBoxState {
  boxSizes: BoxSizeConfig[]
  allowedPastryIds: string[]
  updateBoxSize: (id: string, data: Partial<Omit<BoxSizeConfig, "id">>) => void
  setAllowedPastries: (ids: string[]) => void
  toggleAllowedPastry: (id: string) => void
  getBoxSizes: () => BoxSizeConfig[]
  getAllowedPastryIds: () => string[]
}

export const useAdminPastryBoxStore = create<AdminPastryBoxState>((set, get) => ({
  boxSizes: defaultSizes,
  allowedPastryIds: defaultAllowedIds,

  updateBoxSize: (id, data) => {
    set((s) => ({
      boxSizes: s.boxSizes.map((b) =>
        b.id === id ? { ...b, ...data } : b
      ),
    }))
  },

  setAllowedPastries: (ids) => set({ allowedPastryIds: ids }),

  toggleAllowedPastry: (id) => {
    set((s) => {
      const has = s.allowedPastryIds.includes(id)
      return {
        allowedPastryIds: has
          ? s.allowedPastryIds.filter((x) => x !== id)
          : [...s.allowedPastryIds, id],
      }
    })
  },

  getBoxSizes: () => get().boxSizes,
  getAllowedPastryIds: () => get().allowedPastryIds,
}))
