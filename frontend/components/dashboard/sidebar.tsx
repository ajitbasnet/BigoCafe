"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { User } from "@supabase/supabase-js"
import { motion } from "framer-motion"
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  User as UserIcon,
  X,
  Coffee,
  UtensilsCrossed,
  Sparkles,
  Package,
  Gift,
  CalendarCheck,
  Users,
  Cake,
  ShieldAlert,
  Music
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
      {/* Mobile Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar - luxury bakery: chocolate brown bg, cream text */}
      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : "-100%" }}
        className={cn(
          "fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-50",
          "w-64 bg-sidebar border-r border-sidebar-border flex flex-col",
          "lg:flex transition-transform duration-300"
        )}
      >
        {/* Logo - same underline hover as home */}
        <div className="p-6 border-b border-sidebar-border flex items-center justify-between">
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
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1 text-sidebar-foreground/70 hover:text-sidebar-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-sidebar-border">
          <p className="text-sm text-sidebar-foreground/70">Welcome back,</p>
          <p className="text-sidebar-foreground font-medium truncate">
            {profile?.full_name || "Guest"}
          </p>
        </div>

        {/* Navigation - same underline hover as home page */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={cn(
                  "relative group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-foreground border-l-2 border-sidebar-primary"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
                {!isActive && (
                  <span className="absolute bottom-2 left-4 right-4 h-px bg-sidebar-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Back to Site */}
        <div className="p-4 border-t border-sidebar-border">
          <Link
            href="/"
            className="relative group flex items-center gap-2.5 min-h-[44px] w-full px-4 py-2.5 text-sm font-medium text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/30 rounded-xl transition-colors duration-300"
          >
            <Coffee className="w-4 h-4 shrink-0" />
            <span>Back to Site</span>
            <span className="absolute bottom-2 left-4 right-4 h-px bg-sidebar-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>
      </motion.aside>
    </>
  )
}
