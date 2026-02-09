import { createClientIfConfigured } from "@/lib/supabase/server"
import { AdminOverview } from "@/components/admin/overview"
import { adminAnalyticsMock } from "@/lib/mock-data/admin-analytics"

export default async function AdminPage() {
  const supabase = await createClientIfConfigured()

  let orders: unknown[] = []
  let totalOrders = 0
  let totalUsers = 0

  if (supabase) {
    const ordersRes = await supabase
      .from("orders")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(10)
    orders = ordersRes.data || []
    totalOrders = ordersRes.count ?? 0

    const usersRes = await supabase.from("profiles").select("*", { count: "exact", head: true })
    totalUsers = usersRes.count ?? 0
  }

  type OrderLike = { id: string; user_id: string; items: unknown[]; total_amount: number; status: string; created_at: string }
  const totalRevenue = (orders as OrderLike[]).reduce((sum, order) => sum + Number(order.total_amount || 0), 0)

  // Use mock analytics; when Supabase has orders, override key counts from live data
  const orderList = orders as OrderLike[]
  const analytics = {
    ...adminAnalyticsMock,
    ...(orderList.length > 0 && {
      totalOrdersToday: totalOrders,
      totalRevenue: totalRevenue > 0 ? totalRevenue : adminAnalyticsMock.totalRevenue,
      pendingOrders: orderList.filter((o) => o.status === "pending" || o.status === "processing").length,
    }),
  }

  return (
    <AdminOverview
      orders={orders as OrderLike[]}
      totalOrders={totalOrders}
      totalUsers={totalUsers}
      totalRevenue={totalRevenue}
      analytics={analytics}
    />
  )
}
