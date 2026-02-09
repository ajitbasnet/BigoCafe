import { create } from "zustand"
import type { AdminOrder } from "@/lib/mock-data/admin-orders"

export type OrderStatus = AdminOrder["status"]

interface AdminOrdersState {
  orders: AdminOrder[]
  setOrders: (orders: AdminOrder[]) => void
  updateOrder: (orderId: string, data: Partial<Omit<AdminOrder, "id">>) => void
  getOrderById: (orderId: string) => AdminOrder | undefined
}

export const useAdminOrdersStore = create<AdminOrdersState>((set, get) => ({
  orders: [],

  setOrders: (orders) => set({ orders }),

  updateOrder: (orderId, data) => {
    set((s) => ({
      orders: s.orders.map((o) =>
        o.id === orderId ? { ...o, ...data } : o
      ),
    }))
  },

  getOrderById: (orderId) => get().orders.find((o) => o.id === orderId),
}))

/** Map Supabase order shape to AdminOrder */
export function mapSupabaseOrder(row: {
  id: string
  user_id: string
  items: unknown
  total_amount: number
  status: string
  created_at: string
  estimated_ready_time?: string
  payment_status?: string
  customer_notes?: string
}): AdminOrder {
  const statusMap: Record<string, OrderStatus> = {
    pending: "Pending",
    processing: "Preparing",
    preparing: "Preparing",
    ready: "Ready",
    completed: "Completed",
    Pending: "Pending",
    Preparing: "Preparing",
    Ready: "Ready",
    Completed: "Completed",
  }
  return {
    id: row.id,
    userId: row.user_id,
    items: Array.isArray(row.items) ? (row.items as AdminOrder["items"]) : [],
    totalPrice: Number(row.total_amount),
    status: statusMap[row.status] ?? "Pending",
    created_at: row.created_at,
    estimatedReadyTime: row.estimated_ready_time,
    paymentStatus: row.payment_status as AdminOrder["paymentStatus"],
    customerNotes: row.customer_notes,
  }
}
