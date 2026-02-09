import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error(
      'Missing Supabase env vars. Copy .env.example to .env.local and add your project URL and anon key from https://supabase.com/dashboard/project/_/settings/api'
    )
  }

  return createBrowserClient(url, key)
}

/** Returns null when Supabase is not configured – use in auth pages to avoid 500 */
export function createClientIfConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createBrowserClient(url, key)
}
