# Fase 1: DISCOVER (v0.1.x)

**Entender el problema, el contexto y los requisitos**

---

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Versión** | v0.1.x |
| **Fase** | DISCOVER |
| **Duración típica** | 10-20% del proyecto total |
| **Agentes recomendados** | 1-2 (Research, Analysis) |
| **Coordinación** | Sequential o Collaborative |
| **Objetivo principal** | Comprensión profunda del problema |

---

## 🎯 Propósito

La fase DISCOVER es el **fundamento** de todo el proyecto. Aquí se entiende:
- ¿Qué problema estamos resolviendo?
- ¿Para quién?
- ¿Por qué es importante?
- ¿Qué opciones existen?
- ¿Es factible?

**Sin un buen DISCOVER, todo lo demás se construye sobre arena.**

---

## 🎪 Actividades Principales

### 1. Investigación del Problema

**Objetivo**: Entender profundamente el problema.

**Actividades**:
- Investigación de mercado
- Análisis de competencia
- Entrevistas con stakeholders
- Revisión de documentación existente
- Análisis de datos (si disponible)

**Ejemplo (Software)**:
```markdown
# Investigación: Sistema de Autenticación

## Problema
Usuarios tienen que recordar múltiples contraseñas

## Mercado
- 78% de usuarios usan contraseñas débiles por simplicidad
- Aumentan brechas de seguridad por contraseñas reutilizadas
- Soluciones existentes: password managers, SSO, biométricos

## Competencia
- Auth0: $23/mes, completo pero costoso
- Firebase Auth: Gratis hasta cierto punto
- Custom: Control total pero mantenimiento

## Conclusión
Necesitamos solución que balance seguridad y UX
```

**Ejemplo (Libro)**:
```markdown
# Investigación: Libro sobre ADD

## Problema
Developers no saben cómo trabajar efectivamente con AI agents

## Mercado
- Explotan AI coding tools (Cursor, Copilot)
- Pero no hay metodología clara
- Libros existentes demasiado teóricos

## Audiencia
- Developers 3-10 años experiencia
- Equipos pequeños (2-5 personas)
- Quieren prácticas, no teoría

## Conclusión
Libro práctico, con ejemplos reales, paso a paso
```

---

### 2. Identificación de Stakeholders

**Objetivo**: Saber quién está involucrado y qué quiere cada uno.

**Matriz de Stakeholders**:

```markdown
# docs/stakeholders.md

## Stakeholders del Proyecto

| Nombre | Rol | Poder | Interés | Estrategia |
|--------|-----|-------|---------|-----------|
| CEO | Sponsor | Alto | Alto | Mantener satisfecho |
| Product Owner | Decision maker | Alto | Alto | Colaborar activamente |
| Dev Team | Implementadores | Medio | Alto | Informar y consultar |
| End Users | Usuarios finales | Bajo | Alto | Consultar necesidades |
| Legal | Compliance | Medio | Medio | Informar regularmente |

## Comunicación por Stakeholder

### CEO
- **Qué le importa**: ROI, tiempo al mercado
- **Frecuencia**: Mensual
- **Canal**: Email ejecutivo + demo
- **Formato**: Métricas, no detalles técnicos

### Product Owner
- **Qué le importa**: Features, prioridades, deadlines
- **Frecuencia**: Semanal
- **Canal**: Reunión + Slack
- **Formato**: Status + próximos pasos

### Dev Team
- **Qué le importa**: Arquitectura, tecnologías, proceso
- **Frecuencia**: Diario
- **Canal**: Standup + GitHub
- **Formato**: Técnico, decisiones de implementación
```

---

### 3. Definición de Requisitos

**Objetivo**: Documentar QUÉ necesita hacer la solución.

**Tipos de Requisitos**:

