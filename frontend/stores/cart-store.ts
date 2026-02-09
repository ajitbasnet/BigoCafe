import { create } from "zustand"
import { getCartPricing } from "@/lib/pricing/cart-pricing"
import type { PriceBreakdown, SeasonalTag } from "@/lib/pricing/types"

export interface DrinkCustomization {
  milkType: string
  sweetness: string
  addOns: string[]
  temperature: "hot" | "iced"
  addOnsPrice: number
}

export interface CartItem {
  id: string
  menuItemId: string
  name: string
  price: number
  quantity: number
  image: string
  preparationTime: number
  rewardPointsEarned: number
  customization?: DrinkCustomization
  notes?: string
}

interface CartStore {
  items: CartItem[]
  seasonalTag: SeasonalTag
  rewardPointsToUse: number
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateCustomization: (id: string, customization: DrinkCustomization) => void
  setSeasonalTag: (tag: SeasonalTag) => void
  setRewardPointsToUse: (points: number) => void
  clearCart: () => void
  getTotal: () => number
  getCartBreakdown: () => PriceBreakdown
  getTotalPreparationTime: () => number
  getTotalRewardPoints: () => number
}

function generateCartItemId() {
  return `cart-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  seasonalTag: "regular",
  rewardPointsToUse: 0,

  addItem: (item) => {
    const newItem: CartItem = {
      ...item,
      id: generateCartItemId(),
    }
    set((state) => ({
      items: [...state.items, newItem],
    }))
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }))
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }))
  },

  updateCustomization: (id, customization) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, customization } : item
      ),
    }))
  },

  setSeasonalTag: (tag) => set({ seasonalTag: tag }),
  setRewardPointsToUse: (points) => set({ rewardPointsToUse: Math.max(0, points) }),

  clearCart: () => set({ items: [], rewardPointsToUse: 0 }),

  getTotal: () => {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  },

  getCartBreakdown: () => {
    const { getTotal, seasonalTag, rewardPointsToUse } = get()
    return getCartPricing({
      subtotalNPR: getTotal(),
      seasonalTag,
      rewardPointsUsed: rewardPointsToUse,
    })
  },

  getTotalPreparationTime: () => {
    const items = get().items
    if (items.length === 0) return 0
    const maxTime = Math.max(...items.map((i) => i.preparationTime))
    const totalQty = items.reduce((s, i) => s + i.quantity, 0)
    return maxTime + (totalQty - 1) * 2
  },

  getTotalRewardPoints: () => {
    return get().items.reduce(
      (sum, item) => sum + item.rewardPointsEarned * item.quantity,
      0
    )
  },
}))
