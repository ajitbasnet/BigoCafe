export interface PastryFlavor {
  id: string
  name: string
  color: string // Tailwind/CSS color for visual
  image: string
  pricePerPiece: number
  /** Premium pastry: +Rs. 200 per piece (NPR pricing) */
  isPremium?: boolean
}

export const pastryFlavors: PastryFlavor[] = [
  { id: "choc", name: "Chocolate", color: "bg-amber-900", image: "/images/dish-4.jpg", pricePerPiece: 120 },
  { id: "vanilla", name: "Vanilla", color: "bg-amber-100", image: "/images/bigo-pastry.jpg", pricePerPiece: 100 },
  { id: "strawberry", name: "Strawberry", color: "bg-pink-200", image: "/images/dish-4.jpg", pricePerPiece: 110 },
  { id: "redvelvet", name: "Red Velvet", color: "bg-red-800", image: "/images/dish-4.jpg", pricePerPiece: 130, isPremium: true },
  { id: "lemon", name: "Lemon", color: "bg-yellow-200", image: "/images/bigo-pastry.jpg", pricePerPiece: 105 },
  { id: "carrot", name: "Carrot", color: "bg-orange-300", image: "/images/dish-3.jpg", pricePerPiece: 115 },
  { id: "coconut", name: "Coconut", color: "bg-stone-100", image: "/images/bigo-pastry.jpg", pricePerPiece: 125 },
  { id: "mocha", name: "Mocha", color: "bg-amber-800", image: "/images/bigo-coffee.jpg", pricePerPiece: 135, isPremium: true },
]

export const pastryBoxSizes = [
  { id: "3", pieces: 3, label: "3 Pieces", baseMultiplier: 1 },
  { id: "6", pieces: 6, label: "6 Pieces", baseMultiplier: 0.95 },
  { id: "9", pieces: 9, label: "9 Pieces", baseMultiplier: 0.9 },
] as const
