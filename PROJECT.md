# PROJECT.md

> **Location:** `boss-site/PROJECT.md`

## Company Information

- **Legal Name:** UBOSS LLC
- **Brand Name:** UBoss
- **Domain (Marketing):** uboss.ai
- **Domain (Backend Tools):** uboss.work
- **Contact Email:** support@uboss.ai
- **Location:** Greater Boston, MA
- **Founded:** 2025

## What UBOSS Does

UBOSS is an AI-as-a-Service (AIaaS) consulting agency that builds custom AI-powered automations for small and medium businesses, specializing in the trades industry (landscaping, cleaning services, contracting, plumbing, auto body, property management, caterers and food entrepreneurs, etc.).

### Value Proposition
- We automate repetitive business operations using AI
- Custom workflows tailored to each business — not one-size-fits-all
- Trilingual service: English, Spanish (Central American/Mexican), Brazilian Portuguese
- Local presence in Greater Boston — face-to-face relationships
- Trades businesses pay a one-time setup fee + monthly subscription for ongoing AI-powered automation, dashboards, and support

### Target Audience (Tenants)
- SMB owners in trades/services in the Greater Boston area
- Spanish-speaking business owners (Salvadorian, Mexican, Central American communities)
- Brazilian Portuguese-speaking business owners (Framingham, Somerville, Everett communities)
- English-speaking trades businesses
- Revenue range: $500K - $2M/year
- Pain points: manual processes, no digital presence, missed leads, no data visibility, language barriers with tech providers

### Differentiators
- Trilingual (EN/ES/PT-BR) — almost no AI agencies serve this market
- Trades-focused — we understand blue-collar operations
- Local and personal — not a faceless SaaS
- Full-stack AI infrastructure (not just reselling ChatGPT)
- One-time setup + subscription model — predictable costs for tenants

### Explicitly Out of Scope (For Now)
- **Full-service restaurants** (dine-in, kitchen operations) — heavily regulated and typically
  expect POS/online-ordering as core needs, which is out of scope below. Food-vertical marketing
  targets caterers and food entrepreneurs instead (custom orders, events, invoicing — a natural
  fit for the existing automation stack).
- **POS system installation or integration** (Toast, Square, Clover, etc.) — not offered.
- **Online ordering / delivery platform integration** (Uber Eats, Grubhub, DoorDash, etc.) — not
  offered; too much lift for the current stage.
- **Online payments are still on the roadmap** — Stripe integration is planned (see Tech Stack:
  "scaffold but do not implement yet"). Don't conflate this with the POS/delivery items above —
  Stripe payments are a "yes, later" item; POS and delivery-platform integrations are a "not
  planned" item.

## Website Purpose

The website is a **marketing and conversion tool**. Its primary job:
1. Establish credibility and premium positioning
2. Explain what UBOSS does in simple, non-technical language
3. Get visitors to book a consultation (Cal.com) or send an email
4. Support three languages natively

This is NOT a web app, dashboard, or SaaS product. It is a marketing site.

## Site Map & Page Structure

### Top Navigation Bar
[UBOSS Logo] | Home | About | Services | Pricing | Contact | [Language Switcher 🌐] | [Pay — hidden/scaffold only]

- Pay/Billing link: build the nav item but hide it (`display: none` or feature flag). Stripe integration comes later.
- Language switcher: globe icon, dropdown with EN / ES / PT-BR

### Pages

#### 1. Homepage (`/[lang]/`)
Sections in order:
1. **Hero** — Bold headline, subheadline, CTA button ("Book a Free Consultation" → Cal.com). Background: dark (`#000000` or `#1A1A1A`), logo prominent, teal accent. Must load INSTANTLY — no heavy assets.
2. **What We Do** — 3-4 cards/icons explaining services simply (Automation, AI Assistants, Dashboards & Data, Integrations). Light background `#F5F5F7`.
3. **Who We Serve** — Brief section with trades icons or illustrations. "Built for businesses like yours."
4. **Why UBOSS** — Differentiators (trilingual, local, AI-native, trades-focused).
5. **Pricing Preview** — Show 3 tiers (Starter, Professional, Business) with brief descriptions. "Contact for Enterprise" link. CTA to book consultation. Read from `PRICING.md` config.
6. **Contact / CTA** — Email link, Cal.com embed (lazy loaded), future WhatsApp/Telegram button placeholder.
7. **Testimonials** — Placeholder section (scaffold with dummy content, easy to replace later).

#### 2. About (`/[lang]/about`)
- Mission statement
- Founder story (1st generation Salvadorian-American, senior engineer background, bilingual, local to Boston)
- The UBOSS vision — making AI accessible to underserved businesses
- The Pegasus brand story — named after the workhorse server that powers everything
- Founder headshot image: `/static/assets/photo-headshot.jpeg`
- Founder name linked to personal website: "Learn more about [Robert Gutierrez] at [Robg.dev]" — open in new tab, subtle styling, not a prominent CTA

