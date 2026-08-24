<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { initAnalytics, trackPageView } from '$lib/analytics/index.js';

	onMount(initAnalytics);

	// `afterNavigate` also fires for the initial load, so this single hook covers both the
	// first page view and every client-side navigation after it — which gtag.js cannot do
	// on its own, because it only auto-fires on a full document load.
	afterNavigate(async ({ to }) => {
		if (!to) return;
		// Wait for <svelte:head> to flush so document.title is the new page's title.
		await tick();
		trackPageView(to.url, document.title);
	});
</script>
