import { error } from '@sveltejs/kit';
import TurndownService from 'turndown';
import { isValidLocale } from '$lib/utils/i18n.js';
import type { RequestHandler } from './$types.js';

const siteUrl = 'https://www.uboss.ai';

const turndown = new TurndownService({
	headingStyle: 'atx',
	bulletListMarker: '-',
	codeBlockStyle: 'fenced'
});
// Chrome and controls carry no meaning for a reader that only wants the content.
turndown.remove((node) =>
	['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG', 'BUTTON', 'FORM', 'NAV', 'IFRAME'].includes(
		node.nodeName.toUpperCase()
	)
);

function decodeEntities(text: string): string {
	return text
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'");
}

function metaContent(html: string, name: string): string {
	const tag = html.match(new RegExp(`<meta[^>]+name="${name}"[^>]*>`));
	const value = tag?.[0].match(/content="([^"]*)"/)?.[1] ?? '';
	return decodeEntities(value);
}

/**
 * Markdown twin of any HTML page. It renders the real page through SvelteKit and converts the
 * `<main>` element, so the markdown can never drift from what visitors read and every future page
 * is covered without extra work.
 */
export const GET: RequestHandler = async ({ params, fetch }) => {
	const { lang, page } = params;
	if (!isValidLocale(lang)) throw error(404, 'Not Found');

	const path = page ? `/${lang}/${page}` : `/${lang}`;
	const res = await fetch(path);
	// A redirected page (the unplugged /pricing route) has no content of its own to mirror.
	if (res.redirected || res.status === 404 || (res.status >= 300 && res.status < 400)) {
		throw error(404, 'Not Found');
	}
	if (!res.ok) throw error(502, 'Bad Gateway');

	const html = await res.text();
	const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1];
	if (!main) throw error(404, 'Not Found');

	const title = decodeEntities(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
	const description = metaContent(html, 'description');

	const absolute = main.replace(/(href|src)="\/(?!\/)/g, `$1="${siteUrl}/`);
	const body = turndown
		.turndown(absolute)
		.replace(/\n{3,}/g, '\n\n')
		.trim();

	const markdown = `# ${title}\n\n${description ? `> ${description}\n\n` : ''}Source: ${siteUrl}${path}\n\n${body}\n`;

	return new Response(markdown, {
		headers: {
			'content-type': 'text/markdown; charset=utf-8',
			// The HTML page is the canonical, indexable version; keep the twin out of search results
			// while leaving it fully readable to agents.
			'x-robots-tag': 'noindex',
			link: `<${siteUrl}${path}>; rel="canonical"`,
			'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
		}
	});
};
