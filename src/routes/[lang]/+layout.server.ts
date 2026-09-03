import { isValidLocale, locales } from '$lib/utils/i18n.js';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types.js';

// Every page path that exists under [lang]/, derived at build time so this list cannot drift as
// pages are added or removed. Globbing all of src/routes and filtering by prefix, rather than
// globbing '[lang]' directly, because square brackets are a character class in glob syntax.
const pagePaths = new Set(
	Object.keys(import.meta.glob('/src/routes/**/+page.svelte'))
		.filter((file) => file.startsWith('/src/routes/[lang]/'))
		.map((file) =>
			file
				.slice('/src/routes/[lang]/'.length)
				.replace(/\+page\.svelte$/, '')
				.replace(/\/$/, '')
		)
		// Drops the locale home page (empty after stripping) and dynamic routes like [...catchall].
		.filter((path) => path && !path.includes('['))
);

export const load: LayoutServerLoad = async ({ params, url }) => {
	const { lang } = params;

	if (!isValidLocale(lang)) {
		// A first segment that is not a locale means the URL is either missing its locale prefix or
		// does not exist. Send the ones that map to a real page to their prefixed URL with a 301 so
		// link equity and bookmarks follow, and 404 the rest. Redirecting unknown URLs to the
		// homepage instead would be a soft 404 — crawlers get a 200 for a page that was never real.
		const casedLocale = locales.find((l) => l.toLowerCase() === lang.toLowerCase());
		if (casedLocale) {
			throw redirect(301, `/${casedLocale}${url.pathname.slice(lang.length + 1)}${url.search}`);
		}

		const requested = url.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
		if (pagePaths.has(requested)) {
			throw redirect(301, `/en/${requested}${url.search}`);
		}

		throw error(404, 'Not Found');
	}

	const translations = await import(`../../lib/i18n/${lang}.json`);

	return {
		lang,
		t: translations.default as Record<string, unknown>
	};
};
