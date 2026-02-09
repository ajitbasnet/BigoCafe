"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Gift } from "lucide-react"
import { useRewardsStore } from "@/stores/rewards-store"

interface RewardsWidgetProps {
  compact?: boolean
}

export function RewardsWidget({ compact = false }: RewardsWidgetProps) {
  const {
    rewardPoints,
    lifetimePoints,
    getNextMilestone,
    getProgressToNextMilestone,
  } = useRewardsStore()

  const nextMilestone = getNextMilestone()
  const progress = getProgressToNextMilestone()

  if (compact) {
    return (
      <Card className="rounded-2xl shadow-dashboard border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C89B3C]/20 flex items-center justify-center">
                <Gift className="w-5 h-5 text-[#C89B3C]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {rewardPoints} pts
                </p>
                <p className="text-xs text-muted-foreground">
                  {nextMilestone - rewardPoints} to next reward
                </p>
              </div>
            </div>
            <Link
              href="/dashboard/rewards"
              className="relative group inline-flex items-center px-3 py-1.5 text-sm border border-border rounded-md text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              <span className="relative z-10">View</span>
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
          <Progress value={progress} className="mt-3 h-2 [&_[data-slot=progress-indicator]]:bg-[#C89B3C]" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="rounded-2xl shadow-dashboard border-border">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">
              Current Points
            </p>
            <p className="text-3xl font-bold text-[#C89B3C]">{rewardPoints}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-dashboard border-border">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">
              Lifetime Points
            </p>
            <p className="text-3xl font-bold text-foreground">
              {lifetimePoints.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-dashboard border-border">
        <CardContent className="p-6">
          <h3 className="font-medium text-foreground mb-4">
            Next milestone: {nextMilestone} pts
          </h3>
          <Progress value={progress} className="h-3 mb-4 [&_[data-slot=progress-indicator]]:bg-[#C89B3C]" />
          <p className="text-sm text-muted-foreground">
            {nextMilestone - rewardPoints} points to go — keep ordering to unlock rewards.
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-dashboard border-border">
        <CardContent className="p-6">
          <h3 className="font-medium text-foreground mb-2">Redeem at checkout</h3>
          <p className="text-sm text-muted-foreground mb-4">
            When you place an order, you can apply points for a discount (up to 30% of the order). Use the reward points field in the cart to redeem.
          </p>
          <h4 className="text-sm font-medium text-foreground mb-2">Coming soon</h4>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" disabled>
              50 pts – Free cookie
            </Button>
            <Button variant="outline" size="sm" disabled>
              100 pts – Rs. 50 off
            </Button>
            <Button variant="outline" size="sm" disabled>
              200 pts – Free drink
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
