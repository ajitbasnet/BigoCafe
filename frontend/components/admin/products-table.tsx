"use client"

import { useState } from "react"
import Image from "next/image"
import { Pencil, Trash2 } from "lucide-react"
import type { AdminProduct } from "@/lib/mock-data/products"
import { productCategories, type ProductCategory } from "@/lib/validators/product"
import { useAdminProductsStore } from "@/stores/admin-products-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

const PAGE_SIZE = 10

interface ProductsTableProps {
  onEdit: (product: AdminProduct) => void
}

export function ProductsTable({ onEdit }: ProductsTableProps) {
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null)

  const {
    categoryFilter,
    availabilityFilter,
    seasonalFilter,
    setCategoryFilter,
    setAvailabilityFilter,
    setSeasonalFilter,
    paginatedProducts,
    filteredProducts,
    totalPages,
    page,
    setPage,
    deleteProduct,
  } = useAdminProductsStore()

  const products = paginatedProducts()
  const total = filteredProducts().length
  const pages = totalPages()

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id)
      toast.success("Product deleted")
      setDeleteTarget(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v as ProductCategory | "all")}>
          <SelectTrigger className="w-[180px] h-10 rounded-xl border-2 border-border bg-background text-foreground font-medium text-sm shadow-sm [&>span]:text-foreground data-[placeholder]:text-muted-foreground">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="font-medium">
            <SelectItem value="all" className="text-foreground focus:bg-primary/10 focus:text-foreground">All categories</SelectItem>
            {productCategories.map((c) => (
              <SelectItem key={c} value={c} className="text-foreground focus:bg-primary/10 focus:text-foreground">
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={availabilityFilter} onValueChange={(v) => setAvailabilityFilter(v as "all" | "available" | "unavailable")}>
          <SelectTrigger className="w-[160px] h-10 rounded-xl border-2 border-border bg-background text-foreground font-medium text-sm shadow-sm [&>span]:text-foreground data-[placeholder]:text-muted-foreground">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent className="font-medium">
            <SelectItem value="all" className="text-foreground focus:bg-primary/10 focus:text-foreground">All</SelectItem>
            <SelectItem value="available" className="text-foreground focus:bg-primary/10 focus:text-foreground">Available</SelectItem>
            <SelectItem value="unavailable" className="text-foreground focus:bg-primary/10 focus:text-foreground">Unavailable</SelectItem>
          </SelectContent>
        </Select>
        <Select value={seasonalFilter} onValueChange={(v) => setSeasonalFilter(v as "all" | "seasonal" | "regular")}>
          <SelectTrigger className="w-[160px] h-10 rounded-xl border-2 border-border bg-background text-foreground font-medium text-sm shadow-sm [&>span]:text-foreground data-[placeholder]:text-muted-foreground">
            <SelectValue placeholder="Seasonal" />
          </SelectTrigger>
          <SelectContent className="font-medium">
            <SelectItem value="all" className="text-foreground focus:bg-primary/10 focus:text-foreground">All</SelectItem>
            <SelectItem value="seasonal" className="text-foreground focus:bg-primary/10 focus:text-foreground">Seasonal</SelectItem>
            <SelectItem value="regular" className="text-foreground focus:bg-primary/10 focus:text-foreground">Regular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-2xl border-2 border-border bg-card shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
        <Table>
          <TableHeader>
            <TableRow className="border-border bg-muted/40">
              <TableHead className="w-[72px] px-4 py-3.5 text-foreground font-semibold text-sm">Image</TableHead>
              <TableHead className="px-4 py-3.5 text-foreground font-semibold text-sm">Name</TableHead>
              <TableHead className="px-4 py-3.5 text-foreground font-semibold text-sm">Category</TableHead>
              <TableHead className="px-4 py-3.5 text-right text-foreground font-semibold text-sm">Price</TableHead>
              <TableHead className="px-4 py-3.5 text-center text-foreground font-semibold text-sm">Status</TableHead>
              <TableHead className="w-[120px] px-4 py-3.5 text-right text-foreground font-semibold text-sm">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id} className="border-border">
                <TableCell className="px-4 py-3">
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover"
                        unoptimized={p.image.startsWith("data:")}
                        sizes="48px"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm font-medium">
                        —
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-foreground font-semibold text-sm">{p.name}</TableCell>
                <TableCell className="px-4 py-3 text-foreground text-sm">{p.category}</TableCell>
                <TableCell className="px-4 py-3 text-right text-foreground font-medium text-sm">Rs. {p.price.toLocaleString()}</TableCell>
                <TableCell className="px-4 py-3 text-center">
                  <Badge variant={p.available ? "default" : "secondary"} className="font-medium text-xs">
                    {p.available ? "Available" : "Unavailable"}
                  </Badge>
                  {p.seasonal && (
                    <Badge variant="outline" className="ml-1 font-medium text-xs border-foreground/30 text-foreground">
                      Seasonal
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-foreground hover:bg-primary/10 hover:text-primary"
                      onClick={() => onEdit(p)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setDeleteTarget(p)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-foreground">
            Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
              className="font-medium text-foreground border-2 border-border hover:bg-primary/10 hover:text-primary hover:border-primary/50 disabled:opacity-50"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= pages}
              onClick={() => setPage(page + 1)}
              className="font-medium text-foreground border-2 border-border hover:bg-primary/10 hover:text-primary hover:border-primary/50 disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteTarget?.name}&quot;? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
