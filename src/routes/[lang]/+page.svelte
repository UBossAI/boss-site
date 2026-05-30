<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import HeroSection from '$lib/components/HeroSection.svelte';
	import WhatWeDoSection from '$lib/components/WhatWeDoSection.svelte';
	import WhoWeServeSection from '$lib/components/WhoWeServeSection.svelte';
	import WhyUBossSection from '$lib/components/WhyUBossSection.svelte';
	import PricingPreviewSection from '$lib/components/PricingPreviewSection.svelte';
	import ContactCTASection from '$lib/components/ContactCTASection.svelte';
	import TestimonialsSection from '$lib/components/TestimonialsSection.svelte';
	import type { PageData } from './$types.js';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const t = $derived(data.t as Record<string, unknown>);
	const lang = $derived(data.lang);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);
</script>

<SEOHead
	title={seo.home.title}
	description={seo.home.description}
	{lang}
/>

<HeroSection {lang} t={t.hero as Record<string, string>} />
<WhatWeDoSection t={t.whatWeDo as Parameters<typeof WhatWeDoSection>[0]['t']} />
<WhoWeServeSection {lang} t={t.whoWeServe as Parameters<typeof WhoWeServeSection>[0]['t']} />
<WhyUBossSection t={t.whyUboss as Parameters<typeof WhyUBossSection>[0]['t']} />
<PricingPreviewSection {lang} t={t.pricingPreview as Parameters<typeof PricingPreviewSection>[0]['t']} />
<ContactCTASection {lang} t={t.contact as Parameters<typeof ContactCTASection>[0]['t']} />
<TestimonialsSection t={t.testimonials as Parameters<typeof TestimonialsSection>[0]['t']} />
