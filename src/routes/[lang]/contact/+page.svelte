<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { env as publicEnv } from '$env/dynamic/public';
	import { loadScript } from '$lib/analytics/loadScript.js';
	import { MESSAGE_MAX_LENGTH, MESSAGE_MIN_LENGTH } from '$lib/config/contactForm.js';
	import SEOHead from '$lib/components/SEOHead.svelte';
	import { trackConversion } from '$lib/analytics/index.js';
	import type { ActionData, PageData } from './$types.js';

	interface Props {
		data: PageData;
		form: ActionData;
	}
	let { data, form }: Props = $props();
	const t = $derived(data.t as Record<string, unknown>);
	const c = $derived(t.contact as Record<string, unknown>);
	const formT = $derived(c.form as Record<string, string>);
	const seo = $derived(t.seo as Record<string, Record<string, string>>);

	let submitting = $state(false);
	let message = $state('');
	let contactMethodError = $state(false);
	let progress = $state(0);
	let progressTimer: ReturnType<typeof setInterval> | undefined;

	// Climbs quickly at first, then eases toward (but never reaches) 92% — real
	// submissions land in 1-3s normally, up to ~22s worst case, and the actual
	// response snaps the bar to 100% (or resets it on failure) rather than the
	// timer ever completing it on its own.
	function startProgress() {
		const startedAt = Date.now();
		progress = 0;
		progressTimer = setInterval(() => {
			progress = 92 * (1 - Math.exp(-(Date.now() - startedAt) / 1300));
		}, 100);
	}

	function stopProgress(finalValue: number) {
		clearInterval(progressTimer);
		progressTimer = undefined;
		progress = finalValue;
	}

	onMount(() => {
		loadScript('https://challenges.cloudflare.com/turnstile/v0/api.js');
	});

	onDestroy(() => clearInterval(progressTimer));
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
					<a href="#contact-form" class="text-teal-ink hover:underline text-lg font-medium">
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
						onclick={() => trackConversion('book_discovery_call', { placement: 'contact_page' })}
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
						onclick={() => trackConversion('book_strategy_call', { placement: 'contact_page' })}
					>
						{c.book60Label as string}
					</a>
				</div>
			</div>

			<!-- Contact form -->
			<div class="card p-7">
				<h2 class="font-semibold text-near-black text-xl mb-6">{formT.title}</h2>

				{#if form?.success}
					<!-- role="status" so assistive tech announces the outcome; without it the form
					     simply vanishes and a screen reader user gets no confirmation. -->
					<div class="text-center py-10" role="status">
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
						<h3 class="font-semibold text-near-black text-lg mb-2">{formT.successTitle}</h3>
						<p class="text-gray-mid text-sm">{formT.successMessage}</p>
					</div>
				{:else}
					<form
						id="contact-form"
						method="POST"
						use:enhance={({ formData, cancel }) => {
							const hasEmail = !!formData.get('email')?.toString().trim();
							const hasPhone = !!formData.get('phone')?.toString().trim();
							if (!hasEmail && !hasPhone) {
								contactMethodError = true;
								cancel();
								return;
							}
							contactMethodError = false;

							submitting = true;
							startProgress();
							return async ({ result, update }) => {
								submitting = false;
								stopProgress(result.type === 'success' ? 100 : 0);
								if (result.type === 'success') {
									trackConversion('contact_form_submit');
								}
								await update();
							};
						}}
						class="space-y-4"
					>
						<!-- Honeypot -->
						<input
							type="text"
							name="_gotcha"
							style="display:none"
							tabindex="-1"
							autocomplete="off"
						/>

						<div>
							<label for="name" class="block text-sm font-medium text-near-black mb-1.5"
								>{formT.name}</label
							>
							<input
								id="name"
								name="name"
								type="text"
								placeholder={formT.namePlaceholder}
								required
								autocomplete="name"
								class="w-full px-3.5 py-2.5 rounded-lg border border-silver text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-shadow"
							/>
						</div>

						<div>
							<label for="email" class="block text-sm font-medium text-near-black mb-1.5"
								>{formT.email}</label
							>
							<input
								id="email"
								name="email"
								type="email"
								placeholder={formT.emailPlaceholder}
								autocomplete="email"
								class="w-full px-3.5 py-2.5 rounded-lg border border-silver text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-shadow"
							/>
						</div>

						<div>
							<label for="phone" class="block text-sm font-medium text-near-black mb-1.5"
								>{formT.phone}</label
							>
							<input
								id="phone"
								name="phone"
								type="tel"
								placeholder={formT.phonePlaceholder}
								autocomplete="tel"
								class="w-full px-3.5 py-2.5 rounded-lg border border-silver text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-shadow"
							/>
							<p class="text-gray-mid text-xs mt-1.5">{formT.contactMethodHint}</p>
						</div>

						<div>
							<label for="language" class="block text-sm font-medium text-near-black mb-1.5"
								>{formT.language}</label
							>
							<select
								id="language"
								name="language"
								class="w-full px-3.5 py-2.5 rounded-lg border border-silver text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-shadow bg-white"
							>
								<option value="en">{formT.languageEn}</option>
								<option value="es">{formT.languageEs}</option>
								<option value="pt-BR">{formT.languagePt}</option>
							</select>
						</div>

						<div>
							<label for="message" class="block text-sm font-medium text-near-black mb-1.5"
								>{formT.message}</label
							>
							<textarea
								id="message"
								name="message"
								bind:value={message}
								placeholder={formT.messagePlaceholder}
								required
								minlength={MESSAGE_MIN_LENGTH}
								maxlength={MESSAGE_MAX_LENGTH}
								rows="4"
								class="w-full px-3.5 py-2.5 rounded-lg border border-silver text-near-black text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition-shadow resize-none"
							></textarea>
							{#if MESSAGE_MAX_LENGTH - message.length <= 200}
								<p class="text-gray-mid text-xs mt-1 text-right">
									{formT.charCount
										.replace('{typed}', String(message.length))
										.replace('{max}', String(MESSAGE_MAX_LENGTH))}
								</p>
							{/if}
						</div>

						<div class="cf-turnstile" data-sitekey={publicEnv.PUBLIC_TURNSTILE_SITE_KEY}></div>

						{#if contactMethodError}
							<p class="text-error text-sm" role="alert">{formT.contactMethodHint}</p>
						{:else if form?.error}
							<p class="text-error text-sm" role="alert">{formT.errorMessage}</p>
						{/if}

						{#if submitting}
							<div
								class="w-full h-1.5 bg-silver/40 rounded-full overflow-hidden"
								role="progressbar"
								aria-label={formT.sending}
								aria-valuenow={Math.round(progress)}
								aria-valuemin="0"
								aria-valuemax="100"
							>
								<div
									class="h-full bg-teal transition-[width] duration-150 ease-linear"
									style="width: {progress}%"
								></div>
							</div>
						{/if}

						<button
							type="submit"
							disabled={submitting}
							class="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{submitting ? formT.sending : formT.submit}
						</button>
					</form>
				{/if}
			</div>
		</div>
	</section>
</div>
