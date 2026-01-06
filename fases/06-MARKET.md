# Fase 6: MARKET (v0.6.x)

**Preparar materiales, estrategia y comunicación para el lanzamiento**

---

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Versión** | v0.6.x |
| **Fase** | MARKET |
| **Duración típica** | 10-15% del proyecto total |
| **Agentes recomendados** | 2-3 (Marketer, Content Writer, Designer) |
| **Coordinación** | Parallel + Collaborative |
| **Objetivo principal** | Todo listo para el lanzamiento |
| **Dependencias** | VALIDATE debe estar completo |

---

## 🎯 Propósito

La fase MARKET es donde **preparas el lanzamiento** de tu solución.

**Lo que se hace en MARKET**:
- Crear materiales de marketing y comunicación
- Preparar documentación de usuario
- Definir estrategia de lanzamiento
- Configurar canales de distribución
- Preparar analytics y tracking

**MARKET ≠ LAUNCH**:
- **MARKET** (v0.6.x): **PREPARAR** el lanzamiento
- **LAUNCH** (v0.7.x): **EJECUTAR** el lanzamiento

**Sin MARKET adecuado = lanzamiento caótico = oportunidad perdida**

---

## 🎪 Actividades Principales

### 1. Creación de Materiales de Marketing

**Objetivo**: Crear todo el contenido promocional necesario.

#### Materiales Clave

**Para Software**:
- Landing page
- Product description
- Screenshots/demos
- Video demo (opcional)
- Release announcement (blog post)
- Social media posts
- Email announcement

**Para Libro**:
- Book description (tiendas)
- Cover design final
- Sample chapter/excerpt
- Author bio
- Marketing one-pager
- Press release
- Social media graphics

**Para Marketing Campaign**:
- Ad creatives (múltiples variantes)
- Landing page copy
- Email sequences
- Social media calendar
- Blog content
- Case studies/testimonials

**Ejemplo (Software)**:
```markdown
# Marketing Materials Checklist

## Landing Page
- [ ] Hero section: Value proposition clara
- [ ] Features section: 3-5 features principales con screenshots
- [ ] Social proof: Testimonials o logos de clientes
- [ ] CTA: "Start Free Trial" botón prominente
- [ ] FAQ section: 5-7 preguntas frecuentes

## Product Description
- [ ] One-liner (10 palabras): "Reduce checkout time from 5min to <2min"
- [ ] Short description (50 palabras): Para directorios
- [ ] Long description (200 palabras): Para blog/press release
- [ ] Bullet points: 5 beneficios clave

## Visual Assets
- [ ] Screenshots: Homepage, checkout flow (before/after), mobile
- [ ] Demo video: 60-90 segundos, narrado
- [ ] GIFs: Checkout flow en acción
- [ ] Social media graphics: 3 variantes (Twitter, LinkedIn, Instagram)

## Announcement Content
- [ ] Blog post: "Introducing New Checkout Experience"
- [ ] Email to users: Announcement + benefits
- [ ] Social posts: Twitter thread (5 tweets), LinkedIn post
- [ ] Press release: Para tech media

## Analytics Setup
- [ ] Google Analytics: Goals configured
- [ ] Mixpanel: Events tracked
- [ ] Hotjar: Heatmaps configured
- [ ] Email open/click tracking
```

---

### 2. Preparación de Documentación de Usuario

**Objetivo**: Usuarios pueden empezar a usar la solución sin fricciones.

#### Tipos de Documentación

**Para Software**:
- User guide / Getting started
- FAQ
- Tutorials / How-tos
- Video tutorials (opcional)
- API documentation (si aplica)
- Troubleshooting guide

**Para Libro**:
- Table of contents (preview)
- Sample chapter
- Author's note / Introduction
- How to read this book
- Resources / Bibliography

**Para Marketing Campaign**:
- Campaign brief (para equipo interno)
- Brand guidelines
- Messaging framework
- Response templates (para soporte)

