import { createClientIfConfigured } from "@/lib/supabase/server"
import { FavoritesList } from "@/components/dashboard/favorites-list"

export default async function FavoritesPage() {
  const supabase = await createClientIfConfigured()
  let favorites: unknown[] = []

  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
      favorites = data || []
    }
  }

  return <FavoritesList favorites={favorites as { id: string; product_name: string; product_category: string | null; product_price: number | null }[]} />
}
