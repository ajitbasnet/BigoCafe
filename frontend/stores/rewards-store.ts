import { create } from "zustand"

const MILESTONE_INTERVAL = 100

interface RewardsStore {
  rewardPoints: number
  lifetimePoints: number
  getNextMilestone: () => number
  getProgressToNextMilestone: () => number
  addPoints: (points: number) => void
  deductPoints: (points: number) => void
}

export const useRewardsStore = create<RewardsStore>((set, get) => ({
  rewardPoints: 245,
  lifetimePoints: 1250,

  getNextMilestone: () => {
    const { rewardPoints } = get()
    return Math.ceil((rewardPoints + 1) / MILESTONE_INTERVAL) * MILESTONE_INTERVAL
  },

  getProgressToNextMilestone: () => {
    const { rewardPoints } = get()
    const next = get().getNextMilestone()
    const prev = next - MILESTONE_INTERVAL
    return ((rewardPoints - prev) / (next - prev)) * 100
  },

  addPoints: (points) => {
    set((state) => ({
      rewardPoints: state.rewardPoints + points,
      lifetimePoints: state.lifetimePoints + points,
    }))
  },

  deductPoints: (points) => {
    set((state) => ({
      rewardPoints: Math.max(0, state.rewardPoints - points),
    }))
  },
}))
