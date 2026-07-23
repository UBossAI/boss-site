<script lang="ts">
	import { onMount } from 'svelte';

	interface ServiceItem {
		title: string;
		description: string;
	}

	interface Props {
		t: {
			title: string;
			subtitle: string;
			automation: ServiceItem;
			assistants: ServiceItem;
			dashboards: ServiceItem;
			digitization: ServiceItem;
		};
	}

	let { t }: Props = $props();

	let sectionEl: HTMLElement;

	const services = $derived([
		{
			key: 'automation',
			data: t.automation,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>`
		},
		{
			key: 'assistants',
			data: t.assistants,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>`
		},
		{
			key: 'dashboards',
			data: t.dashboards,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`
		},
		{
			key: 'digitization',
			data: t.digitization,
			icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13 3v5h5M9 13h6M9 17h6" /></svg>`
		}
	]);

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add('visible');
					}
				});
			},
			{ threshold: 0.15 }
		);

		sectionEl?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	});
</script>

<section
	bind:this={sectionEl}
	class="bg-surface-light py-20 lg:py-28"
	aria-labelledby="whatwedo-heading"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-14 fade-in">
			<h2 id="whatwedo-heading" class="section-heading text-near-black mb-4">{t.title}</h2>
			<div class="teal-divider mx-auto mb-4"></div>
			<p class="text-gray-mid text-lg max-w-2xl mx-auto">{t.subtitle}</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each services as service, i}
				<div class="card p-6 fade-in" style="transition-delay: {i * 100}ms">
					<div class="text-teal mb-4">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -- static hardcoded SVG constant above, not user input -->
						{@html service.icon}
					</div>
					<h3 class="font-semibold text-near-black text-lg mb-2">{service.data.title}</h3>
					<p class="text-gray-mid text-sm leading-relaxed">{service.data.description}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
