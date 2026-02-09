"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Package,
  Search,
  Filter,
  Eye,
  Coffee,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClientIfConfigured } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { AdminOrder } from "@/lib/mock-data/admin-orders"
import { useAdminOrdersStore } from "@/stores/admin-orders-store"
import { OrderDetailDialog } from "./order-detail-dialog"
import { toast } from "sonner"

gsap.registerPlugin(ScrollTrigger)

interface AdminOrdersListProps {
  initialOrders: AdminOrder[]
}

const statusConfig: Record<
  AdminOrder["status"],
  { icon: typeof Clock; color: string; bg: string; label: string }
> = {
  Pending: { icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10", label: "Pending" },
  Preparing: { icon: Package, color: "text-blue-500", bg: "bg-blue-500/10", label: "Preparing" },
  Ready: { icon: Coffee, color: "text-violet-500", bg: "bg-violet-500/10", label: "Ready" },
  Completed: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10", label: "Completed" },
}

function toSupabaseStatus(s: AdminOrder["status"]): string {
  const map: Record<AdminOrder["status"], string> = {
    Pending: "pending",
    Preparing: "processing",
    Ready: "ready",
    Completed: "completed",
  }
  return map[s] ?? "pending"
}

export function AdminOrdersList({ initialOrders }: AdminOrdersListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<AdminOrder["status"] | "all">("all")
  const [detailOrder, setDetailOrder] = useState<AdminOrder | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const router = useRouter()
  const supabase = createClientIfConfigured()
  const orders = useAdminOrdersStore((s) => s.orders)
  const setOrders = useAdminOrdersStore((s) => s.setOrders)
  const updateOrder = useAdminOrdersStore((s) => s.updateOrder)

  useEffect(() => {
    setOrders(initialOrders)
  }, [initialOrders, setOrders])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleSaveOrder = async (orderId: string, data: Partial<AdminOrder>) => {
    updateOrder(orderId, data)
    toast.success("Order updated")
    if (supabase) {
      await supabase
        .from("orders")
        .update({
          status: data.status ? toSupabaseStatus(data.status) : undefined,
          estimated_ready_time: data.estimatedReadyTime,
          customer_notes: data.customerNotes,
        })
        .eq("id", orderId)
      router.refresh()
    }
  }

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
          Orders
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl text-foreground mb-2"
        >
          Orders Management
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground"
        >
          View and manage all customer orders
        </motion.p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-primary mt-6"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row gap-4 relative"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-border h-12 rounded-xl"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-border h-12 rounded-xl bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              {filterStatus === "all" ? "All Status" : statusConfig[filterStatus].label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-card border-border rounded-xl">
            <DropdownMenuItem onClick={() => setFilterStatus("all")}>
              All Status
            </DropdownMenuItem>
            {(Object.entries(statusConfig) as [AdminOrder["status"], typeof statusConfig[AdminOrder["status"]]][]).map(([key, config]) => (
              <DropdownMenuItem key={key} onClick={() => setFilterStatus(key)}>
                <config.icon className={`w-4 h-4 mr-2 ${config.color}`} />
                {config.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order, index) => {
            const status = statusConfig[order.status]
            const StatusIcon = status.icon

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <Card className="bg-card border-border rounded-2xl shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl ${status.bg} flex items-center justify-center`}>
                          <StatusIcon className={`w-6 h-6 ${status.color}`} />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">
                            Order #{order.id.slice(0, 8)}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            User: {order.userId.slice(0, 8)}...
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div className="text-right">
                          <p className="text-xl font-semibold text-foreground">
                            Rs. {Number(order.totalPrice).toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} items
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                            onClick={() => {
                              setDetailOrder(order)
                              setDetailOpen(true)
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className={`rounded-xl border-border ${status.bg} ${status.color} hover:opacity-80`}
                              >
                                <StatusIcon className="w-4 h-4 mr-2" />
                                {status.label}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-card border-border rounded-xl">
                              {(Object.keys(statusConfig) as AdminOrder["status"][]).map((key) => {
                                const Icon = statusConfig[key].icon
                                return (
                                  <DropdownMenuItem
                                    key={key}
                                    onClick={() => handleSaveOrder(order.id, { status: key })}
                                    className="cursor-pointer"
                                  >
                                    <Icon className={`w-4 h-4 mr-2 ${statusConfig[key].color}`} />
                                    {statusConfig[key].label}
                                  </DropdownMenuItem>
                                )
                              })}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="bg-card border-border rounded-2xl shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
            <CardContent className="p-12 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">No orders found</h3>
              <p className="text-muted-foreground">
                {searchQuery || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Orders will appear here when customers place them"}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <OrderDetailDialog
        order={detailOrder}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onSave={handleSaveOrder}
      />
    </div>
  )
}
