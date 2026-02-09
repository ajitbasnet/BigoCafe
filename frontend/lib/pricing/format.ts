/**
 * NPR (Nepalese Rupees) display formatting.
 * Format: "Rs. 1,250"
 */

const CURRENCY_SYMBOL = "Rs."

/**
 * Format a number as NPR with comma-separated thousands.
 * Example: 1250 -> "Rs. 1,250"
 */
export function formatNPR(amount: number): string {
  const rounded = Math.round(amount)
  return `${CURRENCY_SYMBOL} ${rounded.toLocaleString("en-NP")}`
}

export { CURRENCY_SYMBOL }
