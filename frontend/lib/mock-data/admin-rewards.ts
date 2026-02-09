/**
 * Admin rewards config: points per product, redemption rules, loyalty tiers.
 */

export interface RedemptionRule {
  id: string
  pointsRequired: number
  rewardDescription: string
  productId?: string
}

export interface LoyaltyTier {
  id: string
  name: string
  pointsThreshold: number
  multiplier: number // e.g. 1.1 = 10% bonus points
}

export const defaultRedemptionRules: RedemptionRule[] = [
  { id: "r1", pointsRequired: 50, rewardDescription: "Free cookie" },
  { id: "r2", pointsRequired: 100, rewardDescription: "Free pastry" },
  { id: "r3", pointsRequired: 200, rewardDescription: "Free drink" },
]

export const defaultLoyaltyTiers: LoyaltyTier[] = [
  { id: "bronze", name: "Bronze", pointsThreshold: 0, multiplier: 1 },
  { id: "silver", name: "Silver", pointsThreshold: 500, multiplier: 1.1 },
  { id: "gold", name: "Gold", pointsThreshold: 1500, multiplier: 1.25 },
]
