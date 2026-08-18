<script lang="ts">
	interface Props {
		lang: string;
		t: Record<string, Record<string, string>>;
	}

	let { lang, t }: Props = $props();
	let footer = $derived(t.footer as Record<string, unknown>);
	let links = $derived(footer.links as Record<string, string>);
	let legal = $derived(footer.legal as Record<string, string>);
</script>

<footer class="bg-black text-white/70 border-t border-white/10">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
			<!-- Brand column -->
			<div class="md:col-span-1">
				<a href="/{lang}" class="inline-flex items-center gap-3 mb-4">
					<img
						src="/assets/uboss-logo-dark-bg.png"
						alt="UBOSS"
						class="h-9 md:h-12 w-auto"
						width="160"
						height="48"
					/>
					<img
						src="/assets/pegasus-icon-modern.jpg"
						alt=""
						class="h-9 md:h-11 w-auto object-contain opacity-60"
						width="44"
						height="44"
						aria-hidden="true"
					/>
				</a>
				<p class="text-sm text-white/50 leading-relaxed">{footer.tagline as string}</p>
				<p class="text-sm text-teal mt-2">{footer.serving as string}</p>
			</div>

			<!-- Company links -->
			<div>
				<h3 class="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
					{footer.companyHeading as string}
				</h3>
				<ul class="space-y-2">
					<li>
						<a href="/{lang}/about" class="text-sm hover:text-teal transition-colors"
							>{links.about}</a
						>
					</li>
					<li>
						<a href="/{lang}/services" class="text-sm hover:text-teal transition-colors"
							>{links.services}</a
						>
					</li>
					<!-- Pricing page temporarily unplugged — re-enable by uncommenting this link. See PROJECT.md.
					<li>
						<a href="/{lang}/pricing" class="text-sm hover:text-teal transition-colors"
							>{links.pricing}</a
						>
					</li>
					-->
					<li>
						<a href="/{lang}/contact" class="text-sm hover:text-teal transition-colors"
							>{links.contact}</a
						>
					</li>
				</ul>
			</div>

			<!-- Support & Careers -->
			<div>
				<h3 class="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
					{footer.helpHeading as string}
				</h3>
				<ul class="space-y-2">
					<li>
						<a href="/{lang}/faq" class="text-sm hover:text-teal transition-colors"
							>{footer.faq as string}</a
						>
					</li>
					<li>
						<a href="/{lang}/support" class="text-sm hover:text-teal transition-colors"
							>{footer.support as string}</a
						>
					</li>
					<li>
						<a href="/{lang}/careers" class="text-sm hover:text-teal transition-colors"
							>{footer.careers as string}</a
						>
					</li>
					<li>
						<a href="mailto:support@uboss.ai" class="text-sm hover:text-teal transition-colors">
							support@uboss.ai
						</a>
					</li>
				</ul>
			</div>

			<!-- Legal -->
			<div>
				<h3 class="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
					{footer.legalHeading as string}
				</h3>
				<ul class="space-y-2">
					<li>
						<a href="/{lang}/legal/terms" class="text-sm hover:text-teal transition-colors"
							>{legal.terms}</a
						>
					</li>
					<li>
						<a href="/{lang}/legal/privacy" class="text-sm hover:text-teal transition-colors"
							>{legal.privacy}</a
						>
					</li>
					<li>
						<a href="/{lang}/legal/key-terms" class="text-sm hover:text-teal transition-colors"
							>{legal.keyTerms}</a
						>
					</li>
				</ul>
			</div>
		</div>

		<div
			class="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
		>
			<p class="text-xs text-white/50">{footer.copyright as string}</p>
			<div class="flex items-center gap-4 text-white/50">
				<a
					href="https://www.linkedin.com/company/uboss-ai"
					target="_blank"
					rel="noopener noreferrer"
					aria-label={footer.linkedinLabel as string}
					class="hover:text-teal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2 rounded"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-5 h-5"
						aria-hidden="true"
					>
						<path
							d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
						/>
					</svg>
				</a>
				<a
					href="https://www.facebook.com/people/UBoss/61572034173888/"
					target="_blank"
					rel="noopener noreferrer"
					aria-label={footer.facebookLabel as string}
					class="hover:text-teal transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2 rounded"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="w-5 h-5"
						aria-hidden="true"
					>
						<path
							d="M22 12.061C22 6.505 17.523 2 12 2S2 6.505 2 12.061c0 5.022 3.657 9.184 8.438 9.939v-7.03H7.898v-2.909h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.196 2.238.196v2.475h-1.26c-1.243 0-1.63.775-1.63 1.57v1.89h2.773l-.443 2.909h-2.33V22c4.78-.755 8.437-4.917 8.437-9.939z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</footer>
