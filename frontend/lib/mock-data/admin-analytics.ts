/**
 * Mock admin analytics for dashboard overview.
 * Used when Supabase is not configured or to supplement live data.
 */

export interface SalesDataPoint {
  date: string
  sales: number
  orders: number
}

export interface ProductPopularityItem {
  name: string
  count: number
  revenue: number
}

export interface CustomizationTrendItem {
  name: string
  count: number
  category: "milk" | "temperature" | "addon" | "sweetness"
}

/** Most ordered bakery items (croissants, cakes, pastries, etc.) */
export interface BakeryBestSeller {
  name: string
  orders: number
}

/** Most ordered drinks (latte, cappuccino, cold brew, etc.) for pie or bar chart */
export interface DrinksBestSeller {
  name: string
  value: number
  orders?: number
}

export type AnalyticsTimeRange = "today" | "weekly" | "monthly" | "yearly"

/** Trend for top-selling tables */
export type TrendStatus = "rising" | "stable" | "falling"

/** Bakery category for top-selling table */
export type BakeryCategory = "Cake" | "Cookie" | "Croissant" | "Swiss Roll" | "Pastry" | "Muffin" | "Bread" | "Roll"

/** Drink type for top-selling table */
export type DrinkType = "Coffee" | "Tea" | "Juice" | "Specialty Drink"

/** One row in the Bakery — Top Selling table */
export interface BakeryTopSellingRow {
  rank: number
  itemName: string
  category: BakeryCategory
  totalOrders: number
  totalQuantitySold: number
  revenueGenerated: number
  averageRating: number
  seasonalRegular: "Seasonal" | "Regular"
  lastOrderedDate: string
  trendStatus: TrendStatus
}

/** One row in the Drinks — Top Selling table */
export interface DrinkTopSellingRow {
  rank: number
  drinkName: string
  drinkType: DrinkType
  customizationPopularity: string
  totalOrders: number
  totalCupsSold: number
  revenueGenerated: number
  averageRating: number
  mostPopularSize: "Small" | "Medium" | "Large"
  trendStatus: TrendStatus
}

export interface AdminAnalytics {
  totalOrdersToday: number
  totalRevenue: number
  pendingOrders: number
  seasonalItemSales: number
  topSellingProducts: ProductPopularityItem[]
  customerRewardUsage: number
  salesTimeSeries: SalesDataPoint[]
  productPopularity: ProductPopularityItem[]
  customizationTrends: CustomizationTrendItem[]
  bakeryBestSellers: BakeryBestSeller[]
  drinksBestSellers: DrinksBestSeller[]
}

/** Base counts for bakery (used with time-range multiplier) */
const bakeryBase: BakeryBestSeller[] = [
  { name: "Chocolate Croissant", orders: 42 },
  { name: "Himalayan Croissant", orders: 38 },
  { name: "Butter Croissant", orders: 35 },
  { name: "Chocolate Momo Cake", orders: 28 },
  { name: "Strawberry Cake", orders: 22 },
  { name: "Swiss Roll", orders: 20 },
  { name: "Cinnamon Roll", orders: 18 },
  { name: "Blueberry Muffin", orders: 16 },
  { name: "Chocolate Chip Cookie", orders: 14 },
  { name: "Sourdough Bread", orders: 12 },
]

/** Base counts for drinks (used with time-range multiplier) */
const drinksBase: DrinksBestSeller[] = [
  { name: "Latte", value: 55 },
  { name: "Cappuccino", value: 48 },
  { name: "Americano", value: 42 },
  { name: "Nepali Masala Latte", value: 38 },
  { name: "Cold Brew", value: 32 },
  { name: "Himalayan Chai", value: 28 },
  { name: "Espresso Shot", value: 24 },
  { name: "Fresh Mango Juice", value: 18 },
]

const timeMultipliers: Record<AnalyticsTimeRange, number> = {
  today: 1,
  weekly: 5,
  monthly: 22,
  yearly: 260,
}

export function getBakeryBestSellers(range: AnalyticsTimeRange): BakeryBestSeller[] {
  const m = timeMultipliers[range]
  return bakeryBase.map((item) => ({ ...item, orders: Math.round(item.orders * m) }))
}

