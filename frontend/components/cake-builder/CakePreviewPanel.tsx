"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { cakeFlavors, cakeDesigns, cakeSizes, creamTypes } from "@/lib/mock-data/cake-options"
import { Cake } from "lucide-react"
import Image from "next/image"

export function CakePreviewPanel() {
  const flavorId = useCakeBuilderStore((s) => s.flavorId)
  const designId = useCakeBuilderStore((s) => s.designId)
  const sizeId = useCakeBuilderStore((s) => s.sizeId)
  const ceremonyId = useCakeBuilderStore((s) => s.ceremonyId)
  const creamTypeId = useCakeBuilderStore((s) => s.creamTypeId)
  const extraLayerCount = useCakeBuilderStore((s) => s.extraLayerCount)
  const cakeMessage = useCakeBuilderStore((s) => s.cakeMessage)
  const customPounds = useCakeBuilderStore((s) => s.customPounds)
  const getTotalPrice = useCakeBuilderStore((s) => s.getTotalPrice)

  const flavor = flavorId ? cakeFlavors.find((f) => f.id === flavorId) : null
  const design = designId ? cakeDesigns.find((d) => d.id === designId) : null
  const size = sizeId && sizeId !== "custom" ? cakeSizes.find((s) => s.id === sizeId) : null
  const cream = creamTypeId ? creamTypes.find((c) => c.id === creamTypeId) : null

  const sizeLabel = sizeId === "custom" ? `${customPounds} lb custom` : size?.label ?? "—"
  const total = getTotalPrice()

  return (
    <Card className="card-luxury sticky top-4">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Cake className="w-5 h-5 text-primary" />
          <span className="font-serif text-lg text-foreground">Live preview</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {design ? (
          <div className="aspect-square max-h-[180px] relative rounded-xl overflow-hidden bg-muted">
            <Image src={design.imageUrl} alt={design.name} fill className="object-cover" sizes="200px" />
            {cakeMessage ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <p className="text-white text-sm font-serif drop-shadow-md text-center px-2 line-clamp-2">{cakeMessage}</p>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="aspect-square max-h-[180px] rounded-xl bg-muted flex items-center justify-center">
            <Cake className="w-12 h-12 text-muted-foreground" />
          </div>
        )}

        <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <dt className="text-muted-foreground">Flavor</dt>
          <dd className="font-medium">{flavor?.name ?? "—"}</dd>
          <dt className="text-muted-foreground">Size</dt>
          <dd className="font-medium">{sizeLabel}</dd>
          <dt className="text-muted-foreground">Design</dt>
          <dd className="font-medium">{design?.name ?? "—"}</dd>
          <dt className="text-muted-foreground">Cream</dt>
          <dd className="font-medium">{cream?.name ?? "—"}</dd>
          {extraLayerCount > 0 && (
            <>
              <dt className="text-muted-foreground">Extra layers</dt>
              <dd className="font-medium">{extraLayerCount}</dd>
            </>
          )}
        </dl>

        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="font-serif text-xl text-primary">Rs {total.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