#### Funcionales (qué debe hacer)
```markdown
# docs/requirements.md

## Requisitos Funcionales

### RF-001: Autenticación con Email
**Prioridad**: MUST HAVE
**Descripción**: Usuario puede registrarse e iniciar sesión con email
**Criterios de aceptación**:
- [ ] Registro con email + password
- [ ] Validación de formato de email
- [ ] Confirmación por email
- [ ] Login con email + password
- [ ] Recuperación de contraseña

### RF-002: Autenticación Social
**Prioridad**: SHOULD HAVE
**Descripción**: Usuario puede autenticarse con Google/GitHub
**Criterios de aceptación**:
- [ ] Login con Google OAuth
- [ ] Login con GitHub OAuth
- [ ] Sincronización de perfil

### RF-003: Sesiones Persistentes
**Prioridad**: MUST HAVE
**Descripción**: Usuario permanece autenticado entre sesiones
**Criterios de aceptación**:
- [ ] JWT tokens con refresh
- [ ] Expiración configurable
- [ ] Logout en todos los dispositivos
```

#### No Funcionales (cómo debe funcionar)
```markdown
## Requisitos No Funcionales

### RNF-001: Performance
- Tiempo de respuesta login: < 200ms
- Soporte 10,000 usuarios concurrentes
- Disponibilidad: 99.9% (3 nines)

### RNF-002: Seguridad
- Contraseñas hasheadas (bcrypt)
- HTTPS obligatorio
- Rate limiting: 5 intentos/minuto
- 2FA opcional

### RNF-003: Usabilidad
- Login en máximo 3 clicks
- Recuperación de contraseña < 1 minuto
- Interfaz responsive (mobile-first)

### RNF-004: Compliance
- GDPR compliant
- Consentimiento explícito
- Derecho al olvido implementado
```

#### Priorización (MoSCoW)
```markdown
## Priorización de Requisitos

### MUST HAVE (Critical)
- RF-001: Autenticación con Email
- RF-003: Sesiones Persistentes
- RNF-001: Performance básica
- RNF-002: Seguridad mínima

### SHOULD HAVE (Important)
- RF-002: Autenticación Social
- RNF-003: Usabilidad avanzada
- RNF-004: Compliance completo

### COULD HAVE (Nice to have)
- RF-004: Biométricos
- RF-005: Magic links
- RNF-005: Analytics avanzados

### WON'T HAVE (Out of scope)
- Autenticación enterprise (LDAP, SAML)
- Blockchain authentication
```

---

### 4. Evaluación de Opciones

**Objetivo**: Analizar diferentes enfoques antes de decidir.

```markdown
# docs/options-analysis.md

## Opciones Evaluadas

### Opción 1: Build Custom
**Pros**:
- Control total
- No dependencias externas
- Personalización completa

**Contras**:
- Tiempo de desarrollo: 3-4 semanas
- Mantenimiento continuo
- Riesgo de vulnerabilidades

**Costo**: $15,000 (dev time)

### Opción 2: Auth0 (SaaS)
**Pros**:
- Implementación rápida (1-2 días)
- Mantenido por expertos
- Features avanzados listos

**Contras**:
- Costo mensual: $23/mes + $0.05/usuario activo
- Vendor lock-in
- Menos control

**Costo**: $276/año + variable

### Opción 3: Firebase Auth (BaaS)
**Pros**:
- Gratis hasta 50,000 usuarios/mes
- Implementación simple
- Integrado con Firebase

**Contras**:
- Atado a Google Cloud
- Menos flexible que custom
- Limits en free tier

**Costo**: Gratis (hasta límites)

## Decisión Recomendada

**Selección**: Opción 3 (Firebase Auth)

**Razones**:
1. MVP rápido (< 1 semana)
2. Costo inicial cero
3. Escalable (podemos migrar después)
4. Reduce riesgo técnico

**Trade-offs aceptados**:
- Dependencia de Google Cloud (OK para MVP)
- Menos customización (suficiente para v1.0)
```

---

### 5. Análisis de Viabilidad

**Objetivo**: Confirmar que el proyecto es realista.

