"use client"

import React from "react"

import { useState } from "react"
import { User } from "@supabase/supabase-js"
import { motion } from "framer-motion"
import { createClientIfConfigured } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save, User as UserIcon } from "lucide-react"
import { useMembershipStore } from "@/stores/membership-store"
import { MembershipBadge } from "@/components/pos"
import type { MembershipTier } from "@/lib/pos/types"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Profile {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  address: string | null
  is_admin: boolean
}

interface ProfileFormProps {
  user: User
  profile: Profile | null
}

export function ProfileForm({ user, profile }: ProfileFormProps) {
  const [fullName, setFullName] = useState(profile?.full_name || "")
  const [phone, setPhone] = useState(profile?.phone || "")
  const [address, setAddress] = useState(profile?.address || "")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const membershipTier = useMembershipStore((s) => s.membershipLevel)
  const setMembershipLevel = useMembershipStore((s) => s.setMembershipLevel)

  const router = useRouter()
  const supabase = createClientIfConfigured()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) {
      setMessage({ type: "error", text: "Database not configured. Configure Supabase to save changes." })
      return
    }
    setLoading(true)
    setMessage(null)

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        phone,
        address,
      })
      .eq("id", user.id)

    if (error) {
      setMessage({ type: "error", text: error.message })
    } else {
      setMessage({ type: "success", text: "Profile updated successfully!" })
      router.refresh()
    }

    setLoading(false)
  }

  const initials = fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || user.email?.slice(0, 2).toUpperCase()

  return (
    <div className="space-y-6 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-primary uppercase tracking-[0.3em] text-sm mb-2">Profile</p>
        <h1 className="font-serif text-3xl text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information</p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-primary mt-6"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-medium text-primary">{initials}</span>
              </div>
              <div>
                <CardTitle className="text-foreground">{fullName || "Your Name"}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {message && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-lg text-sm ${
                    message.type === "success"
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      : "bg-destructive/10 text-destructive border border-destructive/20"
                  }`}
                >
                  {message.text}
                </motion.div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-secondary border-border focus:border-primary h-12"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    value={user.email || ""}
                    disabled
                    className="bg-secondary/50 border-border h-12 text-muted-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-secondary border-border focus:border-primary h-12"
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="text-foreground">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="bg-secondary border-border focus:border-primary h-12"
                    placeholder="Kathmandu, Nepal"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Membership
              <MembershipBadge tier={membershipTier} />
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Your tier applies discounts on orders and table bookings.
            </p>
          </CardHeader>
          <CardContent>
            <Label className="text-sm text-muted-foreground">Membership tier</Label>
            <Select
              value={membershipTier}
              onValueChange={(v) => setMembershipLevel(v as MembershipTier)}
            >
              <SelectTrigger className="mt-2 max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="silver">Silver (5% food, 3% cake, 5% booking)</SelectItem>
                <SelectItem value="gold">Gold (10% food, 8% cake, 12% booking)</SelectItem>
                <SelectItem value="platinum">Platinum (15% food, 12% cake, 18% booking)</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
