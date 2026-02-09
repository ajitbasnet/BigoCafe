/**
 * Mock order-level data for admin Top Selling: Cakes, Pastry Box, Breakfast.
 * Used for tables with sort, filter, and expandable rows.
 */

export type MembershipTier = "Standard" | "Gold" | "Platinum"
export type OrderStatus = "Pending" | "Preparing" | "Ready" | "Completed"

/** One row in the Cakes Orders table */
export interface CakeOrderRow {
  orderId: string
  cakeName: string
  flavor: string
  designType: string
  occasion: string
  size: string
  layers: number
  creamType: string
  customMessage: string
  customerName: string
  membershipTier: MembershipTier
  orderQuantity: number
  unitPrice: number
  totalPrice: number
  pickupDateTime: string
  orderStatus: OrderStatus
  createdAt: string
}

/** One row in the Pastry Box Orders table */
export interface PastryBoxOrderRow {
  orderId: string
  boxSizePieces: 3 | 6 | 9
  selectedPastryFlavors: string[]
  customizationNotes: string
  customerName: string
  membershipTier: MembershipTier
  quantityOrdered: number
  unitPrice: number
  totalPrice: number
  pickupDeliveryTime: string
  orderStatus: OrderStatus
  createdAt: string
}

/** Breakfast category */
export type BreakfastCategory = "Continental" | "Healthy" | "Premium" | "Seasonal"
/** Order type for breakfast */
export type BreakfastOrderType = "Dine-in" | "Takeaway" | "Delivery"

/** One row in the Breakfast Orders table */
export interface BreakfastOrderRow {
  orderId: string
  breakfastItemName: string
  category: BreakfastCategory
  customizationDetails: string
  addons: string
  customerName: string
  membershipTier: MembershipTier
  quantityOrdered: number
  unitPrice: number
  totalPrice: number
  orderType: BreakfastOrderType
  tableNumber: string | null
  orderStatus: OrderStatus
  createdAt: string
}

const baseDate = new Date()
const day = (d: number) => {
  const x = new Date(baseDate)
  x.setDate(x.getDate() - d)
  return x.toISOString()
}

export const cakeOrdersMock: CakeOrderRow[] = [
  {
    orderId: "CAKE-001",
    cakeName: "Chocolate Momo Cake",
    flavor: "Chocolate",
    designType: "Minimalist",
    occasion: "Birthday",
    size: "2 Pound",
    layers: 2,
    creamType: "Chocolate Buttercream",
    customMessage: "Happy Birthday Maya!",
    customerName: "Maya Shrestha",
    membershipTier: "Gold",
    orderQuantity: 1,
    unitPrice: 2200,
    totalPrice: 2200,
    pickupDateTime: "2025-02-05 14:00",
    orderStatus: "Completed",
    createdAt: day(1),
  },
  {
    orderId: "CAKE-002",
    cakeName: "Red Velvet Luxury",
    flavor: "Red Velvet",
    designType: "Luxury Wedding Style",
    occasion: "Wedding",
    size: "3 Pound",
    layers: 3,
    creamType: "Cream Cheese",
    customMessage: "Mr & Mrs Karki",
    customerName: "Anil Karki",
    membershipTier: "Platinum",
    orderQuantity: 1,
    unitPrice: 4200,
    totalPrice: 4200,
    pickupDateTime: "2025-02-08 11:00",
    orderStatus: "Preparing",
    createdAt: day(0),
  },
  {
    orderId: "CAKE-003",
    cakeName: "Strawberry Dream",
    flavor: "Strawberry",
    designType: "Floral",
    occasion: "Anniversary",
    size: "1 Pound",
    layers: 1,
    creamType: "Fresh Cream",
    customMessage: "5 years together",
    customerName: "Priya Singh",
    membershipTier: "Standard",
    orderQuantity: 2,
    unitPrice: 1200,
    totalPrice: 2400,
    pickupDateTime: "2025-02-06 16:00",
    orderStatus: "Ready",
    createdAt: day(2),
  },
  {
    orderId: "CAKE-004",
    cakeName: "Black Forest",
    flavor: "Black Forest",
    designType: "Photo Printed Cake",
    occasion: "Birthday",
    size: "2 Pound",
    layers: 2,
    creamType: "Whipped Cream",
    customMessage: "",
    customerName: "Raj Thapa",
    membershipTier: "Gold",
    orderQuantity: 1,
    unitPrice: 2400,
    totalPrice: 2400,
    pickupDateTime: "2025-02-04 10:00",
    orderStatus: "Completed",
    createdAt: day(3),
  },
]

