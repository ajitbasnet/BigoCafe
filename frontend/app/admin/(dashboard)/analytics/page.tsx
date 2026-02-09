"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Croissant, Coffee } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts"
import { getBakeryBestSellers, getDrinksBestSellers, type AnalyticsTimeRange } from "@/lib/mock-data/admin-analytics"

const chartConfigBar = { name: { label: "Name" }, count: { label: "Count", color: "var(--chart-1)" }, orders: { label: "Orders", color: "var(--chart-1)" } }
const chartConfigPie = { name: { label: "Drink" }, value: { label: "Orders", color: "var(--chart-1)" } }

const TIME_RANGES: { value: AnalyticsTimeRange; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
]

const PIE_COLORS = ["#3B2314", "#6F4E37", "#C89B6D", "#8B6914", "#5C3D2E", "#9B7355", "#4A2E1F", "#A67C52"]

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<AnalyticsTimeRange>("monthly")

  const bakeryData = useMemo(() => getBakeryBestSellers(timeRange), [timeRange])
  const drinksData = useMemo(() => getDrinksBestSellers(timeRange), [timeRange])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <h1 className="font-serif text-3xl text-foreground">Charts</h1>
        <div
          role="tablist"
          aria-label="Time range"
          className="flex rounded-xl border border-border bg-muted/40 p-1.5 shadow-sm ring-1 ring-black/5"
        >
          {TIME_RANGES.map((range) => {
            const isActive = timeRange === range.value
            return (
              <button
                key={range.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setTimeRange(range.value)}
                className={`
                  min-w-[4.5rem] px-4 py-2.5 text-sm font-medium rounded-lg
                  transition-all duration-200 ease-out
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                  ${isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background hover:shadow-sm border border-transparent hover:border-border active:scale-[0.98]"
                  }
                `}
              >
                {range.label}
              </button>
            )
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bakery Best Sellers — Bar Chart */}
        <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Croissant className="w-5 h-5 text-primary" />
              Bakery Best Sellers
            </CardTitle>
            <p className="text-sm text-muted-foreground">Most ordered bakery items (croissants, cakes, pastries)</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{ ...chartConfigBar, orders: { label: "Orders", color: "var(--chart-1)" } }} className="h-[320px] w-full">
              <BarChart data={bakeryData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${Number(value).toLocaleString()} orders`} />} />
                <Bar dataKey="orders" fill="var(--chart-1)" radius={[4, 4, 0, 0]} name="Orders" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Drinks Best Sellers — Pie Chart */}
        <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Coffee className="w-5 h-5 text-primary" />
              Drinks Best Sellers
            </CardTitle>
            <p className="text-sm text-muted-foreground">Drink popularity & market share</p>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfigPie} className="h-[320px] w-full">
              <PieChart margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" formatter={(value) => `${Number(value).toLocaleString()} orders`} />} />
                <Pie
                  data={drinksData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={40}
                  paddingAngle={2}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: "var(--border)" }}
                >
                  {drinksData.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
