import { redirect } from '@sveltejs/kit';
import { LANG_COOKIE, isValidLocale } from '$lib/utils/i18n.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = ({ cookies }) => {
	const remembered = cookies.get(LANG_COOKIE) ?? '';

	// 302 rather than 301: the destination now depends on a per-visitor cookie, and browsers and
	// CDNs cache a 301 indefinitely — which would freeze whichever locale was served first.
	throw redirect(302, isValidLocale(remembered) ? `/${remembered}` : '/en');
};
