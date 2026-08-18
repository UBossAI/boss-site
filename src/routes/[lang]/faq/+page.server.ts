import { faqTranslatedLocales, loadFaqEntries } from '$lib/content/faq/index.js';
import type { Locale } from '$lib/utils/i18n.js';
import type { PageServerLoad } from './$types.js';

// Deviates from the usual 2-line `await parent()` passthrough because it also resolves
// FAQ content. Loading here rather than in +page.svelte keeps every locale's content
// module out of the client bundle.
export const load: PageServerLoad = async ({ params, parent }) => {
	const parentData = await parent();
	const { entries, isFallback } = await loadFaqEntries(params.lang as Locale);
	const translatedLocales = await faqTranslatedLocales();

	return { ...parentData, faqEntries: entries, isFallback, translatedLocales };
};
