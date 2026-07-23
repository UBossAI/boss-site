import type { RequestHandler } from './$types.js';

const siteUrl = 'https://www.uboss.ai';
const locales = ['en', 'es', 'pt-BR'];
// Pricing route is temporarily unplugged (redirects to home) — see PROJECT.md — so it's
// excluded here to avoid indexing a page that just redirects.
const pages = [
	'',
	'about',
	'services',
	'contact',
	'support',
	'careers',
	'legal/terms',
	'legal/privacy',
	'legal/key-terms'
];

const priorities: Record<string, string> = {
	'': '1.0',
	about: '0.8',
	services: '0.9',
	contact: '0.8',
	support: '0.6',
	careers: '0.5',
	'legal/terms': '0.3',
	'legal/privacy': '0.3',
	'legal/key-terms': '0.3'
};

export const GET: RequestHandler = () => {
	const urls = pages.flatMap((page) =>
		locales.map((locale) => {
			const path = page ? `${locale}/${page}` : locale;
			const loc = `${siteUrl}/${path}`;
			const priority = priorities[page] ?? '0.5';
			const alternates = locales
				.map((l) => {
					const altPath = page ? `${l}/${page}` : l;
					return `<xhtml:link rel="alternate" hreflang="${l}" href="${siteUrl}/${altPath}"/>`;
				})
				.join('\n      ');
			const xDefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/en${page ? '/' + page : ''}"/>`;

			return `  <url>
    <loc>${loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
    ${alternates}
    ${xDefault}
  </url>`;
		})
	);

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>
${urls.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600'
		}
	});
};
