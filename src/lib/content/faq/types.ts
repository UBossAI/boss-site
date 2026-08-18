import type { faqIds } from './ids.js';

export const faqCategoryIds = [
	'working-with-us',
	'systems-automation',
	'ai-assistants',
	'getting-found',
	'privacy-security'
] as const;

export type FaqCategoryId = (typeof faqCategoryIds)[number];

/** Stable, locale-independent entry id. Shared across locales so `/es/faq#faq-pricing`
 *  and `/en/faq#faq-pricing` resolve to the same question. */
export type FaqEntryId = (typeof faqIds)[number];

export interface FaqEntry {
	id: FaqEntryId;
	category: FaqCategoryId;
	question: string;
	/** One string per paragraph. Plain text only — never HTML. The JSON-LD is built by
	 *  joining this same array, so schema copy cannot drift from what's rendered. */
	answer: readonly string[];
	/** Surfaces the question in the "top questions" jump list near the top of the page. */
	featured?: boolean;
	/** Extra search terms — folded into the on-page search haystack, never rendered.
	 *  This is where consolidated keyword variants live without creating thin content. */
	keywords?: readonly string[];
}

export interface FaqCategory {
	id: FaqCategoryId;
	/** Inline SVG markup, matching the serviceCards pattern on the services page. */
	icon: string;
	/** Rendered as the full-width tile beneath the 2x2 grid. */
	wide?: boolean;
}
