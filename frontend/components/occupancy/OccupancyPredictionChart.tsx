"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import type { HourlyPrediction } from "@/lib/occupancy-prediction/types"

const chartConfig = {
  label: { label: "Hour" },
  overallPercent: { label: "Occupancy %", color: "hsl(var(--chart-1))" },
  ground: { label: "Ground", color: "hsl(var(--chart-2))" },
  first: { label: "First", color: "hsl(var(--chart-3))" },
  second: { label: "Second", color: "hsl(var(--chart-4))" },
}

interface OccupancyPredictionChartProps {
  hourlyPrediction: HourlyPrediction[]
  className?: string
}

export function OccupancyPredictionChart({ hourlyPrediction, className }: OccupancyPredictionChartProps) {
  const data = useMemo(
    () =>
      hourlyPrediction.map((h) => ({
        label: h.label,
        overallPercent: h.overallPercent,
        ground: h.byFloor.ground,
        first: h.byFloor.first,
        second: h.byFloor.second,
      })),
    [hourlyPrediction]
  )

  if (data.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Occupancy trend</CardTitle>
          <p className="text-sm text-muted-foreground">Next 6 hours</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No prediction data.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden">
        <CardHeader>
          <CardTitle>Occupancy trend</CardTitle>
          <p className="text-sm text-muted-foreground">Predicted crowd next 6 hours</p>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[260px] w-full">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
              <XAxis dataKey="label" />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="overallPercent"
                stroke="var(--color-overallPercent)"
                fill="var(--color-overallPercent)"
                fillOpacity={0.3}
                strokeWidth={2}
                isAnimationActive
                animationDuration={500}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