**Ejemplo (Software)**:
```markdown
# docs/user-docs.md

## Getting Started Guide

### Welcome to New Checkout!

Our new checkout experience reduces purchase time from 5 minutes to under 2 minutes.

### What's New

1. **3-Step Checkout** (vs 7 steps before)
   - Step 1: Shipping info (auto-filled)
   - Step 2: Payment
   - Step 3: Review & confirm

2. **Apple Pay & Google Pay**
   - Checkout in 1 tap

3. **Guest Checkout**
   - No account needed

### How to Use

#### First-Time Purchase
1. Add items to cart
2. Click "Checkout"
3. Enter shipping info (saved for next time)
4. Select payment method
5. Review & confirm

#### Returning Customer
1. Add items to cart
2. Click "Checkout"
3. Info auto-filled ✨
4. Confirm & pay

### Frequently Asked Questions

**Q: Do I need to create an account?**
A: No! You can checkout as guest. But creating account saves time on future purchases.

**Q: Is my payment info secure?**
A: Yes. We use Stripe (industry-leading security). We never store your full card number.

**Q: Can I use Apple Pay?**
A: Yes! If you have Apple Pay configured on your device, select it at checkout.

[... more FAQs]

### Troubleshooting

**Issue: Apple Pay not showing**
- Make sure you're on Safari (iOS) or Chrome (Android)
- Verify Apple Pay is configured in Settings
- Try refreshing the page

[... more troubleshooting]

### Need Help?

- Email: support@example.com
- Live chat: Available 9am-5pm EST
- FAQs: example.com/faq
```

---

### 3. Estrategia de Lanzamiento

**Objetivo**: Definir CÓMO y CUÁNDO lanzarás.

#### Launch Strategy Document

**Plantilla**:
```markdown
# docs/launch-strategy.md

## Objetivos del Lanzamiento

**Objetivo primario**:
[Ej: Alcanzar 1,000 usuarios activos en primeros 30 días]

**Objetivos secundarios**:
- [Objetivo 2]
- [Objetivo 3]

## Target Audience

**Segmento primario**: [Descripción]
**Segmento secundario**: [Descripción]

## Mensajes Clave

**Value proposition**:
"[One-liner que comunica el valor único]"

**Key messages**:
1. [Mensaje 1]: [Beneficio tangible]
2. [Mensaje 2]: [Diferenciador vs competencia]
3. [Mensaje 3]: [Social proof / credibilidad]

## Canales de Lanzamiento

### Canal 1: [Ej: Email to existing users]
- **Audiencia**: 50,000 users
- **Mensaje**: "New checkout is here - 70% faster"
- **CTA**: "Try it now"
- **Timeline**: Launch day (9am EST)
- **Owner**: [Nombre]

### Canal 2: [Ej: Product Hunt]
- **Audiencia**: Tech early adopters
- **Mensaje**: "Fastest mobile checkout for e-commerce"
- **Timeline**: Launch day (12:01am PST)
- **Owner**: [Nombre]

[... más canales]

## Timeline de Lanzamiento

### Pre-Launch (1 semana antes)
- [ ] D-7: Teaser en redes sociales
- [ ] D-5: Email preview a VIP customers
- [ ] D-3: Press embargo release
- [ ] D-1: Final testing, team briefing

### Launch Day
- [ ] 12:01am: Product Hunt post live
- [ ] 9:00am: Email blast to users
- [ ] 10:00am: Blog post published
- [ ] 11:00am: Social media announcement
- [ ] 2:00pm: Monitor metrics, respond to feedback

### Post-Launch (primera semana)
- [ ] D+1: Follow-up email to non-openers
- [ ] D+3: Share early metrics/wins
- [ ] D+7: Thank you post + testimonials

## Métricas de Éxito

| Métrica | Target (30 días) | Tracking |
|---------|------------------|----------|
| New users | 1,000 | Mixpanel |
| Conversion rate | 60% | GA4 |
| NPS | 70+ | Typeform |
| Social mentions | 100+ | Mention.com |

## Presupuesto

- Paid ads: $5,000
- Influencer partnerships: $3,000
- PR tools: $500
- Contingencia: $1,500
**Total**: $10,000

## Riesgos y Mitigación

**Riesgo 1**: Bugs críticos en launch day
- Mitigación: Testing exhaustivo, rollback plan listo

**Riesgo 2**: Low initial traction
- Mitigación: Paid ads budget ready, influencer partnerships prepped

[... más riesgos]
```

