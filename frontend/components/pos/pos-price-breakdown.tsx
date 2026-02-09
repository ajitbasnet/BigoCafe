"use client"

import { motion } from "framer-motion"
import { formatNPR } from "@/lib/pricing/format"
import type { POSPriceBreakdown } from "@/lib/pos/types"
import { MembershipBadge } from "./membership-badge"
import type { MembershipTier } from "@/lib/pos/types"
import { cn } from "@/lib/utils"

export interface POSPriceBreakdownProps {
  breakdown: POSPriceBreakdown
  membershipTier: MembershipTier
  /** Show membership badge next to title */
  showBadge?: boolean
  /** Highlight total with animation when value changes */
  animateTotal?: boolean
  className?: string
}

export function POSPriceBreakdownCard({
  breakdown,
  membershipTier,
  showBadge = true,
  animateTotal = true,
  className,
}: POSPriceBreakdownProps) {
  const totalDiscount =
    breakdown.membershipDiscountNPR + breakdown.bookingDiscountNPR + breakdown.rewardDiscountNPR
  const hasSavings = totalDiscount > 0

  return (
    <div className={cn("rounded-xl border border-border bg-card p-4 space-y-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-foreground">Price breakdown</span>
        {showBadge && <MembershipBadge tier={membershipTier} short />}
      </div>

      <div className="space-y-1.5 text-sm">
        <Row label="Products" value={breakdown.productSubtotalNPR} />
        {breakdown.bookingSubtotalNPR > 0 && (
          <Row label="Booking" value={breakdown.bookingSubtotalNPR} />
        )}
        {breakdown.customizationSubtotalNPR > 0 && (
          <Row label="Customization" value={breakdown.customizationSubtotalNPR} />
        )}
        {breakdown.membershipDiscountNPR > 0 && (
          <Row label="Membership discount" value={-breakdown.membershipDiscountNPR} highlight />
        )}
        {breakdown.bookingDiscountNPR > 0 && (
          <Row label="Booking discount" value={-breakdown.bookingDiscountNPR} highlight />
        )}
        {breakdown.rewardDiscountNPR > 0 && (
          <Row label="Reward redemption" value={-breakdown.rewardDiscountNPR} highlight />
        )}
        <Row label="VAT (13%)" value={breakdown.vatAmountNPR} />
      </div>

      {hasSavings && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-green-600 dark:text-green-400"
        >
          You save {formatNPR(totalDiscount)}
        </motion.p>
      )}

      <div className="border-t border-border pt-2 flex items-center justify-between">
        <span className="font-semibold text-foreground">Total</span>
        {animateTotal ? (
          <motion.span
            key={breakdown.finalTotalNPR}
            initial={{ opacity: 0.7, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            className="font-semibold text-primary"
          >
            {formatNPR(breakdown.finalTotalNPR)}
          </motion.span>
        ) : (
          <span className="font-semibold text-primary">{formatNPR(breakdown.finalTotalNPR)}</span>
        )}
      </div>

      {breakdown.rewardPointsEarned > 0 && (
        <p className="text-xs text-muted-foreground">
          +{breakdown.rewardPointsEarned} reward points on this order
        </p>
      )}
    </div>
  )
}

function Row({
  label,
  value,
  highlight,
}: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={highlight ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
        {label}
      </span>
      <span className={highlight ? "text-green-600 dark:text-green-400" : "text-foreground"}>
        {value < 0 ? `-${formatNPR(-value)}` : formatNPR(value)}
      </span>
    </div>
  )
}
