/**
 * Hook for real-time POS pricing. Pass order state and get breakdown + helpers.
 */

import { useMemo } from "react"
import {
  calculateFinalPOSTotal,
  getMaxRedeemablePoints,
  getBookingEligibilityWarning,
  canBookType,
} from "@/lib/pos"
import type { POSOrderState, POSLineItem, POSPriceBreakdown, BookingType, MembershipTier } from "@/lib/pos/types"
import type { CartItem } from "@/stores/cart-store"
import type { ProductCategory } from "@/lib/pos/types"

/**
 * Infer product category from menu item id (e.g. cake build, pastry-box, drinks).
 */
export function inferCategoryFromMenuId(menuItemId: string): ProductCategory {
  if (menuItemId.startsWith("cake") || menuItemId.includes("cake")) return "cake"
  if (menuItemId.startsWith("pastry") || menuItemId.includes("pastry")) return "pastry"
  if (menuItemId.startsWith("drk") || menuItemId.includes("drink")) return "food_drink"
  return "food_drink"
}

/**
 * Convert cart items to POS line items (for use with POS engine).
 */
export function cartItemsToPOSLineItems(
  cartItems: CartItem[],
  categoryMap?: (menuItemId: string) => ProductCategory
): POSLineItem[] {
  const getCategory = categoryMap ?? inferCategoryFromMenuId
  return cartItems.map((item) => ({
    unitPriceNPR: item.price,
    quantity: item.quantity,
    category: getCategory(item.menuItemId),
    label: item.name,
  }))
}

export interface UsePosPricingParams {
  /** POS order state. If not provided, build from cart + membership + booking + reward. */
  state?: POSOrderState | null
  /** When building from cart: cart items. */
  cartItems?: CartItem[]
  /** When building from cart: membership tier from store. */
  membershipTier?: MembershipTier
  /** When building from cart: reward points to use. */
  rewardPointsUsed?: number
  /** When building from cart: optional booking details. */
  bookingDetails?: POSOrderState["bookingDetails"]
  /** When building from cart: optional customization total. */
  customizationTotalNPR?: number
}

export interface UsePosPricingResult {
  breakdown: POSPriceBreakdown
  maxRedeemablePoints: number
  /** Call with booking type and tier to check if allowed (e.g. Gold Lounge). */
  canBook: (bookingType: BookingType, tier: MembershipTier) => boolean
  /** Warning message when current booking choice is not allowed. */
  getBookingWarning: (bookingType: BookingType, tier: MembershipTier) => string | null
}

/**
 * Compute POS breakdown and helpers. Real-time: recalc when state/params change.
 */
export function usePosPricing(params: UsePosPricingParams): UsePosPricingResult {
  const {
    state: providedState,
    cartItems = [],
    membershipTier = "standard",
    rewardPointsUsed = 0,
    bookingDetails = null,
    customizationTotalNPR = 0,
  } = params

  const state: POSOrderState = useMemo(() => {
    if (providedState) return providedState
    const products = cartItemsToPOSLineItems(cartItems)
    return {
      products,
      membershipTier,
      bookingDetails,
      rewardPointsUsed,
      customizationTotalNPR,
    }
  }, [providedState, cartItems, membershipTier, bookingDetails, rewardPointsUsed, customizationTotalNPR])

  const breakdown = useMemo(() => calculateFinalPOSTotal(state), [state])

  const maxRedeemablePoints = useMemo(
    () =>
      getMaxRedeemablePoints(
        breakdown.productSubtotalNPR +
          breakdown.bookingSubtotalNPR +
          breakdown.customizationSubtotalNPR -
          breakdown.membershipDiscountNPR -
          breakdown.bookingDiscountNPR
      ),
    [breakdown]
  )

  return {
    breakdown,
    maxRedeemablePoints,
    canBook: canBookType,
    getBookingWarning: getBookingEligibilityWarning,
  }
}
