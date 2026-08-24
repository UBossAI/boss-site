<script lang="ts">
	import { onMount } from 'svelte';

	interface Testimonial {
		name: string;
		business: string;
		quote: string;
	}

	interface Props {
		t: {
			title: string;
			subtitle: string;
			items: Testimonial[];
		};
	}

	let { t }: Props = $props();
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
	class="bg-surface-alt py-20 lg:py-28"
	aria-labelledby="testimonials-heading"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-14 fade-in">
			<h2 id="testimonials-heading" class="section-heading text-near-black mb-4">{t.title}</h2>
			<div class="teal-divider mx-auto mb-4"></div>
			<p class="text-gray-mid text-lg">{t.subtitle}</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each t.items as item, i}
				<div class="fade-in card p-7" style="transition-delay: {i * 100}ms">
					<!-- Stars -->
					<div class="flex gap-1 text-teal-ink mb-4" role="img" aria-label="5 stars">
						{#each Array(5) as _}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-4 h-4"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								/>
							</svg>
						{/each}
					</div>

					<blockquote class="text-gray-mid text-sm leading-relaxed mb-6">
						"{item.quote}"
					</blockquote>

					<div class="flex items-center gap-3">
						<div
							class="w-9 h-9 rounded-full bg-teal-ink flex items-center justify-center flex-shrink-0"
						>
							<span class="text-white font-semibold text-sm">{item.name.charAt(0)}</span>
						</div>
						<div>
							<p class="text-near-black font-semibold text-sm">{item.name}</p>
							<p class="text-gray-mid text-xs">{item.business}</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
