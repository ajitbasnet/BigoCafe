/**
 * Mock data for BIGO Admin Dashboard — Analytics & Reports tables.
 */

/** 1. Sales Report — track revenue, order activity, sales growth */
export interface SalesReportRow {
  reportId: string
  dateTimePeriod: string
  totalOrders: number
  totalItemsSold: number
  totalRevenue: number
  averageOrderValue: number
  paymentMethodBreakdown: string
  discountsApplied: number
  netProfit: number
  peakSalesTime: string
  orderCompletionRate: string
  salesGrowthPercentage: string
}

/** 2. Product Performance Report — bakery/drink item performance */
export interface ProductPerformanceRow {
  productId: string
  productName: string
  category: string
  totalOrders: number
  totalQuantitySold: number
  revenueGenerated: number
  averageCustomerRating: number
  customizationFrequency: string
  returnRefundCount: number
  stockUsage: string
  profitMargin: string
  performanceStatus: "Top Seller" | "Average" | "Low Demand"
}

/** 3. Reward Usage Report — loyalty system performance */
export interface RewardUsageRow {
  rewardTransactionId: string
  customerNameId: string
  rewardPointsEarned: number
  rewardPointsRedeemed: number
  currentRewardBalance: number
  orderLinked: string
  rewardTypeUsed: string
  redemptionDate: string
  totalDiscountValueGiven: number
  customerLoyaltyLevel: "Bronze" | "Silver" | "Gold" | "VIP"
  repeatPurchaseRate: string
  rewardExpiryStatus: string
}

/** 4. Seasonal Performance Report — limited-time items */
export interface SeasonalPerformanceRow {
  seasonId: string
  seasonName: string
  productName: string
  launchDate: string
  endDate: string
  totalOrders: number
  totalRevenueGenerated: number
  customerPopularityRating: number
  inventoryConsumption: string
  bestSellingSeasonalItemRank: number
  customerFeedbackSummary: string
  seasonalProfitContribution: number
  returnRate: string
  seasonSuccessStatus: "Highly Successful" | "Moderate" | "Needs Improvement"
}

/** Summary stats for dashboard cards */
export interface ReportsSummary {
  totalRevenueThisMonth: number
  topSellingProduct: string
  mostRedeemedReward: string
  bestPerformingSeasonalMenu: string
  returningCustomerPercentage: string
}

// ——— Mock data ———

export const salesReportTable: SalesReportRow[] = [
  { reportId: "SR-2025-001", dateTimePeriod: "Feb 1–7, 2025", totalOrders: 312, totalItemsSold: 847, totalRevenue: 186420, averageOrderValue: 597, paymentMethodBreakdown: "Card 45%, Online 32%, Cash 18%, Wallet 5%", discountsApplied: 4200, netProfit: 89400, peakSalesTime: "10:00 AM – 12:00 PM", orderCompletionRate: "98.2%", salesGrowthPercentage: "+12.4%" },
  { reportId: "SR-2025-002", dateTimePeriod: "Feb 8–14, 2025", totalOrders: 289, totalItemsSold: 791, totalRevenue: 172850, averageOrderValue: 598, paymentMethodBreakdown: "Card 48%, Online 30%, Cash 17%, Wallet 5%", discountsApplied: 3800, netProfit: 82100, peakSalesTime: "9:30 AM – 11:30 AM", orderCompletionRate: "97.8%", salesGrowthPercentage: "+8.1%" },
  { reportId: "SR-2025-003", dateTimePeriod: "Feb 15–21, 2025", totalOrders: 334, totalItemsSold: 912, totalRevenue: 198760, averageOrderValue: 595, paymentMethodBreakdown: "Online 42%, Card 40%, Cash 14%, Wallet 4%", discountsApplied: 5100, netProfit: 95200, peakSalesTime: "11:00 AM – 1:00 PM", orderCompletionRate: "98.5%", salesGrowthPercentage: "+15.2%" },
  { reportId: "SR-2025-004", dateTimePeriod: "Feb 22–28, 2025", totalOrders: 298, totalItemsSold: 823, totalRevenue: 181200, averageOrderValue: 608, paymentMethodBreakdown: "Card 46%, Online 33%, Cash 16%, Wallet 5%", discountsApplied: 3900, netProfit: 86800, peakSalesTime: "10:30 AM – 12:30 PM", orderCompletionRate: "98.0%", salesGrowthPercentage: "+6.7%" },
]

