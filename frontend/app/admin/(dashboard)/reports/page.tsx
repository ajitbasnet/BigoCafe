"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  DollarSign,
  ShoppingBag,
  Gift,
  Flower2,
  Download,
  FileText,
  TrendingUp,
  Trophy,
  Target,
  Leaf,
  Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { adminAnalyticsMock } from "@/lib/mock-data/admin-analytics"
import {
  salesReportTable,
  productPerformanceTable,
  rewardUsageTable,
  seasonalPerformanceTable,
  reportsSummary,
} from "@/lib/mock-data/admin-reports"
import { exportAnalyticsToCSV, exportAnalyticsToPDF } from "@/lib/admin-export"

function formatCurrency(n: number) {
  return `Rs. ${n.toLocaleString()}`
}

export default function AdminReportsPage() {
  const [activeTab, setActiveTab] = useState("sales")
  const analytics = adminAnalyticsMock
  const summary = reportsSummary

  return (
    <div className="space-y-6 min-w-0 max-w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-2">Analytics</p>
          <h1 className="font-serif text-3xl text-foreground mb-2">Analytics & reports</h1>
          <p className="text-muted-foreground">Sales, product, reward, and seasonal performance</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => exportAnalyticsToCSV(analytics)}
            className="
              inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium
              rounded-xl border-2 border-primary/40 bg-background text-foreground
              shadow-sm
              transition-all duration-200 ease-out
              hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-md
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
              active:scale-[0.98]
            "
          >
            <Download className="w-4 h-4 shrink-0" />
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => exportAnalyticsToPDF(analytics)}
            className="
              inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium
              rounded-xl border-2 border-primary/40 bg-background text-foreground
              shadow-sm
              transition-all duration-200 ease-out
              hover:border-primary hover:bg-primary/10 hover:text-primary hover:shadow-md
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
              active:scale-[0.98]
            "
          >
            <FileText className="w-4 h-4 shrink-0" />
            Export PDF
          </button>
        </div>
      </motion.div>

      {/* Summary cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <Card className="rounded-2xl border-border shadow-dashboard bg-card overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Revenue This Month</p>
                <p className="text-xl font-semibold text-foreground">{formatCurrency(summary.totalRevenueThisMonth)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-dashboard bg-card overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Top Selling Product</p>
                <p className="text-lg font-semibold text-foreground truncate">{summary.topSellingProduct}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-dashboard bg-card overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Most Redeemed Reward</p>
                <p className="text-lg font-semibold text-foreground truncate">{summary.mostRedeemedReward}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-dashboard bg-card overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Leaf className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Best Performing Seasonal Menu</p>
                <p className="text-lg font-semibold text-foreground truncate">{summary.bestPerformingSeasonalMenu}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border shadow-dashboard bg-card overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Returning Customer %</p>
                <p className="text-xl font-semibold text-foreground">{summary.returningCustomerPercentage}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="rounded-xl bg-muted p-1">
          <TabsTrigger value="sales" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Sales report
          </TabsTrigger>
          <TabsTrigger value="product" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Product performance
          </TabsTrigger>
          <TabsTrigger value="reward" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Reward usage
          </TabsTrigger>
          <TabsTrigger value="seasonal" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Seasonal performance
          </TabsTrigger>
        </TabsList>

        {/* 1. Sales Report */}
        <TabsContent value="sales" className="space-y-6 min-w-0">
          <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden bg-card min-w-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Sales Report
              </CardTitle>
              <p className="text-sm text-muted-foreground">Track overall business revenue, order activity, and sales growth.</p>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto min-w-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50 border-border">
                    <TableHead className="font-semibold whitespace-nowrap">Report ID</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Date / Time Period</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Total Orders</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Total Items Sold</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Total Revenue</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Average Order Value</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Payment Method Breakdown</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Discounts Applied</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Net Profit</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Peak Sales Time</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Order Completion Rate</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Sales Growth %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesReportTable.map((row) => (
                    <TableRow key={row.reportId} className="border-border">
                      <TableCell className="whitespace-nowrap font-medium">{row.reportId}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.dateTimePeriod}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{row.totalOrders}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{row.totalItemsSold}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{formatCurrency(row.totalRevenue)}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{formatCurrency(row.averageOrderValue)}</TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">{row.paymentMethodBreakdown}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{formatCurrency(row.discountsApplied)}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{formatCurrency(row.netProfit)}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.peakSalesTime}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.orderCompletionRate}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.salesGrowthPercentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 2. Product Performance Report */}
        <TabsContent value="product" className="space-y-6 min-w-0">
          <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden bg-card min-w-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                Product Performance Report
              </CardTitle>
              <p className="text-sm text-muted-foreground">Analyze which bakery or drink items perform best.</p>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto min-w-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50 border-border">
                    <TableHead className="font-semibold whitespace-nowrap">Product ID</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Product Name</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Category</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Total Orders</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Total Qty Sold</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Revenue Generated</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Avg Rating</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Customization Frequency</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Return / Refund</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Stock Usage</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Profit Margin</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Performance Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productPerformanceTable.map((row) => (
                    <TableRow key={row.productId} className="border-border">
                      <TableCell className="whitespace-nowrap font-medium">{row.productId}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.productName}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.category}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{row.totalOrders}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{row.totalQuantitySold}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{formatCurrency(row.revenueGenerated)}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{row.averageCustomerRating}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.customizationFrequency}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{row.returnRefundCount}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.stockUsage}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.profitMargin}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.performanceStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 3. Reward Usage Report */}
        <TabsContent value="reward" className="space-y-6 min-w-0">
          <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden bg-card min-w-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" />
                Reward Usage Report
              </CardTitle>
              <p className="text-sm text-muted-foreground">Track customer loyalty system performance and engagement.</p>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto min-w-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50 border-border">
                    <TableHead className="font-semibold whitespace-nowrap">Reward Transaction ID</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Customer Name / ID</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Points Earned</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Points Redeemed</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Current Balance</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Order Linked</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Reward Type Used</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Redemption Date</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Discount Value Given</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Loyalty Level</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Repeat Purchase Rate</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Expiry Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rewardUsageTable.map((row) => (
                    <TableRow key={row.rewardTransactionId} className="border-border">
                      <TableCell className="whitespace-nowrap font-medium">{row.rewardTransactionId}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.customerNameId}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{row.rewardPointsEarned}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{row.rewardPointsRedeemed}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{row.currentRewardBalance}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.orderLinked}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.rewardTypeUsed}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.redemptionDate}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{formatCurrency(row.totalDiscountValueGiven)}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.customerLoyaltyLevel}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.repeatPurchaseRate}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.rewardExpiryStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. Seasonal Performance Report */}
        <TabsContent value="seasonal" className="space-y-6 min-w-0">
          <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden bg-card min-w-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flower2 className="w-5 h-5 text-primary" />
                Seasonal Performance Report
              </CardTitle>
              <p className="text-sm text-muted-foreground">Analyze performance of limited-time or seasonal items.</p>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto min-w-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50 border-border">
                    <TableHead className="font-semibold whitespace-nowrap">Season ID</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Season Name</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Product Name</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Launch Date</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">End Date</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Total Orders</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Total Revenue</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Popularity Rating</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Inventory Consumption</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Best Rank</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Feedback Summary</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap text-right">Profit Contribution</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Return Rate</TableHead>
                    <TableHead className="font-semibold whitespace-nowrap">Success Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {seasonalPerformanceTable.map((row) => (
                    <TableRow key={row.seasonId + row.productName} className="border-border">
                      <TableCell className="whitespace-nowrap font-medium">{row.seasonId}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.seasonName}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.productName}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.launchDate}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.endDate}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{row.totalOrders}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{formatCurrency(row.totalRevenueGenerated)}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{row.customerPopularityRating}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.inventoryConsumption}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{row.bestSellingSeasonalItemRank}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.customerFeedbackSummary}</TableCell>
                      <TableCell className="whitespace-nowrap text-right">{formatCurrency(row.seasonalProfitContribution)}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.returnRate}</TableCell>
                      <TableCell className="whitespace-nowrap">{row.seasonSuccessStatus}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
