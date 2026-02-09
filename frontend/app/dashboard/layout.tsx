import React from "react"
import { User } from "@supabase/supabase-js"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

const mockUser: User = {
  id: "guest",
  email: "guest@demo.com",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  created_at: "",
} as User

const mockProfile = {
  id: "guest",
  email: "guest@demo.com",
  full_name: "Guest",
  phone: null,
  address: null,
  is_admin: false,
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardShell user={mockUser} profile={mockProfile}>
      {children}
    </DashboardShell>
  )
}