export const productPerformanceTable: ProductPerformanceRow[] = [
  { productId: "PRD-001", productName: "Himalayan Croissant", category: "Croissant", totalOrders: 89, totalQuantitySold: 102, revenueGenerated: 24920, averageCustomerRating: 4.9, customizationFrequency: "12%", returnRefundCount: 1, stockUsage: "High", profitMargin: "42%", performanceStatus: "Top Seller" },
  { productId: "PRD-002", productName: "Cappuccino", category: "Coffee", totalOrders: 76, totalQuantitySold: 82, revenueGenerated: 22800, averageCustomerRating: 4.7, customizationFrequency: "65%", returnRefundCount: 0, stockUsage: "High", profitMargin: "38%", performanceStatus: "Top Seller" },
  { productId: "PRD-003", productName: "Chocolate Momo Cake", category: "Cake", totalOrders: 52, totalQuantitySold: 54, revenueGenerated: 27040, averageCustomerRating: 4.7, customizationFrequency: "8%", returnRefundCount: 0, stockUsage: "Medium", profitMargin: "45%", performanceStatus: "Top Seller" },
  { productId: "PRD-004", productName: "Butter Croissant", category: "Croissant", totalOrders: 48, totalQuantitySold: 56, revenueGenerated: 12000, averageCustomerRating: 4.6, customizationFrequency: "5%", returnRefundCount: 1, stockUsage: "High", profitMargin: "35%", performanceStatus: "Average" },
  { productId: "PRD-005", productName: "Latte", category: "Coffee", totalOrders: 44, totalQuantitySold: 48, revenueGenerated: 15400, averageCustomerRating: 4.8, customizationFrequency: "72%", returnRefundCount: 0, stockUsage: "High", profitMargin: "40%", performanceStatus: "Average" },
  { productId: "PRD-006", productName: "Sourdough Bread", category: "Bread", totalOrders: 28, totalQuantitySold: 32, revenueGenerated: 12600, averageCustomerRating: 4.7, customizationFrequency: "3%", returnRefundCount: 0, stockUsage: "Medium", profitMargin: "32%", performanceStatus: "Low Demand" },
]

export const rewardUsageTable: RewardUsageRow[] = [
  { rewardTransactionId: "RW-001", customerNameId: "Cust-101 / Priya S.", rewardPointsEarned: 120, rewardPointsRedeemed: 80, currentRewardBalance: 340, orderLinked: "ORD-2041", rewardTypeUsed: "Discount (Rs. 50 off)", redemptionDate: "2025-02-02", totalDiscountValueGiven: 50, customerLoyaltyLevel: "Gold", repeatPurchaseRate: "78%", rewardExpiryStatus: "Active" },
  { rewardTransactionId: "RW-002", customerNameId: "Cust-089 / Amit K.", rewardPointsEarned: 90, rewardPointsRedeemed: 100, currentRewardBalance: 210, orderLinked: "ORD-2038", rewardTypeUsed: "Free Item (Pastry)", redemptionDate: "2025-02-01", totalDiscountValueGiven: 120, customerLoyaltyLevel: "Silver", repeatPurchaseRate: "62%", rewardExpiryStatus: "Active" },
  { rewardTransactionId: "RW-003", customerNameId: "Cust-112 / Anjali M.", rewardPointsEarned: 150, rewardPointsRedeemed: 0, currentRewardBalance: 480, orderLinked: "—", rewardTypeUsed: "—", redemptionDate: "—", totalDiscountValueGiven: 0, customerLoyaltyLevel: "VIP", repeatPurchaseRate: "92%", rewardExpiryStatus: "Active" },
  { rewardTransactionId: "RW-004", customerNameId: "Cust-067 / Raj P.", rewardPointsEarned: 60, rewardPointsRedeemed: 50, currentRewardBalance: 95, orderLinked: "ORD-2035", rewardTypeUsed: "Upgrade (Large drink)", redemptionDate: "2025-01-30", totalDiscountValueGiven: 30, customerLoyaltyLevel: "Bronze", repeatPurchaseRate: "45%", rewardExpiryStatus: "Expires Mar 15" },
]

export const seasonalPerformanceTable: SeasonalPerformanceRow[] = [
  { seasonId: "S-001", seasonName: "Winter Specials", productName: "Himalayan Croissant", launchDate: "2025-01-05", endDate: "2025-02-28", totalOrders: 156, totalRevenueGenerated: 43680, customerPopularityRating: 4.8, inventoryConsumption: "92%", bestSellingSeasonalItemRank: 1, customerFeedbackSummary: "Highly liked", seasonalProfitContribution: 18320, returnRate: "0.6%", seasonSuccessStatus: "Highly Successful" },
  { seasonId: "S-002", seasonName: "Valentine Collection", productName: "Strawberry Heart Cake", launchDate: "2025-02-01", endDate: "2025-02-14", totalOrders: 48, totalRevenueGenerated: 19200, customerPopularityRating: 4.6, inventoryConsumption: "78%", bestSellingSeasonalItemRank: 2, customerFeedbackSummary: "Good demand", seasonalProfitContribution: 7680, returnRate: "1.2%", seasonSuccessStatus: "Moderate" },
  { seasonId: "S-003", seasonName: "Festive Menu", productName: "Spiced Chai Latte", launchDate: "2024-12-15", endDate: "2025-01-10", totalOrders: 89, totalRevenueGenerated: 26700, customerPopularityRating: 4.5, inventoryConsumption: "85%", bestSellingSeasonalItemRank: 1, customerFeedbackSummary: "Popular", seasonalProfitContribution: 10680, returnRate: "0.8%", seasonSuccessStatus: "Highly Successful" },
]

export const reportsSummary: ReportsSummary = {
  totalRevenueThisMonth: 739230,
  topSellingProduct: "Himalayan Croissant",
  mostRedeemedReward: "Discount (Rs. 50 off)",
  bestPerformingSeasonalMenu: "Winter Specials",
  returningCustomerPercentage: "68%",
}
