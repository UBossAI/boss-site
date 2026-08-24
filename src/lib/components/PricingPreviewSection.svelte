<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		lang: string;
		t: {
			title: string;
			subtitle: string;
			freeConsult: string;
			cta: string;
		};
	}

	let { lang, t }: Props = $props();
	let sectionEl: HTMLElement;

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

<section
	bind:this={sectionEl}
	class="bg-surface-light py-20 lg:py-28"
	aria-labelledby="pricing-preview-heading"
>
	<div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="fade-in">
			<h2 id="pricing-preview-heading" class="section-heading text-near-black mb-4">{t.title}</h2>
			<div class="teal-divider mx-auto mb-4"></div>
			<p class="text-gray-mid text-lg max-w-2xl mx-auto mb-6">{t.subtitle}</p>

			<span
				class="inline-block bg-white text-teal-ink text-sm font-semibold px-4 py-1.5 rounded-full mb-8"
			>
				{t.freeConsult}
			</span>

			<div>
				<a href="/{lang}/contact" class="btn-primary inline-block">
					{t.cta}
				</a>
			</div>
		</div>
	</div>
</section>
