"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cake, Calendar, Clock } from "lucide-react"
import Link from "next/link"

interface OrderConfirmationProps {
  orderId: string
  pickupDate: string
  pickupTime: string
  totalFormatted: string
  onClose: () => void
}

export function OrderConfirmation({ orderId, pickupDate, pickupTime, totalFormatted, onClose }: OrderConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
          <Cake className="w-8 h-8 text-primary" />
        </div>
        <h2 className="font-serif text-2xl text-foreground">Order confirmed</h2>
        <p className="text-muted-foreground">Your cake is in the queue. We'll have it ready for pickup.</p>
      </div>

      <Card className="card-luxury">
        <CardContent className="pt-6 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-mono font-medium">{orderId}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>Pickup: {pickupDate} at {pickupTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>Estimated readiness: Morning of pickup day</span>
          </div>
          <div className="pt-2 border-t border-border flex justify-between">
            <span className="text-muted-foreground">Total</span>
            <span className="font-serif text-lg text-primary">{totalFormatted}</span>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild variant="outline">
          <Link href="/dashboard/orders">View my orders</Link>
        </Button>
        <Button asChild>
          <Link href="/dashboard/order-cakes">Order another cake</Link>
        </Button>
      </div>
    </motion.div>
  )
}
