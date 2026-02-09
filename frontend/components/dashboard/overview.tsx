"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ShoppingBag,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getFeaturedItems } from "@/lib/mock-data/menu-items"
import { getActiveSeasonalItems } from "@/lib/mock-data/seasonal-items"
import { useOrderStore } from "@/stores/order-store"
import { RewardsWidget } from "@/components/rewards/rewards-widget"

gsap.registerPlugin(ScrollTrigger)

const featuredItems = getFeaturedItems(4)

export function DashboardOverview() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { activeOrder, orderHistory } = useOrderStore()
  const seasonalItems = getActiveSeasonalItems()
  const orders = activeOrder
    ? [activeOrder, ...orderHistory.filter((o) => o.id !== activeOrder.id)]
    : orderHistory

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
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const totalOrders = orders.length
  const activeOrdersCount = activeOrder ? 1 : 0

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-primary",
    },
    {
      title: "Active Orders",
      value: activeOrdersCount,
      icon: Clock,
      color: "text-[#C89B3C]",
    },
  ]

  return (
    <div ref={sectionRef} className="relative space-y-8 overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 -left-8 whitespace-nowrap pointer-events-none select-none">
        <div
          ref={parallaxRef}
          className="font-serif text-[15vw] text-foreground/[0.02] leading-none"
        >
          BIGO — YOUR DASHBOARD — BIGO — YOUR DASHBOARD —
        </div>
      </div>

      <div ref={headerRef} className="relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary uppercase tracking-[0.3em] text-sm mb-2"
        >
          Welcome back
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl text-foreground mb-2"
        >
          Welcome to BIGO
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground max-w-xl"
        >
          Reserve a table, order from the menu, and track your rewards — all in one place.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-primary mt-6"
        />
      </div>

      {/* Seasonal Promo Banner */}
      {seasonalItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link href="/dashboard/seasonal">
            <Card className="rounded-2xl shadow-dashboard border-primary/30 bg-primary/5 hover:bg-primary/10 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">
                    Seasonal Specials Available
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {seasonalItems.length} limited-time items to try
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-primary" />
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      )}

      {/* Stats + Rewards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 relative">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Card className="rounded-2xl shadow-dashboard border-border hover:border-primary/50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-semibold text-foreground mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-full bg-secondary flex items-center justify-center ${stat.color}`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <RewardsWidget compact />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* Active / Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="rounded-2xl shadow-dashboard border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Recent Orders</CardTitle>
              <Link
                href="/dashboard/orders"
                className="relative group inline-flex items-center text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <span className="relative z-10 flex items-center">
                  View all
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Order #{order.id}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">
                          Rs. {order.totalPrice.toLocaleString()}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.orderStatus === "ready"
                              ? "bg-emerald-500/10 text-emerald-500"
                              : "bg-amber-500/10 text-amber-500"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No orders yet</p>
                  <Link
                    href="/dashboard/menu"
                    className="relative overflow-hidden inline-flex mt-4 px-6 py-3 border border-primary text-primary text-sm uppercase tracking-widest transition-all duration-300 hover:text-primary-foreground group"
                  >
                    <span className="relative z-10">Browse Menu</span>
                    <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Items */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="rounded-2xl shadow-dashboard border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Featured Items</CardTitle>
              <Link
                href="/dashboard/menu"
                className="relative group inline-flex items-center text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                <span className="relative z-10 flex items-center">
                  View menu
                  <ArrowRight className="w-4 h-4 ml-1" />
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {featuredItems.map((item) => (
                  <Link key={item.id} href="/dashboard/menu">
                    <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors cursor-pointer group">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Rs. {item.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
