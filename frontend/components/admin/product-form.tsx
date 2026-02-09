"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useRef } from "react"
import { productSchema, type ProductFormValues, productCategories } from "@/lib/validators/product"
import type { AdminProduct } from "@/lib/mock-data/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Upload } from "lucide-react"

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues> & { image?: string }
  onSubmit: (values: ProductFormValues) => void
  onCancel?: () => void
  submitLabel?: string
}

export function ProductForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: ProductFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "Coffee",
      price: 0,
      description: "",
      ingredients: "",
      preparationTime: 5,
      image: "",
      available: true,
      seasonal: false,
      rewardPoints: 0,
      ...defaultValues,
    },
  })

  const imageValue = form.watch("image")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      form.setValue("image", result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold text-sm">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" className="border-2 border-border text-foreground font-medium h-10 rounded-xl" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold text-sm">Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-border text-foreground font-medium h-10 rounded-xl [&>span]:text-foreground">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {productCategories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-foreground font-medium">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold text-sm">Price (Rs.)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    step={1}
                    className="border-2 border-border text-foreground font-medium h-10 rounded-xl"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="preparationTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold text-sm">Preparation time (min)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    className="border-2 border-border text-foreground font-medium h-10 rounded-xl"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-semibold text-sm">Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Short description" rows={2} className="border-2 border-border text-foreground font-medium rounded-xl min-h-[80px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-semibold text-sm">Ingredients</FormLabel>
              <FormControl>
                <Textarea placeholder="Comma-separated or list" rows={2} className="border-2 border-border text-foreground font-medium rounded-xl min-h-[80px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-foreground font-semibold text-sm">Product image</FormLabel>
              <div className="flex items-center gap-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {imageValue ? (
                  <div className="relative h-24 w-24 rounded-xl overflow-hidden bg-muted border-2 border-border">
                    <Image
                      src={imageValue}
                      alt="Preview"
                      fill
                      className="object-cover"
                      unoptimized={imageValue.startsWith("data:")}
                    />
                  </div>
                ) : null}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-border font-medium text-foreground hover:bg-primary/10 hover:text-primary hover:border-primary/50 h-9 rounded-xl"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {imageValue ? "Change" : "Upload"}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 sm:grid-cols-3">
          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-xl border-2 border-border p-4 bg-muted/30">
                <FormLabel className="text-foreground font-semibold text-sm">Available</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="seasonal"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-xl border-2 border-border p-4 bg-muted/30">
                <FormLabel className="text-foreground font-semibold text-sm">Seasonal</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rewardPoints"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold text-sm">Reward points</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    className="border-2 border-border text-foreground font-medium h-10 rounded-xl"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-2 border-border font-semibold text-foreground hover:bg-muted hover:text-foreground rounded-xl h-10 px-4"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            className="bg-primary text-primary-foreground font-semibold border-2 border-primary rounded-xl h-10 px-5 shadow-md hover:bg-primary/90 active:bg-primary/80 active:shadow-sm"
          >
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export function productToFormValues(p: AdminProduct): ProductFormValues {
  return {
    name: p.name,
    category: p.category,
    price: p.price,
    description: p.description,
    ingredients: p.ingredients,
    preparationTime: p.preparationTime,
    image: p.image,
    available: p.available,
    seasonal: p.seasonal,
    rewardPoints: p.rewardPoints,
  }
}

export function formValuesToProduct(values: ProductFormValues): Omit<AdminProduct, "id"> {
  return {
    name: values.name,
    category: values.category,
    price: values.price,
    description: values.description ?? "",
    ingredients: values.ingredients ?? "",
    preparationTime: values.preparationTime ?? 5,
    image: values.image ?? "",
    available: values.available ?? true,
    seasonal: values.seasonal ?? false,
    rewardPoints: values.rewardPoints ?? 0,
  }
}
