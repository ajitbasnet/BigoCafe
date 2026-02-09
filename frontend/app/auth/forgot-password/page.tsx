"use client"

import React from "react"

import { useState } from "react"
import { createClientIfConfigured } from "@/lib/supabase/client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Loader2, ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const supabase = createClientIfConfigured()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!supabase) return
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-12">
          <Image
            src="/bigo-logo.png"
            alt="BIGO"
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="font-serif text-3xl text-foreground tracking-wider">BIGO</span>
        </Link>

        {!supabase && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-800 dark:text-amber-200 text-sm mb-8 flex gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Supabase not configured</p>
              <p className="mt-1 text-muted-foreground">
                Add your Supabase credentials to <code className="text-xs bg-muted px-1 rounded">.env.local</code>. See <a href="https://supabase.com/dashboard/project/_/settings/api" target="_blank" rel="noopener noreferrer" className="underline">dashboard</a>.
              </p>
            </div>
          </div>
        )}

        {!sent ? (
          <>
            <Link 
              href="/auth/login" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </Link>

            <h1 className="font-serif text-3xl text-foreground mb-2">Forgot Password?</h1>
            <p className="text-muted-foreground mb-8">
              {"No worries! Enter your email and we'll send you a reset link."}
            </p>

            <form onSubmit={handleResetPassword} className="space-y-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-secondary border-border focus:border-primary h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !supabase}
                className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Send Reset Link
                  </>
                )}
              </Button>
            </form>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>

            <h1 className="font-serif text-3xl text-foreground mb-4">Check Your Email</h1>
            <p className="text-muted-foreground mb-8">
              {"We've sent a password reset link to "}
              <span className="text-foreground font-medium">{email}</span>
            </p>

            <Button
              asChild
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/auth/login">
                Back to Login
              </Link>
            </Button>

            <p className="mt-6 text-sm text-muted-foreground">
              {"Didn't receive the email? "}
              <button 
                onClick={() => setSent(false)}
                className="text-primary hover:text-primary/80"
              >
                Try again
              </button>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
