<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import type { PageData } from './$types.js';
	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	const t = $derived(data.t as Record<string, unknown>);
	const s = $derived(t.services as Record<string, unknown>);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);

	interface ServiceCard {
		key: string;
		icon: string;
	}

	const serviceCards: ServiceCard[] = [
		{
			key: 'automation',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>`
		},
		{
			key: 'assistants',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>`
		},
		{
			key: 'dashboards',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`
		},
		{
			key: 'integrations',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>`
		},
		{
			key: 'forms',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>`
		},
		{
			key: 'notifications',
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>`
		}
	];
</script>

<SEOHead
	title={seo.services.title}
	description={seo.services.description}
	lang={data.lang}
	page="services"
/>

<div class="bg-surface-light">
	<section class="bg-black text-white py-20 lg:py-24">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center gap-2 mb-6">
				<span class="w-6 h-px bg-teal"></span>
				<span class="text-teal text-sm font-medium uppercase tracking-widest">Services</span>
			</div>
			<h1 class="hero-heading text-white mb-4">{s.title as string}</h1>
			<div class="teal-divider mb-6"></div>
			<p class="text-white/60 text-xl leading-relaxed">{s.subtitle as string}</p>
		</div>
	</section>

	<section class="py-20 lg:py-28">
		<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
			{#each serviceCards as card, i}
				{@const service = s[card.key] as Record<string, unknown>}
				<div class="card p-8 {i % 2 === 1 ? 'bg-surface-alt border-surface-alt' : ''}">
					<div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
						<div>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -- static hardcoded SVG constant, not user input -->
							<div class="text-teal mb-4">{@html card.icon}</div>
							<h2 class="text-xl font-semibold text-near-black mb-3">{service.title as string}</h2>
							<p class="text-gray-mid leading-relaxed">{service.description as string}</p>
						</div>
						<div>
							<ul class="space-y-2.5 mb-6">
								{#each service.features as string[] as feature}
									<li class="flex items-center gap-2.5 text-sm text-gray-mid">
										<svg
											class="w-4 h-4 text-teal flex-shrink-0"
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
										{feature as string}
									</li>
								{/each}
							</ul>
							<a href="/{data.lang}/contact" class="btn-outline text-sm">
								{s.consultationCta as string}
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>
