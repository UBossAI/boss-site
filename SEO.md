# SEO.md

> **Location:** `boss-site/SEO.md`
> **PURPOSE:** Single source of truth for SEO keyword targets across all 3 languages.
> Update this file to add/remove terms. The site should incorporate these naturally
> into page titles, meta descriptions, headings, body copy, and alt text.

## How to Use This File

- Keywords listed here should be woven into page content **naturally** — no keyword stuffing
- Each page should target 2-3 primary keywords and 3-5 secondary keywords
- Meta titles: 50-60 characters, include primary keyword
- Meta descriptions: 150-160 characters, include primary + secondary keyword
- Use keywords in H1, H2 headings where it reads naturally
- Image alt text should incorporate relevant keywords
- URL slugs should be keyword-friendly and locale-appropriate

## English Keywords

### Primary (High Priority)
| Keyword | Target Page |
|---------|-------------|
| AI automation Boston | Homepage, Services |
| AI for small business | Homepage, Services |
| business automation services | Services |
| AI consulting Boston | Homepage, About |
| workflow automation for trades | Services |
| AI-powered business tools | Services, Pricing |

### Secondary
| Keyword | Target Page |
|---------|-------------|
| automation for contractors | Services |
| AI for landscaping business | Services |
| AI for cleaning companies | Services |
| small business automation Massachusetts | Homepage |
| custom AI solutions | Services, Pricing |
| business dashboard analytics | Services |
| WhatsApp business automation | Services |
| digital forms for contractors | Services |
| bilingual AI services Boston | Homepage, About |
| Spanish speaking tech consultant | About |
| Portuguese business services Boston | About |

### Long-Tail
| Keyword |
|---------|
| how to automate my small business with AI |
| AI automation for trades businesses near me |
| affordable AI tools for contractors |
| Spanish speaking AI consultant Massachusetts |
| automate customer intake forms |
| business analytics dashboard for small business |

## Spanish Keywords (Central American / Mexican Register)

### Primary
| Keyword | Target Page |
|---------|-------------|
| automatización con inteligencia artificial | Homepage, Services |
| automatización para negocios | Homepage, Services |
| consultoría de IA en Boston | Homepage, About |
| optimiza tu negocio | Homepage |
| digitaliza tus documentos | Services |

### Secondary — Conversational / Marketing Phrases
| Phrase | Usage |
|--------|-------|
| emprende con inteligencia artificial | Hero, CTA sections |
| optimiza tu negocio con IA | Headings, meta |
| visibilidad en la red | Services, SEO benefit messaging |
| mejora tu comunicación | Services (notifications, WhatsApp) |
| digitaliza tus documentos | Services (forms, data) |
| corre tu negocio 24/7 | Hero, value prop — automation runs nonstop |
| mira datos de tu negocio actual | Services (dashboards, analytics) |
| modernidad y simplicidad | About, brand messaging |
| desarrollado específico para tu negocio | Services, pricing — custom solutions |
| automatización para contratistas | Services |
| herramientas de IA para pequeños negocios | Services, Pricing |
| tecnología para landscaping | Services |
| automatiza tu empresa de limpieza | Services |
| formularios digitales para negocios | Services |
| soporte en español | About, Contact |

### Long-Tail
| Keyword |
|---------|
| cómo automatizar mi negocio con inteligencia artificial |
| consultor de IA que habla español en Boston |
| herramientas para hacer crecer mi negocio |
| automatización de formularios para contratistas |
| panel de datos para mi negocio |

## Brazilian Portuguese Keywords

### Primary
| Keyword | Target Page |
|---------|-------------|
| automação com inteligência artificial | Homepage, Services |
| automação para pequenos negócios | Homepage, Services |
| consultoria de IA em Boston | Homepage, About |
| otimize seu negócio | Homepage |
| digitalize seus documentos | Services |

### Secondary — Conversational / Marketing Phrases
| Phrase | Usage |
|--------|-------|
| empreenda com inteligência artificial | Hero, CTA sections |
| otimize seu negócio com IA | Headings, meta |
| visibilidade na internet | Services, SEO benefit messaging |
| melhore sua comunicação | Services (notifications, WhatsApp) |
| digitalize seus documentos | Services (forms, data) |
| seu negócio funcionando 24/7 | Hero, value prop |
| veja os dados do seu negócio em tempo real | Services (dashboards) |
| modernidade e simplicidade | About, brand messaging |
| desenvolvido especificamente para o seu negócio | Services, pricing |
| automação para empreiteiros | Services |
| ferramentas de IA para pequenas empresas | Services, Pricing |
| tecnologia para paisagismo | Services |
| automatize sua empresa de limpeza | Services |
| formulários digitais para negócios | Services |
| suporte em português | About, Contact |

### Long-Tail
| Keyword |
|---------|
| como automatizar meu negócio com inteligência artificial |
| consultor de IA que fala português em Boston |
| ferramentas para fazer seu negócio crescer |
| automação de formulários para empreiteiros |
| painel de dados para meu negócio |

## Structured Data (JSON-LD)

Implement on every page — `LocalBusiness` schema:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "UBOSS LLC",
  "description": "AI-as-a-Service consulting for trades and small businesses in Greater Boston",
  "url": "https://uboss.ai",
  "email": "support@uboss.ai",
  "areaServed": {
    "@type": "Place",
    "name": "Greater Boston, Massachusetts"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 42.3601,
      "longitude": -71.0589
    },
    "geoRadius": "50000"
  },
  "knowsLanguage": ["en", "es", "pt-BR"],
  "priceRange": "$$",
  "sameAs": []
}
``` 
### hreflang Tags (Every Page)
```html
<link rel="alternate" hreflang="en" href="https://uboss.ai/en/{page}" />
<link rel="alternate" hreflang="es" href="https://uboss.ai/es/{page}" />
<link rel="alternate" hreflang="pt-BR" href="https://uboss.ai/pt-BR/{page}" />
<link rel="alternate" hreflang="x-default" href="https://uboss.ai/en/{page}" />
```

## Sitemap
- Auto-generate sitemap.xml with all locale variants for every page.
- Include lastmod, changefreq, and priority attributes.

## Robots.txt
User-agent: *
Allow: /
Sitemap: https://uboss.ai/sitemap.xml

Disallow: /api/

### Adding / Removing Keywords
- Add new keywords to the relevant language section and table above
- Note which page(s) should target each keyword
- Update page content, meta tags, and headings to incorporate naturally
- Re-run Lighthouse SEO audit after changes