```markdown
# docs/feasibility.md

## Análisis de Viabilidad

### Viabilidad Técnica
**Pregunta**: ¿Podemos construirlo?

**Análisis**:
- Tecnologías necesarias: Firebase, React, Node.js
- Expertise del equipo: ✅ Tienen experiencia
- Complejidad: Media (7/10)
- Riesgos técnicos: Bajos

**Conclusión**: ✅ VIABLE técnicamente

### Viabilidad Económica
**Pregunta**: ¿Vale la pena económicamente?

**Costos**:
- Desarrollo: $15,000 (2 devs × 3 semanas)
- Infraestructura: $100/mes (Firebase)
- Mantenimiento: $2,000/mes

**Beneficios**:
- Reducción soporte: $5,000/mes (menos password resets)
- Mejora conversión: +15% (UX mejorado)
- Valor anual: $60,000

**ROI**: 300% en primer año

**Conclusión**: ✅ VIABLE económicamente

### Viabilidad Operativa
**Pregunta**: ¿Podemos operarlo?

**Recursos necesarios**:
- 2 developers (tenemos 3) ✅
- 1 designer (tenemos 1) ✅
- DevOps support (tenemos) ✅

**Tiempo**:
- Estimado: 3-4 semanas
- Deadline: 6 semanas
- Buffer: 2 semanas ✅

**Conclusión**: ✅ VIABLE operativamente

### Viabilidad Legal/Compliance
**Pregunta**: ¿Es legal y cumple regulaciones?

**Requisitos**:
- GDPR compliance: Firebase es compliant ✅
- Privacy policy: Necesitamos crear ⚠️
- Terms of service: Necesitamos crear ⚠️

**Riesgos**:
- Almacenamiento de datos sensibles: Mitigado con encriptación
- Transferencia internacional: Firebase tiene data centers EU

**Conclusión**: ✅ VIABLE con trabajo adicional (legal docs)

## Veredicto Final

✅ **PROYECTO VIABLE**

Continuar a fase DESIGN.
```

---

### 6. Documentación de Decisiones

**Objetivo**: Registrar decisiones clave con su contexto y razones.

```markdown
# docs/decisions.md

## Architecture Decision Records (ADR)

### ADR-001: Usar Firebase Auth en lugar de custom

**Fecha**: 2026-01-06
**Estado**: Aceptado
**Contexto**:
- Necesitamos autenticación rápida para MVP
- Equipo pequeño (2 devs)
- Presupuesto limitado

**Decisión**:
Usar Firebase Authentication en lugar de implementación custom

**Razones**:
1. Reduce tiempo de desarrollo de 3-4 semanas a < 1 semana
2. Costo cero para MVP (< 50k usuarios/mes)
3. Mantenimiento por Google, no por nosotros
4. Features listos: social auth, email verification, 2FA

**Consecuencias**:
- ✅ Lanzamiento más rápido
- ✅ Menos bugs de seguridad
- ❌ Dependencia de Google Cloud
- ❌ Menos customización
- ⚠️ Posible migración futura si crecemos mucho

**Alternativas consideradas**:
- Auth0: Más caro ($23/mes)
- Custom: Más tiempo (3-4 semanas)

**Revisión**: Revisar en 6 meses o si llegamos a 40k usuarios

---

### ADR-002: React + TypeScript para frontend

**Fecha**: 2026-01-06
**Estado**: Aceptado
**Contexto**:
- Necesitamos UI moderna y mantenible
- Equipo tiene experiencia con React

**Decisión**:
Usar React con TypeScript

**Razones**:
1. Equipo ya conoce React (no curva de aprendizaje)
2. TypeScript previene bugs (type safety)
3. Ecosistema maduro (librerías, herramientas)
4. Firebase tiene SDK excelente para React

**Consecuencias**:
- ✅ Desarrollo más rápido (familiar)
- ✅ Menos bugs (TypeScript)
- ❌ Bundle size mayor que vanilla JS
- ⚠️ Compile step necesario

**Alternativas consideradas**:
- Vue.js: Menos familiar al equipo
- Svelte: Muy nuevo, menos librerías
- Vanilla JS: Más complejo de mantener

**Revisión**: No planificado (decisión estable)
```

---

## 📦 Entregables de DISCOVER

Al final de esta fase debes tener:

### Documentos Obligatorios

