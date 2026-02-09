/**
 * Input/output types for the NPR pricing engine.
 */

export type SeasonalTag = "valentine" | "christmas" | "dashain-tihar" | "regular"

export type DrinkSizeKey = "small" | "medium" | "large"

/** Input state for cake price calculation (aligns with cake-builder-store) */
export interface CakePricingState {
  sizeId: string | null
  customPounds: number
  flavorId: string | null
  creamIds: string[]
  baseLayers: "1" | "2" | "3"
  extraLayerCount: number
  designId: string | null
}

/** Input state for drink price calculation */
export interface DrinkPricingState {
  drinkId: string
  milkId: string
  addOnIds: string[]
  sizeKey: DrinkSizeKey
  quantity?: number
}

/** Input state for pastry box price calculation */
export interface PastryBoxPricingState {
  boxSizeId: string
  premiumCount: number
  /** Total pieces (for validation) */
  pieceCount: number
}

/** Per-product or cart-level price breakdown for UI */
export interface PriceBreakdown {
  basePriceNPR: number
  addOnsTotalNPR: number
  /** Seasonal uplift amount (0 if regular) */
  seasonalAmountNPR?: number
  /** Subtotal after seasonal, before reward */
  subtotalAfterSeasonalNPR?: number
  discountTotalNPR: number
  subtotalAfterDiscountNPR: number
  vatAmountNPR: number
  finalTotalNPR: number
}

/** Result of applyRewardDiscount */
export interface RewardDiscountResult {
  discountedSubtotal: number
  discountAmount: number
}

/** Params for calculateFinalTotal (cart-level) */
export interface FinalTotalParams {
  subtotalNPR: number
  seasonalTag: SeasonalTag
  rewardPointsUsed: number
}
