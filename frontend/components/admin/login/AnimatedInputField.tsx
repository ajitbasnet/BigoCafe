"use client"

import React, { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedInputFieldProps {
  id: string
  label: string
  type: "email" | "password" | "text"
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  error?: boolean
  ariaDescribedBy?: string
  showPassword?: boolean
  onTogglePassword?: () => void
  disabled?: boolean
}

export function AnimatedInputField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  error,
  ariaDescribedBy,
  showPassword,
  onTogglePassword,
  disabled,
}: AnimatedInputFieldProps) {
  const [focused, setFocused] = useState(false)
  const reduceMotion = useReducedMotion()
  const isPassword = type === "password"
  const inputType = isPassword && showPassword ? "text" : type

  return (
    <div className="space-y-2">
      <motion.label
        htmlFor={id}
        className={cn(
          "block text-sm font-medium transition-colors",
          focused || value ? "text-[#2E7D32]" : "text-foreground/80"
        )}
        initial={false}
        animate={{
          y: focused || value ? -2 : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
      <motion.div
        className="relative"
        animate={error && !reduceMotion ? { x: [0, -4, 4, -4, 4, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={error ? ariaDescribedBy : undefined}
          className={cn(
            "w-full h-12 rounded-xl border-2 bg-white/50 backdrop-blur-sm px-4 text-foreground placeholder:text-muted-foreground/60",
            isPassword ? "pr-12" : "pr-4",
            "transition-all duration-300 outline-none cursor-text",
            "focus:ring-2 focus:ring-[#2E7D32]/30 focus:ring-offset-0",
            error
              ? "border-[#8B0000] focus:border-[#8B0000]"
              : focused
                ? "border-[#2E7D32] shadow-[0_0_0_3px_rgba(46,125,50,0.15)]"
                : "border-border hover:border-foreground/20"
          )}
        />
        {isPassword && onTogglePassword && (
          <motion.button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/50"
            aria-label={showPassword ? "Hide password" : "Show password"}
            whileTap={{ scale: 0.95 }}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </motion.button>
        )}
      </motion.div>
    </div>
  )
}
