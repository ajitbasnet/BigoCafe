"use client"

import { motion } from "framer-motion"
import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { allergyTypes } from "@/lib/mock-data/allergy-types"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export function AllergySelector() {
  const allergyIds = useCakeBuilderStore((s) => s.allergyIds)
  const allergyOther = useCakeBuilderStore((s) => s.allergyOther)
  const toggleAllergy = useCakeBuilderStore((s) => s.toggleAllergy)
  const setAllergyOther = useCakeBuilderStore((s) => s.setAllergyOther)

  const hasAny = allergyIds.length > 0 || allergyOther.length > 0

  const options = allergyTypes.filter((a) => a.id !== "other")

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Select any allergens to avoid. We&apos;ll show a warning if your cake choices conflict.
      </p>
      {hasAny && (
        <Alert variant="destructive" className="border-destructive/50">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Allergy information recorded</AlertTitle>
          <AlertDescription>
            Your selections will be flagged on the order. Please also update{" "}
            <a href="/dashboard/allergy-preferences" className="underline font-medium">Allergy Preferences</a> to save for future orders.
          </AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((a) => {
          const checked = allergyIds.includes(a.id)
          return (
            <motion.label
              key={a.id}
              whileHover={{ y: -2 }}
              className="cursor-pointer flex items-center gap-3"
            >
              <Checkbox
                checked={checked}
                onCheckedChange={() => toggleAllergy(a.id)}
                aria-label={`I have ${a.name} allergy`}
              />
              <span className="font-medium text-foreground">{a.name}</span>
            </motion.label>
          )
        })}
      </div>
      <div className="space-y-2">
        <Label htmlFor="allergy-other">Other (please specify)</Label>
        <Input
          id="allergy-other"
          value={allergyOther}
          onChange={(e) => setAllergyOther(e.target.value)}
          placeholder="e.g. Shellfish"
          className="max-w-sm"
        />
      </div>
    </div>
  )
}
