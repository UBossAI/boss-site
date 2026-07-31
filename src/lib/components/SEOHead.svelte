<script lang="ts">
	import { localeLangs } from '$lib/utils/i18n.js';

	interface Props {
		title: string;
		description: string;
		lang: string;
		page?: string;
		ogImage?: string;
	}

	let { title, description, lang, page = '', ogImage = '/assets/og-image.png' }: Props = $props();

	const siteUrl = 'https://www.uboss.ai';
	const canonicalUrl = $derived(page ? `${siteUrl}/${lang}/${page}` : `${siteUrl}/${lang}`);
	const enUrl = $derived(page ? `${siteUrl}/en/${page}` : `${siteUrl}/en`);
	const esUrl = $derived(page ? `${siteUrl}/es/${page}` : `${siteUrl}/es`);
	const ptUrl = $derived(page ? `${siteUrl}/pt-BR/${page}` : `${siteUrl}/pt-BR`);

	const jsonLd = {
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
			'https://www.facebook.com/profile.php?id=61572034173888'
		]
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- hreflang -->
	<link rel="alternate" hreflang={localeLangs.en} href={enUrl} />
	<link rel="alternate" hreflang={localeLangs.es} href={esUrl} />
	<link rel="alternate" hreflang={localeLangs['pt-BR']} href={ptUrl} />
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
	<meta
		property="og:locale"
		content={lang === 'pt-BR' ? 'pt_BR' : lang === 'es' ? 'es_US' : 'en_US'}
	/>

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content="{siteUrl}{ogImage}" />

	<!-- JSON-LD: static object below, not user input; the escaped slash avoids the HTML tokenizer
	     misreading </script> mid-string as the component's own closing tag -->
	<!-- eslint-disable-next-line svelte/no-at-html-tags, no-useless-escape -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}<\/script>`}
</svelte:head>
