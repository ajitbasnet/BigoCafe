"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBookingStore } from "@/stores/booking-store"
import { mockTables } from "@/lib/mock-data/booking"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const schema = z.object({
  adults: z.coerce.number().min(1, "At least 1 adult"),
  children: z.coerce.number().min(0),
})

type FormData = z.infer<typeof schema>

export function GuestCountForm() {
  const { toast } = useToast()
  const selectedTableId = useBookingStore((s) => s.selectedTableId)
  const setGuests = useBookingStore((s) => s.setGuests)
  const confirmBooking = useBookingStore((s) => s.confirmBooking)
  const setSelectedTable = useBookingStore((s) => s.setSelectedTable)

  const table = selectedTableId ? mockTables.find((t) => t.id === selectedTableId) : null
  const capacity = table?.capacity ?? 0

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { adults: 1, children: 0 },
  })

  const adults = form.watch("adults")
  const children = form.watch("children")
  const total = adults + children
  const overCapacity = capacity > 0 && total > capacity

  const onSubmit = (data: FormData) => {
    if (!selectedTableId) {
      toast({ title: "Select a table", variant: "destructive" })
      return
    }
    if (overCapacity) {
      toast({ title: "Guest count exceeds table capacity", variant: "destructive" })
      return
    }
    setGuests(data.adults, data.children)
    confirmBooking()
    setSelectedTable(null)
    toast({ title: "Booking confirmed", description: `Table ${table?.name} for ${total} guests` })
    form.reset()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="adults">Adults</Label>
          <Input
            id="adults"
            type="number"
            min={1}
            {...form.register("adults")}
            className={form.formState.errors.adults ? "border-destructive" : ""}
          />
          {form.formState.errors.adults && (
            <p className="text-xs text-destructive">{form.formState.errors.adults.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="children">Children</Label>
          <Input id="children" type="number" min={0} {...form.register("children")} />
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Total guests</span>
        <span className="font-medium">{total}</span>
      </div>
      {capacity > 0 && (
        <p className={cn("text-sm", overCapacity ? "text-destructive" : "text-muted-foreground")}>
          Table capacity: {capacity} {overCapacity && "— Reduce guest count"}
        </p>
      )}
      <Button type="submit" className="w-full" disabled={!selectedTableId || overCapacity}>
        Confirm booking
      </Button>
    </form>
  )
}
