"use client"

import Link from "next/link"
import Image from "next/image"
import { User } from "@supabase/supabase-js"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  BarChart3,
  Menu,
  X,
  Package,
  Shield,
  Coffee,
  Sliders,
  Box,
  Gift,
  Flower2,
  UserCog,
  LayoutGrid,
  Cake,
} from "lucide-react"
import { useState } from "react"

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  is_admin: boolean
}

interface AdminSidebarProps {
  user: User
  profile: Profile | null
  /** When provided, sidebar is controlled by parent (e.g. AdminNav hamburger). Internal mobile button is hidden. */
  mobileOpen?: boolean
  onMobileClose?: () => void
}

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/customization", icon: Sliders, label: "Customization Builder" },
  { href: "/admin/pastry-box", icon: Box, label: "Pastry Box Builder" },
  { href: "/admin/customers", icon: Users, label: "Customers" },
  { href: "/admin/cake", icon: Cake, label: "Cake" },
  { href: "/admin/rewards", icon: Gift, label: "Rewards" },
  { href: "/admin/seasonal", icon: Flower2, label: "Seasonal Menu" },
  { href: "/admin/staff", icon: UserCog, label: "Staff" },
  { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/admin/occupancy", icon: LayoutGrid, label: "AI Occupancy" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
]

export function AdminSidebar({ profile, mobileOpen: controlledMobileOpen, onMobileClose }: AdminSidebarProps) {
  const [internalMobileOpen, setInternalMobileOpen] = useState(false)
  const isControlled = controlledMobileOpen !== undefined && onMobileClose !== undefined
  const mobileOpen = isControlled ? controlledMobileOpen : internalMobileOpen
  const closeSidebar = () => {
    if (isControlled) onMobileClose?.()
    else setInternalMobileOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button - only when not controlled (no AdminNav) */}
      {!isControlled && (
        <button
          onClick={() => setInternalMobileOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-sidebar text-sidebar-foreground rounded-xl shadow-md"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Mobile: full-screen menu same as homepage (black, logo + X, centered large links) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              <Link
                href="/admin"
                onClick={closeSidebar}
                className="flex items-center gap-2"
              >
                <Image
                  src="/bigo-logo.png"
                  alt="BIGO"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="font-serif text-2xl tracking-wider text-white uppercase">
                  BIGO
                </span>
                <span className="text-xs text-primary flex items-center gap-1 ml-1">
                  <Shield className="w-3 h-3" /> Admin
                </span>
              </Link>
              <motion.button
                onClick={closeSidebar}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.35, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="p-2 text-white hover:text-amber-300 transition-colors duration-300"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center justify-center flex-1 gap-8"
            >
              {navItems.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={closeSidebar}
                    className="font-serif text-4xl text-white hover:text-amber-300 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + navItems.length * 0.1 }}
              >
                <Link
                  href="/"
                  onClick={closeSidebar}
                  className="font-serif text-4xl text-white hover:text-amber-300 transition-colors duration-300"
                >
                  Back to Site
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
