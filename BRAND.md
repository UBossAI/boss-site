# BRAND.md

> **Location:** `boss-site/BRAND.md`

## Brand Identity

- **Brand Name:** UBoss (stylized as **UBOSS** in logo)
- **Tagline ideas (pick or adapt):**
  - EN: "AI That Works As Hard As You Do"
  - ES: "Inteligencia Artificial que trabaja tan duro como tú"
  - PT-BR: "Inteligência Artificial que trabalha tão duro quanto você"
- **Brand Personality:** Premium, modern, trustworthy, approachable, technical-but-not-intimidating
- **Inspiration:** Mercedes AMG Petronas F1 aesthetic — sleek, dark, teal accents, engineered precision

## Color Palette

### Primary Colors

| Name          | Hex       | CSS Variable         | Usage                                                                     |
| ------------- | --------- | -------------------- | ------------------------------------------------------------------------- |
| Petronas Teal | `#00A19B` | `--color-teal`       | Accent on **dark** backgrounds; dividers, icons, focus rings              |
| Teal Ink      | `#007A76` | `--color-teal-ink`   | Teal **text** on light backgrounds; outline buttons; primary-button hover |
| Black         | `#000000` | `--color-black`      | Hero backgrounds, nav bar, footer, primary buttons                        |
| Near-Black    | `#1A1A1A` | `--color-near-black` | Logo text (light mode), headings, body text                               |
| White         | `#FFFFFF` | `--color-white`      | Text on dark backgrounds, button text                                     |

### Secondary Colors

| Name                 | Hex       | CSS Variable       | Usage                                      |
| -------------------- | --------- | ------------------ | ------------------------------------------ |
| Off-White (Light BG) | `#F5F5F7` | `--color-bg-light` | Page base background, light sections       |
| Alt Light BG         | `#EBEBEB` | `--color-bg-alt`   | Alternate section backgrounds for contrast |
| Dark Gray            | `#565F64` | `--color-gray`     | Secondary text, captions, muted content    |
| Silver               | `#C8CCCE` | `--color-silver`   | Borders, dividers, subtle UI elements      |

### Semantic Colors

| Name    | Hex       | Usage                  |
| ------- | --------- | ---------------------- |
| Success | `#00A19B` | Reuse teal             |
| Error   | `#DC2626` | Form validation errors |
| Warning | `#F59E0B` | Alerts if needed       |

### CSS Custom Properties (implement in `app.css` or Tailwind config)

```css
:root {
	--color-teal: #00a19b;
	--color-teal-ink: #007a76;
	--color-black: #000000;
	--color-near-black: #1a1a1a;
	--color-white: #ffffff;
	--color-bg-light: #f5f5f7;
	--color-bg-alt: #ebebeb;
	--color-gray: #565f64;
	--color-silver: #c8ccce;
}
```

## Typography

### Font Stack

- **Primary (Headings):** `Inter` or `Plus Jakarta Sans`
  — clean, modern, geometric
- **Body:** Same family, regular weight
- **Fallback:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- **Monospace (if needed):** `'JetBrains Mono', 'Fira Code', monospace`

### Font Weights

| Usage            | Weight          |
| ---------------- | --------------- |
| Hero headline    | 700 (Bold)      |
| Section headings | 600 (Semi-bold) |
| Body text        | 400 (Regular)   |
| Captions/labels  | 400 or 500      |

### Font Sizes (Desktop → Mobile)

| Element         | Desktop         | Mobile          |
| --------------- | --------------- | --------------- |
| Hero headline   | 3.5rem (56px)   | 2rem (32px)     |
| Section heading | 2.25rem (36px)  | 1.5rem (24px)   |
| Subheading      | 1.5rem (24px)   | 1.125rem (18px) |
| Body            | 1.125rem (18px) | 1rem (16px)     |
| Small/caption   | 0.875rem (14px) | 0.875rem (14px) |

### Loading Strategy

- Use Google Fonts or self-host (prefer self-host for speed)
- Preload primary font weight (400) only
- font-display: swap on all @font-face declarations
- Load bold weight asynchronously

## Logo usuage

| File                   | Location          | Usage                                          |
| ---------------------- | ----------------- | ---------------------------------------------- |
| `uboss-logo-dark.png`  | `/static/assets/` | Dark backgrounds — teal U + white BOSS         |
| `uboss-logo-light.png` | `/static/assets/` | Light backgrounds — teal U + near-black BOSS   |
| `pegasus-dark.png`     | `/static/assets/` | Favicon, brand icon, mobile nav, loading state |

