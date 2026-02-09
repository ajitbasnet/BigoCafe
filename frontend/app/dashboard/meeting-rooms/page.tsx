"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockConferenceRooms } from "@/lib/mock-data/booking"
import { FLOORS, getFloorCapacity } from "@/lib/cafe-layout"
import { Users, MapPin, ArrowRight, Monitor, Video, Coffee } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const featureIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Projector: Monitor,
  "Video Call": Video,
  Catering: Coffee,
}

export default function MeetingRoomsPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const secondFloor = FLOORS.second
  const capacityRange = getFloorCapacity("second")

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (parallaxRef.current) {
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
    <div ref={sectionRef} className="relative space-y-10 overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 -left-8 whitespace-nowrap pointer-events-none select-none">
        <div
          ref={parallaxRef}
          className="font-serif text-[15vw] text-foreground/[0.03] leading-none"
        >
          MEETING ROOMS — BIGO — MEETING ROOMS —
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
          Second floor
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl lg:text-4xl text-foreground mb-2"
        >
          Meeting Rooms
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground max-w-2xl"
        >
          {secondFloor?.purpose ?? "Meeting and conference"} — book a room for your team or clients. All rooms include WiFi and power.
        </motion.p>
        {capacityRange && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-sm text-muted-foreground mt-2"
          >
            Floor capacity: {capacityRange[0]}–{capacityRange[1]} people (by area).
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-primary mt-6"
        />
      </div>

      {/* Prominent CTA: view on layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative"
      >
        <Link href="/dashboard/booking?floor=second" className="block">
          <Card className="rounded-xl border-2 border-primary/30 bg-primary/5 hover:border-primary/50 hover:bg-primary/10 transition-all overflow-hidden">
            <CardContent className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">See rooms on the café layout</p>
                  <p className="text-sm text-muted-foreground">View floor plan and availability</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="gap-2 shrink-0 border-primary/40">
                <span>Open layout</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Room grid */}
      <div className="relative">
        <h2 className="font-serif text-xl text-foreground mb-4">Available rooms</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockConferenceRooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Card className="overflow-hidden h-full flex flex-col border-2 border-border hover:border-primary/40 hover:shadow-lg transition-all duration-300 group">
                <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 text-white">
                    <Users className="w-4 h-4 shrink-0 opacity-90" />
                    <span className="text-sm font-medium drop-shadow-sm">
                      Up to {room.capacity} people
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-foreground">{room.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-3 flex-1 flex flex-col">
                  <ul className="flex flex-wrap gap-1.5">
                    {room.features.map((f) => {
                      const Icon = featureIcons[f]
                      return (
                        <li
                          key={f}
                          className="text-xs bg-muted text-foreground/90 px-2.5 py-1 rounded-md flex items-center gap-1"
                        >
                          {Icon && <Icon className="w-3 h-3" />}
                          {f}
                        </li>
                      )
                    })}
                  </ul>
                  <Link href="/dashboard/booking?floor=second" className="mt-auto">
                    <Button className="w-full" size="sm">
                      Book room
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
