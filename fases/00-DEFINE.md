# Fase 0: DEFINE (v0.0.x)

**Definir claramente el problema, objetivo y alcance del proyecto**

---

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Versión** | v0.0.x |
| **Fase** | DEFINE |
| **Duración típica** | 5-10% del proyecto total |
| **Agentes recomendados** | 1-2 (Problem Definition, Scoping) |
| **Coordinación** | Collaborative |
| **Objetivo principal** | Definición clara del problema y alcance |
| **Dependencias** | Ninguna (es la primera fase) |

---

## 🎯 Propósito

La fase DEFINE es el **punto de partida** de todo proyecto ADD. Antes de investigar soluciones (DISCOVER) o diseñar (DESIGN), necesitas saber:

- ¿QUÉ problema estamos resolviendo?
- ¿PARA QUIÉN es esto?
- ¿POR QUÉ es importante hacerlo AHORA?
- ¿QUÉ está incluido y QUÉ NO?
- ¿CÓMO sabremos que tuvimos éxito?

**Sin un DEFINE claro, el proyecto pierde foco y crece sin control.**

---

## 🎪 Actividades Principales

### 1. Definición del Problema/Oportunidad

**Objetivo**: Articular claramente QUÉ problema estamos resolviendo o qué oportunidad aprovechando.

**Preguntas clave**:
- ¿Cuál es el problema específico?
- ¿Qué tan grande/importante es este problema?
- ¿Quién experimenta este problema?
- ¿Por qué es importante resolverlo ahora?
- ¿Qué pasa si NO lo resolvemos?

**Ejemplo (Software)**:
```markdown
# Problem Statement

## El Problema
Los usuarios de nuestra app tardan en promedio 5 minutos en completar
el proceso de checkout, lo que resulta en una tasa de abandono del 67%.

## Impacto
- Pérdida de ~$500K mensuales en ventas
- 2,000 carritos abandonados por día
- Feedback negativo en reviews (rating 3.2/5)

## Por qué ahora
- Competencia lanzó checkout en 1-click
- Q4 es nuestra temporada alta (60% de ventas anuales)
- Tenemos recursos de desarrollo disponibles

## Consecuencias de NO resolver
- Pérdida proyectada de $2M en Q4
- Posible pérdida de market share
- Deterioro continuo de reputación
```

**Ejemplo (Libro)**:
```markdown
# Problem Statement

## El Problema
Los desarrolladores que usan AI coding tools (Cursor, Claude, Copilot)
no tienen una metodología estructurada para trabajar en proyectos complejos
con múltiples agentes de IA.

## Impacto
- Proyectos se desorganizan después de v0.3.x
- Coordinación de agentes es caótica
- No hay documentación clara del proceso
- Pérdida de contexto entre sesiones

## Por qué ahora
- Explosión de AI coding tools en 2024-2025
- Mercado en crecimiento (100M+ developers usando AI)
- Primera oportunidad de establecer estándares

## Consecuencias de NO resolver
- Cada equipo inventa su propio proceso (ineficiente)
- Proyectos AI-driven siguen siendo caóticos
- Pérdida de productividad potencial
```

**Ejemplo (Marketing)**:
```markdown
# Problem Statement

## El Problema
Nuestra landing page de producto tiene una tasa de conversión de solo 1.5%,
muy por debajo del promedio de la industria (3-5%).

## Impacto
- Cost per acquisition (CPA) de $180 vs objetivo de $80
- Necesitamos 3x más tráfico para cumplir objetivos
- Budget de ads se agota rápido sin ROI adecuado

## Por qué ahora
- Lanzamiento de nuevo producto en 2 meses
- Competencia aumentando inversión en ads
- Temporada de compras se acerca

## Consecuencias de NO resolver
- No alcanzamos target de 1,000 clientes en Q1
- Inversión en ads (200K) sin retorno adecuado
- Pérdida de momentum del lanzamiento
```

---

### 2. Identificación de Audiencia/Usuarios Objetivo

**Objetivo**: Definir claramente PARA QUIÉN es este proyecto.

