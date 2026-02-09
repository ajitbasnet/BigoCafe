/**
 * Mock notifications for dashboard and admin nav.
 */

export interface NotificationItem {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type?: "order" | "reward" | "promo" | "system"
}

/** Notifications for customer dashboard (orders, rewards, promos). */
export const dashboardNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "Order confirmed",
    message: "Your order #2041 has been confirmed and is being prepared.",
    time: "2 min ago",
    read: false,
    type: "order",
  },
  {
    id: "2",
    title: "Reward earned",
    message: "You earned 25 points on your last order. Keep ordering to unlock rewards!",
    time: "1 hour ago",
    read: false,
    type: "reward",
  },
  {
    id: "3",
    title: "Seasonal special",
    message: "Try our new Winter Specials menu — Himalayan Croissant is back for a limited time.",
    time: "Yesterday",
    read: true,
    type: "promo",
  },
  {
    id: "4",
    title: "Order delivered",
    message: "Your order #2038 was delivered. Thank you for ordering from BIGO!",
    time: "2 days ago",
    read: true,
    type: "order",
  },
]

/** Notifications for admin dashboard (orders, alerts, system). */
export const adminNotifications: NotificationItem[] = [
  {
    id: "a1",
    title: "New order received",
    message: "Order #2042 — Rs. 1,250. Prepare for pickup in 15 min.",
    time: "5 min ago",
    read: false,
    type: "order",
  },
  {
    id: "a2",
    title: "Low stock alert",
    message: "Butter Croissant is running low. Consider restocking soon.",
    time: "1 hour ago",
    read: false,
    type: "system",
  },
  {
    id: "a3",
    title: "Order completed",
    message: "Order #2040 marked as completed. Payment received.",
    time: "2 hours ago",
    read: true,
    type: "order",
  },
  {
    id: "a4",
    title: "New review",
    message: "Customer left a 5-star review for Chocolate Momo Cake.",
    time: "Yesterday",
    read: true,
    type: "system",
  },
]
