import { redirect } from "next/navigation"

/**
 * /admin/dashboard redirects to /admin (the dashboard lives at /admin;
 * (dashboard) is a route group and does not appear in the URL).
 */
export default function AdminDashboardRedirect() {
  redirect("/admin")
}
