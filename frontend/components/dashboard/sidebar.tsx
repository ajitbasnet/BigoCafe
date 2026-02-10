"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { User } from "@supabase/supabase-js"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  ShoppingBag,
  Settings,
  User as UserIcon,
  X,
  Coffee,
  UtensilsCrossed,
  Package,
  Gift,
  CalendarCheck,
  Users,
  Cake,
  ShieldAlert,
  Music,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  address: string | null
  is_admin: boolean
}

interface DashboardSidebarProps {
  user: User
  profile: Profile | null
  mobileOpen?: boolean
  onMobileClose?: () => void
}

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard Overview" },
  { href: "/dashboard/booking", icon: CalendarCheck, label: "Table Booking" },
  { href: "/dashboard/meeting-rooms", icon: Users, label: "Meeting Rooms" },
  { href: "/dashboard/menu", icon: UtensilsCrossed, label: "Menu" },
  { href: "/dashboard/order-cakes", icon: Cake, label: "Order Cakes" },
  { href: "/dashboard/allergy-preferences", icon: ShieldAlert, label: "Allergy Preferences" },
  { href: "/dashboard/live-events", icon: Music, label: "Live Events" },
  { href: "/dashboard/pastry-box", icon: Package, label: "Build Pastry Box" },
  { href: "/dashboard/orders", icon: ShoppingBag, label: "My Orders" },
  { href: "/dashboard/rewards", icon: Gift, label: "Rewards" },
  { href: "/dashboard/profile", icon: UserIcon, label: "Profile" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
]

export function DashboardSidebar({
  profile,
  mobileOpen: controlledMobileOpen,
  onMobileClose,
}: DashboardSidebarProps) {
  const pathname = usePathname()
  const [internalOpen, setInternalOpen] = useState(false)
  const mobileOpen = controlledMobileOpen ?? internalOpen
  const closeSidebar = () => {
    setInternalOpen(false)
    onMobileClose?.()
  }

  return (
    <>
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
                href="/dashboard"
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

      {/* Desktop: left sidebar panel with icons */}
      <aside
        className={cn(
          "hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border flex-shrink-0"
        )}
      >
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/dashboard" className="relative group flex items-center gap-3">
            <Image
              src="/bigo-logo.png"
              alt="BIGO"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-serif text-2xl text-sidebar-foreground tracking-wider">BIGO</span>
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-sidebar-primary transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>

        <div className="p-6 border-b border-sidebar-border">
          <p className="text-sm text-sidebar-foreground/70">Welcome back,</p>
          <p className="text-sidebar-foreground font-medium truncate">
            {profile?.full_name || "Guest"}
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item, index) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-foreground border-l-2 border-sidebar-primary"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-primary"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0 transition-colors duration-300 group-hover:text-sidebar-primary" />
                  <span className="transition-colors duration-300">{item.label}</span>
                  {!isActive && (
                    <span className="absolute bottom-2 left-4 right-4 h-px bg-sidebar-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <Link
            href="/"
            className="relative group flex items-center gap-2.5 min-h-[44px] w-full px-4 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:text-sidebar-primary hover:bg-sidebar-accent/30 rounded-xl transition-all duration-300"
          >
            <Coffee className="w-4 h-4 shrink-0 transition-colors duration-300 group-hover:text-sidebar-primary" />
            <span>Back to Site</span>
            <span className="absolute bottom-2 left-4 right-4 h-px bg-sidebar-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>
      </aside>
    </>
  )
}
