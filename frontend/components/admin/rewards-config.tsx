"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gift, Plus, Trash2 } from "lucide-react"
import { useAdminRewardsStore } from "@/stores/admin-rewards-store"
import type { RedemptionRule } from "@/lib/mock-data/admin-rewards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export function RewardsConfig() {
  const defaultPointsPerOrder = useAdminRewardsStore((s) => s.defaultPointsPerOrder)
  const setDefaultPointsPerOrder = useAdminRewardsStore((s) => s.setDefaultPointsPerOrder)
  const redemptionRules = useAdminRewardsStore((s) => s.redemptionRules)
  const addRedemptionRule = useAdminRewardsStore((s) => s.addRedemptionRule)
  const updateRedemptionRule = useAdminRewardsStore((s) => s.updateRedemptionRule)
  const removeRedemptionRule = useAdminRewardsStore((s) => s.removeRedemptionRule)
  const loyaltyTiers = useAdminRewardsStore((s) => s.loyaltyTiers)
  const seasonalBonusMultiplier = useAdminRewardsStore((s) => s.seasonalBonusMultiplier)
  const setSeasonalBonusMultiplier = useAdminRewardsStore((s) => s.setSeasonalBonusMultiplier)

  const [newRulePoints, setNewRulePoints] = useState(50)
  const [newRuleDesc, setNewRuleDesc] = useState("")

  const handleAddRule = () => {
    if (!newRuleDesc.trim()) return
    addRedemptionRule({
      pointsRequired: newRulePoints,
      rewardDescription: newRuleDesc.trim(),
    })
    setNewRuleDesc("")
    setNewRulePoints(50)
    toast.success("Redemption rule added")
  }

  return (
    <div className="space-y-8">
      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Default points
          </CardTitle>
          <CardDescription>
            Default reward points per order (when product-specific points are not set).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Label>Points per order</Label>
            <Input
              type="number"
              min={0}
              value={defaultPointsPerOrder}
              onChange={(e) => setDefaultPointsPerOrder(Number(e.target.value) || 0)}
              className="w-24 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
        <CardHeader>
          <CardTitle>Redemption rules</CardTitle>
          <CardDescription>
            Define how many points are needed for rewards (e.g. 50 pts = free cookie).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {redemptionRules.map((rule) => (
            <motion.div
              key={rule.id}
              layout
              className="flex flex-wrap items-center gap-3 rounded-xl border border-border p-4 bg-muted/30"
            >
              <Input
                type="number"
                min={0}
                value={rule.pointsRequired}
                onChange={(e) =>
                  updateRedemptionRule(rule.id, {
                    pointsRequired: Number(e.target.value) || 0,
                  })
                }
                className="w-20 rounded-xl"
              />
              <span className="text-muted-foreground">pts =</span>
              <Input
                value={rule.rewardDescription}
                onChange={(e) =>
                  updateRedemptionRule(rule.id, {
                    rewardDescription: e.target.value,
                  })
                }
                placeholder="Reward description"
                className="flex-1 min-w-[120px] rounded-xl"
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => removeRedemptionRule(rule.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Input
              type="number"
              min={0}
              value={newRulePoints}
              onChange={(e) => setNewRulePoints(Number(e.target.value) || 0)}
              className="w-20 rounded-xl"
            />
            <span className="text-muted-foreground">pts =</span>
            <Input
              value={newRuleDesc}
              onChange={(e) => setNewRuleDesc(e.target.value)}
              placeholder="e.g. Free cookie"
              className="w-48 rounded-xl"
            />
            <Button size="sm" className="rounded-xl" onClick={handleAddRule}>
              <Plus className="w-4 h-4 mr-1" />
              Add rule
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
        <CardHeader>
          <CardTitle>Loyalty tiers</CardTitle>
          <CardDescription>
            Points thresholds and bonus multipliers per tier (placeholder – edit in store to customize).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {loyaltyTiers.map((tier) => (
              <div
                key={tier.id}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
              >
                <span className="font-medium">{tier.name}</span>
                <span className="text-muted-foreground text-sm">
                  ≥ {tier.pointsThreshold} pts, {(tier.multiplier - 1) * 100}% bonus
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
        <CardHeader>
          <CardTitle>Seasonal bonus</CardTitle>
          <CardDescription>
            Multiplier for reward points during seasonal campaigns (e.g. 1.2 = 20% extra).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Label>Multiplier</Label>
            <Input
              type="number"
              min={1}
              step={0.1}
              value={seasonalBonusMultiplier}
              onChange={(e) =>
                setSeasonalBonusMultiplier(Number(e.target.value) || 1)
              }
              className="w-24 rounded-xl"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