**Ejemplo (Libro)**:
```markdown
# Launch Strategy: ADD 2.0 Book

## Objetivos del Lanzamiento

**Objetivo primario**: 500 copias vendidas en primeros 30 días

**Objetivos secundarios**:
- Rating > 4.5/5 en Amazon
- 20+ reviews en primer mes
- 1,000+ newsletter signups

## Target Audience

**Segmento primario**: Developers usando AI coding tools (Cursor, Claude, etc.)
**Segmento secundario**: Technical founders building with AI

## Mensajes Clave

**Value proposition**:
"The practical guide to building complex projects with AI agents"

**Key messages**:
1. Real methodology used in production: Not theory, battle-tested
2. Examples from real projects: Learn from actual ADD implementations
3. For teams of 1-10: Scales from solo to small team

## Canales de Lanzamiento

### Canal 1: Email List (5,000 subscribers)
- **Mensaje**: "ADD 2.0 is here - Now for any project, not just code"
- **CTA**: "Get the book" (link to Amazon)
- **Timeline**: Launch day 9am EST
- **Owner**: Héctor

### Canal 2: Twitter/X
- **Audiencia**: 10K followers + tech community
- **Formato**: Thread (10 tweets)
- **Timeline**: Launch day 10am EST
- **Owner**: Héctor

### Canal 3: Product Hunt
- **Positioning**: "Methodology for AI-driven development"
- **Timeline**: Launch day 12:01am PST
- **Owner**: Héctor + community

### Canal 4: Dev.to / Hashnode
- **Formato**: Blog post "How we used ADD to build X"
- **Timeline**: D+2
- **Owner**: Héctor

## Timeline de Lanzamiento

### Pre-Launch
- [ ] D-14: Teaser "New book coming"
- [ ] D-7: Share table of contents
- [ ] D-3: Share sample chapter free
- [ ] D-1: Final review, Amazon page ready

### Launch Day
- [ ] 9:00am: Email to list
- [ ] 10:00am: Twitter thread
- [ ] 11:00am: LinkedIn post
- [ ] Product Hunt (midnight PST)

### Post-Launch
- [ ] D+1: Share early reactions/reviews
- [ ] D+3: Case study blog post
- [ ] D+7: Thank you + ask for reviews
- [ ] D+14: First metrics report

## Pricing Strategy

- **Ebook**: $29
- **Paperback**: $49
- **Bundle**: $59 (ebook + paperback)

**Launch special**: 30% off first week ($20 ebook, $34 paperback)

## Métricas de Éxito

| Métrica | Target (30 días) | Tracking |
|---------|------------------|----------|
| Copies sold | 500 | Amazon Dashboard |
| Amazon rating | 4.5+ | Amazon |
| Reviews | 20+ | Amazon |
| Newsletter signups | 1,000 | ConvertKit |

## Riesgos y Mitigación

**Riesgo 1**: Low initial sales
- Mitigación: Discount first week, partnerships with influencers

**Riesgo 2**: Bad reviews
- Mitigación: Beta readers validated content, quick response to feedback
```

---

### 4. Preparación de Canales

**Objetivo**: Todos los canales listos para activar en LAUNCH.

#### Checklist de Canales

**Para Software**:
- [ ] Landing page deployed (staging → production ready)
- [ ] App stores (si aplica): Listing creado, screenshots cargados
- [ ] Social media: Posts programados
- [ ] Email: Campaigns creadas, segmentos listos
- [ ] Paid ads: Campaigns configuradas pero pausadas
- [ ] Support channels: Live chat configurado, FAQs listas

**Para Libro**:
- [ ] Amazon/tiendas: Listing completo con cover, description
- [ ] Author website: Landing page con links de compra
- [ ] Email: Welcome sequence configurada
- [ ] Social media: Graphics y posts listos
- [ ] Review copies: Enviadas a 10-20 reviewers

**Para Marketing Campaign**:
- [ ] Landing pages: Deployed y testeadas
- [ ] Ads platforms: Campaigns configuradas (Google, Meta, LinkedIn)
- [ ] Email sequences: Creadas y testeadas
- [ ] Analytics: Pixels instalados, events testeados
- [ ] Budget: Asignado y aprobado

---

### 5. Creación de Assets Promocionales

**Objetivo**: Assets visuales de alta calidad para promoción.

#### Assets Clave

**Para Software**:
- Screenshots (desktop + mobile)
- Product demo video (60-90 seg)
- GIFs animados (features en acción)
- Infographic (benefits visualization)
- Social media graphics (múltiples formatos)

**Para Libro**:
- Cover mockups (3D, flat lay)
- Sample pages/spreads
- Author photo (professional)
- Quote graphics (shareable quotes del libro)
- "Behind the scenes" content

**Para Marketing Campaign**:
- Ad creatives (A/B variants)
- Hero images para landing page
- Social media templates
- Video ads (si aplica)
- Display ads (múltiples tamaños)

