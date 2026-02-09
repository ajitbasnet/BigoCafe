"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Clock,
  DollarSign,
  Flower2,
  Gift,
  ShoppingBag,
  TrendingUp,
} from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { AdminAnalytics } from "@/lib/mock-data/admin-analytics"

gsap.registerPlugin(ScrollTrigger)

interface Order {
  id: string
  user_id: string
  items: unknown[]
  total_amount: number
  status: string
  created_at: string
}

interface AdminOverviewProps {
  orders: Order[]
  totalOrders: number
  totalUsers: number
  totalRevenue: number
  analytics: AdminAnalytics
}

const chartConfigSales = {
  date: { label: "Date" },
  sales: { label: "Sales", color: "var(--chart-1)" },
  orders: { label: "Orders", color: "var(--chart-2)" },
}

const chartConfigPopularity = {
  name: { label: "Product" },
  count: { label: "Orders", color: "var(--chart-1)" },
  revenue: { label: "Revenue", color: "var(--chart-2)" },
}

const chartConfigCustomization = {
  name: { label: "Option" },
  count: { label: "Count", color: "var(--chart-1)" },
}

export function AdminOverview({
  orders,
  totalOrders,
  totalUsers,
  totalRevenue,
  analytics,
}: AdminOverviewProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      }
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const top5 = analytics.topSellingProducts.slice(0, 5)

  const cards = [
    {
      title: "Total Orders Today",
      value: analytics.totalOrdersToday,
      icon: ShoppingBag,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Revenue",
      value: `Rs. ${analytics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Pending Orders",
      value: analytics.pendingOrders,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Seasonal Item Sales",
      value: analytics.seasonalItemSales,
      icon: Flower2,
      color: "text-rose-600",
      bgColor: "bg-rose-500/10",
    },
    {
      title: "Customer Reward Usage",
      value: analytics.customerRewardUsage.toLocaleString(),
      icon: Gift,
      color: "text-violet-600",
      bgColor: "bg-violet-500/10",
    },
  ]

  return (
    <div ref={sectionRef} className="relative space-y-8 overflow-hidden">
      {/* Parallax */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-8 whitespace-nowrap pointer-events-none select-none">
        <div
          ref={parallaxRef}
          className="font-serif text-[15vw] text-foreground/[0.02] leading-none"
        >
          ADMIN — BIGO PANEL — ADMIN — BIGO PANEL —
        </div>
      </div>

      {/* Welcome */}
      <div ref={headerRef} className="relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary uppercase tracking-[0.3em] text-sm mb-2"
        >
          Administrator
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl text-foreground mb-2"
        >
          Admin Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground"
        >
          Welcome back! Here&apos;s an overview of BIGO&apos;s performance.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-primary mt-6"
        />
      </div>

      {/* Analytics cards: 5 in one row, same height */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 relative">
        {cards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="flex"
          >
            <Card className="rounded-2xl bg-card border-border shadow-dashboard overflow-hidden h-full w-full transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5 flex flex-col">
              <CardContent className="p-3.5 flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-lg font-semibold text-foreground mt-0.5">{stat.value}</p>
                  </div>
                  <div
                    className={`w-9 h-9 shrink-0 rounded-lg ${stat.bgColor} flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Top Selling (Top 5) - below the stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full"
      >
        <Card className="rounded-2xl bg-card border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Top Selling (Top 5)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-2">
              {top5.map((p, i) => (
                <li
                  key={p.name}
                  className="flex justify-between text-sm text-foreground border-b border-border/50 pb-1 last:border-0"
                >
                  <span className="truncate">{i + 1}. {p.name}</span>
                  <span className="text-muted-foreground tabular-nums">{p.count}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Three charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
        {/* Sales (line/area) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2"
        >
          <Card className="rounded-2xl bg-card border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Sales</CardTitle>
              <p className="text-sm text-muted-foreground">Revenue by day (last 14 days)</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigSales} className="h-[280px] w-full">
                <AreaChart
                  data={analytics.salesTimeSeries}
                  margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(v) => new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  />
                  <YAxis tickFormatter={(v) => `Rs.${(v / 1000).toFixed(0)}k`} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="var(--color-sales)"
                    fill="var(--color-sales)"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Item popularity (bar) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="rounded-2xl bg-card border-border shadow-dashboard overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Item popularity</CardTitle>
              <p className="text-sm text-muted-foreground">Orders by product</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigPopularity} className="h-[280px] w-full">
                <BarChart
                  data={analytics.productPopularity.slice(0, 6)}
                  layout="vertical"
                  margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 10 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Coffee customization trends (bar) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-3"
        >
          <Card className="rounded-2xl bg-card border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
            <CardHeader>
              <CardTitle className="text-foreground">Coffee customization trends</CardTitle>
              <p className="text-sm text-muted-foreground">Milk, temperature, add-ons, sweetness</p>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfigCustomization} className="h-[280px] w-full">
                <BarChart
                  data={analytics.customizationTrends}
                  margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
