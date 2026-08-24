# Analytics

All third-party measurement tags live in `src/lib/analytics/`. Nothing analytics-related
belongs in `app.html` — see "Why not app.html" below.

## Files

| File                             | Job                                                                        |
| -------------------------------- | -------------------------------------------------------------------------- |
| `config.ts`                      | The only file you edit to turn a tool on or off. IDs + conversion labels.  |
| `loadScript.ts`                  | Appends an async, deduplicated `<script>`. Every tag goes through it.      |
| `gtag.ts`                        | Google tag: GA4 today, Google Ads later. They share one library.           |
| `clarity.ts`                     | Microsoft Clarity: session recordings + heatmaps.                          |
| `index.ts`                       | Public API + the enable/disable gate. Import from here, not the internals. |
| `../components/Analytics.svelte` | Mounted once in `src/routes/+layout.svelte`. Wires page views.             |

## Turning something on

Paste the ID into `src/lib/analytics/config.ts` and deploy. That is the whole procedure.

| Tool       | Constant             | Where to get the ID                             |
| ---------- | -------------------- | ----------------------------------------------- |
| GA4        | `GA4_MEASUREMENT_ID` | Analytics → Admin → Data streams → Web (`G-…`)  |
| Google Ads | `GOOGLE_ADS_ID`      | Ads → Tools → Conversions → Google tag (`AW-…`) |
| Clarity    | `CLARITY_PROJECT_ID` | clarity.microsoft.com → Settings → Setup        |

An empty string means the tool is fully off: no script requested, no bytes shipped.

### Adding Google Ads later

1. Set `GOOGLE_ADS_ID`.
2. Create the conversion actions in Ads, then paste each label into
   `ADS_CONVERSION_LABELS`. The label is the part after the slash in the `send_to` value
   Ads gives you (`AW-123456789/AbC-D_efGh12` → `AbC-D_efGh12`).

No component changes. Ads rides the gtag.js library GA4 already loaded — one extra
`config` call, no second network request. Alternatively, skip the labels entirely and
import the GA4 events into Ads as conversions.

## Tracking from a component

```ts
import { trackConversion, trackEvent } from '$lib/analytics/index.js';

trackConversion('book_discovery_call', { placement: 'hero' });
trackEvent('faq_opened', { question_id: 'pricing' });
```

`trackConversion` names a _business action_. It decides on its own whether GA4, Ads, or
both hear about it, so call sites never change when the ad stack does. New conversion
actions go in the `ConversionName` union in `config.ts`.

Currently wired: `book_discovery_call`, `book_strategy_call`, `contact_form_submit` —
in `ContactCTASection.svelte` and `[lang]/contact/+page.svelte`.

Note that `contact_form_submit` currently fires when the visitor is handed off to their
mail client, not when a message actually arrives. It measures intent, and it will
over-count until the form posts somewhere we control.

## Behaviour worth knowing

**Only runs on `www.uboss.ai`.** Localhost and Vercel previews are gated off so they
never pollute reporting. In dev, every call is logged to the console as
`[analytics] …` instead — that is how you verify wiring. To smoke-test a preview
deploy for real, append `?analytics=1`.

**Tags load at idle, not on paint.** gtag.js and Clarity are ~150KB combined against a
50KB budget for our own JS, so they are deferred to `requestIdleCallback` or the
visitor's first interaction, whichever lands first. Both vendors buffer calls in a
queue before their library arrives, so deferring loses no data. The interaction trigger
exists because a visitor who clicks straight through to Cal.com would otherwise unload
the page before idle fires, taking the queued conversion with them.

**Page views are sent manually.** GA4 is configured with `send_page_view: false` and
`Analytics.svelte` fires `page_view` from `afterNavigate`. gtag.js only auto-fires on a
full document load, which would miss every SvelteKit client-side navigation and
under-report the whole site.

**Locale is attached to everything.** Each page view sets a sticky `site_language`
param (`en-US` / `es` / `pt-BR`) and tags the Clarity session. Register `site_language`
as a custom dimension in GA4 (Admin → Custom definitions) to break any report down by
language — the main reason this site's analytics are worth having.

## Known gaps

- **Cal.com bookings are tracked as intent, not completion.** We fire on the click that
  leaves for Cal.com; a booking abandoned there still counts. True booking-completed
  conversions need Cal.com's own GA4/Ads integration in the Cal dashboard.
- **No consent banner / Consent Mode v2.** UBOSS serves Massachusetts only, so there is
  no GDPR exposure today. If that changes, the hook point is `initAnalytics()` in
  `index.ts` — gate `scheduleTags()` behind consent and add a `gtag('consent', 'default', …)`
  call before `initGoogleTag()`.
- **The privacy policy does not disclose analytics cookies.** GA4 and Clarity both set
  them, and Clarity records sessions. The policy is generated from LaTeX — edit
  `static/assets/legal/latex/privacy_policy.tex`, then rebuild
  `static/assets/legal/privacy_policy.pdf`. Two spots are now factually stale:
  - §3.2 / "Future Collection Methods" (~line 366) still lists "website analytics"
    as something UBoss _may_ implement in the future. It is live as of 2026-08-24.
  - §5 "Third-Party Subprocessors" lists Tally, Twilio, Vercel, Stripe (Future),
    Anthropic and OpenAI, but not Google (GA4) or Microsoft (Clarity).

## Why not app.html

Putting the snippets in `app.html` would fire them before first paint, blocking the hero
render and costing Lighthouse points on the site's #1 priority. It also cannot see
SvelteKit navigations, cannot be disabled in dev, and would hardcode IDs in three places
instead of one.

## Vercel Analytics

`injectAnalytics()` in `src/routes/+layout.svelte` is separate and stays. It is
cookie-free, tiny, and gives Core Web Vitals from real visitors — something GA4 does not.
It does not conflict with any of the above.
