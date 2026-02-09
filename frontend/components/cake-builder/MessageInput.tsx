"use client"

import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { cakeMessageMaxLength, postcardMessageMaxLength } from "@/lib/mock-data/cake-options"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

export function MessageInput() {
  const cakeMessage = useCakeBuilderStore((s) => s.cakeMessage)
  const setCakeMessage = useCakeBuilderStore((s) => s.setCakeMessage)
  const postcardMessage = useCakeBuilderStore((s) => s.postcardMessage)
  const setPostcardMessage = useCakeBuilderStore((s) => s.setPostcardMessage)
  const postcardEnabled = useCakeBuilderStore((s) => s.postcardEnabled)
  const setPostcardEnabled = useCakeBuilderStore((s) => s.setPostcardEnabled)

  const cakeRemaining = cakeMessageMaxLength - cakeMessage.length
  const postcardRemaining = postcardMessageMaxLength - postcardMessage.length

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cake-message">Write message for cake</Label>
        <Input
          id="cake-message"
          value={cakeMessage}
          onChange={(e) => setCakeMessage(e.target.value.slice(0, cakeMessageMaxLength))}
          placeholder="e.g. Happy Birthday!"
          maxLength={cakeMessageMaxLength}
          className="font-serif text-lg"
          aria-describedby="cake-message-count"
        />
        <div id="cake-message-count" className="flex justify-between text-xs">
          <span className="text-muted-foreground">Shown on cake</span>
          <span className={cn(cakeRemaining < 10 && "text-destructive")}>{cakeRemaining} left</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="postcard-toggle">Add postcard</Label>
          <Switch
            id="postcard-toggle"
            checked={postcardEnabled}
            onCheckedChange={setPostcardEnabled}
            aria-label="Include postcard message"
          />
        </div>
        {postcardEnabled && (
          <div className="space-y-2">
            <Label htmlFor="postcard-message">Write message for postcard</Label>
            <Textarea
              id="postcard-message"
              value={postcardMessage}
              onChange={(e) => setPostcardMessage(e.target.value.slice(0, postcardMessageMaxLength))}
              placeholder="Personal note for gifting..."
              maxLength={postcardMessageMaxLength}
              rows={4}
              className="resize-none font-serif"
              aria-describedby="postcard-count"
            />
            <div id="postcard-count" className="flex justify-end text-xs">
              <span className={cn(postcardRemaining < 20 && "text-destructive")}>{postcardRemaining} left</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
