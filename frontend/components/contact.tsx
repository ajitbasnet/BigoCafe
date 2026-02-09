"use client"

import React from "react"

import { useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

export function Contact() {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <section id="contact" className="relative py-24 lg:py-40 bg-card overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-primary uppercase tracking-[0.3em] text-sm mb-4"
            >
              Get in Touch
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 text-balance"
            >
              Visit Us
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "4rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-primary mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-lg leading-relaxed mb-12"
            >
              Drop in for fresh pastries and specialty coffee, or get in touch for orders and events. We&apos;d love to hear from you.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="group">
                <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
                  Address
                </p>
                <p className="text-foreground group-hover:text-primary transition-colors duration-300">
                  Thamel, Kathmandu<br />
                  Nepal 44600
                </p>
              </div>

              <div className="group">
                <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
                  Hours
                </p>
                <p className="text-foreground group-hover:text-primary transition-colors duration-300">
                  Daily: 7:00am - 8:00pm<br />
                  Fresh bakes from 7am
                </p>
              </div>

              <div className="group">
                <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2">
                  Contact
                </p>
                <p className="text-foreground">
                  <a href="tel:+97714234567" className="hover:text-primary transition-colors duration-300">
                    +977 1 4234567
                  </a>
                  <br />
                  <a href="mailto:hello@bigo.com.np" className="hover:text-primary transition-colors duration-300">
                    hello@bigo.com.np
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-6 mt-12"
            >
              {["Instagram", "Facebook", "Twitter"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-muted-foreground hover:text-primary text-sm uppercase tracking-widest transition-colors duration-300"
                >
                  {social}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Background Image */}
            <div className="absolute -inset-4 lg:-inset-8 opacity-20 pointer-events-none">
              <Image
                src="/images/interior.jpg"
                alt="BIGO café"
                fill
                className="object-cover"
              />
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="relative bg-background/80 backdrop-blur-sm p-8 lg:p-12"
            >
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="name" className="block text-muted-foreground text-sm uppercase tracking-widest mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="email" className="block text-muted-foreground text-sm uppercase tracking-widest mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="group">
                    <label htmlFor="date" className="block text-muted-foreground text-sm uppercase tracking-widest mb-3">
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground transition-colors duration-300"
                    />
                  </div>

                  <div className="group">
                    <label htmlFor="guests" className="block text-muted-foreground text-sm uppercase tracking-widest mb-3">
                      Guests
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      required
                      className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground transition-colors duration-300"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num} className="bg-background">
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                      <option value="9+" className="bg-background">9+ Guests</option>
                    </select>
                  </div>
                </div>

                <div className="group">
                  <label htmlFor="message" className="block text-muted-foreground text-sm uppercase tracking-widest mb-3">
                    Special Requests
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-foreground transition-colors duration-300 resize-none"
                    placeholder="Any dietary requirements or special occasions?"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full px-8 py-4 bg-primary text-primary-foreground font-medium uppercase tracking-widest text-sm overflow-hidden transition-all duration-500 mt-8"
                >
                  <span className="relative z-10">Send Message</span>
                  <span className="absolute inset-0 bg-foreground transform translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
