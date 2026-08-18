import type { Locale } from '$lib/utils/i18n.js';
import type { FaqEntry } from './types.js';

/**
 * Literal dynamic imports in a static map (rather than a templated path) so Vite can
 * code-split each locale properly. Called from +page.server.ts, which keeps every
 * locale's content out of the client bundle.
 */
const loaders: Record<Locale, () => Promise<{ faqEntries: readonly FaqEntry[] }>> = {
	en: () => import('./en.js'),
	es: () => import('./es.js'),
	'pt-BR': () => import('./pt-BR.js')
};

export interface LoadedFaq {
	entries: readonly FaqEntry[];
	/** The locale the entries are actually written in — differs from the requested
	 *  locale when falling back. */
	contentLocale: Locale;
	isFallback: boolean;
}

/**
 * Resolve FAQ entries for a locale, falling back to English when that locale has no
 * content yet. A fallback page must be served noindex with narrowed hreflang — English
 * answers under a translated canonical is exactly the mismatch that harms indexing.
 */
export async function loadFaqEntries(lang: Locale): Promise<LoadedFaq> {
	const mod = await loaders[lang]();
	if (mod.faqEntries.length > 0) {
		return { entries: mod.faqEntries, contentLocale: lang, isFallback: false };
	}
	const fallback = await loaders.en();
	return { entries: fallback.faqEntries, contentLocale: 'en', isFallback: true };
}

/**
 * Locales that actually have FAQ content written, in `locales` order.
 *
 * Single source of truth for both the page's hreflang set and the sitemap, so neither can
 * advertise a URL that only falls back to English. Self-corrects when a locale file is
 * filled in — no constant to remember to update.
 */
export async function faqTranslatedLocales(): Promise<Locale[]> {
	const checked = await Promise.all(
		(Object.keys(loaders) as Locale[]).map(
			async (l) => [l, (await loaders[l]()).faqEntries.length > 0] as const
		)
	);
	return checked.filter(([, hasContent]) => hasContent).map(([l]) => l);
}
