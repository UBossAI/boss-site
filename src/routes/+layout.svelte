<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import Analytics from '$lib/components/Analytics.svelte';

	interface Props {
		children: import('svelte').Snippet;
	}
	let { children }: Props = $props();

	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

<Analytics />

{@render children()}
