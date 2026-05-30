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
	en: 'en',
	es: 'es',
	'pt-BR': 'pt-BR'
};
