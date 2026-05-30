import { isValidLocale } from '$lib/utils/i18n.js';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async ({ params }) => {
	const { lang } = params;

	if (!isValidLocale(lang)) {
		throw redirect(307, '/en');
	}

	const translations = await import(`../../lib/i18n/${lang}.json`);

	return {
		lang,
		t: translations.default as Record<string, unknown>
	};
};
