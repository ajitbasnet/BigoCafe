"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ProductForm, productToFormValues, formValuesToProduct } from "./product-form"
import type { AdminProduct } from "@/lib/mock-data/products"
import type { ProductFormValues } from "@/lib/validators/product"
import { useAdminProductsStore } from "@/stores/admin-products-store"
import { toast } from "sonner"

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: AdminProduct | null // null = Add mode, product = Edit mode
}

export function ProductDialog({ open, onOpenChange, product }: ProductDialogProps) {
  const addProduct = useAdminProductsStore((s) => s.addProduct)
  const updateProduct = useAdminProductsStore((s) => s.updateProduct)

  const handleSubmit = (values: ProductFormValues) => {
    const data = formValuesToProduct(values)
    if (product) {
      updateProduct(product.id, data)
      toast.success("Product updated")
    } else {
      addProduct(data)
      toast.success("Product added")
    }
    onOpenChange(false)
  }

  const defaultValues = product ? productToFormValues(product) : undefined

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-theme="bigo-admin"
        className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border-2 border-border bg-card shadow-2xl p-6 sm:p-8 text-foreground"
      >
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-semibold text-foreground tracking-tight">
            {product ? "Edit product" : "Add product"}
          </DialogTitle>
        </DialogHeader>
        <ProductForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          submitLabel={product ? "Update" : "Add product"}
        />
      </DialogContent>
    </Dialog>
  )
}
