/**
 * Mock admin customers for list and detail view.
 */

export interface AdminCustomer {
  id: string
  name: string
  email: string
  orderCount: number
  rewardPointsBalance: number
  favoriteItems: string[]
  membershipTier?: "bronze" | "silver" | "gold"
}

export const adminCustomersMock: AdminCustomer[] = [
  {
    id: "user-1",
    name: "Alice Sharma",
    email: "alice@example.com",
    orderCount: 24,
    rewardPointsBalance: 340,
    favoriteItems: ["Cappuccino", "Himalayan Croissant", "Latte"],
    membershipTier: "gold",
  },
  {
    id: "user-2",
    name: "Bob Thapa",
    email: "bob@example.com",
    orderCount: 12,
    rewardPointsBalance: 120,
    favoriteItems: ["Americano", "Chocolate Momo Cake"],
    membershipTier: "silver",
  },
  {
    id: "user-3",
    name: "Carol Gurung",
    email: "carol@example.com",
    orderCount: 5,
    rewardPointsBalance: 45,
    favoriteItems: ["Himalayan Chai"],
    membershipTier: "bronze",
  },
  {
    id: "user-4",
    name: "David Rai",
    email: "david@example.com",
    orderCount: 8,
    rewardPointsBalance: 88,
    favoriteItems: [],
  },
]
