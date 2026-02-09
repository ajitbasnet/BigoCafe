import { create } from "zustand"
import type { MembershipTier } from "@/lib/pos/types"

export type MembershipLevel = MembershipTier

interface MembershipState {
  membershipLevel: MembershipLevel
  setMembershipLevel: (level: MembershipLevel) => void
  isGold: () => boolean
  isPlatinum: () => boolean
  isGoldOrPlatinum: () => boolean
  getTier: () => MembershipTier
}

export const useMembershipStore = create<MembershipState>((set, get) => ({
  membershipLevel: "standard",

  setMembershipLevel: (level) => set({ membershipLevel: level }),

  isGold: () => get().membershipLevel === "gold",

  isPlatinum: () => get().membershipLevel === "platinum",

  isGoldOrPlatinum: () => {
    const tier = get().membershipLevel
    return tier === "gold" || tier === "platinum"
  },

  getTier: () => get().membershipLevel,
}))
