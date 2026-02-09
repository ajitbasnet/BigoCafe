"use client"

import { useEffect, useRef } from "react"

/**
 * Subtle floating particles / bakery dust animation in the background.
 * Uses canvas for performance. Purely decorative.
 */
export function BakeryDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      const w = container.offsetWidth
      const h = container.offsetHeight
      canvas.width = w
      canvas.height = h
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    window.addEventListener("resize", resize)

    const particles: { x: number; y: number; r: number; vx: number; vy: number; opacity: number }[] = []
    const count = 24
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0.5 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -0.1 - Math.random() * 0.2,
        opacity: 0.15 + Math.random() * 0.2,
      })
    }

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const w = canvas.width
      const h = canvas.height
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(62, 39, 35, ${p.opacity})`
        ctx.fill()
      })
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      ro.disconnect()
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      <canvas ref={canvasRef} className="block w-full h-full" aria-hidden style={{ opacity: 0.5 }} />
    </div>
  )
}
