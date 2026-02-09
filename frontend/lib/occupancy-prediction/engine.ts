/**
 * Occupancy prediction engine – weighted simulation (no backend ML).
 */

import {
  WEIGHTS,
  FALLBACK_OCCUPANCY,
  SEASONAL_MODIFIERS,
  EVENING_HOURS_START,
  EVENING_HOURS_END,
  CONFERENCE_HOURS_START,
  CONFERENCE_HOURS_END,
  DEMAND_LOW_MAX,
  DEMAND_MEDIUM_MAX,
} from "./constants"
import { getEventForDate } from "./mock-data"
import type {
  TableOccupancyHistoryEntry,
  CurrentBooking,
  HourlyPrediction,
  PeakHourResult,
  FloorDemand,
  PredictionOutput,
} from "./types"
import type { FloorId } from "@/lib/cafe-layout/types"

function dateStr(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function getDayOfWeek(d: Date): number {
  return d.getDay()
}

function isWeekend(d: Date): boolean {
  const day = getDayOfWeek(d)
  return day === 0 || day === 6
}

function getSeasonalModifierForHour(
  ref: Date,
  hour: number,
  floor: FloorId
): number {
  const event = getEventForDate(ref)
  if (!event?.eventType) return 0
  let add = 0
  if (event.eventType === "valentine" && hour >= EVENING_HOURS_START && hour <= EVENING_HOURS_END) {
    add = SEASONAL_MODIFIERS.valentine.evening
  }
  if (event.eventType === "dashain_tihar") {
    add = SEASONAL_MODIFIERS.dashain_tihar.family
  }
  if (event.eventType === "weekend") {
    add = SEASONAL_MODIFIERS.weekend.general
  }
  if (event.eventType === "live_singer" && floor === "ground" && hour >= EVENING_HOURS_START) {
    add = SEASONAL_MODIFIERS.live_singer.groundFloor
  }
  return add
}

function avgHistoricalForHour(
  history: TableOccupancyHistoryEntry[],
  ref: Date,
  hour: number,
  floor?: FloorId
): number {
  const day = getDayOfWeek(ref)
  const filtered = history.filter(
    (h) => {
      const d = new Date(h.date)
      return d.getDay() === day && h.hour === hour && (floor == null || h.floor === floor)
    }
  )
  if (filtered.length === 0) return FALLBACK_OCCUPANCY
  const sum = filtered.reduce((s, h) => s + h.occupancyPercentage, 0)
  return sum / filtered.length
}

function bookingVolumeForHour(bookings: CurrentBooking[], ref: Date, hour: number, floor?: FloorId): number {
  const date = dateStr(ref)
  const filtered = bookings.filter((b) => {
    const t = b.bookingTime.slice(0, 13)
    const bh = parseInt(t.slice(11, 13), 10)
    const bd = t.slice(0, 10)
    if (bd !== date || bh !== hour) return false
    if (floor != null && b.floor !== floor) return false
    return true
  })
  const cap = 50
  return Math.min(100, filtered.length * (100 / 5))
}

function membershipTrendFromHistory(
  history: TableOccupancyHistoryEntry[],
  ref: Date,
  hour: number
): number {
  const day = getDayOfWeek(ref)
  const filtered = history.filter((h) => {
    const d = new Date(h.date)
    return d.getDay() === day && h.hour === hour
  })
  if (filtered.length === 0) return 0
  let sum = 0
  let n = 0
  for (const h of filtered) {
    if (h.membershipTierUsage?.gold != null) {
      sum += h.membershipTierUsage.gold
      n++
    }
  }
  return n ? sum / n : 0
}

export function predictHourlyOccupancy(params: {
  referenceTime: Date
  history: TableOccupancyHistoryEntry[]
  currentBookings: CurrentBooking[]
}): HourlyPrediction[] {
  const { referenceTime, history, currentBookings } = params
  const result: HourlyPrediction[] = []
  const currentHour = referenceTime.getHours()

  for (let offset = 0; offset < 6; offset++) {
    const hour = currentHour + offset
    if (hour > 23) break
    const h = hour
    const histOverall = avgHistoricalForHour(history, referenceTime, h)
    const bookOverall = bookingVolumeForHour(currentBookings, referenceTime, h)
    const seasonal = getSeasonalModifierForHour(referenceTime, h, "ground")
    const memTrend = membershipTrendFromHistory(history, referenceTime, h)

    const score =
      histOverall * WEIGHTS.historical +
      bookOverall * WEIGHTS.currentBooking +
      (histOverall * (seasonal / 100) + seasonal) * WEIGHTS.seasonalModifier +
      memTrend * WEIGHTS.membershipTrend

    const overallPercent = Math.min(100, Math.max(0, Math.round(score)))

    const byFloor: Record<FloorId, number> = {
      ground: 0,
      first: 0,
      second: 0,
    }
    for (const floor of ["ground", "first", "second"] as FloorId[]) {
      const hf = avgHistoricalForHour(history, referenceTime, h, floor)
      const bf = bookingVolumeForHour(currentBookings, referenceTime, h, floor)
      const sf = getSeasonalModifierForHour(referenceTime, h, floor)
      byFloor[floor] = Math.min(
        100,
        Math.max(
          0,
          Math.round(
            hf * WEIGHTS.historical +
              bf * WEIGHTS.currentBooking +
              (hf * (sf / 100) + sf) * WEIGHTS.seasonalModifier
          )
        )
      )
    }

    result.push({
      hour: h,
      label: `${h}:00`,
      overallPercent,
      byFloor,
    })
  }

  return result
}

export function predictPeakHours(params: {
  referenceTime: Date
  history: TableOccupancyHistoryEntry[]
  currentBookings: CurrentBooking[]
}): PeakHourResult {
  const { referenceTime, history, currentBookings } = params
  const hourScores: { hour: number; score: number; membershipScore: number }[] = []

  for (let hour = 8; hour <= 22; hour++) {
    const hist = avgHistoricalForHour(history, referenceTime, hour)
    const book = bookingVolumeForHour(currentBookings, referenceTime, hour)
    const mem = membershipTrendFromHistory(history, referenceTime, hour)
    const score = hist * WEIGHTS.historical + book * WEIGHTS.currentBooking + mem * WEIGHTS.membershipTrend
    hourScores.push({ hour, score, membershipScore: mem })
  }

  hourScores.sort((a, b) => b.score - a.score)
  const peakHours = hourScores.slice(0, 5).map((x) => x.hour).sort((a, b) => a - b)

  hourScores.sort((a, b) => b.membershipScore - a.membershipScore)
  const membershipHeavyHours = hourScores
    .filter((x) => x.membershipScore > 10)
    .slice(0, 4)
    .map((x) => x.hour)
    .sort((a, b) => a - b)

  return {
    peakHours,
    membershipHeavyHours: membershipHeavyHours.length ? membershipHeavyHours : undefined,
    isWeekend: isWeekend(referenceTime),
  }
}

export function predictFloorDemand(params: {
  referenceTime: Date
  history: TableOccupancyHistoryEntry[]
  currentBookings: CurrentBooking[]
  hourlyPrediction?: HourlyPrediction[]
}): FloorDemand {
  const { hourlyPrediction, referenceTime, history, currentBookings } = params

  if (hourlyPrediction?.length) {
    const ground = Math.round(
      hourlyPrediction.reduce((s, h) => s + h.byFloor.ground, 0) / hourlyPrediction.length
    )
    const first = Math.round(
      hourlyPrediction.reduce((s, h) => s + h.byFloor.first, 0) / hourlyPrediction.length
    )
    const second = Math.round(
      hourlyPrediction.reduce((s, h) => s + h.byFloor.second, 0) / hourlyPrediction.length
    )
    return {
      groundFloorDemand: Math.min(100, ground),
      firstFloorDemand: Math.min(100, first),
      secondFloorDemand: Math.min(100, second),
    }
  }

  const currentHour = referenceTime.getHours()
  return {
    groundFloorDemand: Math.min(100, avgHistoricalForHour(history, referenceTime, currentHour, "ground") + bookingVolumeForHour(currentBookings, referenceTime, currentHour, "ground") / 2),
    firstFloorDemand: Math.min(100, avgHistoricalForHour(history, referenceTime, currentHour, "first") + bookingVolumeForHour(currentBookings, referenceTime, currentHour, "first") / 2),
    secondFloorDemand: Math.min(100, avgHistoricalForHour(history, referenceTime, currentHour, "second") + bookingVolumeForHour(currentBookings, referenceTime, currentHour, "second") / 2),
  }
}

export function predictGoldLoungeDemand(params: {
  referenceTime: Date
  history: TableOccupancyHistoryEntry[]
  currentBookings: CurrentBooking[]
}): number {
  const { referenceTime, history, currentBookings } = params
  const hour = referenceTime.getHours()
  const vipHistory = history.filter((h) => h.floor === "ground" && (h.tableType === "communal" || h.tableType === "t4"))
  const hist = vipHistory.length
    ? vipHistory.reduce((s, h) => s + h.occupancyPercentage, 0) / vipHistory.length
    : FALLBACK_OCCUPANCY
  const vipBookings = currentBookings.filter((b) => b.zoneId === "vip" || (b.floor === "ground" && (b.membershipTier === "gold" || b.membershipTier === "platinum")))
  const bookScore = Math.min(100, vipBookings.length * 18)
  const event = getEventForDate(referenceTime)
  let boost = 0
  if (hour >= EVENING_HOURS_START && event?.eventType === "live_singer") boost = 25
  if (hour >= EVENING_HOURS_START) boost += 10
  return Math.min(100, Math.round(hist * 0.4 + bookScore * 0.4 + boost))
}

export function predictConferenceUsage(params: {
  referenceTime: Date
  history: TableOccupancyHistoryEntry[]
  currentBookings: CurrentBooking[]
}): number {
  const { referenceTime, history, currentBookings } = params
  const hour = referenceTime.getHours()
  const secondHistory = history.filter((h) => h.floor === "second")
  const hist = secondHistory.length
    ? secondHistory.reduce((s, h) => s + h.occupancyPercentage, 0) / secondHistory.length
    : FALLBACK_OCCUPANCY
  const confBookings = currentBookings.filter((b) => b.floor === "second")
  const bookScore = Math.min(100, confBookings.length * 15)
  const businessHourBonus = hour >= CONFERENCE_HOURS_START && hour <= CONFERENCE_HOURS_END ? 15 : 0
  return Math.min(100, Math.round(hist * 0.4 + bookScore * 0.5 + businessHourBonus))
}

export function generateBookingSuggestions(predictions: PredictionOutput): string[] {
  const out: string[] = []
  const { floorDemand, vipDemandLevel, conferenceDemandLevel, peakHours, hourlyPrediction } = predictions

  if (floorDemand.groundFloorDemand >= DEMAND_MEDIUM_MAX) {
    const peakHour = peakHours.peakHours[0]
    if (peakHour != null) out.push(`Ground floor will be fully occupied by ${peakHour}:00.`)
  }

  const lowHours = hourlyPrediction.filter((h) => h.overallPercent < DEMAND_LOW_MAX)
  if (lowHours.length >= 2) {
    const first = lowHours[0]
    const last = lowHours[lowHours.length - 1]
    if (first && last) out.push(`Best time for peaceful dining: ${first.hour}:00 – ${last.hour}:00.`)
  }

  if (vipDemandLevel >= DEMAND_MEDIUM_MAX) {
    out.push("Gold lounge expected high demand tonight.")
  }
  if (vipDemandLevel >= 70) {
    out.push("VIP lounge limited availability.")
  }

  if (conferenceDemandLevel >= DEMAND_MEDIUM_MAX) {
    out.push("Conference rooms in high use; book in advance.")
  }

  if (peakHours.membershipHeavyHours?.length) {
    out.push("Gold Member Peak Time during selected hours.")
  }

  return out
}

export function getPredictionOutput(params: {
  referenceTime: Date
  history: TableOccupancyHistoryEntry[]
  currentBookings: CurrentBooking[]
}): PredictionOutput {
  const { referenceTime, history, currentBookings } = params

  const hourlyPrediction = predictHourlyOccupancy({ referenceTime, history, currentBookings })
  const peakHours = predictPeakHours({ referenceTime, history, currentBookings })
  const floorDemand = predictFloorDemand({
    referenceTime,
    history,
    currentBookings,
    hourlyPrediction,
  })
  const vipDemandLevel = predictGoldLoungeDemand({ referenceTime, history, currentBookings })
  const conferenceDemandLevel = predictConferenceUsage({ referenceTime, history, currentBookings })

  const predictions: PredictionOutput = {
    hourlyPrediction,
    peakHours,
    floorDemand,
    vipDemandLevel,
    conferenceDemandLevel,
    bookingSuggestions: [],
  }
  predictions.bookingSuggestions = generateBookingSuggestions(predictions)
  return predictions
}
