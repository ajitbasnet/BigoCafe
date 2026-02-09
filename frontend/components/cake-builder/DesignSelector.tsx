"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, A11y } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import { useCakeBuilderStore } from "@/stores/cake-builder-store"
import { cakeDesigns } from "@/lib/mock-data/cake-options"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Upload } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import "swiper/css"
import "swiper/css/navigation"

const CUSTOM_ID = "custom"

export function DesignSelector() {
  const designId = useCakeBuilderStore((s) => s.designId)
  const customDesignUrl = useCakeBuilderStore((s) => s.customDesignUrl)
  const ceremonyId = useCakeBuilderStore((s) => s.ceremonyId)
  const setDesign = useCakeBuilderStore((s) => s.setDesign)
  const setCustomDesignUrl = useCakeBuilderStore((s) => s.setCustomDesignUrl)
  const swiperRef = useRef<SwiperType | null>(null)
  const [uploadPreview, setUploadPreview] = useState<string | null>(customDesignUrl)

  const designs = cakeDesigns.filter((d) => d.id !== CUSTOM_ID)

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setUploadPreview(url)
    setCustomDesignUrl(url)
    setDesign(CUSTOM_ID)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Choose a design style or upload your own. {ceremonyId && "Suggestions match your occasion."}
      </p>
      <div className="relative">
        <Swiper
          onSwiper={(sw) => (swiperRef.current = sw)}
          modules={[Navigation, A11y]}
          spaceBetween={16}
          slidesPerView={1.2}
          breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3 } }}
          className="!overflow-visible"
          a11y={{ enabled: true }}
        >
          {designs.map((d) => {
            const selected = designId === d.id
            const suggestedForCeremony = ceremonyId && d.ceremonyIds?.includes(ceremonyId)
            return (
              <SwiperSlide key={d.id}>
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDesign(d.id)}
                  className="w-full text-left h-full"
                  aria-pressed={selected}
                  aria-label={`Select ${d.name} design`}
                >
                  <Card className={cn("card-luxury overflow-hidden h-full transition-all", selected && "ring-2 ring-primary")}>
                    <div className="aspect-[4/5] relative bg-muted">
                      <Image src={d.imageUrl} alt="" fill className="object-cover" sizes="(max-width: 640px) 80vw, 33vw" />
                      {suggestedForCeremony && (
                        <Badge className="absolute top-2 right-2 bg-primary/90">Suggested</Badge>
                      )}
                    </div>
                    <CardContent className="p-3">
                      <p className="font-medium text-foreground text-sm">{d.name}</p>
                      {d.tags?.length ? (
                        <p className="text-xs text-muted-foreground mt-0.5">{d.tags.join(" · ")}</p>
                      ) : null}
                    </CardContent>
                  </Card>
                </motion.button>
              </SwiperSlide>
            )
          })}
          <SwiperSlide>
            <motion.div
              whileHover={{ y: -2 }}
              className="h-full"
            >
              <Card className={cn("card-luxury overflow-hidden h-full transition-all", designId === CUSTOM_ID && "ring-2 ring-primary")}>
                <label className="block cursor-pointer h-full">
                  <div className="aspect-[4/5] relative bg-muted flex items-center justify-center">
                    {uploadPreview ? (
                      uploadPreview.startsWith("blob:") ? (
                        <img src={uploadPreview} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                        <Image src={uploadPreview} alt="" fill className="object-cover" sizes="200px" />
                      )
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Upload className="w-10 h-10" />
                        <span className="text-sm font-medium">Upload design</span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <p className="font-medium text-foreground text-sm">Custom Design Upload</p>
                  </CardContent>
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleCustomUpload}
                    aria-label="Upload custom cake design"
                  />
                </label>
              </Card>
            </motion.div>
          </SwiperSlide>
        </Swiper>
        <button
          type="button"
          aria-label="Previous designs"
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Next designs"
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-10 h-10 rounded-full bg-background border border-border shadow-md flex items-center justify-center hover:bg-muted"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
