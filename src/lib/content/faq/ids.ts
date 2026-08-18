/**
 * Canonical registry of FAQ entry ids.
 *
 * Every locale file is typed against this list, so a typo or a question that exists in one
 * language but not another fails `pnpm check` instead of silently producing a broken anchor.
 * Ids are also the DOM anchor targets (`#faq-<id>`), so renaming one breaks shared links —
 * treat them as permanent once shipped.
 */
export const faqIds = [
	// Working with us
	'what-is-uboss',
	'consultation-call',
	'pricing',
	'contract-commitment',
	'setup-timeline',
	'start-small',
	'outside-trades',
	'language-support',
	'crm-different',
	// Systems & automation
	'automate-my-business',
	'existing-tools',
	'dashboards',
	'business-metrics',
	'estimates-invoices',
	'customer-notifications',
	// AI assistants
	'automation-vs-ai',
	'replace-employees',
	'always-on',
	'model-outage',
	'where-ai-helps',
	// Getting found online
	'ai-search-visibility',
	'google-ranking',
	'social-media',
	'customer-reviews',
	// Privacy & security
	'data-storage',
	'pii-and-ai',
	'security-practices',
	'sensitive-records',
	'website-legal-pages'
] as const;
