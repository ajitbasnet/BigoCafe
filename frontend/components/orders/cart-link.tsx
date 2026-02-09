"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/stores/cart-store"

export function CartLink() {
  const items = useCartStore((s) => s.items)
  const totalQuantity = items.reduce((s, i) => s + i.quantity, 0)

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative rounded-xl text-foreground hover:bg-muted/60 hover:text-primary transition-colors duration-300"
      aria-label={totalQuantity > 0 ? `Cart with ${totalQuantity} items` : "Cart"}
      asChild
    >
      <Link href="/dashboard/orders" className="flex items-center justify-center">
        <ShoppingCart className="w-5 h-5" />
        {totalQuantity > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[1.25rem] h-5 px-1 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold ring-2 ring-background">
            {totalQuantity}
          </span>
        )}
      </Link>
    </Button>
  )
}
