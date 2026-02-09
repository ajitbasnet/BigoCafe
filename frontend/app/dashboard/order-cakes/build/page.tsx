"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, RotateCcw, Save } from "lucide-react"
import {
  CakeBuilderStepper,
  CAKE_BUILDER_STEPS,
} from "@/components/cake-builder/CakeBuilderStepper"
import { CakePreview } from "@/components/cake-builder/CakePreview"
import { FlavorSelector } from "@/components/cake-builder/FlavorSelector"
import { SizeSelector } from "@/components/cake-builder/SizeSelector"
import { DesignSelector } from "@/components/cake-builder/DesignSelector"
import { CeremonySelector } from "@/components/cake-builder/CeremonySelector"
import { CreamSelector } from "@/components/cake-builder/CreamSelector"
import { LayerBuilder } from "@/components/cake-builder/LayerBuilder"
import { MessageInput } from "@/components/cake-builder/MessageInput"
import { AllergySelector } from "@/components/cake-builder/AllergySelector"
import { PickupScheduler } from "@/components/cake-builder/PickupScheduler"
import { OrderSummarySidebar } from "@/components/cake-builder/OrderSummarySidebar"
import { OrderConfirmation } from "@/components/cake-builder/OrderConfirmation"
import { BakeryDust } from "@/components/cake-builder/BakeryDust"
import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { formatNPR } from "@/lib/pricing/format"

function generateOrderId() {
  return `BIGO-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
}

function getStepLabel(stepId: string): string {
  if (stepId === "layers-cream") return "Layers & Cream"
  return stepId.charAt(0).toUpperCase() + stepId.slice(1)
}

export default function CakeBuildPage() {
  const searchParams = useSearchParams()
  const ceremonyFromUrl = searchParams.get("ceremony")

  const [step, setStep] = useState(0)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null)
  const [placedPickup, setPlacedPickup] = useState<{ date: string; time: string } | null>(null)
  const [placedTotal, setPlacedTotal] = useState("")

  const setCeremony = useCakeBuilderStore((s) => s.setCeremony)
  const pickupDate = useCakeBuilderStore((s) => s.pickupDate)
  const pickupTime = useCakeBuilderStore((s) => s.pickupTime)
  const getTotalPrice = useCakeBuilderStore((s) => s.getTotalPrice)
  const reset = useCakeBuilderStore((s) => s.reset)
  const saveDraft = useCakeBuilderStore((s) => s.saveDraft)
  const loadDraft = useCakeBuilderStore((s) => s.loadDraft)

  useEffect(() => {
    if (ceremonyFromUrl) setCeremony(ceremonyFromUrl)
  }, [ceremonyFromUrl, setCeremony])

  useEffect(() => {
    loadDraft()
  }, [loadDraft])

  useEffect(() => {
    saveDraft()
  }, [step, saveDraft])

  const stepId = CAKE_BUILDER_STEPS[step]?.id ?? "flavor"
  const isSummary = stepId === "summary"

  const goNext = useCallback(() => {
    if (isSummary) return
    setStep((s) => Math.min(s + 1, CAKE_BUILDER_STEPS.length - 1))
  }, [isSummary])

  const goPrev = useCallback(() => {
    setStep((s) => Math.max(0, s - 1))
  }, [])

  const handleProceedToOrder = useCallback(() => {
    const id = generateOrderId()
    setPlacedOrderId(id)
    setPlacedPickup(pickupDate && pickupTime ? { date: pickupDate, time: pickupTime } : null)
    setPlacedTotal(formatNPR(getTotalPrice()))
    setOrderPlaced(true)
    reset()
  }, [pickupDate, pickupTime, getTotalPrice, reset])

  const handleReset = useCallback(() => {
    reset()
    setStep(0)
  }, [reset])

  const renderStepContent = () => {
    switch (stepId) {
      case "flavor":
        return <FlavorSelector />
      case "design":
        return <DesignSelector />
      case "size":
        return <SizeSelector />
      case "ceremony":
        return <CeremonySelector />
      case "layers-cream":
        return (
          <div className="space-y-8">
            <LayerBuilder />
            <CreamSelector />
          </div>
        )
      case "messages":
        return <MessageInput />
      case "pickup":
        return <PickupScheduler />
      case "allergy":
        return <AllergySelector />
      case "summary":
        return (
          <div className="space-y-6">
            <OrderSummarySidebar />
            <Button onClick={handleProceedToOrder} className="w-full sm:w-auto" size="lg">
              Confirm order
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  if (orderPlaced && placedOrderId) {
    return (
      <div data-theme="bigo-cake-builder" className="min-h-[60vh]">
        <div className="max-w-lg mx-auto py-8">
          <OrderConfirmation
            orderId={placedOrderId}
            pickupDate={placedPickup?.date ?? "—"}
            pickupTime={placedPickup?.time ?? "—"}
            totalFormatted={placedTotal}
            onClose={() => setOrderPlaced(false)}
          />
        </div>
      </div>
    )
  }

  return (
    <div data-theme="bigo-cake-builder" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild aria-label="Back to cakes">
            <Link href="/dashboard/order-cakes">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <h1 className="font-serif text-2xl lg:text-3xl text-foreground">Build your cake</h1>
            <p className="text-sm text-muted-foreground">
              Step {step + 1} of {CAKE_BUILDER_STEPS.length}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={saveDraft} className="gap-2">
            <Save className="w-4 h-4" />
            Save draft
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset builder
          </Button>
        </div>
      </div>

      <CakeBuilderStepper
        currentStep={step}
        onStepClick={setStep}
        canNavigate={!orderPlaced}
      />

      <div className="grid lg:grid-cols-[1fr,340px] gap-8 pb-24 lg:pb-0">
        <motion.div
          key={stepId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="min-w-0"
        >
          <AnimatePresence mode="wait">
            <div className="relative card-luxury p-6 overflow-hidden">
              <BakeryDust />
              <div className="relative">
                <h2 className="font-serif text-lg text-foreground mb-4">{getStepLabel(stepId)}</h2>
                {renderStepContent()}
                {!isSummary && (
                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={goPrev} disabled={step === 0}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    <Button onClick={goNext}>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </AnimatePresence>
        </motion.div>

        <div className="hidden lg:block">
          <CakePreview />
        </div>
      </div>

      <div className="lg:hidden fixed bottom-4 left-4 right-4 z-10">
        <CakePreview />
      </div>
    </div>
  )
}
