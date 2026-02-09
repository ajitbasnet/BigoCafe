"use client"

import { User } from "@supabase/supabase-js"
import { createClientIfConfigured } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User as UserIcon, Settings, Bell, Shield, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  is_admin: boolean
}

interface AdminHeaderProps {
  user: User
  profile: Profile | null
}

export function AdminHeader({ user, profile }: AdminHeaderProps) {
  const router = useRouter()
  const supabase = createClientIfConfigured()

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
    .slice(0, 2) || "AD"

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between gap-4 px-4 lg:px-8 transition-all duration-300">
      <div className="lg:hidden w-10 shrink-0" />

      <div className="hidden lg:flex items-center gap-3 shrink-0">
        <Shield className="w-5 h-5 text-primary" />
        <h1 className="text-lg font-medium text-foreground">Admin Panel</h1>
      </div>

      {/* Search - admin theme styled */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search orders, products, customers..."
            className="pl-9 h-9 bg-background/80 border-border text-foreground placeholder:text-muted-foreground rounded-xl focus-visible:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {/* Notifications - visible + hover */}
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-primary/10 relative rounded-xl transition-all duration-300"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
            3
          </span>
        </Button>

        {/* Admin profile dropdown - cream panel, brown text, refined hover */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 px-2 py-1.5 hover:bg-primary/10 rounded-xl border border-transparent hover:border-border transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="text-sm font-medium text-primary-foreground">{initials}</span>
              </div>
              <div className="hidden md:block text-left min-w-0">
                <span className="text-sm text-foreground block truncate">
                  {profile?.full_name || "Admin"}
                </span>
                <span className="text-xs text-primary">Administrator</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 rounded-xl border-border bg-background shadow-dashboard [&_*]:rounded-lg"
          >
            <div className="px-3 py-2 border-b border-border">
              <p className="text-sm font-medium text-foreground">{profile?.full_name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={() => router.push("/admin/settings")}
              className="cursor-pointer text-foreground focus:bg-primary/10 focus:text-foreground"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
