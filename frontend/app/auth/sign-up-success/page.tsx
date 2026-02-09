"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md text-center"
      >
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-12">
          <Image
            src="/bigo-logo.png"
            alt="BIGO"
            width={48}
            height={48}
            className="object-contain"
          />
          <span className="font-serif text-3xl text-foreground tracking-wider">BIGO</span>
        </Link>

        {/* Success Icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <Mail className="w-10 h-10 text-primary" />
        </motion.div>

        <h1 className="font-serif text-3xl text-foreground mb-4">Check Your Email</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          {"We've sent a confirmation link to your email address. Please click the link to verify your account and complete your registration."}
        </p>

        <div className="space-y-4">
          <Button
            asChild
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/auth/login">
              Go to Login
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full h-12 border-border hover:bg-secondary bg-transparent"
          >
            <Link href="/">
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            {"Didn't receive the email? Check your spam folder or "}
            <Link href="/auth/sign-up" className="text-primary hover:text-primary/80">
              try again
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
