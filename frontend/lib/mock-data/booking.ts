import type { FloorId } from "@/lib/cafe-layout/types"

export interface TableItem {
  id: string
  name: string
  capacity: number
  position: [number, number, number]
  isGolden: boolean
  occupied: number
  floorId?: FloorId
  zoneId?: string
  tableTypeId?: string
}

/** Ground floor: main seating, VIP, window. 10m×8m layout (positions in meters). */
const groundTables: TableItem[] = [
  { id: "t1", name: "Table 1", capacity: 2, position: [-3, 0, 2], isGolden: false, occupied: 0, floorId: "ground", zoneId: "main_seating", tableTypeId: "t2" },
  { id: "t2", name: "Table 2", capacity: 4, position: [0, 0, 2], isGolden: false, occupied: 2, floorId: "ground", zoneId: "main_seating", tableTypeId: "t4" },
  { id: "t3", name: "Table 3", capacity: 2, position: [3, 0, 2], isGolden: false, occupied: 0, floorId: "ground", zoneId: "window", tableTypeId: "t2" },
  { id: "t4", name: "Table 4", capacity: 6, position: [-2, 0, -2], isGolden: true, occupied: 0, floorId: "ground", zoneId: "vip", tableTypeId: "communal" },
  { id: "t5", name: "Table 5", capacity: 4, position: [2, 0, -2], isGolden: true, occupied: 1, floorId: "ground", zoneId: "vip", tableTypeId: "t4" },
  { id: "t6", name: "Table 6", capacity: 2, position: [-3.5, 0, -1], isGolden: false, occupied: 0, floorId: "ground", zoneId: "main_seating", tableTypeId: "t2" },
  { id: "t7", name: "Table 7", capacity: 4, position: [3.5, 0, 0], isGolden: false, occupied: 0, floorId: "ground", zoneId: "window", tableTypeId: "t4" },
]

/** First floor: main dining, window, lounge. Same coordinate scale. */
const firstFloorTables: TableItem[] = [
  { id: "t8", name: "Table 8", capacity: 2, position: [-3, 0, 2], isGolden: false, occupied: 0, floorId: "first", zoneId: "main_seating", tableTypeId: "t2" },
  { id: "t9", name: "Table 9", capacity: 4, position: [0, 0, 2], isGolden: false, occupied: 1, floorId: "first", zoneId: "main_seating", tableTypeId: "t4" },
  { id: "t10", name: "Table 10", capacity: 2, position: [3, 0, 2], isGolden: false, occupied: 0, floorId: "first", zoneId: "window", tableTypeId: "t2" },
  { id: "t11", name: "Table 11", capacity: 8, position: [0, 0, -1], isGolden: false, occupied: 3, floorId: "first", zoneId: "main_seating", tableTypeId: "communal" },
  { id: "t12", name: "Table 12", capacity: 4, position: [-2.5, 0, -2.5], isGolden: false, occupied: 0, floorId: "first", zoneId: "lounge", tableTypeId: "t4" },
  { id: "t13", name: "Table 13", capacity: 2, position: [2.5, 0, -2.5], isGolden: false, occupied: 0, floorId: "first", zoneId: "window", tableTypeId: "t2" },
]

export const mockTables: TableItem[] = [...groundTables, ...firstFloorTables]

export function getTablesByFloor(floorId: FloorId): TableItem[] {
  return mockTables.filter((t) => t.floorId === floorId)
}

export interface ConferenceRoom {
  id: string
  name: string
  capacity: number
  features: string[]
  image: string
}

export const mockConferenceRooms: ConferenceRoom[] = [
  { id: "r1", name: "Himalayan Room", capacity: 8, features: ["Projector", "Whiteboard", "AV"], image: "/images/interior.jpg" },
  { id: "r2", name: "Kathmandu Suite", capacity: 12, features: ["Projector", "Video Call", "Catering"], image: "/images/interior.jpg" },
  { id: "r3", name: "Bakery View", capacity: 6, features: ["Whiteboard", "Natural Light"], image: "/images/interior.jpg" },
  { id: "r4", name: "Executive", capacity: 10, features: ["Projector", "Whiteboard", "Video Call", "Catering"], image: "/images/interior.jpg" },
]
