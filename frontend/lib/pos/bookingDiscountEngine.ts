/**
 * Table booking pricing and discount. Eligibility: Gold Lounge for Gold/Platinum only.
 */

import {
  BOOKING_FEE_STANDARD_NPR,
  BOOKING_FEE_GOLD_LOUNGE_NPR,
  BOOKING_CONFERENCE_SMALL_PER_HOUR_NPR,
  BOOKING_CONFERENCE_LARGE_PER_HOUR_NPR,
} from "./constants"
import { getMembershipBookingDiscount } from "./membershipPricingEngine"
import type { BookingDetails, BookingType, MembershipTier } from "./types"

/**
 * Compute raw booking price (NPR) from booking details.
 */
export function getBookingPriceNPR(details: BookingDetails | null): number {
  if (!details) return 0
  const { bookingType, roomType, bookingHours } = details
  switch (bookingType) {
    case "standard_table":
      return BOOKING_FEE_STANDARD_NPR
    case "gold_nature_lounge":
      return BOOKING_FEE_GOLD_LOUNGE_NPR
    case "conference_room": {
      const hours = Math.max(0, Math.min(24, bookingHours || 1))
      if (roomType === "large") return hours * BOOKING_CONFERENCE_LARGE_PER_HOUR_NPR
      return hours * BOOKING_CONFERENCE_SMALL_PER_HOUR_NPR
    }
    default:
      return 0
  }
}

/**
 * Apply booking discount using membership tier.
 * Returns discount amount (NPR).
 */
export function applyBookingDiscount(bookingPriceNPR: number, membershipTier: MembershipTier): number {
  return getMembershipBookingDiscount(bookingPriceNPR, membershipTier)
}

/**
 * Silver cannot book Gold Nature Lounge. Returns true if booking is allowed.
 */
export function canBookType(bookingType: BookingType, membershipTier: MembershipTier): boolean {
  if (bookingType !== "gold_nature_lounge") return true
  return membershipTier === "gold" || membershipTier === "platinum"
}

/**
 * Eligibility warning message when user selects an option they cannot book.
 */
export function getBookingEligibilityWarning(
  bookingType: BookingType,
  membershipTier: MembershipTier
): string | null {
  if (bookingType === "gold_nature_lounge" && membershipTier !== "gold" && membershipTier !== "platinum") {
    return "Gold Nature Lounge is available for Gold and Platinum members only."
  }
  return null
}
