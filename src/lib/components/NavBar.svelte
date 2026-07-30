<script lang="ts">
	import { page } from '$app/stores';
	import { localeLabels, type Locale } from '$lib/utils/i18n.js';

	interface Props {
		lang: string;
		t: Record<string, Record<string, string>>;
	}

	let { lang, t }: Props = $props();
	let nav = $derived(t.nav as Record<string, string>);

	let menuOpen = $state(false);
	let langOpen = $state(false);

	const navLinks = $derived([
		{ href: `/${lang}`, label: nav.home },
		{ href: `/${lang}/about`, label: nav.about },
		{ href: `/${lang}/services`, label: nav.services },
		// Pricing page temporarily unplugged — re-enable by uncommenting this link. See PROJECT.md.
		// { href: `/${lang}/pricing`, label: nav.pricing },
		{ href: `/${lang}/contact`, label: nav.contact }
	]);

	function currentPath() {
		return $page.url.pathname;
	}

	function isActive(href: string): boolean {
		const p = currentPath();
		if (href === `/${lang}`) return p === `/${lang}` || p === `/${lang}/`;
		return p.startsWith(href);
	}

	function switchLang(newLang: string) {
		const p = currentPath();
		const segments = p.split('/').filter(Boolean);
		segments[0] = newLang;
		langOpen = false;
		window.location.href = '/' + segments.join('/');
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeAll() {
		menuOpen = false;
		langOpen = false;
	}
</script>

<header class="sticky top-0 z-50 bg-black border-b border-white/10">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
		<div class="flex items-center justify-between h-[72px] md:h-[120px]">
			<!-- Logo -->
			<a href="/{lang}" class="flex items-center gap-2 flex-shrink-0" onclick={closeAll}>
				<img
					src="/assets/uboss-logo-dark-bg.png"
					alt="UBOSS"
					class="h-14 md:h-24 w-auto"
					width="320"
					height="96"
				/>
			</a>

			<!-- Desktop nav -->
			<div class="hidden md:flex items-center gap-1">
				{#each navLinks as link}
					<a
						href={link.href}
						class="px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150
						{isActive(link.href)
							? 'text-teal border-b-2 border-teal'
							: 'text-white/80 hover:text-white hover:bg-white/5'}"
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Right side: language + CTA -->
			<div class="hidden md:flex items-center gap-3">
				<!-- Language switcher -->
				<div class="relative">
					<button
						onclick={() => (langOpen = !langOpen)}
						aria-label={nav.selectLanguage}
						aria-expanded={langOpen}
						class="flex items-center gap-1.5 px-3 py-2 text-sm text-white/70 hover:text-white rounded-md hover:bg-white/5 transition-colors"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-4 h-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<circle cx="12" cy="12" r="10" />
							<path
								d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
							/>
						</svg>
						<span>{localeLabels[lang as Locale]}</span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-3 h-3 transition-transform {langOpen ? 'rotate-180' : ''}"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
						>
							<polyline points="6 9 12 15 18 9" />
						</svg>
					</button>
					{#if langOpen}
						<div
							class="absolute right-0 mt-1 w-40 bg-near-black border border-white/10 rounded-lg shadow-xl overflow-hidden z-50"
						>
							{#each Object.entries(localeLabels) as [locale, label]}
								<button
									onclick={() => switchLang(locale)}
									class="w-full text-left px-4 py-2.5 text-sm transition-colors
									{locale === lang ? 'text-teal bg-teal/10' : 'text-white/70 hover:text-white hover:bg-white/5'}"
								>
									{label}
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<a href="/{lang}/contact" class="btn-primary text-sm py-2 px-4">
					{nav.bookCta}
				</a>
			</div>

			<!-- Mobile menu button -->
			<button
				class="md:hidden p-2 text-white/80 hover:text-white rounded-md"
				onclick={toggleMenu}
				aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
				aria-expanded={menuOpen}
			>
				{#if menuOpen}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				{/if}
			</button>
		</div>
	</nav>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div class="md:hidden bg-near-black border-t border-white/10">
			<div class="px-4 py-3 space-y-1">
				{#each navLinks as link}
					<a
						href={link.href}
						onclick={closeAll}
						class="block px-3 py-2.5 text-base font-medium rounded-md transition-colors
						{isActive(link.href) ? 'text-teal bg-teal/10' : 'text-white/80 hover:text-white hover:bg-white/5'}"
					>
						{link.label}
					</a>
				{/each}
				<div class="pt-3 border-t border-white/10 space-y-1">
					{#each Object.entries(localeLabels) as [locale, label]}
						<button
							onclick={() => {
								switchLang(locale);
								closeAll();
							}}
							class="w-full text-left px-3 py-2.5 text-sm rounded-md transition-colors
							{locale === lang ? 'text-teal bg-teal/10' : 'text-white/60 hover:text-white hover:bg-white/5'}"
						>
							{label}
						</button>
					{/each}
				</div>
				<div class="pt-3">
					<a href="/{lang}/contact" onclick={closeAll} class="btn-primary w-full text-center">
						{nav.bookCta}
					</a>
				</div>
			</div>
		</div>
	{/if}
</header>
