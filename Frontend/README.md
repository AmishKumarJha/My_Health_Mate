# MyHealthMate — AI-Powered Preventive Health Platform

A premium, minimal, futuristic healthcare landing page built with **Next.js 14**, **React**, **Tailwind CSS**, and **Chart.js**.

---

## 🚀 Quick Start

```bash
# 1. Navigate to project folder
cd MyHealthMate-health

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
# http://localhost:3000
```

---

## 📁 Project Structure

```
MyHealthMate/
├── app/
│   ├── page.jsx              # Root page — composes all sections
│   ├── layout.jsx            # Root layout — fonts, metadata, global wrapper
│   └── globals.css           # Global CSS — Tailwind, animations, scrollbar
│
├── components/
│   ├── sections/             # Full page sections (one file per section)
│   │   ├── Navbar.jsx        # Fixed nav with glass effect + mobile menu
│   │   ├── Hero.jsx          # Full-height hero with dashboard mockup
│   │   ├── Features.jsx      # 4-card feature grid
│   │   ├── DashboardPreview.jsx  # Analytics charts + biomarker table
│   │   ├── HowItWorks.jsx    # 3-step process timeline
│   │   ├── Stories.jsx       # Case study cards (detect → result)
│   │   ├── Pricing.jsx       # 2-tier pricing (Discovery / Care)
│   │   ├── Trust.jsx         # Security & compliance badges
│   │   ├── CallToAction.jsx  # Dark final CTA section
│   │   └── Footer.jsx        # Links, newsletter, social icons
│   │
│   └── ui/                   # Reusable UI primitives
│       ├── Button.jsx        # Button with 6 variants
│       ├── Icon.jsx          # SVG icon library (20+ icons)
│       ├── SectionHeader.jsx # Badge + title + subtitle block
│       ├── RevealWrapper.jsx # Scroll-reveal animation wrapper
│       └── useScrollReveal.js # IntersectionObserver hook
│
├── data/
│   └── content.js            # All static copy, stats, pricing, links
│
├── tailwind.config.js        # Tailwind theme + custom animations
├── postcss.config.js         # PostCSS + Autoprefixer
├── next.config.js            # Next.js configuration
└── package.json              # Dependencies
```

---

## 🎨 Design System

| Token         | Value                        |
|---------------|------------------------------|
| Primary Blue  | `#3B82F6` (Tailwind blue-500)|
| Teal Accent   | `#2DD4BF` (teal-400)         |
| Green Success | `#10B981` (emerald-500)      |
| Body Font     | DM Sans (300–600)            |
| Display Font  | DM Serif Display (400)       |
| Border Radius | 16px cards, 24px large cards |

---

## ✨ Key Features

- **Scroll Reveal** — `useScrollReveal` hook using `IntersectionObserver`
- **Floating Cards** — CSS keyframe animations in `globals.css`
- **Live Charts** — Chart.js dynamically imported (avoids SSR issues)
- **Animated Progress Bars** — Width transitions triggered by scroll
- **Period Selector** — Chart updates when switching 1M/3M/6M/1Y
- **Mobile Menu** — Animated hamburger → X transition
- **Newsletter Input** — Controlled input with subscribed state
- **Glassmorphism Nav** — `backdrop-blur` + conditional shadow on scroll

---

## 🧩 Adding Content

All text, stats, pricing, and feature data lives in `data/content.js`.  
Edit that file to update copy without touching any JSX components.

---

## 📦 Dependencies

| Package     | Purpose                           |
|-------------|-----------------------------------|
| `next`      | React framework with App Router   |
| `react`     | UI component library              |
| `chart.js`  | Line charts in dashboard mockup   |
| `tailwindcss` | Utility-first CSS framework     |
| `autoprefixer` | CSS vendor prefix automation   |

---

## 🔧 Production Build

```bash
npm run build    # Build optimized production bundle
npm start        # Start production server
```

---

Built with ❤️ — MyHealthMate Health Technologies © 2025
