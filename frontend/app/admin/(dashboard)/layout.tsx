import { redirect } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { createClientIfConfigured } from "@/lib/supabase/server"
import { SmoothScroll } from "@/components/smooth-scroll"
import { AdminShell } from "@/components/admin/admin-shell"

// Set to true to skip admin sign-in and allow direct access to /admin (for development)
const ADMIN_SKIP_AUTH = true

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClientIfConfigured()

  if (ADMIN_SKIP_AUTH) {
    // Render admin shell with minimal placeholder user for development
    const placeholderProfile = {
      id: "",
      email: null as string | null,
      full_name: null as string | null,
      phone: null as string | null,
      address: null as string | null,
      is_admin: true,
    }
    const placeholderUser: User = { id: "", email: "" } as unknown as User
    return (
      <SmoothScroll>
        <div data-theme="bigo-admin" className="min-h-screen bg-background font-sans">
          <AdminShell user={placeholderUser} profile={placeholderProfile}>
            {children}
          </AdminShell>
        </div>
      </SmoothScroll>
    )
  }

  if (!supabase) {
    redirect("/admin/login")
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/admin/login")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, phone, address, is_admin")
    .eq("id", session.user.id)
    .single()

  if (!profile?.is_admin) {
    redirect("/admin/login")
  }

  return (
    <SmoothScroll>
      <div data-theme="bigo-admin" className="min-h-screen bg-background font-sans">
        <AdminShell user={session.user} profile={profile}>
          {children}
        </AdminShell>
      </div>
    </SmoothScroll>
  )
}
