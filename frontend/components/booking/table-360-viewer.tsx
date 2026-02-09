"use client"

import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { useBookingStore } from "@/stores/booking-store"
import { getTablesByFloor } from "@/lib/mock-data/booking"
import { TABLE_TYPES } from "@/lib/cafe-layout/constants"
import type { TableItem } from "@/lib/mock-data/booking"
import type { TableTypeId } from "@/lib/cafe-layout/types"

/** Greenery theme: earth brown, cream, warm wood. */
const TABLE_COLOR = "#6B5344"
const TABLE_SELECTED_COLOR = "#C89B6D"
const FLOOR_COLOR = "#E8DFD5"
const WALL_COLOR = "#D4C4B5"
const FLOOR_SIZE_M = { x: 10, z: 8 }

function getTableType(table: TableItem): TableTypeId {
  const id = table.tableTypeId as TableTypeId | undefined
  if (id && TABLE_TYPES[id]) return id
  if (table.capacity <= 2) return "t2"
  if (table.capacity <= 4) return "t4"
  return "communal"
}

function TableMesh({
  table,
  selected,
}: {
  table: TableItem
  selected: boolean
}) {
  const typeId = getTableType(table)
  const spec = TABLE_TYPES[typeId]
  const w = (spec?.widthCm ?? 60) / 100
  const d = (spec?.depthCm ?? 60) / 100
  const h = (spec?.heightCm ?? 72) / 100
  const [x, y, z] = table.position

  return (
    <group position={[x, y, z]}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={selected ? TABLE_SELECTED_COLOR : TABLE_COLOR}
          emissive={selected ? TABLE_SELECTED_COLOR : "#000000"}
          emissiveIntensity={selected ? 0.2 : 0}
        />
      </mesh>
    </group>
  )
}

function Room() {
  const selectedTableId = useBookingStore((s) => s.selectedTableId)
  const selectedFloorId = useBookingStore((s) => s.selectedFloorId)
  const tables = getTablesByFloor(selectedFloorId)

  return (
    <>
      <ambientLight intensity={0.55} color="#fff5eb" />
      <directionalLight position={[5, 8, 5]} intensity={1} castShadow color="#fff8f0" />
      <directionalLight position={[-3, 4, 3]} intensity={0.3} color="#fff5eb" />
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[FLOOR_SIZE_M.x, FLOOR_SIZE_M.z]} />
        <meshStandardMaterial color={FLOOR_COLOR} />
      </mesh>
      <mesh position={[0, 2, -FLOOR_SIZE_M.z / 2 - 0.5]} receiveShadow>
        <planeGeometry args={[FLOOR_SIZE_M.x + 2, 6]} />
        <meshStandardMaterial color={WALL_COLOR} />
      </mesh>
      {tables.map((t) => (
        <TableMesh key={t.id} table={t} selected={selectedTableId === t.id} />
      ))}
    </>
  )
}

function Fallback() {
  return (
    <div className="w-full h-full min-h-[400px] bg-muted/30 rounded-xl flex items-center justify-center">
      <p className="text-muted-foreground text-sm">Loading 360° view...</p>
    </div>
  )
}

export function Table360Viewer() {
  return (
    <div className="w-full aspect-video max-h-[500px] rounded-xl overflow-hidden bg-muted/20 border border-border">
      <Suspense fallback={<Fallback />}>
        <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
          <Room />
          <OrbitControls
            enablePan={false}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
