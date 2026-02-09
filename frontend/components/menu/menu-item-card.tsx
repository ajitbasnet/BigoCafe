"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Gift } from "lucide-react"
import type { MenuItem } from "@/lib/mock-data/menu-items"
import { useCartStore } from "@/stores/cart-store"
import { DrinkCustomizerModal } from "@/components/drink-customizer/drink-customizer-modal"
import { useToast } from "@/hooks/use-toast"

interface MenuItemCardProps {
  item: MenuItem
  index?: number
}

export function MenuItemCard({ item, index = 0 }: MenuItemCardProps) {
  const [customizerOpen, setCustomizerOpen] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const { toast } = useToast()

  const handleAddToCart = () => {
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
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="overflow-hidden rounded-2xl shadow-dashboard border-border hover:border-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
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
                Rs. {item.price}
              </span>
              {item.customizable ? (
                <Button
                  size="sm"
                  onClick={() => setCustomizerOpen(true)}
                  className="bg-primary text-primary-foreground"
                >
                  Customize
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className="bg-primary text-primary-foreground"
                >
                  Add to Cart
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <DrinkCustomizerModal
        open={customizerOpen}
        onOpenChange={setCustomizerOpen}
        item={item}
      />
    </>
  )
}
