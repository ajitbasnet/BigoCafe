/**
 * Cart-level NPR pricing: subtotal + seasonal + reward discount + VAT.
 */

import { calculateFinalTotal } from "./calculator"
import type { SeasonalTag } from "./types"

export interface CartPricingParams {
  subtotalNPR: number
  seasonalTag: SeasonalTag
  rewardPointsUsed: number
}

/**
 * Returns full price breakdown for the cart.
 */
export function getCartPricing(params: CartPricingParams) {
  return calculateFinalTotal({
    subtotalNPR: params.subtotalNPR,
    seasonalTag: params.seasonalTag,
    rewardPointsUsed: params.rewardPointsUsed,
  })
}
