"use client"

import React from "react"
import { BrandShowcasePanel } from "./BrandShowcasePanel"
import { GlassLoginCard } from "./GlassLoginCard"

interface GlassLoginCardProps {
  email: string
  password: string
  setEmail: (v: string) => void
  setPassword: (v: string) => void
  error: string | null
  loading: boolean
  onSubmit: (e: React.FormEvent) => void
  supabaseConfigured: boolean
  showPassword: boolean
  setShowPassword: (v: boolean) => void
  errorMessageId: string
}

interface AdminLoginLayoutProps {
  formProps: GlassLoginCardProps
}

export function AdminLoginLayout({ formProps }: AdminLoginLayoutProps) {
  return (
    <div
      data-theme="bigo-admin-login"
      className="min-h-screen bg-background font-sans flex flex-col lg:flex-row"
    >
      {/* Left (desktop) / Top (mobile) – brand panel */}
      <div className="relative z-0 lg:w-1/2 lg:min-h-screen overflow-hidden">
        <BrandShowcasePanel />
      </div>

      {/* Right (desktop) / Bottom (mobile) – login card */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6 lg:p-12 bg-[#F6F1EB] pointer-events-auto">
        <GlassLoginCard {...formProps} />
      </div>
    </div>
  )
}
