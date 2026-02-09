"use client"

import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { cakeMessageMaxLength } from "@/lib/mock-data/cake-options"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function CakeMessageInput() {
  const cakeMessage = useCakeBuilderStore((s) => s.cakeMessage)
  const setCakeMessage = useCakeBuilderStore((s) => s.setCakeMessage)

  const remaining = cakeMessageMaxLength - cakeMessage.length

  return (
    <div className="space-y-2">
      <Label htmlFor="cake-message">Cake message</Label>
      <p className="text-sm text-muted-foreground">
        This text will appear on the cake. Preview updates live in the panel.
      </p>
      <Input
        id="cake-message"
        value={cakeMessage}
        onChange={(e) => setCakeMessage(e.target.value.slice(0, cakeMessageMaxLength))}
        placeholder='e.g. Happy Birthday Ajit 🎉'
        maxLength={cakeMessageMaxLength}
        className="font-serif text-lg"
      />
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">Script-style preview in summary</span>
        <span className={cn(remaining < 10 && "text-destructive")}>{remaining} left</span>
      </div>
    </div>
  )
}
