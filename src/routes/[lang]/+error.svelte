<script lang="ts">
	import { page } from '$app/state';

	const data = $derived(page.data as { lang?: string; t?: Record<string, unknown> } | undefined);
	const lang = $derived(data?.lang ?? 'en');
	const t = $derived((data?.t ?? {}) as Record<string, unknown>);
	const nf = $derived((t.notFound ?? {}) as Record<string, string>);
	const seo = $derived((t.seo ?? {}) as Record<string, Record<string, string>>);
	const homeHref = $derived(`/${lang}`);
</script>

<svelte:head>
	<title>{seo.notFound?.title ?? 'Page Not Found | UBOSS'}</title>
	<meta name="description" content={seo.notFound?.description ?? ''} />
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="bg-black text-white min-h-[70vh] flex items-center">
	<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
		<p class="text-teal font-mono text-sm tracking-widest">{page.status ?? 404}</p>
		<h1 class="hero-heading text-white mt-2 mb-4">{page.status ?? 404}</h1>
		<div class="teal-divider mx-auto mb-6"></div>
		<h2 class="section-heading text-white mb-3">{nf.heading}</h2>
		<p class="text-white/60 text-lg leading-relaxed mb-10">{nf.message}</p>
		<a href={homeHref} class="btn-primary">{nf.cta}</a>
	</div>
</section>
