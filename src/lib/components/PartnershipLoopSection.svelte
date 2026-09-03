<script lang="ts">
	// Native <details>/<summary> rather than a button + state pair, matching AccordionItem.svelte:
	// each description stays in the DOM (and therefore indexable) while collapsed, it works with
	// JavaScript disabled, and it costs zero client JS.
	//
	// The numbered badges on the diagram are a progressive enhancement layered on top: they toggle
	// the same <details>, so with JS off the cards still open from their own headers. They are real
	// HTML buttons positioned over the SVG rather than shapes inside it, because anything inside a
	// role="img" subtree is hidden from assistive tech.
	import { onMount } from 'svelte';

	interface Phase {
		title: string;
		description: string;
	}

	interface Props {
		t: {
			title: string;
			subtitle: string;
			diagramTitle: string;
			phases: Phase[];
		};
	}

	let { t }: Props = $props();
	let sectionEl: HTMLElement;

	let openStates = $state([false, false, false, false]);

	// Marker coordinates traced from static/assets/info-diagram.svg (viewBox 0 0 160 160),
	// ordered clockwise from the upper-left lobe so the numerals line up with the card layout.
	// Converted to percentages so the badges track the markers at any rendered size.
	const markers = [
		{ x: 23.5, y: 60.4 },
		{ x: 134.9, y: 58.8 },
		{ x: 136.7, y: 99.3 },
		{ x: 23.6, y: 99.6 }
	];

	const pct = (v: number) => `${((v / 160) * 100).toFixed(3)}%`;

	// Two cards left, two right of the centered diagram on desktop — matching where the markers
	// sit. DOM order stays 01-04, so reading and focus order run clockwise while CSS Grid places
	// them visually. Collapses to a single column below lg.
	const layout = [
		{ cell: 'lg:col-start-1 lg:row-start-1', connector: 'lg:-right-8' },
		{ cell: 'lg:col-start-3 lg:row-start-1', connector: 'lg:-left-8' },
		{ cell: 'lg:col-start-3 lg:row-start-2', connector: 'lg:-left-8' },
		{ cell: 'lg:col-start-1 lg:row-start-2', connector: 'lg:-right-8' }
	];

	const numeral = (i: number) => String(i + 1).padStart(2, '0');

	function toggle(i: number) {
		openStates[i] = !openStates[i];
		if (!openStates[i]) return;
		// On mobile the diagram sits above the cards, so a badge can open a card that is off-screen.
		// block:'nearest' leaves it alone when it is already in view.
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		document.getElementById(`loop-phase-${i + 1}`)?.scrollIntoView({
			behavior: reduce ? 'auto' : 'smooth',
			block: 'nearest'
		});
	}

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

