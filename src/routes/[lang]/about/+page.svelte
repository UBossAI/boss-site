<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import type { PageData } from './$types.js';
	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	const t = $derived(data.t as Record<string, unknown>);
	const a = $derived(t.about as Record<string, string>);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);
</script>

<SEOHead
	title={seo.about.title}
	description={seo.about.description}
	lang={data.lang}
	page="about"
/>

<div class="bg-surface-light min-h-screen">
	<!-- Hero -->
	<section class="bg-black text-white py-20 lg:py-28">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center gap-2 mb-6">
				<span class="w-6 h-px bg-teal"></span>
				<span class="text-teal text-sm font-medium uppercase tracking-widest">UBOSS</span>
			</div>
			<h1 class="hero-heading text-white mb-4">{a.title}</h1>
			<div class="teal-divider mb-6"></div>
			<p class="text-white/60 text-xl leading-relaxed">{a.subtitle}</p>
		</div>
	</section>

	<!-- Founder section -->
	<section class="py-20 lg:py-28">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
				<div>
					<h2 class="section-heading text-near-black mb-3">{a.founderLabel}</h2>
					<div class="teal-divider mb-6"></div>
					<p class="text-gray-mid leading-relaxed mb-4">{a.founderStory}</p>
					<p class="text-gray-mid leading-relaxed mb-4">{a.founderStory2}</p>
					<p class="mt-4 text-sm text-gray-mid/70">
						<a
							href={a.founderSiteUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="text-teal-ink hover:underline">{a.founderSiteText}</a
						>
					</p>
				</div>
				<div class="relative">
					<picture>
						<img
							src="/assets/photo-headshot.jpeg"
							alt={a.imageAlt}
							class="w-full max-w-xs mx-auto rounded-2xl object-cover shadow-xl"
							width="400"
							height="480"
							loading="lazy"
						/>
					</picture>
					<div
						class="absolute -bottom-4 -right-4 w-full max-w-xs mx-auto h-full max-h-[480px] rounded-2xl border-2 border-teal/30 -z-10"
					></div>
				</div>
			</div>

			<div class="space-y-12">
				<div class="bg-near-black text-white rounded-2xl p-8">
					<h2 class="section-heading text-white mb-3">{a.visionLabel}</h2>
					<div class="teal-divider mb-6"></div>
					<p class="text-white/70 leading-relaxed text-lg mb-4">{a.vision}</p>
					<p class="text-white/70 leading-relaxed text-lg">{a.vision2}</p>
				</div>

				<div>
					<h2 class="section-heading text-near-black mb-3">{a.pegasusLabel}</h2>
					<div class="teal-divider mb-6"></div>
					<div class="flex items-start gap-6">
						<img
							src="/assets/pegasus-icon-modern.jpg"
							alt=""
							class="w-16 h-16 object-contain flex-shrink-0 opacity-80"
							loading="lazy"
							aria-hidden="true"
						/>
						<p class="text-gray-mid leading-relaxed">{a.pegasusStory}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>
