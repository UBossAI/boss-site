<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import type { PageData } from './$types.js';
	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	const t = $derived(data.t as Record<string, unknown>);
	const s = $derived(t.support as Record<string, string>);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);
</script>

<SEOHead
	title={seo.support.title}
	description={seo.support.description}
	lang={data.lang}
	page="support"
/>

<div class="bg-surface-light min-h-screen">
	<section class="bg-black text-white py-20 lg:py-24">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<h1 class="hero-heading text-white mb-4">{s.title}</h1>
			<div class="teal-divider mb-6"></div>
			<p class="text-white/60 text-xl">{s.subtitle}</p>
		</div>
	</section>

	<section class="py-16 lg:py-20">
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="card p-8 mb-10 text-center">
				<p class="text-gray-mid mb-5">{s.description}</p>
				<div class="flex flex-col sm:flex-row gap-3 justify-center">
					<a href="mailto:support@uboss.ai" class="btn-primary">{s.emailLabel}: {s.email}</a>
					<a href="/{data.lang}/contact" class="btn-outline">{s.contactLink}</a>
				</div>
			</div>

			<div class="card p-8 text-center">
				<h2 class="section-heading text-near-black mb-3">{s.faqLinkTitle}</h2>
				<div class="teal-divider mx-auto mb-4"></div>
				<p class="text-gray-mid mb-6">{s.faqLinkBody}</p>
				<a href="/{data.lang}/faq" class="btn-outline">{s.faqLinkCta}</a>
			</div>
		</div>
	</section>
</div>