export function getDrinksBestSellers(range: AnalyticsTimeRange): DrinksBestSeller[] {
  const m = timeMultipliers[range]
  return drinksBase.map((item) => ({ ...item, value: Math.round(item.value * m) }))
}

const now = new Date()
const formatDate = (d: Date) => d.toISOString().slice(0, 10)

function lastNDays(n: number): SalesDataPoint[] {
  const out: SalesDataPoint[] = []
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    out.push({
      date: formatDate(d),
      sales: Math.round(12000 + Math.random() * 8000 + (n - i) * 200),
      orders: Math.round(15 + Math.random() * 25 + (n - i) * 2),
    })
  }
  return out
}

export const adminAnalyticsMock: AdminAnalytics = {
  totalOrdersToday: 47,
  totalRevenue: 89420,
  pendingOrders: 12,
  seasonalItemSales: 18,
  topSellingProducts: [
    { name: "Himalayan Croissant", count: 89, revenue: 24920 },
    { name: "Cappuccino", count: 76, revenue: 22800 },
    { name: "Chocolate Momo Cake", count: 52, revenue: 27040 },
    { name: "Butter Croissant", count: 48, revenue: 12000 },
    { name: "Latte", count: 44, revenue: 15400 },
  ],
  customerRewardUsage: 1240,
  salesTimeSeries: lastNDays(14),
  productPopularity: [
    { name: "Himalayan Croissant", count: 89, revenue: 24920 },
    { name: "Cappuccino", count: 76, revenue: 22800 },
    { name: "Chocolate Momo Cake", count: 52, revenue: 27040 },
    { name: "Butter Croissant", count: 48, revenue: 12000 },
    { name: "Latte", count: 44, revenue: 15400 },
    { name: "Cinnamon Roll", count: 38, revenue: 12160 },
    { name: "Americano", count: 35, revenue: 10500 },
    { name: "Sourdough Bread", count: 28, revenue: 12600 },
  ],
  customizationTrends: [
    { name: "Whole Milk", count: 142, category: "milk" },
    { name: "Oat Milk", count: 98, category: "milk" },
    { name: "Almond", count: 67, category: "milk" },
    { name: "Hot", count: 188, category: "temperature" },
    { name: "Iced", count: 94, category: "temperature" },
    { name: "Extra Shot", count: 76, category: "addon" },
    { name: "Whipped Cream", count: 54, category: "addon" },
    { name: "Medium", count: 120, category: "sweetness" },
    { name: "Low", count: 89, category: "sweetness" },
  ],
  bakeryBestSellers: getBakeryBestSellers("monthly"),
  drinksBestSellers: getDrinksBestSellers("monthly"),
}

