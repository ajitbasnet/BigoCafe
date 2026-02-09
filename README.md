# BIGO Artisan Bakery & Coffee

Frontend (Next.js) lives in the **`frontend/`** folder.

## Run the app

From **project root** (after installing dependencies in frontend):

```bash
cd frontend && npm install && npm run dev
```

Or from root using the workspace scripts (still requires `frontend/node_modules`):

```bash
cd frontend && npm install
npm run dev
```

App runs at **http://127.0.0.1:8888** (dashboard, admin, menu, orders, etc.).

## Folder structure

```
bigo/
├── frontend/          # Next.js app
│   ├── app/           # Routes, layouts, pages
│   ├── components/    # React components
│   ├── lib/           # Utils, mock data, Supabase
│   ├── public/        # Static assets
│   ├── stores/        # Zustand stores
│   ├── hooks/
│   ├── package.json
│   ├── next.config.mjs
│   └── tsconfig.json
├── package.json       # Delegates scripts to frontend
└── README.md
```
