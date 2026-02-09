/**
 * Occupancy prediction – weights, seasonal modifiers, fallback.
 */

export const WEIGHTS = {
  historical: 0.4,
  currentBooking: 0.3,
  seasonalModifier: 0.2,
  membershipTrend: 0.1,
} as const

/** Additive percentage boosts by event (e.g. +20 = add 20% to base). */
export const SEASONAL_MODIFIERS = {
  valentine: { evening: 20 },
  dashain_tihar: { family: 30 },
  weekend: { general: 15 },
  live_singer: { groundFloor: 25 },
} as const

export const FALLBACK_OCCUPANCY = 30

/** Hours considered "evening" for Valentine / live singer boost (17–22). */
export const EVENING_HOURS_START = 17
export const EVENING_HOURS_END = 22

/** Business hours for conference (9–17). */
export const CONFERENCE_HOURS_START = 9
export const CONFERENCE_HOURS_END = 17

/** Heat map thresholds: 0–40 low, 40–70 medium, 70–100 high. */
export const DEMAND_LOW_MAX = 40
export const DEMAND_MEDIUM_MAX = 70
