"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  getActiveSeasonalItems,
  getActiveSeasons,
} from "@/lib/mock-data/seasonal-items"
import { formatNPR } from "@/lib/pricing/format"
import { useCartStore } from "@/stores/cart-store"
import { useToast } from "@/hooks/use-toast"
import { Sparkles, Clock, Gift } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function SeasonalPage() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const items = getActiveSeasonalItems()
  const seasons = getActiveSeasons()
  const addItem = useCartStore((s) => s.addItem)
  const { toast } = useToast()

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

  const handleAddToCart = (item: (typeof items)[0]) => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      preparationTime: item.preparationTime,
      rewardPointsEarned: item.rewardPointsEarned,
    })
    toast({
      title: "Added to cart",
      description: item.name,
    })
  }

  return (
    <div ref={sectionRef} className="relative space-y-8 overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 -left-8 whitespace-nowrap pointer-events-none select-none">
        <div
          ref={parallaxRef}
          className="font-serif text-[15vw] text-foreground/[0.03] leading-none"
        >
          SEASONAL — LIMITED — SEASONAL —
        </div>
      </div>

      <div ref={headerRef} className="relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary uppercase tracking-[0.3em] text-sm mb-2 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Seasonal Specials
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl text-foreground mb-2"
        >
          Seasonal Specials
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground"
        >
          Limited-time items. Available only during their season.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-primary mt-6"
        />
      </div>

      {seasons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2"
        >
          {seasons.map((s) => (
            <Badge key={s} variant="secondary" className="text-sm">
              {s}
            </Badge>
          ))}
        </motion.div>
      )}

      {items.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Card className="overflow-hidden rounded-2xl shadow-dashboard border-border hover:border-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw, 33vw"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-gradient-to-r from-[#C89B3C] to-[#B85C5C] text-white border-0 shadow-md">
                      {item.specialBadge}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-background/90 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {item.preparationTime} min
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs">
                      <Gift className="w-3 h-3" />
                      +{item.rewardPointsEarned} pts
                    </span>
                  </div>
                  {item.limitedAvailability !== null && (
                    <div className="absolute bottom-2 left-2 right-2 text-center">
                      <span className="text-xs bg-background/90 px-2 py-1 rounded">
                        Only {item.limitedAvailability} left
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-serif text-lg font-medium text-foreground mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-primary">
                      {formatNPR(item.price)}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      className="bg-primary text-primary-foreground"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <Card className="max-w-md mx-auto rounded-2xl shadow-dashboard border-2 border-primary/10 overflow-hidden">
            <CardContent className="p-12">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h3 className="font-serif text-2xl font-medium text-foreground mb-2">
                No seasonal items right now
              </h3>
              <p className="text-muted-foreground mb-6">
                We rotate specials by season — check back for limited-time drinks, pastries, and dishes. You can still browse our full menu anytime.
              </p>
              <Link
                href="/dashboard/menu"
                className="inline-flex px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold uppercase tracking-widest rounded-xl hover:opacity-95 transition-opacity"
              >
                View full menu
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
