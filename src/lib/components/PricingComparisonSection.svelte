<script lang="ts">
	interface Props {
		lang: string;
		t: Record<string, unknown>;
	}

	let { lang, t }: Props = $props();
	const p = $derived(t.pricing as Record<string, string>);

	const tables = [
		{
			headerKey: 'comparisonTable1Header',
			ubossLabel: 'UBoss Starter',
			partTime:  { hours: '20 hrs', monthly: '$1,360', annual: '$16,320' },
			fullTime:  { hours: '40 hrs', monthly: '$2,720', annual: '$32,640' },
			uboss:     { monthly: '$500',  annual: '$6,000' }
		},
		{
			headerKey: 'comparisonTable2Header',
			ubossLabel: 'UBoss Professional',
			partTime:  { hours: '20 hrs', monthly: '$1,600', annual: '$19,200' },
			fullTime:  { hours: '40 hrs', monthly: '$3,200', annual: '$38,400' },
			uboss:     { monthly: '$800',  annual: '$9,600' }
		},
		{
			headerKey: 'comparisonTable3Header',
			ubossLabel: 'UBoss Professional Plus',
			partTime:  { hours: '20 hrs', monthly: '$2,000', annual: '$24,000' },
			fullTime:  { hours: '40 hrs', monthly: '$4,000', annual: '$48,000' },
			uboss:     { monthly: '$1,200', annual: '$14,400' }
		}
	];
</script>

<section class="bg-near-black text-white py-20 lg:py-28" aria-labelledby="comparison-heading">
	<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

		<!-- Section 1 — Callout paragraph -->
		<div class="mb-14">
			<h2 id="comparison-heading" class="section-heading text-white mb-4">
				{p.comparisonTitle}
			</h2>
			<div class="teal-divider mb-6"></div>
			<p class="text-white/70 text-lg leading-relaxed mb-4">{p.comparisonBody1}</p>
			<p class="text-white/70 text-lg leading-relaxed">{p.comparisonBody2}</p>
		</div>

		<!-- Section 2 — 24/7 Banner -->
		<div class="flex items-start gap-3 bg-teal/10 border border-teal/30 rounded-xl px-5 py-4 mb-12">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-teal flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="12" cy="12" r="10"/>
				<polyline points="12 6 12 12 16 14"/>
			</svg>
			<p class="text-teal font-medium text-sm leading-relaxed">{p.comparisonBanner}</p>
		</div>

		<!-- Section 3 — Three Comparison Tables (always stacked, full width) -->
		<div class="space-y-6 mb-10">
			{#each tables as table}
				<div class="rounded-2xl border border-white/10 overflow-hidden">
					<!-- Table role header -->
					<div class="px-4 py-3 border-b border-teal/30 bg-white/5">
						<p class="text-teal font-semibold text-sm">{p[table.headerKey]}</p>
					</div>

					<table class="w-full text-sm">
						<colgroup>
							<col style="min-width: 180px" />
							<col style="min-width: 100px" />
							<col style="min-width: 100px" />
							<col style="min-width: 100px" />
						</colgroup>
						<!-- Column headers -->
						<thead>
							<tr class="border-b border-white/10">
								<th class="text-left px-4 py-2.5 text-xs uppercase tracking-wider text-white/40 font-medium">
									Type
								</th>
								<th class="text-right px-4 py-2.5 text-xs uppercase tracking-wider text-white/40 font-medium">
									{p.comparisonHoursHeader}
								</th>
								<th class="text-right px-4 py-2.5 text-xs uppercase tracking-wider text-white/40 font-medium">
									{p.comparisonMonthlyHeader}
								</th>
								<th class="text-right px-4 py-2.5 text-xs uppercase tracking-wider text-white/40 font-medium">
									{p.comparisonAnnualHeader}
								</th>
							</tr>
						</thead>
						<tbody>
							<!-- Part-time row -->
							<tr class="border-b border-white/5">
								<td class="px-4 py-3 text-white/60 whitespace-nowrap">{p.comparisonPartTime}</td>
								<td class="px-4 py-3 text-right text-white/50 tabular-nums">{table.partTime.hours}</td>
								<td class="px-4 py-3 text-right text-white/50 tabular-nums">{table.partTime.monthly}</td>
								<td class="px-4 py-3 text-right text-white/50 tabular-nums">{table.partTime.annual}</td>
							</tr>
							<!-- Full-time row -->
							<tr class="border-b border-white/5">
								<td class="px-4 py-3 text-white/60 whitespace-nowrap">{p.comparisonFullTime}</td>
								<td class="px-4 py-3 text-right text-white/50 tabular-nums">{table.fullTime.hours}</td>
								<td class="px-4 py-3 text-right text-white/50 tabular-nums">{table.fullTime.monthly}</td>
								<td class="px-4 py-3 text-right text-white/50 tabular-nums">{table.fullTime.annual}</td>
							</tr>
							<!-- UBoss row — highlighted -->
							<tr class="bg-teal/10">
								<td class="px-4 py-3 font-semibold text-white whitespace-nowrap">{table.ubossLabel}</td>
								<td class="px-4 py-3 text-right text-white/80 text-xs tabular-nums">24/7/365 †</td>
								<td class="px-4 py-3 text-right font-bold text-teal tabular-nums">{table.uboss.monthly}</td>
								<td class="px-4 py-3 text-right font-bold text-teal tabular-nums">{table.uboss.annual}</td>
							</tr>
						</tbody>
					</table>
				</div>
			{/each}
		</div>

		<!-- Section 4 — Disclaimer -->
		<p class="text-white/35 text-xs leading-relaxed max-w-4xl">
			{p.comparisonDisclaimer}
		</p>

	</div>
</section>
