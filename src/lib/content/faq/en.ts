import type { FaqEntry } from './types.js';

export const faqEntries: readonly FaqEntry[] = [
	// ─── Working with us ────────────────────────────────────────────────────────
	{
		id: 'what-is-uboss',
		category: 'working-with-us',
		featured: true,
		question: 'What is UBOSS, exactly?',
		answer: [
			'UBOSS builds the systems that handle the repetitive side of running your business — customer follow-ups, paperwork, scheduling, invoice reminders — so your time goes to the work itself.',
			'We are not another app to log into. We connect the tools you already use, automate what happens between them, and give you a clear view of how the business is actually performing.'
		],
		keywords: ['what is uboss', 'business co-pilot', 'ai as a service', 'aiaas']
	},
	{
		id: 'consultation-call',
		category: 'working-with-us',
		featured: true,
		question: 'What happens on a consultation call?',
		answer: [
			'We start by finding out what is costing you the most time and aggravation. The first conversation is diagnostic, not a sales pitch — we want to understand how your business actually runs before proposing anything.',
			'You will leave with a clear picture of what could be automated, a realistic sense of the effort involved, and an honest answer if what you need is not something we do.'
		],
		keywords: ['business consultation', 'discovery call', 'strategy session', 'free consultation']
	},
	{
		id: 'pricing',
		category: 'working-with-us',
		featured: true,
		question: 'How does pricing work?',
		answer: [
			'Pricing is quoted after a consultation call, because the right number depends entirely on what we are solving.',
			'The typical structure is a one-time setup fee for the build itself, then a monthly fee covering everything that keeps it running — monitoring, fixes, and adjustments as your business changes. We do not publish fixed packages, because the problems we are asked to solve are rarely the same twice.'
		],
		keywords: ['pricing', 'cost', 'how much', 'setup fee', 'monthly fee', 'subscription', 'quote']
	},
	{
		id: 'contract-commitment',
		category: 'working-with-us',
		question: 'Is there a contract or long-term commitment?',
		answer: [
			'No long-term contracts. The monthly side is month-to-month — we would rather earn it each month than lock you in.'
		],
		keywords: ['contract', 'commitment', 'cancel', 'month to month', 'lock in']
	},
	{
		id: 'setup-timeline',
		category: 'working-with-us',
		question: 'How long does setup take?',
		answer: [
			'Most straightforward builds are live within one to two weeks. More involved projects — several systems connected, custom dashboards, multiple people using it — usually run two to four weeks.',
			'The variable is rarely the building. It is how much we are connecting and how quickly we can get access to the tools you already use.'
		],
		keywords: ['how long', 'timeline', 'setup time', 'implementation', 'go live']
	},
	{
		id: 'start-small',
		category: 'working-with-us',
		question: 'Can I start small and add more later?',
		answer: [
			'Yes, and most people do. Fixing one specific headache first is the sensible way to start — smaller commitment, and you get to see the thing working before deciding how far to take it.',
			'Systems are built so they can be extended rather than replaced, so starting small does not mean starting over later.'
		],
		keywords: ['start small', 'pilot', 'try first', 'scale up later', 'add more']
	},
	{
		id: 'outside-trades',
		category: 'working-with-us',
		question: 'Do you work with businesses outside the trades?',
		answer: [
			'Our focus today is trades and local service businesses — contractors, electricians, plumbers, HVAC, cleaning, landscaping. That is where most of our work is and where we know the operational details cold.',
			'That said, the underlying work is not trade-specific: collecting data reliably, automating follow-up, building reporting, and handling records carefully apply just as well to accounting and bookkeeping practices, real estate offices, and medical and dental practices.',
			'If you are in one of those fields and the problems sound familiar, it is worth a conversation. We will tell you honestly whether it is a good fit.'
		],
		keywords: [
			'cpa',
			'accountant',
			'bookkeeper',
			'tax',
			'real estate',
			'realtor',
			'medical',
			'dental',
			'practice',
			'other industries',
			'who do you work with'
		]
	},
	{
		id: 'language-support',
		category: 'working-with-us',
		question: 'Do you offer support in Spanish or Portuguese?',
		answer: [
			'Yes. Full support in English and Spanish, with Portuguese being rolled out. The founder is personally bilingual in English and Spanish, so you are not routed through a translation layer to get an answer.'
		],
		keywords: ['spanish', 'espanol', 'portuguese', 'portugues', 'bilingual', 'language']
	},
	{
		id: 'crm-different',
		category: 'working-with-us',
		question: 'We tried a CRM before and nobody used it. Why would this be different?',
		answer: [
			'Most CRMs are built for large sales teams: dozens of features you will never touch, and enough manual data entry that keeping it current becomes its own part-time job. That is why they get abandoned.',
			'What we build is not another app to log into. It connects to what you already use and runs in the background. You get the parts that matter — who called, which jobs are stalled, where the money is going — without anyone becoming a data-entry clerk.'
		],
		keywords: ['crm', 'crm alternative', 'software nobody uses', 'too complicated']
	},

	// ─── Systems & automation ───────────────────────────────────────────────────
	{
		id: 'automate-my-business',
		category: 'systems-automation',
		featured: true,
		question: 'How do you automate a business that still runs on phone calls and paper?',
		answer: [
			'We start by learning how the work actually flows today — who takes the call, what gets written down, what happens next, and where things fall through.',
			'Automation is only as good as that understanding. A system built on a wrong assumption creates more work than it saves. Once the real process is mapped, we translate the repeatable parts into something that runs on its own and leave the judgment calls with you.'
		],
		keywords: [
			'how to automate my business',
			'automation',
			'paper forms',
			'manual process',
			'digitize'
		]
	},
	{
		id: 'existing-tools',
		category: 'systems-automation',
		question: 'Will I have to replace the tools I already use?',
		answer: [
			'Usually not. The goal is to connect what is working rather than rip it out — most tools worth keeping have a way to integrate, and building around your existing habits beats forcing new ones.',
			'Where a tool is genuinely holding you back, we will say so. But replacing software is a last resort, not a starting point.'
		],
		keywords: [
			'integration',
			'api',
			'quickbooks',
			'google workspace',
			'gmail',
			'calendar',
			'connect tools',
			'existing software'
		]
	},
	{
		id: 'dashboards',
		category: 'systems-automation',
		featured: true,
		question: 'Can you build a dashboard for my business?',
		answer: [
			'Yes, and it starts with the data. On the consultation call we work out what you are already capturing, what you are not, and what you would actually make decisions from.',
			'From there we set up collection where it is missing and build the views on top — so instead of opening five different tools to work out how the month went, it is in one place. The useful ones show both where you stand now and where the trend is heading.'
		],
		keywords: [
			'dashboard',
			'how to create a dashboard',
			'reporting',
			'analytics',
			'charts',
			'business intelligence',
			'forecasting'
		]
	},
	{
		id: 'business-metrics',
		category: 'systems-automation',
		question: 'Which numbers can a dashboard actually track?',
		answer: [
			'The common ones are all fair game — revenue growth rate, net profit margin, customer acquisition cost, conversion rate, monthly recurring revenue, inventory turnover, maintenance cost, burn rate — along with anything specific to how you work.',
			'The harder part is rarely the chart. A number is only as trustworthy as the process feeding it, so most of the effort goes into making the collection accurate before anything gets built on top of it.'
		],
		keywords: [
			'cac',
			'customer acquisition cost',
			'mrr',
			'monthly recurring revenue',
			'profit margin',
			'conversion rate',
			'inventory turnover',
			'burn rate',
			'revenue growth',
			'kpi',
			'metrics'
		]
	},
	{
		id: 'estimates-invoices',
		category: 'systems-automation',
		question: 'Can you make my estimates and invoices look more professional?',
		answer: [
			'Yes. Documentation is often the weakest part of an otherwise excellent operation — a vague, handwritten estimate can make first-rate work look careless, and itemizing materials and labor properly is rarely anyone’s favorite task.',
			'We build the tooling so every estimate, invoice, and confirmation that reaches your customer is clean, itemized, and consistent.'
		],
		keywords: ['invoice', 'estimate', 'quote', 'itemized', 'billing', 'professional paperwork']
	},
	{
		id: 'customer-notifications',
		category: 'systems-automation',
		question: 'Can you send text or email confirmations to my customers?',
		answer: [
			'Yes, within the rules that govern business texting. Text messaging requires the recipient’s consent before you can message them — that is a legal requirement, not a preference — so the flow we build starts with a form or booking step where the customer opts in.',
			'From there, confirmations, reminders, and follow-ups go out automatically. Email works the same way with fewer restrictions.'
		],
		keywords: [
			'text message',
			'sms',
			'confirmation',
			'reminder',
			'notification',
			'whatsapp',
			'appointment reminder'
		]
	},

	// ─── AI assistants ──────────────────────────────────────────────────────────
	{
		id: 'automation-vs-ai',
		category: 'ai-assistants',
		featured: true,
		question: 'What is the difference between automation and AI?',
		answer: [
			'Automation is the backbone; AI is the judgment layer. Automation handles the defined work — moving information where it needs to go, triggering the next step, making sure nothing gets dropped.',
			'AI handles the parts that need interpretation: reading an unstructured message, summarizing what happened, drafting a reply. Most businesses need both, and the split matters — using AI where a simple rule would do is slower, costlier, and less predictable.'
		],
		keywords: ['automation vs ai', 'difference', 'which do i need', 'both']
	},
	{
		id: 'replace-employees',
		category: 'ai-assistants',
		featured: true,
		question: 'Is AI going to replace my employees?',
		answer: [
			'That is your call to make, not ours, and it is not what we build toward. The aim is to make the people you already have more effective — less time on repetitive admin, more on the work they are genuinely good at.',
			'How you use that freed-up time is a business decision only you can make. What works at one company does not transfer cleanly to the next; people work at different rhythms and absorb information differently, and a system that ignores that gets abandoned.'
		],
		keywords: [
			'replace employees',
			'replace staff',
			'replace secretary',
			'job loss',
			'layoffs',
			'headcount'
		]
	},
	{
		id: 'always-on',
		category: 'ai-assistants',
		question: 'Can this run around the clock?',
		answer: [
			'Automation does not keep hours, so the parts that are automated do run continuously — a form submitted at 2am is processed at 2am.',
			'How much of your business runs that way is a decision, not a default. Some things should wait for a person, and we would rather help you draw that line deliberately than automate everything because it is technically possible.'
		],
		keywords: ['24/7', 'overnight', 'after hours', 'weekends', 'always on']
	},
	{
		id: 'model-outage',
		category: 'ai-assistants',
		question: 'What happens if ChatGPT or another AI service goes down?',
		answer: [
			'We run models in-house for most work, so an outage at a third-party provider does not take your systems with it. Where an external model is used, there is a fallback path to reroute to an alternative.',
			'The design principle is that no single external dependency should be able to stop your business from operating.'
		],
		keywords: ['outage', 'downtime', 'chatgpt down', 'reliability', 'fallback', 'self hosted']
	},
	{
		id: 'where-ai-helps',
		category: 'ai-assistants',
		question: 'How do you decide where AI actually helps?',
		answer: [
			'By starting from the problem rather than the technology. The consultation is where we work out what is costing you time, what is error-prone, and what you would like to stop thinking about — then match the right tool to each, which is often a plain automation rather than AI.',
			'When an AI assistant genuinely fits, we scope it narrowly: a defined task, a defined set of permissions, and a clear boundary on what it is allowed to reach.'
		],
		keywords: [
			'how to integrate ai',
			'ai agents',
			'agents',
			'train ai',
			'custom ai',
			'where to start with ai'
		]
	},

	// ─── Getting found online ───────────────────────────────────────────────────
	{
		id: 'ai-search-visibility',
		category: 'getting-found',
		featured: true,
		question: 'How do I show up when someone asks ChatGPT for a business like mine?',
		answer: [
			'People increasingly ask an AI assistant for a recommendation instead of typing into a search box, and those systems read your business information differently than a person does.',
			'They need consistent, structured, machine-readable details — the same name, service area, and description everywhere they appear — backed by content that actually answers the questions customers ask. We set that up and keep it consistent, so you are present whether someone searches the old way or the new one.'
		],
		keywords: [
			'chatgpt',
			'ai search',
			'geo',
			'generative engine optimization',
			'perplexity',
			'ai visibility',
			'llm'
		]
	},
	{
		id: 'google-ranking',
		category: 'getting-found',
		featured: true,
		question: 'Can you help my business rank higher on Google?',
		answer: [
			'Yes — and the honest version is that it is ongoing work, not a switch you flip.',
			'It starts with the fundamentals: a correct and complete business profile, consistent information everywhere your business is listed, a site that loads fast and plainly describes what you do, and content that answers real questions. Reviews from genuine customers carry significant weight, so part of what we build is making it easy to ask for them at the right moment.',
			'We handle the setup and the upkeep, because the upkeep is where most businesses fall behind.'
		],
		keywords: [
			'google',
			'seo',
			'rank higher',
			'show up in google',
			'google business profile',
			'local seo',
			'search results',
			'get found'
		]
	},
	{
		id: 'social-media',
		category: 'getting-found',
		question: 'Do you handle Facebook and Instagram?',
		answer: [
			'We can help manage a Facebook page and run paid campaigns across Meta’s platforms — Facebook, Instagram, and WhatsApp.',
			'Whether that is worth doing depends on your business. For some trades, word of mouth and search cover it, and ad spend is better used elsewhere. You will get a straight answer on that before you spend anything.'
		],
		keywords: ['facebook', 'instagram', 'meta', 'social media', 'ads', 'advertising', 'promote']
	},
	{
		id: 'customer-reviews',
		category: 'getting-found',
		question: 'How much do online reviews actually matter?',
		answer: [
			'A great deal, and increasingly so. A review is a customer’s public account of whether you did what you said you would do, and both people and AI systems weigh that heavily when deciding who to trust.',
			'The difficulty is that satisfied customers rarely think to leave one. We automate the ask at the point where it is most natural — just after the work is finished — so the credibility builds without you having to chase it.'
		],
		keywords: ['reviews', 'google reviews', 'testimonials', 'reputation', 'ratings', 'stars']
	},

	// ─── Privacy & security ─────────────────────────────────────────────────────
	{
		id: 'data-storage',
		category: 'privacy-security',
		featured: true,
		question: 'Where is my business data stored?',
		answer: [
			'On infrastructure we run ourselves, and we collect only what the system actually needs to work.',
			'Holding less data than more is deliberate — anything not collected is something that cannot be exposed. If a project genuinely requires a third-party service to store something, we will tell you which one and why before it gets built.'
		],
		keywords: ['data storage', 'where is my data', 'servers', 'hosting', 'in house', 'cloud']
	},
	{
		id: 'pii-and-ai',
		category: 'privacy-security',
		question: 'Does my customers’ information get sent to AI companies?',
		answer: [
			'We do not route personally identifiable information through third-party AI models. Most processing runs on models we host ourselves, which is the main reason we can commit to that.',
			'Where an external service genuinely is the right tool, it is scoped to work that does not involve your customers’ personal details.'
		],
		keywords: ['pii', 'personal information', 'privacy', 'customer data', 'llm', 'training data']
	},
	{
		id: 'security-practices',
		category: 'privacy-security',
		question: 'How do you keep the systems secure?',
		answer: [
			'Security is designed in rather than added afterward. In practice that means least privilege — every component and every AI agent gets access only to what its specific task requires, and nothing more.',
			'Alongside that: collecting the minimum data needed, encrypting information in transit and at rest, and putting clear guardrails on what automated systems are permitted to do.',
			'We build to the principles behind the recognized security frameworks — availability, confidentiality, privacy, and processing integrity — because that is the right standard to hold, not because a client demanded it.'
		],
		keywords: [
			'security',
			'encryption',
			'least privilege',
			'guardrails',
			'ai security',
			'safe',
			'breach'
		]
	},
	{
		id: 'sensitive-records',
		category: 'privacy-security',
		question: 'What if my business handles sensitive records?',
		answer: [
			'Then the design questions get more specific, and we would rather raise them early. During consultation we go through what you handle, what rules apply in your field, and what that means for how a system stores and moves information.',
			'We are not a compliance certification service and will not pretend otherwise. But the engineering practices regulated fields depend on — minimal collection, strict access boundaries, keeping sensitive records out of third-party AI models — are how we build regardless of whether a regulation requires it.'
		],
		keywords: [
			'hipaa',
			'gdpr',
			'compliance',
			'regulated',
			'medical records',
			'financial records',
			'confidential',
			'soc 2'
		]
	},
	{
		id: 'website-legal-pages',
		category: 'privacy-security',
		question: 'Does my website need a privacy policy or terms page?',
		answer: [
			'Often, yes — it depends on what you collect and what you sell. If your site takes contact details, books appointments, or processes payments, there is usually good reason to have clear terms and a privacy policy.',
			'We can flag what looks necessary during consultation. For anything carrying real legal exposure you will want an actual attorney, not us.'
		],
		keywords: ['privacy policy', 'terms of service', 'legal', 'disclaimer', 'website legal']
	}
];
