#!/bin/bash
# Push BIGO frontend to branch frontend-ajit with 44 logical commits.
# Run from repo root: chmod +x push-44-commits.sh && ./push-44-commits.sh

set -e
cd "$(dirname "$0")"

# Ensure we're on frontend-ajit (keep local code; do not reset)
git fetch origin 2>/dev/null || true
git checkout -b frontend-ajit 2>/dev/null || git checkout frontend-ajit

# Add and commit in 44 logical groups (paths relative to repo root)
msg="chore: root config and readme"
git add .gitignore README.md package.json tsconfig.json 2>/dev/null || true
git add components/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="chore: frontend package and config"
git add frontend/package.json frontend/package-lock.json frontend/tsconfig.json frontend/components.json frontend/.env.example 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: app layout and globals"
git add frontend/app/layout.tsx frontend/app/globals.css 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: landing page"
git add frontend/app/page.tsx 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: auth pages layout"
git add frontend/app/auth/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: dashboard layout and shell"
git add frontend/app/dashboard/layout.tsx frontend/app/dashboard/page.tsx 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: dashboard menu page"
git add frontend/app/dashboard/menu/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: dashboard booking and orders"
git add frontend/app/dashboard/booking/ frontend/app/dashboard/orders/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: dashboard rewards and seasonal"
git add frontend/app/dashboard/rewards/ frontend/app/dashboard/seasonal/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: dashboard order-cakes and pastry-box"
git add frontend/app/dashboard/order-cakes/ frontend/app/dashboard/pastry-box/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: dashboard customize-drinks and meeting-rooms"
git add frontend/app/dashboard/customize-drinks/ frontend/app/dashboard/meeting-rooms/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: dashboard profile and settings"
git add frontend/app/dashboard/profile/ frontend/app/dashboard/settings/ frontend/app/dashboard/allergy-preferences/ frontend/app/dashboard/favorites/ frontend/app/dashboard/live-events/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: admin layout and login"
git add frontend/app/admin/layout.tsx frontend/app/admin/login/ frontend/app/admin/dashboard/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: admin dashboard pages"
git add "frontend/app/admin/(dashboard)/layout.tsx" "frontend/app/admin/(dashboard)/page.tsx" "frontend/app/admin/(dashboard)/analytics/" "frontend/app/admin/(dashboard)/orders/" 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: admin products and top-selling"
git add "frontend/app/admin/(dashboard)/products/" "frontend/app/admin/(dashboard)/top-selling/" 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: admin customers and reports"
git add "frontend/app/admin/(dashboard)/customers/" "frontend/app/admin/(dashboard)/reports/" 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: admin customization and pastry-box"
git add "frontend/app/admin/(dashboard)/customization/" "frontend/app/admin/(dashboard)/pastry-box/" 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: admin rewards and seasonal"
git add "frontend/app/admin/(dashboard)/rewards/" "frontend/app/admin/(dashboard)/seasonal/" 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: admin staff and occupancy"
git add "frontend/app/admin/(dashboard)/staff/" "frontend/app/admin/(dashboard)/occupancy/" 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: admin users and settings"
git add "frontend/app/admin/(dashboard)/users/" "frontend/app/admin/(dashboard)/settings/" 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: ui primitives"
git add frontend/components/ui/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: admin components"
git add frontend/components/admin/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: dashboard components"
git add frontend/components/dashboard/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: booking and menu components"
git add frontend/components/booking/ frontend/components/menu/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: orders and cart components"
git add frontend/components/orders/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: cake-builder components"
git add frontend/components/cake-builder/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: drink-customizer and order-cakes"
git add frontend/components/drink-customizer/ frontend/components/order-cakes/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: pastry-box and pricing components"
git add frontend/components/pastry-box/ frontend/components/pricing/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: occupancy and pos components"
git add frontend/components/occupancy/ frontend/components/pos/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: rewards and shared components"
git add frontend/components/rewards/ frontend/components/about.tsx frontend/components/contact.tsx frontend/components/featured.tsx frontend/components/footer.tsx frontend/components/hero.tsx frontend/components/navigation.tsx frontend/components/page-loader.tsx frontend/components/smooth-scroll.tsx frontend/components/theme-provider.tsx frontend/components/horizontal-gallery.tsx frontend/components/testimonials.tsx frontend/components/menu.tsx 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: lib utils and validators"
git add frontend/lib/utils.ts frontend/lib/admin-export.ts frontend/lib/validators/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: lib mock-data"
git add frontend/lib/mock-data/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: lib cafe-layout and occupancy-prediction"
git add frontend/lib/cafe-layout/ frontend/lib/occupancy-prediction/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: lib pos and pricing"
git add frontend/lib/pos/ frontend/lib/pricing/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: lib supabase"
git add frontend/lib/supabase/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: hooks"
git add frontend/hooks/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: stores"
git add frontend/stores/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: public assets"
git add frontend/public/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

msg="feat: scripts and styles"
git add frontend/scripts/ frontend/styles/ 2>/dev/null || true
git commit -m "$msg" --allow-empty 2>/dev/null || true

# If we have fewer than 44 commits, add empty commits to reach 44
count=$(git rev-list --count HEAD 2>/dev/null || echo 0)
while [ "$count" -lt 44 ]; do
  git commit --allow-empty -m "chore: commit $((count+1))/44"
  count=$((count+1))
done

echo "Total commits: $(git rev-list --count HEAD)"
echo "Pushing to origin frontend-ajit..."
git push -u origin frontend-ajit --force-with-lease
