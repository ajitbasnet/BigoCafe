"use client"

import React, { useState } from "react"
import { createClientIfConfigured } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { AdminLoginLayout } from "@/components/admin/login/AdminLoginLayout"

const ERROR_MESSAGE_ID = "admin-login-error"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const supabase = createClientIfConfigured()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    setLoading(true)
    setError(null)

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", data.user.id)
      .single()

    if (profile?.is_admin) {
      router.push("/admin")
      router.refresh()
    } else {
      setError("This account does not have admin access.")
    }
    setLoading(false)
  }

  return (
    <AdminLoginLayout
      formProps={{
        email,
        password,
        setEmail,
        setPassword,
        error,
        loading,
        onSubmit: handleLogin,
        supabaseConfigured: !!supabase,
        showPassword,
        setShowPassword,
        errorMessageId: ERROR_MESSAGE_ID,
      }}
    />
  )
}
