# Lib — Utilities, Data & Services

Shared logic, data access, and validation. **Separation of concerns:** UI stays in components; business logic and data here.

## Structure

| Folder / file   | Purpose |
|-----------------|--------|
| **`utils.ts`**  | General helpers (e.g. `cn` for classnames). |
| **`validators/`** | Zod schemas and types (e.g. product form). |
| **`mock-data/`** | Static/mock data for menu, products, orders, admin analytics, notifications, etc. Used when Supabase is not configured or for demos. |
| **`supabase/`**  | Supabase client (browser), server client, and API proxy. Data access layer. |
| **`admin-export.ts`** | Export helpers (CSV, PDF) for admin reports. |

## Conventions

- **Naming:** Files in **kebab-case**; export names in **camelCase** or **PascalCase** as appropriate.
- **Imports:** Use `@/lib/...` alias.
- **No UI:** Keep this folder free of React components or layout; only logic, types, and data.
