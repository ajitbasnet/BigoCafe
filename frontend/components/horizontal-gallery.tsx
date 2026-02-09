"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const galleryItems = [
  {
    image: "/images/bigo-pastry.jpg",
    title: "Fresh Pastries",
    description: "Baked daily, butter and flour",
    category: "Bakery",
  },
  {
    image: "/images/bigo-bread.jpg",
    title: "Artisan Bread",
    description: "Sourdough and more",
    category: "Bakery",
  },
  {
    image: "/images/bigo-coffee.jpg",
    title: "Himalayan Coffee",
    description: "Single-origin and blends",
    category: "Drinks",
  },
  {
    image: "/images/dish-4.jpg",
    title: "Cakes & Desserts",
    description: "House-made cakes and sweets",
    category: "Bakery",
  },
  {
    image: "/images/interior.jpg",
    title: "Our Space",
    description: "BIGO in Kathmandu",
    category: "Atmosphere",
  },
]

export function HorizontalGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const section = sectionRef.current

    if (!container || !section) return

    const ctx = gsap.context(() => {
      const scrollWidth = container.scrollWidth - window.innerWidth

      gsap.to(container, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Individual item animations
      const items = container.querySelectorAll(".gallery-item")
      items.forEach((item) => {
        gsap.fromTo(
          item.querySelector(".gallery-image"),
          { scale: 1.3 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              containerAnimation: gsap.getById("horizontalScroll"),
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="gallery" className="relative bg-card">
      {/* Section Header */}
      <div className="py-20 container mx-auto px-6 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary uppercase tracking-[0.3em] text-sm mb-4 text-center"
        >
          Gallery
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground text-center mb-4 text-balance"
        >
          A Visual Journey
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-center max-w-2xl mx-auto"
        >
          Fresh bakes, Himalayan coffee, and our space in Kathmandu
        </motion.p>
      </div>

      {/* Horizontal Scroll Section */}
      <div ref={triggerRef} className="h-screen overflow-hidden">
        <div
          ref={containerRef}
          className="flex h-full items-center gap-8 pl-12 pr-[30vw]"
          style={{ width: "fit-content" }}
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="gallery-item relative flex-shrink-0 w-[70vw] md:w-[50vw] lg:w-[35vw] h-[70vh] group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="gallery-image object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/40 transition-opacity duration-500 group-hover:opacity-0" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="text-primary text-xs uppercase tracking-[0.3em] mb-2 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-2 transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground transform translate-y-4 opacity-0 transition-all duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.description}
                  </p>
                  
                  {/* Animated Border */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-primary transition-all duration-700 group-hover:w-full" />
                </div>
              </div>

              {/* Index Number */}
              <span className="absolute -top-4 -left-4 font-serif text-8xl text-primary/10 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