**Preguntas clave**:
- ¿Quiénes son los usuarios/beneficiarios principales?
- ¿Qué características demográficas tienen?
- ¿Cuáles son sus necesidades específicas?
- ¿Qué usuarios NO son nuestro target?

**Plantilla**:
```markdown
# docs/target-audience.md

## Audiencia Primaria

**Quiénes son**:
- [Descripción demográfica]
- [Descripción psicográfica]
- [Nivel de experiencia/conocimiento]

**Sus necesidades**:
- [Necesidad 1]
- [Necesidad 2]
- [Necesidad 3]

**Sus frustraciones actuales**:
- [Frustración 1]
- [Frustración 2]

## Audiencia Secundaria

[Mismo formato]

## NO son nuestro target

**Explícitamente excluimos**:
- [Grupo 1]: Por qué no
- [Grupo 2]: Por qué no
```

**Ejemplo (Software)**:
```markdown
# Target Audience

## Audiencia Primaria

**Quiénes son**:
- E-commerce shoppers en móvil
- Edad: 25-45 años
- Compran 2-5 veces al mes online
- Valoran velocidad sobre todo

**Sus necesidades**:
- Checkout rápido (< 2 minutos)
- Seguridad garantizada
- Métodos de pago modernos (Apple Pay, Google Pay)
- Poder guardar info para próximas compras

**Sus frustraciones actuales**:
- Formularios largos
- Tener que crear cuenta
- Proceso lento en móvil
- Re-escribir info en cada compra

## NO son nuestro target

**Explícitamente excluimos**:
- Compradores B2B: Tienen proceso diferente (órdenes de compra, aprobaciones)
- Compradores ocasionales (< 1 vez/año): No justifica optimización
```

---

### 3. Definición de Objetivos

**Objetivo**: Establecer objetivos ESPECÍFICOS y MEDIBLES.

**Framework: SMART Goals**
- Specific (Específico)
- Measurable (Medible)
- Achievable (Alcanzable)
- Relevant (Relevante)
- Time-bound (Con plazo)

**Plantilla**:
```markdown
# docs/objectives.md

## Objetivo Principal

[Un objetivo principal claro y medible]

## Objetivos Secundarios

1. **Objetivo 1**
   - Métrica: [KPI específico]
   - Meta: [Valor target]
   - Plazo: [Timeline]
   - Cómo mediremos: [Herramienta/método]

2. **Objetivo 2**
   [Mismo formato]

## KPIs Clave

| KPI | Valor Actual | Target | Plazo | Herramienta |
|-----|--------------|--------|-------|-------------|
| [KPI 1] | [Valor] | [Target] | [Fecha] | [Tool] |
| [KPI 2] | [Valor] | [Target] | [Fecha] | [Tool] |

## Qué NO es el objetivo

[Clarificar qué NO intentamos lograr]
```

**Ejemplo (Software)**:
```markdown
# Objectives

## Objetivo Principal

Reducir el tiempo de checkout a menos de 2 minutos en móvil,
aumentando la tasa de conversión de 33% a 60%+ para Diciembre 2026.

## Objetivos Secundarios

1. **Reducir abandonos de carrito**
   - Métrica: Tasa de abandono
   - Meta: De 67% a < 40%
   - Plazo: 3 meses
   - Cómo mediremos: Google Analytics, funnel analysis

2. **Mejorar satisfacción de usuario**
   - Métrica: NPS score en proceso de checkout
   - Meta: De 32 a 70+
   - Plazo: 3 meses
   - Cómo mediremos: Survey post-checkout

3. **Incrementar revenue**
   - Métrica: Revenue mensual
   - Meta: +$300K/mes (de abandonos recuperados)
   - Plazo: 4 meses
   - Cómo mediremos: Revenue tracking

## KPIs Clave

| KPI | Actual | Target | Plazo | Herramienta |
|-----|--------|--------|-------|-------------|
| Tiempo checkout (móvil) | 5min | <2min | 3 meses | Google Analytics |
| Tasa conversión | 33% | 60% | 3 meses | Mixpanel |
| Tasa abandono | 67% | <40% | 3 meses | GA4 Funnel |
| NPS checkout | 32 | 70+ | 3 meses | Typeform |
| Revenue recuperado | $0 | $300K/mes | 4 meses | Stripe Dashboard |

## Qué NO es el objetivo

- NO intentamos rediseñar toda la app
- NO intentamos optimizar checkout en desktop (ya está bien)
- NO intentamos agregar features nuevas al checkout
- NO intentamos cambiar métodos de pago (solo mejorar UX)
```

