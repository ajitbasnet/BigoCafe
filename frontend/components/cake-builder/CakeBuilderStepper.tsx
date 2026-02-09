"use client"

import { cn } from "@/lib/utils"

export const CAKE_BUILDER_STEPS = [
  { id: "flavor", label: "Flavor" },
  { id: "design", label: "Design" },
  { id: "size", label: "Size" },
  { id: "ceremony", label: "Ceremony" },
  { id: "layers-cream", label: "Layers & Cream" },
  { id: "messages", label: "Messages" },
  { id: "pickup", label: "Pickup" },
  { id: "allergy", label: "Allergy" },
  { id: "summary", label: "Summary" },
] as const

export type CakeBuilderStepId = (typeof CAKE_BUILDER_STEPS)[number]["id"]

interface CakeBuilderStepperProps {
  currentStep: number
  onStepClick?: (index: number) => void
  canNavigate?: boolean
}

export function CakeBuilderStepper({ currentStep, onStepClick, canNavigate = true }: CakeBuilderStepperProps) {
  return (
    <nav className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-thin" aria-label="Cake builder progress">
      {CAKE_BUILDER_STEPS.map((step, index) => {
        const isActive = index === currentStep
        const isPast = index < currentStep
        return (
          <button
            key={step.id}
            type="button"
            onClick={() => canNavigate && onStepClick?.(index)}
            disabled={!canNavigate}
            className={cn(
              "shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              isActive && "bg-primary text-primary-foreground",
              isPast && "bg-primary/20 text-primary",
              !isActive && !isPast && "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              !canNavigate && "cursor-default"
            )}
          >
            <span className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs", isActive && "bg-primary-foreground/20")}>
              {index + 1}
            </span>
            <span className="hidden sm:inline">{step.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
