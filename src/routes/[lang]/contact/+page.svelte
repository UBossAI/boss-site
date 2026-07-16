<script lang="ts">
	import SEOHead from '$lib/components/SEOHead.svelte';
	import type { PageData } from './$types.js';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	const t = $derived(data.t as Record<string, unknown>);
	const c = $derived(t.contact as Record<string, unknown>);
	const form = $derived(c.form as Record<string, string>);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');
	let language = $state('en');
	let honeypot = $state('');
	let status = $state<'idle' | 'sending' | 'success' | 'error'>('idle');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		if (honeypot) return; // spam trap

		status = 'sending';
		try {
			// For now, open mailto directly
			window.location.href = `mailto:support@uboss.ai?subject=Contact%20Form%20-%20${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Language: ${language}\n\n${message}`)}`;
			status = 'success';
		} catch {
			status = 'error';
		}
	}
</script>

<SEOHead
	title={seo.contact.title}
	description={seo.contact.description}
	lang={data.lang}
	page="contact"
/>

<div class="bg-surface-light">
	<section class="bg-black text-white py-20 lg:py-24">
		<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex items-center gap-2 mb-6">
				<span class="w-6 h-px bg-teal"></span>
				<span class="text-teal text-sm font-medium uppercase tracking-widest"
					>{c.eyebrow as string}</span
				>
			</div>
			<h1 class="hero-heading text-white mb-4">{c.title as string}</h1>
			<div class="teal-divider mb-6"></div>
			<p class="text-white/60 text-xl">{c.subtitle as string}</p>
		</div>
	</section>

	<section class="py-16 lg:py-20">
		<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
			<!-- Contact options -->
			<div class="space-y-6">
				<div class="card p-6">
					<div class="text-teal mb-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-7 h-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h2 class="font-semibold text-near-black mb-1">{c.emailLabel as string}</h2>
					<a href="mailto:support@uboss.ai" class="text-teal hover:underline text-lg font-medium">
						{c.email as string}
					</a>
				</div>

				<div class="card p-6">
					<div class="text-teal mb-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-7 h-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h2 class="font-semibold text-near-black mb-1">{c.book15Label as string}</h2>
					<p class="text-gray-mid text-sm mb-3">{c.book15Description as string}</p>
					<a
						href="https://cal.com/robg-uboss/discovery-call"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-primary text-sm"
					>
						{c.book15Label as string}
					</a>
				</div>

				<div class="card p-6">
					<div class="text-teal mb-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-7 h-7"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="1.5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
					<h2 class="font-semibold text-near-black mb-1">{c.book60Label as string}</h2>
					<p class="text-gray-mid text-sm mb-3">{c.book60Description as string}</p>
					<a
						href="https://cal.com/robg-uboss/uboss-strategy"
						target="_blank"
						rel="noopener noreferrer"
						class="btn-primary text-sm"
					>
						{c.book60Label as string}
					</a>
				</div>
			</div>

			<!-- Contact form -->
			<div class="card p-7">
				<h2 class="font-semibold text-near-black text-xl mb-6">{form.title}</h2>

				{#if status === 'success'}
					<div class="text-center py-10">
						<div class="text-teal mb-4">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="w-12 h-12 mx-auto"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="1.5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h3 class="font-semibold text-near-black text-lg mb-2">{form.successTitle}</h3>
						<p class="text-gray-mid text-sm">{form.successMessage}</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="space-y-4" novalidate>
						<!-- Honeypot -->
						<input
							type="text"
							name="_gotcha"
							bind:value={honeypot}
							style="display:none"
							tabindex="-1"
							autocomplete="off"
						/>

						<div>
							<label for="name" class="block text-sm font-medium text-near-black mb-1.5"
								>{form.name}</label
							>
							<input
								id="name"
								type="text"
								bind:value={name}
								placeholder={form.namePlaceholder}
								required
								autocomplete="name"
								class="w-full px-3.5 py-2.5 rounded-lg border border-silver text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-shadow"
							/>
						</div>

						<div>
							<label for="email" class="block text-sm font-medium text-near-black mb-1.5"
								>{form.email}</label
							>
							<input
								id="email"
								type="email"
								bind:value={email}
								placeholder={form.emailPlaceholder}
								required
								autocomplete="email"
								class="w-full px-3.5 py-2.5 rounded-lg border border-silver text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-shadow"
							/>
						</div>

						<div>
							<label for="phone" class="block text-sm font-medium text-near-black mb-1.5"
								>{form.phone}</label
							>
							<input
								id="phone"
								type="tel"
								bind:value={phone}
								placeholder={form.phonePlaceholder}
								autocomplete="tel"
								class="w-full px-3.5 py-2.5 rounded-lg border border-silver text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-shadow"
							/>
						</div>

						<div>
							<label for="language" class="block text-sm font-medium text-near-black mb-1.5"
								>{form.language}</label
							>
							<select
								id="language"
								bind:value={language}
								class="w-full px-3.5 py-2.5 rounded-lg border border-silver text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-shadow bg-white"
							>
								<option value="en">{form.languageEn}</option>
								<option value="es">{form.languageEs}</option>
								<option value="pt-BR">{form.languagePt}</option>
							</select>
						</div>

						<div>
							<label for="message" class="block text-sm font-medium text-near-black mb-1.5"
								>{form.message}</label
							>
							<textarea
								id="message"
								bind:value={message}
								placeholder={form.messagePlaceholder}
								required
								rows="4"
								class="w-full px-3.5 py-2.5 rounded-lg border border-silver text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-shadow resize-none"
							></textarea>
						</div>

						{#if status === 'error'}
							<p class="text-error text-sm">{form.errorMessage}</p>
						{/if}

						<button
							type="submit"
							disabled={status === 'sending'}
							class="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{status === 'sending' ? form.sending : form.submit}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</section>
</div>
