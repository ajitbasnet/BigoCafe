"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    quote: "The best croissants and coffee in Kathmandu. I stop by every weekend—BIGO feels like a second home.",
    author: "Priya Shrestha",
    title: "Regular customer",
  },
  {
    quote: "Finally, proper artisan bread and single-origin coffee in Nepal. The team at BIGO really cares about quality.",
    author: "Raj Kumar",
    title: "Coffee enthusiast",
  },
  {
    quote: "We ordered a custom cake for our office party. Beautiful, delicious, and on time. Highly recommend.",
    author: "Anita Maharjan",
    title: "Event organiser",
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative py-24 lg:py-40 bg-background overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-[800px] h-[800px] border border-border/20 rounded-full"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <svg
              className="w-16 h-16 mx-auto text-primary/30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </motion.div>

          {/* Testimonial Content */}
          <div className="relative h-[280px] sm:h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-relaxed mb-8 text-pretty">
                  &quot;{testimonials[activeIndex].quote}&quot;
                </p>
                <div>
                  <p className="text-primary font-medium">
                    {testimonials[activeIndex].author}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonials[activeIndex].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-12 h-1 transition-all duration-300 ${
                  index === activeIndex ? "bg-primary" : "bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
