"use client"

import { motion } from "framer-motion"
import { StaffRoles } from "@/components/admin/staff-roles"

export default function AdminStaffPage() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-1"
      >
        <p className="text-primary uppercase tracking-[0.3em] text-sm">Staff</p>
        <h1 className="font-serif text-3xl text-foreground">Staff & roles</h1>
        <p className="text-muted-foreground">
          Manage roles (Super Admin, Admin, Kitchen Staff, Order Manager) and permissions.
        </p>
      </motion.div>

      <StaffRoles />
    </div>
  )
}
