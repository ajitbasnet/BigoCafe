"use client"

import { useState } from "react"
import { User } from "@supabase/supabase-js"
import { SmoothScroll } from "@/components/smooth-scroll"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { motion } from "framer-motion"

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  address: string | null
  is_admin: boolean
}

interface DashboardShellProps {
  user: User
  profile: Profile
  children: React.ReactNode
}

export function DashboardShell({ user, profile, children }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <SmoothScroll>
      <div
        data-theme="bigo-dashboard"
        className="min-h-screen bg-background font-sans"
      >
        <DashboardNav
          user={user}
          profile={profile}
          onMenuClick={() => setMobileOpen(true)}
        />
        <div className="flex pt-[72px] min-h-screen">
          <DashboardSidebar
            user={user}
            profile={profile}
            mobileOpen={mobileOpen}
            onMobileClose={() => setMobileOpen(false)}
          />
          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </SmoothScroll>
  )
}
