"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    number: "01",
    title: "Fresh Baked Daily",
    description: "Our bakers start before dawn so you get artisan breads, pastries, and cakes made the same day—nothing sits on the shelf.",
  },
  {
    number: "02",
    title: "Himalayan Coffee",
    description: "Single-origin and blended coffees roasted for balance and clarity. We also serve specialty tea and house-made drinks.",
  },
  {
    number: "03",
    title: "Seasonal & Local",
    description: "We use local grains, dairy, and seasonal produce where possible, and source premium ingredients for consistency and flavour.",
  },
]

export function Featured() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax text animation
      gsap.to(textRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-card overflow-hidden"
    >
      {/* Large Moving Text */}
      <div className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none">
        <div
          ref={textRef}
          className="font-serif text-[20vw] text-foreground/[0.02] leading-none"
        >
          BIGO — ARTISAN BAKERY & COFFEE — BIGO — ARTISAN BAKERY & COFFEE —
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              {/* Number */}
              <span className="font-serif text-6xl lg:text-7xl text-primary/20 group-hover:text-primary/40 transition-colors duration-500">
                {feature.number}
              </span>
              
              {/* Content */}
              <div className="mt-4">
                <h3 className="font-serif text-2xl text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Line */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
