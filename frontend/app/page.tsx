"use client"

import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Featured } from "@/components/featured"
import { Menu } from "@/components/menu"
import { HorizontalGallery } from "@/components/horizontal-gallery"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { SmoothScroll } from "@/components/smooth-scroll"
import { PageLoader } from "@/components/page-loader"

export default function Home() {
  return (
    <SmoothScroll>
      <PageLoader />
      <Navigation />
      <main className="lg:pr-14">
        <Hero />
        <About />
        <Featured />
        <Menu />
        <HorizontalGallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
