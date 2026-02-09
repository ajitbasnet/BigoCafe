import { create } from "zustand"
import type { AdminProduct } from "@/lib/mock-data/products"
import type { ProductCategory } from "@/lib/validators/product"
import { initialAdminProducts } from "@/lib/mock-data/products"

const PAGE_SIZE = 10

interface AdminProductsState {
  products: AdminProduct[]
  // filters
  categoryFilter: ProductCategory | "all"
  availabilityFilter: "all" | "available" | "unavailable"
  seasonalFilter: "all" | "seasonal" | "regular"
  searchQuery: string
  // pagination
  page: number
  // actions
  setCategoryFilter: (v: ProductCategory | "all") => void
  setAvailabilityFilter: (v: "all" | "available" | "unavailable") => void
  setSeasonalFilter: (v: "all" | "seasonal" | "regular") => void
  setSearchQuery: (v: string) => void
  setPage: (v: number) => void
  addProduct: (product: Omit<AdminProduct, "id">) => string
  updateProduct: (id: string, data: Partial<AdminProduct>) => void
  deleteProduct: (id: string) => void
  getProductById: (id: string) => AdminProduct | undefined
  // computed
  filteredProducts: () => AdminProduct[]
  paginatedProducts: () => AdminProduct[]
  totalPages: () => number
}

function generateId() {
  return `prod-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export const useAdminProductsStore = create<AdminProductsState>((set, get) => ({
  products: initialAdminProducts,
  categoryFilter: "all",
  availabilityFilter: "all",
  seasonalFilter: "all",
  searchQuery: "",
  page: 1,

  setCategoryFilter: (categoryFilter) => set({ categoryFilter, page: 1 }),
  setAvailabilityFilter: (availabilityFilter) => set({ availabilityFilter, page: 1 }),
  setSeasonalFilter: (seasonalFilter) => set({ seasonalFilter, page: 1 }),
  setSearchQuery: (searchQuery) => set({ searchQuery, page: 1 }),
  setPage: (page) => set({ page }),

  addProduct: (data) => {
    const id = generateId()
    const product: AdminProduct = { ...data, id }
    set((s) => ({ products: [product, ...s.products] }))
    return id
  },

  updateProduct: (id, data) => {
    set((s) => ({
      products: s.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }))
  },

  deleteProduct: (id) => {
    set((s) => ({ products: s.products.filter((p) => p.id !== id), page: 1 }))
  },

  getProductById: (id) => get().products.find((p) => p.id === id),

  filteredProducts: () => {
    const { products, categoryFilter, availabilityFilter, seasonalFilter, searchQuery } = get()
    return products.filter((p) => {
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false
      if (availabilityFilter === "available" && !p.available) return false
      if (availabilityFilter === "unavailable" && p.available) return false
      if (seasonalFilter === "seasonal" && !p.seasonal) return false
      if (seasonalFilter === "regular" && p.seasonal) return false
      if (
        searchQuery &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false
      return true
    })
  },

  paginatedProducts: () => {
    const filtered = get().filteredProducts()
    const { page } = get()
    const start = (page - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  },

  totalPages: () => {
    const filtered = get().filteredProducts()
    return Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  },
}))
