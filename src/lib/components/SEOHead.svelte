<script lang="ts">
	import { localeLangs, locales, type Locale } from '$lib/utils/i18n.js';
	import { serializeJsonLd } from '$lib/utils/schema.js';

	interface Props {
		title: string;
		description: string;
		lang: string;
		page?: string;
		ogImage?: string;
		/** Extra structured data emitted in its own script block, alongside LocalBusiness. */
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
		/** Keep the page out of search indexes while still following its links. */
		noindex?: boolean;
		/** Locales this page actually exists in. Defaults to all — narrow it when a
		    locale falls back to another language's content, so hreflang doesn't
		    advertise a URL that isn't really translated. */
		alternateLocales?: readonly Locale[];
	}

	let {
		title,
		description,
		lang,
		page = '',
		ogImage = '/assets/og-image.png',
		jsonLd,
		noindex = false,
		alternateLocales = locales
	}: Props = $props();

	const siteUrl = 'https://www.uboss.ai';
	const ogImageAlt = $derived(
		lang === 'pt-BR' ? 'Logotipo da UBOSS' : lang === 'es' ? 'Logo de UBOSS' : 'UBOSS logo'
	);
	const canonicalUrl = $derived(page ? `${siteUrl}/${lang}/${page}` : `${siteUrl}/${lang}`);
	const enUrl = $derived(page ? `${siteUrl}/en/${page}` : `${siteUrl}/en`);
	const alternates = $derived(
		alternateLocales.map((l) => ({
			hreflang: localeLangs[l],
			href: page ? `${siteUrl}/${l}/${page}` : `${siteUrl}/${l}`
		}))
	);
	const extraJsonLd = $derived(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []);

	const localBusinessJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: 'UBOSS',
		description:
			'Modern systems that help trades and small businesses in Greater Boston run more efficiently, scale confidently, and grow without extra overhead.',
		url: siteUrl,
		email: 'support@uboss.ai',
		areaServed: [
			{ '@type': 'City', name: 'Boston' },
			{ '@type': 'City', name: 'East Boston' },
			{ '@type': 'City', name: 'Lynn' },
			{ '@type': 'City', name: 'Lynnfield' },
			{ '@type': 'City', name: 'Saugus' },
			{ '@type': 'City', name: 'Swampscott' },
			{ '@type': 'City', name: 'Peabody' },
			{ '@type': 'City', name: 'Beverly' },
			{ '@type': 'City', name: 'Gloucester' },
			{ '@type': 'City', name: 'Revere' },
			{ '@type': 'City', name: 'Chelsea' },
			{ '@type': 'City', name: 'Everett' },
			{ '@type': 'City', name: 'Malden' },
			{ '@type': 'City', name: 'Reading' },
			{ '@type': 'City', name: 'Stoneham' },
			{ '@type': 'City', name: 'Wakefield' },
			{ '@type': 'City', name: 'Woburn' },
			{ '@type': 'City', name: 'North Reading' },
			{ '@type': 'City', name: 'Tewksbury' },
			{ '@type': 'City', name: 'Somerville' },
			{ '@type': 'City', name: 'Framingham' },
			{ '@type': 'City', name: 'Waltham' }
		],
		serviceArea: {
			'@type': 'GeoCircle',
			geoMidpoint: {
				'@type': 'GeoCoordinates',
				latitude: 42.3601,
				longitude: -71.0589
			},
			geoRadius: '50000'
		},
		knowsLanguage: [localeLangs.en, localeLangs.es, localeLangs['pt-BR']],
		priceRange: '$$',
		sameAs: [
			'https://www.google.com/maps?cid=17359999283352644362',
			'https://www.facebook.com/profile.php?id=61572034173888',
			'https://www.linkedin.com/company/uboss-ai'
		]
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />
	{#if noindex}
		<meta name="robots" content="noindex, follow" />
	{/if}

	<!-- hreflang -->
	{#each alternates as alt (alt.hreflang)}
		<link rel="alternate" hreflang={alt.hreflang} href={alt.href} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={enUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content="UBOSS" />
	<meta property="og:image" content="{siteUrl}{ogImage}" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:alt" content={ogImageAlt} />
	<meta
		property="og:locale"
		content={lang === 'pt-BR' ? 'pt_BR' : lang === 'es' ? 'es_US' : 'en_US'}
	/>

	<!-- Twitter Card (LinkedIn's Post Inspector and Facebook's Sharing Debugger both read the
	     Open Graph tags above directly — there is no separate linkedin: tag namespace) -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{siteUrl}{ogImage}" />
	<meta name="twitter:image:alt" content={ogImageAlt} />

	<!-- JSON-LD. serializeJsonLd escapes every `<` as \u003c, so no string value can close
	     the script element early; the escaped slash below guards the literal closing tag
	     from Svelte's own template parser. -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags, no-useless-escape -->
	{@html `<script type="application/ld+json">${serializeJsonLd(localBusinessJsonLd)}<\/script>`}
	{#each extraJsonLd as schema, i (i)}
		<!-- eslint-disable-next-line svelte/no-at-html-tags, no-useless-escape -->
		{@html `<script type="application/ld+json">${serializeJsonLd(schema)}<\/script>`}
	{/each}
</svelte:head>
