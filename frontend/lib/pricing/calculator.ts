/**
 * NPR pricing engine: pure calculator functions.
 */

import type {
  CakePricingState,
  DrinkPricingState,
  PastryBoxPricingState,
  PriceBreakdown,
  RewardDiscountResult,
  FinalTotalParams,
  SeasonalTag,
} from "./types"
import {
  CAKE_SIZE_BASE_NPR,
  CAKE_CUSTOM_PRICE_PER_POUND_NPR,
  CAKE_FLAVOR_PREMIUM_NPR,
  CAKE_FLAVOR_PREMIUM_DEFAULT_NPR,
  CAKE_CREAM_NPR,
  CAKE_EXTRA_LAYER_NPR,
  CAKE_DESIGN_NPR,
  DRINK_BASE_NPR,
  DRINK_MILK_NPR,
  DRINK_ADDON_NPR,
  DRINK_SIZE_MULTIPLIER,
  PASTRY_BOX_BASE_NPR,
  PASTRY_BOX_PREMIUM_PER_PIECE_NPR,
  SEASONAL_MODIFIER,
  REWARD_RUPEE_PER_POINT,
  REWARD_MAX_DISCOUNT_FRACTION,
  VAT_RATE,
} from "./npr-config"

/** Tier multiplier for base cake price (1 layer = 1, 2 = 1.5, 3 = 2) */
function getTierMultiplier(baseLayers: "1" | "2" | "3"): number {
  return baseLayers === "1" ? 1 : baseLayers === "2" ? 1.5 : 2
}

/**
 * Cake subtotal in NPR (before VAT/reward/seasonal).
 */
export function calculateCakePriceNPR(state: CakePricingState): number {
  const {
    sizeId,
    customPounds,
    flavorId,
    creamIds,
    baseLayers,
    extraLayerCount,
    designId,
  } = state

  let baseSize = 0
  if (sizeId && sizeId !== "custom") {
    baseSize = CAKE_SIZE_BASE_NPR[sizeId] ?? CAKE_SIZE_BASE_NPR["1lb"]
  } else {
    baseSize = CAKE_CUSTOM_PRICE_PER_POUND_NPR * Math.max(1, Math.min(5, customPounds))
  }

  const tierMult = getTierMultiplier(baseLayers)
  const sizeTotal = baseSize * tierMult

  const flavorPremium =
    (flavorId && (CAKE_FLAVOR_PREMIUM_NPR[flavorId] ?? CAKE_FLAVOR_PREMIUM_DEFAULT_NPR)) || 0

  const creamTotal = (creamIds || []).reduce(
    (sum, id) => sum + (CAKE_CREAM_NPR[id] ?? 0),
    0
  )

  const extraLayerTotal = Math.max(0, Math.min(3, extraLayerCount)) * CAKE_EXTRA_LAYER_NPR

  const designPrice = designId ? (CAKE_DESIGN_NPR[designId] ?? 0) : 0

  return Math.round(
    sizeTotal + flavorPremium + creamTotal + extraLayerTotal + designPrice
  )
}

/**
 * Drink subtotal in NPR (before VAT/reward/seasonal).
 * quantity defaults to 1.
 */
export function calculateDrinkPriceNPR(state: DrinkPricingState): number {
  const { drinkId, milkId, addOnIds, sizeKey, quantity = 1 } = state
  const base = DRINK_BASE_NPR[drinkId] ?? 0
  const milk = DRINK_MILK_NPR[milkId] ?? 0
  const addOnTotal = (addOnIds || []).reduce(
    (sum, id) => sum + (DRINK_ADDON_NPR[id] ?? 0),
    0
  )
  const multiplier = DRINK_SIZE_MULTIPLIER[sizeKey] ?? 1
  const oneTotal = (base + milk + addOnTotal) * multiplier
  return Math.round(oneTotal * quantity)
}

