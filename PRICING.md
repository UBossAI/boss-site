## Display Strategy

- **Show 3 tiers publicly** on the website (Starter, Professional, Business)
- **Enterprise/Corporate** — "Contact us" CTA, no public price
- Internal tiers (Professional Plus, Business Plus) exist but are NOT shown on the website — used during sales conversations only
- Setup fees are NEVER shown publicly — discussed during consultation

## Public Tiers (Displayed on Website)

```json
{
  "tiers": [
    {
      "id": "starter",
      "name": {
        "en": "Starter",
        "es": "Inicial",
        "pt-BR": "Inicial"
      },
      "price": 500,
      "currency": "USD",
      "interval": "month",
      "description": {
        "en": "Automate your first workflow",
        "es": "Automatiza tu primer proceso",
        "pt-BR": "Automatize seu primeiro processo"
      },
      "features": {
        "en": [
          "1 custom automation workflow",
          "Email & SMS notifications",
          "Monthly performance check-in",
          "Email support"
        ],
        "es": [
          "1 automatización personalizada",
          "Notificaciones por email y SMS",
          "Revisión mensual de rendimiento",
          "Soporte por email"
        ],
        "pt-BR": [
          "1 automação personalizada",
          "Notificações por email e SMS",
          "Revisão mensal de desempenho",
          "Suporte por email"
        ]
      },
      "cta": {
        "en": "Get Started",
        "es": "Comienza Ahora",
        "pt-BR": "Comece Agora"
      },
      "highlighted": false,
      "visible": true
    },
    {
      "id": "professional",
      "name": {
        "en": "Professional",
        "es": "Profesional",
        "pt-BR": "Profissional"
      },
      "price": 900,
      "currency": "USD",
      "interval": "month",
      "description": {
        "en": "Multiple workflows + business dashboards",
        "es": "Múltiples procesos + paneles de datos",
        "pt-BR": "Múltiplos processos + painéis de dados"
      },
      "features": {
        "en": [
          "Up to 3 automation workflows",
          "Business dashboard & analytics",
          "Custom digital forms",
          "Email & SMS notifications",
          "Bi-weekly check-ins",
          "Priority email support"
        ],
        "es": [
          "Hasta 3 automatizaciones",
          "Panel de datos y analíticas",
          "Formularios digitales personalizados",
          "Notificaciones por email y SMS",
          "Revisiones cada 2 semanas",
          "Soporte prioritario por email"
        ],
        "pt-BR": [
          "Até 3 automações",
          "Painel de dados e análises",
          "Formulários digitais personalizados",
          "Notificações por email e SMS",
          "Revisões a cada 2 semanas",
          "Suporte prioritário por email"
        ]
      },
      "cta": {
        "en": "Go Professional",
        "es": "Sube de Nivel",
        "pt-BR": "Suba de Nível"
      },
      "highlighted": true,
      "visible": true
    },
    {
      "id": "business",
      "name": {
        "en": "Business",
        "es": "Empresarial",
        "pt-BR": "Empresarial"
      },
      "price": 2000,
      "currency": "USD",
      "interval": "month",
      "description": {
        "en": "Full AI-powered operations",
        "es": "Operaciones completas con IA",
        "pt-BR": "Operações completas com IA"
      },
      "features": {
        "en": [
          "Unlimited automation workflows",
          "AI-powered assistants (WhatsApp, Email)",
          "Advanced dashboards & analytics",
          "Custom integrations",
          "Weekly strategy calls",
          "Dedicated support channel"
        ],
        "es": [
          "Automatizaciones ilimitadas",
          "Asistentes con IA (WhatsApp, Email)",
          "Paneles avanzados y analíticas",
          "Integraciones personalizadas",
          "Llamadas semanales de estrategia",
          "Canal de soporte dedicado"
        ],
        "pt-BR": [
          "Automações ilimitadas",
          "Assistentes com IA (WhatsApp, Email)",
          "Painéis avançados e análises",
          "Integrações personalizadas",
          "Chamadas semanais de estratégia",
          "Canal de suporte dedicado"
        ]
      },
      "cta": {
        "en": "Contact Us",
        "es": "Contáctanos",
        "pt-BR": "Fale Conosco"
      },
      "highlighted": false,
      "visible": true
    }
  ],
  "enterprise": {
    "id": "enterprise",
    "name": {
      "en": "Enterprise",
      "es": "Corporativo",
      "pt-BR": "Corporativo"
    },
    "price": null,
    "description": {
      "en": "Custom solutions for larger operations",
      "es": "Soluciones a medida para operaciones grandes",
      "pt-BR": "Soluções sob medida para operações maiores"
    },
    "cta": {
      "en": "Let's Talk",
      "es": "Hablemos",
      "pt-BR": "Vamos Conversar"
    },
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

| Tier | Monthly | Use Case |
|------|---------|----------|
| Professional Plus | $1,200 | Advanced features + analytics, higher token usage |
| Business Plus | $2,500 | Heavy usage + priority support + WhatsApp bot |
| Corporate | Custom | Enterprise-level, multi-location, custom SLAs |

### How to Add/Edit Tiers
1. Edit the JSON structure above
2. Update src/lib/config/pricing.ts to match
3. Set "visible": true/false to show/hide any tier
4. Set "highlighted": true on the tier you want visually emphasized (recommended badge)
5. Translations are inline per tier — update all 3 locales when changing copy


