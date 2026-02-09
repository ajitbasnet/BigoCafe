"use client"

import { Suspense, useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TableLayoutMap } from "@/components/booking/table-layout-map"
import { FloorSelector } from "@/components/booking/floor-selector"
import { ZoneLegend } from "@/components/booking/zone-legend"
import { GuestCountForm } from "@/components/booking/guest-count-form"
import { GoldenLockOverlay } from "@/components/booking/golden-lock-overlay"
import { useBookingStore } from "@/stores/booking-store"
import { mockTables } from "@/lib/mock-data/booking"
import { useMembershipStore } from "@/stores/membership-store"
import { FLOORS } from "@/lib/cafe-layout/constants"
import type { FloorId } from "@/lib/cafe-layout/types"
import { getBookingPriceNPR, applyBookingDiscount } from "@/lib/pos"
import { formatNPR } from "@/lib/pricing/format"
import { MembershipBadge } from "@/components/pos"
import { useOccupancyPrediction } from "@/hooks/use-occupancy-prediction"

gsap.registerPlugin(ScrollTrigger)

const Table360Viewer = dynamic(
  () => import("@/components/booking/table-360-viewer").then((m) => ({ default: m.Table360Viewer })),
  { ssr: false }
)

function BookingSuggestionsStrip() {
  const { predictions } = useOccupancyPrediction()
  const suggestions = predictions?.bookingSuggestions?.slice(0, 2) ?? []
  if (suggestions.length === 0) return null
  return (
    <div className="mt-4 p-3 rounded-lg border border-border bg-card/50 text-sm">
      <p className="font-medium text-foreground mb-1.5">Smart booking tip</p>
      <ul className="space-y-1">
        {suggestions.map((text, i) => (
          <li key={i} className="text-muted-foreground flex items-start gap-2">
            <span className="text-primary">•</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BookingContent() {
  const searchParams = useSearchParams()
  const selectedTableId = useBookingStore((s) => s.selectedTableId)
  const selectedFloorId = useBookingStore((s) => s.selectedFloorId)
  const setSelectedFloor = useBookingStore((s) => s.setSelectedFloor)
  const isGoldOrPlatinum = useMembershipStore((s) => s.isGoldOrPlatinum())
  const membershipTier = useMembershipStore((s) => s.getTier())
  const selectedTable = selectedTableId ? mockTables.find((t) => t.id === selectedTableId) : null
  const isGoldenAndLocked = selectedTable?.isGolden && !isGoldOrPlatinum()
  const bookingDetails = selectedTableId
    ? {
        bookingType: selectedTable?.isGolden ? ("gold_nature_lounge" as const) : ("standard_table" as const),
        roomType: null as const,
        numberOfGuests: 0,
        bookingHours: 1,
        reservationDate: null,
      }
    : null
  const bookingFeeNPR = getBookingPriceNPR(bookingDetails)
  const bookingDiscountNPR = applyBookingDiscount(bookingFeeNPR, membershipTier)
  const bookingPayNPR = Math.max(0, bookingFeeNPR - bookingDiscountNPR)

  useEffect(() => {
    const floor = searchParams.get("floor")
    if (floor === "ground" || floor === "first" || floor === "second") {
      setSelectedFloor(floor as FloorId)
    }
  }, [searchParams, setSelectedFloor])

  const sectionRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (parallaxRef.current && sectionRef.current) {
        gsap.to(parallaxRef.current, {
          xPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      }
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="relative space-y-8 overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 -left-8 whitespace-nowrap pointer-events-none select-none">
        <div
          ref={parallaxRef}
          className="font-serif text-[15vw] text-foreground/[0.03] leading-none"
        >
          BOOKING — BIGO — BOOKING —
        </div>
      </div>

      <div ref={headerRef} className="relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary uppercase tracking-[0.3em] text-sm mb-2"
        >
          Reserve
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl lg:text-4xl text-foreground mb-2"
        >
          Table Booking
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground max-w-2xl"
        >
          Choose a floor and table from the layout, preview your spot in 360°, then add your guest count. Gold members get access to exclusive tables.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-primary mt-6"
        />
        <div className="mt-4 p-4 rounded-xl bg-muted/40 text-sm text-muted-foreground border border-border">
          <p className="font-medium text-foreground mb-2">Floors</p>
          <ul className="list-disc list-inside space-y-0.5">
            {Object.values(FLOORS).map((f) => (
              <li key={f.id}>
                <span className="font-medium">{f.label}</span>
                {f.purpose && ` — ${f.purpose}`}
              </li>
            ))}
          </ul>
        </div>
        <BookingSuggestionsStrip />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="card-luxury overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Select table</CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose a floor, then click a table to view it in 3D. Gold icon = Gold members only.
              </p>
              <div className="pt-2">
                <FloorSelector />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ZoneLegend floorId={selectedFloorId} />
              <TableLayoutMap />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          <Card className="card-luxury overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">360° view</CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedTableId
                  ? `View from ${selectedTable?.name}. Drag to rotate.`
                  : "Select a table to see the view."}
              </p>
            </CardHeader>
            <CardContent>
              {selectedTableId ? (
                isGoldenAndLocked ? (
                  <GoldenLockOverlay onSelectGolden={() => {}}>
                    <div className="w-full aspect-video max-h-[400px] rounded-xl bg-muted/30" />
                  </GoldenLockOverlay>
                ) : (
                  <Table360Viewer />
                )
              ) : (
                <div className="w-full aspect-video max-h-[400px] rounded-xl bg-muted/30 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Select a table</p>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedTableId && !isGoldenAndLocked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {bookingFeeNPR > 0 && (
                <Card className="card-luxury">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      Reservation fee
                      {membershipTier !== "standard" && <MembershipBadge tier={membershipTier} short />}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedTable?.isGolden
                        ? "Gold Nature Lounge reservation"
                        : "Standard table reservation"}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fee</span>
                      <span>{formatNPR(bookingFeeNPR)}</span>
                    </div>
                    {bookingDiscountNPR > 0 && (
                      <div className="flex justify-between text-sm text-green-600 dark:text-green-500">
                        <span>Membership discount</span>
                        <span>−{formatNPR(bookingDiscountNPR)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-medium pt-1 border-t border-border">
                      <span>You pay</span>
                      <span className="text-primary">{formatNPR(bookingPayNPR)}</span>
                    </div>
                  </CardContent>
                </Card>
              )}
              <Card className="card-luxury">
                <CardHeader>
                  <CardTitle className="text-lg">Guest count</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Adults and children. Table capacity: {selectedTable?.capacity ?? 0}
                  </p>
                </CardHeader>
                <CardContent>
                  <GuestCountForm />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] flex items-center justify-center text-muted-foreground">Loading...</div>}>
      <BookingContent />
    </Suspense>
  )
}
