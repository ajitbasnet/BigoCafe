/**
 * Membership discount: food/drink, cake, and booking rates by tier.
 */

import { MEMBERSHIP_RATES } from "./constants"
import type { MembershipTier } from "./types"

/**
 * Apply membership discount on product subtotals.
 * Returns total membership discount (food/drink portion + cake portion).
 */
export function applyMembershipDiscount(params: {
  foodDrinkSubtotalNPR: number
  cakeSubtotalNPR: number
  membershipTier: MembershipTier
}): number {
  const { foodDrinkSubtotalNPR, cakeSubtotalNPR, membershipTier } = params
  const rates = MEMBERSHIP_RATES[membershipTier]
  const foodDrinkDiscount = foodDrinkSubtotalNPR * rates.foodDrinkRate
  const cakeDiscount = cakeSubtotalNPR * rates.cakeRate
  return Math.round(foodDrinkDiscount + cakeDiscount)
}

/**
 * Membership discount on booking price only.
 * Booking Discount = Booking Price × Membership Booking Rate
 */
export function getMembershipBookingDiscount(bookingPriceNPR: number, membershipTier: MembershipTier): number {
  if (bookingPriceNPR <= 0) return 0
  const rate = MEMBERSHIP_RATES[membershipTier].bookingRate
  return Math.round(bookingPriceNPR * rate)
}

/**
 * Reward earn multiplier for this tier (e.g. 1.05 for Silver).
 */
export function getRewardEarnMultiplier(membershipTier: MembershipTier): number {
  return MEMBERSHIP_RATES[membershipTier].rewardEarnMultiplier
}
