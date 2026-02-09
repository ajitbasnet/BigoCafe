"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)
import { ShoppingBag, Package, Clock, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  items: unknown[]
  total_amount: number
  status: string
  created_at: string
}

interface OrdersListProps {
  orders: Order[]
}

const statusConfig = {
  pending: { icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
  processing: { icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
  completed: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  cancelled: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10" },
}

export function OrdersList({ orders }: OrdersListProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  return (
    <div ref={sectionRef} className="relative space-y-6 overflow-hidden">
      <div ref={headerRef} className="relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary uppercase tracking-[0.3em] text-sm mb-2"
        >
          My Orders
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl text-foreground mb-2"
        >
          My Orders
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground"
        >
          Track and manage your orders
        </motion.p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-primary mt-6"
        />
      </div>

      {orders.length > 0 ? (
        <div className="space-y-4 relative">
          {orders.map((order, index) => {
            const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending
            const StatusIcon = status.icon

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg ${status.bg} flex items-center justify-center`}>
                          <StatusIcon className={`w-6 h-6 ${status.color}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">
                            Order #{order.id.slice(0, 8)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </p>
                          <span className={`inline-flex items-center gap-1 mt-2 text-xs px-2 py-1 rounded-full ${status.bg} ${status.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-semibold text-foreground">
                          Rs. {Number(order.total_amount).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {Array.isArray(order.items) ? order.items.length : 0} items
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="bg-card border-border">
            <CardContent className="p-12 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-6">
                {"Start exploring our delicious bakery items and place your first order!"}
              </p>
              <Button asChild className="bg-primary text-primary-foreground">
                <Link href="/#menu">Browse Menu</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
