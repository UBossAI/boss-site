<script lang="ts">
	interface Props {
		lang: string;
		t: Record<string, string>;
	}
	let { lang, t }: Props = $props();
</script>

<section
	class="relative bg-black text-white min-h-[90vh] flex items-center overflow-hidden"
	aria-label="Hero"
>
	<!-- Subtle teal gradient background -->
	<div
		class="absolute inset-0 opacity-10 pointer-events-none"
		style="background: radial-gradient(ellipse 80% 60% at 60% 50%, #00A19B 0%, transparent 70%)"
		aria-hidden="true"
	></div>

	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
		<div class="max-w-3xl">
			<!-- Eyebrow -->
			<div class="flex items-center gap-2 mb-6">
				<span class="w-6 h-px bg-teal"></span>
				<span class="text-teal text-sm font-medium uppercase tracking-widest">UBOSS</span>
			</div>

			<!-- Headline -->
			<h1 class="hero-heading text-white mb-6">
				{t.headline}
			</h1>

			<!-- Teal accent line -->
			<div class="teal-divider mb-6"></div>

			<!-- Subheadline -->
			<p class="text-white/70 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
				{t.subheadline}
			</p>

			<!-- CTAs -->
			<div class="flex flex-col sm:flex-row gap-4 items-start">
				<a
					href="/{lang}/contact"
					class="btn-primary text-base px-8 py-4 w-full sm:w-auto text-center"
				>
					{t.cta}
				</a>
				<a
					href="/{lang}/services"
					class="btn-outline text-base px-8 py-4 w-full sm:w-auto text-center border-white/30 text-white/80 hover:border-teal hover:text-white hover:bg-transparent"
				>
					{t.learnMore}
				</a>
			</div>

			<p class="text-white/40 text-sm mt-4">{t.ctaSubtext}</p>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div
		class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/30"
		aria-hidden="true"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="w-6 h-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="1.5"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
		</svg>
	</div>
</section>
