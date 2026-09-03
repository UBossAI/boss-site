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

/** Cookie that remembers a locale the visitor deliberately chose. Read by the `/` redirect. */
export const LANG_COOKIE = 'uboss_lang';

const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // one year

/**
 * Persist an explicitly chosen locale so a return visit to `/` lands on it.
 *
 * Written from the browser because this is a preference, not a credential. It has to be a cookie
 * rather than localStorage because the `/` redirect is a server-side decision, and reading it on
 * the client would render the default locale first and then visibly jump.
 *
 * Only called on a deliberate switch — merely landing on a locale URL does not write it, so a
 * forwarded /es/ link cannot silently rewrite the recipient's preference.
 */
export function rememberLocale(locale: Locale): void {
	const secure = location.protocol === 'https:' ? '; Secure' : '';
	document.cookie = `${LANG_COOKIE}=${locale}; Path=/; Max-Age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}

/**
 * Substitute `{name}` placeholders in a translation string.
 * Unmatched placeholders are left as-is so a missing var is visible rather than silent.
 */
export function interpolate(template: string, vars: Record<string, string | number>): string {
	return template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}
