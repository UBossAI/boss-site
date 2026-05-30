export interface PricingTier {
	id: string;
	name: Record<string, string>;
	price: number | null;
	currency: string;
	interval: string;
	description: Record<string, string>;
	features: Record<string, string[]>;
	cta: Record<string, string>;
	highlighted: boolean;
	visible: boolean;
}

export interface EnterpriseTier {
	id: string;
	name: Record<string, string>;
	price: null;
	description: Record<string, string>;
	cta: Record<string, string>;
	visible: boolean;
}

export interface SetupFee {
	display_text: Record<string, string>;
	visible: boolean;
}

export const tiers: PricingTier[] = [
	{
		id: 'starter',
		name: { en: 'Starter', es: 'Inicial', 'pt-BR': 'Inicial' },
		price: 500,
		currency: 'USD',
		interval: 'month',
		description: {
			en: 'Automate your first workflow',
			es: 'Automatiza tu primer proceso',
			'pt-BR': 'Automatize seu primeiro processo'
		},
		features: {
			en: [
				'custom automation workflow',
				'Email & SMS notifications',
				'Monthly performance check-in',
				'Email support'
			],
			es: [
				'automatización personalizada',
				'Notificaciones por email y SMS',
				'Revisión mensual de rendimiento',
				'Soporte por email'
			],
			'pt-BR': [
				'automação personalizada',
				'Notificações por email e SMS',
				'Revisão mensal de desempenho',
				'Suporte por email'
			]
		},
		cta: { en: 'Get Started', es: 'Comienza Ahora', 'pt-BR': 'Comece Agora' },
		highlighted: false,
		visible: true
	},
	{
		id: 'professional',
		name: { en: 'Professional', es: 'Profesional', 'pt-BR': 'Profissional' },
		price: 900,
		currency: 'USD',
		interval: 'month',
		description: {
			en: 'Multiple workflows + business dashboards',
			es: 'Múltiples procesos + paneles de datos',
			'pt-BR': 'Múltiplos processos + painéis de dados'
		},
		features: {
			en: [
				'Up to 4 automation workflows',
				'Business dashboard & analytics',
				'Custom digital forms',
				'Email & SMS notifications',
				'Bi-weekly check-ins',
				'Priority email support'
			],
			es: [
				'Hasta 4 automatizaciones',
				'Panel de datos y analíticas',
				'Formularios digitales personalizados',
				'Notificaciones por email y SMS',
				'Revisiones cada 2 semanas',
				'Soporte prioritario por email'
			],
			'pt-BR': [
				'Até 4 automações',
				'Painel de dados e análises',
				'Formulários digitais personalizados',
				'Notificações por email e SMS',
				'Revisões a cada 2 semanas',
				'Suporte prioritário por email'
			]
		},
		cta: { en: 'Go Professional', es: 'Sube de Nivel', 'pt-BR': 'Suba de Nível' },
		highlighted: true,
		visible: true
	},
	{
		id: 'business',
		name: { en: 'Business', es: 'Empresarial', 'pt-BR': 'Empresarial' },
		price: 2000,
		currency: 'USD',
		interval: 'month',
		description: {
			en: 'Full AI-powered operations',
			es: 'Operaciones completas con IA',
			'pt-BR': 'Operações completas com IA'
		},
		features: {
			en: [
				'Unlimited automation workflows',
				'AI-powered assistants (WhatsApp, Email)',
				'Advanced dashboards & analytics',
				'Custom integrations',
				'Weekly strategy calls',
				'Dedicated support channel'
			],
			es: [
				'Automatizaciones ilimitadas',
				'Asistentes con IA (WhatsApp, Email)',
				'Paneles avanzados y analíticas',
				'Integraciones personalizadas',
				'Llamadas semanales de estrategia',
				'Canal de soporte dedicado'
			],
			'pt-BR': [
				'Automações ilimitadas',
				'Assistentes com IA (WhatsApp, Email)',
				'Painéis avançados e análises',
				'Integrações personalizadas',
				'Chamadas semanais de estratégia',
				'Canal de suporte dedicado'
			]
		},
		cta: { en: 'Contact Us', es: 'Contáctanos', 'pt-BR': 'Fale Conosco' },
		highlighted: false,
		visible: true
	}
];

export const enterprise: EnterpriseTier = {
	id: 'enterprise',
	name: { en: 'Enterprise', es: 'Corporativo', 'pt-BR': 'Corporativo' },
	price: null,
	description: {
		en: 'Custom solutions for larger operations',
		es: 'Soluciones a medida para operaciones grandes',
		'pt-BR': 'Soluções sob medida para operações maiores'
	},
	cta: { en: "Let's Talk", es: 'Hablemos', 'pt-BR': 'Vamos Conversar' },
	visible: true
};

export const setupFee: SetupFee = {
	display_text: {
		en: 'One-time setup fee based on project complexity — discussed during your free consultation.',
		es: 'Tarifa única de configuración según la complejidad — se discute en tu consulta gratuita.',
		'pt-BR': 'Taxa única de configuração conforme a complexidade — discutida na sua consulta gratuita.'
	},
	visible: true
};

export function formatPrice(price: number, currency = 'USD'): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
		minimumFractionDigits: 0
	}).format(price);
}

export function getVisibleTiers(): PricingTier[] {
	return tiers.filter((t) => t.visible);
}
