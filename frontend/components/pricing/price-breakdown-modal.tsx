"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatNPR } from "@/lib/pricing/format"
import type { PriceBreakdown } from "@/lib/pricing/types"

interface PriceBreakdownModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  breakdown: PriceBreakdown
  title?: string
}

export function PriceBreakdownModal({
  open,
  onOpenChange,
  breakdown,
  title = "Price breakdown",
}: PriceBreakdownModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm" aria-describedby="price-breakdown-desc">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div id="price-breakdown-desc" className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatNPR(breakdown.basePriceNPR)}</span>
          </div>
          {breakdown.addOnsTotalNPR > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Add-ons</span>
              <span>{formatNPR(breakdown.addOnsTotalNPR)}</span>
            </div>
          )}
          {breakdown.seasonalAmountNPR != null && breakdown.seasonalAmountNPR > 0 && (
            <div className="flex justify-between text-muted-foreground">
              <span>Seasonal</span>
              <span>+{formatNPR(breakdown.seasonalAmountNPR)}</span>
            </div>
          )}
          {breakdown.discountTotalNPR > 0 && (
            <div className="flex justify-between text-green-600 dark:text-green-500">
              <span>Reward discount</span>
              <span>−{formatNPR(breakdown.discountTotalNPR)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">VAT (13%)</span>
            <span>{formatNPR(breakdown.vatAmountNPR)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t border-border">
            <span>Total</span>
            <span className="text-primary">{formatNPR(breakdown.finalTotalNPR)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
