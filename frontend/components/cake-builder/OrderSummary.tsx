"use client"

import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import {
  cakeFlavors,
  cakeDesigns,
  cakeSizes,
  creamTypes,
  cakeCeremonyTypes,
} from "@/lib/mock-data/cake-options"
import { formatNPR } from "@/lib/pricing/format"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AllergyCheckBanner } from "./AllergyCheckBanner"
import Image from "next/image"
import Link from "next/link"

export function OrderSummary() {
  const flavorId = useCakeBuilderStore((s) => s.flavorId)
  const designId = useCakeBuilderStore((s) => s.designId)
  const sizeId = useCakeBuilderStore((s) => s.sizeId)
  const ceremonyId = useCakeBuilderStore((s) => s.ceremonyId)
  const creamIds = useCakeBuilderStore((s) => s.creamIds)
  const extraLayerCount = useCakeBuilderStore((s) => s.extraLayerCount)
  const cakeMessage = useCakeBuilderStore((s) => s.cakeMessage)
  const postcardMessage = useCakeBuilderStore((s) => s.postcardMessage)
  const customPounds = useCakeBuilderStore((s) => s.customPounds)
  const pickupDate = useCakeBuilderStore((s) => s.pickupDate)
  const pickupTime = useCakeBuilderStore((s) => s.pickupTime)
  const getTotalPrice = useCakeBuilderStore((s) => s.getTotalPrice)

  const flavor = flavorId ? cakeFlavors.find((f) => f.id === flavorId) : null
  const design = designId ? cakeDesigns.find((d) => d.id === designId) : null
  const size = sizeId && sizeId !== "custom" ? cakeSizes.find((s) => s.id === sizeId) : null
  const ceremony = ceremonyId ? cakeCeremonyTypes.find((c) => c.id === ceremonyId) : null
  const creamLabels = creamIds.map((id) => creamTypes.find((c) => c.id === id)?.name).filter(Boolean)

  const sizeLabel = sizeId === "custom" ? `${customPounds} lb (custom)` : size?.label ?? "—"
  const total = getTotalPrice()

  const rows = [
    { label: "Flavor", value: flavor?.name ?? "—" },
    { label: "Size", value: sizeLabel },
    { label: "Design", value: design?.name ?? "—" },
    { label: "Ceremony", value: ceremony?.label ?? "—" },
    { label: "Cream", value: creamLabels.length ? creamLabels.join(", ") : "—" },
    ...(extraLayerCount > 0 ? [{ label: "Extra layers", value: String(extraLayerCount) }] : []),
    { label: "Cake message", value: cakeMessage || "—" },
    { label: "Post card", value: postcardMessage ? "Yes" : "—" },
    { label: "Pickup", value: pickupDate && pickupTime ? `${pickupDate} at ${pickupTime}` : "—" },
  ]

  return (
    <div className="space-y-6">
      <AllergyCheckBanner />
      <Card className="card-luxury">
        <CardHeader>
          <h3 className="font-serif text-lg text-foreground">Order summary</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {design && (
            <div className="flex gap-4">
              <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-muted shrink-0">
                <Image src={design.imageUrl} alt={design.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground">{design.name}</p>
                {cakeMessage && <p className="text-sm font-serif text-muted-foreground mt-1">&ldquo;{cakeMessage}&rdquo;</p>}
              </div>
            </div>
          )}
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {rows.map((r) => (
              <div key={r.label} className="flex gap-2">
                <dt className="text-muted-foreground">{r.label}</dt>
                <dd className="font-medium text-foreground truncate">{r.value}</dd>
              </div>
            ))}
          </dl>
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <span className="font-medium text-foreground">Total</span>
            <span className="font-serif text-2xl text-primary">{formatNPR(total)}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            You can go back to any step to edit. When ready, click &quot;Proceed to order&quot; below.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
