"use client"

import { motion } from "framer-motion"
import { pastryFlavors } from "@/lib/mock-data/pastry-flavors"
import { useAdminPastryBoxStore } from "@/stores/admin-pastry-box-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

export function PastryBoxConfig() {
  const boxSizes = useAdminPastryBoxStore((s) => s.boxSizes)
  const allowedPastryIds = useAdminPastryBoxStore((s) => s.allowedPastryIds)
  const updateBoxSize = useAdminPastryBoxStore((s) => s.updateBoxSize)
  const toggleAllowedPastry = useAdminPastryBoxStore((s) => s.toggleAllowedPastry)

  const handleSizeChange = (id: string, data: Partial<{ pieces: number; label: string; baseMultiplier: number }>) => {
    updateBoxSize(id, data)
  }
  const handleSizeBlur = () => toast.success("Saved")

  return (
    <div className="space-y-8">
      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
        <CardHeader>
          <CardTitle>Box sizes</CardTitle>
          <CardDescription>
            Configure 3, 6, and 9 piece boxes. Set pieces, label, and discount multiplier (e.g. 0.95 = 5% off).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {boxSizes.map((size, index) => (
            <motion.div
              key={size.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid gap-4 rounded-xl border border-border p-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              <div>
                <Label>Pieces</Label>
                <Input
                  type="number"
                  min={1}
                  value={size.pieces}
                  onChange={(e) =>
                    handleSizeChange(size.id, { pieces: e.target.valueAsNumber || 0 })
                  }
                  onBlur={handleSizeBlur}
                  className="mt-1 rounded-xl"
                />
              </div>
              <div>
                <Label>Label</Label>
                <Input
                  value={size.label}
                  onChange={(e) => handleSizeChange(size.id, { label: e.target.value })}
                  onBlur={handleSizeBlur}
                  placeholder="e.g. 6 Pieces"
                  className="mt-1 rounded-xl"
                />
              </div>
              <div>
                <Label>Discount multiplier (0–1)</Label>
                <Input
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={size.baseMultiplier}
                  onChange={(e) =>
                    handleSizeChange(size.id, {
                      baseMultiplier: Number(e.target.value) || 1,
                    })
                  }
                  onBlur={handleSizeBlur}
                  className="mt-1 rounded-xl"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  e.g. 0.95 = 5% off, 0.9 = 10% off
                </p>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
        <CardHeader>
          <CardTitle>Allowed pastry types</CardTitle>
          <CardDescription>
            Select which pastry flavors can be chosen in the pastry box builder.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {pastryFlavors.map((flavor) => {
              const allowed = allowedPastryIds.includes(flavor.id)
              return (
                <label
                  key={flavor.id}
                  className="flex items-center gap-2 cursor-pointer rounded-lg border border-border px-4 py-3 hover:bg-muted/50"
                >
                  <Checkbox
                    checked={allowed}
                    onCheckedChange={() => toggleAllowedPastry(flavor.id)}
                  />
                  <span className="font-medium">{flavor.name}</span>
                  <span className="text-muted-foreground text-sm">
                    Rs. {flavor.pricePerPiece}/pc
                  </span>
                </label>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