#### 3. Services (`/[lang]/services`)
- Detailed breakdown of what UBOSS offers:
  - Workflow Automation (form intake, notifications, data routing)
  - AI-Powered Assistants (WhatsApp bots, email responders — coming soon)
  - Business Dashboards & Analytics (data collection, charts, Google Looker integration)
  - Custom Integrations (connect your existing tools)
  - Digital Form Creation (Tally.so custom forms)
  - SMS/Email Notifications
- Each service: icon + short description + "Learn more in a free consultation" CTA

#### 4. Pricing (`/[lang]/pricing`)
- Full pricing page showing 3 public tiers
- Reads entirely from pricing config — zero hardcoded values
- Setup fees: "One-time setup fee based on project complexity — discussed during consultation"
- CTA: "Book a call to find your plan"
- FAQ section below pricing (common questions about what's included, what a subscription covers, etc.)

#### 5. Contact (`/[lang]/contact`)
- Contact form (name, email, phone, message, preferred language dropdown)
- Form action: initially `mailto:support@uboss.ai`, scaffold webhook endpoint for future n8n integration
- Email: support@uboss.ai (clickable)
- Phone number placeholder (add when ready)
- Cal.com embed — 2 event types: 15 min discovery, 60 min strategy session
  - 15 min discovery: https://cal.com/robg-uboss/discovery-call
  - 60 min strategy: https://cal.com/robg-uboss/uboss-strategy
- Map or "Serving Greater Boston, MA" text

#### 6. Legal (`/[lang]/legal/terms`, `/[lang]/legal/privacy`, `/[lang]/legal/key-terms`)
- Each page embeds or links to the corresponding PDF from `/static/assets/legal/`
- Option A: Embed PDF viewer inline
- Option B: Clean page with "Download PDF" button
- Go with Option B for performance — PDF embed is heavy

#### 7. Support (`/[lang]/support`)
- Simple page: "Need help? Contact us at support@uboss.ai"
- Link to contact form
- FAQ section (reuse from pricing or expand)

#### 8. Careers (`/[lang]/careers`)
- Simple page: "Interested in working with UBOSS? We're always looking for talented people."
- "Send us your info at support@uboss.ai"
- Brief description of culture / what kind of people we look for
- Scaffold for future job listings

### Footer
[UBOSS Logo] [Pegasus Icon]
Services | Pricing | About | Contact
Legal: Terms of Service | Privacy Policy | Key Terms
Support | Careers
© 2025 UBOSS LLC. All rights reserved.
Serving Greater Boston, MA
[Social icons placeholder: LinkedIn, Instagram, WhatsApp — future]


### Floating Chat Widget (Bottom Right)
- `ChatWidget.svelte` — floating action button, teal accent
- Click opens a small panel with:
  - "Chat with us coming soon! In the meantime, email us at support@uboss.ai"
  - WhatsApp icon button (link to WhatsApp placeholder or `wa.me/` link when ready)
  - Telegram icon button (placeholder)
- Architecture: component accepts `webhookUrl` prop for future Chatwoot/WABA integration
- Keep it lightweight — no external chat SDK loaded

## Content Tone

**The three languages deliberately have different jobs, not just different words for the same
message:**

- **English is the credibility anchor.** Polished, confident, reads like an established,
  legitimate company — the "posh value" register, since for many prospects this is the stepping
  stone / first-impression moment that validates the business. Still plain-language and
  pain-point-first (lead with the pain in plain, physical terms — missed calls, backed-up
  paperwork, working nights to catch up — then the fix), and still avoid jargon words like
  "workflow," "automation," "integration," "AI-powered" as the main hook in headlines/CTAs — but
  the *execution* should read credible and put-together, not folksy or overly casual. Words/openers
  that read "chill" (e.g. "So, what is UBoss, really?", "busywork") undercut this — favor phrasing
  that's plain but confident. Trades people, including those not especially comfortable with
  computers, should still understand every word without re-reading it — polished doesn't mean
  jargon-heavy.
- **Spanish and Portuguese get the warm, laid-back register.** Conversational, casual, "trusted
  colleague explaining tech to you" energy — this is where the friendly/folksy tone lives.
  - **Spanish:** Central American/Mexican register, "tú" not "usted." NOT Spain Castilian.
  - **Portuguese (BR):** Brazilian expressions and phrasing, not European Portuguese.

Founder's framing: English's job is to prove legitimacy to a skeptical or professional-context
visitor; Spanish/Portuguese's job is warmth and approachability. Don't collapse the two into one
register.

## Future Integrations (Scaffold Only — Do Not Implement)
- Stripe payment page (nav link hidden)
- n8n webhook for contact form submissions
- WhatsApp Business API chatbot (via ChatWidget)
- Telegram bot integration (via ChatWidget)
- Chatwoot unified messaging
- Testimonials CMS or manual JSON file
