import type { Handle } from '@sveltejs/kit';
import { isValidLocale, localeLangs } from '$lib/utils/i18n.js';

const CANONICAL_HOST = 'www.uboss.ai';
const APEX_HOST = 'uboss.ai';

/**
 * Enforces a single canonical origin (https://www.uboss.ai) so Google Search Console
 * stops seeing the apex and www domains as separate, competing pages.
 * Scoped to the production apex host specifically — never touches localhost or
 * Vercel preview deployments (*.vercel.app), which use other hostnames.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const { hostname, protocol } = event.url;
	const needsRedirect =
		hostname === APEX_HOST || (hostname === CANONICAL_HOST && protocol !== 'https:');

	if (needsRedirect) {
		const target = new URL(event.url);
		target.hostname = CANONICAL_HOST;
		target.protocol = 'https:';
		return new Response(null, {
			status: 301,
			headers: { location: target.toString() }
		});
	}

	const [, lang] = event.url.pathname.split('/');
	const htmlLang = isValidLocale(lang) ? localeLangs[lang] : 'en';

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%sveltekit.lang%', htmlLang)
	});
};
