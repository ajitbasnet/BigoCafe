import { createClientIfConfigured } from "@/lib/supabase/server"
import { AdminOrdersList } from "@/components/admin/orders-list"
import { adminOrdersMock } from "@/lib/mock-data/admin-orders"
import { mapSupabaseOrder } from "@/stores/admin-orders-store"
import type { AdminOrder } from "@/lib/mock-data/admin-orders"

export default async function AdminOrdersPage() {
  const supabase = await createClientIfConfigured()
  let initialOrders: AdminOrder[] = []

  if (supabase) {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
    const rows = (data || []) as Parameters<typeof mapSupabaseOrder>[0][]
    initialOrders = rows.map(mapSupabaseOrder)
  } else {
    initialOrders = adminOrdersMock
  }

  return <AdminOrdersList initialOrders={initialOrders} />
}
