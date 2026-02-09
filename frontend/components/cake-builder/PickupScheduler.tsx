"use client"

import { useState } from "react"
import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { pickupTimeSlots } from "@/lib/mock-data/cake-options"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format, addDays } from "date-fns"
import { CalendarIcon } from "lucide-react"

const MIN_PREP_DAYS = 2

export function PickupScheduler() {
  const pickupDate = useCakeBuilderStore((s) => s.pickupDate)
  const pickupTime = useCakeBuilderStore((s) => s.pickupTime)
  const setPickup = useCakeBuilderStore((s) => s.setPickup)
  const [open, setOpen] = useState(false)

  const minDate = addDays(new Date(), MIN_PREP_DAYS)
  const dateObj = pickupDate ? new Date(pickupDate) : null
  const isUrgent = dateObj && dateObj <= addDays(new Date(), MIN_PREP_DAYS + 1)

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Pickup at least {MIN_PREP_DAYS} days from today. Available windows below.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full sm:w-[220px] justify-start font-normal", !dateObj && "text-muted-foreground")}
                aria-label="Pick pickup date"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateObj ? format(dateObj, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateObj ?? undefined}
                onSelect={(d) => {
                  setPickup(d ? format(d, "yyyy-MM-dd") : null, pickupTime)
                  setOpen(false)
                }}
                disabled={(d) => d < minDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2 flex-1 max-w-xs">
          <Label htmlFor="pickup-time">Time slot</Label>
          <Select value={pickupTime ?? ""} onValueChange={(v) => setPickup(pickupDate, v || null)}>
            <SelectTrigger id="pickup-time" aria-label="Pickup time">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {pickupTimeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {isUrgent && (
        <p className="text-sm text-amber-600 dark:text-amber-500">
          Urgent order: we&apos;ll do our best. Contact us for same-week requests.
        </p>
      )}
    </div>
  )
}
