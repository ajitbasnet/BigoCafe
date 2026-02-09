"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

interface SmartBookingSuggestionPanelProps {
  suggestions: string[]
  className?: string
}

export function SmartBookingSuggestionPanel({ suggestions, className }: SmartBookingSuggestionPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
      className={className}
    >
      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Lightbulb className="w-5 h-5 text-primary" />
            Smart suggestions
          </CardTitle>
          <p className="text-sm text-muted-foreground">Booking recommendations</p>
        </CardHeader>
        <CardContent>
          {suggestions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No specific suggestions right now.</p>
          ) : (
            <ul className="space-y-2">
              {suggestions.map((text, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="text-primary mt-0.5">•</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