```
docs/
├── discovery.md              ← Resumen de investigación
├── requirements.md           ← Requisitos funcionales y no funcionales
├── stakeholders.md           ← Identificación y estrategia
├── feasibility.md            ← Análisis de viabilidad
├── decisions.md              ← ADRs (Architecture Decision Records)
├── options-analysis.md       ← Comparación de opciones
└── risks.md                  ← Riesgos identificados (opcional pero recomendado)
```

### Templates

**discovery.md**:
```markdown
# Discovery: [Nombre del Proyecto]

## Problema
[Descripción del problema que resolvemos]

## Contexto
[Por qué es importante, quién lo sufre]

## Investigación
[Resumen de investigación de mercado, competencia, etc.]

## Stakeholders
[Ver stakeholders.md para detalle]

## Requisitos Principales
[Ver requirements.md para detalle]

## Opciones Evaluadas
[Ver options-analysis.md para detalle]

## Viabilidad
[Ver feasibility.md para detalle]

## Decisiones Clave
[Ver decisions.md para ADRs]

## Conclusión
[¿Continuamos? ¿Por qué?]

## Próximos Pasos
[Qué sigue en fase DESIGN]
```

---

## ✅ Criterios de Salida

**Antes de avanzar a DESIGN, verifica:**

### Criterio 1: Problema Claramente Entendido
- [ ] Problema articulado en 2-3 frases claras
- [ ] Sabemos quién sufre el problema
- [ ] Entendemos por qué es importante
- [ ] Tenemos datos/evidencia del problema

**Validación**:
```
¿Podemos explicar el problema a alguien ajeno al proyecto
en 2 minutos y que lo entienda?
```

### Criterio 2: Requisitos Definidos y Priorizados
- [ ] Requisitos funcionales listados
- [ ] Requisitos no funcionales listados
- [ ] Priorizados con MoSCoW o similar
- [ ] Criterios de aceptación claros
- [ ] Stakeholders de acuerdo con requisitos

**Validación**:
```
¿Todos los stakeholders firmaron/aprobaron requirements.md?
```

### Criterio 3: Stakeholders Identificados y Alineados
- [ ] Todos los stakeholders identificados
- [ ] Matriz de poder/interés completa
- [ ] Estrategia de comunicación definida
- [ ] Stakeholders clave han dado buy-in

**Validación**:
```
¿Product Owner ha aprobado continuar?
¿CEO está informado y de acuerdo?
```

### Criterio 4: Viabilidad Confirmada
- [ ] Viabilidad técnica: ✅
- [ ] Viabilidad económica: ✅
- [ ] Viabilidad operativa: ✅
- [ ] Viabilidad legal/compliance: ✅
- [ ] Riesgos identificados y aceptados

**Validación**:
```
¿Todos los análisis de feasibility.md son positivos?
¿Riesgos críticos tienen mitigación?
```

### Criterio 5: Decisiones Fundamentales Documentadas
- [ ] Decisiones clave en decisions.md
- [ ] Cada decisión tiene contexto y razones
- [ ] Alternativas consideradas documentadas
- [ ] Consecuencias entendidas y aceptadas

**Validación**:
```
¿Alguien nuevo puede entender por qué tomamos cada decisión?
```

---

## 🚨 Errores Comunes

### ❌ Error 1: Saltar DISCOVER ("Ya sabemos qué hacer")

**Problema**: Sin investigación profunda, construyes lo que crees que necesitan, no lo que realmente necesitan.

**Consecuencia**: Producto que nadie usa, pivotes costosos, re-trabajo.

**Solución**: Invierte tiempo aquí. Es el 10-20% del proyecto pero determina el 80% del éxito.

---

### ❌ Error 2: Requisitos Vagos

**Malo**:
```
- El sistema debe ser rápido
- Debe ser fácil de usar
- Debe ser escalable
```

**Bueno**:
```
- Tiempo de respuesta < 200ms para 95% de requests
- Login en máximo 3 clicks
- Soportar 10,000 usuarios concurrentes
```

---

### ❌ Error 3: No Priorizar

**Problema**: Todo es "importante", nada es crítico.

**Consecuencia**: Se intenta hacer todo, no se termina nada.

**Solución**: MoSCoW estricto. MUST HAVE debe ser < 30% de requisitos.

