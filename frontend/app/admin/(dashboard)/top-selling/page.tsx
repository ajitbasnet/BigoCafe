"use client"

import React, { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Croissant, Coffee, TrendingUp, Minus, TrendingDown, Cake, Package, Sun, ChevronDown, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  bakeryTopSellingTable,
  drinkTopSellingTable,
  type TrendStatus,
} from "@/lib/mock-data/admin-analytics"
import {
  cakeOrdersMock,
  pastryBoxOrdersMock,
  breakfastOrdersMock,
  type MembershipTier,
} from "@/lib/mock-data/admin-top-selling-orders"

function formatCurrency(n: number) {
  return `Rs. ${n.toLocaleString()}`
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })
}

type DatePreset = "7" | "30" | "90"
const DATE_PRESETS: { value: DatePreset; label: string }[] = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 90 days" },
]

function filterByTierAndDate<T extends { membershipTier: MembershipTier; createdAt: string }>(
  rows: T[],
  tier: string,
  days: number
) {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  const cutoffStr = cutoff.toISOString()
  return rows.filter((r) => {
    const tierMatch = tier === "all" || r.membershipTier === tier
    const dateMatch = r.createdAt >= cutoffStr
    return tierMatch && dateMatch
  })
}

function TrendBadge({ status }: { status: TrendStatus }) {
  if (status === "rising")
    return (
      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
        <TrendingUp className="w-4 h-4" /> Rising
      </span>
    )
  if (status === "falling")
    return (
      <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-medium">
        <TrendingDown className="w-4 h-4" /> Falling
      </span>
    )
  return (
    <span className="inline-flex items-center gap-1 text-muted-foreground font-medium">
      <Minus className="w-4 h-4" /> Stable
    </span>
  )
}

