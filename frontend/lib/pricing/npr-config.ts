/**
 * NPR (Nepalese Rupees) pricing config for BIGO Café Nepal.
 * All amounts in NPR. Single source of truth for product pricing.
 */

// --- Cake (NPR) ---
export const CAKE_SIZE_BASE_NPR: Record<string, number> = {
  "1lb": 2800,
  "2lb": 4800,
  "3lb": 6800,
}
export const CAKE_CUSTOM_PRICE_PER_POUND_NPR = 2600

export const CAKE_FLAVOR_PREMIUM_NPR: Record<string, number> = {
  chocolate: 0,
  vanilla: 0,
  strawberry: 300,
  "red-velvet": 600,
  "black-forest": 500,
  mango: 700,
  butterscotch: 0,
  carrot: 0,
  lemon: 0,
}
export const CAKE_FLAVOR_PREMIUM_DEFAULT_NPR = 0

export const CAKE_CREAM_NPR: Record<string, number> = {
  buttercream: 350,
  whipped: 300,
  fondant: 1200,
  "chocolate-ganache": 800,
  "cream-cheese": 700,
}

export const CAKE_EXTRA_LAYER_NPR = 1500

/** Design id (d1, d2, ... custom) -> NPR */
export const CAKE_DESIGN_NPR: Record<string, number> = {
  d1: 0,   // Minimalist
  d2: 1000, // Floral
  d3: 0,   // Cartoon / Kids (no premium in spec; use 0)
  d4: 3000, // Luxury Wedding Style
  d5: 1500, // Photo Printed Cake
  custom: 3500,
}

// --- Drink (NPR) ---
export const DRINK_BASE_NPR: Record<string, number> = {
  latte: 480,
  cappuccino: 450,
  mocha: 520,
  americano: 400,
  "specialty-signature": 620,
}
/** Menu item id -> drink config key for base price (fallback to price in menu if missing) */
export const MENU_ITEM_TO_DRINK_KEY: Record<string, string> = {
  "drk-1": "latte",
  "drk-2": "latte",
  "drk-3": "americano",
  "drk-4": "cappuccino",
  "drk-5": "specialty-signature",
  "drk-6": "specialty-signature",
}

export const DRINK_MILK_NPR: Record<string, number> = {
  whole: 0,
  regular: 0,
  almond: 120,
  oat: 150,
  soy: 130,
}

export const DRINK_ADDON_NPR: Record<string, number> = {
  caramel: 90,
  "extra-espresso": 150,
  "extrashot": 150,
  whipped: 120,
  "whipped-cream": 120,
  "chocolate-drizzle": 100,
  chocolate: 100,
  "ice-cream": 220,
  syrup: 0,
}

export const DRINK_SIZE_MULTIPLIER: Record<string, number> = {
  small: 1,
  medium: 1.25,
  large: 1.5,
}

// --- Pastry box (NPR) ---
export const PASTRY_BOX_BASE_NPR: Record<string, number> = {
  "3": 1200,
  "6": 2200,
  "9": 3100,
}
export const PASTRY_BOX_PREMIUM_PER_PIECE_NPR = 200

// --- Seasonal modifier (multiplier on subtotal, e.g. 1.08 = +8%) ---
export const SEASONAL_MODIFIER: Record<string, number> = {
  valentine: 1.08,
  christmas: 1.1,
  "dashain-tihar": 1.12,
  regular: 1,
}

// --- Reward ---
export const REWARD_RUPEE_PER_POINT = 5
export const REWARD_MAX_DISCOUNT_FRACTION = 0.3

// --- VAT (Nepal) ---
export const VAT_RATE = 0.13
