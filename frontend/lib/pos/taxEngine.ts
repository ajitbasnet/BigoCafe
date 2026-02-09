/**
 * VAT (13%) applied after all discounts.
 */

import { VAT_RATE } from "./constants"

/**
 * VAT on subtotal after membership, booking, and reward discounts.
 */
export function calculateVAT(subtotalAfterDiscountsNPR: number): number {
  const safe = Math.max(0, subtotalAfterDiscountsNPR)
  return Math.round(safe * VAT_RATE)
}
