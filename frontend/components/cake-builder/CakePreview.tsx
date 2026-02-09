"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { cakeFlavors, cakeDesigns, cakeSizes, creamTypes } from "@/lib/mock-data/cake-options"
import { AnimatedPrice } from "@/components/pricing/animated-price"
import { Cake } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

export function CakePreview() {
  const flavorId = useCakeBuilderStore((s) => s.flavorId)
  const designId = useCakeBuilderStore((s) => s.designId)
  const customDesignUrl = useCakeBuilderStore((s) => s.customDesignUrl)
  const sizeId = useCakeBuilderStore((s) => s.sizeId)
  const baseLayers = useCakeBuilderStore((s) => s.baseLayers)
  const extraLayerCount = useCakeBuilderStore((s) => s.extraLayerCount)
  const creamIds = useCakeBuilderStore((s) => s.creamIds)
  const cakeMessage = useCakeBuilderStore((s) => s.cakeMessage)
  const customPounds = useCakeBuilderStore((s) => s.customPounds)
  const getTotalPrice = useCakeBuilderStore((s) => s.getTotalPrice)

  const flavor = flavorId ? cakeFlavors.find((f) => f.id === flavorId) : null
  const design = designId && designId !== "custom" ? cakeDesigns.find((d) => d.id === designId) : null
  const size = sizeId && sizeId !== "custom" ? cakeSizes.find((s) => s.id === sizeId) : null
  const creamLabels = creamIds.map((id) => creamTypes.find((c) => c.id === id)?.name).filter(Boolean)
  const sizeLabel = sizeId === "custom" ? `${customPounds} lb` : size?.label ?? "—"
  const totalTiers = (baseLayers === "1" ? 1 : baseLayers === "2" ? 2 : 3) + extraLayerCount
  const total = getTotalPrice()

  const previewImageUrl = designId === "custom" && customDesignUrl ? customDesignUrl : design?.imageUrl

  return (
    <Card className="card-luxury sticky top-4 glass-panel">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Cake className="w-5 h-5 text-primary" aria-hidden />
          <span className="font-serif text-lg text-foreground">Live cake preview</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-2">
          {/* Layer height visualization */}
          <div className="flex flex-col-reverse items-center gap-0.5" style={{ minHeight: 80 }}>
            {Array.from({ length: Math.min(totalTiers, 4) }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border transition-all duration-300"
                style={{
                  width: 60 + i * 8,
                  height: 16 + (baseLayers === "3" ? 4 : 0),
                  backgroundColor: flavor?.swatchColor ?? "var(--muted)",
                  opacity: 0.9 - i * 0.1,
                }}
              />
            ))}
          </div>
          {previewImageUrl ? (
            <div className="aspect-square w-full max-w-[180px] relative rounded-xl overflow-hidden bg-muted mt-2">
              {previewImageUrl.startsWith("blob:") ? (
                <img src={previewImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <Image src={previewImageUrl} alt="" fill className="object-cover" sizes="200px" />
              )}
              {flavor?.swatchColor && (
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-20 pointer-events-none"
                  style={{ backgroundColor: flavor.swatchColor }}
                />
              )}
              {cakeMessage ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <p className="text-white text-sm font-serif drop-shadow-md text-center px-2 line-clamp-2">
                    {cakeMessage}
                  </p>
                </div>
              ) : null}
              {design && design.id !== "custom" && (
                <span className="absolute bottom-2 left-2 right-2 text-center">
                  <span className="rounded bg-primary/90 text-primary-foreground text-xs px-2 py-0.5">
                    {design.name}
                  </span>
                </span>
              )}
            </div>
          ) : (
            <div
              className="aspect-square w-full max-w-[180px] rounded-xl flex items-center justify-center border border-border"
              style={{ backgroundColor: flavor?.swatchColor ?? "var(--muted)" }}
            >
              <Cake className="w-12 h-12 text-muted-foreground" aria-hidden />
            </div>
          )}
        </div>

        <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <dt className="text-muted-foreground">Flavor</dt>
          <dd className="font-medium">{flavor?.name ?? "—"}</dd>
          <dt className="text-muted-foreground">Size</dt>
          <dd className="font-medium">{sizeLabel}</dd>
          <dt className="text-muted-foreground">Design</dt>
          <dd className="font-medium">{design?.name ?? (designId === "custom" ? "Custom" : "—")}</dd>
          <dt className="text-muted-foreground">Cream</dt>
          <dd className="font-medium">{creamLabels.length ? creamLabels.join(", ") : "—"}</dd>
          {totalTiers > 1 && (
            <>
              <dt className="text-muted-foreground">Tiers</dt>
              <dd className="font-medium">{totalTiers}</dd>
            </>
          )}
        </dl>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total</span>
            <AnimatedPrice amount={total} className="font-serif text-xl text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
