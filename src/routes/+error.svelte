<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Page Not Found | UBOSS</title>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="bg-black text-white min-h-screen flex items-center">
	<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
		<p class="text-teal font-mono text-sm tracking-widest">{page.status ?? 404}</p>
		<h1 class="hero-heading text-white mt-2 mb-4">{page.status ?? 404}</h1>
		<div class="teal-divider mx-auto mb-6"></div>
		<h2 class="section-heading text-white mb-3">Looks like you're lost</h2>
		<p class="text-white/60 text-lg leading-relaxed mb-10">
			The page you're looking for doesn't exist or may have moved.
		</p>
		<a href="/en" class="btn-primary">Go to Home</a>
	</div>
</section>
