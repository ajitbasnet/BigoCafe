"use client"

import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import {
  cakeFlavors,
  cakeDesigns,
  cakeSizes,
  creamTypes,
  cakeCeremonyTypes,
} from "@/lib/mock-data/cake-options"
import {
  CAKE_SIZE_BASE_NPR,
  CAKE_CUSTOM_PRICE_PER_POUND_NPR,
  CAKE_CREAM_NPR,
  CAKE_EXTRA_LAYER_NPR,
} from "@/lib/pricing/npr-config"
import { formatNPR } from "@/lib/pricing/format"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { AllergyCheckBanner } from "./AllergyCheckBanner"
import Image from "next/image"
import { Clock } from "lucide-react"

export function OrderSummarySidebar() {
  const flavorId = useCakeBuilderStore((s) => s.flavorId)
  const designId = useCakeBuilderStore((s) => s.designId)
  const sizeId = useCakeBuilderStore((s) => s.sizeId)
  const ceremonyId = useCakeBuilderStore((s) => s.ceremonyId)
  const ceremonyOther = useCakeBuilderStore((s) => s.ceremonyOther)
  const creamIds = useCakeBuilderStore((s) => s.creamIds)
  const baseLayers = useCakeBuilderStore((s) => s.baseLayers)
  const extraLayerCount = useCakeBuilderStore((s) => s.extraLayerCount)
  const cakeMessage = useCakeBuilderStore((s) => s.cakeMessage)
  const postcardEnabled = useCakeBuilderStore((s) => s.postcardEnabled)
  const customPounds = useCakeBuilderStore((s) => s.customPounds)
  const pickupDate = useCakeBuilderStore((s) => s.pickupDate)
  const pickupTime = useCakeBuilderStore((s) => s.pickupTime)
  const getTotalPrice = useCakeBuilderStore((s) => s.getTotalPrice)
  const getPreparationTime = useCakeBuilderStore((s) => s.getPreparationTime)

  const flavor = flavorId ? cakeFlavors.find((f) => f.id === flavorId) : null
  const design = designId && designId !== "custom" ? cakeDesigns.find((d) => d.id === designId) : null
  const ceremony = ceremonyId ? cakeCeremonyTypes.find((c) => c.id === ceremonyId) : null

  const sizeLabel = sizeId === "custom" ? `${customPounds} lb (custom)` : cakeSizes.find((s) => s.id === sizeId)?.label ?? "—"
  const tierMult = baseLayers === "1" ? 1 : baseLayers === "2" ? 1.5 : 2
  const sizePrice =
    sizeId && sizeId !== "custom"
      ? (CAKE_SIZE_BASE_NPR[sizeId] ?? CAKE_SIZE_BASE_NPR["1lb"]) * tierMult
      : CAKE_CUSTOM_PRICE_PER_POUND_NPR * customPounds * tierMult
  const creamTotal = creamIds.reduce((sum, id) => sum + (CAKE_CREAM_NPR[id] ?? 0), 0)
  const extraTotal = extraLayerCount * CAKE_EXTRA_LAYER_NPR
  const total = getTotalPrice()
  const prepTime = getPreparationTime()

  const rows = [
    { label: "Flavor", value: flavor?.name ?? "—" },
    { label: "Design", value: design?.name ?? (designId === "custom" ? "Custom" : "—") },
    { label: "Size", value: sizeLabel },
    { label: "Ceremony", value: ceremonyId === "other" ? ceremonyOther || "Other" : ceremony?.label ?? "—" },
    { label: "Cream", value: creamIds.map((id) => creamTypes.find((c) => c.id === id)?.name).filter(Boolean).join(", ") || "—" },
    { label: "Layers", value: `${baseLayers} base + ${extraLayerCount} extra` },
    { label: "Cake message", value: cakeMessage || "—" },
    { label: "Postcard", value: postcardEnabled ? "Yes" : "—" },
    { label: "Pickup", value: pickupDate && pickupTime ? `${pickupDate} at ${pickupTime}` : "—" },
  ]

  return (
    <aside className="space-y-4" aria-label="Order summary">
      <AllergyCheckBanner />
      <Card className="card-luxury">
        <CardHeader>
          <h3 className="font-serif text-lg text-foreground">Order summary</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          {design && design.id !== "custom" && (
            <div className="flex gap-3">
              <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-muted shrink-0">
                <Image src={design.imageUrl} alt="" fill className="object-cover" sizes="80px" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-foreground">{design.name}</p>
                {cakeMessage && (
                  <p className="text-sm font-serif text-muted-foreground mt-1 line-clamp-2">&ldquo;{cakeMessage}&rdquo;</p>
                )}
              </div>
            </div>
          )}
          <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
            {rows.map((r) => (
              <div key={r.label} className="contents">
                <dt className="text-muted-foreground">{r.label}</dt>
                <dd className="font-medium text-foreground truncate">{r.value}</dd>
              </div>
            ))}
          </dl>
          <div className="space-y-1 text-sm border-t border-border pt-3">
            <div className="flex justify-between text-muted-foreground">
              <span>Size & tiers</span>
              <span>{formatNPR(sizePrice)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Cream</span>
              <span>{formatNPR(creamTotal)}</span>
            </div>
            {extraTotal > 0 && (
              <div className="flex justify-between text-muted-foreground">
                <span>Extra layers</span>
                <span>{formatNPR(extraTotal)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" aria-hidden />
            <span>Est. preparation: {prepTime}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="font-medium text-foreground">Total</span>
            <span className="font-serif text-2xl text-primary">{formatNPR(total)}</span>
          </div>
        </CardContent>
      </Card>
    </aside>
  )
}