### Logo Rules

- Logo in nav bar: use appropriate variant based on nav background color
- Minimum clear space: 1x height of the "U" character on all sides
- Do NOT stretch, rotate, recolor, or add effects to the logo
- Pegasus icon can be used standalone as a brand mark
- Favicon: use pegasus icon, generate multiple sizes (16, 32, 180, 192, 512)

### Logo + Pegasus Pairing

- In footer: Logo on left, Pegasus icon on right (or vice versa)
- On About page: Pegasus can be used as a decorative element

## Interaction Design

### Buttons

```css
  Default state:
    Background: #000000 (black)
    Text: #FFFFFF (white)
    Border-radius: 8px
    Padding: 12px 24px
    Font-weight: 600
    Transition: all 0.2s ease

  Hover state:
    Background: #007A76 (teal ink — #00A19B gives white text only 3.2:1)
    Text: #FFFFFF (white)
    Transform: translateY(-1px)
    Box-shadow: 0 4px 12px rgba(0, 161, 155, 0.3)

  Active/pressed:
    Background: #008A85 (darker teal)
    Transform: translateY(0)

  Focus:
    Outline: 2px solid #00A19B
    Outline-offset: 2px

```

### Links

- Default on light backgrounds: #007A76 (teal ink) with no underline
- Default on dark backgrounds: #00A19B (teal)
- Hover: underline + slight opacity change
- On dark backgrounds: #FFFFFF with teal underline on hover

### Contrast rule

Brand teal `#00A19B` is only **3.2:1 on white** and **2.9:1 on `#F5F5F7`** — both below the
WCAG 2.1 AA floor of 4.5:1 for body text. It is fully compliant on dark backgrounds (6.6:1
on black, 5.5:1 on near-black), which is where most of the brand lives.

So the rule is:

| Context                                           | Token                   | Ratio              |
| ------------------------------------------------- | ----------------------- | ------------------ |
| Teal text on black / near-black                   | `--color-teal`          | 6.6 / 5.5 — pass   |
| Teal text on white / off-white                    | `--color-teal-ink`      | 5.2 / 4.8 — pass   |
| White text on a teal fill                         | `--color-teal-ink` fill | 5.2 — pass         |
| Dividers, chevrons, focus rings, decorative icons | `--color-teal`          | non-text, 3:1 rule |
| Graphics that carry meaning (e.g. star ratings)   | `--color-teal-ink`      | must clear 3:1     |

Both tokens share the same hue (177.8°) and full saturation, so they read as the same
brand colour — the ink variant is simply darker.

### Cards

- Background: #FFFFFF
- Border: 1px solid #C8CCCE
- Border-radius: 12px
- Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06)
- Hover: shadow deepens, subtle border color change to teal
- Transition: all 0.2s ease

### Section Alternating Pattern

```
Hero:          #000000 (dark)       → white/teal text
What We Do:    #F5F5F7 (light)      → dark text
Who We Serve:  #FFFFFF (white)      → dark text
Why UBOSS:     #1A1A1A (near-black) → white/teal text
Pricing:       #F5F5F7 (light)      → dark text
Contact/CTA:   #000000 (dark)       → white/teal text
```

### Teal Accent Usage

- Horizontal rules / dividers: thin teal line
- Icon highlights: teal fill or stroke
- Active nav link indicator: teal underline or dot
- Section number badges or bullets: teal
- Subtle: keep teal as an accent, not a background color (except buttons on hover)

## Responsive Breakpoints

| Name    | Width          | Target            |
| ------- | -------------- | ----------------- |
| Mobile  | < 640px        | Phones            |
| Tablet  | 640px - 1024px | iPad, tablets     |
| Desktop | > 1024px       | Laptops, monitors |

### Mobile-First Rules

- Hamburger menu on mobile (teal accent)
- Stack all grid layouts to single column on mobile
- Hero CTA button: full width on mobile
- Pricing cards: horizontal scroll or stacked on mobile
- Touch targets: minimum 44x44px
- No hover-dependent functionality (hover enhances, doesn't gate)

### Animation Guidelines

- CSS transitions ONLY — no JS animation libraries
- Max duration: 0.3s for UI interactions
- Use prefers-reduced-motion media query to disable animations for accessibility
- Allowed: fade-in on scroll (via IntersectionObserver + CSS class toggle), button hover transitions, nav menu slide
- NOT allowed: parallax, complex scroll-triggered animations, auto-playing video, particle effects
