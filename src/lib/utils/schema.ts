import { localeLangs, type Locale } from './i18n.js';

/**
 * Serialize a value for embedding in a <script type="application/ld+json"> block.
 *
 * Escaping `<` as `\u003c` keeps the payload valid JSON while guaranteeing no literal `<`
 * ever reaches the HTML tokenizer — so a `</script>` sequence appearing inside an
 * authored string value (an FAQ answer, say) can't terminate the script element early.
 */
export function serializeJsonLd(value: unknown): string {
	return JSON.stringify(value).replace(/</g, '\\u003c');
}

interface FaqSchemaEntry {
	id: string;
	question: string;
	answer: readonly string[];
}

/**
 * Build schema.org FAQPage structured data from the same entry array the page renders,
 * so the schema text cannot drift from the visible Q&A (required by SEO.md).
 *
 * Note: Google deprecated FAQ rich results in May 2026, so this earns no Google SERP
 * treatment. It's still consumed by Bing and by the AI crawlers robots.txt allowlists.
 */
export function buildFaqPageSchema(
	entries: readonly FaqSchemaEntry[],
	canonicalUrl: string,
	lang: Locale
): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		'@id': `${canonicalUrl}#faq`,
		url: canonicalUrl,
		inLanguage: localeLangs[lang],
		mainEntity: entries.map((entry) => ({
			'@type': 'Question',
			'@id': `${canonicalUrl}#faq-${entry.id}`,
			name: entry.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: entry.answer.join('\n\n')
			}
		}))
	};
}

/** Build a BreadcrumbList (Home → current page). Breadcrumb rich results are not deprecated. */
export function buildBreadcrumbSchema(
	crumbs: readonly { name: string; url: string }[]
): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: crumbs.map((crumb, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: crumb.name,
			item: crumb.url
		}))
	};
}
