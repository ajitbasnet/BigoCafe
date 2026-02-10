"use client"

import { useEffect, useState } from "react"
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
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User as UserIcon, Settings, Bell, LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import { createClientIfConfigured } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { adminNotifications } from "@/lib/mock-data/notifications"

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  address: string | null
  is_admin: boolean
}

interface AdminNavProps {
  user: User
  profile: Profile | null
  onMenuClick?: () => void
}

const adminNavLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/analytics", label: "Charts" },
  { href: "/admin/top-selling", label: "Top Selling Items" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/rewards", label: "Rewards" },
  { href: "/admin/seasonal", label: "Seasonal" },
  { href: "/admin/products", label: "Add Items" },
  { href: "/admin/customization", label: "Customization" },
  { href: "/admin/pastry-box", label: "Pastry Box" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/cake", label: "Cake" },
]

export function AdminNav({ user, profile, onMenuClick }: AdminNavProps) {
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
    .slice(0, 2) || user.email?.slice(0, 2).toUpperCase() || "AD"

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 w-full max-w-[100vw] overflow-x-auto transition-all duration-500 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md py-3 border-b border-border"
          : "bg-background/80 backdrop-blur-sm py-5"
      }`}
    >
      <nav className="w-full max-w-[100vw] pl-3 pr-2 lg:pl-4 lg:pr-4 flex items-center justify-between min-h-[4rem] min-w-0">
        <div className="flex items-center gap-4 lg:gap-6 min-w-0 overflow-x-auto">
          <Link
            href="/admin"
            className="relative group flex items-center gap-2 py-2 pr-2 rounded-xl text-foreground hover:bg-muted/50 transition-colors duration-300 shrink-0"
          >
            <Image
              src="/bigo-logo.png"
              alt="BIGO"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="font-serif text-xl lg:text-2xl tracking-wider whitespace-nowrap">
              BIGO
            </span>
            <span className="absolute -bottom-0.5 left-2 right-2 h-px bg-primary/30 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-5 lg:gap-7 shrink-0">
          {adminNavLinks.map((link) => {
            const isOverview = link.href === "/admin" && link.label === "Overview"
            const isActive = isOverview
              ? pathname === "/admin"
              : pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href.split("?")[0]))
            return (
              <li key={link.href + link.label} className="flex items-center">
                <Link
                  href={link.href}
                  className={`relative group flex items-center justify-center min-h-[2.25rem] py-2 px-2 text-sm uppercase tracking-widest leading-tight text-center transition-colors duration-300 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="block">{link.label}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            )
          })}
          </ul>

          {/* Notification bell */}
          <div className="hidden lg:flex items-center shrink-0 ml-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="relative p-2.5 rounded-xl text-foreground/90 hover:text-primary hover:bg-primary/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {adminNotifications.some((n) => !n.read) && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary pointer-events-none" aria-hidden />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                data-theme="bigo-admin"
                align="end"
                sideOffset={8}
                className="w-[360px] rounded-2xl border-border bg-card shadow-dashboard p-0 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-border">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{adminNotifications.length} messages</p>
                </div>
                <div className="notification-dropdown-scroll">
                  {adminNotifications.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">No notifications yet</div>
                  ) : (
                    adminNotifications.map((n) => (
                      <div
                        key={n.id}
                        className={`px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/50 transition-colors ${!n.read ? "bg-primary/5" : ""}`}
                      >
                        <p className="text-sm font-medium text-foreground">{n.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                        <p className="text-xs text-muted-foreground/80 mt-1.5">{n.time}</p>
                      </div>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Admin profile next to bell */}
          <div className="hidden lg:flex items-center shrink-0 ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2.5 py-2 rounded-xl text-foreground hover:bg-muted/60 transition-colors duration-300 relative group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/20 shrink-0">
                    <span className="text-sm font-semibold text-primary">
                      {initials}
                    </span>
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap">
                    {profile?.full_name || user.email || "Admin"}
                  </span>
                  <span className="absolute -bottom-0.5 left-2 right-2 h-px bg-primary/30 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </Button>
              </DropdownMenuTrigger>
            <DropdownMenuContent
              data-theme="bigo-admin"
              align="end"
              sideOffset={8}
              className="w-60 rounded-2xl border-border bg-background shadow-dashboard p-3"
            >
              <div className="px-3 py-3.5 border-b border-border">
                <p className="text-sm font-semibold text-foreground">
                  {profile?.full_name || "Admin"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
              </div>
              <div className="pt-1.5">
              <DropdownMenuItem
                onClick={() => router.push("/admin/settings")}
                className="cursor-pointer rounded-xl py-2.5 px-3 focus:bg-muted transition-colors duration-200 [&_svg]:text-muted-foreground"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer rounded-xl py-2.5 px-3 text-destructive focus:bg-destructive/10 focus:text-destructive [&_svg]:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign out
              </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>

        {/* Mobile: menu + user */}
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
              data-theme="bigo-admin"
              align="end"
              sideOffset={8}
              className="w-60 rounded-2xl border-border bg-background shadow-dashboard p-3"
            >
              <div className="px-3 py-3.5 border-b border-border">
                <p className="text-sm font-semibold text-foreground">
                  {profile?.full_name || "Admin"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
              </div>
              <div className="pt-1.5">
              <DropdownMenuItem
                onClick={() => router.push("/admin/settings")}
                className="cursor-pointer rounded-xl py-2.5 px-3 focus:bg-muted transition-colors duration-200 [&_svg]:text-muted-foreground"
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem
                onClick={handleSignOut}
                className="cursor-pointer rounded-xl py-2.5 px-3 text-destructive focus:bg-destructive/10 focus:text-destructive [&_svg]:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Sign out
              </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </motion.header>
  )
}
