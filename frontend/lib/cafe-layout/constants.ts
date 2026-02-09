/**
 * Café layout – table types, zones, floors, spacing, and capacity constants.
 */

import type { TableTypeSpec, ZoneSpec, FloorSpec, SpacingRules } from "./types"

export const TABLE_TYPES: Record<string, TableTypeSpec> = {
  t2: {
    id: "t2",
    label: "Two-person",
    widthCm: 60,
    depthCm: 60,
    heightCm: 72,
    seatCount: 2,
    chairClearanceCm: 60,
  },
  t4: {
    id: "t4",
    label: "Four-person",
    widthCm: 80,
    depthCm: 80,
    heightCm: 72,
    seatCount: 4,
    chairClearanceCm: 60,
  },
  communal: {
    id: "communal",
    label: "Communal",
    widthCm: 210,
    depthCm: 90,
    heightCm: 72,
    seatCount: 8,
    chairClearanceCm: 60,
  },
  bar: {
    id: "bar",
    label: "Bar / counter",
    widthCm: 400,
    depthCm: 60,
    heightCm: 105,
    seatCount: 6,
    chairClearanceCm: 60,
  },
}

export const ZONES: Record<string, ZoneSpec> = {
  entrance: { id: "entrance", label: "Entrance", description: "Reception and waiting" },
  waiting: { id: "waiting", label: "Waiting zone", description: "Queue and menu display" },
  ordering: { id: "ordering", label: "Ordering counter", description: "POS, pickup, display" },
  main_seating: { id: "main_seating", label: "Main seating", description: "Primary table area" },
  window: { id: "window", label: "Window seating", description: "Window-side tables" },
  lounge: { id: "lounge", label: "Lounge", description: "Sofas and low tables" },
  staff_kitchen: { id: "staff_kitchen", label: "Kitchen & staff", description: "Prep and service" },
  vip: { id: "vip", label: "VIP lounge", description: "Gold member pods" },
  piano_stage: { id: "piano_stage", label: "Piano & stage", description: "Live performance" },
  conference: { id: "conference", label: "Conference", description: "Large meeting room" },
  meeting: { id: "meeting", label: "Meeting room", description: "Small meeting space" },
  mini_coffee: { id: "mini_coffee", label: "Mini coffee", description: "Self-service station" },
}

/** Floor areas: 3000–3500 sq ft ≈ 279–325 m², 2500 sq ft ≈ 232 m² */
const SQFT_TO_SQM = 0.092903
export const FLOORS: Record<string, FloorSpec> = {
  ground: {
    id: "ground",
    label: "Ground floor",
    areaSqm: Math.round(3200 * SQFT_TO_SQM),
    zones: ["entrance", "waiting", "ordering", "main_seating", "vip", "piano_stage", "window", "staff_kitchen"],
    purpose: "Experience, entertainment, VIP",
  },
  first: {
    id: "first",
    label: "First floor",
    areaSqm: Math.round(3000 * SQFT_TO_SQM),
    zones: ["main_seating", "window", "lounge"],
    purpose: "Main dining and relaxation",
  },
  second: {
    id: "second",
    label: "Second floor",
    areaSqm: Math.round(2500 * SQFT_TO_SQM),
    zones: ["conference", "meeting", "mini_coffee"],
    purpose: "Meeting and conference",
  },
}

export const SPACING_RULES: SpacingRules = {
  betweenTablesCm: 90,
  mainWalkwayCm: 120,
  staffPathCm: 150,
  chairPulloutCm: 60,
}

export const SEATING_CAPACITY_M2_PER_PERSON = { min: 1.8, max: 1.4 } as const
