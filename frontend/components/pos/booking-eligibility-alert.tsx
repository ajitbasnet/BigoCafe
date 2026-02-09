"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface BookingEligibilityAlertProps {
  message: string
  className?: string
}

export function BookingEligibilityAlert({ message, className }: BookingEligibilityAlertProps) {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Booking not available</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
