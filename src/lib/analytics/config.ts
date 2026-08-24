/**
 * Single source of truth for third-party analytics IDs.
 *
 * These are public, client-visible identifiers — every analytics-enabled site ships them
 * in its page source, so they are not secrets. They live here as constants rather than in
 * `$env/*` so prerendered pages get them at build time, matching how the rest of the site
 * handles public config (see `siteUrl` in SEOHead.svelte).
 *
 * To turn a tool on, paste its ID below. An empty string keeps that tool completely off:
 * no script is requested and no bytes are shipped.
 */

/** GA4 measurement ID, e.g. `G-ABC1234567`. Analytics → Admin → Data streams → Web. */
export const GA4_MEASUREMENT_ID = 'G-F4HJ47KR4T';

/** Google Ads conversion ID, e.g. `AW-123456789`. Leave empty until Ads goes live. */
export const GOOGLE_ADS_ID = '';

/** Microsoft Clarity project ID, e.g. `abcd1234ef`. clarity.microsoft.com → Settings → Setup. */
export const CLARITY_PROJECT_ID = 'y7kcnkq2k5';

/**
 * The conversion actions worth money to us. Adding one here is the only change needed to
 * start tracking it in both GA4 and Google Ads — see `trackConversion` in ./gtag.ts.
 */
export type ConversionName = 'book_discovery_call' | 'book_strategy_call' | 'contact_form_submit';

/**
 * Google Ads conversion labels, keyed by conversion action.
 *
 * Ads hands you a `send_to` value shaped like `AW-123456789/AbC-D_efGh12`; the part after
 * the slash is the label. Until a label is filled in, that conversion still lands in GA4 —
 * it just isn't reported to Ads. Ads campaigns can also import GA4 events directly, in
 * which case these can stay empty.
 */
export const ADS_CONVERSION_LABELS: Record<ConversionName, string> = {
	book_discovery_call: '',
	book_strategy_call: '',
	contact_form_submit: ''
};

/**
 * Analytics only run on the canonical production host. This keeps localhost, Vercel
 * preview deployments, and the apex redirect out of the reporting data.
 *
 * To smoke-test a preview deploy, append `?analytics=1` to the URL.
 */
export const PRODUCTION_HOSTNAME = 'www.uboss.ai';
