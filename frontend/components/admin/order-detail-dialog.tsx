"use client"

import { useState, useEffect } from "react"
import type { AdminOrder, OrderStatus } from "@/lib/mock-data/admin-orders"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const STATUS_OPTIONS: OrderStatus[] = ["Pending", "Preparing", "Ready", "Completed"]

const PAYMENT_LABELS: Record<string, string> = {
  pending: "Pending",
  paid: "Paid",
  refunded: "Refunded",
}

interface OrderDetailDialogProps {
  order: AdminOrder | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (orderId: string, data: Partial<AdminOrder>) => void
}

export function OrderDetailDialog({
  order,
  open,
  onOpenChange,
  onSave,
}: OrderDetailDialogProps) {
  const [status, setStatus] = useState<OrderStatus>("Pending")
  const [estimatedReadyTime, setEstimatedReadyTime] = useState("")
  const [customerNotes, setCustomerNotes] = useState("")

  useEffect(() => {
    if (order) {
      setStatus(order.status)
      setEstimatedReadyTime(
        order.estimatedReadyTime
          ? new Date(order.estimatedReadyTime).toISOString().slice(0, 16)
          : ""
      )
      setCustomerNotes(order.customerNotes ?? "")
    }
  }, [order])

  if (!order) return null

  const handleSave = () => {
    onSave(order.id, {
      status,
      estimatedReadyTime: estimatedReadyTime
        ? new Date(estimatedReadyTime).toISOString()
        : undefined,
      customerNotes: customerNotes.trim() || undefined,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>Order #{order.id}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-2">
          <div className="flex flex-wrap gap-2 items-center text-sm text-muted-foreground">
            <span>Customer ID: {order.userId}</span>
            <span>•</span>
            <span>
              {new Date(order.created_at).toLocaleDateString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>

          <div>
            <Label className="text-foreground font-medium">Line items</Label>
            <ul className="mt-2 space-y-2 rounded-xl border border-border p-4 bg-muted/30">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between text-sm">
                  <span className="text-foreground">
                    {item.name} × {item.quantity}
                    {item.customizations && Object.keys(item.customizations).length > 0 && (
                      <span className="text-muted-foreground ml-1">
                        ({Object.entries(item.customizations).map(([k, v]) => `${k}: ${v}`).join(", ")})
                      </span>
                    )}
                  </span>
                  <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
              {order.pastryBoxDetails && (
                <li className="flex justify-between text-sm pt-2 border-t border-border">
                  <span className="text-foreground">
                    Pastry box ({order.pastryBoxDetails.size} pcs)
                  </span>
                  <span>Rs. {order.pastryBoxDetails.totalPrice.toLocaleString()}</span>
                </li>
              )}
            </ul>
            <p className="text-right font-semibold text-foreground mt-2">
              Total: Rs. {order.totalPrice.toLocaleString()}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as OrderStatus)}>
                <SelectTrigger className="mt-1 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Payment status</Label>
              <div className="mt-1">
                <Badge variant="secondary">
                  {order.paymentStatus
                    ? PAYMENT_LABELS[order.paymentStatus] ?? order.paymentStatus
                    : "—"}
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <Label>Estimated ready time</Label>
            <Input
              type="datetime-local"
              value={estimatedReadyTime}
              onChange={(e) => setEstimatedReadyTime(e.target.value)}
              className="mt-1 rounded-xl"
            />
          </div>

          <div>
            <Label>Customer notes</Label>
            <Textarea
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="Optional notes from customer"
              rows={3}
              className="mt-1 rounded-xl"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
