# App — Routes & Pages

Next.js App Router: all routes, layouts, and page components.

## Structure

- **`/`** — Marketing home
- **`/admin/*`** — Admin dashboard (overview, analytics, orders, products, reports, etc.)
- **`/dashboard/*`** — Customer dashboard (menu, orders, rewards, profile, pastry box)
- **`/auth/*`** — Login, sign-up, forgot password, reset password

## Conventions

- One **`layout.tsx`** per section (root, admin, dashboard) for shared shell and auth.
- **`page.tsx`** in each folder defines the route; keep pages thin and delegate to components in `components/`.
- Global styles: **`globals.css`** at app root.
