"use client"

import React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { AnimatedInputField } from "./AnimatedInputField"
import { LuxuryButton } from "./LuxuryButton"

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

export function GlassLoginCard({
  email,
  password,
  setEmail,
  setPassword,
  error,
  loading,
  onSubmit,
  supabaseConfigured,
  showPassword,
  setShowPassword,
  errorMessageId,
}: GlassLoginCardProps) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="relative z-10 w-full max-w-md"
    >
      <div
        className="relative rounded-3xl p-8 shadow-xl transition-shadow duration-300 hover:shadow-2xl pointer-events-auto"
        style={{
          background: "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h2 className="font-serif text-2xl text-foreground mb-2">Sign in to admin</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Enter your admin email and password
        </p>

        {!supabaseConfigured && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-800 dark:text-amber-200 text-sm mb-6 flex gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Supabase not configured</p>
              <p className="mt-1 text-muted-foreground">
                Add <code className="text-xs bg-muted px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
                <code className="text-xs bg-muted px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to{" "}
                <code className="text-xs bg-muted px-1 rounded">.env.local</code>.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-5">
          {error && (
            <motion.div
              id={errorMessageId}
              role="alert"
              initial={{ opacity: 0, y: -8 }}
              animate={{
                opacity: 1,
                y: 0,
                ...(reduceMotion ? {} : { x: [0, -6, 6, -6, 6, 0] }),
              }}
              transition={{
                opacity: { duration: 0.3 },
                y: { duration: 0.3 },
                ...(reduceMotion ? {} : { x: { duration: 0.4 } }),
              }}
              className="p-4 rounded-xl text-sm flex items-start gap-2"
              style={{
                background: "rgba(139, 0, 0, 0.08)",
                border: "1px solid rgba(139, 0, 0, 0.2)",
                color: "#8B0000",
              }}
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          <AnimatedInputField
            id="admin-email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
            error={!!error}
            ariaDescribedBy={error ? errorMessageId : undefined}
            disabled={!supabaseConfigured}
          />

          <AnimatedInputField
            id="admin-password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            error={!!error}
            ariaDescribedBy={error ? errorMessageId : undefined}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            disabled={!supabaseConfigured}
          />

          <LuxuryButton
            type="submit"
            disabled={loading || !supabaseConfigured}
            loading={loading}
            className="w-full"
          >
            Sign in
          </LuxuryButton>
        </form>

      </div>
    </motion.div>
  )
}
