<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import type { PageData } from './$types.js';
	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	const t = $derived(data.t as Record<string, unknown>);
	const legal = $derived(t.legal as Record<string, Record<string, string>>);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);
</script>

<SEOHead
	title={seo.legalPrivacy.title}
	description={seo.legalPrivacy.description}
	lang={data.lang}
	page="legal/privacy"
/>

<div class="bg-surface-light min-h-screen py-20">
	<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="mb-8">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-12 h-12 text-teal mx-auto mb-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="1.5"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
				/>
			</svg>
			<h1 class="section-heading text-near-black mb-3">{legal.privacy.title}</h1>
			<div class="teal-divider mx-auto mb-6"></div>
			<p class="text-gray-mid mb-8">{legal.privacy.description}</p>
		</div>
		<div class="flex flex-col sm:flex-row gap-3 justify-center">
			<a href="/assets/legal/privacy_policy.pdf" download class="btn-primary">
				{legal.privacy.download}
			</a>
			<a
				href="/assets/legal/privacy_policy.pdf"
				target="_blank"
				rel="noopener noreferrer"
				class="btn-outline"
			>
				{legal.privacy.viewPdf}
			</a>
		</div>
	</div>
</div>
