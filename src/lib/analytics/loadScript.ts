/**
 * Append an async third-party script to <head>, once per URL.
 *
 * Every analytics tag on the site goes through here so the loading characteristics
 * (async, non-blocking, deduplicated) are decided in exactly one place.
 */
const requested = new Set<string>();

export function loadScript(src: string): void {
	if (requested.has(src)) return;
	requested.add(src);

	const el = document.createElement('script');
	el.async = true;
	el.src = src;
	document.head.appendChild(el);
}
