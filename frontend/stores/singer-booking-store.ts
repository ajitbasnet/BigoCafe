import { create } from "zustand"

interface SingerBookingState {
  selectedSingerId: string | null
  selectedDate: string | null
  selectedTime: string | null
  setSinger: (id: string | null) => void
  setSlot: (date: string | null, time: string | null) => void
  confirm: () => void
  reset: () => void
}

const initial = {
  selectedSingerId: null,
  selectedDate: null,
  selectedTime: null,
}

export const useSingerBookingStore = create<SingerBookingState>((set) => ({
  ...initial,
  setSinger: (id) => set({ selectedSingerId: id }),
  setSlot: (date, time) => set({ selectedDate: date, selectedTime: time }),
  confirm: () => set(initial),
  reset: () => set(initial),
}))
