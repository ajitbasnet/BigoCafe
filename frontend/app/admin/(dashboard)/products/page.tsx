"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { ProductsTable } from "@/components/admin/products-table"
import { ProductDialog } from "@/components/admin/product-dialog"
import type { AdminProduct } from "@/lib/mock-data/products"
import { useAdminProductsStore } from "@/stores/admin-products-store"

export default function AdminProductsPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null)
  const searchQuery = useAdminProductsStore((s) => s.searchQuery)
  const setSearchQuery = useAdminProductsStore((s) => s.setSearchQuery)

  const handleAdd = () => {
    setEditingProduct(null)
    setDialogOpen(true)
  }

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product)
    setDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <p className="text-primary font-medium uppercase tracking-[0.3em] text-sm mb-2">Add Items</p>
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">Products</h1>
          <p className="text-muted-foreground text-base">Manage your bakery and coffee menu</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="
            inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold
            rounded-xl bg-primary text-primary-foreground
            border-2 border-primary shadow-md
            transition-all duration-200 ease-out
            hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
            active:scale-[0.98] active:bg-primary/80 active:shadow-sm active:ring-2 active:ring-primary/40
          "
        >
          <Plus className="w-5 h-5 shrink-0" />
          Add Product
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 h-11 rounded-xl bg-background border-2 border-border text-foreground placeholder:text-muted-foreground shadow-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-colors"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <ProductsTable onEdit={handleEdit} />
      </motion.div>

      <ProductDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open)
          if (!open) setEditingProduct(null)
        }}
        product={editingProduct}
      />
    </div>
  )
}
