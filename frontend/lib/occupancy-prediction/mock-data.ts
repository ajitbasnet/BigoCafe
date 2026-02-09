/**
 * Mock historical occupancy and live bookings for AI simulation.
 */

import type { TableOccupancyHistoryEntry, CurrentBooking, EventScheduleEntry } from "./types"
import type { FloorId } from "@/lib/cafe-layout/types"

function dateStr(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function genHistory(): TableOccupancyHistoryEntry[] {
  const out: TableOccupancyHistoryEntry[] = []
  const floors: FloorId[] = ["ground", "first", "second"]
  const tableTypes = ["t2", "t4", "communal"]
  for (let day = 0; day < 14; day++) {
    const d = new Date()
    d.setDate(d.getDate() - day)
    const date = dateStr(d)
    for (let hour = 8; hour <= 22; hour++) {
      for (const floor of floors) {
        for (const tableType of tableTypes) {
          const base = 25 + Math.sin((hour - 12) / 4) * 25 + (hour >= 17 ? 15 : 0)
          const weekend = d.getDay() === 0 || d.getDay() === 6 ? 12 : 0
          const occ = Math.min(95, Math.max(5, Math.round(base + weekend + (floor === "ground" ? 5 : 0))))
          out.push({
            date,
            hour,
            floor,
            tableType,
            occupancyPercentage: occ,
            membershipTierUsage: { gold: Math.min(20, occ >> 1), platinum: Math.min(10, occ >> 2) },
          })
        }
      }
    }
  }
  return out
}

export const tableOccupancyHistory: TableOccupancyHistoryEntry[] = genHistory()

export const currentBookings: CurrentBooking[] = [
  { id: "b1", bookingTime: `${dateStr(new Date())}T12:00:00`, guestsCount: 2, floor: "ground", tableType: "t2", zoneId: "main_seating", membershipTier: "standard" },
  { id: "b2", bookingTime: `${dateStr(new Date())}T13:00:00`, guestsCount: 4, floor: "ground", tableType: "t4", zoneId: "vip", membershipTier: "gold" },
  { id: "b3", bookingTime: `${dateStr(new Date())}T14:00:00`, guestsCount: 2, floor: "first", tableType: "t2", zoneId: "window", membershipTier: "silver" },
  { id: "b4", bookingTime: `${dateStr(new Date())}T18:00:00`, guestsCount: 6, floor: "ground", tableType: "communal", zoneId: "vip", membershipTier: "platinum" },
  { id: "b5", bookingTime: `${dateStr(new Date())}T19:00:00`, guestsCount: 4, floor: "first", tableType: "t4", zoneId: "main_seating", membershipTier: "standard" },
  { id: "b6", bookingTime: `${dateStr(new Date())}T10:00:00`, guestsCount: 8, floor: "second", zoneId: "conference", membershipTier: "gold" },
  { id: "b7", bookingTime: `${dateStr(new Date())}T15:00:00`, guestsCount: 6, floor: "second", zoneId: "meeting", membershipTier: "standard" },
]

function genEventSchedule(): EventScheduleEntry[] {
  const out: EventScheduleEntry[] = []
  const today = new Date()
  for (let i = -2; i <= 3; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() + i)
    const date = dateStr(d)
    const day = d.getDay()
    let eventType: EventScheduleEntry["eventType"] = null
    let eveningCrowdBoost = 0
    if (day === 0 || day === 6) {
      eventType = "weekend"
      eveningCrowdBoost = 15
    }
    if (date.includes("02-14")) eventType = "valentine"
    if (date.includes("10-") || date.includes("11-")) eventType = "dashain_tihar"
    if (day === 5 && i >= 0) {
      eventType = "live_singer"
      eveningCrowdBoost = 25
    }
    out.push({ date, eventType, eveningCrowdBoost })
  }
  return out
}

export const eventSchedule: EventScheduleEntry[] = genEventSchedule()

export function getEventForDate(date: Date): EventScheduleEntry | undefined {
  const str = dateStr(date)
  return eventSchedule.find((e) => e.date === str)
}
