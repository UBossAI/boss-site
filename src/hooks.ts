import type { Reroute } from '@sveltejs/kit';

/**
 * Serve `/{locale}/{page}.md` (and `/{locale}.md` for the home page) from the markdown endpoint
 * under routes/md. This is a reroute rather than a route directory named `about.md` so every
 * page, including future ones, gets a markdown twin without per-page files.
 */
export const reroute: Reroute = ({ url }) => {
	const match = url.pathname.match(/^\/(en|es|pt-BR)(?:\/(.+))?\.md$/);
	if (!match) return;
	const [, lang, page] = match;
	return `/md/${lang}${page ? `/${page}` : ''}`;
};
