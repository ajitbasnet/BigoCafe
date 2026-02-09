export interface DrinkOption {
  id: string
  name: string
  price: number
}

export const milkTypes: DrinkOption[] = [
  { id: "whole", name: "Whole Milk", price: 0 },
  { id: "almond", name: "Almond", price: 30 },
  { id: "soy", name: "Soy", price: 30 },
  { id: "oat", name: "Oat", price: 40 },
]

export const sweetnessLevels: DrinkOption[] = [
  { id: "none", name: "None", price: 0 },
  { id: "low", name: "Low", price: 0 },
  { id: "medium", name: "Medium", price: 0 },
  { id: "high", name: "High", price: 0 },
]

export const addOns: DrinkOption[] = [
  { id: "whipped", name: "Whipped Cream", price: 40 },
  { id: "extrashot", name: "Extra Shot", price: 50 },
  { id: "syrup", name: "Flavored Syrup", price: 30 },
  { id: "caramel", name: "Caramel Drizzle", price: 35 },
  { id: "chocolate", name: "Chocolate Powder", price: 25 },
]

export const temperatures = [
  { id: "hot", name: "Hot" },
  { id: "iced", name: "Iced" },
] as const
