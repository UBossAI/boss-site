<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		t: {
			title: string;
			subtitle: string;
			emailLabel: string;
			email: string;
			book15Label: string;
			book15Description: string;
			book60Label: string;
			book60Description: string;
		};
	}

	let { t }: Props = $props();
	let sectionEl: HTMLElement;
	let calLoaded = $state(false);
	let calContainer: HTMLDivElement;

	onMount(() => {
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) entry.target.classList.add('visible');
				});
			},
			{ threshold: 0.1 }
		);
		sectionEl?.querySelectorAll('.fade-in').forEach((el) => io.observe(el));

		// Lazy load Cal.com embed when section enters viewport
		const calObserver = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !calLoaded) {
					calLoaded = true;
					calObserver.disconnect();
				}
			},
			{ rootMargin: '200px' }
		);
		if (calContainer) calObserver.observe(calContainer);

		return () => {
			io.disconnect();
			calObserver.disconnect();
		};
	});
</script>

<section
	bind:this={sectionEl}
	class="bg-black text-white py-20 lg:py-28"
	aria-labelledby="contact-cta-heading"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-14 fade-in">
			<h2 id="contact-cta-heading" class="section-heading text-white mb-4">{t.title}</h2>
			<div class="teal-divider mx-auto mb-4"></div>
			<p class="text-white/60 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
			<!-- Email CTA -->
			<div
				class="fade-in flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 hover:border-teal/30 transition-colors"
			>
				<div class="text-teal mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-10 h-10"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
				</div>
				<h3 class="text-white font-semibold mb-2">{t.emailLabel}</h3>
				<a href="mailto:support@uboss.ai" class="text-teal hover:underline text-lg font-medium">
					{t.email}
				</a>
			</div>

			<!-- 15 min call -->
			<div
				class="fade-in flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 hover:border-teal/30 transition-colors"
				style="transition-delay: 100ms"
			>
				<div class="text-teal mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-10 h-10"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
				</div>
				<h3 class="text-white font-semibold mb-2">{t.book15Label}</h3>
				<p class="text-white/50 text-sm mb-4">{t.book15Description}</p>
				<a
					href="https://cal.com/robg-uboss/discovery-call"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-primary text-sm"
				>
					{t.book15Label}
				</a>
			</div>

			<!-- 60 min call -->
			<div
				class="fade-in flex flex-col items-center text-center p-8 rounded-2xl border border-white/10 hover:border-teal/30 transition-colors"
				style="transition-delay: 200ms"
			>
				<div class="text-teal mb-4">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-10 h-10"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="1.5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="text-white font-semibold mb-2">{t.book60Label}</h3>
				<p class="text-white/50 text-sm mb-4">{t.book60Description}</p>
				<a
					href="https://cal.com/robg-uboss/uboss-strategy"
					target="_blank"
					rel="noopener noreferrer"
					class="btn-primary text-sm"
				>
					{t.book60Label}
				</a>
			</div>
		</div>

		<!-- Cal.com embed placeholder (lazy loaded) -->
		<div bind:this={calContainer} class="mt-16 fade-in" style="transition-delay: 300ms">
			{#if calLoaded}
				<div class="rounded-2xl overflow-hidden border border-white/10">
					<iframe
						src="https://cal.com/robg-uboss/discovery-call?embed=true"
						title="Book a discovery call"
						class="w-full"
						style="height: 600px; border: none;"
						loading="lazy"
					></iframe>
				</div>
			{:else}
				<div class="h-32 rounded-2xl border border-white/10 flex items-center justify-center">
					<a
						href="https://cal.com/robg-uboss/discovery-call"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-primary"
					>
						{t.book15Label} →
					</a>
				</div>
			{/if}
		</div>
	</div>
</section>
