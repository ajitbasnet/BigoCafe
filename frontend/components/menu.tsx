"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

const menuCategories = [
  { id: "breakfast", label: "Breakfast" },
  { id: "cakes", label: "Cakes" },
  { id: "bakery", label: "Bakery" },
  { id: "drinks", label: "Drinks" },
]

const menuItems: Record<string, { name: string; price: string; description: string }[]> = {
  breakfast: [
    { name: "Breakfast Platter", price: "Rs. 650", description: "Eggs your way, toast, croissant, fresh fruit, and a coffee of choice" },
    { name: "Avocado Toast", price: "Rs. 480", description: "Sourdough toast with smashed avocado, poached egg, and herbs" },
    { name: "French Toast", price: "Rs. 520", description: "Brioche french toast with maple syrup and seasonal berries" },
    { name: "Omelette du Jour", price: "Rs. 450", description: "Daily omelette with seasonal vegetables and our house bread" },
  ],
  cakes: [
    { name: "Chocolate Cake", price: "Rs. 520", description: "Rich dark chocolate layers with ganache frosting" },
    { name: "Red Velvet Cake", price: "Rs. 550", description: "Classic red velvet with cream cheese frosting" },
    { name: "Vanilla Bean Cake", price: "Rs. 480", description: "Light vanilla sponge with buttercream" },
    { name: "Carrot Cake", price: "Rs. 500", description: "Spiced carrot cake with walnuts and cream cheese" },
    { name: "Strawberry Cake", price: "Rs. 540", description: "Fresh strawberry layers with whipped cream" },
    { name: "Coffee Walnut Cake", price: "Rs. 520", description: "Espresso-infused sponge with coffee buttercream" },
    { name: "Lemon Drizzle Cake", price: "Rs. 450", description: "Zesty lemon sponge with lemon glaze" },
    { name: "Mango Cake", price: "Rs. 560", description: "Seasonal mango mousse and sponge" },
  ],
  bakery: [
    { name: "Himalayan Croissant", price: "Rs. 280", description: "Buttery, flaky croissant with a hint of Himalayan salt" },
    { name: "Sourdough Bread", price: "Rs. 450", description: "Artisan sourdough, freshly baked daily" },
    { name: "Cinnamon Roll", price: "Rs. 320", description: "Warm cinnamon roll with cream cheese frosting" },
    { name: "Chocolate Chip Cookie", price: "Rs. 120", description: "House-made cookie with dark chocolate chunks" },
    { name: "Red Velvet Cupcake", price: "Rs. 280", description: "Classic red velvet with cream cheese frosting" },
  ],
  drinks: [
    { name: "Nepali Masala Latte", price: "Rs. 280", description: "Spiced latte with cardamom and Himalayan spices" },
    { name: "Espresso", price: "Rs. 150", description: "Single-origin Nepali coffee, double shot" },
    { name: "Cappuccino", price: "Rs. 280", description: "Espresso with steamed milk and foam" },
    { name: "Himalayan Chai", price: "Rs. 180", description: "Traditional spiced tea with milk" },
    { name: "Fresh Mango Juice", price: "Rs. 220", description: "Seasonal fresh mango, no added sugar" },
  ],
}

export function Menu() {
  const [activeCategory, setActiveCategory] = useState("breakfast")
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative py-24 lg:py-40 bg-background overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "50px 50px"
        }} />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary uppercase tracking-[0.3em] text-sm mb-4"
          >
            Our Menu
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance"
          >
            Artisan Bakery & Coffee
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "6rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-primary mx-auto"
          />
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-6 py-3 text-sm uppercase tracking-widest transition-colors duration-300 ${
                activeCategory === category.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {category.label}
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-px bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Menu Items */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {menuItems[activeCategory as keyof typeof menuItems].map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-serif text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.name}
                      </h3>
                      <span className="font-serif text-xl text-primary ml-4 flex-shrink-0">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-4 h-px bg-border group-hover:bg-primary/30 transition-colors duration-300" />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column - Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] overflow-hidden hidden lg:block"
          >
            <Image
              src="/images/bigo-pastry.jpg"
              alt="BIGO pastries"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-background/20" />
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-8 left-8 right-8 bg-card/95 backdrop-blur-sm p-8"
            >
              <p className="text-primary uppercase tracking-[0.2em] text-xs mb-2">
                Our Promise
              </p>
              <p className="font-serif text-xl text-foreground text-pretty">
                &quot;Fresh from the oven every morning. We bake with care and brew with the finest Himalayan coffee.&quot;
              </p>
              <p className="text-muted-foreground mt-4 text-sm">
                — BIGO, Kathmandu
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="group relative inline-flex px-8 py-4 border border-primary text-primary font-medium uppercase tracking-widest text-sm overflow-hidden transition-all duration-500 hover:text-primary-foreground"
          >
            <span className="relative z-10">View Full Menu</span>
            <span className="absolute inset-0 bg-primary transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
