"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const footerLinks = {
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Menu", href: "#menu" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Accessibility", href: "#" },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-background border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link href="#home" className="inline-flex items-center gap-3 mb-6">
              <Image
                src="/bigo-logo.png"
                alt="BIGO"
                width={48}
                height={48}
                className="object-contain"
              />
              <span className="font-serif text-3xl text-foreground tracking-wider">
                BIGO
              </span>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed mb-8">
              {"Nepal's premier artisan bakery and specialty coffee destination. We craft memorable experiences through exceptional pastries, fresh breads, and the finest Himalayan coffee."}
            </p>
            
            {/* Newsletter */}
            <div className="max-w-md">
              <p className="text-foreground font-medium mb-4">
                Stay Connected
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-card border border-border px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-primary-foreground text-sm uppercase tracking-widest hover:bg-foreground transition-colors duration-300"
                >
                  Join
                </button>
              </form>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-foreground font-medium mb-6">Navigation</h4>
            <ul className="space-y-4">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-foreground font-medium mb-6">Visit Us</h4>
            <address className="not-italic space-y-4 text-muted-foreground">
              <p>
                Thamel, Kathmandu<br />
                Nepal 44600
              </p>
              <p>
                <a href="tel:+9771XXXXXXX" className="hover:text-primary transition-colors duration-300">
                  +977 1 XXXXXXX
                </a>
              </p>
              <p>
                <a href="mailto:hello@bigo.com.np" className="hover:text-primary transition-colors duration-300">
                  hello@bigo.com.np
                </a>
              </p>
            </address>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              {["Ig", "Fb", "Tw"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors duration-300"
                  aria-label={social}
                >
                  <span className="text-sm">{social}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              &copy; {currentYear} BIGO Nepal. All rights reserved.
            </p>
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary text-sm transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-primary-foreground flex items-center justify-center hover:bg-foreground transition-colors duration-300 z-40"
        aria-label="Back to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </footer>
  )
}
