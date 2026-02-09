export interface CakeFlavor {
  id: string
  name: string
  swatchColor: string
  imageUrl?: string
  /** Allergy type ids this flavor may contain (e.g. dairy, gluten, egg) */
  allergenIds?: string[]
  description?: string
}

export const cakeFlavors: CakeFlavor[] = [
  { id: "chocolate", name: "Chocolate", swatchColor: "#3E2723", imageUrl: "/images/dish-4.jpg", allergenIds: ["dairy", "gluten"], description: "Rich, indulgent dark chocolate" },
  { id: "vanilla", name: "Vanilla", swatchColor: "#F5F5DC", imageUrl: "/images/dish-1.jpg", allergenIds: ["dairy", "egg"], description: "Classic, light and airy" },
  { id: "strawberry", name: "Strawberry", swatchColor: "#FFB6C1", imageUrl: "/images/dish-2.jpg", allergenIds: ["dairy", "egg"], description: "Fresh and fruity" },
  { id: "red-velvet", name: "Red Velvet", swatchColor: "#8B0000", imageUrl: "/images/dish-3.jpg", allergenIds: ["dairy", "gluten", "egg"], description: "Southern classic with cream cheese" },
  { id: "butterscotch", name: "Butterscotch", swatchColor: "#D2691E", imageUrl: "/images/dish-4.jpg", allergenIds: ["dairy", "egg"], description: "Warm caramel notes" },
  { id: "black-forest", name: "Black Forest", swatchColor: "#2C1810", imageUrl: "/images/bigo-pastry.jpg", allergenIds: ["dairy", "egg", "nuts"], description: "Cherry and dark chocolate" },
  { id: "mango", name: "Mango Seasonal", swatchColor: "#FFA500", imageUrl: "/images/dish-1.jpg", allergenIds: ["dairy", "egg"], description: "Tropical, seasonal mango" },
  { id: "carrot", name: "Carrot", swatchColor: "#E67E22", allergenIds: ["nuts", "dairy", "egg"], description: "Spiced with nuts" },
  { id: "lemon", name: "Lemon", swatchColor: "#FFF44F", allergenIds: ["dairy", "egg"], description: "Zesty & bright" },
]

export interface CakeDesign {
  id: string
  name: string
  imageUrl: string
  tags?: string[]
  ceremonyIds?: string[]
}

export const cakeDesigns: CakeDesign[] = [
  { id: "d1", name: "Minimalist", imageUrl: "/images/dish-1.jpg", tags: ["Minimal"], ceremonyIds: ["birthday", "anniversary"] },
  { id: "d2", name: "Floral", imageUrl: "/images/dish-2.jpg", tags: ["Floral"], ceremonyIds: ["wedding", "mothers-day"] },
  { id: "d3", name: "Cartoon / Kids", imageUrl: "/images/dish-3.jpg", tags: ["Kids"], ceremonyIds: ["birthday"] },
  { id: "d4", name: "Luxury Wedding Style", imageUrl: "/images/dish-4.jpg", tags: ["Luxury", "Wedding"], ceremonyIds: ["wedding"] },
  { id: "d5", name: "Photo Printed Cake", imageUrl: "/images/bigo-pastry.jpg", tags: ["Photo"], ceremonyIds: ["birthday", "anniversary"] },
  { id: "custom", name: "Custom Design Upload", imageUrl: "", tags: ["Custom"], ceremonyIds: [] },
]

export interface CakeSizeOption {
  id: string
  label: string
  pounds: number
  price: number
  /** Approximate servings */
  servings?: number
}

export const cakeSizes: CakeSizeOption[] = [
  { id: "1lb", label: "1 Pound", pounds: 1, price: 1200, servings: 4 },
  { id: "2lb", label: "2 Pound", pounds: 2, price: 2200, servings: 8 },
  { id: "3lb", label: "3 Pound", pounds: 3, price: 3200, servings: 12 },
]

export const customSizePricePerPound = 1200

export const cakeCeremonyTypes = [
  { id: "birthday", label: "Birthday", icon: "Cake" },
  { id: "wedding", label: "Wedding", icon: "Heart" },
  { id: "anniversary", label: "Anniversary", icon: "Heart" },
  { id: "mothers-day", label: "Mother's Day", icon: "User" },
  { id: "fathers-day", label: "Father's Day", icon: "User" },
  { id: "bhai-tika", label: "Bhai Tika", icon: "Sparkles" },
  { id: "graduation", label: "Graduation", icon: "GraduationCap" },
  { id: "other", label: "Other", icon: "Gift" },
] as const

export interface CreamType {
  id: string
  name: string
  price: number
  description?: string
  texture?: string
}

export const creamTypes: CreamType[] = [
  { id: "buttercream", name: "Buttercream", price: 0, description: "Smooth, holds shape", texture: "Smooth" },
  { id: "whipped", name: "Whipped Cream", price: 200, description: "Light & airy", texture: "Light" },
  { id: "fondant", name: "Fondant", price: 500, description: "Elegant finish", texture: "Smooth" },
  { id: "chocolate-ganache", name: "Chocolate Ganache", price: 300, description: "Rich chocolate glaze", texture: "Glossy" },
  { id: "cream-cheese", name: "Cream Cheese", price: 150, description: "Tangy & rich", texture: "Creamy" },
]

export const extraLayerPrice = 400

/** Base cake layers: 1, 2, or 3 tiers */
export const baseLayerOptions = [
  { id: "1", label: "1 Layer", tiers: 1 },
  { id: "2", label: "2 Layers", tiers: 2 },
  { id: "3", label: "3 Layers", tiers: 3 },
] as const

export const cakeMessageMaxLength = 50
export const postcardMessageMaxLength = 200

/** Available pickup time slots (mock) */
export const pickupTimeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00",
]
