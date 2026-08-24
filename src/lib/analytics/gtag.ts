import {
	ADS_CONVERSION_LABELS,
	GA4_MEASUREMENT_ID,
	GOOGLE_ADS_ID,
	type ConversionName
} from './config.js';
import { loadScript } from './loadScript.js';

declare global {
	interface Window {
		dataLayer?: unknown[];
	}
}

/**
 * The gtag shim. Calls are pushed onto `dataLayer` as `arguments` objects — the exact
 * shape gtag.js expects — so anything fired before the library finishes downloading is
 * buffered and replayed once it arrives. Nothing is lost by loading the tag late.
 */
function pushToDataLayer(this: void) {
	(window.dataLayer = window.dataLayer || []).push(arguments);
}

export const gtag = pushToDataLayer as (...args: unknown[]) => void;

/** gtag.js serves one library for every Google product; GA4 and Ads share it. */
const primaryId = GA4_MEASUREMENT_ID || GOOGLE_ADS_ID;

let started = false;

export function initGoogleTag(): void {
	if (started || !primaryId) return;
	started = true;

	gtag('js', new Date());

	if (GA4_MEASUREMENT_ID) {
		// Page views are sent by hand from the router. gtag.js only auto-fires on a full
		// document load, which would miss every SvelteKit client-side navigation.
		gtag('config', GA4_MEASUREMENT_ID, { send_page_view: false });
	}

	// Adding the Ads ID here is the whole Ads integration — one extra config call on the
	// library that is already loaded. No second script, no extra request.
	if (GOOGLE_ADS_ID) {
		gtag('config', GOOGLE_ADS_ID);
	}

	loadScript(`https://www.googletagmanager.com/gtag/js?id=${primaryId}`);
}

export function sendPageView(params: { location: string; title: string; language: string }): void {
	if (!GA4_MEASUREMENT_ID) return;

	// `set` makes site_language a sticky parameter on every later event, so components
	// firing conversions never have to thread the locale through their props.
	gtag('set', { site_language: params.language });
	gtag('event', 'page_view', {
		page_location: params.location,
		page_title: params.title,
		site_language: params.language
	});
}

export function sendEvent(name: string, params: Record<string, unknown> = {}): void {
	if (!GA4_MEASUREMENT_ID) return;
	gtag('event', name, params);
}

/**
 * Report a conversion to GA4 and — once its label is configured — to Google Ads.
 *
 * This is the seam that makes Ads a config change rather than a code change: call sites
 * name the business action, and this decides which products hear about it.
 */
export function sendConversion(name: ConversionName, params: Record<string, unknown> = {}): void {
	sendEvent(name, params);

	const label = ADS_CONVERSION_LABELS[name];
	if (GOOGLE_ADS_ID && label) {
		gtag('event', 'conversion', { send_to: `${GOOGLE_ADS_ID}/${label}` });
	}
}