/**
 * Pastry box subtotal in NPR.
 * Box base by size + premium per piece × premiumCount.
 */
export function calculatePastryBoxPriceNPR(state: PastryBoxPricingState): number {
  const { boxSizeId, premiumCount } = state
  const base = PASTRY_BOX_BASE_NPR[boxSizeId] ?? PASTRY_BOX_BASE_NPR["3"]
  const premiumTotal = Math.max(0, premiumCount) * PASTRY_BOX_PREMIUM_PER_PIECE_NPR
  return Math.round(base + premiumTotal)
}

/**
 * Apply seasonal modifier to subtotal.
 */
export function applySeasonalModifier(subtotalNPR: number, seasonalTag: SeasonalTag): number {
  const mult = SEASONAL_MODIFIER[seasonalTag] ?? 1
  return Math.round(subtotalNPR * mult)
}

/**
 * Apply reward discount. Cap at 30% of subtotal and by points × 5.
 */
export function applyRewardDiscount(
  subtotalNPR: number,
  rewardPointsUsed: number
): RewardDiscountResult {
  const maxByPoints = rewardPointsUsed * REWARD_RUPEE_PER_POINT
  const maxByFraction = subtotalNPR * REWARD_MAX_DISCOUNT_FRACTION
  const discountAmount = Math.min(maxByPoints, maxByFraction, Math.max(0, subtotalNPR))
  const discountedSubtotal = Math.max(0, subtotalNPR - discountAmount)
  return { discountedSubtotal, discountAmount }
}

/**
 * VAT 13% on amount.
 */
export function calculateVAT(subtotalAfterDiscountNPR: number): number {
  return Math.round(subtotalAfterDiscountNPR * VAT_RATE)
}

/**
 * Full cart-level final total: seasonal → reward → VAT.
 */
export function calculateFinalTotal(params: FinalTotalParams): PriceBreakdown {
  const { subtotalNPR, seasonalTag, rewardPointsUsed } = params
  const seasonalMult = SEASONAL_MODIFIER[seasonalTag] ?? 1
  const subtotalAfterSeasonal = Math.round(subtotalNPR * seasonalMult)
  const seasonalAmountNPR = subtotalAfterSeasonal - subtotalNPR

  const { discountedSubtotal, discountAmount } = applyRewardDiscount(
    subtotalAfterSeasonal,
    rewardPointsUsed
  )
  const vatAmountNPR = calculateVAT(discountedSubtotal)
  const finalTotalNPR = Math.max(0, discountedSubtotal + vatAmountNPR)

  return {
    basePriceNPR: subtotalNPR,
    addOnsTotalNPR: 0,
    seasonalAmountNPR: seasonalTag === "regular" ? 0 : seasonalAmountNPR,
    subtotalAfterSeasonalNPR: subtotalAfterSeasonal,
    discountTotalNPR: discountAmount,
    subtotalAfterDiscountNPR: discountedSubtotal,
    vatAmountNPR,
    finalTotalNPR,
  }
}

/**
 * Estimate preparation time for display.
 */
export function estimatePreparationTimeNPR(
  productType: "cake" | "drink" | "pastry",
  state: Partial<CakePricingState> & { designId?: string | null }
): string {
  if (productType === "cake") {
    const baseLayers = state.baseLayers ?? "1"
    const extraLayerCount = state.extraLayerCount ?? 0
    const designId = state.designId
    const tiers = baseLayers === "1" ? 1 : baseLayers === "2" ? 2 : 3
    const totalLayers = tiers + extraLayerCount
    const isWeddingOrLuxury = designId === "d4" || designId === "custom"
    if (totalLayers >= 4 || isWeddingOrLuxury) return "36 hours"
    if (totalLayers >= 2 || isWeddingOrLuxury) return "24 hours"
    return "6 hours"
  }
  if (productType === "drink") return "5–8 min"
  if (productType === "pastry") return "15–30 min"
  return "—"
}
