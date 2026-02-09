import { create } from "zustand"
import type { CartItem } from "./cart-store"
import type { PastrySelection } from "./pastry-box-store"

export type OrderStatus = "received" | "preparing" | "baking" | "ready"

export interface Order {
  id: string
  orderedItems: CartItem[]
  pastryBox?: {
    size: number
    selections: PastrySelection[]
    totalPrice: number
  }
  totalPrice: number
  estimatedReadyTime: Date
  orderStatus: OrderStatus
  createdAt: Date
  rewardPointsEarned: number
}

interface OrderStore {
  activeOrder: Order | null
  orderHistory: Order[]
  placeOrder: (
    cartItems: CartItem[],
    pastryBox: { size: number; selections: PastrySelection[]; totalPrice: number } | null,
    totalPrice: number,
    totalPreparationMinutes: number,
    rewardPoints: number
  ) => string
  simulateNextStatus: () => void
  completeOrder: (orderId: string) => void
  getOrderById: (id: string) => Order | undefined
}

function generateOrderId() {
  return `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

const QUEUE_BUFFER_MINUTES = 5

export const useOrderStore = create<OrderStore>((set, get) => ({
  activeOrder: null,
  orderHistory: [],

  placeOrder: (cartItems, pastryBox, totalPrice, totalPreparationMinutes, rewardPoints) => {
    const orderId = generateOrderId()
    const now = new Date()
    const estimatedReady = new Date(
      now.getTime() + (totalPreparationMinutes + QUEUE_BUFFER_MINUTES) * 60 * 1000
    )

    const order: Order = {
      id: orderId,
      orderedItems: cartItems,
      pastryBox: pastryBox ?? undefined,
      totalPrice,
      estimatedReadyTime: estimatedReady,
      orderStatus: "received",
      createdAt: now,
      rewardPointsEarned: rewardPoints,
    }

    set((state) => ({
      activeOrder: order,
      orderHistory: [order, ...state.orderHistory],
    }))

    return orderId
  },

  simulateNextStatus: () => {
    const { activeOrder } = get()
    if (!activeOrder) return

    const statusOrder: OrderStatus[] = ["received", "preparing", "baking", "ready"]
    const currentIndex = statusOrder.indexOf(activeOrder.orderStatus)
    if (currentIndex >= statusOrder.length - 1) return

    set({
      activeOrder: {
        ...activeOrder,
        orderStatus: statusOrder[currentIndex + 1],
      },
    })
  },

  completeOrder: (orderId) => {
    set((state) => {
      if (state.activeOrder?.id === orderId) {
        return { activeOrder: null }
      }
      return {}
    })
  },

  getOrderById: (id) => {
    const { activeOrder, orderHistory } = get()
    if (activeOrder?.id === id) return activeOrder
    return orderHistory.find((o) => o.id === id)
  },
}))
