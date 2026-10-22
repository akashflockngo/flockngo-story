# FlocknGo — Cinematic Brand Storytelling Site

A standalone single-page branding and product-storytelling website for **FlocknGo**, built with **Vite**, **React 19**, **TypeScript**, **Tailwind CSS v4**, and **GSAP ScrollTrigger**.

Showcasing the 20-second FlocknGo film and highlighting the three core pillars: **Action**, **Information**, and **Communication**.

---

## 1. Quick Start & Local Development

### Prerequisites
* Node.js v18+ (tested on Node v22.22.3)
* npm v9+

### Installation & Running Locally
```bash
# Navigate to the project directory
cd flockngo-storytelling-site

# Install dependencies
npm install

# Start the local development server
npm run dev

# Open your browser at http://localhost:5173/
```

### Production Build & Linting
```bash
# Run oxlint for static analysis
npm run lint

# Compile TypeScript and generate the production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 2. Asset Structure

All static media assets are located in `public/`:
* **Main Cinematic Film:**  
  `public/media/flockngo-story.mp4`  
  *20-second, H.264 MP4 with fast-start metadata enabled for instantaneous HTTP streaming.*
* **Lightweight Video Poster:**  
  `public/images/poster-flockngo-story.jpg`  
  *Web-optimized progressive poster (33.8 KB).*
* **Brand Logos & App Visuals:**  
  * `public/images/flockngo-logo.png` — Official FlocknGo brand wordmark.
  * `public/favicon.png` — Official favicon.
  * `public/images/brand-characters.jpeg` — Authentic brand character illustrations.
  * `public/images/app-create-flock.jpeg` — Real app setup & activity creation screen.
  * `public/images/app-community-detail.jpeg` — Real Belmondo Cultural Club dashboard.
  * `public/images/frame-hero-desk.jpg` — Video frame: quiet smartphone on desk.
  * `public/images/frame-whatsapp-notif.jpg` — Video frame: Sahyadri Trekkers 1-to-1 WhatsApp notification.
  * `public/images/frame-whatsapp-chat.jpg` — Video frame: Direct chat with itinerary links.
  * `public/images/frame-manifesto.jpg` — Video frame: Official FlocknGo manifesto closing card.
  * `public/images/google-play.png` & `public/images/app-store.png` — Official mobile store badges.

---

## 3. Brand System & Configuration

All color tokens, copy, pillar descriptions, and CTA URLs are centralized in:  
📁 **`src/config/brand.ts`**

### Brand Colors & Tokens
```typescript
colors: {
  signatureOrange: '#F47721',  // Primary action buttons & highlights
  flameOrange: '#E74728',      // Eyebrow badges & gradients
  charcoalDark: '#111111',     // Display headings & contrast chapters
  charcoalVoid: '#0A0D14',     // Dark opening canvas & footer
  warmWhite: '#FFFCF8',        // Human-centered warm chapters
  warmPeach: '#FFF0E6',        // Action chapter background
  warmBorder: '#F3E5D8',       // Glass borders
  whatsappGreen: '#25D366',    // Direct WhatsApp highlights
}
```

### Destination Links
* **Primary CTA Destination:** `https://new.flockngo.com/`
* **Official Website:** `https://flockngo.com/`
* **Events & Activities Hub:** `https://events.flockngo.com/`
* **Official WhatsApp Concierge:** `https://wa.me/919607476642`
* **LinkedIn:** `https://www.linkedin.com/company/flockngo`
* **YouTube:** `https://www.youtube.com/@flockngo5875`

---

## 4. Component & Story Chapter Architecture

The page narrative is broken into focused, decoupled components inside `src/sections/` and `src/components/`:

| Component / File | Purpose & Motion Pattern |
| :--- | :--- |
| **`src/components/Header.tsx`** | Minimal cinematic navigation with logo, anchor links, active chapter scroll indicator, and mobile drawer. |
| **`src/sections/HeroSection.tsx`** | Opening chapter: *"Every community has a story."* with staggered line-by-line entrance. |
| **`src/sections/FilmSection.tsx`** | 16:9 widescreen theater stage featuring scroll-linked aperture expansion and ambient lighting. |
| **`src/components/VideoPlayer.tsx`** | Custom video player with `preload="metadata"`, poster fallback, accessible sound/play controls, and replay overlay. |
| **`src/sections/ChapterCommunity.tsx`** | Chapter 01 (*"Great experiences start with your people."*) with floating parallax cards. |
| **`src/sections/ChapterAction.tsx`** | Chapter 02 (*"From an idea to everyone showing up."*) with sequenced card cascade and live RSVP progress bar. |
| **`src/sections/ChapterCommunication.tsx`** | Chapter 03 (*"The right update. Without the chaos."*) on dark charcoal with authentic WhatsApp notification cards. |
| **`src/sections/ChapterMemories.tsx`** | Chapter 04 (*"More than a moment. A community that continues."*) with Belmondo Cultural Club memory vault. |
| **`src/sections/PillarsEditorialSection.tsx`** | Typographic three-pillar editorial section (Action, Information, Communication) with horizontal timeline expansion. |
| **`src/sections/CtaSection.tsx`** | Final conversion moment: *"Stop managing groups. Start building communities."* |
| **`src/components/Footer.tsx`** | Refined brand footer with official manifesto, verified social channels, and store badges. |
| **`src/hooks/useScrollAnimation.ts`** | Reusable GSAP & ScrollTrigger hooks with `gsap.context()`, `gsap.matchMedia()`, and `prefers-reduced-motion` support. |

---

## 5. Deployment Guide

To build the static production distribution:
```bash
npm run build
```
This generates the optimized static bundle in `dist/`. The output can be deployed to any modern static hosting platform (Vercel, Netlify, Cloudflare Pages, AWS S3 / CloudFront, etc.) without requiring a Node.js server.
