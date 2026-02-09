/**
 * Real-time table occupancy AI prediction – types.
 * Frontend simulation only; no backend ML.
 */

import type { FloorId } from "@/lib/cafe-layout/types"
import type { ZoneId } from "@/lib/cafe-layout/types"
import type { MembershipTier } from "@/lib/pos/types"

export interface TableOccupancyHistoryEntry {
  date: string
  hour: number
  floor: FloorId
  tableType: string
  occupancyPercentage: number
  membershipTierUsage?: Partial<Record<MembershipTier, number>>
}

export interface CurrentBooking {
  id: string
  bookingTime: string
  guestsCount: number
  floor: FloorId
  tableType?: string
  zoneId?: ZoneId
  membershipTier: MembershipTier
}

export interface HourlyPrediction {
  hour: number
  label: string
  overallPercent: number
  byFloor: Record<FloorId, number>
  byTableType?: Record<string, number>
}

export interface PeakHourResult {
  peakHours: number[]
  membershipHeavyHours?: number[]
  isWeekend: boolean
}

export interface FloorDemand {
  groundFloorDemand: number
  firstFloorDemand: number
  secondFloorDemand: number
}

export interface PredictionOutput {
  hourlyPrediction: HourlyPrediction[]
  peakHours: PeakHourResult
  floorDemand: FloorDemand
  vipDemandLevel: number
  conferenceDemandLevel: number
  bookingSuggestions: string[]
}

export type EventType = "live_singer" | "valentine" | "dashain_tihar" | "weekend" | null

export interface EventScheduleEntry {
  date: string
  eventType: EventType
  eveningCrowdBoost?: number
}
