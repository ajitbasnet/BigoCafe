/**
 * POS + Membership + Booking pricing engine – types.
 * NPR currency, frontend-only.
 */

export type MembershipTier = "standard" | "silver" | "gold" | "platinum"

export type BookingType = "standard_table" | "gold_nature_lounge" | "conference_room"

export type RoomType = "small" | "large" | null

export interface BookingDetails {
  bookingType: BookingType
  roomType: RoomType
  numberOfGuests: number
  bookingHours: number
  reservationDate: string | null
}

export type ProductCategory = "cake" | "food_drink" | "pastry" | "breakfast" | "custom"

export interface POSLineItem {
  unitPriceNPR: number
  quantity: number
  category: ProductCategory
  label?: string
}

export interface POSOrderState {
  products: POSLineItem[]
  membershipTier: MembershipTier
  bookingDetails: BookingDetails | null
  rewardPointsUsed: number
  /** Pre-calculated customization/add-ons total (NPR) if not in line items */
  customizationTotalNPR?: number
}

/** Output of the POS pricing engine for UI breakdown */
export interface POSPriceBreakdown {
  productSubtotalNPR: number
  bookingSubtotalNPR: number
  customizationSubtotalNPR: number
  membershipDiscountNPR: number
  bookingDiscountNPR: number
  rewardDiscountNPR: number
  subtotalAfterDiscountsNPR: number
  vatAmountNPR: number
  finalTotalNPR: number
  rewardPointsEarned: number
}

/** Membership discount rates per tier (0–1) */
export interface MembershipRates {
  foodDrinkRate: number
  cakeRate: number
  bookingRate: number
  rewardEarnMultiplier: number
}
