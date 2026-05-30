<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ChatWidget from '$lib/components/ChatWidget.svelte';
	import type { LayoutData } from './$types.js';

	interface Props {
		data: LayoutData;
		children: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

<NavBar lang={data.lang} t={data.t as Record<string, Record<string, string>>} />

<main id="main-content">
	{@render children()}
</main>

<Footer lang={data.lang} t={data.t as Record<string, Record<string, string>>} />
<ChatWidget t={data.t as Record<string, Record<string, string>>} />
