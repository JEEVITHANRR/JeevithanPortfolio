# Jeevithan R R — Premium Portfolio v2

A cinematic, luxury-grade personal portfolio featuring React Three Fiber 3D scenes, Framer Motion animations, Lenis smooth scroll, and a deep maroon × cream design system.

## ⚡ Quick Start

```bash
npm install
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173)

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |

## 🎨 Design System

**Color Palette:**
- Background: `#F7F7F5` (Soft Cream)
- Accent: `#4A0E0E → #B22222` (Deep Maroon Gradient)
- Text: `#1A1A1A` (Charcoal)
- Cards: Frosted glassmorphism (`rgba(255,255,255,0.65)`)

**Typography:** Kanit (Google Fonts) — Black/ExtraBold for display, Light for body

## 📁 Folder Structure

```
src/
├── components/
│   ├── CustomCursor.tsx        # Magnetic custom cursor
│   ├── Navbar.tsx              # Sticky blur navbar
│   ├── HeroSection.tsx         # Cinematic hero with 3D + photo
│   ├── Scene3D.tsx             # React Three Fiber 3D scene
│   ├── AboutSection.tsx        # Bio + animated stat cards
│   ├── TechStackSection.tsx    # Skills grid + 3D cube + marquee
│   ├── ProjectCard.tsx         # 3D tilt hover card
│   ├── ProjectsSection.tsx     # Projects grid
│   ├── AnalyticsSection.tsx    # KPIs, bar chart, line chart, donut
│   ├── ExperienceSection.tsx   # Vertical timeline
│   ├── ContactSection.tsx      # Glass form + socials
│   └── Footer.tsx              # 3-column footer
│
├── data/
│   └── portfolio.json          # ← ALL content lives here
│
├── hooks/
│   ├── usePortfolio.ts         # Data hook
│   ├── useMousePosition.ts     # Mouse tracker
│   └── useCounter.ts           # Animated number counter
│
├── types/
│   └── portfolio.ts            # TypeScript interfaces
│
└── assets/
    └── photo.jpg               # Profile photo
```

## ✏️ Customization

All content is in `src/data/portfolio.json`. Edit:
- `profile` — name, bio, photo, socials, stats
- `projects` — add/remove projects
- `skills` — tech categories + icons
- `experience` — timeline items
- `analyticsStats` — KPI numbers
- `techIcons` — marquee tech list

## 3D Scene

The `Scene3D.tsx` component renders a React Three Fiber canvas with:
- Wireframe rotating sphere
- Floating distorted torus
- Icosahedron wireframe
- 120-particle field
- Soft maroon lighting

To tweak: edit position/scale/color props in `Scene3D.tsx`.

## 🚀 Deployment

```bash
npm run build
# Deploy dist/ to Vercel, Netlify, or any static host
```

Vercel: Zero-config — just import the GitHub repo.

## Performance Notes

- 3D scene is lazy-loaded via `React.lazy` + `Suspense`
- Lenis smooth scroll is dynamically imported
- `prefers-reduced-motion` disables all CSS animations
- Three.js bundle ~180KB gzipped
