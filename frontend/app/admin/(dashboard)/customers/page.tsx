"use client"

import { CustomersList } from "@/components/admin/customers-list"
import { adminCustomersMock } from "@/lib/mock-data/admin-customers"

export default function AdminCustomersPage() {
  return <CustomersList customers={adminCustomersMock} />
}
