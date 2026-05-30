<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import type { PageData } from './$types.js';
	interface Props { data: PageData }
	let { data }: Props = $props();
	const t = $derived(data.t as Record<string, unknown>);
	const legal = $derived(t.legal as Record<string, Record<string, string>>);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);
</script>

<SEOHead title={seo.legalKeyTerms.title} description={seo.legalKeyTerms.description} lang={data.lang} page="legal/key-terms" />

<div class="bg-surface-light min-h-screen py-20">
	<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="mb-8">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-teal mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
				<path stroke-linecap="round" stroke-linejoin="round" d="M15 9l-6 6m0-6l6 6M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
			</svg>
			<h1 class="section-heading text-near-black mb-3">{legal.keyTerms.title}</h1>
			<div class="teal-divider mx-auto mb-6"></div>
			<p class="text-gray-mid mb-8">{legal.keyTerms.description}</p>
		</div>
		<div class="flex flex-col sm:flex-row gap-3 justify-center">
			<a
				href="/assets/legal/key-terms-summary.pdf"
				download
				class="btn-primary"
			>
				{legal.keyTerms.download}
			</a>
			<a
				href="/assets/legal/key-terms-summary.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-outline"
			>
				{legal.keyTerms.viewPdf}
			</a>
		</div>
	</div>
</div>
