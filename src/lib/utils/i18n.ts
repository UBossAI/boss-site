export const locales = ['en', 'es', 'pt-BR'] as const;
export type Locale = (typeof locales)[number];

export function isValidLocale(lang: string): lang is Locale {
	return (locales as readonly string[]).includes(lang);
}

export const localeLabels: Record<Locale, string> = {
	en: 'English',
	es: 'Español',
	'pt-BR': 'Português'
};

export const localeLangs: Record<Locale, string> = {
	en: 'en-US',
	es: 'es',
	'pt-BR': 'pt-BR'
};

/**
 * Substitute `{name}` placeholders in a translation string.
 * Unmatched placeholders are left as-is so a missing var is visible rather than silent.
 */
export function interpolate(template: string, vars: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}
