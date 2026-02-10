"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { getMenuByCategory, type MenuCategory } from "@/lib/mock-data/menu-items"
import { MenuItemCard } from "@/components/menu/menu-item-card"
import { MenuCategoryTabs, type MenuTabId } from "@/components/menu/menu-category-tabs"
import { OrderCakesContent } from "@/components/order-cakes/order-cakes-content"
import { PastryBoxBuilder } from "@/components/pastry-box/pastry-box-builder"

gsap.registerPlugin(ScrollTrigger)

const menuCategories: MenuCategory[] = ["bakery", "drinks", "breakfast"]

export default function MenuPage() {
  const [activeTab, setActiveTab] = useState<MenuTabId>("bakery")
  const sectionRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  const activeCategory: MenuCategory =
    menuCategories.includes(activeTab as MenuCategory) ? (activeTab as MenuCategory) : "bakery"
  const items = getMenuByCategory(activeCategory)

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

  if (activeTab === "order-cakes") {
    return (
      <div ref={sectionRef} className="relative space-y-8 overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 -left-8 whitespace-nowrap pointer-events-none select-none">
          <div
            ref={parallaxRef}
            className="font-serif text-[15vw] text-foreground/[0.03] leading-none"
          >
            MENU — BIGO — MENU — BIGO —
          </div>
        </div>
        <div ref={headerRef} className="relative">
          <motion.p className="text-primary uppercase tracking-[0.3em] text-sm mb-2">Our Menu</motion.p>
          <motion.h1 className="font-serif text-3xl text-foreground mb-2">Full Menu</motion.h1>
          <motion.p className="text-muted-foreground">Browse our bakery items, drinks, and breakfast meals</motion.p>
          <div className="h-px bg-primary mt-6 w-16" />
        </div>
        <MenuCategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <OrderCakesContent />
      </div>
    )
  }

  if (activeTab === "pastry-box") {
    return (
      <div ref={sectionRef} className="relative space-y-8 overflow-hidden">
        <div className="absolute top-1/2 -translate-y-1/2 -left-8 whitespace-nowrap pointer-events-none select-none">
          <div
            ref={parallaxRef}
            className="font-serif text-[15vw] text-foreground/[0.03] leading-none"
          >
            MENU — BIGO — MENU — BIGO —
          </div>
        </div>
        <div ref={headerRef} className="relative">
          <motion.p className="text-primary uppercase tracking-[0.3em] text-sm mb-2">Our Menu</motion.p>
          <motion.h1 className="font-serif text-3xl text-foreground mb-2">Full Menu</motion.h1>
          <motion.p className="text-muted-foreground">Browse our bakery items, drinks, and breakfast meals</motion.p>
          <div className="h-px bg-primary mt-6 w-16" />
        </div>
        <MenuCategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <PastryBoxBuilder />
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="relative space-y-8 overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 -left-8 whitespace-nowrap pointer-events-none select-none">
        <div
          ref={parallaxRef}
          className="font-serif text-[15vw] text-foreground/[0.03] leading-none"
        >
          MENU — BIGO — MENU — BIGO —
        </div>
      </div>

      <div ref={headerRef} className="relative">
        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary uppercase tracking-[0.3em] text-sm mb-2"
        >
          Our Menu
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl text-foreground mb-2"
        >
          Full Menu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground"
        >
          Browse our bakery items, drinks, and breakfast meals
        </motion.p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-primary mt-6"
        />
      </div>

      <MenuCategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {items.map((item, index) => (
          <MenuItemCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 text-muted-foreground"
        >
          No items in this category at the moment.
        </motion.div>
      )}
    </div>
  )
}
