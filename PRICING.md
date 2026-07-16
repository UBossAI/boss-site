## Display Strategy

- **Show 3 tiers publicly** on the website (Starter, Professional, Professional Plus)
- **Tier names stay in English across all locales** (es/pt-BR included) — founder's call, they
  read as clean/understandable brand-style names rather than needing translation. Don't translate
  "Starter"/"Professional"/"Professional Plus" in any locale.
- **Business & Enterprise** — "Let's Talk" CTA, no public price
- Founder's actual pricing model runs ~6 tiers total; only the top 3 are shown publicly, the rest
  are used during sales conversations only. The next tier up from Professional Plus is planned to
  include a business-advisor-style feature (someone who reviews the dashboards with the client and
  breaks down what the numbers mean) — not built/priced yet, just documented here so it isn't lost.
- Setup fees are NEVER shown publicly — discussed during consultation

## Public Tiers (Displayed on Website)

> This block is kept in sync with `src/lib/config/pricing.ts` — that file is the actual runtime
> source of truth; this is the human-readable mirror. Update both together.

```json
{
  "tiers": [
    {
      "id": "starter",
      "name": { "en": "Starter", "es": "Starter", "pt-BR": "Starter" },
      "price": 500,
      "currency": "USD",
      "interval": "month",
      "description": {
        "en": "Your assistant catches every lead",
        "es": "Tu asistente captura cada cliente potencial",
        "pt-BR": "Seu assistente captura cada lead"
      },
      "features": {
        "en": [
          "Captures every customer inquiry",
          "Instant notifications when leads come in",
          "Auto-reply sent to your customer",
          "Leads organized in one place",
          "Monthly performance summary",
          "Email support"
        ],
        "es": [
          "Captura cada consulta de cliente",
          "Notificaciones instantáneas cuando llegan leads",
          "Respuesta automática enviada a tu cliente",
          "Leads organizados en un solo lugar",
          "Resumen mensual de rendimiento",
          "Soporte por email"
        ],
        "pt-BR": [
          "Captura cada consulta de cliente",
          "Notificações instantâneas quando leads chegam",
          "Resposta automática enviada ao seu cliente",
          "Leads organizados em um só lugar",
          "Resumo mensal de desempenho",
          "Suporte por email"
        ]
      },
      "cta": { "en": "Book a Call", "es": "Agenda tu consulta", "pt-BR": "Agende sua consulta" },
      "highlighted": false,
      "visible": true
    },
    {
      "id": "professional",
      "name": { "en": "Professional", "es": "Professional", "pt-BR": "Professional" },
      "price": 800,
      "currency": "USD",
      "interval": "month",
      "description": {
        "en": "Your assistant runs the front desk",
        "es": "Tu asistente atiende la recepción",
        "pt-BR": "Seu assistente gerencia a recepção"
      },
      "features": {
        "en": [
          "Everything in Starter",
          "Appointment confirmations via SMS",
          "Customers hear back — automatically",
          "Business dashboard — see your numbers",
          "Google Business Profile setup",
          "Bi-weekly check-ins",
          "Priority support"
        ],
        "es": [
          "Todo lo del plan Starter",
          "Confirmaciones de citas por SMS",
          "Tus clientes reciben respuesta automáticamente",
          "Dashboard de tu negocio — ve tus números",
          "Configuración de Google Business Profile",
          "Revisiones cada 2 semanas",
          "Soporte prioritario"
        ],
        "pt-BR": [
          "Tudo do plano Starter",
          "Confirmações de consultas via SMS",
          "Clientes recebem resposta automaticamente",
          "Dashboard do seu negócio — veja seus números",
          "Configuração do Google Business Profile",
          "Revisões a cada 2 semanas",
          "Suporte prioritário"
        ]
      },
      "cta": { "en": "Book a Call", "es": "Agenda tu consulta", "pt-BR": "Agende sua consulta" },
      "highlighted": true,
      "visible": true
    },
    {
      "id": "professional-plus",
      "name": { "en": "Professional Plus", "es": "Professional Plus", "pt-BR": "Professional Plus" },
      "price": 1200,
      "currency": "USD",
      "interval": "month",
      "description": {
        "en": "Your assistant manages operations",
        "es": "Tu asistente gestiona las operaciones",
        "pt-BR": "Seu assistente gerencia as operações"
      },
      "features": {
        "en": [
          "Everything in Professional",
          "Automatic review requests after each job",
          "Customer follow-up sequences",
          "Advanced performance dashboard",
          "Multiple intake channels",
          "Weekly check-in call",
          "Dedicated support channel"
        ],
        "es": [
          "Todo lo del plan Professional",
          "Solicitudes de reseñas automáticas tras cada trabajo",
          "Secuencias de seguimiento al cliente",
          "Dashboard de rendimiento avanzado",
          "Múltiples canales de captación",
          "Llamada semanal de seguimiento",
          "Canal de soporte dedicado"
        ],
        "pt-BR": [
          "Tudo do plano Professional",
          "Solicitações automáticas de avaliação após cada trabalho",
          "Sequências de acompanhamento do cliente",
          "Dashboard de desempenho avançado",
          "Múltiplos canais de captação",
          "Chamada semanal de acompanhamento",
          "Canal de suporte dedicado"
        ]
      },
      "cta": { "en": "Book a Call", "es": "Agenda tu consulta", "pt-BR": "Agende sua consulta" },
      "highlighted": false,
      "visible": true
    }
  ],
  "enterprise": {
    "id": "enterprise",
    "name": { "en": "Business & Enterprise", "es": "Business & Enterprise", "pt-BR": "Business & Enterprise" },
    "price": null,
    "description": {
      "en": "Built for businesses ready to scale",
      "es": "Construido para negocios listos para crecer",
      "pt-BR": "Construído para negócios prontos para crescer"
    },
    "cta": { "en": "Let's Talk", "es": "Hablemos", "pt-BR": "Vamos Conversar" },
    "visible": true
  },
  "setup_fee": {
    "display_text": {
      "en": "One-time setup fee based on project complexity — discussed during your free consultation.",
      "es": "Tarifa única de configuración según la complejidad — se discute en tu consulta gratuita.",
      "pt-BR": "Taxa única de configuração conforme a complexidade — discutida na sua consulta gratuita."
    },
    "visible": true
  }
}
```
## Internal Tiers (NOT Displayed — Sales Use Only)

Founder's model runs ~6 tiers total; only Starter/Professional/Professional Plus are public.
Beyond Professional Plus, the founder envisions a tier with a business-advisor-style feature — a
partner who reviews the dashboards with the client and breaks down what the numbers mean, rather
than just showing raw data. Not scoped/priced yet.

| Tier | Monthly | Use Case |
|------|---------|----------|
| Business Plus | $2,500 | Heavy usage + priority support + WhatsApp bot |
| Corporate | Custom | Enterprise-level, multi-location, custom SLAs |

Note: this table is likely incomplete relative to the founder's actual ~6-tier model — update as
the higher tiers get defined.

### How to Add/Edit Tiers
1. Edit the JSON structure above
2. Update src/lib/config/pricing.ts to match
3. Set "visible": true/false to show/hide any tier
4. Set "highlighted": true on the tier you want visually emphasized (recommended badge)
5. Translations are inline per tier — update all 3 locales when changing copy


