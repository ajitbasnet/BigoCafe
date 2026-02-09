import { createClientIfConfigured } from "@/lib/supabase/server"
import { AdminUsersList } from "@/components/admin/users-list"

export default async function AdminUsersPage() {
  const supabase = await createClientIfConfigured()
  let profiles: unknown[] = []

  if (supabase) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false })
    profiles = data || []
  }

  return <AdminUsersList users={profiles as { id: string; email: string | null; full_name: string | null; phone: string | null; address: string | null; is_admin: boolean; created_at: string }[]} />
}