---

### 4. Establecimiento de Alcance

**Objetivo**: Definir claramente QUÉ está incluido y QUÉ NO.

**El scope negativo (qué NO) es TAN importante como el positivo.**

**Plantilla**:
```markdown
# docs/scope.md

## In Scope (Qué SÍ incluye)

### Funcionalidades/Componentes Incluidos
- [ ] [Componente 1]
- [ ] [Componente 2]
- [ ] [Componente 3]

### Entregables Incluidos
- [ ] [Entregable 1]
- [ ] [Entregable 2]

## Out of Scope (Qué NO incluye)

### Explícitamente EXCLUIDO
- ❌ [Cosa 1]: Razón por qué no
- ❌ [Cosa 2]: Razón por qué no
- ❌ [Cosa 3]: Razón por qué no

## Límites

- **Límite técnico**: [Descripción]
- **Límite de plataforma**: [Descripción]
- **Límite de tiempo**: [Descripción]
- **Límite de presupuesto**: [Descripción]

## Casos Edge que NO cubriremos

- [Edge case 1]
- [Edge case 2]

## Futuras Versiones (No en v1.0)

- [Feature futuro 1]
- [Feature futuro 2]
```

**Ejemplo (Software)**:
```markdown
# Scope: Optimización de Checkout Móvil

## In Scope (Qué SÍ incluye)

### Funcionalidades Incluidas
- [ ] Checkout en 3 pasos (vs 7 actual)
- [ ] Auto-fill de dirección (Google Places API)
- [ ] Apple Pay / Google Pay integration
- [ ] Guest checkout (sin crear cuenta)
- [ ] Guardar info para próximas compras
- [ ] Loading indicators optimizados
- [ ] Validación inline de formularios

### Entregables Incluidos
- [ ] UI/UX rediseñada para móvil
- [ ] Backend optimizado (latencia < 200ms)
- [ ] Tests automatizados
- [ ] Documentación de usuario
- [ ] Monitoring y analytics

## Out of Scope (Qué NO incluye)

### Explícitamente EXCLUIDO
- ❌ Checkout desktop: Ya funciona bien, no tocar
- ❌ Nuevos métodos de pago: Solo optimizar existentes
- ❌ Sistema de cupones: Es otro proyecto
- ❌ Checkout para productos digitales: Solo físicos
- ❌ Internacionalización: Solo US por ahora
- ❌ Rediseño de catálogo: Solo checkout

## Límites

- **Límite técnico**: Solo iOS 14+ y Android 10+ (cubre 95% de usuarios)
- **Límite de plataforma**: Solo mobile web, no apps nativas
- **Límite de tiempo**: Launch en 3 meses máximo
- **Límite de presupuesto**: $50K budget total (dev + tools)

## Casos Edge que NO cubriremos

- Browsers antiguos (< 2 años)
- Usuarios con JavaScript deshabilitado (< 0.1%)
- Dispositivos con pantallas < 4 pulgadas

## Futuras Versiones (No en v1.0)

- One-click reorder (v1.1)
- Subscriptions en checkout (v1.2)
- Checkout en app nativa (v2.0)
- Internacionalización (v2.0)
```

---

### 5. Identificación de Restricciones

**Objetivo**: Documentar todas las restricciones del proyecto.