/** Mock data for Bakery — Top Selling table (detailed rows) */
export const bakeryTopSellingTable: BakeryTopSellingRow[] = [
  { rank: 1, itemName: "Chocolate Croissant", category: "Croissant", totalOrders: 924, totalQuantitySold: 1102, revenueGenerated: 276600, averageRating: 4.8, seasonalRegular: "Regular", lastOrderedDate: "2025-02-03", trendStatus: "rising" },
  { rank: 2, itemName: "Himalayan Croissant", category: "Croissant", totalOrders: 836, totalQuantitySold: 998, revenueGenerated: 249640, averageRating: 4.9, seasonalRegular: "Seasonal", lastOrderedDate: "2025-02-03", trendStatus: "rising" },
  { rank: 3, itemName: "Butter Croissant", category: "Croissant", totalOrders: 770, totalQuantitySold: 892, revenueGenerated: 192500, averageRating: 4.6, seasonalRegular: "Regular", lastOrderedDate: "2025-02-02", trendStatus: "stable" },
  { rank: 4, itemName: "Chocolate Momo Cake", category: "Cake", totalOrders: 616, totalQuantitySold: 620, revenueGenerated: 320320, averageRating: 4.7, seasonalRegular: "Regular", lastOrderedDate: "2025-02-03", trendStatus: "rising" },
  { rank: 5, itemName: "Strawberry Cake", category: "Cake", totalOrders: 484, totalQuantitySold: 492, revenueGenerated: 246000, averageRating: 4.5, seasonalRegular: "Regular", lastOrderedDate: "2025-02-02", trendStatus: "stable" },
  { rank: 6, itemName: "Swiss Roll", category: "Swiss Roll", totalOrders: 440, totalQuantitySold: 528, revenueGenerated: 158400, averageRating: 4.4, seasonalRegular: "Regular", lastOrderedDate: "2025-02-01", trendStatus: "falling" },
  { rank: 7, itemName: "Cinnamon Roll", category: "Roll", totalOrders: 396, totalQuantitySold: 448, revenueGenerated: 126720, averageRating: 4.6, seasonalRegular: "Regular", lastOrderedDate: "2025-02-03", trendStatus: "stable" },
  { rank: 8, itemName: "Blueberry Muffin", category: "Muffin", totalOrders: 352, totalQuantitySold: 380, revenueGenerated: 95000, averageRating: 4.3, seasonalRegular: "Regular", lastOrderedDate: "2025-02-02", trendStatus: "rising" },
  { rank: 9, itemName: "Chocolate Chip Cookie", category: "Cookie", totalOrders: 308, totalQuantitySold: 612, revenueGenerated: 92400, averageRating: 4.5, seasonalRegular: "Regular", lastOrderedDate: "2025-02-03", trendStatus: "stable" },
  { rank: 10, itemName: "Sourdough Bread", category: "Bread", totalOrders: 264, totalQuantitySold: 288, revenueGenerated: 118800, averageRating: 4.7, seasonalRegular: "Regular", lastOrderedDate: "2025-02-01", trendStatus: "falling" },
]

/** Mock data for Drinks — Top Selling table (detailed rows) */
export const drinkTopSellingTable: DrinkTopSellingRow[] = [
  { rank: 1, drinkName: "Latte", drinkType: "Coffee", customizationPopularity: "72%", totalOrders: 1210, totalCupsSold: 1280, revenueGenerated: 423500, averageRating: 4.8, mostPopularSize: "Medium", trendStatus: "rising" },
  { rank: 2, drinkName: "Cappuccino", drinkType: "Coffee", customizationPopularity: "65%", totalOrders: 1056, totalCupsSold: 1092, revenueGenerated: 369600, averageRating: 4.7, mostPopularSize: "Medium", trendStatus: "stable" },
  { rank: 3, drinkName: "Americano", drinkType: "Coffee", customizationPopularity: "38%", totalOrders: 924, totalCupsSold: 950, revenueGenerated: 277200, averageRating: 4.6, mostPopularSize: "Large", trendStatus: "rising" },
  { rank: 4, drinkName: "Nepali Masala Latte", drinkType: "Specialty Drink", customizationPopularity: "82%", totalOrders: 836, totalCupsSold: 868, revenueGenerated: 334400, averageRating: 4.9, mostPopularSize: "Medium", trendStatus: "rising" },
  { rank: 5, drinkName: "Cold Brew", drinkType: "Coffee", customizationPopularity: "45%", totalOrders: 704, totalCupsSold: 720, revenueGenerated: 246400, averageRating: 4.5, mostPopularSize: "Large", trendStatus: "stable" },
  { rank: 6, drinkName: "Himalayan Chai", drinkType: "Tea", customizationPopularity: "78%", totalOrders: 616, totalCupsSold: 640, revenueGenerated: 184800, averageRating: 4.8, mostPopularSize: "Medium", trendStatus: "rising" },
  { rank: 7, drinkName: "Espresso Shot", drinkType: "Coffee", customizationPopularity: "22%", totalOrders: 528, totalCupsSold: 560, revenueGenerated: 158400, averageRating: 4.4, mostPopularSize: "Small", trendStatus: "stable" },
  { rank: 8, drinkName: "Fresh Mango Juice", drinkType: "Juice", customizationPopularity: "55%", totalOrders: 396, totalCupsSold: 410, revenueGenerated: 138600, averageRating: 4.6, mostPopularSize: "Medium", trendStatus: "falling" },
]
