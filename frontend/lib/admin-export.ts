/**
 * Helpers to export admin analytics as CSV or PDF (client-side).
 */

import type { AdminAnalytics } from "@/lib/mock-data/admin-analytics"

export function exportAnalyticsToCSV(analytics: AdminAnalytics): void {
  const rows: string[][] = [
    ["Metric", "Value"],
    ["Total Orders Today", String(analytics.totalOrdersToday)],
    ["Total Revenue", String(analytics.totalRevenue)],
    ["Pending Orders", String(analytics.pendingOrders)],
    ["Seasonal Item Sales", String(analytics.seasonalItemSales)],
    ["Customer Reward Usage", String(analytics.customerRewardUsage)],
    [],
    ["Top Selling Products", "Count", "Revenue"],
    ...analytics.topSellingProducts.map((p) => [p.name, String(p.count), String(p.revenue)]),
    [],
    ["Sales by Date", "Sales", "Orders"],
    ...analytics.salesTimeSeries.map((d) => [d.date, String(d.sales), String(d.orders)]),
  ]

  const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `bigo-analytics-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export function exportAnalyticsToPDF(_analytics: AdminAnalytics): void {
  // Optional: use jspdf or similar. For now open a simple print-friendly window.
  const w = window.open("", "_blank")
  if (!w) return
  w.document.write(`
    <!DOCTYPE html>
    <html>
      <head><title>BIGO Analytics Report</title></head>
      <body style="font-family: sans-serif; padding: 2rem;">
        <h1>BIGO Analytics Report</h1>
        <p>Generated: ${new Date().toLocaleString()}</p>
        <p>Export PDF via browser Print → Save as PDF.</p>
      </body>
    </html>
  `)
  w.document.close()
  w.print()
  w.close()
}
