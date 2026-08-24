import { browser, dev } from '$app/environment';
import { isValidLocale, localeLangs } from '$lib/utils/i18n.js';
import { CLARITY_PROJECT_ID, GA4_MEASUREMENT_ID, PRODUCTION_HOSTNAME } from './config.js';
import type { ConversionName } from './config.js';
import { initGoogleTag, sendConversion, sendEvent, sendPageView } from './gtag.js';
import { clarityTag, initClarity } from './clarity.js';

export type { ConversionName };

/**
 * Public analytics API for the rest of the app.
 *
 * Everything below is a no-op unless we are in a real browser, on the production host,
 * outside dev mode. Components can call `trackConversion` unconditionally; deciding
 * whether anything is actually sent happens here, once.
 */

let enabled = false;
let tagsRequested = false;

function allowed(): boolean {
	if (!browser || dev) return false;
	if (new URLSearchParams(window.location.search).has('analytics')) return true;
	return window.location.hostname === PRODUCTION_HOSTNAME;
}

/**
 * Download the third-party tags. Deferred to idle time (or the visitor's first
 * interaction, whichever lands first) so gtag.js and Clarity never compete with the
 * hero render — they are ~150KB combined against a 50KB budget for our own JS.
 *
 * Events fired before this resolves are buffered by each vendor's queue, so deferring
 * costs no data.
 */
function requestTags(): void {
	if (tagsRequested) return;
	tagsRequested = true;

	initGoogleTag();
	initClarity();
}

const WAKE_EVENTS = ['pointerdown', 'keydown', 'touchstart'] as const;

function scheduleTags(): void {
	const wake = () => {
		WAKE_EVENTS.forEach((type) => window.removeEventListener(type, wake));
		requestTags();
	};

	// A visitor who clicks straight through to Cal.com may unload the page before idle
	// ever fires, taking the queued conversion with it. Interaction wins that race.
	WAKE_EVENTS.forEach((type) => window.addEventListener(type, wake, { once: true, passive: true }));

	// requestIdleCallback is still missing on older Safari.
	if (typeof window.requestIdleCallback === 'function') {
		window.requestIdleCallback(wake, { timeout: 4000 });
	} else {
		window.setTimeout(wake, 2000);
	}
}

/** Call once, from the root layout. Safe to call repeatedly. */
export function initAnalytics(): void {
	if (enabled || !allowed()) return;
	if (!GA4_MEASUREMENT_ID && !CLARITY_PROJECT_ID) return;

	enabled = true;
	scheduleTags();
}

function localeFromPath(pathname: string): string {
	const [, lang] = pathname.split('/');
	return isValidLocale(lang) ? localeLangs[lang] : 'en-US';
}

/** Report a page view. Called for the initial load and every client-side navigation. */
export function trackPageView(url: URL, title: string): void {
	const language = localeFromPath(url.pathname);

	if (!enabled) {
		if (dev) console.info('[analytics] page_view', { path: url.pathname, title, language });
		return;
	}

	sendPageView({ location: url.href, title, language });
	clarityTag('site_language', language);
}

/** Report an ordinary interaction event to GA4. */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
	if (!enabled) {
		if (dev) console.info('[analytics] event', name, params);
		return;
	}
	sendEvent(name, params);
}

/** Report a conversion to GA4 and, once configured, to Google Ads. */
export function trackConversion(name: ConversionName, params: Record<string, unknown> = {}): void {
	if (!enabled) {
		if (dev) console.info('[analytics] conversion', name, params);
		return;
	}
	sendConversion(name, params);
}
