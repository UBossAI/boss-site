<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import type { PageData } from './$types.js';
	interface Props { data: PageData }
	let { data }: Props = $props();
	const t = $derived(data.t as Record<string, unknown>);
	const legal = $derived(t.legal as Record<string, Record<string, string>>);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);
</script>

<SEOHead title={seo.legalTerms.title} description={seo.legalTerms.description} lang={data.lang} page="legal/terms" />

<div class="bg-surface-light min-h-screen py-20">
	<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="mb-8">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-teal mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
			</svg>
			<h1 class="section-heading text-near-black mb-3">{legal.terms.title}</h1>
			<div class="teal-divider mx-auto mb-6"></div>
			<p class="text-gray-mid mb-8">{legal.terms.description}</p>
		</div>
		<div class="flex flex-col sm:flex-row gap-3 justify-center">
			<a
				href="/assets/legal/full-terms-of-service.pdf"
				download
				class="btn-primary"
			>
				{legal.terms.download}
			</a>
			<a
				href="/assets/legal/full-terms-of-service.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-outline"
			>
				{legal.terms.viewPdf}
			</a>
		</div>
	</div>
</div>
