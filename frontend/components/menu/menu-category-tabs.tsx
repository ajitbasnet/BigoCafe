"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { MenuCategory } from "@/lib/mock-data/menu-items"

export type MenuTabId = MenuCategory | "order-cakes" | "pastry-box"

const tabs: { id: MenuTabId; label: string }[] = [
  { id: "bakery", label: "Bakery" },
  { id: "drinks", label: "Drinks" },
  { id: "breakfast", label: "Breakfast" },
  { id: "order-cakes", label: "Order Cakes" },
  { id: "pastry-box", label: "Pastry Box" },
]

interface MenuCategoryTabsProps {
  activeTab: MenuTabId
  onTabChange: (tab: MenuTabId) => void
}

export function MenuCategoryTabs({
  activeTab,
  onTabChange,
}: MenuCategoryTabsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative px-6 py-3 text-sm font-medium uppercase tracking-wider rounded-xl transition-colors duration-300",
            activeTab === tab.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="menuActiveTab"
              className="absolute inset-0 bg-primary rounded-xl"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}
