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
	const markdownUrl = $derived(`${siteUrl}/${lang}${page ? `/${page}` : ''}.md`);
	const enUrl = $derived(page ? `${siteUrl}/en/${page}` : `${siteUrl}/en`);
	const alternates = $derived(
		alternateLocales.map((l) => ({
			hreflang: localeLangs[l],
			href: page ? `${siteUrl}/${l}/${page}` : `${siteUrl}/${l}`
		}))
	);
	const extraJsonLd = $derived(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []);

	const bookingUrl = 'https://cal.com/robg-uboss/discovery-call';

	const localBusinessJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		'@id': `${siteUrl}/#business`,
		name: 'UBOSS',
		legalName: 'UBOSS LLC',
		alternateName: 'UBOSS LLC',
		logo: `${siteUrl}/assets/uboss-logo-dark-bg.png`,
		image: `${siteUrl}/assets/uboss-logo-dark-bg.png`,
		description:
			'AI automation for local service businesses in Boston and the North Shore. Calls returned, jobs booked, reviews asked for, ads run, numbers in plain view.',
		url: siteUrl,
		telephone: '+1-339-245-1665',
		email: 'support@uboss.ai',
		founder: {
			'@type': 'Person',
			'@id': `${siteUrl}/#founder`,
			name: 'Robert Gutierrez',
			jobTitle: 'Founder',
			url: 'https://robg.dev',
			knowsLanguage: [localeLangs.en, 'es']
		},
		areaServed: [
			{ '@type': 'City', name: 'Boston' },
			{ '@type': 'AdministrativeArea', name: 'Greater Boston' }
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
		contactPoint: {
			'@type': 'ContactPoint',
			contactType: 'customer service',
			telephone: '+1-339-245-1665',
			email: 'support@uboss.ai',
			availableLanguage: ['English', 'Spanish'],
			url: bookingUrl
		},
		hasOfferCatalog: {
			'@type': 'OfferCatalog',
			name: 'Consultations',
			itemListElement: [
				{
					'@type': 'Offer',
					price: '0',
					priceCurrency: 'USD',
					itemOffered: {
						'@type': 'Service',
						name: 'Free 15-minute discovery call',
						serviceType: 'Business automation consultation',
						availableChannel: {
							'@type': 'ServiceChannel',
							name: 'Phone or video call',
							serviceUrl: bookingUrl,
							servicePhone: '+1-339-245-1665',
							availableLanguage: ['English', 'Spanish']
						}
					}
				}
			]
		},
		potentialAction: {
			'@type': 'ReserveAction',
			name: 'Book a free 15-minute discovery call',
			target: {
				'@type': 'EntryPoint',
				urlTemplate: bookingUrl,
				actionPlatform: [
					'https://schema.org/DesktopWebPlatform',
					'https://schema.org/MobileWebPlatform'
				]
			}
		},
		sameAs: [
			'https://www.google.com/maps?cid=17359999283352644362',
			'https://www.facebook.com/profile.php?id=61572034173888',
			'https://www.linkedin.com/company/uboss-ai'
		]
	};

	// Google reads the site name from the home page only, and the three locale homes are
	// duplicates of it, so each carries identical markup (per Google's site-name docs).
	const webSiteJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		'@id': `${siteUrl}/#website`,
		name: 'UBOSS',
		alternateName: ['UBOSS LLC'],
		url: `${siteUrl}/`,
		publisher: { '@id': `${siteUrl}/#business` }
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />
	<!-- Clean markdown twin of this page for agents (served by routes/md). -->
	<link rel="alternate" type="text/markdown" href={markdownUrl} />
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
	{#if !page}
		<!-- eslint-disable-next-line svelte/no-at-html-tags, no-useless-escape -->
		{@html `<script type="application/ld+json">${serializeJsonLd(webSiteJsonLd)}<\/script>`}
	{/if}
	{#each extraJsonLd as schema, i (i)}
		<!-- eslint-disable-next-line svelte/no-at-html-tags, no-useless-escape -->
		{@html `<script type="application/ld+json">${serializeJsonLd(schema)}<\/script>`}
	{/each}
</svelte:head>
