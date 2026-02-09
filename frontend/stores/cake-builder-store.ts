import { create } from "zustand"
import { calculateCakePriceNPR, estimatePreparationTimeNPR } from "@/lib/pricing/calculator"

const DRAFT_KEY = "bigo-cake-builder-draft"

export interface CakeBuilderState {
  flavorId: string | null
  designId: string | null
  customDesignUrl: string | null
  sizeId: string | null
  ceremonyId: string | null
  ceremonyOther: string
  baseLayers: "1" | "2" | "3"
  extraLayerCount: number
  creamIds: string[]
  cakeMessage: string
  postcardMessage: string
  postcardEnabled: boolean
  customPounds: number
  pickupDate: string | null
  pickupTime: string | null
  allergyIds: string[]
  allergyOther: string
  setFlavor: (id: string | null) => void
  setDesign: (id: string | null) => void
  setCustomDesignUrl: (url: string | null) => void
  setSize: (id: string | null) => void
  setCeremony: (id: string | null) => void
  setCeremonyOther: (s: string) => void
  setBaseLayers: (v: "1" | "2" | "3") => void
  setExtraLayerCount: (n: number) => void
  setCreamIds: (ids: string[]) => void
  toggleCream: (id: string) => void
  setCakeMessage: (s: string) => void
  setPostcardMessage: (s: string) => void
  setPostcardEnabled: (v: boolean) => void
  setCustomPounds: (n: number) => void
  setPickup: (date: string | null, time: string | null) => void
  setAllergyIds: (ids: string[]) => void
  toggleAllergy: (id: string) => void
  setAllergyOther: (s: string) => void
  getTotalPrice: () => number
  getPreparationTime: () => string
  reset: () => void
  saveDraft: () => void
  loadDraft: () => boolean
}

const defaultState = {
  flavorId: null,
  designId: null,
  customDesignUrl: null,
  sizeId: "1lb",
  ceremonyId: null,
  ceremonyOther: "",
  baseLayers: "1" as const,
  extraLayerCount: 0,
  creamIds: ["buttercream"] as string[],
  cakeMessage: "",
  postcardMessage: "",
  postcardEnabled: false,
  customPounds: 1,
  pickupDate: null,
  pickupTime: null,
  allergyIds: [] as string[],
  allergyOther: "",
}

export const useCakeBuilderStore = create<CakeBuilderState>((set, get) => ({
  ...defaultState,

  setFlavor: (id) => set({ flavorId: id }),
  setDesign: (id) => set({ designId: id }),
  setCustomDesignUrl: (url) => set({ customDesignUrl: url }),
  setSize: (id) => set({ sizeId: id }),
  setCeremony: (id) => set({ ceremonyId: id }),
  setCeremonyOther: (s) => set({ ceremonyOther: s }),
  setBaseLayers: (v) => set({ baseLayers: v }),
  setExtraLayerCount: (n) => set({ extraLayerCount: Math.max(0, Math.min(3, n)) }),
  setCreamIds: (ids) => set({ creamIds: ids.length > 0 ? ids : ["buttercream"] }),
  toggleCream: (id) =>
    set((state) => {
      const next = state.creamIds.includes(id)
        ? state.creamIds.filter((x) => x !== id)
        : [...state.creamIds, id]
      return { creamIds: next.length > 0 ? next : ["buttercream"] }
    }),
  setCakeMessage: (s) => set({ cakeMessage: s }),
  setPostcardMessage: (s) => set({ postcardMessage: s }),
  setPostcardEnabled: (v) => set({ postcardEnabled: v }),
  setCustomPounds: (n) => set({ customPounds: Math.max(1, Math.min(5, n)) }),
  setPickup: (date, time) => set({ pickupDate: date, pickupTime: time }),
  setAllergyIds: (ids) => set({ allergyIds: ids }),
  toggleAllergy: (id) =>
    set((state) => ({
      allergyIds: state.allergyIds.includes(id)
        ? state.allergyIds.filter((x) => x !== id)
        : [...state.allergyIds, id],
    })),
  setAllergyOther: (s) => set({ allergyOther: s }),

  getTotalPrice: () => {
    const state = get()
    return calculateCakePriceNPR({
      sizeId: state.sizeId,
      customPounds: state.customPounds,
      flavorId: state.flavorId,
      creamIds: state.creamIds,
      baseLayers: state.baseLayers,
      extraLayerCount: state.extraLayerCount,
      designId: state.designId,
    })
  },

  getPreparationTime: () => {
    const state = get()
    return estimatePreparationTimeNPR("cake", {
      baseLayers: state.baseLayers,
      extraLayerCount: state.extraLayerCount,
      designId: state.designId,
    })
  },

  reset: () => set(defaultState),

  saveDraft: () => {
    const state = get()
    const draft = {
      flavorId: state.flavorId,
      designId: state.designId,
      customDesignUrl: state.customDesignUrl,
      sizeId: state.sizeId,
      ceremonyId: state.ceremonyId,
      ceremonyOther: state.ceremonyOther,
      baseLayers: state.baseLayers,
      extraLayerCount: state.extraLayerCount,
      creamIds: state.creamIds,
      cakeMessage: state.cakeMessage,
      postcardMessage: state.postcardMessage,
      postcardEnabled: state.postcardEnabled,
      customPounds: state.customPounds,
      pickupDate: state.pickupDate,
      pickupTime: state.pickupTime,
      allergyIds: state.allergyIds,
      allergyOther: state.allergyOther,
    }
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    } catch {
      // ignore
    }
  },

  loadDraft: () => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      if (!raw) return false
      const draft = JSON.parse(raw) as Partial<typeof defaultState>
      set((state) => ({ ...state, ...draft }))
      return true
    } catch {
      return false
    }
  },
}))
