/**
 * Admin staff roles and permissions (mock).
 */

export type RoleId = "super_admin" | "admin" | "kitchen_staff" | "order_manager"

export interface RolePermissions {
  canManageProducts: boolean
  canManageOrders: boolean
  canViewAnalytics: boolean
  canManageCustomers: boolean
  canManageRewards: boolean
  canManageSeasonal: boolean
  canManageStaff: boolean
  canManageSettings: boolean
}

export interface StaffRole {
  id: RoleId
  name: string
  permissions: RolePermissions
}

export const defaultStaffRoles: StaffRole[] = [
  {
    id: "super_admin",
    name: "Super Admin",
    permissions: {
      canManageProducts: true,
      canManageOrders: true,
      canViewAnalytics: true,
      canManageCustomers: true,
      canManageRewards: true,
      canManageSeasonal: true,
      canManageStaff: true,
      canManageSettings: true,
    },
  },
  {
    id: "admin",
    name: "Admin",
    permissions: {
      canManageProducts: true,
      canManageOrders: true,
      canViewAnalytics: true,
      canManageCustomers: true,
      canManageRewards: true,
      canManageSeasonal: true,
      canManageStaff: false,
      canManageSettings: false,
    },
  },
  {
    id: "kitchen_staff",
    name: "Kitchen Staff",
    permissions: {
      canManageProducts: false,
      canManageOrders: true,
      canViewAnalytics: false,
      canManageCustomers: false,
      canManageRewards: false,
      canManageSeasonal: false,
      canManageStaff: false,
      canManageSettings: false,
    },
  },
  {
    id: "order_manager",
    name: "Order Manager",
    permissions: {
      canManageProducts: false,
      canManageOrders: true,
      canViewAnalytics: true,
      canManageCustomers: true,
      canManageRewards: false,
      canManageSeasonal: false,
      canManageStaff: false,
      canManageSettings: false,
    },
  },
]