<section
	bind:this={sectionEl}
	class="bg-near-black text-white py-20 lg:py-28"
	aria-labelledby="partnership-heading"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-14 fade-in">
			<h2 id="partnership-heading" class="section-heading text-white mb-4">{t.title}</h2>
			<div class="teal-divider mx-auto mb-4"></div>
			<p class="text-white/60 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
		</div>

		<div class="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 lg:items-center">
			<div class="fade-in flex justify-center lg:col-start-2 lg:row-start-1 lg:row-span-2">
				<div class="relative w-full max-w-sm aspect-square">
					<!-- Traced from static/assets/info-diagram.svg, inlined so the colors read from the
					     design tokens instead of the vectorizer's approximated hex. Decorative: the
					     numbered badges below are the real controls. -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 160 160"
						class="w-full h-full text-teal"
						role="img"
						aria-labelledby="partnership-diagram-title"
					>
						<title id="partnership-diagram-title">{t.diagramTitle}</title>
						<defs>
							<radialGradient
								id="partnership-loop-glow"
								cx="79.85"
								cy="80"
								r="68.53"
								gradientUnits="userSpaceOnUse"
							>
								<stop offset=".4767" stop-color="var(--color-teal)" stop-opacity=".4" />
								<stop offset=".9315" stop-color="var(--color-teal)" stop-opacity="0" />
							</radialGradient>
						</defs>
						<path
							fill="url(#partnership-loop-glow)"
							d="m118 43.3c-10.7 0-17.8 3.9-25 10.6l-10.5 9.9c-1.5 1.1-3.2 3.3-5.4 0.1l-10.1-9.4c-6.7-6.2-13.9-11.2-24.9-11.2-17.1 0-35.1 13.2-35.1 36.7s16.5 37.2 35.1 37.2c11.1 0 17.8-3.9 25.8-10.7l10.4-10.9h1.7l12 10.5c6.4 5.5 13.2 11.1 25.9 11.1 22.1 0 34.8-17.8 34.8-37.3 0-19.1-17.2-36.6-34.7-36.6zm-0.2 54.2c-4.9 0-8.5-2.3-11.8-5.1l-13.1-12.4v-0.7l12.4-11.8c3.3-3 7.7-5 12.5-5 7.1 0 18 5.8 18 17.1 0.2 12.8-11.5 17.9-18 17.9zm-76.2 0.2c-7.4 0.6-18.3-6.6-17.9-17.8 0.2-9 9.5-17 17.9-17 5 0 8.9 2.4 11.6 4.8l13.1 12.4v1.1l-11.4 11.2c-3 3.1-8.1 5.3-13.3 5.3z"
						/>
						<path
							fill="currentColor"
							d="m139.4 97.6c3-4.1 7-10.9 7-17.7 0-6.6-2.5-13.4-7-19.3-0.5 1-1.4 2.1-2.7 2.5 3.5 4.2 6.3 9.6 6.3 16.8 0 6.1-2.3 11.5-5.2 15.4 1.2 0.4 2.2 1.4 2.7 2.3h-1.1z"
						/>
						<path
							fill="currentColor"
							d="m132.4 100.3c-3.5 2.3-7.8 4.5-14.3 4.5-6 0-11.6-2.2-16.6-6.9l-19.2-17.9 18.7-18.4c3.5-3.4 8.5-7.3 16.9-7.3 4.6 0 8.7 1.2 12.6 3.6 0.4-1.2 1.1-2.3 2.2-3.1-3.9-2.4-8.8-4.4-14.8-4.4-6.8 0-12.9 2.4-18.8 7.8l-19.2 19.5-18.4-18.7c-4.9-4.6-10.7-8.6-19.5-8.6-6 0-11.2 1.8-16.6 5.6 1.1 0.4 2 1.4 2.3 2.9 3.8-2.4 7.8-4.5 14.3-4.6 5.9 0 11.3 1.7 16.9 7.1l18.5 18.7-18 17.8c-3.6 3.5-9.4 6.9-17.4 6.9-5.2 0-9.7-1.4-14.1-4.5 0 1.3-0.9 2.4-2.1 3 4 2.8 9.2 5.3 16.1 5.3 7.7 0 14-2.5 19.6-7.5l18.5-18.6 18.6 18.1c4.8 4.4 10.9 8 19.5 8 7 0 12-2 16.5-5.5-1.1-0.5-1.9-1.7-2.2-2.8z"
						/>
						<path
							fill="currentColor"
							d="m19.9 62.3c-3.9 5.2-6.4 11.4-6.4 17.7 0 6.5 2.3 12.9 6.3 17.7 0.4-1 1.7-1.8 2.9-2.1-3.7-4.7-5.7-9.6-5.7-15.5 0-5.2 1.6-10.6 5.2-15.4-0.9-0.2-1.8-1.2-2.3-2.4z"
						/>
					</svg>

					{#each markers as marker, i (i)}
						<button
							type="button"
							class="loop-badge absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border font-mono text-xs sm:text-sm font-semibold transition-colors duration-200 {openStates[
								i
							]
								? 'bg-teal text-near-black border-teal'
								: 'bg-near-black text-teal border-teal/60'}"
							style="left: {pct(marker.x)}; top: {pct(marker.y)}"
							aria-expanded={openStates[i]}
							aria-controls="loop-phase-{i + 1}"
							onclick={() => toggle(i)}
						>
							<span aria-hidden="true">{numeral(i)}</span>
							<span class="sr-only">{t.phases[i]?.title}</span>
						</button>
					{/each}
				</div>
			</div>

			{#each t.phases as phase, i (phase.title)}
				<details
					id="loop-phase-{i + 1}"
					bind:open={openStates[i]}
					class="loop-item fade-in relative rounded-2xl border border-white/10 hover:border-teal/40 transition-colors duration-200 {layout[
						i
					].cell}"
					style="transition-delay: {i * 100}ms"
				>
					<span
						aria-hidden="true"
						class="hidden lg:block absolute top-1/2 h-px w-8 bg-teal/30 {layout[i].connector}"
					></span>
					<summary
						class="flex items-center gap-3 p-5 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2"
					>
						<span class="font-mono text-teal text-sm font-semibold" aria-hidden="true"
							>{numeral(i)}</span
						>
						<h3 class="font-semibold text-white text-base flex-1">{phase.title}</h3>
						<svg
							class="loop-chevron w-4 h-4 text-teal flex-shrink-0 transition-transform"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							aria-hidden="true"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</summary>
					<p class="px-5 pb-5 text-white/50 text-sm leading-relaxed">{phase.description}</p>
				</details>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Same approach as .faq-item in app.css: hide the native disclosure marker and rotate our own
	   chevron, so expand/collapse needs no JavaScript. Scoped here rather than added to app.css
	   because these cards are dark-section specific. */
	.loop-item summary {
		list-style: none;
		cursor: pointer;
	}

	.loop-item summary::-webkit-details-marker {
		display: none;
	}

	.loop-item[open] .loop-chevron {
		transform: rotate(180deg);
	}

	/* Hover/focus affordance for the diagram badges: a teal glow plus a ring rippling outward, so
	   the numerals read as controls. Interaction-triggered rather than looping, per BRAND.md's
	   "CSS transitions only, no auto-play" rule. The global prefers-reduced-motion block in
	   app.css already clamps animation-duration and iteration-count. */
	.loop-badge {
		cursor: pointer;
		box-shadow: 0 0 0 0 transparent;
		transition:
			box-shadow 0.3s ease,
			background-color 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease;
	}

	.loop-badge::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 9999px;
		border: 1px solid var(--color-teal);
		opacity: 0;
		pointer-events: none;
	}

	.loop-badge:hover,
	.loop-badge:focus-visible {
		box-shadow:
			0 0 0 3px var(--color-teal-glow),
			0 0 18px rgba(0, 161, 155, 0.55);
	}

	.loop-badge:hover::after,
	.loop-badge:focus-visible::after {
		animation: loop-badge-pulse 1.6s ease-out infinite;
	}

	@keyframes loop-badge-pulse {
		0% {
			opacity: 0.6;
			transform: scale(1);
		}
		100% {
			opacity: 0;
			transform: scale(1.9);
		}
	}
</style>
