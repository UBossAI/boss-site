<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import type { PageData } from './$types.js';
	interface FaqItem {
		question: string;
		answer: string;
	}
	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	const t = $derived(data.t as Record<string, unknown>);
	const s = $derived(t.support as Record<string, string>);
	const p = $derived(t.pricing as Record<string, unknown>);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);
	const faqItems = $derived((p.faq as FaqItem[]) ?? []);
	let openFaq = $state<number | null>(null);
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

			<h2 class="section-heading text-near-black mb-3">{s.faqTitle}</h2>
			<div class="teal-divider mb-8"></div>

			<div class="space-y-3">
				{#each faqItems as item, i}
					<div class="border border-silver rounded-xl overflow-hidden">
						<button
							onclick={() => (openFaq = openFaq === i ? null : i)}
							aria-expanded={openFaq === i}
							class="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface-light transition-colors"
						>
							<span class="font-medium text-near-black text-sm pr-4">{item.question}</span>
							<svg
								class="w-4 h-4 text-teal flex-shrink-0 transition-transform {openFaq === i
									? 'rotate-180'
									: ''}"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</button>
						{#if openFaq === i}
							<div class="px-5 pb-4 text-gray-mid text-sm leading-relaxed">{item.answer}</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>
</div>
