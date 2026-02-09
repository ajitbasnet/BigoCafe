"use client"

import type { SeasonalTag } from "@/lib/pricing/types"
import { SEASONAL_MODIFIER } from "@/lib/pricing/npr-config"

const SEASONAL_LABELS: Record<Exclude<SeasonalTag, "regular">, string> = {
  valentine: "Valentine +8%",
  christmas: "Christmas +10%",
  "dashain-tihar": "Dashain / Tihar +12%",
}

interface SeasonalBadgeProps {
  seasonalTag: SeasonalTag
  className?: string
}

export function SeasonalBadge({ seasonalTag, className = "" }: SeasonalBadgeProps) {
  if (seasonalTag === "regular") return null
  const label = SEASONAL_LABELS[seasonalTag]
  const mult = SEASONAL_MODIFIER[seasonalTag] ?? 1
  const pct = Math.round((mult - 1) * 100)
  return (
    <span
      className={`inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ${className}`}
      title={`Seasonal modifier: +${pct}%`}
    >
      {label ?? `+${pct}%`}
    </span>
  )
}
