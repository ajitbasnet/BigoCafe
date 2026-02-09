import { create } from "zustand"
import type { RedemptionRule, LoyaltyTier } from "@/lib/mock-data/admin-rewards"
import {
  defaultRedemptionRules,
  defaultLoyaltyTiers,
} from "@/lib/mock-data/admin-rewards"

interface AdminRewardsState {
  defaultPointsPerOrder: number
  redemptionRules: RedemptionRule[]
  loyaltyTiers: LoyaltyTier[]
  seasonalBonusMultiplier: number
  setDefaultPointsPerOrder: (v: number) => void
  setRedemptionRules: (rules: RedemptionRule[]) => void
  addRedemptionRule: (rule: Omit<RedemptionRule, "id">) => void
  updateRedemptionRule: (id: string, data: Partial<RedemptionRule>) => void
  removeRedemptionRule: (id: string) => void
  setLoyaltyTiers: (tiers: LoyaltyTier[]) => void
  setSeasonalBonusMultiplier: (v: number) => void
}

function genId() {
  return `rw-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`
}

export const useAdminRewardsStore = create<AdminRewardsState>((set) => ({
  defaultPointsPerOrder: 5,
  redemptionRules: defaultRedemptionRules,
  loyaltyTiers: defaultLoyaltyTiers,
  seasonalBonusMultiplier: 1.2,

  setDefaultPointsPerOrder: (v) => set({ defaultPointsPerOrder: v }),

  setRedemptionRules: (rules) => set({ redemptionRules: rules }),

  addRedemptionRule: (rule) =>
    set((s) => ({
      redemptionRules: [...s.redemptionRules, { ...rule, id: genId() }],
    })),

  updateRedemptionRule: (id, data) =>
    set((s) => ({
      redemptionRules: s.redemptionRules.map((r) =>
        r.id === id ? { ...r, ...data } : r
      ),
    })),

  removeRedemptionRule: (id) =>
    set((s) => ({
      redemptionRules: s.redemptionRules.filter((r) => r.id !== id),
    })),

  setLoyaltyTiers: (tiers) => set({ loyaltyTiers: tiers }),

  setSeasonalBonusMultiplier: (v) => set({ seasonalBonusMultiplier: v }),
}))
