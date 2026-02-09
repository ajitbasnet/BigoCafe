"use client"

import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { useAllergyStore } from "@/stores/allergy-store"
import { cakeFlavors } from "@/lib/mock-data/cake-options"
import { allergyTypes } from "@/lib/mock-data/allergy-types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export function AllergyCheckBanner() {
  const flavorId = useCakeBuilderStore((s) => s.flavorId)
  const allergyIds = useCakeBuilderStore((s) => s.allergyIds)
  const getAllergens = useAllergyStore((s) => s.getAllergens)

  const flavor = flavorId ? cakeFlavors.find((f) => f.id === flavorId) : null
  const userAllergens = getAllergens()
  const builderAllergens = allergyIds
  const flavorAllergens = flavor?.allergenIds ?? []
  const conflictIds = flavorAllergens.filter(
    (id) => userAllergens.includes(id) || builderAllergens.includes(id)
  )
  const conflictNames = conflictIds.map((id) => allergyTypes.find((a) => a.id === id)?.name).filter(Boolean) as string[]

  if (conflictNames.length === 0) return null

  return (
    <Alert variant="destructive" className="border-destructive/50">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Allergy warning</AlertTitle>
      <AlertDescription>
        Your selection may contain: <strong>{conflictNames.join(", ")}</strong>. Update your{" "}
        <Link href="/dashboard/allergy-preferences" className="underline font-medium">
          allergy preferences
        </Link>{" "}
        or choose a different flavor.
      </AlertDescription>
    </Alert>
  )
}
