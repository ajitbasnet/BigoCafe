"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Flower2, Star, Calendar } from "lucide-react"
import { useAdminSeasonalStore } from "@/stores/admin-seasonal-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function SeasonalManager() {
  const items = useAdminSeasonalStore((s) => s.items)
  const updateItem = useAdminSeasonalStore((s) => s.updateItem)
  const setHighlight = useAdminSeasonalStore((s) => s.setHighlight)

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flower2 className="w-5 h-5" />
            Seasonal items
          </CardTitle>
          <CardDescription>
            Set date ranges and highlight seasonal products. Syncs with product &quot;seasonal&quot; where applicable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-border overflow-hidden bg-card transition-all duration-300 hover:shadow-xl hover:border-primary/20 hover:-translate-y-0.5 group"
              >
                <div className="relative h-32 bg-muted">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.specialBadge}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.seasonName}</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div className="flex gap-2 flex-wrap">
                      <Input
                        type="date"
                        value={item.startDate}
                        onChange={(e) =>
                          updateItem(item.id, { startDate: e.target.value })
                        }
                        className="text-xs h-8 rounded-lg w-[120px]"
                      />
                      <span className="text-muted-foreground">–</span>
                      <Input
                        type="date"
                        value={item.endDate}
                        onChange={(e) =>
                          updateItem(item.id, { endDate: e.target.value })
                        }
                        className="text-xs h-8 rounded-lg w-[120px]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <Label className="flex items-center gap-2 text-sm cursor-pointer">
                      <Star className="w-4 h-4 text-primary" />
                      Highlight
                    </Label>
                    <Switch
                      checked={item.highlight}
                      onCheckedChange={(v) => {
                        setHighlight(item.id, v)
                        toast.success(v ? "Highlighted" : "Unhighlighted")
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
