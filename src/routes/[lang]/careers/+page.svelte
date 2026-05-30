<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import type { PageData } from './$types.js';
	interface Props { data: PageData }
	let { data }: Props = $props();
	const t = $derived(data.t as Record<string, unknown>);
	const c = $derived(t.careers as Record<string, string>);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);
</script>

<SEOHead title={seo.careers.title} description={seo.careers.description} lang={data.lang} page="careers" />

<div class="bg-surface-light min-h-screen">
	<section class="bg-black text-white py-20 lg:py-24">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center gap-2 mb-6">
				<span class="w-6 h-px bg-teal"></span>
				<span class="text-teal text-sm font-medium uppercase tracking-widest">Careers</span>
			</div>
			<h1 class="hero-heading text-white mb-4">{c.title}</h1>
			<div class="teal-divider mb-6"></div>
			<p class="text-white/60 text-xl">{c.subtitle}</p>
		</div>
	</section>

	<section class="py-16 lg:py-20">
		<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
			<div>
				<p class="text-gray-mid leading-relaxed text-lg">{c.description}</p>
			</div>

			<div class="bg-near-black text-white rounded-2xl p-8">
				<h2 class="font-semibold text-white text-xl mb-4">Our Culture</h2>
				<p class="text-white/70 leading-relaxed">{c.culture}</p>
			</div>

			<div>
				<h2 class="section-heading text-near-black mb-4">{c.openingsTitle}</h2>
				<div class="card p-6 text-center">
					<p class="text-gray-mid mb-6">{c.noOpenings}</p>
					<a
						href="mailto:support@uboss.ai?subject={encodeURIComponent(c.emailSubject)}"
						class="btn-primary"
					>
						{c.emailCta}
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
