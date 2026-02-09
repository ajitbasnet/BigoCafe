"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { pastryFlavors, pastryBoxSizes } from "@/lib/mock-data/pastry-flavors"
import { usePastryBoxStore } from "@/stores/pastry-box-store"
import { formatNPR } from "@/lib/pricing/format"
import { useCartStore } from "@/stores/cart-store"
import { useToast } from "@/hooks/use-toast"
import { Package, Trash2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function PastryBoxBuilder() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const {
    boxSizeId,
    selections,
    setBoxSize,
    addPastry,
    removePastry,
    clearBox,
    getCapacity,
    getTotalPrice,
    isFull,
  } = usePastryBoxStore()
  const addItem = useCartStore((s) => s.addItem)
  const { toast } = useToast()

  const capacity = getCapacity()
  const totalPrice = getTotalPrice()

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  const handleAddToCart = () => {
    if (selections.length === 0) {
      toast({
        title: "Box is empty",
        description: "Add pastries to your box first",
        variant: "destructive",
      })
      return
    }

    const size = pastryBoxSizes.find((s) => s.id === boxSizeId)
    const prepTime = 10
    const rewardPts = Math.floor(selections.length * 2)

    addItem({
      menuItemId: `pastry-box-${boxSizeId}`,
      name: `Pastry Box (${size?.pieces ?? 6} pieces)`,
      price: totalPrice,
      quantity: 1,
      image: "/images/bigo-pastry.jpg",
      preparationTime: prepTime,
      rewardPointsEarned: rewardPts,
      notes: selections.map((s) => s.flavor.name).join(", "),
    })

    toast({
      title: "Added to cart",
      description: `Pastry box with ${selections.length} pieces`,
    })
    clearBox()
  }

  return (
    <div ref={sectionRef} className="space-y-8">
      <div ref={headerRef} className="relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary uppercase tracking-[0.3em] text-sm mb-2"
        >
          Build Your Box
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-3xl text-foreground mb-2"
        >
          Pastry Box Builder
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-muted-foreground"
        >
          Mix and match flavors. Choose your box size and fill it with your
          favorite pastries.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true }}
          className="h-px bg-primary mt-6"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Box Size & Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <Card className="rounded-2xl shadow-dashboard border-border hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="font-medium text-foreground mb-4">Box Size</h3>
              <div className="flex gap-3">
                {pastryBoxSizes.map((size) => (
                  <Button
                    key={size.id}
                    variant={boxSizeId === size.id ? "default" : "outline"}
                    onClick={() => setBoxSize(size.id)}
                    className="flex-1"
                  >
                    {size.label}
                  </Button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {capacity} pieces max. Larger boxes get a discount!
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-dashboard border-border hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-foreground">Your Box</h3>
                {selections.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearBox}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(capacity, 3)}, 1fr)`,
                }}
              >
                {Array.from({ length: capacity }).map((_, i) => {
                  const selection = selections.find((s) => s.slotIndex === i)
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center p-2 relative min-h-[80px]"
                    >
                      {selection ? (
                        <>
                          <div
                            className={`w-8 h-8 rounded-full ${selection.flavor.color} mb-1`}
                          />
                          <span className="text-xs font-medium text-center truncate w-full">
                            {selection.flavor.name}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => removePastry(i)}
                            aria-label={`Remove ${selection.flavor.name}`}
                          >
                            ×
                          </Button>
                        </>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          Empty
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold">{formatNPR(totalPrice)}</span>
                <Button
                  onClick={handleAddToCart}
                  disabled={selections.length === 0}
                  className="bg-primary text-primary-foreground"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Flavor Picker */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl shadow-dashboard border-border hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="font-medium text-foreground mb-4">
                Choose Flavors ({selections.length}/{capacity})
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {pastryFlavors.map((flavor) => (
                  <Button
                    key={flavor.id}
                    variant="outline"
                    className="h-auto py-4 flex flex-col gap-2 border-border"
                    onClick={() => addPastry(flavor)}
                    disabled={isFull()}
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${flavor.color} mx-auto`}
                    />
                    <span>{flavor.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatNPR(flavor.pricePerPiece)}/pc
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
