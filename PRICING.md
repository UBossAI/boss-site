## Model: Custom Quote, Not Tiers

UBOSS operates as a general consulting agency now, not a fixed-menu SaaS. Every client gets a
different scope because every client is different — different size, different stage (some just
starting out, some established), different traffic/volume, and different combination of
requested services. There is no "one size" package to publish, so there are **no public tiers,
no published prices, and no plan names** anywhere on the site. This document replaces the old
Starter/Professional/Professional Plus tier structure entirely — that model is retired, not just
hidden.

If you're looking for the old tier JSON, it's gone from this file on purpose. `src/lib/config/
pricing.ts` still contains it in code (see **Related Code** below) but nothing on the live site
renders it.

## The Two-Part Price

Every engagement is priced the same *shape*, even though the numbers are never the same twice:

1. **Build fee — one-time.** Covers designing and building the automation/workflow/dashboard for
   that client.
2. **Ongoing fee — recurring.** Covers keeping it running: hosting, monitoring, third-party tool
   costs, and support. Site copy can call this a "subscription" or a "maintenance fee"
   interchangeably — they mean the same thing here, so use whichever reads more naturally in
   context. Don't treat them as two different pricing concepts.

Neither number is fixed or published. Both are quoted after a consultation call, once the actual
scope is understood.

## What Actually Moves the Price

These are the factors that make one client's quote different from another's — useful for FAQ/
sales copy that explains *why* pricing varies without giving a number:

- **Volume / traffic.** How much the automation has to handle (leads, messages, transactions,
  bookings) scales the ongoing fee.
- **Complexity.** How many steps, decision points, or systems the workflow touches.
- **Technology / third-party tools.** Some integrations (e.g. premium APIs, paid platforms) carry
  their own cost that gets passed through or built into the ongoing fee.
- **Business size and stage.** A business just getting started has different needs — and a
  different budget reality — than an established one with existing systems to integrate around.
- **Requested scope.** The service itself isn't fixed. What one client asks for (a lead-capture
  assistant, a full ops dashboard, a multi-channel intake system) can differ completely from the
  next — this is consulting, not a product menu.

## Contract Terms

- **No formal contract term exists right now.** Founder's informal preference is to retain a
  client for 30-60 days, but this is not enforced, written into any agreement, or something to
  promise on the site.
- **Public-facing, if a commitment claim is needed:** "No long-term contract" is accurate and
  safe to use. Do not state a specific day/month minimum (e.g. "30-day minimum") anywhere public
  — that's an internal preference, not a stated policy.

## Public-Facing Display Rules

- **No dollar figures anywhere on the site.** No tier prices, no "starting at," no ranges.
- **No plan/tier names.** Don't reintroduce "Starter," "Professional," "Business," etc. as if
  they're current — they aren't.
- **The only CTA is "Book a free consultation."** Every pricing-adjacent section's job is to
  explain the *shape* of pricing (build fee + ongoing fee, tailored to volume/complexity/tools)
  and route to a call — never to quote a number.
- The FAQ answer at `src/lib/content/faq/en.ts` ("Pricing is quoted after a consultation call,
  because the right number depends entirely on what we are solving") is already aligned with
  this and needs no change.

## What NOT To Do

- Don't add fixed prices, ranges, or "starting at $X" copy anywhere public.
- Don't reintroduce named tiers or a plan-comparison table.
- Don't promise a specific contract minimum in site copy — informal preference only, per above.
- Don't treat "subscription" and "maintenance fee" as two different products — same fee, pick the
  clearer word for the context.

## Related Code (status, not yet cleaned up)

- **`src/lib/config/pricing.ts`** — still holds the old 3-tier structure with fixed prices. Dead
  code: nothing live renders it since `/pricing` redirects before any tier data would be used.
  Needs its own decision (delete vs. keep dormant) — out of scope for this doc, flagged so it
  isn't forgotten.
- **`/pricing` route** — deliberately unplugged, 307-redirects home. No work needed here as part
  of this change.
- **`es.json` / `pt-BR.json`** — may still carry "Predictable"/"Plans"-style language left over
  from the old tier model in their own translations; not yet audited against this document.