**Ejemplo: Video Demo Script (Software)**:
```markdown
# Demo Video Script: New Checkout

**Duration**: 90 seconds
**Format**: Screen recording + narration
**Music**: Upbeat, modern

## Script

[0-10s] Hook
VISUAL: Split screen (old vs new checkout)
NARRATION: "Tired of losing customers at checkout? Watch how our new experience turns 5 minutes into 90 seconds."

[10-30s] Problem
VISUAL: Old checkout (7 steps, frustrating)
NARRATION: "The old checkout was slow. Too many steps. Too much typing. Especially on mobile."

[30-60s] Solution
VISUAL: New checkout walkthrough
NARRATION: "The new checkout is fast. Just 3 steps. Auto-fill shipping. Apple Pay in one tap. Guest checkout - no account needed."

[60-80s] Benefits
VISUAL: Metrics (conversion +80%, time -60%)
NARRATION: "Early users love it. 80% higher conversion. 60% faster. And it's live now."

[80-90s] CTA
VISUAL: "Try it now" CTA
NARRATION: "Try it yourself. Your customers will thank you."

[End screen]
TEXT: "New Checkout - Live Now"
CTA: "Start Shopping"
```

---

### 6. Plan de Medición y Tracking

**Objetivo**: Poder medir el éxito del lanzamiento desde día 1.

#### Analytics Setup

**Para Software**:
```markdown
# Analytics Setup Checklist

## Google Analytics 4
- [ ] Property configurada
- [ ] Events definidos:
  - checkout_started
  - checkout_completed
  - checkout_abandoned
  - payment_method_selected
  - apple_pay_used
- [ ] Conversions configuradas
- [ ] Funnels creados
- [ ] Dashboard listo

## Mixpanel
- [ ] Project configurado
- [ ] Events instrumentados
- [ ] Funnels creados:
  - Homepage → Checkout → Purchase
- [ ] Cohort analysis configurado
- [ ] Reports programados (daily)

## Monitoring
- [ ] Datadog: Error tracking
- [ ] Sentry: Exception monitoring
- [ ] Uptime monitoring (Pingdom)

## KPIs Dashboard

| KPI | Tool | Frequency | Alert if |
|-----|------|-----------|----------|
| Conversion rate | Mixpanel | Hourly | < 50% |
| Checkout time (avg) | GA4 | Daily | > 2.5min |
| Error rate | Sentry | Real-time | > 1% |
| Uptime | Pingdom | Real-time | < 99.9% |
| Revenue | Stripe | Daily | -20% vs baseline |
```

**Para Libro**:
```markdown
# Tracking Setup

## Sales Tracking
- [ ] Amazon KDP Dashboard: Daily check
- [ ] Gumroad (direct sales): Analytics configured
- [ ] Affiliate tracking: Links con UTMs

## Marketing Performance
- [ ] Email: ConvertKit analytics
  - Open rate
  - Click rate
  - Conversions to purchase
- [ ] Social: Buffer/Hootsuite analytics
  - Reach
  - Engagement
  - Clicks to Amazon
- [ ] Product Hunt: Upvote tracking

## Reviews & Feedback
- [ ] Amazon reviews: Daily monitor
- [ ] Email feedback: Tag "book-feedback"
- [ ] Social mentions: Mention.com alerts

## KPIs Dashboard (Google Sheet)

| KPI | Target | Actual | Status |
|-----|--------|--------|--------|
| Copies sold (week 1) | 100 | [track] | 🟢/🟡/🔴 |
| Amazon rating | 4.5+ | [track] | 🟢/🟡/🔴 |
| Reviews count | 5+ | [track] | 🟢/🟡/🔴 |
| Newsletter signups | 200 | [track] | 🟢/🟡/🔴 |
```

---

## 📦 Entregables de MARKET

Al finalizar MARKET, debes tener:

- [ ] `docs/marketing-plan.md` - Plan completo de marketing
- [ ] `docs/launch-strategy.md` - Estrategia detallada de lanzamiento
- [ ] `docs/user-docs.md` o `docs/getting-started.md` - Documentación de usuario
- [ ] `docs/faq.md` - Preguntas frecuentes
- [ ] `assets/marketing/` - Todos los materiales promocionales:
  - Landing page (deployed to staging)
  - Screenshots/videos/GIFs
  - Social media graphics
  - Email templates
  - Press release / blog post
- [ ] `docs/analytics-setup.md` - Analytics y tracking configurado
- [ ] Canales preparados y testeados (landing page staging, emails draft, social posts scheduled)

**Todo listo para ACTIVAR en fase LAUNCH.**

---

## ✅ Criterios de Salida

**Para pasar a LAUNCH (v0.7.x), debes cumplir:**

