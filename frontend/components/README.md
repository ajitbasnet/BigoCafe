# Components

React UI and feature components. **Keep structure flat** — find any file within 2–3 clicks.

## Layout

| Folder / file       | Purpose |
|---------------------|--------|
| **`ui/`**           | Shared primitives (Button, Card, Dialog, Input, etc.). Reusable across app. |
| **`admin/`**        | Admin dashboard: nav, sidebar, tables, dialogs, config (products, orders, rewards, seasonal, staff). |
| **`dashboard/`**    | Customer dashboard: nav, sidebar, overview, orders, profile, favorites. |
| **`orders/`**       | Cart, cart sheet, order tracking. |
| **`menu/`**         | Menu tabs, menu item card, drink customizer entry. |
| **`drink-customizer/`** | Drink customization modal. |
| **`pastry-box/`**   | Pastry box builder UI. |
| **`rewards/`**      | Rewards widget. |
| **Root-level `.tsx`** | Home/marketing: hero, featured, about, contact, footer, navigation, testimonials, theme-provider, page-loader, smooth-scroll. |

## Conventions

- **Naming:** Folders in **kebab-case** (e.g. `drink-customizer`, `pastry-box`). Components in **PascalCase**.
- **Separation:** `ui/` = presentational; other folders = feature/screen-specific.
- **Imports:** Use `@/components/...` alias.
