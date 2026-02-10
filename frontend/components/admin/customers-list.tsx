"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Users, Search, Eye, Gift, ShoppingBag, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { AdminCustomer } from "@/lib/mock-data/admin-customers"

gsap.registerPlugin(ScrollTrigger)

interface CustomersListProps {
  customers: AdminCustomer[]
}

const tierLabels: Record<string, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
}

export function CustomersList({ customers }: CustomersListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [detailCustomer, setDetailCustomer] = useState<AdminCustomer | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="relative space-y-6 overflow-hidden">
      <div ref={headerRef} className="relative">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-primary uppercase tracking-[0.3em] text-sm mb-2"
        >
          Customers
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-3xl text-foreground mb-2"
        >
          Customers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted-foreground"
        >
          View customer profiles, order history, and reward balance
        </motion.p>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "4rem" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-px bg-primary mt-6"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-md"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-background border-border h-12 rounded-xl"
        />
      </motion.div>

      {filtered.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-border bg-card shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20"
        >
          <div className="overflow-x-auto">
            <Table className="text-sm min-w-[720px]">
              <TableHeader>
                <TableRow className="border-border bg-muted/70 hover:bg-muted/70">
                  <TableHead className="py-3.5 px-4 font-semibold text-foreground">Name</TableHead>
                  <TableHead className="py-3.5 px-4 font-semibold text-foreground">Email</TableHead>
                  <TableHead className="py-3.5 px-4 text-center font-semibold text-foreground w-24">Orders</TableHead>
                  <TableHead className="py-3.5 px-4 text-right font-semibold text-foreground w-28">Reward points</TableHead>
                  <TableHead className="py-3.5 px-4 text-center font-semibold text-foreground min-w-[140px]">Favorites</TableHead>
                  <TableHead className="py-3.5 px-4 w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c, i) => (
                  <TableRow
                    key={c.id}
                    className={`border-border cursor-pointer transition-colors duration-300 ${
                      i % 2 === 0 ? "bg-card" : "bg-muted/30"
                    } hover:bg-muted/60`}
                    onClick={() => {
                      setDetailCustomer(c)
                      setDetailOpen(true)
                    }}
                  >
                    <TableCell className="py-3.5 px-4 font-medium text-foreground">{c.name}</TableCell>
                    <TableCell className="py-3.5 px-4 text-foreground/90">{c.email}</TableCell>
                    <TableCell className="py-3.5 px-4 text-center text-foreground tabular-nums">{c.orderCount}</TableCell>
                    <TableCell className="py-3.5 px-4 text-right text-foreground tabular-nums">{c.rewardPointsBalance}</TableCell>
                    <TableCell className="py-3.5 px-4 text-center text-foreground/80 min-w-[140px] max-w-[200px] whitespace-normal">
                      {c.favoriteItems.length > 0
                        ? c.favoriteItems.slice(0, 3).join(", ") +
                          (c.favoriteItems.length > 3 ? "…" : "")
                        : "—"}
                    </TableCell>
                    <TableCell className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-xl text-foreground hover:bg-primary/10 hover:text-primary"
                        onClick={() => {
                          setDetailCustomer(c)
                          setDetailOpen(true)
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Card className="bg-card border-border rounded-2xl shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
            <CardContent className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-foreground mb-2">No customers found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? "Try adjusting your search" : "Customer data will appear here."}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle>Customer profile</DialogTitle>
          </DialogHeader>
          {detailCustomer && (
            <div className="space-y-6 py-2">
              <div>
                <p className="font-semibold text-foreground text-lg">{detailCustomer.name}</p>
                <p className="text-muted-foreground text-sm">{detailCustomer.email}</p>
                {detailCustomer.membershipTier && (
                  <Badge variant="secondary" className="mt-2">
                    {tierLabels[detailCustomer.membershipTier]}
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-border p-4 flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-semibold text-foreground">{detailCustomer.orderCount}</p>
                    <p className="text-xs text-muted-foreground">Orders</p>
                  </div>
                </div>
                <div className="rounded-xl border border-border p-4 flex items-center gap-3">
                  <Gift className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-semibold text-foreground">
                      {detailCustomer.rewardPointsBalance}
                    </p>
                    <p className="text-xs text-muted-foreground">Reward points</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Favorites
                </p>
                {detailCustomer.favoriteItems.length > 0 ? (
                  <p className="text-muted-foreground text-sm">
                    {detailCustomer.favoriteItems.join(", ")}
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm">No favorites yet</p>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Order history and more details can be wired to real data when available.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
