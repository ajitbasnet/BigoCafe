"use client"

import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { postcardMessageMaxLength } from "@/lib/mock-data/cake-options"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export function PostCardInput() {
  const postcardMessage = useCakeBuilderStore((s) => s.postcardMessage)
  const setPostcardMessage = useCakeBuilderStore((s) => s.setPostcardMessage)

  const remaining = postcardMessageMaxLength - postcardMessage.length

  return (
    <div className="space-y-2">
      <Label htmlFor="postcard-message">Post card message</Label>
      <p className="text-sm text-muted-foreground">
        A personal note to accompany your cake (e.g. for gifting).
      </p>
      <Textarea
        id="postcard-message"
        value={postcardMessage}
        onChange={(e) => setPostcardMessage(e.target.value.slice(0, postcardMessageMaxLength))}
        placeholder="Write a short message..."
        maxLength={postcardMessageMaxLength}
        rows={4}
        className="resize-none font-serif"
      />
      <div className="flex justify-end text-xs">
        <span className={cn(remaining < 20 && "text-destructive")}>{remaining} characters left</span>
      </div>
    </div>
  )
}