---

### ❌ Error 4: Ignorar Stakeholders

**Problema**: Solo hablas con developers, no con usuarios/clientes.

**Consecuencia**: Solución técnicamente perfecta que nadie usa.

**Solución**: Entrevista a TODOS los stakeholders, especialmente usuarios finales.

---

### ❌ Error 5: No Documentar Decisiones

**Problema**: "Decidimos usar X", pero sin razón documentada.

**Consecuencia**: 3 meses después nadie recuerda por qué, se cuestiona, se debate de nuevo.

**Solución**: ADRs (Architecture Decision Records) para cada decisión importante.

---

## 🎨 Ejemplos por Dominio

### Ejemplo: Software (SaaS)

**Proyecto**: Sistema de gestión de tareas colaborativo

**DISCOVER**:
```markdown
# Discovery: TaskFlow

## Problema
Equipos pierden tiempo coordinándose por email/Slack

## Investigación
- 67% de workers se sienten overwhelmed por comunicación
- Promedio: 2.5h/día en emails sobre status
- Soluciones existentes: Asana ($10/usuario), Trello (básico)

## Stakeholders
- Product Owner: Necesita MVP en 3 meses
- Dev Team: 3 developers
- Beta Users: 50 empresas pequeñas

## Requisitos MUST HAVE
- Crear/asignar/completar tareas
- Notificaciones en tiempo real
- Mobile responsive

## Viabilidad
- Técnica: ✅ Stack conocido (MERN)
- Económica: ✅ $45k dev + $200/mes infraestructura
- Operativa: ✅ 3 devs suficientes

## Decisión Clave
Usar WebSockets (Socket.io) para real-time en lugar de polling
```

---

### Ejemplo: Libro

**Proyecto**: Libro sobre ADD 2.0

**DISCOVER**:
```markdown
# Discovery: Libro "Agent-Driven Development 2.0"

## Problema
Developers usando AI tools sin metodología estructurada

## Investigación
- Mercado: Cursor tiene 500k usuarios, Copilot 1M+
- Competencia: No hay libros prácticos sobre metodología
- Audiencia: Developers 3-10 años exp, equipos 2-5 personas

## Stakeholders
- Autor: Héctor Prats
- Editor: [Publisher TBD]
- Lectores target: 10,000 copies año 1

## Requisitos MUST HAVE
- Explicar ADD 2.0 completo
- Ejemplos prácticos paso a paso
- Código real + repositorios
- Aplicable más allá de software

## Viabilidad
- Técnica: ✅ Expertise en ADD
- Económica: ✅ Self-publish vs traditional
- Operativa: ✅ 6 meses escritura

## Decisión Clave
Self-publish (Amazon KDP) para control total y mayor margen
```

---

### Ejemplo: Marketing

**Proyecto**: Campaña de lanzamiento de producto

**DISCOVER**:
```markdown
# Discovery: Campaña Lanzamiento TaskFlow

## Problema
Producto nuevo sin awareness, necesitamos 1000 sign-ups

## Investigación
- Target: Startups/SMBs con equipos 5-20 personas
- Canales: LinkedIn Ads ($3 CPC), Content Marketing ($0)
- Competencia: Asana gasta $500k/mes en ads

## Stakeholders
- CMO: Quiere 1000 sign-ups en 3 meses
- Product: Necesita feedback para v1.1
- Sales: Necesita leads calificados

## Requisitos MUST HAVE
- Landing page optimizada (>3% conversion)
- 10 blog posts SEO-optimized
- Campaña LinkedIn Ads ($10k budget)
- Email nurture sequence

## Viabilidad
- Técnica: ✅ Tenemos copywriter + designer
- Económica: ✅ Budget $15k suficiente
- Operativa: ✅ 2 meses ejecución

## Decisión Clave
Focus en content marketing + LinkedIn (orgánico + ads)
No Google Ads (muy caro para B2B SaaS)
```

---

### Ejemplo: Producto Físico

**Proyecto**: Teclado ergonómico

