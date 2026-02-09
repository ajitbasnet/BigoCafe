"use client"

import { useState } from "react"
import { PriceBreakdownModal } from "@/components/pricing/price-breakdown-modal"
import { AnimatedPrice } from "@/components/pricing/animated-price"
import { SeasonalBadge } from "@/components/pricing/seasonal-badge"
import { useRouter } from "next/navigation"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Trash2 } from "lucide-react"
import { useCartStore } from "@/stores/cart-store"
import { useOrderStore } from "@/stores/order-store"
import { useRewardsStore } from "@/stores/rewards-store"
import { useMembershipStore } from "@/stores/membership-store"
import Link from "next/link"
import { formatNPR } from "@/lib/pricing/format"
import { REWARD_RUPEE_PER_POINT, REWARD_MAX_DISCOUNT_FRACTION } from "@/lib/pricing/npr-config"
import type { SeasonalTag } from "@/lib/pricing/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePosPricing } from "@/hooks/use-pos-pricing"
import { MembershipBadge } from "@/components/pos"
import type { PriceBreakdown } from "@/lib/pricing/types"

export function CartSheet() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
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
  const membershipTier = useMembershipStore((s) => s.getTier())
  const [breakdownOpen, setBreakdownOpen] = useState(false)
  const placeOrder = useOrderStore((s) => s.placeOrder)
  const addPoints = useRewardsStore((s) => s.addPoints)
  const deductPoints = useRewardsStore((s) => s.deductPoints)
  const rewardPoints = useRewardsStore((s) => s.rewardPoints)

  const subtotal = getTotal()
  const standardBreakdown = getCartBreakdown()
  const posPricing = usePosPricing({
    cartItems: items,
    membershipTier,
    rewardPointsUsed: rewardPointsToUse,
  })
  const usePos = membershipTier !== "standard"
  const breakdown: PriceBreakdown = usePos
    ? {
        basePriceNPR: posPricing.breakdown.productSubtotalNPR,
        addOnsTotalNPR: posPricing.breakdown.customizationSubtotalNPR + posPricing.breakdown.bookingSubtotalNPR,
        discountTotalNPR: posPricing.breakdown.membershipDiscountNPR + posPricing.breakdown.bookingDiscountNPR + posPricing.breakdown.rewardDiscountNPR,
        subtotalAfterDiscountNPR: posPricing.breakdown.subtotalAfterDiscountsNPR,
        vatAmountNPR: posPricing.breakdown.vatAmountNPR,
        finalTotalNPR: posPricing.breakdown.finalTotalNPR,
      }
    : standardBreakdown
  const prepTime = getTotalPreparationTime()
  const rewardPts = usePos ? posPricing.breakdown.rewardPointsEarned : getTotalRewardPoints()
  const maxRedeemablePoints = usePos
    ? posPricing.maxRedeemablePoints
    : subtotal > 0
      ? Math.floor(
          (standardBreakdown.subtotalAfterSeasonalNPR ?? subtotal) *
            REWARD_MAX_DISCOUNT_FRACTION /
            REWARD_RUPEE_PER_POINT
        )
      : 0

  const handlePlaceOrder = () => {
    placeOrder(items, null, breakdown.finalTotalNPR, prepTime, rewardPts)
    addPoints(rewardPts)
    if (rewardPointsToUse > 0) deductPoints(rewardPointsToUse)
    clearCart()
    setOpen(false)
    router.push("/dashboard/orders")
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`Cart with ${items.length} items`}
        >
          <ShoppingCart className="w-5 h-5" />
          {items.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent data-theme="bigo-dashboard" className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 flex-wrap">
            Your Cart
            {seasonalTag !== "regular" && (
              <SeasonalBadge seasonalTag={seasonalTag} />
            )}
            {usePos && <MembershipBadge tier={membershipTier} short />}
          </SheetTitle>
        </SheetHeader>
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link
              href="/dashboard/menu"
              onClick={() => setOpen(false)}
              className="relative overflow-hidden inline-flex px-6 py-3 border border-primary text-primary text-sm uppercase tracking-widest transition-all duration-300 hover:text-primary-foreground group"
            >
              <span className="relative z-10">Browse Menu</span>
              <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </Link>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 py-4 -mx-6 px-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">
                        {item.name}
                      </p>
                      {item.customization && (
                        <p className="text-xs text-muted-foreground">
                          {item.customization.temperature},{" "}
                          {item.customization.milkType}
                          {item.customization.addOns.length > 0 &&
                            `, +${item.customization.addOns.length} add-ons`}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          −
                        </Button>
                        <span className="text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">
                        {formatNPR(item.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive h-8"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-1">
                <Label className="text-xs">Seasonal</Label>
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
                <span className="font-medium">{formatNPR(breakdown.basePriceNPR)}</span>
              </div>
              {usePos && posPricing.breakdown.membershipDiscountNPR > 0 && (
                <div className="flex justify-between text-sm text-green-600 dark:text-green-500">
                  <span>Membership discount</span>
                  <span>−{formatNPR(posPricing.breakdown.membershipDiscountNPR)}</span>
                </div>
              )}
              {breakdown.seasonalAmountNPR != null && breakdown.seasonalAmountNPR > 0 && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Seasonal</span>
                  <span>+{formatNPR(breakdown.seasonalAmountNPR)}</span>
                </div>
              )}
              {breakdown.discountTotalNPR > 0 && (
                <div className="flex justify-between text-sm text-green-600 dark:text-green-500">
                  <span>{usePos ? "Reward / discounts" : "Reward discount"}</span>
                  <span>−{formatNPR(breakdown.discountTotalNPR)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">VAT (13%)</span>
                <span className="font-medium">{formatNPR(breakdown.vatAmountNPR)}</span>
              </div>
              <div className="flex justify-between font-semibold">
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
                  <Label htmlFor="reward-points" className="text-xs">
                    Use reward points (max 30%)
                  </Label>
                  <Input
                    id="reward-points"
                    type="number"
                    min={0}
                    max={Math.min(rewardPoints, maxRedeemablePoints)}
                    value={rewardPointsToUse}
                    onChange={(e) => {
                      const v = parseInt(e.target.value, 10) || 0
                      setRewardPointsToUse(
                        Math.min(v, rewardPoints, maxRedeemablePoints)
                      )
                    }}
                    className="h-9"
                  />
                  {rewardPointsToUse > 0 && (
                    <p className="text-xs text-green-600 dark:text-green-500">
                      You save {formatNPR(breakdown.discountTotalNPR)}
                    </p>
                  )}
                </div>
              )}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>~{prepTime} min • +{rewardPts} pts</span>
              </div>
              <button
                type="button"
                className="relative overflow-hidden w-full px-6 py-3 border-2 border-primary text-primary text-sm font-medium uppercase tracking-widest transition-all duration-300 hover:text-primary-foreground group"
                onClick={handlePlaceOrder}
              >
                <span className="relative z-10">Place Order</span>
                <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            </div>
          </>
        )}
      </SheetContent>
      <PriceBreakdownModal
        open={breakdownOpen}
        onOpenChange={setBreakdownOpen}
        breakdown={breakdown}
        title="Cart price breakdown"
      />
    </Sheet>
  )
}
