<script lang="ts">
	// Native <details>/<summary> rather than a button + state pair: the answer stays in the
	// DOM (and therefore indexable, and findable via Ctrl+F) while collapsed, it works with
	// JavaScript disabled, and it costs zero client JS. See the FAQ plan for the full rationale.
	interface Props {
		id: string;
		question: string;
		headingLevel?: 2 | 3;
		open?: boolean;
		hidden?: boolean;
		children: import('svelte').Snippet;
	}

	let {
		id,
		question,
		headingLevel = 3,
		open = $bindable(false),
		hidden = false,
		children
	}: Props = $props();
</script>

<details {id} {hidden} bind:open class="faq-item card overflow-hidden scroll-mt-24 md:scroll-mt-36">
	<summary
		class="flex items-center justify-between gap-4 px-5 py-4 hover:bg-surface-light transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2"
	>
		{#if headingLevel === 2}
			<h2 class="font-medium text-near-black text-base">{question}</h2>
		{:else}
			<h3 class="font-medium text-near-black text-base">{question}</h3>
		{/if}
		<svg
			class="faq-chevron w-4 h-4 text-teal flex-shrink-0 transition-transform"
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
	<div class="faq-copy px-5 pb-5 text-gray-mid space-y-3">
		{@render children()}
	</div>
</details>