export const pastryBoxOrdersMock: PastryBoxOrderRow[] = [
  {
    orderId: "PB-001",
    boxSizePieces: 6,
    selectedPastryFlavors: ["Chocolate", "Vanilla", "Strawberry", "Lemon", "Carrot", "Mocha"],
    customizationNotes: "No nuts on chocolate pieces",
    customerName: "Sita Maharjan",
    membershipTier: "Gold",
    quantityOrdered: 1,
    unitPrice: 650,
    totalPrice: 650,
    pickupDeliveryTime: "2025-02-05 09:00",
    orderStatus: "Completed",
    createdAt: day(1),
  },
  {
    orderId: "PB-002",
    boxSizePieces: 9,
    selectedPastryFlavors: ["Red Velvet", "Chocolate", "Vanilla", "Strawberry", "Lemon", "Carrot", "Coconut", "Mocha", "Red Velvet"],
    customizationNotes: "",
    customerName: "Kiran Basnet",
    membershipTier: "Platinum",
    quantityOrdered: 2,
    unitPrice: 1100,
    totalPrice: 2200,
    pickupDeliveryTime: "2025-02-06 12:00",
    orderStatus: "Preparing",
    createdAt: day(0),
  },
  {
    orderId: "PB-003",
    boxSizePieces: 3,
    selectedPastryFlavors: ["Chocolate", "Vanilla", "Strawberry"],
    customizationNotes: "Gift box requested",
    customerName: "Ramesh Adhikari",
    membershipTier: "Standard",
    quantityOrdered: 1,
    unitPrice: 360,
    totalPrice: 360,
    pickupDeliveryTime: "2025-02-04 15:00",
    orderStatus: "Completed",
    createdAt: day(2),
  },
  {
    orderId: "PB-004",
    boxSizePieces: 6,
    selectedPastryFlavors: ["Vanilla", "Chocolate", "Lemon", "Carrot", "Coconut", "Mocha"],
    customizationNotes: "Extra napkins",
    customerName: "Nisha Gurung",
    membershipTier: "Gold",
    quantityOrdered: 1,
    unitPrice: 620,
    totalPrice: 620,
    pickupDeliveryTime: "2025-02-07 10:00",
    orderStatus: "Pending",
    createdAt: day(0),
  },
]

export const breakfastOrdersMock: BreakfastOrderRow[] = [
  {
    orderId: "BF-001",
    breakfastItemName: "Breakfast Platter",
    category: "Continental",
    customizationDetails: "Eggs scrambled, no beans",
    addons: "Extra toast, Avocado",
    customerName: "David Smith",
    membershipTier: "Standard",
    quantityOrdered: 1,
    unitPrice: 450,
    totalPrice: 550,
    orderType: "Dine-in",
    tableNumber: "T-4",
    orderStatus: "Completed",
    createdAt: day(0),
  },
  {
    orderId: "BF-002",
    breakfastItemName: "Healthy Bowl",
    category: "Healthy",
    customizationDetails: "",
    addons: "Chia seeds",
    customerName: "Emma Wilson",
    membershipTier: "Gold",
    quantityOrdered: 2,
    unitPrice: 380,
    totalPrice: 760,
    orderType: "Takeaway",
    tableNumber: null,
    orderStatus: "Ready",
    createdAt: day(1),
  },
  {
    orderId: "BF-003",
    breakfastItemName: "Premium Benedict",
    category: "Premium",
    customizationDetails: "Poached medium",
    addons: "Smoked salmon",
    customerName: "James Lee",
    membershipTier: "Platinum",
    quantityOrdered: 1,
    unitPrice: 620,
    totalPrice: 720,
    orderType: "Dine-in",
    tableNumber: "T-1",
    orderStatus: "Preparing",
    createdAt: day(0),
  },
  {
    orderId: "BF-004",
    breakfastItemName: "Seasonal Fruit Parfait",
    category: "Seasonal",
    customizationDetails: "No honey",
    addons: "Granola",
    customerName: "Sophie Brown",
    membershipTier: "Standard",
    quantityOrdered: 1,
    unitPrice: 320,
    totalPrice: 320,
    orderType: "Delivery",
    tableNumber: null,
    orderStatus: "Completed",
    createdAt: day(3),
  },
]
