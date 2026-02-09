"use client"

import { useState, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  milkTypes,
  sweetnessLevels,
  addOns,
  temperatures,
} from "@/lib/mock-data/drink-options"
import type { MenuItem } from "@/lib/mock-data/menu-items"
import type { DrinkCustomization } from "@/stores/cart-store"
import { useCartStore } from "@/stores/cart-store"
import { useToast } from "@/hooks/use-toast"
import { calculateDrinkPriceNPR } from "@/lib/pricing/calculator"
import { MENU_ITEM_TO_DRINK_KEY, DRINK_MILK_NPR, DRINK_ADDON_NPR } from "@/lib/pricing/npr-config"
import { formatNPR } from "@/lib/pricing/format"
import type { DrinkSizeKey } from "@/lib/pricing/types"

const SIZE_OPTIONS: { id: DrinkSizeKey; label: string }[] = [
  { id: "small", label: "Small" },
  { id: "medium", label: "Medium" },
  { id: "large", label: "Large" },
]

export function DrinkCustomizerModal({
  open,
  onOpenChange,
  item,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  item: MenuItem
}) {
  const addItem = useCartStore((s) => s.addItem)
  const { toast } = useToast()

  const [milkType, setMilkType] = useState("whole")
  const [sweetness, setSweetness] = useState("medium")
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [temperature, setTemperature] = useState<"hot" | "iced">("hot")
  const [sizeKey, setSizeKey] = useState<DrinkSizeKey>("medium")

  const drinkKey = MENU_ITEM_TO_DRINK_KEY[item.id] ?? "latte"

  const totalPrice = useMemo(
    () =>
      calculateDrinkPriceNPR({
        drinkId: drinkKey,
        milkId: milkType,
        addOnIds: selectedAddOns,
        sizeKey,
        quantity: 1,
      }),
    [drinkKey, milkType, selectedAddOns, sizeKey]
  )

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleAddToCart = () => {
    const customization: DrinkCustomization = {
      milkType: milkTypes.find((m) => m.id === milkType)?.name ?? "Whole Milk",
      sweetness: sweetnessLevels.find((s) => s.id === sweetness)?.name ?? "Medium",
      addOns: addOns.filter((a) => selectedAddOns.includes(a.id)).map((a) => a.name),
      temperature,
      addOnsPrice: 0, // full NPR total is in item.price
    }

    addItem({
      menuItemId: item.id,
      name: item.name,
      price: totalPrice,
      quantity: 1,
      image: item.image,
      preparationTime: item.preparationTime,
      rewardPointsEarned: item.rewardPointsEarned,
      customization,
    })

    toast({
      title: "Added to cart",
      description: `${item.name} (${temperature})`,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-theme="bigo-dashboard"
        className="max-w-lg max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-[#FFF8F0]/95 border-[#E8D9C8]/60 shadow-2xl rounded-2xl"
        aria-describedby="drink-customizer-description"
      >
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">{item.name}</DialogTitle>
        </DialogHeader>
        <div id="drink-customizer-description" className="space-y-6">
          {/* Size */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Size</Label>
            <div className="flex gap-2">
              {SIZE_OPTIONS.map((s) => (
                <Button
                  key={s.id}
                  variant={sizeKey === s.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSizeKey(s.id)}
                  className="flex-1"
                >
                  {s.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Temperature */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Temperature</Label>
            <div className="flex gap-2">
              {temperatures.map((t) => (
                <Button
                  key={t.id}
                  variant={temperature === t.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTemperature(t.id)}
                  className="flex-1"
                >
                  {t.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Milk Type */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Milk Type</Label>
            <RadioGroup value={milkType} onValueChange={setMilkType}>
              <div className="grid grid-cols-2 gap-3">
                {milkTypes.map((m) => (
                  <div key={m.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={m.id} id={`milk-${m.id}`} />
                    <Label
                      htmlFor={`milk-${m.id}`}
                      className="text-sm font-normal cursor-pointer flex-1"
                    >
                      {m.name}
                      {(DRINK_MILK_NPR[m.id] ?? 0) > 0 && (
                        <span className="text-muted-foreground ml-1">
                          +{formatNPR(DRINK_MILK_NPR[m.id] ?? 0)}
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Sweetness */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Sweetness Level</Label>
            <RadioGroup value={sweetness} onValueChange={setSweetness}>
              <div className="flex flex-wrap gap-2">
                {sweetnessLevels.map((s) => (
                  <div key={s.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={s.id} id={`sweet-${s.id}`} />
                    <Label
                      htmlFor={`sweet-${s.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {s.name}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Add-ons */}
          <div>
            <Label className="text-sm font-medium mb-2 block">Add-ons</Label>
            <div className="space-y-2">
              {addOns.map((a) => (
                <div key={a.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`addon-${a.id}`}
                    checked={selectedAddOns.includes(a.id)}
                    onCheckedChange={() => toggleAddOn(a.id)}
                  />
                  <Label
                    htmlFor={`addon-${a.id}`}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {a.name}
                  </Label>
                  <span className="text-sm text-muted-foreground">
                    +{formatNPR(DRINK_ADDON_NPR[a.id] ?? 0)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-lg font-semibold">{formatNPR(totalPrice)}</span>
            <Button onClick={handleAddToCart} className="bg-primary text-primary-foreground">
              Add to Cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
