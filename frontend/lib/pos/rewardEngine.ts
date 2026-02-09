/**
 * Reward earning (1 NPR = 0.5 pts × membership boost) and redemption (1 pt = Rs. 5, max 30%).
 */

import {
  REWARD_POINTS_PER_NPR,
  REWARD_RUPEE_PER_POINT,
  REWARD_MAX_DISCOUNT_FRACTION,
} from "./constants"
import { getRewardEarnMultiplier } from "./membershipPricingEngine"
import type { MembershipTier } from "./types"

/**
 * Reward points earned from an amount spent (after discounts, before VAT).
 * 1 NPR = 0.5 base points; membership multiplier applied.
 */
export function calculateRewardEarned(nprSpent: number, membershipTier: MembershipTier): number {
  if (nprSpent <= 0) return 0
  const base = nprSpent * REWARD_POINTS_PER_NPR
  const multiplier = getRewardEarnMultiplier(membershipTier)
  return Math.floor(base * multiplier)
}

/**
 * Reward redemption: discount from points used.
 * 1 point = Rs. 5; max discount = 30% of subtotal (after other discounts).
 * Returns discount amount (NPR), clamped so total never goes negative.
 */
export function applyRewardRedemption(params: {
  rewardPointsUsed: number
  subtotalAfterOtherDiscountsNPR: number
}): number {
  const { rewardPointsUsed, subtotalAfterOtherDiscountsNPR } = params
  if (rewardPointsUsed <= 0 || subtotalAfterOtherDiscountsNPR <= 0) return 0
  const byPoints = rewardPointsUsed * REWARD_RUPEE_PER_POINT
  const maxDiscount = Math.floor(subtotalAfterOtherDiscountsNPR * REWARD_MAX_DISCOUNT_FRACTION)
  return Math.min(byPoints, maxDiscount, subtotalAfterOtherDiscountsNPR)
}

/**
 * Max redeemable points for a given subtotal (after other discounts).
 */
export function getMaxRedeemablePoints(subtotalAfterOtherDiscountsNPR: number): number {
  if (subtotalAfterOtherDiscountsNPR <= 0) return 0
  const maxDiscountNPR = Math.floor(subtotalAfterOtherDiscountsNPR * REWARD_MAX_DISCOUNT_FRACTION)
  return Math.floor(maxDiscountNPR / REWARD_RUPEE_PER_POINT)
}
