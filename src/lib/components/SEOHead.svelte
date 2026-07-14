<script lang="ts">
	interface Props {
		title: string;
		description: string;
		lang: string;
		page?: string;
		ogImage?: string;
	}

	let {
		title,
		description,
		lang,
		page = '',
		ogImage = '/assets/uboss-logo-light.png'
	}: Props = $props();

	const siteUrl = 'https://uboss.ai';
	const canonicalUrl = $derived(page ? `${siteUrl}/${lang}/${page}` : `${siteUrl}/${lang}`);
	const enUrl = $derived(page ? `${siteUrl}/en/${page}` : `${siteUrl}/en`);
	const esUrl = $derived(page ? `${siteUrl}/es/${page}` : `${siteUrl}/es`);
	const ptUrl = $derived(page ? `${siteUrl}/pt-BR/${page}` : `${siteUrl}/pt-BR`);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'LocalBusiness',
		name: 'UBOSS LLC',
		description: 'AI-as-a-Service consulting for trades and small businesses in Greater Boston',
		url: siteUrl,
		email: 'support@uboss.ai',
		areaServed: {
			'@type': 'Place',
			name: 'Greater Boston, Massachusetts'
		},
		serviceArea: {
			'@type': 'GeoCircle',
			geoMidpoint: {
				'@type': 'GeoCoordinates',
				latitude: 42.3601,
				longitude: -71.0589
			},
			geoRadius: '50000'
		},
		knowsLanguage: ['en', 'es', 'pt-BR'],
		priceRange: '$$',
		sameAs: []
	};
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- hreflang -->
	<link rel="alternate" hreflang="en" href={enUrl} />
	<link rel="alternate" hreflang="es" href={esUrl} />
	<link rel="alternate" hreflang="pt-BR" href={ptUrl} />
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
