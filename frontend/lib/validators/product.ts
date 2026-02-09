import { z } from "zod"

export const productCategories = [
  "Cake",
  "Coffee",
  "Tea",
  "Pastry",
  "Breakfast",
  "Seasonal",
] as const

export type ProductCategory = (typeof productCategories)[number]

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(productCategories),
  price: z.number().min(0, "Price must be ≥ 0"),
  description: z.string().optional().default(""),
  ingredients: z.string().optional().default(""),
  preparationTime: z.number().min(0).optional().default(5),
  image: z.string().optional().default(""), // base64 or URL for mock
  available: z.boolean().default(true),
  seasonal: z.boolean().default(false),
  rewardPoints: z.number().min(0).optional().default(0),
})

export type ProductFormValues = z.infer<typeof productSchema>