**Plantilla**:
```markdown
# docs/constraints.md

## Restricciones de Tiempo

- **Deadline**: [Fecha]
- **Hitos intermedios**: [Fechas]
- **Razón del deadline**: [Por qué esta fecha]

## Restricciones de Presupuesto

- **Budget total**: [Cantidad]
- **Desglose**:
  - Desarrollo: [Cantidad]
  - Herramientas/licencias: [Cantidad]
  - Marketing: [Cantidad]
  - Contingencia: [Cantidad]

## Restricciones Técnicas

- **Tecnologías permitidas**: [Lista]
- **Tecnologías prohibidas**: [Lista y razón]
- **Requisitos de performance**: [Specs]
- **Requisitos de seguridad**: [Standards]

## Restricciones de Recursos

- **Equipo disponible**: [Personas]
- **Horas disponibles**: [Horas/semana]
- **Skills del equipo**: [Skills]

## Restricciones Legales/Políticas

- **Compliance requerido**: [Standards]
- **Regulaciones**: [Leyes aplicables]
- **Políticas internas**: [Políticas]

## Dependencias Externas

- **Sistemas externos**: [Lista]
- **Third-party services**: [Lista]
- **Aprobaciones requeridas**: [De quién]
```

**Ejemplo (Software)**:
```markdown
# Constraints: Checkout Móvil

## Restricciones de Tiempo

- **Deadline**: 1 Diciembre 2026 (antes de Q4 shopping season)
- **Hitos intermedios**:
  - v0.4.0 (BUILD complete): 15 Oct 2026
  - v0.5.0 (VALIDATE complete): 1 Nov 2026
  - v0.7.0 (LAUNCH): 1 Dic 2026
- **Razón del deadline**: Black Friday/Cyber Monday es nuestra temporada alta

## Restricciones de Presupuesto

- **Budget total**: $50,000
- **Desglose**:
  - Desarrollo: $35,000 (2 devs x 3 meses)
  - Herramientas: $5,000 (Stripe, Google Places API, testing tools)
  - QA/Testing: $5,000 (external QA + user testing)
  - Contingencia: $5,000 (10%)

## Restricciones Técnicas

- **Stack actual DEBE mantenerse**:
  - React Native (frontend)
  - Node.js (backend)
  - PostgreSQL (database)
  - Razón: Equipo no tiene skills en otros stacks

- **Performance requirements**:
  - Tiempo de carga < 2 segundos
  - API response time < 200ms
  - 99.9% uptime

- **Security requirements**:
  - PCI DSS compliance obligatorio
  - HTTPS only
  - Encriptación de datos sensibles

## Restricciones de Recursos

- **Equipo disponible**:
  - 2 Full-stack developers (full-time)
  - 1 Designer (part-time, 20h/semana)
  - 1 QA (last month only)

- **Horas disponibles**:
  - 480 horas totales por developer
  - 240 horas designer

- **Skills del equipo**:
  - Experiencia en React Native
  - NO tienen experiencia en payment integrations (learning curve)

## Restricciones Legales/Políticas

- **Compliance requerido**:
  - PCI DSS Level 1 (procesamos > $6M/año en pagos)
  - GDPR (tenemos usuarios EU)
  - CCPA (tenemos usuarios California)

- **Políticas internas**:
  - Todo código debe pasar code review
  - Tests coverage > 80%
  - Aprobación de CTO requerida antes de launch

## Dependencias Externas

- **Sistemas externos**:
  - Stripe (payment processing): Dependemos de su uptime
  - Google Places API (address autocomplete): Quota limits

- **Aprobaciones requeridas**:
  - CTO: Aprobación de arquitectura
  - Legal: Review de términos y privacidad
  - CFO: Aprobación de budget
```

---

### 6. Definición de Criterios de Éxito

**Objetivo**: Establecer cómo sabremos que el proyecto fue exitoso.

