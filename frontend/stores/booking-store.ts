import { create } from "zustand"
import type { FloorId } from "@/lib/cafe-layout/types"

interface BookingState {
  selectedTableId: string | null
  selectedFloorId: FloorId
  adults: number
  children: number
  bookingDate: string | null
  bookingTime: string | null
  setSelectedTable: (id: string | null) => void
  setSelectedFloor: (floorId: FloorId) => void
  setGuests: (adults: number, children: number) => void
  setBookingDateTime: (date: string | null, time: string | null) => void
  confirmBooking: () => void
  reset: () => void
}

const initialState = {
  selectedTableId: null,
  selectedFloorId: "ground" as FloorId,
  adults: 1,
  children: 0,
  bookingDate: null,
  bookingTime: null,
}

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,

  setSelectedTable: (id) => set({ selectedTableId: id }),

  setSelectedFloor: (floorId) => set({ selectedFloorId: floorId }),

  setGuests: (adults, children) => set({ adults, children }),

  setBookingDateTime: (date, time) => set({ bookingDate: date, bookingTime: time }),

  confirmBooking: () => set(initialState),

  reset: () => set(initialState),
}))
