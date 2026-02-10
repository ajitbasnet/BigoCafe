<<<<<<< HEAD
# BIGO
BIGO Café &amp; Bakery is a luxury digital café platform offering customizable cakes, drinks, and pastry boxes, interactive table booking, loyalty rewards, and smart ordering. It features a premium user experience and an advanced admin dashboard for analytics, orders, and seasonal menu management. This good.
=======
# BIGO — Frontend

Next.js app for BIGO Artisan Bakery & Coffee (customer site, dashboard, and admin).

## Run

```bash
npm install
npm run dev
```

App: **http://127.0.0.1:8888**

---

## Code Structure (Best Practices)

This repo follows **consistent**, **flat**, and **documented** structure so anyone can find and understand code quickly.

### Principles

| Principle | How we apply it |
|-----------|------------------|
| **Consistency** | Folders and files use **kebab-case** (e.g. `drink-customizer`, `pastry-box`). Components and exports use **PascalCase** / **camelCase**. |
| **Logical grouping** | Code is grouped by **purpose**: routes in `app/`, UI in `components/`, logic and data in `lib/`, state in `stores/`. |
| **Separation of concerns** | **UI** in `components/` (and `app/` for pages). **Business logic & data** in `lib/` (utils, validators, mock-data, supabase). **Client state** in `stores/`. |
| **Keep it flat** | No deep nesting. You should reach any file in **2–3 clicks** from `frontend/`. |
| **Descriptive naming** | Folder and file names describe what’s inside (e.g. `admin/`, `orders/`, `cart-sheet.tsx`). |
| **Documentation** | Each main folder has a **README.md** explaining its role and contents. |

### Top-level layout

```
frontend/
├── app/              # Routes, layouts, pages (Next.js App Router)
├── components/       # React components (ui/ + feature folders)
├── lib/              # Utils, validators, mock data, Supabase client
├── stores/           # Zustand state (cart, orders, admin, etc.)
├── hooks/            # Shared React hooks
├── public/           # Static assets (images, icons)
├── scripts/          # SQL / one-off scripts (e.g. Supabase)
├── styles/           # Extra global styles (if any)
├── middleware.ts     # Next.js middleware (auth, redirects)
├── next.config.mjs
├── tsconfig.json
└── package.json
```

### Path aliases

- `@/components/...` — components
- `@/lib/...`       — lib
- `@/stores/...`     — stores
- `@/hooks/...`      — hooks

See each folder’s **README.md** for details (e.g. `app/README.md`, `components/README.md`).

### Version control

- Use **Git** for all code; this structure works with standard `.gitignore` (e.g. `node_modules`, `.next`, `frontend/.env`).
- Keep **READMEs and config** committed so the layout is clear for the whole team.
>>>>>>> c890c4fe (Initial commit)
