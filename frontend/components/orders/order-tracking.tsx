"use client"

import { motion } from "framer-motion"
import { CheckCircle, Circle, Package, ChefHat } from "lucide-react"
import type { OrderStatus } from "@/stores/order-store"

const statusConfig: Record<
  OrderStatus,
  { label: string; icon: typeof Circle }
> = {
  received: { label: "Order Received", icon: CheckCircle },
  preparing: { label: "Preparing", icon: Package },
  baking: { label: "Baking", icon: ChefHat },
  ready: { label: "Ready for Pickup", icon: CheckCircle },
}

const statusOrder: OrderStatus[] = ["received", "preparing", "baking", "ready"]

interface OrderTrackingProps {
  currentStatus: OrderStatus
  estimatedReadyTime: Date
  onSimulateNext?: () => void
}

export function OrderTracking({
  currentStatus,
  estimatedReadyTime,
  onSimulateNext,
}: OrderTrackingProps) {
  const currentIndex = statusOrder.indexOf(currentStatus)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Ready by{" "}
          {estimatedReadyTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        {onSimulateNext && currentStatus !== "ready" && (
          <button
            onClick={onSimulateNext}
            className="relative group text-sm text-primary hover:text-primary/90 transition-colors duration-300"
          >
            Simulate next step
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-0">
        {statusOrder.map((status, index) => {
          const config = statusConfig[status]
          const isCompleted = index <= currentIndex

          return (
            <div key={status} className="flex flex-1 items-center">
              <div className="flex flex-col items-center flex-1">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCompleted ? 1.05 : 1,
                  }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <config.icon className="w-5 h-5" />
                </motion.div>
                <span
                  className={`text-xs font-medium mt-2 text-center ${
                    isCompleted ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {config.label}
                </span>
              </div>
              {index < statusOrder.length - 1 && (
                <div className="flex-1 h-0.5 mx-1 bg-muted rounded overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="h-full bg-primary"
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="flex justify-center pt-2">
        <p className="text-sm font-medium text-foreground">
          {statusConfig[currentStatus].label}
        </p>
      </div>
    </div>
  )
}
