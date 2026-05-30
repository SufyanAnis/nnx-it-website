# NNX IT — Consulting & Training

A futuristic, single-page marketing site for **NNX IT Consulting and Training** — a Black woman-owned software testing & IT training company based in Waterfall, Midrand, South Africa.

Built with **Next.js 14 (App Router)**.

## ✨ Features

- **Animated particle-network background** on `<canvas>` that reacts to the cursor
- **Custom glowing cursor** (dot + trailing ring)
- **Typewriter** hero headline and **count-up** stat counters
- **Scroll-reveal** animations via `IntersectionObserver`
- **Glassmorphism** cards with gradient borders
- **3D-tilt cards** and **magnetic buttons**
- Sticky glass nav with scroll-spy + full mobile menu
- Infinite marquee, animated "How We Work" timeline, contact form
- **Indigo & Coral** theme, fully responsive, respects `prefers-reduced-motion`

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## 📦 Build

```bash
npm run build
npm start
```

## 🗂️ Structure

```
app/
  layout.js      # fonts (Sora + Space Grotesk), metadata
  page.js        # composes all sections
  globals.css    # theme + styles
components/
  Background.jsx   # canvas particles, cursor, scroll progress
  Nav.jsx          # sticky nav, scroll-spy, mobile menu
  Hero.jsx         # typewriter + count-up stats
  Reveal.jsx       # scroll-reveal wrapper
  Interactions.jsx # magnetic buttons + 3D tilt
  ContactForm.jsx  # contact form
```

## 📫 Contact

- **Email:** info@nnxit.co.za
- **Phone:** +27 73 161 8176
- **Location:** Waterfall, Midrand, South Africa
