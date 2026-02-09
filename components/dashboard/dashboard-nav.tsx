"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { User } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../frontend/components/ui/dropdown-menu"
import { Button } from "../../frontend/components/ui/button"
import { User as UserIcon, Settings, Bell } from "lucide-react"
import { Switch } from "../../frontend/components/ui/switch"
import { CartLink } from "../../frontend/components/orders/cart-link"
import { usePathname } from "next/navigation"
import { createClientIfConfigured } from "../../frontend/lib/supabase/client"
import { useRouter } from "next/navigation"
import { dashboardNotifications } from "../../frontend/lib/mock-data/notifications"

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  address: string | null
  is_admin: boolean
}

interface DashboardNavProps {
  user: User
  profile: Profile | null
  onMenuClick?: () => void
}

const dashboardNavLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/menu", label: "Menu" },
  { href: "/dashboard/seasonal", label: "Seasonal" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/rewards", label: "Rewards" },
]

export function DashboardNav({ user, profile, onMenuClick }: DashboardNavProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClientIfConfigured()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = async () => {
    if (supabase) await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const initials = profile?.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || user.email?.slice(0, 2).toUpperCase()

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md py-3 border-b border-border"
          : "bg-background/80 backdrop-blur-sm py-4"
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="relative group flex items-center gap-2 py-2 px-2 -mx-2 rounded-xl text-foreground hover:bg-muted/50 transition-colors duration-300"
        >
          <Image
            src="/bigo-logo.png"
            alt="BIGO"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="font-serif text-2xl lg:text-3xl tracking-wider">
            BIGO
          </span>
          <span className="absolute -bottom-0.5 left-2 right-2 h-px bg-primary/30 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
        </Link>

        {/* Desktop Navigation - same underline hover as home */}
        <ul className="hidden lg:flex items-center gap-8">
          {dashboardNavLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" && pathname.startsWith(link.href))
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative group text-sm uppercase tracking-widest transition-colors duration-300 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          <CartLink />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="relative p-2.5 rounded-xl text-foreground/90 hover:text-primary hover:bg-primary/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {dashboardNotifications.some((n) => !n.read) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary pointer-events-none" aria-hidden />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              data-theme="bigo-dashboard"
              align="end"
              sideOffset={8}
              className="w-[360px] rounded-2xl border-[#E8D9C8] bg-[#FFF8F0] shadow-dashboard p-0 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-[#E8D9C8]">
                <h3 className="font-semibold text-[#4A2C2A]">Notifications</h3>
                <p className="text-xs text-[#6F5E53] mt-0.5">{dashboardNotifications.length} messages</p>
              </div>
              <div className="notification-dropdown-scroll">
                {dashboardNotifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-[#6F5E53]">No notifications yet</div>
                ) : (
                  dashboardNotifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 border-b border-[#E8D9C8]/50 last:border-0 hover:bg-[#F3E6D8]/50 transition-colors ${!n.read ? "bg-[#4A2C2A]/5" : ""}`}
                    >
                      <p className="text-sm font-medium text-[#4A2C2A]">{n.title}</p>
                      <p className="text-xs text-[#6F5E53] mt-0.5 line-clamp-2">{n.message}</p>
                      <p className="text-xs text-[#6F5E53]/80 mt-1.5">{n.time}</p>
                    </div>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-foreground hover:bg-muted/60 transition-colors duration-300 relative group"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/20">
                  <span className="text-sm font-semibold text-primary">
                    {initials}
                  </span>
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {profile?.full_name || user.email}
                </span>
                <span className="absolute -bottom-0.5 left-3 right-3 h-px bg-primary/30 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              data-theme="bigo-dashboard"
              align="end"
              sideOffset={8}
              className="w-60 rounded-2xl border-[#E8D9C8] bg-[#FFF8F0] text-[#4A2C2A] shadow-dashboard p-2"
            >
              <div className="px-3 py-3 border-b border-[#E8D9C8]">
                <p className="text-sm font-semibold text-[#4A2C2A]">
                  {profile?.full_name}
                </p>
                <p className="text-xs text-[#6F5E53] mt-0.5">{user.email}</p>
              </div>
              <DropdownMenuSeparator className="bg-[#E8D9C8] my-2" />
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/profile")}
                className="cursor-pointer rounded-xl py-2.5 px-3 text-[#4A2C2A] hover:bg-[#F3E6D8] focus:bg-[#F3E6D8] focus:text-[#4A2C2A] data-[highlighted]:bg-[#F3E6D8] transition-colors duration-200 outline-none [&_svg]:text-[#6F5E53]"
              >
                <UserIcon className="w-4 h-4 mr-3" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/settings")}
                className="cursor-pointer rounded-xl py-2.5 px-3 text-[#4A2C2A] hover:bg-[#F3E6D8] focus:bg-[#F3E6D8] focus:text-[#4A2C2A] data-[highlighted]:bg-[#F3E6D8] transition-colors duration-200 outline-none [&_svg]:text-[#6F5E53]"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#E8D9C8] my-2" />
              <div
                className="flex items-center justify-between rounded-xl py-2.5 px-3 gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-sm text-[#6F5E53]">Signed in</span>
                <Switch
                  defaultChecked
                  onCheckedChange={(checked) => {
                    if (!checked) handleSignOut()
                  }}
                  className="data-[state=checked]:bg-[#4A2C2A] data-[state=unchecked]:bg-[#E8D9C8]"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Back to Site - same fill hover as home "Order Now" */}
          <Link
            href="/"
            className="relative overflow-hidden px-6 py-3 border border-primary text-primary text-sm uppercase tracking-widest transition-all duration-300 hover:text-primary-foreground group"
          >
            <span className="relative z-10">Back to Site</span>
            <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>

        {/* Mobile: menu + cart + user */}
        <div className="flex lg:hidden items-center gap-2">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="flex flex-col gap-1.5 p-2 text-foreground"
              aria-label="Open menu"
            >
              <motion.span className="block w-6 h-px bg-current origin-center" />
              <motion.span className="block w-6 h-px bg-current" />
              <motion.span className="block w-6 h-px bg-current origin-center" />
            </button>
          )}
          <CartLink />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl text-foreground hover:bg-muted/60 transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/20">
                  <span className="text-sm font-semibold text-primary">
                    {initials}
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              data-theme="bigo-dashboard"
              align="end"
              sideOffset={8}
              className="w-60 rounded-2xl border-[#E8D9C8] bg-[#FFF8F0] text-[#4A2C2A] shadow-dashboard p-2"
            >
              <div className="px-3 py-3 border-b border-[#E8D9C8]">
                <p className="text-sm font-semibold text-[#4A2C2A]">
                  {profile?.full_name}
                </p>
                <p className="text-xs text-[#6F5E53] mt-0.5">{user.email}</p>
              </div>
              <DropdownMenuSeparator className="bg-[#E8D9C8] my-2" />
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/profile")}
                className="cursor-pointer rounded-xl py-2.5 px-3 text-[#4A2C2A] hover:bg-[#F3E6D8] focus:bg-[#F3E6D8] data-[highlighted]:bg-[#F3E6D8] transition-colors duration-200 outline-none [&_svg]:text-[#6F5E53]"
              >
                <UserIcon className="w-4 h-4 mr-3" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/settings")}
                className="cursor-pointer rounded-xl py-2.5 px-3 text-[#4A2C2A] hover:bg-[#F3E6D8] focus:bg-[#F3E6D8] data-[highlighted]:bg-[#F3E6D8] transition-colors duration-200 outline-none [&_svg]:text-[#6F5E53]"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#E8D9C8] my-2" />
              <div
                className="flex items-center justify-between rounded-xl py-2.5 px-3 gap-3"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-sm text-[#6F5E53]">Signed in</span>
                <Switch
                  defaultChecked
                  onCheckedChange={(checked) => {
                    if (!checked) handleSignOut()
                  }}
                  className="data-[state=checked]:bg-[#4A2C2A] data-[state=unchecked]:bg-[#E8D9C8]"
                />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </motion.header>
  )
}
