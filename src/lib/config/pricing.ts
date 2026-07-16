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
		name: { en: 'Starter', es: 'Starter', 'pt-BR': 'Starter' },
		price: 500,
		currency: 'USD',
		interval: 'month',
		description: {
			en: 'Your assistant catches every lead',
			es: 'Tu asistente captura cada cliente potencial',
			'pt-BR': 'Seu assistente captura cada lead'
		},
		features: {
			en: [
				'Captures every customer inquiry',
				'Instant notifications when leads come in',
				'Auto-reply sent to your customer',
				'Leads organized in one place',
				'Monthly performance summary',
				'Email support'
			],
			es: [
				'Captura cada consulta de cliente',
				'Notificaciones instantáneas cuando llegan leads',
				'Respuesta automática enviada a tu cliente',
				'Leads organizados en un solo lugar',
				'Resumen mensual de rendimiento',
				'Soporte por email'
			],
			'pt-BR': [
				'Captura cada consulta de cliente',
				'Notificações instantâneas quando leads chegam',
				'Resposta automática enviada ao seu cliente',
				'Leads organizados em um só lugar',
				'Resumo mensal de desempenho',
				'Suporte por email'
			]
		},
		cta: { en: 'Book a Call', es: 'Agenda tu consulta', 'pt-BR': 'Agende sua consulta' },
		highlighted: false,
		visible: true
	},
	{
		id: 'professional',
		name: { en: 'Professional', es: 'Professional', 'pt-BR': 'Professional' },
		price: 800,
		currency: 'USD',
		interval: 'month',
		description: {
			en: 'Your assistant runs the front desk',
			es: 'Tu asistente atiende la recepción',
			'pt-BR': 'Seu assistente gerencia a recepção'
		},
		features: {
			en: [
				'Everything in Starter',
				'Appointment confirmations via SMS',
				'Customers hear back — automatically',
				'Business dashboard — see your numbers',
				'Google Business Profile setup',
				'Bi-weekly check-ins',
				'Priority support'
			],
			es: [
				'Todo lo del plan Starter',
				'Confirmaciones de citas por SMS',
				'Tus clientes reciben respuesta automáticamente',
				'Dashboard de tu negocio — ve tus números',
				'Configuración de Google Business Profile',
				'Revisiones cada 2 semanas',
				'Soporte prioritario'
			],
			'pt-BR': [
				'Tudo do plano Starter',
				'Confirmações de consultas via SMS',
				'Clientes recebem resposta automaticamente',
				'Dashboard do seu negócio — veja seus números',
				'Configuração do Google Business Profile',
				'Revisões a cada 2 semanas',
				'Suporte prioritário'
			]
		},
		cta: { en: 'Book a Call', es: 'Agenda tu consulta', 'pt-BR': 'Agende sua consulta' },
		highlighted: true,
		visible: true
	},
	{
		id: 'professional-plus',
		name: { en: 'Professional Plus', es: 'Professional Plus', 'pt-BR': 'Professional Plus' },
		price: 1200,
		currency: 'USD',
		interval: 'month',
		description: {
			en: 'Your assistant manages operations',
			es: 'Tu asistente gestiona las operaciones',
			'pt-BR': 'Seu assistente gerencia as operações'
		},
		features: {
			en: [
				'Everything in Professional',
				'Automatic review requests after each job',
				'Customer follow-up sequences',
				'Advanced performance dashboard',
				'Multiple intake channels',
				'Weekly check-in call',
				'Dedicated support channel'
			],
			es: [
				'Todo lo del plan Professional',
				'Solicitudes de reseñas automáticas tras cada trabajo',
				'Secuencias de seguimiento al cliente',
				'Dashboard de rendimiento avanzado',
				'Múltiples canales de captación',
				'Llamada semanal de seguimiento',
				'Canal de soporte dedicado'
			],
			'pt-BR': [
				'Tudo do plano Professional',
				'Solicitações automáticas de avaliação após cada trabalho',
				'Sequências de acompanhamento do cliente',
				'Dashboard de desempenho avançado',
				'Múltiplos canais de captação',
				'Chamada semanal de acompanhamento',
				'Canal de suporte dedicado'
			]
		},
		cta: { en: 'Book a Call', es: 'Agenda tu consulta', 'pt-BR': 'Agende sua consulta' },
		highlighted: false,
		visible: true
	}
];

export const enterprise: EnterpriseTier = {
	id: 'enterprise',
	name: {
		en: 'Business & Enterprise',
		es: 'Business & Enterprise',
		'pt-BR': 'Business & Enterprise'
	},
	price: null,
	description: {
		en: 'Built for businesses ready to scale',
		es: 'Construido para negocios listos para crecer',
		'pt-BR': 'Construído para negócios prontos para crescer'
	},
	cta: { en: "Let's Talk", es: 'Hablemos', 'pt-BR': 'Vamos Conversar' },
	visible: true
};

export const setupFee: SetupFee = {
	display_text: {
		en: 'One-time setup fee based on project complexity — discussed during your free consultation.',
		es: 'Tarifa única de configuración según la complejidad — se discute en tu consulta gratuita.',
		'pt-BR':
			'Taxa única de configuração conforme a complexidade — discutida na sua consulta gratuita.'
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
