/**
 * Seating capacity: 1 customer ≈ 1.4–1.8 m².
 */

import { FLOORS } from "./constants"
import type { FloorId } from "./types"
import { SEATING_CAPACITY_M2_PER_PERSON } from "./constants"

/**
 * Compute min/max seating from floor area (m²).
 * Returns [min, max] using 1.4–1.8 m² per person.
 */
export function computeMaxSeating(areaSqm: number): [number, number] {
  const min = Math.floor(areaSqm / SEATING_CAPACITY_M2_PER_PERSON.min)
  const max = Math.floor(areaSqm / SEATING_CAPACITY_M2_PER_PERSON.max)
  return [min, max]
}

/**
 * Get capacity range for a floor from config area.
 */
export function getFloorCapacity(floorId: FloorId): [number, number] | null {
  const floor = FLOORS[floorId]
  if (!floor?.areaSqm) return null
  return computeMaxSeating(floor.areaSqm)
}
