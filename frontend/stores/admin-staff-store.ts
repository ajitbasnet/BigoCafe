import { create } from "zustand"
import type { StaffRole, RolePermissions } from "@/lib/mock-data/admin-staff"
import { defaultStaffRoles } from "@/lib/mock-data/admin-staff"

interface AdminStaffState {
  roles: StaffRole[]
  updateRolePermissions: (roleId: StaffRole["id"], permissions: Partial<RolePermissions>) => void
}

export const useAdminStaffStore = create<AdminStaffState>((set) => ({
  roles: defaultStaffRoles,

  updateRolePermissions: (roleId, permissions) =>
    set((s) => ({
      roles: s.roles.map((r) =>
        r.id === roleId
          ? { ...r, permissions: { ...r.permissions, ...permissions } }
          : r
      ),
    })),
}))
