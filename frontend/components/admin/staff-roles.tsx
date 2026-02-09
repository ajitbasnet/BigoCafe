"use client"

import { motion } from "framer-motion"
import { UserCog, Shield } from "lucide-react"
import { useAdminStaffStore } from "@/stores/admin-staff-store"
import type { RolePermissions, StaffRole } from "@/lib/mock-data/admin-staff"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

const PERMISSION_LABELS: Record<keyof RolePermissions, string> = {
  canManageProducts: "Manage products",
  canManageOrders: "Manage orders",
  canViewAnalytics: "View analytics",
  canManageCustomers: "Manage customers",
  canManageRewards: "Manage rewards",
  canManageSeasonal: "Manage seasonal menu",
  canManageStaff: "Manage staff & roles",
  canManageSettings: "Manage settings",
}

export function StaffRoles() {
  const roles = useAdminStaffStore((s) => s.roles)
  const updateRolePermissions = useAdminStaffStore((s) => s.updateRolePermissions)

  const handleToggle = (
    roleId: StaffRole["id"],
    key: keyof RolePermissions,
    value: boolean
  ) => {
    updateRolePermissions(roleId, { [key]: value })
    toast.success("Permission updated")
  }

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-border shadow-dashboard overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="w-5 h-5" />
            Roles & permissions
          </CardTitle>
          <CardDescription>
            Edit permissions per role. No real auth changes—middleware can read role from session or mock.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-border p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">{role.name}</h3>
                {role.id === "super_admin" && (
                  <Badge variant="secondary">Full access</Badge>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(Object.entries(role.permissions) as [keyof RolePermissions, boolean][]).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded-lg border border-border px-4 py-3"
                    >
                      <Label className="cursor-pointer text-sm">
                        {PERMISSION_LABELS[key]}
                      </Label>
                      <Switch
                        checked={value}
                        onCheckedChange={(v) => handleToggle(role.id, key, v)}
                        disabled={role.id === "super_admin"}
                      />
                    </div>
                  )
                )}
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

