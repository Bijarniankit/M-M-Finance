# M&M Finance — Website Redesign

A complete modern redesign of mnmfinance.com.au built with **React + Vite + Tailwind CSS**, featuring a multi-tier Home Loans section, 12 working calculators, lazy-loaded routes, smooth animations, and a polished design system.

## Tech Stack
- **React 19** + **Vite 8** — fast dev & build
- **React Router v7** — client-side routing with lazy-loaded routes (`React.lazy` + `Suspense`)
- **Tailwind CSS 4** (via `@tailwindcss/vite`) — utility-first styling
- **Framer Motion** — page transitions & micro-animations (`AnimatePresence`)
- **Lucide React** — clean, consistent icons
- **react-intersection-observer** — scroll-triggered reveals & animated stats
- **@fontsource/inter** — self-hosted font fallback
- **ErrorBoundary** — graceful per-route error recovery

## Design System

### Color palette (finance-friendly, no dark colors)
- **Primary** — teal-green `#2a9d6c` (trust, growth)
- **Accent** — warm gold `#ffb02a` (premium, optimism)
- **Sky** — calm blue `#2589f7` (clarity)
- **Cream** — soft backgrounds `#fefcf7`
- **Ink** — neutral text scale (no pure black)

### Typography
- **Display:** Fraunces (serif — headings)
- **Body:** Plus Jakarta Sans (sans-serif — UI/copy)

### Components
- Buttons (primary / accent / outline / ghost · 3 sizes)
- Cards with hover lift, soft shadows, rounded `2xl` & `3xl`
- Eyebrows / pills, animated gradient text
- Mesh & blob backgrounds, subtle grid overlays
- Reveal-on-scroll, count-up stats, floating cards
- Custom scrollbar, focus rings, smooth scroll

## Folder Structure
```
src/
├── App.jsx                      # Router + layout shell + lazy routes
├── main.jsx                     # React entry
├── components/
│   ├── layout/                  # Header, Footer, Logo
│   ├── ui/                      # Section, Reveal, StatCounter, PageHeader
│   ├── utility/                 # PageWrapper, ScrollToTop, ErrorBoundary
│   └── calculators/             # CalcShell, Slider, Calcs (all calculator widgets)
├── data/site.js                 # Centralised content (services, calcs, guides...)
├── pages/
│   ├── home-loans/              # 7 sub-pages (buying, refinancing, investing, etc.)
│   └── *.jsx                    # Top-level page components
└── styles/index.css             # Tailwind layers, design-system primitives
```

## Pages

### Top-level
- **Home** — hero, services preview, why-us, process, calculator preview, stats, testimonials, guides preview, CTA
- **About** — story, values, team, stats
- **Home Loans** (hub) — entry to all home-loan sub-topics
- **Calculators** (hub) + **Calculator Detail** — 12 functional calculators
- **Guides** (hub) + **Guide Detail** — articles
- **Blog**
- **Lenders** — 25+ lender panel
- **Testimonials** — featured + grid + stats
- **FAQ** — categorised, animated accordion
- **Get Started** — multi-step form (goal → finances → details)
- **Contact** — form + contact cards + map
- **Privacy** — disclaimers + privacy info
- **404** — branded not-found

### Home Loans sub-pages
- `buying-a-home`
- `becoming-a-first-home-buyer`
- `buying-off-the-plan`
- `refinancing-your-home-loan`
- `investing-in-property`
- `different-loan-types`
- `typical-loan-features`

## Calculators (all functional)
1. Borrowing Power
2. Loan Repayment (P&I + Interest-Only)
3. Extra Repayments
4. Stamp Duty (all states/territories)
5. LMI
6. Loan Comparison (side-by-side)
7. Income Tax (AU 2024-25 brackets)
8. Savings Goal
9. Budget Planner (editable line items)
10. Offset Account
11. Split Loan (fixed/variable)
12. Property Buying Costs

## Routes
- `/` `/about`
- `/home-loans` + `/home-loans/:topic` (7 sub-pages above)
- `/calculators` `/calculators/:slug`
- `/guides` `/guides/:slug` `/blog`
- `/lenders` `/testimonials` `/faq`
- `/get-started` `/contact` `/privacy`
- `*` → 404

## Mobile responsiveness
- **Mobile-first** breakpoints throughout
- Hamburger menu with animated dropdowns on small screens
- Fluid typography & grid systems
- Touch-friendly tap targets, sticky header
- Tested across breakpoints `sm` `md` `lg` `xl`

## Animations
- Page-transition fade/slide via Framer Motion `AnimatePresence`
- Reveal-on-scroll for sections, staggered card grids
- Floating hero cards with looping motion
- Count-up stat numbers triggered by viewport
- Hover lift + shadow + icon rotation on cards
- Smooth accordion expand/collapse on FAQ

## Dev commands
```bash
npm install        # install dependencies
npm run dev        # start Vite dev server
npm run build      # production build → dist/
npm run preview    # preview built site locally
```

## Content
All copy is preserved from the original mnmfinance.com.au / mmfinancialservices.com.au — including taglines, mission, services list, ABN/ACL details, and team bios. Layout, fonts, color, and structure were redesigned.

## Status
Built · Mobile responsive · All 12 calculators functional · All routes working · Lazy-loaded with per-route error boundaries
