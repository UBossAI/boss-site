# UBOSS — Marketing Website

[![CI](https://github.com/BobbyG/boss-site/actions/workflows/ci.yml/badge.svg)](https://github.com/BobbyG/boss-site/actions/workflows/ci.yml)
[![Built with SvelteKit](https://img.shields.io/badge/Built%20with-SvelteKit-FF3E00?logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

Marketing and conversion website for **UBOSS LLC** — an AI-as-a-Service consulting agency serving trades businesses (landscaping, cleaning, contracting, auto body, property management, and more) across Greater Boston, MA.

**Live site:** [uboss.ai](https://uboss.ai)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Project Structure](#project-structure)
- [Trilingual (i18n) Support](#trilingual-i18n-support)
- [Vercel Deployment](#vercel-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Updating Pricing](#updating-pricing)
- [Updating SEO Keywords](#updating-seo-keywords)
- [Contributing](#contributing)

---

## Project Overview

The UBOSS website is a **marketing and conversion tool** with one primary job: get visitors to book a free consultation. It is not a web app or SaaS dashboard — it is a static/SSR marketing site built for speed, SEO, and accessibility.

**Key goals:**

- Establish credibility and premium positioning in the Greater Boston market
- Explain what UBOSS does in plain language trades business owners can understand
- Drive visitors to book via [Cal.com](https://cal.com/robg-uboss)
- Serve three languages natively: English, Spanish, and Brazilian Portuguese
- Target Lighthouse score: **95+ across all metrics**

---

## Tech Stack

| Layer           | Technology                                                                              |
| --------------- | --------------------------------------------------------------------------------------- |
| Framework       | [SvelteKit 2.x](https://kit.svelte.dev) + [Svelte 5](https://svelte.dev) (runes syntax) |
| Styling         | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`                      |
| Language        | TypeScript (strict mode)                                                                |
| Package Manager | [pnpm](https://pnpm.io)                                                                 |
| Hosting         | [Vercel](https://vercel.com) via `@sveltejs/adapter-vercel`                             |
| Scheduling      | [Cal.com](https://cal.com) embed                                                        |
| Fonts           | Plus Jakarta Sans (Google Fonts, preloaded 400 weight only)                             |
| CI/CD           | GitHub Actions                                                                          |

---

## Prerequisites

### Node.js

This project targets **Node.js 22**. Using a version manager is recommended.

```bash
# Using nvm
nvm install 22
nvm use 22

# Verify
node --version   # v22.x.x
```

> The Vercel adapter is configured for `nodejs22.x`. Building locally with Node 26+ will work but will show a deprecation warning from the adapter — this is safe to ignore.

### pnpm

Install pnpm globally if you don't have it:

```bash
npm install -g pnpm

# Verify
pnpm --version   # 9.x or 11.x
```

> **pnpm 11 note:** On first install, pnpm may prompt you to approve build scripts for `esbuild`. Run `pnpm approve-builds`, select `esbuild`, and confirm. This only needs to happen once per machine.

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/BobbyG/boss-site.git
cd boss-site
```

### 2. Install dependencies

```bash
pnpm install
```

If prompted about build scripts:

```bash
# Approve esbuild (required for Vite to work)
printf ' \ny\n' | pnpm approve-builds
pnpm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in any values as needed. For local development, the defaults in `.env.example` are sufficient — the site does not require any secrets to run.

### 4. Start the development server

```bash
pnpm dev
```

The site will be available at **[http://localhost:5173](http://localhost:5173)** and will automatically redirect to `/en`. Hot module replacement is enabled — changes to Svelte components, CSS, and translation files reload instantly.

**Available locales in dev:**

- [http://localhost:5173/en](http://localhost:5173/en) — English
- [http://localhost:5173/es](http://localhost:5173/es) — Spanish
- [http://localhost:5173/pt-BR](http://localhost:5173/pt-BR) — Brazilian Portuguese

### 5. Run a production build locally

```bash
pnpm build
```

SvelteKit compiles the site through Vite and the Vercel adapter. A clean build produces:

- `~8–9 KB` initial JS (well under the 50 KB budget)
- Prerendered HTML for all 30 locale-prefixed routes
- A `sitemap.xml` with all locale variants

### 6. Preview the production build

```bash
pnpm preview
```

Serves the production build at **[http://localhost:4173](http://localhost:4173)** for local testing before deploying.

### Other useful commands

```bash
pnpm check       # TypeScript + Svelte type checking
pnpm lint        # ESLint + Prettier check
pnpm format      # Auto-format with Prettier
```

---

## Project Structure

```
boss-site/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions: lint → type-check → build
├── src/
│   ├── app.html                # HTML shell — font preload, viewport meta
│   ├── app.css                 # Global styles, Tailwind @theme (brand colors), shared component classes
│   ├── lib/
│   │   ├── components/         # Reusable Svelte components
│   │   │   ├── NavBar.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── SEOHead.svelte  # Meta tags, OG, hreflang, JSON-LD on every page
│   │   │   ├── ChatWidget.svelte
│   │   │   ├── HeroSection.svelte
│   │   │   ├── WhatWeDoSection.svelte
│   │   │   ├── WhoWeServeSection.svelte
│   │   │   ├── WhyUBossSection.svelte
│   │   │   ├── PricingPreviewSection.svelte
│   │   │   ├── ContactCTASection.svelte
│   │   │   └── TestimonialsSection.svelte
│   │   ├── config/
│   │   │   └── pricing.ts      # Single source of truth for all pricing data (mirrors PRICING.md)
│   │   ├── i18n/
│   │   │   ├── en.json         # English translations
│   │   │   ├── es.json         # Spanish translations (Central American/Mexican register)
│   │   │   └── pt-BR.json      # Brazilian Portuguese translations
│   │   └── utils/
│   │       └── i18n.ts         # Locale validation, locale list, label map
│   └── routes/
│       ├── +layout.svelte      # Root layout — imports app.css
│       ├── +page.server.ts     # Redirects / → /en
│       ├── sitemap.xml/
│       │   └── +server.ts      # Generates sitemap.xml with all locale variants
│       └── [lang]/             # All locale-prefixed routes
│           ├── +layout.server.ts   # Loads translations for the current locale
│           ├── +layout.svelte      # Wraps pages with NavBar, Footer, ChatWidget
│           ├── +page.svelte        # Homepage (7 sections)
│           ├── about/
│           ├── services/
│           ├── pricing/
│           ├── contact/
│           ├── legal/
│           │   ├── terms/
│           │   ├── privacy/
│           │   └── key-terms/
│           ├── support/
│           └── careers/
├── static/
│   ├── assets/
│   │   ├── uboss-logo-light.png
│   │   ├── uboss-logo-dark.png
│   │   ├── pegasus-icon-modern.jpg
│   │   ├── photo-headshot.jpeg
│   │   └── legal/              # PDF downloads (ToS, Privacy Policy, Key Terms)
│   ├── favicon.ico
│   └── robots.txt
├── BRAND.md                    # Design system — colors, typography, spacing, component styles
├── CLAUDE.md                   # AI assistant instructions (architecture rules, conventions)
├── PRICING.md                  # Pricing tier definitions (single source of truth)
├── PROJECT.md                  # Business context, site map, content tone guidelines
├── SEO.md                      # Keyword targets per language and page
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── package.json
```

### Key architectural decisions

- **No text is hardcoded in components.** All strings come from `src/lib/i18n/{locale}.json`.
- **No prices are hardcoded in components.** All pricing data flows from `src/lib/config/pricing.ts`.
- **All pages are prerendered at build time** via SvelteKit's prerender + Vercel adapter. The prerender entry list lives in `svelte.config.js`.
- **Below-the-fold sections lazy-load** via `IntersectionObserver` — the hero renders instantly; pricing, testimonials, and the Cal.com embed only initialize when scrolled into view.
- **Tailwind v4 custom colors** are defined in `app.css` under `@theme` and are available as utility classes (e.g., `bg-teal`, `text-near-black`, `bg-surface-light`).

---

## Trilingual (i18n) Support

The site supports three locales with locale-prefixed URLs:

| Locale               | URL prefix   | Register                                                     |
| -------------------- | ------------ | ------------------------------------------------------------ |
| English              | `/en/...`    | Professional, approachable                                   |
| Spanish              | `/es/...`    | Central American / Mexican conversational ("tú" not "usted") |
| Brazilian Portuguese | `/pt-BR/...` | Brazilian conversational (not European Portuguese)           |

Visiting `/` redirects to `/en` automatically.

### How translations work

The `[lang]` layout server (`src/routes/[lang]/+layout.server.ts`) validates the locale parameter, dynamically imports the matching JSON file, and passes the full translation object down through SvelteKit's `data` prop. Every page and component accesses strings via this object — no string is ever hardcoded in a `.svelte` file.

### Adding or editing a translation string

1. Open `src/lib/i18n/en.json` and add or edit the key.
2. Mirror the same key in `src/lib/i18n/es.json` and `src/lib/i18n/pt-BR.json`.
3. Reference it in the component via the `t` prop passed from `data`.

**Never add a key to one locale file without adding it to all three.** Missing keys will render as `undefined` at runtime.

### Language switcher

The globe icon in the nav bar lets visitors switch locales. Switching preserves the current page path — `/en/pricing` becomes `/es/pricing`, etc.

---

## Vercel Deployment

### Connecting the GitHub repository

1. Go to [vercel.com/new](https://vercel.com/new) and sign in.
2. Click **"Import Git Repository"** and select `boss-site` from your GitHub account.
3. Vercel will auto-detect SvelteKit. Verify the following settings before deploying:

| Setting          | Value                                         |
| ---------------- | --------------------------------------------- |
| Framework Preset | **SvelteKit**                                 |
| Build Command    | `pnpm build`                                  |
| Output Directory | _(leave blank — adapter-vercel manages this)_ |
| Install Command  | `pnpm install`                                |
| Node.js Version  | **22.x**                                      |

> The adapter is already configured for `nodejs22.x` in `svelte.config.js` — no additional Vercel config is needed.

### Environment variables

The site currently runs without required secrets. If you add future integrations, set them in **Vercel → Project → Settings → Environment Variables**:

| Variable               | Description                 | Required now?            |
| ---------------------- | --------------------------- | ------------------------ |
| `PUBLIC_SITE_URL`      | `https://uboss.ai`          | No (defaults fine)       |
| `PUBLIC_CONTACT_EMAIL` | `support@uboss.ai`          | No                       |
| `PUBLIC_CAL_DISCOVERY` | `robg-uboss/discovery-call` | No                       |
| `PUBLIC_CAL_STRATEGY`  | `robg-uboss/uboss-strategy` | No                       |
| `STRIPE_SECRET_KEY`    | Stripe secret key           | No (not yet implemented) |
| `N8N_WEBHOOK_URL`      | n8n contact form endpoint   | No (not yet implemented) |

Never commit `.env` to the repository. Use `.env.example` as the reference template.

### Custom domain (uboss.ai)

1. In Vercel, go to **Project → Settings → Domains**.
2. Add `uboss.ai` and `www.uboss.ai`.
3. Vercel will provide DNS records. In your domain registrar:
   - Add an **A record** pointing `uboss.ai` → Vercel's IP (shown in dashboard).
   - Add a **CNAME record** pointing `www` → `cname.vercel-dns.com`.
4. SSL is provisioned automatically by Vercel — no action needed.
5. DNS propagation typically takes 5–30 minutes.

### How auto-deploys work

| Trigger             | Action                             |
| ------------------- | ---------------------------------- |
| Push to `main`      | Production deploy to `uboss.ai`    |
| Open a Pull Request | Preview deploy with unique URL     |
| Merge PR to `main`  | Preview URL promoted to production |

Every deploy runs `pnpm build` server-side. If the build fails, the current production deploy is preserved and the broken build is not promoted.

---

## CI/CD Pipeline

GitHub Actions runs on every push and pull request to `main`:

```
pnpm install → ESLint + Prettier check → svelte-check → vite build
```

The workflow file lives at `.github/workflows/ci.yml`. All four steps must pass for a PR to be considered mergeable.

**To run the full CI pipeline locally:**

```bash
pnpm lint     # ESLint + Prettier
pnpm check    # TypeScript + Svelte type checking
pnpm build    # Production build
```

---

## Updating Pricing

Pricing is defined in **two places that must stay in sync**:

| File                        | Purpose                                          |
| --------------------------- | ------------------------------------------------ |
| `PRICING.md`                | Human-readable source of truth — edit this first |
| `src/lib/config/pricing.ts` | TypeScript config consumed by pricing components |

### Steps to update a tier price or feature

1. Edit the JSON structure in `PRICING.md` to reflect the change.
2. Open `src/lib/config/pricing.ts` and apply the same change to the matching `tiers` array entry.
3. Update all three locale strings (`en`, `es`, `pt-BR`) if you're changing feature copy.
4. Run `pnpm build` to verify nothing is broken.
5. Commit both files together.

### Showing or hiding a tier

Set `"visible": true` or `"visible": false` on the tier object in `pricing.ts`. The `getVisibleTiers()` helper filters by this flag — the component never needs to change.

### Marking a tier as "Most Popular"

Set `"highlighted": true` on exactly one tier. Only one tier should be highlighted at a time.

### Setup fee

The setup fee note text lives in `setupFee.display_text` in `pricing.ts` (with `en`, `es`, and `pt-BR` variants). Setup fee amounts are **never shown publicly** — they are discussed during consultation.

### Enterprise tier

The Enterprise tier has `price: null` and shows a "Let's Talk" CTA linking to the contact page. It is always shown below the three public tiers.

---

## Updating SEO Keywords

`SEO.md` is the **single source of truth** for keyword targets across all three languages. It maps keywords to the pages they should appear on.

### Workflow for adding a keyword

1. Open `SEO.md` and add the keyword to the appropriate language section and table, noting which page(s) it targets.
2. Incorporate the keyword **naturally** into the relevant page:
   - Update `src/lib/i18n/{locale}.json` for the target page's `seo.{page}.title` and `seo.{page}.description` fields.
   - Weave it into heading or body copy translations if it fits naturally.
3. Run `pnpm build` to confirm nothing broke.

### Meta tag targets

| Field                | Character limit          | Rule                                    |
| -------------------- | ------------------------ | --------------------------------------- |
| `<title>`            | 50–60 chars              | Include primary keyword                 |
| `<meta description>` | 150–160 chars            | Include primary + one secondary keyword |
| OG title             | Same as `<title>`        | Auto-inherits from title                |
| OG description       | Same as meta description | Auto-inherits                           |

All SEO meta tags, Open Graph tags, Twitter cards, hreflang links, and the JSON-LD `LocalBusiness` schema are rendered by `src/lib/components/SEOHead.svelte`, which is included on every page.

### Sitemap

The sitemap is generated dynamically at `/sitemap.xml` by `src/routes/sitemap.xml/+server.ts`. It includes all 30 locale-prefixed routes with `lastmod`, `changefreq`, `priority`, and `xhtml:link` alternate entries. No manual sitemap updates are needed when adding new pages — just add the new route to the `pages` array in that file.

---

## Contributing

### Branch strategy

- `main` — production branch; protected, requires passing CI
- Feature branches — `feature/description` or `fix/description`
- Open a PR against `main`; Vercel will generate a preview URL automatically

### Before submitting a PR

```bash
pnpm format    # Auto-fix formatting
pnpm lint      # Must pass with zero errors
pnpm check     # Must pass with zero type errors
pnpm build     # Must succeed
```

### Code conventions

- **Components:** PascalCase (`HeroSection.svelte`)
- **Routes:** kebab-case (`/legal/key-terms`)
- **Svelte syntax:** Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`)
- **No hardcoded strings** in `.svelte` files — always use `src/lib/i18n/{locale}.json`
- **No hardcoded prices** in components — always reference `src/lib/config/pricing.ts`
- **No heavy dependencies** — no animation libraries, no CSS frameworks on top of Tailwind
- Comments only where the _why_ is non-obvious

### Translation PRs

If you're updating copy in any language file, update **all three** locale files (`en.json`, `es.json`, `pt-BR.json`) in the same commit. Partial translation updates that leave keys missing in one locale will cause runtime `undefined` renders.

### Secrets and credentials

Never commit `.env`, API keys, tokens, or credentials of any kind. Use `.env.example` as the template and configure real values in Vercel's environment variable settings.

---

## License

Proprietary — © 2025 UBOSS LLC. All rights reserved.
