# Stores — Client State

Zustand stores for global client state. One store per concern (cart, orders, admin products, etc.).

## Contents

- **Cart & orders:** `cart-store`, `order-store`, `pastry-box-store`, `rewards-store`
- **Admin:** `admin-products-store`, `admin-orders-store`, `admin-rewards-store`, `admin-seasonal-store`, `admin-staff-store`, `admin-customization-store`, `admin-pastry-box-store`

## Conventions

- **Naming:** Files in **kebab-case**; store names descriptive (e.g. `useAdminProductsStore`).
- **Imports:** Use `@/stores/...` alias.
- **Separation:** State and derived logic only; no UI or API calls beyond what the store needs (e.g. persistence).
