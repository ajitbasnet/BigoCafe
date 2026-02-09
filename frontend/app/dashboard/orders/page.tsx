"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Clock,
  Gift,
  ChevronRight,
} from "lucide-react"
import { useCartStore } from "@/stores/cart-store"
import { useOrderStore } from "@/stores/order-store"
import { useRewardsStore } from "@/stores/rewards-store"
import { OrderTracking } from "@/components/orders/order-tracking"
import { useToast } from "@/hooks/use-toast"
import { formatNPR } from "@/lib/pricing/format"
import { REWARD_RUPEE_PER_POINT, REWARD_MAX_DISCOUNT_FRACTION } from "@/lib/pricing/npr-config"
import { PriceBreakdownModal } from "@/components/pricing/price-breakdown-modal"
import { AnimatedPrice } from "@/components/pricing/animated-price"
import { SeasonalBadge } from "@/components/pricing/seasonal-badge"
import type { SeasonalTag } from "@/lib/pricing/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

gsap.registerPlugin(ScrollTrigger)

export default function OrdersPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const {
    items,
    removeItem,
    updateQuantity,
    getTotal,
    getCartBreakdown,
    getTotalPreparationTime,
    getTotalRewardPoints,
    clearCart,
    rewardPointsToUse,
    setRewardPointsToUse,
    seasonalTag,
    setSeasonalTag,
  } = useCartStore()
  const [breakdownOpen, setBreakdownOpen] = useState(false)
  const placeOrder = useOrderStore((s) => s.placeOrder)
  const addPoints = useRewardsStore((s) => s.addPoints)
  const deductPoints = useRewardsStore((s) => s.deductPoints)
  const rewardPoints = useRewardsStore((s) => s.rewardPoints)
  const { activeOrder, orderHistory, simulateNextStatus } = useOrderStore()
  const { toast } = useToast()

  const subtotal = getTotal()
  const breakdown = getCartBreakdown()
  const prepTime = getTotalPreparationTime()
  const rewardPts = getTotalRewardPoints()
  const totalQuantity = items.reduce((s, i) => s + i.quantity, 0)
  const maxRedeemablePoints =
    subtotal > 0
      ? Math.floor(
          (breakdown.subtotalAfterSeasonalNPR ?? subtotal) *
            REWARD_MAX_DISCOUNT_FRACTION /
            REWARD_RUPEE_PER_POINT
        )
      : 0

  const orders = activeOrder
    ? [activeOrder, ...orderHistory.filter((o) => o.id !== activeOrder.id)]
    : orderHistory

  const handlePlaceOrder = () => {
    const orderId = placeOrder(
      items,
      null,
      breakdown.finalTotalNPR,
      prepTime,
      rewardPts
    )
    addPoints(rewardPts)
    if (rewardPointsToUse > 0) deductPoints(rewardPointsToUse)
    clearCart()
    toast({
      title: "Order placed",
      description: `Order #${orderId} is being prepared. You can track it below.`,
    })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (parallaxRef.current && sectionRef.current) {
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

  return (
    <div ref={sectionRef} className="relative space-y-8 overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 -left-8 whitespace-nowrap pointer-events-none select-none">
        <div
          ref={parallaxRef}
          className="font-serif text-[15vw] text-foreground/[0.03] leading-none"
        >
          ORDERS — BIGO — ORDERS —
        </div>
      </div>

      {/* Page header */}
      <div ref={headerRef} className="relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary uppercase tracking-[0.3em] text-sm mb-2"
        >
          Cart & Orders
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl lg:text-4xl text-foreground mb-2"
        >
          My Orders
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground max-w-xl"
        >
          Review your cart, apply reward points, and place your order. Track status and history below.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-primary mt-6"
        />
      </div>

      <div
        className={
          items.length > 0
            ? "grid lg:grid-cols-[1fr_380px] gap-8"
            : "max-w-3xl"
        }
      >
        {/* Left column: Cart + Order history */}
        <div className="space-y-8 min-w-0">
          {/* Your Cart - only when items */}
          {items.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="rounded-2xl shadow-dashboard border-border overflow-hidden">
                <CardHeader className="border-b border-border bg-muted/30">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      Your Cart
                      <span className="text-sm font-normal text-muted-foreground">
                        ({totalQuantity} item{totalQuantity !== 1 ? "s" : ""})
                      </span>
                    </CardTitle>
                    <Link
                      href="/dashboard/menu"
                      className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                    >
                      Add more
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="max-h-[320px]">
                    <ul className="divide-y divide-border">
                      {items.map((item) => (
                        <li
                          key={item.id}
                          className="flex gap-4 p-4 hover:bg-muted/20 transition-colors"
                        >
                          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">
                              {item.name}
                            </p>
                            {item.customization && (
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {item.customization.temperature},{" "}
                                {item.customization.milkType}
                                {item.customization.addOns.length > 0 &&
                                  ` · +${item.customization.addOns.length} add-on(s)`}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 rounded-lg"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                −
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 rounded-lg"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <div className="text-right flex flex-col justify-between items-end">
                            <p className="font-semibold text-primary">
                              {formatNPR(item.price * item.quantity)}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.section>
          )}

          {/* Order history - hide when no cart and no orders (single empty state below) */}
          {(orders.length > 0 || items.length > 0) && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" />
              {orders.length > 0 ? "Order History" : "Placed Orders"}
            </h2>

            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order, index) => {
                  const isActive = order.id === activeOrder?.id
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Card
                        className={`rounded-2xl shadow-dashboard border-border overflow-hidden transition-all duration-300 ${
                          isActive
                            ? "ring-2 ring-primary/30"
                            : "hover:shadow-xl hover:border-primary/20"
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h3 className="font-semibold text-foreground">
                                  Order #{order.id}
                                </h3>
                                {isActive && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                                    <Clock className="w-3.5 h-3.5" />
                                    In progress
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(
                                  order.createdAt
                                ).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                              <p className="text-xl font-semibold text-primary mt-1">
                                {formatNPR(order.totalPrice)}
                              </p>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {order.orderedItems.length} item
                                {order.orderedItems.length !== 1 ? "s" : ""}
                                {order.pastryBox &&
                                  ` · Pastry box (${order.pastryBox.size} pcs)`}
                              </p>
                            </div>
                            {isActive && (
                              <div className="lg:w-80 xl:w-96 flex-shrink-0">
                                <OrderTracking
                                  currentStatus={order.orderStatus}
                                  estimatedReadyTime={
                                    order.estimatedReadyTime instanceof Date
                                      ? order.estimatedReadyTime
                                      : new Date(order.estimatedReadyTime)
                                  }
                                  onSimulateNext={simulateNextStatus}
                                />
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <Card className="rounded-2xl shadow-dashboard border-border">
                <CardContent className="p-12 text-center">
                  <ShoppingBag className="w-14 h-14 mx-auto text-muted-foreground/70 mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No orders yet
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                    Place an order from the cart above or browse the menu to get
                    started.
                  </p>
                  <Link
                    href="/dashboard/menu"
                    className="relative overflow-hidden inline-flex px-5 py-2.5 border border-primary text-primary text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:text-primary-foreground group rounded-xl"
                  >
                    <span className="relative z-10">Browse Menu</span>
                    <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </Link>
                </CardContent>
              </Card>
            )}
          </section>
          )}
        </div>

        {/* Right column: Order summary (sticky when cart has items) */}
        {items.length > 0 && (
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <Card className="rounded-2xl shadow-dashboard border-border overflow-hidden">
              <CardHeader className="border-b border-border">
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  Order Summary
                  {seasonalTag !== "regular" && (
                    <SeasonalBadge seasonalTag={seasonalTag} />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="space-y-1">
                  <label className="text-xs text-muted-foreground">Seasonal</label>
                  <Select
                    value={seasonalTag}
                    onValueChange={(v) => setSeasonalTag(v as SeasonalTag)}
                  >
                    <SelectTrigger className="h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="regular">Regular</SelectItem>
                      <SelectItem value="valentine">Valentine +8%</SelectItem>
                      <SelectItem value="christmas">Christmas +10%</SelectItem>
                      <SelectItem value="dashain-tihar">Dashain / Tihar +12%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-foreground">
                    {formatNPR(breakdown.basePriceNPR)}
                  </span>
                </div>
                {breakdown.discountTotalNPR > 0 && (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-500">
                    <span>Reward discount</span>
                    <span>−{formatNPR(breakdown.discountTotalNPR)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">VAT (13%)</span>
                  <span className="font-medium">{formatNPR(breakdown.vatAmountNPR)}</span>
                </div>
                <div className="flex justify-between font-semibold pt-1">
                  <span>Total</span>
                  <AnimatedPrice
                    amount={breakdown.finalTotalNPR}
                    className="text-primary"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setBreakdownOpen(true)}
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                >
                  View breakdown
                </button>
                {rewardPoints > 0 && (
                  <div className="space-y-1">
                    <label className="text-xs text-muted-foreground">Use reward points (max 30%)</label>
                    <input
                      type="number"
                      min={0}
                      max={Math.min(rewardPoints, maxRedeemablePoints)}
                      value={rewardPointsToUse}
                      onChange={(e) =>
                        setRewardPointsToUse(
                          Math.min(
                            parseInt(e.target.value, 10) || 0,
                            rewardPoints,
                            maxRedeemablePoints
                          )
                        )
                      }
                      className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Est. ready in ~{prepTime} min</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Gift className="w-4 h-4 text-[#C89B3C]" />
                  <span>+{rewardPts} reward points</span>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    className="relative overflow-hidden w-full px-6 py-4 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 hover:opacity-95 group"
                  >
                    <span className="relative z-10">Place Order</span>
                    <span className="absolute inset-0 bg-foreground/10 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  </button>
                </div>
                <Link
                  href="/dashboard/menu"
                  className="block text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Continue shopping
                </Link>
              </CardContent>
            </Card>
          </motion.aside>
        )}
      </div>

      {/* Empty state when no cart and no orders */}
      {items.length === 0 && orders.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <Card className="rounded-2xl shadow-dashboard border-border max-w-lg mx-auto overflow-hidden border-2 border-primary/10">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-foreground mb-2">
                No orders yet
              </h3>
              <p className="text-muted-foreground mb-2 max-w-sm mx-auto">
                Add items from the menu or seasonal specials, then come back here to place your order and earn reward points.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                You can also redeem points at checkout for a discount.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/dashboard/menu"
                  className="relative overflow-hidden inline-flex px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:opacity-95 group rounded-xl"
                >
                  <span className="relative z-10">Browse Menu</span>
                </Link>
                <Link
                  href="/dashboard/seasonal"
                  className="inline-flex px-6 py-3 border-2 border-primary text-primary text-sm font-semibold uppercase tracking-widest rounded-xl hover:bg-primary/10 transition-colors"
                >
                  Seasonal Specials
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
      {items.length > 0 && (
        <PriceBreakdownModal
          open={breakdownOpen}
          onOpenChange={setBreakdownOpen}
          breakdown={breakdown}
          title="Order price breakdown"
        />
      )}
    </div>
  )
}
