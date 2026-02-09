/**
 * Admin customization option groups (Starbucks-style).
 * Option groups: Milk Type, Sugar Level, Toppings, Temperature, etc.
 */

export interface CustomizationOption {
  id: string
  name: string
  extraPrice: number
  isDefault: boolean
}

export type SelectType = "single" | "multi"

export interface CustomizationGroup {
  id: string
  label: string
  type: SelectType
  options: CustomizationOption[]
}

function opt(
  id: string,
  name: string,
  extraPrice: number,
  isDefault = false
): CustomizationOption {
  return { id, name, extraPrice, isDefault }
}

export const initialCustomizationGroups: CustomizationGroup[] = [
  {
    id: "milk",
    label: "Milk Type",
    type: "single",
    options: [
      opt("whole", "Whole Milk", 0, true),
      opt("almond", "Almond", 30, false),
      opt("soy", "Soy", 30, false),
      opt("oat", "Oat", 40, false),
    ],
  },
  {
    id: "sweetness",
    label: "Sugar Level",
    type: "single",
    options: [
      opt("none", "None", 0, false),
      opt("low", "Low", 0, false),
      opt("medium", "Medium", 0, true),
      opt("high", "High", 0, false),
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    type: "single",
    options: [
      opt("hot", "Hot", 0, true),
      opt("iced", "Iced", 0, false),
    ],
  },
  {
    id: "addons",
    label: "Toppings / Add-ons",
    type: "multi",
    options: [
      opt("whipped", "Whipped Cream", 40, false),
      opt("extrashot", "Extra Shot", 50, false),
      opt("syrup", "Flavored Syrup", 30, false),
      opt("caramel", "Caramel Drizzle", 35, false),
      opt("chocolate", "Chocolate Powder", 25, false),
    ],
  },
]
