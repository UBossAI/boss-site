<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import AccordionItem from '$lib/components/AccordionItem.svelte';
	import { faqCategories } from '$lib/content/faq/categories.js';
	import type { FaqCategoryId, FaqEntry } from '$lib/content/faq/types.js';
	import { interpolate, type Locale } from '$lib/utils/i18n.js';
	import { buildBreadcrumbSchema, buildFaqPageSchema } from '$lib/utils/schema.js';
	import { tick } from 'svelte';
	import type { PageData } from './$types.js';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();

	const t = $derived(data.t as Record<string, unknown>);
	const f = $derived(t.faq as Record<string, unknown>);
	const nav = $derived(t.nav as Record<string, string>);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);
	const categoryCopy = $derived(f.categories as Record<FaqCategoryId, Record<string, string>>);
	const entries = $derived(data.faqEntries as FaqEntry[]);

	const siteUrl = 'https://www.uboss.ai';
	const canonicalUrl = $derived(`${siteUrl}/${data.lang}/faq`);

	// Schema is built from the same array the template renders, so its text cannot drift
	// from the visible Q&A. Skipped on the fallback page so English FAQ markup never
	// attaches to a translated URL.
	const faqSchema = $derived(
		data.isFallback ? undefined : buildFaqPageSchema(entries, canonicalUrl, data.lang as Locale)
	);
	const breadcrumbSchema = $derived(
		buildBreadcrumbSchema([
			{ name: nav.home, url: `${siteUrl}/${data.lang}` },
			{ name: nav.faq, url: canonicalUrl }
		])
	);
	const schemas = $derived(faqSchema ? [faqSchema, breadcrumbSchema] : [breadcrumbSchema]);

	// ─── Search + category filtering ──────────────────────────────────────────
	// Everything below is progressive enhancement: the server renders every entry
	// unfiltered, and filtering only ever toggles the `hidden` attribute. With JS off
	// the full list stays readable and the tiles act as plain anchor links.
	let query = $state('');
	let activeCategory = $state<FaqCategoryId | 'all'>('all');

	function normalize(value: string): string {
		return value
			.toLowerCase()
			.normalize('NFD')
			.replace(/\p{Diacritic}/gu, '');
	}

	const haystacks = $derived(
		new Map(
			entries.map((e) => [
				e.id,
				normalize([e.question, ...e.answer, ...(e.keywords ?? [])].join(' '))
			])
		)
	);
	const tokens = $derived(normalize(query).split(/\s+/).filter(Boolean));

	function matches(entry: FaqEntry): boolean {
		if (activeCategory !== 'all' && entry.category !== activeCategory) return false;
		const hay = haystacks.get(entry.id) ?? '';
		return tokens.every((token) => hay.includes(token));
	}

	const visibleIds = $derived(new Set(entries.filter(matches).map((e) => e.id)));
	const isFiltered = $derived(tokens.length > 0 || activeCategory !== 'all');
	const featured = $derived(entries.filter((e) => e.featured).slice(0, 10));

	function entriesIn(category: FaqCategoryId): FaqEntry[] {
		return entries.filter((e) => e.category === category);
	}

	function visibleCountIn(category: FaqCategoryId): number {
		return entriesIn(category).filter((e) => visibleIds.has(e.id)).length;
	}

	async function selectCategory(event: MouseEvent, id: FaqCategoryId) {
		event.preventDefault();
		const next = activeCategory === id ? 'all' : id;
		activeCategory = next;
		// replaceState, not pushState — Back should leave the page, not rewind filter taps.
		history.replaceState(null, '', next === 'all' ? '#faq-all' : `#faq-cat-${next}`);

		// Clearing the filter grows the page back; leave the reader where they are.
		if (next === 'all') return;

		// Must wait for the DOM to reflect the filter. Svelte flushes updates asynchronously,
		// so scrolling immediately measures the *unfiltered* layout — then the hidden entries
		// collapse, the page shrinks underneath, and the viewport lands near the footer.
		await tick();
		document.getElementById(`faq-cat-${next}`)?.scrollIntoView({ block: 'start' });
	}

	function onSearchKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') query = '';
	}

	// location is undefined during SSR, so hash restoration must live in an effect.
	$effect(() => {
		const hash = location.hash.replace(/^#/, '');
		if (!hash.startsWith('faq-cat-')) return;
		const id = hash.slice('faq-cat-'.length) as FaqCategoryId;
		if (!faqCategories.some((c) => c.id === id)) return;
		activeCategory = id;
		// The browser already jumped to this anchor before hydration; re-anchor after the
		// filter applies, for the same reason as selectCategory above.
		tick().then(() => document.getElementById(`faq-cat-${id}`)?.scrollIntoView({ block: 'start' }));
	});
</script>

<SEOHead
	title={seo.faq.title}
	description={seo.faq.description}
	lang={data.lang}
	page="faq"
	noindex={data.isFallback}
	alternateLocales={data.translatedLocales}
	jsonLd={schemas}
/>

<div class="bg-surface-light min-h-screen">
	<section class="bg-black text-white py-16 lg:py-24">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center gap-2 mb-6">
				<span class="w-6 h-px bg-teal"></span>
				<span class="text-teal text-sm font-medium uppercase tracking-widest"
					>{f.eyebrow as string}</span
				>
			</div>
			<h1 class="hero-heading text-white mb-4">{f.title as string}</h1>
			<div class="teal-divider mb-6"></div>
			<p class="text-white/60 text-xl leading-relaxed">{f.subtitle as string}</p>
		</div>
	</section>

	<section class="py-12 lg:py-16">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			{#if data.isFallback}
				<p
					class="mb-8 rounded-xl border border-teal/30 bg-teal/5 px-5 py-4 text-sm text-gray-mid leading-relaxed"
				>
					{f.translationNotice as string}
				</p>
			{/if}

			<!-- Search -->
			<search class="block mb-8">
				<label for="faq-search" class="block text-sm font-medium text-near-black mb-2">
					{f.searchLabel as string}
				</label>
				<div class="relative">
					<input
						id="faq-search"
						type="search"
						bind:value={query}
						onkeydown={onSearchKeydown}
						autocomplete="off"
						enterkeyhint="search"
						placeholder={f.searchPlaceholder as string}
						class="w-full rounded-xl border border-silver bg-white px-4 py-3 pr-10 text-near-black placeholder:text-gray-mid/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-1"
					/>
					{#if query}
						<button
							type="button"
							onclick={() => (query = '')}
							aria-label={f.clearSearch as string}
							class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-mid hover:text-teal transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-4 h-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								aria-hidden="true"
							>
								<line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>
					{/if}
				</div>
			</search>

			<!-- Category tiles: 2x2 grid with the last spanning full width -->
			<nav
				aria-label={f.categoriesNavLabel as string}
				class="grid grid-cols-1 sm:grid-cols-2 gap-4"
			>
				{#each faqCategories as category (category.id)}
					<a
						href="#faq-cat-{category.id}"
						onclick={(e) => selectCategory(e, category.id)}
						aria-current={activeCategory === category.id ? 'true' : undefined}
						class="card flex items-start gap-4 p-5 min-h-[104px] transition-colors {category.wide
							? 'sm:col-span-2 sm:items-center sm:justify-center'
							: ''} {activeCategory === category.id
							? 'border-teal ring-1 ring-teal'
							: ''} focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2"
					>
						<span class="text-teal flex-shrink-0 mt-0.5" aria-hidden="true">
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							{@html category.icon}
						</span>
						<span>
							<span class="block font-semibold text-near-black"
								>{categoryCopy[category.id].label}</span
							>
							<span class="block text-sm text-gray-mid mt-1"
								>{categoryCopy[category.id].description}</span
							>
						</span>
					</a>
				{/each}
			</nav>

			{#if isFiltered}
				<div class="mt-6">
					<button
						type="button"
						onclick={() => {
							activeCategory = 'all';
							query = '';
						}}
						class="btn-outline text-sm">{f.clearFilter as string}</button
					>
				</div>
			{/if}

			<!-- Most asked: a jump list, not a second copy of the accordions, so no answer
			     or DOM id is ever duplicated. -->
			<div id="faq-top" hidden={isFiltered} class="mt-12">
				<h2 class="section-heading text-near-black mb-3">{f.topQuestionsTitle as string}</h2>
				<div class="teal-divider mb-6"></div>
				<ol class="space-y-2">
					{#each featured as entry (entry.id)}
						<li>
							<a
								href="#faq-{entry.id}"
								class="text-gray-mid hover:text-teal-ink transition-colors underline decoration-silver underline-offset-4"
								>{entry.question}</a
							>
						</li>
					{/each}
				</ol>
			</div>

			<!-- Rendered server-side with the full count: an aria-live region only announces
			     changes to a region that already existed. -->
			<p class="mt-12 mb-4 text-sm text-gray-mid" aria-live="polite" aria-atomic="true">
				{isFiltered
					? interpolate(f.resultsCountFiltered as string, {
							count: visibleIds.size,
							total: entries.length
						})
					: interpolate(f.resultsCount as string, { total: entries.length })}
			</p>

			<div id="faq-all" class="scroll-mt-24 md:scroll-mt-36">
				{#each faqCategories as category (category.id)}
					<section hidden={visibleCountIn(category.id) === 0} class="mb-10">
						<h2
							id="faq-cat-{category.id}"
							class="section-heading text-near-black mb-3 scroll-mt-24 md:scroll-mt-36"
						>
							{categoryCopy[category.id].label}
						</h2>
						<div class="teal-divider mb-6"></div>
						<div class="space-y-3">
							{#each entriesIn(category.id) as entry (entry.id)}
								<AccordionItem
									id="faq-{entry.id}"
									question={entry.question}
									hidden={!visibleIds.has(entry.id)}
								>
									{#each entry.answer as paragraph}
										<p>{paragraph}</p>
									{/each}
								</AccordionItem>
							{/each}
						</div>
					</section>
				{/each}
			</div>

			{#if visibleIds.size === 0}
				<div class="card p-8 text-center">
					<h2 class="section-heading text-near-black mb-3">{f.noResultsTitle as string}</h2>
					<div class="teal-divider mx-auto mb-4"></div>
					<p class="text-gray-mid">{f.noResultsBody as string}</p>
				</div>
			{/if}

			<div class="card p-8 mt-12 text-center">
				<h2 class="section-heading text-near-black mb-3">{f.stillStuckTitle as string}</h2>
				<div class="teal-divider mx-auto mb-4"></div>
				<p class="text-gray-mid mb-6 max-w-xl mx-auto">{f.stillStuckBody as string}</p>
				<a href="/{data.lang}/contact" class="btn-primary">{f.contactCta as string}</a>
			</div>
		</div>
	</section>
</div>
