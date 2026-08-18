<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import PricingComparisonSection from '$lib/components/PricingComparisonSection.svelte';
	import { getVisibleTiers, formatPrice, enterprise, setupFee } from '$lib/config/pricing.js';
	import type { Locale } from '$lib/utils/i18n.js';
	import type { PageData } from './$types.js';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	const t = $derived(data.t as Record<string, unknown>);
	const p = $derived(t.pricing as Record<string, unknown>);
	const f = $derived(t.faq as Record<string, unknown>);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);
	const locale = $derived(data.lang as Locale);

	const tiers = getVisibleTiers();
</script>

<SEOHead
	title={seo.pricing.title}
	description={seo.pricing.description}
	lang={data.lang}
	page="pricing"
/>

<div class="bg-surface-light">
	<section class="bg-black text-white py-20 lg:py-24">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center gap-2 mb-6">
				<span class="w-6 h-px bg-teal"></span>
				<span class="text-teal text-sm font-medium uppercase tracking-widest"
					>{p.eyebrow as string}</span
				>
			</div>
			<h1 class="hero-heading text-white mb-4">{p.title as string}</h1>
			<div class="teal-divider mb-6"></div>
			<p class="text-white/60 text-xl">{p.subtitle as string}</p>
		</div>
	</section>

	<!-- Pricing cards -->
	<section class="py-16 lg:py-20">
		<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{#each tiers as tier}
					<div
						class="relative flex flex-col rounded-2xl border p-7
						{tier.highlighted
							? 'bg-near-black border-teal shadow-[0_0_0_1px_#00A19B,0_8px_32px_rgba(0,161,155,0.2)]'
							: 'bg-white border-silver hover:border-teal/40 transition-colors'}"
					>
						{#if tier.highlighted}
							<div class="absolute -top-3.5 left-1/2 -translate-x-1/2">
								<span class="bg-teal text-white text-xs font-semibold px-3 py-1 rounded-full">
									{p.mostPopular as string}
								</span>
							</div>
						{/if}

						<h2
							class="text-lg font-semibold {tier.highlighted
								? 'text-white'
								: 'text-near-black'} mb-1"
						>
							{tier.name[locale] ?? tier.name.en}
						</h2>
						<p class="text-sm {tier.highlighted ? 'text-white/60' : 'text-gray-mid'} mb-5">
							{tier.description[locale] ?? tier.description.en}
						</p>

						<div class="mb-6">
							<span
								class="text-4xl font-bold {tier.highlighted ? 'text-white' : 'text-near-black'}"
							>
								{formatPrice(tier.price ?? 0)}
							</span>
							<span class="{tier.highlighted ? 'text-white/50' : 'text-gray-mid'} text-sm"
								>{p.monthly as string}</span
							>
						</div>

						<ul class="flex-1 space-y-2.5 mb-7">
							{#each tier.features[locale] ?? tier.features.en as feature}
								<li
									class="flex items-start gap-2.5 text-sm {tier.highlighted
										? 'text-white/80'
										: 'text-gray-mid'}"
								>
									<svg
										class="w-4 h-4 text-teal flex-shrink-0 mt-0.5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fill-rule="evenodd"
											d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
											clip-rule="evenodd"
										/>
									</svg>
									{feature}
								</li>
							{/each}
						</ul>

						<a
							href="/{data.lang}/contact"
							class="{tier.highlighted ? 'btn-primary' : 'btn-outline'} w-full text-center"
						>
							{tier.cta[locale] ?? tier.cta.en}
						</a>
					</div>
				{/each}
			</div>

			<!-- Enterprise -->
			<div
				class="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-silver bg-white mb-6"
			>
				<div>
					<h3 class="font-semibold text-near-black">
						{enterprise.name[locale] ?? enterprise.name.en}
					</h3>
					<p class="text-gray-mid text-sm">
						{enterprise.description[locale] ?? enterprise.description.en}
					</p>
				</div>
				<a href="/{data.lang}/contact" class="btn-primary flex-shrink-0">
					{enterprise.cta[locale] ?? enterprise.cta.en}
				</a>
			</div>

			<!-- Setup fee note -->
			<div class="rounded-xl bg-teal/5 border border-teal/20 p-5">
				<div class="flex items-start gap-3">
					<svg
						class="w-5 h-5 text-teal flex-shrink-0 mt-0.5"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clip-rule="evenodd"
						/>
					</svg>
					<p class="text-gray-mid text-sm">
						{setupFee.display_text[locale] ?? setupFee.display_text.en}
					</p>
				</div>
			</div>
		</div>
	</section>

	<PricingComparisonSection t={data.t as Record<string, unknown>} />

	<!-- FAQ moved to its own page — one canonical set of answers rather than two
	     competing for the same queries. Restore the link, not the accordion, if this
	     page is re-launched. -->
	<section class="bg-white py-16 lg:py-20">
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
			<h2 class="section-heading text-near-black mb-3">{f.stillStuckTitle as string}</h2>
			<div class="teal-divider mx-auto mb-6"></div>
			<div class="flex flex-col sm:flex-row gap-3 justify-center">
				<a href="/{data.lang}/faq" class="btn-outline">{f.contactCta as string}</a>
				<a href="/{data.lang}/contact" class="btn-primary">{p.cta as string}</a>
			</div>
		</div>
	</section>
</div>
