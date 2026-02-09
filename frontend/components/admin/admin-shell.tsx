"use client"

import { useState } from "react"
import { User } from "@supabase/supabase-js"
import { AdminNav } from "@/components/admin/admin-nav"
import { AdminSidebar } from "@/components/admin/sidebar"

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  address: string | null
  is_admin: boolean
}

interface AdminShellProps {
  user: User
  profile: Profile | null
  children: React.ReactNode
}

export function AdminShell({ user, profile, children }: AdminShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <AdminNav
        user={user}
        profile={profile}
        onMenuClick={() => setMobileOpen(true)}
      />
      <div className="flex pt-[72px] min-h-screen">
        <AdminSidebar
          user={user}
          profile={profile}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />
        <main className="flex-1 min-w-0 overflow-x-hidden p-6 lg:p-8">{children}</main>
      </div>
    </>
  )
}