**Plantilla**:
```markdown
# docs/success-criteria.md

## Criterios de Éxito Cuantitativos

### Críticos (MUST HAVE)
- [ ] [Criterio 1]: [Métrica >= Target]
- [ ] [Criterio 2]: [Métrica >= Target]

### Importantes (SHOULD HAVE)
- [ ] [Criterio 3]: [Métrica >= Target]
- [ ] [Criterio 4]: [Métrica >= Target]

### Deseables (NICE TO HAVE)
- [ ] [Criterio 5]: [Métrica >= Target]

## Criterios de Éxito Cualitativos

- [ ] [Criterio cualitativo 1]
- [ ] [Criterio cualitativo 2]

## Qué NO consideramos éxito

- ❌ [Anti-pattern 1]
- ❌ [Anti-pattern 2]

## Validación de Éxito

**Cómo validaremos**:
- [Método 1]
- [Método 2]

**Cuándo validaremos**:
- [Milestone 1]: [Fecha]
- [Milestone 2]: [Fecha]
```

**Ejemplo (Software)**:
```markdown
# Success Criteria: Checkout Móvil

## Criterios de Éxito Cuantitativos

### Críticos (MUST HAVE)
- [ ] Tiempo de checkout en móvil < 2 minutos (actual: 5min)
- [ ] Tasa de conversión > 55% (actual: 33%)
- [ ] Tasa de abandono < 45% (actual: 67%)
- [ ] 99.9% uptime durante primeros 30 días
- [ ] 0 incidentes de seguridad críticos

### Importantes (SHOULD HAVE)
- [ ] NPS de checkout > 65 (actual: 32)
- [ ] Page load time < 2 segundos
- [ ] API response time < 200ms (p95)
- [ ] Revenue incremental > $200K/mes (target: $300K)

### Deseables (NICE TO HAVE)
- [ ] Apple Pay adoption > 30% de transacciones móviles
- [ ] Tiempo checkout < 90 segundos (stretch goal)
- [ ] Revenue incremental > $300K/mes

## Criterios de Éxito Cualitativos

- [ ] Feedback de usuarios es mayoritariamente positivo (>80% positive)
- [ ] Equipo de soporte reporta reducción de quejas sobre checkout
- [ ] Stakeholders internos (CEO, CFO) aprueban resultados
- [ ] Proceso es sostenible (no requiere intervención manual constante)

## Qué NO consideramos éxito

- ❌ Cumplir timeline pero sin alcanzar métricas de conversión
- ❌ Alcanzar métricas pero comprometiendo seguridad
- ❌ Alcanzar métricas pero con deuda técnica insostenible
- ❌ "Looks good" sin datos reales que lo sustenten

## Validación de Éxito

**Cómo validaremos**:
- Google Analytics: Métricas de checkout flow
- Mixpanel: Funnel analysis y user behavior
- Stripe Dashboard: Revenue tracking
- NPS Survey: Post-checkout satisfaction
- User interviews: Qualitative feedback (20 usuarios)

**Cuándo validaremos**:
- Week 1 post-launch: Primeros indicadores, fix issues críticos
- Week 2 post-launch: Tendencias tempranas
- Week 4 post-launch: Primera validación formal
- Month 2 post-launch: Validación completa de KPIs
- Month 3 post-launch: Validación final, declarar éxito/fracaso
```

---

## 📦 Entregables de DEFINE

Al finalizar DEFINE, debes tener:

- [ ] `docs/problem-statement.md` - Definición clara del problema
- [ ] `docs/target-audience.md` - Audiencia objetivo definida
- [ ] `docs/objectives.md` - Objetivos y KPIs
- [ ] `docs/scope.md` - Alcance (in/out of scope)
- [ ] `docs/constraints.md` - Restricciones documentadas
- [ ] `docs/success-criteria.md` - Criterios de éxito

---

## ✅ Criterios de Salida

**Para pasar a DISCOVER (v0.1.x), debes cumplir:**

- [ ] **Problema claramente definido**: Cualquier persona del equipo puede explicar el problema en 2 minutos
- [ ] **Objetivos SMART establecidos**: Todos los objetivos son específicos, medibles y con deadlines
- [ ] **Alcance delimitado**: Está claro qué sí y qué no incluye el proyecto
- [ ] **Restricciones documentadas**: Tiempo, presupuesto, técnicas, legales
- [ ] **Criterios de éxito definidos**: Sabemos exactamente cómo medir el éxito
- [ ] **Stakeholders alineados**: Todos los stakeholders clave aprobaron la definición
- [ ] **Scope negativo claro**: Equipo entiende qué NO se hará (evita scope creep)

