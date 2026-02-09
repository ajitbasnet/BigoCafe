/**
 * Café layout planning – shared types for zones, table types, floors, and theme.
 */

export type TableTypeId = "t2" | "t4" | "communal" | "bar"

export interface TableTypeSpec {
  id: TableTypeId
  label: string
  widthCm: number
  depthCm: number
  heightCm: number
  seatCount: number
  chairClearanceCm?: number
}

export type ZoneId =
  | "entrance"
  | "waiting"
  | "ordering"
  | "main_seating"
  | "window"
  | "lounge"
  | "staff_kitchen"
  | "vip"
  | "piano_stage"
  | "conference"
  | "meeting"
  | "mini_coffee"

export interface ZoneSpec {
  id: ZoneId
  label: string
  description?: string
}

export type FloorId = "ground" | "first" | "second"

export interface FloorSpec {
  id: FloorId
  label: string
  areaSqm?: number
  zones: ZoneId[]
  purpose?: string
}

export interface Placement {
  tableTypeId: TableTypeId
  zoneId: ZoneId
  position: [number, number, number]
  rotationDeg?: number
}

/** Base table item (from booking); extended by CafeTableItem. */
export interface TableItemBase {
  id: string
  name: string
  capacity: number
  position: [number, number, number]
  isGolden: boolean
  occupied: number
}

export interface CafeTableItem extends TableItemBase {
  floorId: FloorId
  zoneId: ZoneId
  tableTypeId: TableTypeId
  dimensions?: { width: number; depth: number; height: number }
}

export interface SpacingRules {
  betweenTablesCm: number
  mainWalkwayCm: number
  staffPathCm: number
  chairPulloutCm: number
}

export interface LightingPreset {
  ambientKelvin?: number
  accent?: string
}

export interface GreeneryTheme {
  primaryColor: string
  secondaryColor: string
  materials?: Record<string, string>
}
