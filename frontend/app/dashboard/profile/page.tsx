import { createClientIfConfigured } from "@/lib/supabase/server"
import { User } from "@supabase/supabase-js"
import { ProfileForm } from "@/components/dashboard/profile-form"

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

export default async function ProfilePage() {
  const supabase = await createClientIfConfigured()
  let user = mockUser
  let profile = mockProfile

  if (supabase) {
    const { data: { user: authUser } } = await supabase.auth.getUser()
    if (authUser) {
      user = authUser
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single()
      if (profileData) profile = profileData
    }
  }

  return <ProfileForm user={user} profile={profile} />
}
