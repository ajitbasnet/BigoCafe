/**
 * Mock admin orders when Supabase is not configured.
 */

export type OrderStatus = "Pending" | "Preparing" | "Ready" | "Completed"

export interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  customizations?: Record<string, string>
}

export interface PastryBoxDetail {
  size: number
  totalPrice: number
  selections?: { flavorName: string; slotIndex: number }[]
}

export interface AdminOrder {
  id: string
  userId: string
  items: OrderItem[]
  pastryBoxDetails?: PastryBoxDetail
  totalPrice: number
  status: OrderStatus
  created_at: string
  estimatedReadyTime?: string
  paymentStatus?: "pending" | "paid" | "refunded"
  customerNotes?: string
}

const now = new Date()
const in30 = new Date(now.getTime() + 30 * 60 * 1000)
const in45 = new Date(now.getTime() + 45 * 60 * 1000)

export const adminOrdersMock: AdminOrder[] = [
  {
    id: "ORD-ABC123",
    userId: "user-1",
    items: [
      { id: "1", name: "Cappuccino", quantity: 2, price: 280, customizations: { milk: "Oat", temperature: "Hot" } },
      { id: "2", name: "Himalayan Croissant", quantity: 1, price: 280 },
    ],
    totalPrice: 840,
    status: "Pending",
    created_at: new Date(now.getTime() - 10 * 60 * 1000).toISOString(),
    estimatedReadyTime: in30.toISOString(),
    paymentStatus: "paid",
    customerNotes: "Extra napkins please",
  },
  {
    id: "ORD-DEF456",
    userId: "user-2",
    items: [{ id: "1", name: "Americano", quantity: 1, price: 200 }],
    pastryBoxDetails: { size: 6, totalPrice: 650, selections: [] },
    totalPrice: 850,
    status: "Preparing",
    created_at: new Date(now.getTime() - 25 * 60 * 1000).toISOString(),
    estimatedReadyTime: in45.toISOString(),
    paymentStatus: "paid",
  },
  {
    id: "ORD-GHI789",
    userId: "user-3",
    items: [{ id: "1", name: "Latte", quantity: 1, price: 280 }],
    totalPrice: 280,
    status: "Ready",
    created_at: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
    paymentStatus: "paid",
  },
  {
    id: "ORD-JKL012",
    userId: "user-4",
    items: [
      { id: "1", name: "Chocolate Momo Cake", quantity: 1, price: 520 },
      { id: "2", name: "Himalayan Chai", quantity: 1, price: 180 },
    ],
    totalPrice: 700,
    status: "Completed",
    created_at: new Date(now.getTime() - 120 * 60 * 1000).toISOString(),
    paymentStatus: "paid",
  },
]
