## Project Overview

This is the marketing website for UBOSS LLC — an AI-as-a-Service consulting agency targeting trades businesses (landscaping, cleaning, contracting, auto body, etc.) in the Greater Boston, MA area. The site must convert visitors into consultation bookings.

## Tech Stack

- **Framework:** SvelteKit (latest stable)
- **Hosting:** Vercel (optimized for SvelteKit adapter-vercel)
- **Styling:** Tailwind CSS v4+
- **Language:** TypeScript (strict mode)
- **Package Manager:** pnpm
- **Scheduling Widget:** Cal.com embed (15 min discovery + 60 min consultation)
- **Future Payment Integration:** Stripe (scaffold but do not implement yet)
- **Forms:** Contact form on-site (future: webhook to n8n)

## Architecture Rules

### Performance (CRITICAL — #1 Priority)

- Target Lighthouse score: 95+ on all metrics
- **Initial load must feel instant** — above-the-fold content renders first
- Use SvelteKit SSR/SSG where possible — prerender static pages
- Lazy load everything below the fold: images, pricing section, testimonials, cal.com embed
- Use `loading="lazy"` on all images below hero
- Use `IntersectionObserver` for deferred component rendering
- Inline critical CSS, defer non-critical
- Images: use WebP/AVIF with PNG fallback, serve via `<picture>` element
- Fonts: `font-display: swap`, preload primary weight only
- No heavy JS frameworks or animation libraries — CSS transitions only
- Bundle size budget: < 50KB initial JS

### Code Style

- Components: PascalCase (`HeroSection.svelte`)
- Routes: kebab-case (`/privacy-policy`)
- Use Svelte 5 runes syntax (`$state`, `$derived`, `$effect`)
- Co-locate component styles using Tailwind classes
- Extract shared styles to `src/lib/styles/`
- All text content must come from translation files (see i18n)

### i18n (Trilingual — CRITICAL)

- Default locale: `en`
- Supported: `en`, `es`, `pt-BR`
- Translation files: `src/lib/i18n/{locale}.json`
- Route structure: `/en/...`, `/es/...`, `/pt-BR/...`
- Language switcher in nav bar (globe icon + dropdown)
- Spanish tone: Central American / Mexican conversational (NOT Spain Castilian)
- Portuguese tone: Brazilian Portuguese conversational
- All SEO meta tags must be locale-aware with proper `hreflang` attributes
- Reference `SEO.md` for target keywords per language

### SEO

- Every page needs: `<title>`, `<meta description>`, Open Graph tags, Twitter card tags
- Implement JSON-LD structured data for `LocalBusiness` schema
- Trilingual `hreflang` link tags on every page
- Generate `sitemap.xml` with all locale variants
- Reference `SEO.md` for keyword targets — this file is the single source of truth for SEO terms
- Reference `CONTENT_STRATEGY.md` for drafted FAQ/blog/on-page copy (English checkpoint; ES/pt-BR translation intentionally pending, founder hand-flavors Spanish)

### File Organization

boss-site/
├── CLAUDE.md ← you are here
├── PROJECT.md ← business context + site structure
├── BRAND.md ← design system
├── PRICING.md ← tier config (single source of truth)
├── SEO.md ← keyword targets per language
├── CONTENT_STRATEGY.md ← drafted FAQ/blog/on-page copy (English checkpoint)
├── ANALYTICS.md ← GA4 / Google Ads / Clarity: where tags live, how to enable
├── static/
│ ├── assets/
│ │ ├── uboss-logo-dark.png ← teal U + white BOSS (dark bg)
│ │ ├── uboss-logo-light.png ← teal U + dark BOSS (light bg)
│ │ ├── pegasus-icon.png ← favicon/brand mark
│ | ├── photo-headshot.jpeg ← founder headshot for About page
│ │ └── legal/
│ │ ├── full-terms-of-service.pdf
│ │ ├── key-terms-summary.pdf
│ │ └── privacy-policy.pdf
│ ├── favicon.ico
│ └── robots.txt
├── src/
│ ├── lib/
│ │ ├── components/ ← reusable UI components
│ │ ├── i18n/
│ │ │ ├── en.json
│ │ │ ├── es.json
│ │ │ └── pt-BR.json
│ │ ├── analytics/ ← GA4 + Google Ads + Clarity (see ANALYTICS.md)
│ │ ├── config/
│ │ │ └── pricing.ts ← reads from PRICING.md or mirrors it
│ │ ├── styles/
│ │ └── utils/
│ ├── routes/
│ │ ├── [lang]/ ← locale-prefixed routes
│ │ │ ├── +page.svelte ← homepage
│ │ │ ├── +layout.svelte ← shared layout with nav + footer
│ │ │ ├── about/
│ │ │ ├── pricing/
│ │ │ ├── contact/
│ │ │ ├── legal/
│ │ │ │ ├── terms/
│ │ │ │ ├── privacy/
│ │ │ │ └── key-terms/
│ │ │ ├── support/
│ │ │ └── careers/
│ │ └── +page.server.ts ← root redirect to /en
│ └── app.html
├── .github/
│ └── workflows/
│ └── ci.yml ← GitHub Actions: lint + build validation
├── svelte.config.js
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json

### Git Hygiene

- Generate a comprehensive `.gitignore` on project init that includes:
  - `.env`, `.env.*` (secrets)
  - `node_modules/`
  - `.svelte-kit/`
  - `build/`, `dist/`
  - `.vercel/`
  - `.DS_Store`
  - `*.log`
  - `.claude/` (Claude Code local state)
  - Any IDE configs (`.vscode/`, `.idea/`)
  - PROJECT.md
  - PRICING.md
  - SEO.md
  - CONTENT_STRATEGY.md
- NEVER commit secrets, API keys, tokens, or credentials
- Use environment variables for all sensitive config
- `.env.example` with placeholder keys is okay to commit as a reference

### CI/CD Pipeline

- GitHub Actions workflow on every push/PR to `main`:
  1. Install dependencies (`pnpm install`)
  2. Lint (`eslint` + `prettier --check`)
  3. Type check (`svelte-check`)
  4. Build (`vite build`) — must succeed
  5. Optional: Lighthouse CI audit
- Vercel auto-deploys from `main` branch

### Component Architecture

- Each page section is its own component (HeroSection, PricingSection, ContactSection, etc.)
- Messaging/chat widget area: build a `ChatWidget.svelte` component with a floating button (bottom-right). Initially shows "Coming Soon" tooltip. Architecture should accept a webhook URL prop for future WhatsApp/Telegram/Chatwoot integration.
- Pricing component must read from a centralized config — never hardcode prices
- Contact form: client-side validation, honeypot spam field, submit to configurable endpoint (initially mailto, future: n8n webhook)

### Accessibility

- WCAG 2.1 AA compliance minimum
- Semantic HTML throughout
- Keyboard navigable
- Proper aria labels on interactive elements
- Color contrast ratios must pass AA for all brand colors

### What NOT To Do

- Do NOT use heavy animation libraries (GSAP, Framer Motion, etc.)
- Do NOT install a CSS framework on top of Tailwind
- Do NOT hardcode any pricing values in components — always reference config
- Do NOT hardcode text strings — always use i18n translation files
- Do NOT use client-side rendering for content pages — use SSR/SSG
- Do NOT ask clarifying questions if the answer is in PROJECT.md, BRAND.md, PRICING.md, or SEO.md
