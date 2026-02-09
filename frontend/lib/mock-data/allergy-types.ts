export interface AllergyType {
  id: string
  name: string
  category: "drinks" | "bakery" | "cakes"
}

export const allergyTypes: AllergyType[] = [
  { id: "nuts", name: "Nuts", category: "bakery" },
  { id: "dairy", name: "Dairy", category: "drinks" },
  { id: "gluten", name: "Gluten", category: "bakery" },
  { id: "egg", name: "Eggs", category: "cakes" },
  { id: "soy", name: "Soy", category: "drinks" },
  { id: "other", name: "Other", category: "bakery" },
]
