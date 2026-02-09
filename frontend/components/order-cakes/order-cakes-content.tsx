"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cake, Sparkles, Heart, Gift } from "lucide-react"
import { cakeDesigns } from "@/lib/mock-data/cake-options"
import Image from "next/image"

const categories = [
  { id: "wedding", label: "Wedding Cakes", icon: Heart, description: "Elegant tiers for your big day" },
  { id: "birthday", label: "Birthday Cakes", icon: Cake, description: "Celebrate in style" },
  { id: "anniversary", label: "Anniversary", icon: Sparkles, description: "Sweet milestones" },
  { id: "festive", label: "Festive & Others", icon: Gift, description: "Bhai Tika, Mother's Day & more" },
]

export function OrderCakesContent() {
  const featured = cakeDesigns.slice(0, 3)

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-primary uppercase tracking-[0.2em] text-sm mb-2">Order</p>
        <h1 className="font-serif text-3xl lg:text-4xl text-foreground">Cakes</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Choose a pre-designed cake or build your own with our step-by-step customizer.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="space-y-6"
      >
        <h2 className="font-serif text-xl text-foreground">Categories</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/dashboard/order-cakes/build?ceremony=${cat.id}`}>
              <Card className="card-luxury h-full transition-luxury hover:border-primary/40 cursor-pointer">
                <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <cat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{cat.label}</span>
                  <span className="text-xs text-muted-foreground">{cat.description}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="font-serif text-xl text-foreground">Featured designs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((design) => (
            <Link key={design.id} href="/dashboard/order-cakes/build">
              <Card className="card-luxury overflow-hidden transition-luxury hover:border-primary/40 cursor-pointer">
                <div className="aspect-[4/3] relative bg-muted">
                  <Image
                    src={design.imageUrl}
                    alt={design.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <CardContent className="pt-4">
                  <p className="font-medium text-foreground">{design.name}</p>
                  {design.tags?.length ? (
                    <p className="text-xs text-muted-foreground mt-1">{design.tags.join(" · ")}</p>
                  ) : null}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="card-luxury overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="font-serif text-2xl lg:text-3xl text-foreground">Build your own cake</h2>
              <p className="text-muted-foreground mt-2 max-w-md">
                Choose flavor, size, design, cream, layers, and add a personal message. Our guided builder makes it easy.
              </p>
            </div>
            <Link href="/dashboard/order-cakes/build">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                Customize cake
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  )
}
