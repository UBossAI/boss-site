<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		lang: string;
		t: {
			title: string;
			subtitle: string;
			industries: string[];
			cta: string;
		};
	}

	let { lang, t }: Props = $props();
	let sectionEl: HTMLElement;

	const industryIcons: Record<string, string> = {
		0: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg>`,
		1: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`,
		2: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>`,
		3: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>`,
		4: `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>`
	};

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) entry.target.classList.add('visible');
				});
			},
			{ threshold: 0.15 }
		);
		sectionEl?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	});
</script>

<section bind:this={sectionEl} class="bg-white py-20 lg:py-28" aria-labelledby="whoweserve-heading">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div class="fade-in">
				<h2 id="whoweserve-heading" class="section-heading text-near-black mb-4">{t.title}</h2>
				<div class="teal-divider mb-6"></div>
				<p class="text-gray-mid text-lg mb-8 leading-relaxed">{t.subtitle}</p>
				<a href="/{lang}/services" class="btn-primary inline-flex">{t.cta}</a>
			</div>

			<div class="fade-in" style="transition-delay: 150ms">
				<ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{#each t.industries as industry, i}
						<li class="flex items-center gap-3 p-3 rounded-lg bg-surface-light">
							<span class="text-teal flex-shrink-0">
								<!-- eslint-disable-next-line svelte/no-at-html-tags -- static hardcoded SVG constants above, not user input -->
								{@html industryIcons[i % 5] ?? industryIcons[0]}
							</span>
							<span class="text-near-black text-sm font-medium">{industry}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>
