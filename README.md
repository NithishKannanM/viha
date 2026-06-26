# Viha — Heritage Spiritual Boutique

A premium e-commerce storefront for **Viha**, curated by Mrs. Anitha Kuppusamy. Built with React 19, Vite, Tailwind CSS v4, and Framer Motion. Designed to feel like a native shopping app on mobile while maintaining a full-featured desktop experience.

**Live:** [viha-zeta.vercel.app](https://viha-zeta.vercel.app)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| Language | TypeScript 5.8 |
| Deployment | Vercel |

---

## Features

### Store
- **11 product categories** — Spiritual & Pooja, Ayurveda & Herbal, Beauty & Wellness, Jewellery & Fashion, Home & Living, Food & Organic, Kids & Baby, Books & Stationery, Bags & Pouches, Fashion & Grooming, New Arrivals
- **Mega menu** with subcategory drill-down and featured product spotlight (desktop)
- **Full-text product search** with instant results, category filtering, and customs clearance indicators
- **Wishlist** with persistent drawer
- **Cart** with quantity controls and restricted-region warnings
- **Multi-region pricing** — India, US, UK, Canada, UAE, China with live currency conversion
- **Customs clearance checker** — per-product international shipping restrictions

### Pages
| Page | Description |
|---|---|
| Home | Hero, Shop By Purpose, Beauty & Wellness promo, Bestsellers, Curated Collections, Founder story, Order tracker |
| Shop | Filterable product catalog with category sidebar and 2-col mobile grid |
| Beauty & Wellness | Dedicated landing page — concerns, collections, best sellers, ritual steps, ingredient spotlight, reviews, journal, newsletter |
| Product Detail | Image gallery, add to cart, wishlist, related products |
| Checkout | 4-step flow: Contact → Delivery (Home / Store Pickup) → Payment (Card / UPI / PayPal) → Review |
| Order Tracker | Real-time status stepper with simulated courier stages |
| Account | Order history and tracking |

### Mobile UX
- **Sticky bottom navigation** — Home, Shop, Search, Wishlist, Cart with animated badges
- **Full-screen animated drawer** with spring physics and grouped category sections
- **Horizontal swipe carousels** — Bestsellers, Collections, Trust badges, Beauty collections
- **2-column product grid** on mobile
- **Horizontal category pill scroll** in shop
- **Full-width CTAs** with 50px tap targets throughout
- **Sticky checkout bar** on mobile review step
- Safe area inset support for iPhone notch / home bar

---

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Sticky nav, mega menu, cart/wishlist/search drawers
│   ├── MobileBottomNav.tsx # Fixed bottom navigation (mobile only)
│   ├── HomeView.tsx        # Homepage with all sections
│   ├── ShopView.tsx        # Product catalog with filters
│   ├── BeautyView.tsx      # Beauty & Wellness landing page
│   ├── ProductDetailView.tsx
│   ├── CheckoutFlow.tsx    # 4-step checkout
│   ├── TrackerView.tsx     # Order tracking
│   ├── AccountView.tsx
│   ├── Footer.tsx
│   └── Logo.tsx
├── data.ts                 # Products, categories, regions, mock orders
├── types.ts                # TypeScript interfaces
├── index.css               # Tailwind v4 theme + custom utilities
├── App.tsx                 # Root — state management and routing
└── main.tsx
```

---

## Brand Tokens

Defined in `src/index.css` via Tailwind v4 `@theme`:

```
brand-maroon       #0F5A43   Primary green
brand-maroon-dark  #0B4533   Hover / dark variant
brand-gold         #B8893D   Accents, labels, ornaments
brand-cream        #F8F4EC   Page background
brand-cream-dark   #E5DED1   Borders, dividers
brand-charcoal     #2D2D2D   Body text
brand-paper        #FFFDF9   Card / panel backgrounds
brand-section-alt  #F3EFE7   Alternating section backgrounds
```

Fonts: **Libre Caslon Text** (headings) · **Hanken Grotesk** (body)

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server (localhost:3000)
npm run dev

# Type check
npm run lint

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Shopify Compatibility

The checkout flow mirrors Shopify's standard input naming conventions:
- Contact fields map to Shopify customer fields
- Address fields follow Shopify's delivery address schema
- Payment section maps to Shopify payment gateway inputs (Card / UPI / PayPal)
- Store pickup uses Shopify's local pickup flow
- Region/currency selection maps to Shopify Markets

To connect to a live Shopify store, replace the mock handlers in `CheckoutFlow.tsx` with Shopify Storefront API calls and configure the region data in `data.ts` to match your Shopify Markets setup.

---

## Deployment

Deployed on Vercel with zero configuration. Push to `main` triggers a production deploy automatically.

```bash
vercel --prod
```
