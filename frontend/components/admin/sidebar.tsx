"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { User } from "@supabase/supabase-js"
import { motion } from "framer-motion"
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
import { cn } from "@/lib/utils"

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
  const pathname = usePathname()
  const [internalMobileOpen, setInternalMobileOpen] = useState(false)
  const isControlled = controlledMobileOpen !== undefined && onMobileClose !== undefined
  const mobileOpen = isControlled ? controlledMobileOpen : internalMobileOpen
  const setMobileOpen = isControlled ? (open: boolean) => { if (!open) onMobileClose() } : setInternalMobileOpen

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

      {/* Mobile Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => (isControlled ? onMobileClose() : setInternalMobileOpen(false))}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar - admin theme: dark chocolate bg, cream text, accent active */}
      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : "-100%" }}
        className={cn(
          "fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-50",
          "w-64 bg-sidebar border-r border-sidebar-border flex flex-col",
          "lg:flex transition-transform duration-300"
        )}
      >
        {/* Logo - same underline hover as dashboard */}
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
          <Link href="/admin" className="relative group flex items-center gap-3">
            <Image
              src="/bigo-logo.png"
              alt="BIGO"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <span className="font-serif text-xl text-sidebar-foreground tracking-wider block">BIGO</span>
              <span className="text-xs text-sidebar-primary flex items-center gap-1">
                <Shield className="w-3 h-3" /> Admin
              </span>
            </div>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-sidebar-primary transition-all duration-300 group-hover:w-full" />
          </Link>
          <button
            onClick={() => (isControlled ? onMobileClose() : setInternalMobileOpen(false))}
            className="lg:hidden p-1 text-sidebar-foreground/70 hover:text-sidebar-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Info */}
        <div className="p-6 border-b border-sidebar-border">
          <p className="text-sm text-sidebar-foreground/70">Administrator</p>
          <p className="text-sidebar-foreground font-medium truncate">
            {profile?.full_name || "Admin"}
          </p>
        </div>

        {/* Navigation - same underline hover as dashboard */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => (isControlled ? onMobileClose() : setInternalMobileOpen(false))}
                className={cn(
                  "relative group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-foreground border-l-2 border-sidebar-primary"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="text-sm">{item.label}</span>
                {!isActive && (
                  <span className="absolute bottom-2 left-4 right-4 h-px bg-sidebar-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Back to Site - same underline hover as dashboard */}
        <div className="p-4 border-t border-sidebar-border">
          <Link
            href="/"
            className="relative group flex items-center gap-3 px-4 py-3 text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 rounded-xl transition-colors duration-300"
          >
            <Coffee className="w-5 h-5" />
            <span>Back to Site</span>
            <span className="absolute bottom-2 left-4 right-4 h-px bg-sidebar-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>
      </motion.aside>
    </>
  )
}
