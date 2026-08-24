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

<!-- WCAG 2.4.1 Bypass Blocks: keyboard users can jump the nav on every page. Visible
     only while focused. -->
<a href="#main-content" class="skip-link"
	>{(data.t as Record<string, Record<string, string>>).nav.skipToContent}</a
>

<NavBar lang={data.lang} t={data.t as Record<string, Record<string, string>>} />

<main id="main-content" tabindex="-1">
	{@render children()}
</main>

<Footer lang={data.lang} t={data.t as Record<string, Record<string, string>>} />
<ChatWidget t={data.t as Record<string, Record<string, string>>} />
