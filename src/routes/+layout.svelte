<script lang="ts">
	import '../app.css';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	interface Props {
		children: import('svelte').Snippet;
	}
	let { children }: Props = $props();

	injectAnalytics({ mode: dev ? 'development' : 'production' });
</script>

{@render children()}