export default function AdminTopSellingPage() {
  const [membershipTier, setMembershipTier] = useState<string>("all")
  const [datePreset, setDatePreset] = useState<DatePreset>("30")
  const [expandedCakeId, setExpandedCakeId] = useState<string | null>(null)
  const [expandedPastryId, setExpandedPastryId] = useState<string | null>(null)
  const [expandedBreakfastId, setExpandedBreakfastId] = useState<string | null>(null)
  const [cakeSortAsc, setCakeSortAsc] = useState(false)
  const [pastrySortAsc, setPastrySortAsc] = useState(false)
  const [breakfastSortAsc, setBreakfastSortAsc] = useState(false)

  const days = datePreset === "7" ? 7 : datePreset === "30" ? 30 : 90

  const filteredCakes = useMemo(
    () => [...filterByTierAndDate(cakeOrdersMock, membershipTier, days)].sort((a, b) => (cakeSortAsc ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice)),
    [membershipTier, days, cakeSortAsc]
  )
  const filteredPastry = useMemo(
    () => [...filterByTierAndDate(pastryBoxOrdersMock, membershipTier, days)].sort((a, b) => (pastrySortAsc ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice)),
    [membershipTier, days, pastrySortAsc]
  )
  const filteredBreakfast = useMemo(
    () => [...filterByTierAndDate(breakfastOrdersMock, membershipTier, days)].sort((a, b) => (breakfastSortAsc ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice)),
    [membershipTier, days, breakfastSortAsc]
  )

  const cakeBestId = filteredCakes.length ? filteredCakes.reduce((best, r) => (r.totalPrice > best.totalPrice ? r : best), filteredCakes[0]).orderId : null
  const pastryBestId = filteredPastry.length ? filteredPastry.reduce((best, r) => (r.totalPrice > best.totalPrice ? r : best), filteredPastry[0]).orderId : null
  const breakfastBestId = filteredBreakfast.length ? filteredBreakfast.reduce((best, r) => (r.totalPrice > best.totalPrice ? r : best), filteredBreakfast[0]).orderId : null

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-serif text-3xl font-semibold text-foreground tracking-tight">Top Selling Items</h1>
        <p className="text-muted-foreground mt-1.5">Bakery and drinks rankings, plus order-level details by category</p>
      </motion.div>

      {/* Order details by category – at top with high visibility */}
      <section className="space-y-6">
        <Card className="rounded-2xl border-border bg-card shadow-dashboard overflow-hidden">
          <div className="border-b border-border bg-muted/30 px-6 py-4">
            <h2 className="font-semibold text-xl text-foreground tracking-tight">Order details by category</h2>
            <p className="text-sm text-muted-foreground mt-1">Filter by membership and date; sort by total price; expand rows for more details</p>
          </div>
          <CardContent className="p-6">
            <div className="flex flex-wrap items-center gap-6 rounded-xl border border-border bg-background/50 dark:bg-muted/20 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <label htmlFor="tier-filter" className="text-sm font-semibold text-foreground whitespace-nowrap">
                  Membership tier
                </label>
                <Select value={membershipTier} onValueChange={setMembershipTier}>
                  <SelectTrigger id="tier-filter" className="w-[160px] bg-background font-medium">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-3">
                <label htmlFor="date-filter" className="text-sm font-semibold text-foreground whitespace-nowrap">
                  Date range
                </label>
                <Select value={datePreset} onValueChange={(v) => setDatePreset(v as DatePreset)}>
                  <SelectTrigger id="date-filter" className="w-[180px] bg-background font-medium">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DATE_PRESETS.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Cakes Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.04 }}
      >
        <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Cake className="w-5 h-5 text-primary" aria-hidden />
              Cakes Orders
            </CardTitle>
            <p className="text-sm text-muted-foreground">Sort by total price; expand row for customization details</p>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/60 hover:bg-muted/60 border-border">
                  <TableHead className="font-semibold text-foreground w-12" aria-label="Expand row" />
                  <TableHead className="font-semibold text-foreground">Order ID</TableHead>
                  <TableHead className="font-semibold text-foreground">Cake Name</TableHead>
                  <TableHead className="font-semibold text-foreground">Flavor</TableHead>
                  <TableHead className="font-semibold text-foreground">Design</TableHead>
                  <TableHead className="font-semibold text-foreground">Occasion</TableHead>
                  <TableHead className="font-semibold text-foreground">Size</TableHead>
                  <TableHead className="font-semibold text-foreground">Layers</TableHead>
                  <TableHead className="font-semibold text-foreground">Cream</TableHead>
                  <TableHead className="font-semibold text-foreground">Customer</TableHead>
                  <TableHead className="font-semibold text-foreground">Tier</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Qty</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Unit Price</TableHead>
                  <TableHead
                    className="font-semibold text-foreground text-right cursor-pointer select-none hover:text-primary transition-colors"
                    onClick={() => setCakeSortAsc((a) => !a)}
                  >
                    Total Price {cakeSortAsc ? "↑" : "↓"}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">Pickup</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCakes.map((row) => (
                  <React.Fragment key={row.orderId}>
                    <TableRow
                      className={`border-border transition-colors ${row.orderId === cakeBestId ? "bg-primary/15 dark:bg-primary/20" : "hover:bg-muted/30"}`}
                    >
                      <TableCell className="w-12 p-1 align-middle">
                        <button
                          type="button"
                          onClick={() => setExpandedCakeId((id) => (id === row.orderId ? null : row.orderId))}
                          className="flex size-8 items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={expandedCakeId === row.orderId ? "Collapse" : "Expand"}
                        >
                          {expandedCakeId === row.orderId ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      </TableCell>
                      <TableCell className="font-medium">
                        {row.orderId === cakeBestId && (
                          <span className="inline-block rounded-md bg-primary text-primary-foreground px-2 py-0.5 text-xs font-semibold mr-1.5">Best selling</span>
                        )}
                        {row.orderId}
                      </TableCell>
                      <TableCell>{row.cakeName}</TableCell>
                      <TableCell className="text-muted-foreground">{row.flavor}</TableCell>
                      <TableCell>{row.designType}</TableCell>
                      <TableCell>{row.occasion}</TableCell>
                      <TableCell>{row.size}</TableCell>
                      <TableCell>{row.layers}</TableCell>
                      <TableCell>{row.creamType}</TableCell>
                      <TableCell>{row.customerName}</TableCell>
                      <TableCell>{row.membershipTier}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.orderQuantity}</TableCell>
                      <TableCell className="text-right tabular-nums">{formatCurrency(row.unitPrice)}</TableCell>
                      <TableCell className="text-right font-semibold tabular-nums">{formatCurrency(row.totalPrice)}</TableCell>
                      <TableCell className="text-muted-foreground">{row.pickupDateTime}</TableCell>
                      <TableCell>{row.orderStatus}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{formatDate(row.createdAt)}</TableCell>
                    </TableRow>
                    {expandedCakeId === row.orderId && (
                      <TableRow key={`${row.orderId}-exp`} className="border-border bg-muted/40">
                        <TableCell colSpan={18} className="p-4">
                          <div className="rounded-lg border border-border bg-background/80 p-4 text-sm space-y-2">
                            <p><strong>Custom message:</strong> {row.customMessage || "—"}</p>
                            <p><strong>Flavor:</strong> {row.flavor} · <strong>Design:</strong> {row.designType} · <strong>Cream:</strong> {row.creamType}</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pastry Box Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Package className="w-5 h-5 text-primary" aria-hidden />
              Pastry Box Orders
            </CardTitle>
            <p className="text-sm text-muted-foreground">Sort by total price; expand for flavors and notes</p>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/60 hover:bg-muted/60 border-border">
                  <TableHead className="font-semibold text-foreground w-12" aria-label="Expand row" />
                  <TableHead className="font-semibold text-foreground">Order ID</TableHead>
                  <TableHead className="font-semibold text-foreground">Box Size</TableHead>
                  <TableHead className="font-semibold text-foreground">Customer</TableHead>
                  <TableHead className="font-semibold text-foreground">Tier</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Qty</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Unit Price</TableHead>
                  <TableHead
                    className="font-semibold text-foreground text-right cursor-pointer select-none hover:text-primary transition-colors"
                    onClick={() => setPastrySortAsc((a) => !a)}
                  >
                    Total Price {pastrySortAsc ? "↑" : "↓"}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">Pickup/Delivery</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPastry.map((row) => (
                  <React.Fragment key={row.orderId}>
                    <TableRow
                      className={`border-border transition-colors ${row.orderId === pastryBestId ? "bg-primary/15 dark:bg-primary/20" : "hover:bg-muted/30"}`}
                    >
                      <TableCell className="w-12 p-1 align-middle">
                        <button
                          type="button"
                          onClick={() => setExpandedPastryId((id) => (id === row.orderId ? null : row.orderId))}
                          className="flex size-8 items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={expandedPastryId === row.orderId ? "Collapse" : "Expand"}
                        >
                          {expandedPastryId === row.orderId ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      </TableCell>
                      <TableCell className="font-medium">
                        {row.orderId === pastryBestId && (
                          <span className="inline-block rounded-md bg-primary text-primary-foreground px-2 py-0.5 text-xs font-semibold mr-1.5">Best selling</span>
                        )}
                        {row.orderId}
                      </TableCell>
                      <TableCell>{row.boxSizePieces} pcs</TableCell>
                      <TableCell>{row.customerName}</TableCell>
                      <TableCell>{row.membershipTier}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.quantityOrdered}</TableCell>
                      <TableCell className="text-right tabular-nums">{formatCurrency(row.unitPrice)}</TableCell>
                      <TableCell className="text-right font-semibold tabular-nums">{formatCurrency(row.totalPrice)}</TableCell>
                      <TableCell className="text-muted-foreground">{row.pickupDeliveryTime}</TableCell>
                      <TableCell>{row.orderStatus}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{formatDate(row.createdAt)}</TableCell>
                    </TableRow>
                    {expandedPastryId === row.orderId && (
                      <TableRow key={`${row.orderId}-exp`} className="border-border bg-muted/40">
                        <TableCell colSpan={11} className="p-4">
                          <div className="rounded-lg border border-border bg-background/80 p-4 text-sm space-y-2">
                            <p><strong>Selected pastry flavors:</strong> {row.selectedPastryFlavors.join(", ")}</p>
                            <p><strong>Customization notes:</strong> {row.customizationNotes || "—"}</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Breakfast Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.06 }}
      >
        <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Sun className="w-5 h-5 text-primary" aria-hidden />
              Breakfast Orders
            </CardTitle>
            <p className="text-sm text-muted-foreground">Sort by total price; expand for customization and add-ons</p>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/60 hover:bg-muted/60 border-border">
                  <TableHead className="font-semibold text-foreground w-12" aria-label="Expand row" />
                  <TableHead className="font-semibold text-foreground">Order ID</TableHead>
                  <TableHead className="font-semibold text-foreground">Item</TableHead>
                  <TableHead className="font-semibold text-foreground">Category</TableHead>
                  <TableHead className="font-semibold text-foreground">Customer</TableHead>
                  <TableHead className="font-semibold text-foreground">Tier</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Qty</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Unit Price</TableHead>
                  <TableHead
                    className="font-semibold text-foreground text-right cursor-pointer select-none hover:text-primary transition-colors"
                    onClick={() => setBreakfastSortAsc((a) => !a)}
                  >
                    Total Price {breakfastSortAsc ? "↑" : "↓"}
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">Order Type</TableHead>
                  <TableHead className="font-semibold text-foreground">Table</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBreakfast.map((row) => (
                  <React.Fragment key={row.orderId}>
                    <TableRow
                      className={`border-border transition-colors ${row.orderId === breakfastBestId ? "bg-primary/15 dark:bg-primary/20" : "hover:bg-muted/30"}`}
                    >
                      <TableCell className="w-12 p-1 align-middle">
                        <button
                          type="button"
                          onClick={() => setExpandedBreakfastId((id) => (id === row.orderId ? null : row.orderId))}
                          className="flex size-8 items-center justify-center rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={expandedBreakfastId === row.orderId ? "Collapse" : "Expand"}
                        >
                          {expandedBreakfastId === row.orderId ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                        </button>
                      </TableCell>
                      <TableCell className="font-medium">
                        {row.orderId === breakfastBestId && (
                          <span className="inline-block rounded-md bg-primary text-primary-foreground px-2 py-0.5 text-xs font-semibold mr-1.5">Best selling</span>
                        )}
                        {row.orderId}
                      </TableCell>
                      <TableCell className="font-medium">{row.breakfastItemName}</TableCell>
                      <TableCell className="text-muted-foreground">{row.category}</TableCell>
                      <TableCell>{row.customerName}</TableCell>
                      <TableCell>{row.membershipTier}</TableCell>
                      <TableCell className="text-right tabular-nums">{row.quantityOrdered}</TableCell>
                      <TableCell className="text-right tabular-nums">{formatCurrency(row.unitPrice)}</TableCell>
                      <TableCell className="text-right font-semibold tabular-nums">{formatCurrency(row.totalPrice)}</TableCell>
                      <TableCell>{row.orderType}</TableCell>
                      <TableCell>{row.tableNumber ?? "—"}</TableCell>
                      <TableCell>{row.orderStatus}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{formatDate(row.createdAt)}</TableCell>
                    </TableRow>
                    {expandedBreakfastId === row.orderId && (
                      <TableRow key={`${row.orderId}-exp`} className="border-border bg-muted/40">
                        <TableCell colSpan={13} className="p-4">
                          <div className="rounded-lg border border-border bg-background/80 p-4 text-sm space-y-2">
                            <p><strong>Customization details:</strong> {row.customizationDetails || "—"}</p>
                            <p><strong>Add-ons:</strong> {row.addons || "—"}</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
      </section>

      {/* Bakery Items — Top Selling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.02 }}
      >
        <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Croissant className="w-5 h-5 text-primary" aria-hidden />
              Bakery Items — Top Selling
            </CardTitle>
            <p className="text-sm text-muted-foreground">Ranked by orders and revenue</p>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/60 hover:bg-muted/60 border-border">
                  <TableHead className="font-semibold text-foreground w-14">Rank</TableHead>
                  <TableHead className="font-semibold text-foreground">Item Name</TableHead>
                  <TableHead className="font-semibold text-foreground">Category</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Total Orders</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Total Qty Sold</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Revenue Generated</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Avg Rating</TableHead>
                  <TableHead className="font-semibold text-foreground">Seasonal / Regular</TableHead>
                  <TableHead className="font-semibold text-foreground">Last Ordered</TableHead>
                  <TableHead className="font-semibold text-foreground">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bakeryTopSellingTable.map((row) => (
                  <TableRow key={row.rank} className="border-border hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{row.rank}</TableCell>
                    <TableCell className="font-medium">{row.itemName}</TableCell>
                    <TableCell className="text-muted-foreground">{row.category}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.totalOrders.toLocaleString()}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.totalQuantitySold.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{formatCurrency(row.revenueGenerated)}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.averageRating.toFixed(1)}</TableCell>
                    <TableCell>{row.seasonalRegular}</TableCell>
                    <TableCell className="text-muted-foreground">{row.lastOrderedDate}</TableCell>
                    <TableCell>
                      <TrendBadge status={row.trendStatus} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Drinks — Top Selling */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.03 }}
      >
        <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Coffee className="w-5 h-5 text-primary" aria-hidden />
              Drinks — Top Selling
            </CardTitle>
            <p className="text-sm text-muted-foreground">Ranked by orders and customization popularity</p>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/60 hover:bg-muted/60 border-border">
                  <TableHead className="font-semibold text-foreground w-14">Rank</TableHead>
                  <TableHead className="font-semibold text-foreground">Drink Name</TableHead>
                  <TableHead className="font-semibold text-foreground">Drink Type</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Customization Popularity</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Total Orders</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Total Cups Sold</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Revenue Generated</TableHead>
                  <TableHead className="font-semibold text-foreground text-right">Avg Rating</TableHead>
                  <TableHead className="font-semibold text-foreground">Most Popular Size</TableHead>
                  <TableHead className="font-semibold text-foreground">Trend</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drinkTopSellingTable.map((row) => (
                  <TableRow key={row.rank} className="border-border hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{row.rank}</TableCell>
                    <TableCell className="font-medium">{row.drinkName}</TableCell>
                    <TableCell className="text-muted-foreground">{row.drinkType}</TableCell>
                    <TableCell className="text-right">{row.customizationPopularity}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.totalOrders.toLocaleString()}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.totalCupsSold.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{formatCurrency(row.revenueGenerated)}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.averageRating.toFixed(1)}</TableCell>
                    <TableCell>{row.mostPopularSize}</TableCell>
                    <TableCell>
                      <TrendBadge status={row.trendStatus} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