**DISCOVER**:
```markdown
# Discovery: ErgoKey - Teclado Ergonómico

## Problema
Developers sufren RSI por teclados tradicionales

## Investigación
- Mercado: 40% de developers reportan dolor en muñecas
- Competencia: ErgoDox ($350), Kinesis ($400)
- Precio target: $200-250

## Stakeholders
- Founder: Quiere producto diferenciado
- Manufacturers: China vs local
- Beta testers: 100 developers

## Requisitos MUST HAVE
- Split design (ergonómico)
- Hot-swappable switches
- USB-C + Bluetooth
- Open source firmware

## Viabilidad
- Técnica: ✅ Prototipos validados
- Económica: ✅ Unit cost $80, venta $249
- Operativa: ⚠️ Supply chain complejo
- Legal: ✅ CE/FCC certifications requeridos

## Decisión Clave
Manufactura en China (costo), assembly en EU (calidad)
Kickstarter para pre-orders (validación + funding)
```

---

### Ejemplo: Evento

**Proyecto**: Conferencia de desarrollo

**DISCOVER**:
```markdown
# Discovery: ADD Conference 2026

## Problema
No hay conferencias sobre desarrollo con AI agents

## Investigación
- Target: 500 attendees
- Formato: 2 días, talks + workshops
- Competencia: DevConf (1000 people), JSConf (2000)
- Precio: $299 early bird, $399 regular

## Stakeholders
- Organizador: Quiere 500 attendees (break-even)
- Speakers: 15 speakers confirmados
- Sponsors: Necesitamos $100k en sponsors
- Attendees: Developers usando AI tools

## Requisitos MUST HAVE
- Venue: 500 capacity + breakout rooms
- Speakers: 15 talks + 5 workshops
- Fecha: Septiembre 2026
- Streaming para remoto (300 tickets online)

## Viabilidad
- Técnica: ✅ Venues identificados
- Económica: ✅ Break-even en 350 tickets
- Operativa: ⚠️ Team pequeño (4 personas)
- Legal: ✅ Insurance + liability covered

## Decisión Clave
Híbrido (presencial + streaming) para maximizar reach
Sponsors cubren 60% de costos
```

---

## 🛠️ Herramientas Recomendadas

### Para Investigación
- **Google Trends**: Validar interés en mercado
- **SimilarWeb**: Analizar competencia
- **UserInterviews.com**: Reclutar usuarios para entrevistas
- **Typeform**: Surveys
- **Miro/FigJam**: Brainstorming colaborativo

### Para Documentación
- **Notion**: Docs colaborativos
- **Confluence**: Enterprise docs
- **GitHub/GitLab**: Docs en repo (markdown)
- **Miro**: Diagramas, mapas mentales

### Para Stakeholder Management
- **Stakeholdermap.com**: Visualizar stakeholders
- **Excel/Sheets**: Matriz de poder/interés
- **Slack/Teams**: Comunicación

### Para Análisis de Viabilidad
- **Excel Financial Model**: ROI, costos
- **SWOT Analysis**: Fortalezas, debilidades
- **Risk Register**: Gestión de riesgos

---

## 👥 Multi-Agente en DISCOVER

### Estrategia Recomendada: **Collaborative o Sequential**

**NO usar paralelo puro** - DISCOVER requiere coherencia.

### Setup con 2 Agentes:

**Agente 1: Researcher**
- Investiga mercado, competencia
- Hace análisis de viabilidad
- Output: discovery.md, options-analysis.md

**Agente 2: Analyst**
- Define requisitos
- Identifica stakeholders
- Output: requirements.md, stakeholders.md

**Coordinación**:
```
Día 1-3: Researcher investiga
Día 4-5: Analyst define requisitos (usando research)
Día 6: Ambos revisan y consolidan
Día 7: Documento final + decisiones
```

**Branch Strategy**:
```bash
git checkout -b feature/v0.1.x-discover

# Agente 1
git commit -m "discover: market research completed"

# Agente 2 (mismo branch)
git pull
git commit -m "discover: requirements defined based on research"

# Consolidación
git commit -m "discover: phase complete with all deliverables"
git tag v0.1.9
```

---

## 📊 Métricas de Éxito

