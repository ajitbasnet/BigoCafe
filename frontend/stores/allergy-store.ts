import { create } from "zustand"
import { persist } from "zustand/middleware"

const ALLERGY_STORAGE = "bigo-allergy-preferences"

interface AllergyState {
  selectedIds: string[]
  setAllergens: (ids: string[]) => void
  toggleAllergen: (id: string) => void
  hasAllergen: (id: string) => boolean
  getAllergens: () => string[]
}

export const useAllergyStore = create<AllergyState>()(
  persist(
    (set, get) => ({
      selectedIds: [],

      setAllergens: (ids) => set({ selectedIds: ids }),

      toggleAllergen: (id) =>
        set((state) => ({
          selectedIds: state.selectedIds.includes(id)
            ? state.selectedIds.filter((x) => x !== id)
            : [...state.selectedIds, id],
        })),

      hasAllergen: (id) => get().selectedIds.includes(id),

      getAllergens: () => get().selectedIds,
    }),
    { name: ALLERGY_STORAGE }
  )
)
