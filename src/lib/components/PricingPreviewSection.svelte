<script lang="ts">
	import { onMount } from 'svelte';
	import { getVisibleTiers, formatPrice, enterprise, setupFee } from '$lib/config/pricing.js';
	import type { Locale } from '$lib/utils/i18n.js';

	interface Props {
		lang: string;
		t: {
			title: string;
			subtitle: string;
			monthly: string;
			mostPopular: string;
			cta: string;
			setupFeeNote: string;
			enterprise: { title: string; description: string; cta: string };
			viewFullPricing: string;
		};
	}

	let { lang, t }: Props = $props();
	let sectionEl: HTMLElement;

	const tiers = getVisibleTiers();
	const locale = $derived(lang as Locale);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) entry.target.classList.add('visible');
				});
			},
			{ threshold: 0.1 }
		);
		sectionEl?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<section bind:this={sectionEl} class="bg-surface-light py-20 lg:py-28" aria-labelledby="pricing-preview-heading">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-14 fade-in">
			<h2 id="pricing-preview-heading" class="section-heading text-near-black mb-4">{t.title}</h2>
			<div class="teal-divider mx-auto mb-4"></div>
			<p class="text-gray-mid text-lg max-w-2xl mx-auto">{t.subtitle}</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
			{#each tiers as tier, i}
				<div
					class="fade-in relative flex flex-col rounded-2xl border p-7 transition-all duration-200
					{tier.highlighted
						? 'bg-near-black border-teal shadow-[0_0_0_1px_#00A19B,0_8px_32px_rgba(0,161,155,0.2)]'
						: 'bg-white border-silver hover:border-teal/40'}"
					style="transition-delay: {i * 100}ms"
				>
					{#if tier.highlighted}
						<div class="absolute -top-3.5 left-1/2 -translate-x-1/2">
							<span class="bg-teal text-white text-xs font-semibold px-3 py-1 rounded-full">{t.mostPopular}</span>
						</div>
					{/if}

					<div class="mb-6">
						<h3 class="text-lg font-semibold {tier.highlighted ? 'text-white' : 'text-near-black'} mb-1">
							{tier.name[locale] ?? tier.name.en}
						</h3>
						<p class="text-sm {tier.highlighted ? 'text-white/60' : 'text-gray-mid'}">
							{tier.description[locale] ?? tier.description.en}
						</p>
					</div>

					<div class="mb-6">
						<span class="text-4xl font-bold {tier.highlighted ? 'text-white' : 'text-near-black'}">
							{formatPrice(tier.price ?? 0)}
						</span>
						<span class="{tier.highlighted ? 'text-white/50' : 'text-gray-mid'} text-sm">{t.monthly}</span>
					</div>

					<ul class="flex-1 space-y-2.5 mb-7">
						{#each (tier.features[locale] ?? tier.features.en) as feature}
							<li class="flex items-start gap-2.5 text-sm {tier.highlighted ? 'text-white/80' : 'text-gray-mid'}">
								<svg class="w-4 h-4 text-teal flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
									<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
								</svg>
								{feature}
							</li>
						{/each}
					</ul>

					<a
						href="/{lang}/contact"
						class="{tier.highlighted ? 'btn-primary' : 'btn-outline'} w-full text-center"
					>
						{tier.cta[locale] ?? tier.cta.en}
					</a>
				</div>
			{/each}
		</div>

		<!-- Enterprise row -->
		<div class="fade-in flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-silver bg-white mb-8">
			<div>
				<h3 class="font-semibold text-near-black">{enterprise.name[locale] ?? enterprise.name.en}</h3>
				<p class="text-gray-mid text-sm">{enterprise.description[locale] ?? enterprise.description.en}</p>
			</div>
			<a href="/{lang}/contact" class="btn-primary flex-shrink-0">
				{enterprise.cta[locale] ?? enterprise.cta.en}
			</a>
		</div>

		<!-- Setup fee note -->
		<p class="text-center text-gray-mid text-sm mb-8">
			{setupFee.display_text[locale] ?? setupFee.display_text.en}
		</p>

		<div class="text-center fade-in">
			<a href="/{lang}/pricing" class="text-teal hover:underline text-sm font-medium">
				{t.viewFullPricing} →
			</a>
		</div>
	</div>
</section>
