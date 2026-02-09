/**
 * Admin product schema and initial list (source of truth for admin product management).
 * Category: Cake | Coffee | Tea | Pastry | Breakfast | Seasonal
 */

import type { ProductCategory } from "@/lib/validators/product"

export interface AdminProduct {
  id: string
  name: string
  category: ProductCategory
  price: number
  description: string
  ingredients: string
  preparationTime: number
  image: string
  available: boolean
  seasonal: boolean
  rewardPoints: number
}

function mapCategory(
  cat: "bakery" | "drinks" | "breakfast"
): ProductCategory {
  if (cat === "bakery") return "Pastry"
  if (cat === "breakfast") return "Breakfast"
  return "Coffee" // drinks -> Coffee (Tea items can be edited in admin)
}

export const initialAdminProducts: AdminProduct[] = [
  {
    id: "bak-1",
    name: "Himalayan Croissant",
    category: "Pastry",
    price: 280,
    description: "Buttery, flaky croissant with a hint of Himalayan salt",
    ingredients: "Flour, butter, salt",
    preparationTime: 5,
    image: "/images/bigo-pastry.jpg",
    available: true,
    seasonal: false,
    rewardPoints: 3,
  },
  {
    id: "bak-2",
    name: "Chocolate Momo Cake",
    category: "Cake",
    price: 520,
    description: "Rich chocolate cake with Nepali-inspired flavors",
    ingredients: "Chocolate, flour, eggs",
    preparationTime: 10,
    image: "/images/dish-4.jpg",
    available: true,
    seasonal: false,
    rewardPoints: 5,
  },
  {
    id: "bak-3",
    name: "Sourdough Bread",
    category: "Pastry",
    price: 450,
    description: "Artisan sourdough, freshly baked daily",
    ingredients: "Flour, water, salt, starter",
    preparationTime: 5,
    image: "/images/bigo-bread.jpg",
    available: true,
    seasonal: false,
    rewardPoints: 4,
  },
  {
    id: "bak-4",
    name: "Butter Croissant",
    category: "Pastry",
    price: 250,
    description: "Classic French butter croissant",
    ingredients: "Flour, butter",
    preparationTime: 5,
    image: "/images/bigo-pastry.jpg",
    available: true,
    seasonal: false,
    rewardPoints: 2,
  },
  {
    id: "bak-5",
    name: "Cinnamon Roll",
    category: "Pastry",
    price: 320,
    description: "Warm cinnamon roll with cream cheese frosting",
    ingredients: "Flour, cinnamon, cream cheese",
    preparationTime: 8,
    image: "/images/dish-3.jpg",
    available: true,
    seasonal: false,
    rewardPoints: 3,
  },
  {
    id: "drk-1",
    name: "Nepali Masala Latte",
    category: "Coffee",
    price: 280,
    description: "Spiced latte with cardamom and Himalayan spices",
    ingredients: "Espresso, milk, spices",
    preparationTime: 5,
    image: "/images/bigo-coffee.jpg",
    available: true,
    seasonal: false,
    rewardPoints: 3,
  },
  {
    id: "drk-2",
    name: "Espresso Shot",
    category: "Coffee",
    price: 150,
    description: "Single origin Nepali coffee, double shot",
    ingredients: "Coffee",
    preparationTime: 3,
    image: "/images/bigo-coffee.jpg",
    available: true,
    seasonal: false,
    rewardPoints: 1,
  },
  {
    id: "drk-3",
    name: "Americano",
    category: "Coffee",
    price: 200,
    description: "Rich espresso with hot water",
    ingredients: "Espresso, water",
    preparationTime: 4,
    image: "/images/bigo-coffee.jpg",
    available: true,
    seasonal: false,
    rewardPoints: 2,
  },
  {
    id: "drk-4",
    name: "Cappuccino",
    category: "Coffee",
    price: 280,
    description: "Espresso with steamed milk and foam",
    ingredients: "Espresso, milk",
    preparationTime: 5,
    image: "/images/bigo-coffee.jpg",
    available: true,
    seasonal: false,
    rewardPoints: 3,
  },
  {
    id: "drk-5",
    name: "Himalayan Chai",
    category: "Tea",
    price: 180,
    description: "Traditional spiced tea with milk",
    ingredients: "Tea, milk, spices",
    preparationTime: 5,
    image: "/images/bigo-coffee.jpg",
    available: true,
    seasonal: false,
    rewardPoints: 2,
  },
  {
    id: "brk-1",
    name: "Breakfast Platter",
    category: "Breakfast",
    price: 650,
    description: "Eggs, toast, croissant, fresh fruit, and coffee",
    ingredients: "Eggs, bread, fruit, coffee",
    preparationTime: 15,
    image: "/images/hero-food.jpg",
    available: true,
    seasonal: false,
    rewardPoints: 6,
  },
  {
    id: "brk-2",
    name: "Avocado Toast",
    category: "Breakfast",
    price: 480,
    description: "Sourdough toast with smashed avocado and poached egg",
    ingredients: "Bread, avocado, egg",
    preparationTime: 12,
    image: "/images/dish-1.jpg",
    available: true,
    seasonal: false,
    rewardPoints: 5,
  },
]
