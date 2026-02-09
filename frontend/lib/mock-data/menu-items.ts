export type MenuCategory = "bakery" | "drinks" | "breakfast"

export interface MenuItem {
  id: string
  name: string
  description: string
  image: string
  price: number
  category: MenuCategory
  availability: boolean
  preparationTime: number // minutes
  rewardPointsEarned: number
  customizable: boolean
}

export const menuItems: MenuItem[] = [
  // Bakery
  {
    id: "bak-1",
    name: "Himalayan Croissant",
    description: "Buttery, flaky croissant with a hint of Himalayan salt",
    image: "/images/bigo-pastry.jpg",
    price: 280,
    category: "bakery",
    availability: true,
    preparationTime: 5,
    rewardPointsEarned: 3,
    customizable: false,
  },
  {
    id: "bak-2",
    name: "Chocolate Momo Cake",
    description: "Rich chocolate cake with Nepali-inspired flavors",
    image: "/images/dish-4.jpg",
    price: 520,
    category: "bakery",
    availability: true,
    preparationTime: 10,
    rewardPointsEarned: 5,
    customizable: false,
  },
  {
    id: "bak-3",
    name: "Sourdough Bread",
    description: "Artisan sourdough, freshly baked daily",
    image: "/images/bigo-bread.jpg",
    price: 450,
    category: "bakery",
    availability: true,
    preparationTime: 5,
    rewardPointsEarned: 4,
    customizable: false,
  },
  {
    id: "bak-4",
    name: "Butter Croissant",
    description: "Classic French butter croissant",
    image: "/images/bigo-pastry.jpg",
    price: 250,
    category: "bakery",
    availability: true,
    preparationTime: 5,
    rewardPointsEarned: 2,
    customizable: false,
  },
  {
    id: "bak-5",
    name: "Cinnamon Roll",
    description: "Warm cinnamon roll with cream cheese frosting",
    image: "/images/dish-3.jpg",
    price: 320,
    category: "bakery",
    availability: true,
    preparationTime: 8,
    rewardPointsEarned: 3,
    customizable: false,
  },
  {
    id: "bak-6",
    name: "Swiss Roll",
    description: "Light sponge cake rolled with vanilla cream",
    image: "/images/dish-4.jpg",
    price: 380,
    category: "bakery",
    availability: true,
    preparationTime: 7,
    rewardPointsEarned: 4,
    customizable: false,
  },
  {
    id: "bak-7",
    name: "Chocolate Chip Cookie",
    description: "House-made cookie with dark chocolate chunks",
    image: "/images/bigo-pastry.jpg",
    price: 120,
    category: "bakery",
    availability: true,
    preparationTime: 3,
    rewardPointsEarned: 1,
    customizable: false,
  },
  {
    id: "bak-8",
    name: "Red Velvet Cupcake",
    description: "Classic red velvet with cream cheese frosting",
    image: "/images/dish-4.jpg",
    price: 280,
    category: "bakery",
    availability: true,
    preparationTime: 5,
    rewardPointsEarned: 3,
    customizable: false,
  },
  // Drinks
  {
    id: "drk-1",
    name: "Nepali Masala Latte",
    description: "Spiced latte with cardamom and Himalayan spices",
    image: "/images/bigo-coffee.jpg",
    price: 280,
    category: "drinks",
    availability: true,
    preparationTime: 5,
    rewardPointsEarned: 3,
    customizable: true,
  },
  {
    id: "drk-2",
    name: "Espresso Shot",
    description: "Single origin Nepali coffee, double shot",
    image: "/images/bigo-coffee.jpg",
    price: 150,
    category: "drinks",
    availability: true,
    preparationTime: 3,
    rewardPointsEarned: 1,
    customizable: true,
  },
  {
    id: "drk-3",
    name: "Americano",
    description: "Rich espresso with hot water",
    image: "/images/bigo-coffee.jpg",
    price: 200,
    category: "drinks",
    availability: true,
    preparationTime: 4,
    rewardPointsEarned: 2,
    customizable: true,
  },
  {
    id: "drk-4",
    name: "Cappuccino",
    description: "Espresso with steamed milk and foam",
    image: "/images/bigo-coffee.jpg",
    price: 280,
    category: "drinks",
    availability: true,
    preparationTime: 5,
    rewardPointsEarned: 3,
    customizable: true,
  },
  {
    id: "drk-5",
    name: "Himalayan Chai",
    description: "Traditional spiced tea with milk",
    image: "/images/bigo-coffee.jpg",
    price: 180,
    category: "drinks",
    availability: true,
    preparationTime: 5,
    rewardPointsEarned: 2,
    customizable: true,
  },
  {
    id: "drk-6",
    name: "Fresh Mango Juice",
    description: "Seasonal fresh mango, no added sugar",
    image: "/images/bigo-coffee.jpg",
    price: 220,
    category: "drinks",
    availability: true,
    preparationTime: 4,
    rewardPointsEarned: 2,
    customizable: false,
  },
  // Breakfast
  {
    id: "brk-1",
    name: "Breakfast Platter",
    description: "Eggs, toast, croissant, fresh fruit, and coffee",
    image: "/images/hero-food.jpg",
    price: 650,
    category: "breakfast",
    availability: true,
    preparationTime: 15,
    rewardPointsEarned: 6,
    customizable: false,
  },
  {
    id: "brk-2",
    name: "Avocado Toast",
    description: "Sourdough toast with smashed avocado and poached egg",
    image: "/images/dish-1.jpg",
    price: 480,
    category: "breakfast",
    availability: true,
    preparationTime: 12,
    rewardPointsEarned: 5,
    customizable: false,
  },
  {
    id: "brk-3",
    name: "French Toast",
    description: "Brioche french toast with maple syrup and berries",
    image: "/images/dish-2.jpg",
    price: 520,
    category: "breakfast",
    availability: true,
    preparationTime: 12,
    rewardPointsEarned: 5,
    customizable: false,
  },
  {
    id: "brk-4",
    name: "Omelette du Jour",
    description: "Chef's daily omelette with seasonal vegetables",
    image: "/images/hero-food.jpg",
    price: 450,
    category: "breakfast",
    availability: true,
    preparationTime: 10,
    rewardPointsEarned: 4,
    customizable: false,
  },
]

export function getMenuByCategory(category: MenuCategory) {
  return menuItems.filter((item) => item.category === category && item.availability)
}

export function getMenuItemById(id: string) {
  return menuItems.find((item) => item.id === id)
}

export function getFeaturedItems(limit = 4) {
  return menuItems.filter((item) => item.availability).slice(0, limit)
}