- [ ] **Materiales de marketing completados**: Landing page, screenshots, videos, posts
- [ ] **Documentación de usuario finalizada**: Getting started, FAQ, tutorials
- [ ] **Estrategia de lanzamiento definida y aprobada**: Stakeholders aprobaron el plan
- [ ] **Canales preparados y configurados**: Todo listo para activar (landing, emails, social, ads)
- [ ] **Analytics y tracking configurados**: Dashboards listos, events testeados
- [ ] **Team briefed**: Equipo de soporte, ventas, marketing sabe qué hacer en launch day
- [ ] **Dry run completado**: Simulación del lanzamiento sin issues
- [ ] **Rollback plan listo**: Si algo sale mal, sabemos cómo revertir

**Si todos estos criterios están cumplidos, estás listo para LAUNCH.**

---

## 🚨 Red Flags en MARKET

**Señales de que MARKET está incompleto:**

- ❌ "Lo lanzamos y luego vemos qué hacer con marketing"
- ❌ Landing page no está lista o no está testeada
- ❌ No hay plan de comunicación claro
- ❌ Analytics no configurado (no sabrás si el launch funciona)
- ❌ Team de soporte no sabe que viene el launch
- ❌ Mensajes de marketing no están claros o son inconsistentes
- ❌ No hay materiales visuales (screenshots, videos)

**Si ves estos red flags, NO pases a LAUNCH. Completa MARKET primero.**

---

## 🎯 Ejemplos por Dominio

### Software: Checkout Móvil

**Materiales creados**:
- Landing page con demo interactivo
- Video demo de 90 segundos
- 5 screenshots (before/after)
- Blog post "Introducing New Checkout"
- Email announcement (3 variantes para A/B test)
- Social posts programados (Twitter, LinkedIn)

**Documentación**:
- Getting Started guide (500 palabras)
- FAQ (10 preguntas)
- Troubleshooting guide

**Estrategia**:
- Launch day: Email 50K users + social announcement
- D+1: Paid ads ($5K budget)
- D+3: Customer testimonials
- Target: 60% adoption en 30 días

### Libro: ADD 2.0 Guide

**Materiales creados**:
- Amazon listing completo + cover mockups
- Sample chapter (Chapter 2) publicado gratis
- Author website con landing page
- Email sequence (5 emails)
- 10 social media graphics
- Press release

**Documentación**:
- Table of contents preview
- "How to read this book" guide
- Bonus resources page

**Estrategia**:
- Pre-launch: Sample chapter gratuito
- Launch day: Email list + Twitter thread + Product Hunt
- D+7: Ask for reviews
- Target: 500 copias en 30 días

### Marketing: Landing Page Optimization

**Materiales creados**:
- 3 landing page variants (A/B/C test)
- 5 ad creatives por variant (15 total)
- Email nurture sequence (7 emails)
- Social proof: 5 testimonials + logos
- Video explainer (60 seg)

**Documentación**:
- Campaign brief
- Messaging framework
- Response templates (para inquiries)

**Estrategia**:
- Launch: Activate ads on Google + Meta
- Budget: $10K para 30 días
- Target: Conversión de 1.5% a 4%+
- Daily optimization basado en data

---

## 💡 Tips para un MARKET Exitoso

### 1. Start Early
No dejes MARKET para última semana. Empieza mientras BUILD aún está en progreso.

### 2. Test Everything
Landing page, emails, analytics - testea TODO antes de launch.

### 3. Multiple Variants
Crea múltiples variants de ads, emails, posts. A/B test desde día 1.

### 4. Focus on Benefits, Not Features
❌ "New checkout has 3 steps"
✅ "Checkout in under 2 minutes"

### 5. Social Proof is King
Testimonials, reviews, logos de clientes, métricas reales > marketing copy

### 6. Prepare Support Team
Team de soporte debe saber QUÉ se lanza, CUÁNDO, y CÓMO responder preguntas.

### 7. Have a Rollback Plan
Si el launch falla, ¿cómo comunicas? ¿Cómo reviertes? Plan B ready.

---

## 🔄 Iteración dentro de MARKET

MARKET puede requerir múltiples iteraciones:

```
v0.6.0 → Primer draft de materiales
v0.6.1 → Feedback de stakeholders, ajustes
v0.6.2 → Testing de landing page, analytics
v0.6.3 → Final review, todo aprobado, listo para LAUNCH
```

---

## ➡️ Siguiente Fase: LAUNCH (v0.7.x)

Una vez que MARKET está completo, pasas a **LAUNCH**, donde:
- Activas todos los canales
- Ejecutas el plan de lanzamiento
- Monitores métricas en tiempo real
- Respondes a feedback inicial
- Aseguras que el go-live es smooth

**MARKET prepara, LAUNCH ejecuta.**

---

**Versión**: ADD 2.0
**Fecha**: 2026-01-06
**Autor**: Héctor Prats
