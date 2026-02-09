import React from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div data-theme="bigo-admin" className="min-h-screen bg-background font-sans">
      {children}
    </div>
  )
}
