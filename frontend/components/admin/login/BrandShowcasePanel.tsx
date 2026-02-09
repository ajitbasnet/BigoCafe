"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useReducedMotion } from "framer-motion"
import { Shield } from "lucide-react"
import { AmbientBackground } from "./AmbientBackground"

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good Morning, Admin"
  if (hour < 17) return "Good Afternoon, Admin"
  return "Good Evening, Admin"
}

export function BrandShowcasePanel() {
  const reduceMotion = useReducedMotion()
  const greeting = getGreeting()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col justify-center px-8 py-12 lg:px-16 min-h-[40vh] lg:min-h-full"
    >
      {/* Background image + gradient overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/interior.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(62, 39, 35, 0.85) 0%, rgba(46, 125, 50, 0.45) 100%)",
          }}
        />
        <AmbientBackground />
      </div>

      <div className="relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-3 mb-10 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-lg"
        >
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          >
            <Image
              src="/bigo-logo.png"
              alt="BIGO"
              width={56}
              height={56}
              className="object-contain"
            />
          </motion.span>
          <motion.span
            initial={reduceMotion ? false : { opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="font-serif text-2xl lg:text-3xl text-white tracking-wider"
          >
            BIGO
          </motion.span>
        </Link>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-white/90 text-sm font-medium uppercase tracking-widest mb-2"
        >
          Luxury Café & Bakery
        </motion.p>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="text-white/80 text-lg italic max-w-sm mb-8"
        >
          &ldquo;Crafting Peace In Every Sip & Bite&rdquo;
        </motion.p>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="flex items-center gap-3 text-white/90 mb-2"
        >
          <Shield className="w-8 h-8" aria-hidden />
          <span className="text-sm font-medium uppercase tracking-widest">Admin</span>
        </motion.div>

        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="font-serif text-3xl lg:text-4xl text-white mb-2"
        >
          {greeting}
        </motion.h1>

        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="text-white/70 max-w-sm text-sm"
        >
          Use your admin account to manage orders, products, and settings.
        </motion.p>
      </div>
    </motion.div>
  )
}
