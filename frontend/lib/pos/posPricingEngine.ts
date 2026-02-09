/**
 * POS Pricing Engine – orchestrates product, membership, booking, reward, VAT.
 * Final POS Total = (Product + Booking + Customization - Membership - Booking - Reward) + VAT
 */

import type { POSOrderState, POSLineItem, POSPriceBreakdown, ProductCategory } from "./types"
import { applyMembershipDiscount } from "./membershipPricingEngine"
import { getBookingPriceNPR, applyBookingDiscount } from "./bookingDiscountEngine"
import { calculateRewardEarned, applyRewardRedemption } from "./rewardEngine"
import { calculateVAT } from "./taxEngine"

/**
 * Sum product subtotal from line items; split into food/drink vs cake for membership rates.
 */
export function calculateProductSubtotal(products: POSLineItem[]): {
  productSubtotalNPR: number
  foodDrinkSubtotalNPR: number
  cakeSubtotalNPR: number
} {
  let productSubtotalNPR = 0
  let cakeSubtotalNPR = 0
  for (const item of products) {
    const lineTotal = item.unitPriceNPR * Math.max(0, item.quantity)
    productSubtotalNPR += lineTotal
    if (item.category === "cake") cakeSubtotalNPR += lineTotal
  }
  const foodDrinkSubtotalNPR = productSubtotalNPR - cakeSubtotalNPR
  return { productSubtotalNPR, foodDrinkSubtotalNPR, cakeSubtotalNPR }
}

/**
 * Full POS price breakdown for UI.
 * Applies: membership discount (product), booking price + booking discount, reward redemption, VAT.
 */
export function calculateFinalPOSTotal(state: POSOrderState): POSPriceBreakdown {
  const {
    products,
    membershipTier,
    bookingDetails,
    rewardPointsUsed,
    customizationTotalNPR = 0,
  } = state

  const { productSubtotalNPR, foodDrinkSubtotalNPR, cakeSubtotalNPR } = calculateProductSubtotal(products)
  const bookingSubtotalNPR = getBookingPriceNPR(bookingDetails)
  const customizationSubtotalNPR = Math.max(0, customizationTotalNPR)

  const membershipDiscountNPR = applyMembershipDiscount({
    foodDrinkSubtotalNPR,
    cakeSubtotalNPR,
    membershipTier,
  })
  const bookingDiscountNPR = applyBookingDiscount(bookingSubtotalNPR, membershipTier)

  const subtotalBeforeReward = Math.max(
    0,
    productSubtotalNPR + bookingSubtotalNPR + customizationSubtotalNPR - membershipDiscountNPR - bookingDiscountNPR
  )
  const rewardDiscountNPR = applyRewardRedemption({
    rewardPointsUsed,
    subtotalAfterOtherDiscountsNPR: subtotalBeforeReward,
  })
  const subtotalAfterDiscountsNPR = Math.max(0, subtotalBeforeReward - rewardDiscountNPR)
  const vatAmountNPR = calculateVAT(subtotalAfterDiscountsNPR)
  const finalTotalNPR = subtotalAfterDiscountsNPR + vatAmountNPR

  const rewardPointsEarned = calculateRewardEarned(finalTotalNPR, membershipTier)

  return {
    productSubtotalNPR,
    bookingSubtotalNPR,
    customizationSubtotalNPR,
    membershipDiscountNPR,
    bookingDiscountNPR,
    rewardDiscountNPR,
    subtotalAfterDiscountsNPR,
    vatAmountNPR,
    finalTotalNPR,
    rewardPointsEarned,
  }
}
