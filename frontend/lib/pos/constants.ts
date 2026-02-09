/**
 * POS engine constants: membership rates, booking fees, reward rules, VAT.
 */

import type { MembershipTier } from "./types"

/** Discount rates per tier (fraction 0–1). */
export const MEMBERSHIP_RATES: Record<MembershipTier, { foodDrinkRate: number; cakeRate: number; bookingRate: number; rewardEarnMultiplier: number }> = {
  standard: { foodDrinkRate: 0, cakeRate: 0, bookingRate: 0, rewardEarnMultiplier: 1 },
  silver: { foodDrinkRate: 0.05, cakeRate: 0.03, bookingRate: 0.05, rewardEarnMultiplier: 1.05 },
  gold: { foodDrinkRate: 0.1, cakeRate: 0.08, bookingRate: 0.12, rewardEarnMultiplier: 1.1 },
  platinum: { foodDrinkRate: 0.15, cakeRate: 0.12, bookingRate: 0.18, rewardEarnMultiplier: 1.15 },
}

/** Standard table reservation fee (NPR). */
export const BOOKING_FEE_STANDARD_NPR = 500

/** Gold Nature Lounge reservation fee (NPR). */
export const BOOKING_FEE_GOLD_LOUNGE_NPR = 1200

/** Conference room price per hour (NPR). */
export const BOOKING_CONFERENCE_SMALL_PER_HOUR_NPR = 3500
export const BOOKING_CONFERENCE_LARGE_PER_HOUR_NPR = 6500

/** Reward: 1 NPR spent = base points (before membership boost). */
export const REWARD_POINTS_PER_NPR = 0.5

/** 1 reward point = Rs. 5. */
export const REWARD_RUPEE_PER_POINT = 5

/** Max redemption = 30% of order total (after other discounts, before VAT). */
export const REWARD_MAX_DISCOUNT_FRACTION = 0.3

/** Nepal VAT. */
export const VAT_RATE = 0.13