---

## 🚨 Red Flags en DEFINE

**Señales de que DEFINE está incompleto:**

- ❌ "El problema es obvio, no necesitamos documentarlo"
- ❌ Objetivos vagos: "Mejorar la experiencia del usuario"
- ❌ No hay métricas cuantitativas
- ❌ Scope indefinido: "Ya veremos qué más agregamos"
- ❌ Stakeholders no están de acuerdo en el objetivo
- ❌ No hay criterios claros de éxito
- ❌ Team members tienen diferentes entendimientos del problema

**Si ves estos red flags, NO pases a DISCOVER. Refina DEFINE primero.**

---

## 🎯 Ejemplos por Dominio

### Software: Optimización de Checkout
```
✅ Problema: Checkout tarda 5min, 67% abandono
✅ Objetivo: Reducir a <2min, <40% abandono
✅ Alcance: Solo móvil, solo checkout
✅ Out of scope: Desktop, catalog, cupones
✅ KPI: Conversión de 33% a 60%
✅ Timeline: 3 meses, launch antes de Q4
```

### Libro: Guía Práctica de ADD
```
✅ Problema: No hay metodología para AI-driven development
✅ Objetivo: Libro de 200 páginas, 500 copias en 3 meses
✅ Alcance: 10 capítulos, ejemplos prácticos, no incluye videos
✅ Out of scope: Cursos online, workshops
✅ KPI: 500 ventas, rating >4.5/5
✅ Timeline: 4 meses writing, 1 mes publishing
```

### Marketing: Mejora de Landing Page
```
✅ Problema: Conversión 1.5% vs 3-5% industria
✅ Objetivo: Aumentar conversión a 4%+
✅ Alcance: Solo landing principal, no otras páginas
✅ Out of scope: Blog, otras páginas marketing
✅ KPI: Conversión, CPA de $180 a $80
✅ Timeline: 6 semanas, launch antes de nuevo producto
```

---

## 💡 Tips para un DEFINE Exitoso

### 1. Involucra Stakeholders Temprano
No definas en aislamiento. Involucra a:
- Decision makers (CEO, CTO, Product Lead)
- Usuarios finales (si es posible)
- Equipo técnico (developers, designers)

### 2. Escribe Todo, No Asumas Nada
"Lo obvio" no es obvio para todos. Documenta TODO.

### 3. El Scope Negativo es Crítico
Definir qué NO harás es TAN importante como qué SÍ harás.

### 4. Objetivos Medibles > Objetivos Vagos
❌ "Mejorar UX"
✅ "Reducir tiempo de checkout de 5min a <2min"

### 5. Valida con "The Mom Test"
Si le explicas el problema a alguien externo (tu mamá), ¿lo entiende?
Si no, no está bien definido.

### 6. Timeboxea DEFINE
No pases > 1-2 semanas en DEFINE.
Si necesitas más, es porque estás intentando resolver (eso es DISCOVER/DESIGN).

---

## 🔄 Iteración dentro de DEFINE

DEFINE puede requerir múltiples iteraciones:

```
v0.0.0 → Primera definición del problema
v0.0.1 → Refinamiento después de feedback de stakeholders
v0.0.2 → Ajuste de scope después de análisis de restricciones
v0.0.3 → Definición final, lista para DISCOVER
```

**Cada iteración debe estar versionada y documentada.**

---

## ➡️ Siguiente Fase: DISCOVER (v0.1.x)

Una vez que DEFINE está completo, pasas a **DISCOVER**, donde:
- Investigas opciones y soluciones
- Analizas viabilidad técnica/económica
- Evalúas competencia/mercado
- Tomas decisiones fundamentales sobre CÓMO resolver el problema

**DEFINE dice QUÉ, DISCOVER dice CÓMO.**

---

**Versión**: ADD 2.0
**Fecha**: 2026-01-06
**Autor**: Héctor Prats
