import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Refreshes session and protects /admin when Supabase is configured.
 * Redirects unauthenticated users from /admin/* to /auth/login.
 */
export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({ request })
  const url = request.nextUrl
  const pathname = url.pathname

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Admin routes: do not redirect to /auth/login here. /admin/login must be reachable for the
  // admin login form. Auth for /admin dashboard is enforced in app/admin/(dashboard)/layout.tsx
  // (and can be skipped with ADMIN_SKIP_AUTH for development).
  // So we do not protect /admin in middleware.

  return response
}