¿Cómo sabes si DISCOVER fue bueno?

### Durante la Fase
- **Stakeholder interviews**: Mínimo 5-10
- **Requirements gathered**: 20-50 (luego priorizados a 10-15 MUST)
- **Options evaluated**: Mínimo 3
- **Decisions documented**: 3-5 ADRs

### Post-Fase (retrospectiva en DESIGN)
- **Cambios en requisitos**: < 20% cambios en DESIGN
- **Requisitos ambiguos**: < 5% requieren clarificación
- **Stakeholder satisfaction**: > 80% satisfechos con DISCOVER

### Métricas Negativas (red flags)
- ❌ > 50% de requisitos cambian en DESIGN → DISCOVER incompleto
- ❌ Stakeholders clave no consultados → Falta investigación
- ❌ No hay ADRs → Decisiones no justificadas

---

## 📚 Lecturas Recomendadas

- **"The Lean Startup"** - Eric Ries (validación de problema)
- **"The Mom Test"** - Rob Fitzpatrick (entrevistas efectivas)
- **"User Story Mapping"** - Jeff Patton (requisitos)
- **"Inspired"** - Marty Cagan (product discovery)

---

## ❓ FAQ

### ¿Cuánto debe durar DISCOVER?

**Depende del proyecto**:
- Proyecto pequeño (1-2 meses): 1-2 semanas DISCOVER
- Proyecto medio (3-6 meses): 2-4 semanas DISCOVER
- Proyecto grande (6+ meses): 4-8 semanas DISCOVER

**Regla general**: 10-20% del tiempo total del proyecto.

---

### ¿Necesito DISCOVER si "ya sé qué construir"?

**SÍ, SIEMPRE.**

Incluso si crees saberlo, DISCOVER:
- Valida tus asunciones
- Descubre cosas que no sabías
- Documenta el "por qué" para el futuro
- Alinea stakeholders

**Tiempo mínimo**: 3-5 días incluso para proyectos triviales.

---

### ¿Puedo iterar DISCOVER?

**Sí, pero...**

DISCOVER inicial debe ser completo. Pero puedes:
- Revisar en cada versión mayor (v2.0, v3.0)
- Actualizar si mercado cambia
- Refinar requisitos basado en feedback

**Cuidado**: No uses "iterar DISCOVER" como excusa para no hacerlo bien la primera vez.

---

### ¿Qué pasa si no cumplo los criterios de salida?

**NO AVANCES A DESIGN.**

Opciones:
1. **Extender DISCOVER**: Toma el tiempo necesario
2. **Pivot**: Si descubres que el proyecto no es viable, cancela o pivotea
3. **Simplificar scope**: Reduce requisitos a lo esencial

**Nunca**: Ignorar criterios y avanzar. Pagarás el costo 10x después.

---

## ✅ Checklist Final

Antes de marcar DISCOVER como completa:

### Documentación
- [ ] `docs/discovery.md` completo y revisado
- [ ] `docs/requirements.md` con todos los requisitos
- [ ] `docs/stakeholders.md` con matriz completa
- [ ] `docs/feasibility.md` con todos los análisis
- [ ] `docs/decisions.md` con ADRs principales
- [ ] `docs/options-analysis.md` (si aplica)

### Validación
- [ ] Problem statement claro en 2-3 frases
- [ ] Stakeholders clave han aprobado
- [ ] Requisitos priorizados (MoSCoW)
- [ ] Viabilidad confirmada (técnica, económica, operativa)
- [ ] Riesgos identificados y mitigados

### Preparación para DESIGN
- [ ] Alcance claro para DESIGN
- [ ] Equipo listo para comenzar
- [ ] Herramientas necesarias identificadas
- [ ] Timeline de DESIGN estimado

### Git
- [ ] Todo committed en branch `feature/v0.1.x-discover`
- [ ] Tag `v0.1.9` creado
- [ ] Branch merged a `main` (o ready to merge)

---

**Versión**: 2.0.0
**Fase**: DISCOVER (v0.1.x)
**Última actualización**: 2026-01-06
**Próxima fase**: DESIGN (v0.2.x)
