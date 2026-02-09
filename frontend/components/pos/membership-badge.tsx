"use client"

import type { MembershipTier } from "@/lib/pos/types"
import { cn } from "@/lib/utils"

const TIER_CONFIG: Record<MembershipTier, { label: string; short: string; className: string }> = {
  standard: { label: "Standard", short: "Standard", className: "bg-muted text-muted-foreground" },
  silver: { label: "Silver Member", short: "Silver", className: "bg-slate-200 text-slate-800 border border-slate-300" },
  gold: { label: "Gold Member", short: "Gold", className: "bg-[#C89B3C]/20 text-[#B8860B] border border-[#C89B3C]/50" },
  platinum: { label: "Platinum Member", short: "Platinum", className: "bg-slate-400/25 text-slate-700 border border-slate-400/50" },
}

interface MembershipBadgeProps {
  tier: MembershipTier
  short?: boolean
  className?: string
}

export function MembershipBadge({ tier, short = false, className }: MembershipBadgeProps) {
  const config = TIER_CONFIG[tier]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        config.className,
        className
      )}
      title={config.label}
    >
      {short ? config.short : config.label}
    </span>
  )
}
