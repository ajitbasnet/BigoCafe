import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair'
});

export const metadata: Metadata = {
  title: 'BIGO | Artisan Bakery & Coffee in Nepal',
  description: 'Premium artisan bakery and specialty coffee in Nepal. Fresh pastries, handcrafted breads, and the finest Himalayan coffee experience.',
  generator: 'v0.app',
  icons: {
    icon: '/bigo-logo.png',
    apple: '/bigo-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1612',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
