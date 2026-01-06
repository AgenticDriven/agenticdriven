# Agentes Paralelos Coordinados en ADD

**El sistema de coordinación de múltiples agentes trabajando simultáneamente**

Versión: 2.0-alpha
Fecha: 2026-01-06

---

## El Problema que Resuelve

ADD 1.0 describía un flujo **secuencial** (CONFIG → PROJECT → TESTS...) pero NO explicaba:

- ❌ ¿Cómo trabajan 5 desarrolladores simultáneamente?
- ❌ ¿Todos en la misma fase o diferentes?
- ❌ ¿Cómo se coordinan los agentes?
- ❌ ¿Qué pasa con las dependencias entre agentes?
- ❌ ¿Cómo se resuelven conflictos?

**ADD 2.0 resuelve esto con un sistema completo de coordinación.**

---

## Principios de Coordinación

### 1. Fases son Secuenciales, Trabajo es Paralelo

```
FASE = Secuencial (no saltas de fase)
TRABAJO DENTRO DE FASE = Paralelo (múltiples agentes/personas)
```

**Ejemplo:**
- Todos están en fase BUILD (v0.4.x)
- Pero cada uno trabaja en componentes diferentes
- En paralelo, coordinados

### 2. Arquitectura Define Paralelismo

El diseño de DESIGN (v0.2.x) define:
- Qué componentes existen
- Qué interfaces tienen
- Qué dependencias hay

**Esto permite dividir el trabajo.**

### 3. Contratos antes de Implementación

Los contratos (interfaces, APIs, schemas) se definen en DESIGN.

**Esto permite trabajo paralelo sin esperas.**

### 4. Integración Continua

Los agentes integran su trabajo continuamente, no al final.

**Esto detecta conflictos temprano.**

---

## Estrategias de Paralelismo por Fase

### DISCOVER (v0.1.x) - Paralelismo de Investigación

**Estrategia:** División por áreas de investigación

**Ejemplo en Software:**
```
Agente 1: Investiga backend frameworks
Agente 2: Investiga bases de datos
Agente 3: Investiga frontend frameworks
Agente 4: Investiga DevOps tools
```

**Coordinación:**
- Cada agente documenta en su área
- Daily sync de 15 min para compartir findings
- Decisiones finales se toman en conjunto

**Documentación:**
```
docs/
├── discovery.md (consolidado final)
├── discovery-backend.md
├── discovery-database.md
├── discovery-frontend.md
└── discovery-devops.md
```

---

### DESIGN (v0.2.x) - Paralelismo de Diseño

**Estrategia:** División por componentes del sistema

**Ejemplo en Software:**
```
Agente 1: Diseña API layer
Agente 2: Diseña Data layer
Agente 3: Diseña Frontend architecture
Agente 4: Diseña DevOps pipeline
```

**Coordinación:**
- Definen interfaces PRIMERO (contratos)
- Cada agente diseña su componente respetando contratos
- Review sessions para validar integración

**Documentación:**
```
docs/
├── architecture.md (vista general)
├── design-api.md
├── design-data.md
├── design-frontend.md
├── design-devops.md
└── interfaces.md (CRÍTICO - contratos)
```

**Artefacto clave:** `interfaces.md`
```markdown
# Interfaces y Contratos

## API → Data Layer
- Métodos: getUserById(id), createUser(data)
- Input/Output definidos
- Error handling

## Data Layer → Database
- Schema definido
- Queries documentadas

## Frontend → API
- Endpoints definidos (JSON:API 1.1)
- Request/Response format
```

---

### PREPARE (v0.3.x) - Paralelismo de Setup

**Estrategia:** División por áreas técnicas

**Ejemplo en Software:**
```
Agente 1: Configura testing framework
Agente 2: Configura CI/CD
Agente 3: Configura entorno de desarrollo
Agente 4: Configura monitoreo y logging
```

**Coordinación:**
- Cada agente documenta su setup
- Validación cruzada: ¿funcionan juntos?
- Todos deben poder trabajar en cualquier componente

**Documentación:**
```
docs/
├── setup.md (guía maestra)
├── setup-testing.md
├── setup-cicd.md
├── setup-dev-env.md
└── setup-monitoring.md
```

---

### BUILD (v0.4.x) - Paralelismo de Construcción

**Esta es la fase más compleja para coordinación.**

#### Estrategia 1: Feature Branches

```
main (protected)
  ↓
  ├── feature/api-users (Agente 1)
  ├── feature/api-posts (Agente 2)
  ├── feature/frontend-login (Agente 3)
  └── feature/data-migrations (Agente 4)
```

**Workflow:**
1. Cada agente crea su feature branch desde `main`
2. Trabaja en su feature
3. Hace commits frecuentes
4. Cuando completa, crea Pull Request
5. Code review por otro agente
6. Merge a `main`

**Resolución de conflictos:**
- Integración continua (rebase frecuente)
- Tests automáticos en CI
- Code review obligatorio

#### Estrategia 2: Component Ownership

```
Agente 1: Owner de API layer
Agente 2: Owner de Data layer
Agente 3: Owner de Frontend
Agente 4: Owner de DevOps
```

**Reglas:**
- Cambios en tu componente: directo (con tests)
- Cambios en componente de otro: PR + review del owner
- Cambios en interfaces: consenso obligatorio

#### Estrategia 3: Pair/Mob Programming

Para componentes críticos o complejos:
- **Pair**: 2 agentes en mismo código
- **Mob**: Todo el equipo en mismo código

**Cuándo usar:**
- Lógica de negocio crítica
- Integraciones complejas
- Resolución de bugs difíciles

#### Coordinación en BUILD

**Daily Standups (15 min):**
```
1. ¿Qué hice ayer?
2. ¿Qué haré hoy?
3. ¿Bloqueado por algo?
```

**Sincronización de dependencias:**
```
Agente 3 (Frontend) necesita API de Agente 1:
1. Agente 1 define contrato en DESIGN (ya hecho)
2. Agente 3 usa mock basado en contrato
3. Agente 1 implementa API real
4. Cuando lista, Agente 3 cambia de mock a real
5. Tests de integración validan
```

**Documentación:**
```
docs/
├── build-log.md (log consolidado)
├── build-api.md (progreso de API)
├── build-data.md (progreso de Data)
├── build-frontend.md (progreso de Frontend)
└── blockers.md (impedimentos actuales)
```

---

### VALIDATE (v0.5.x) - Paralelismo de Validación

**Estrategia:** División por tipos de testing

**Ejemplo en Software:**
```
Agente 1: Unit tests
Agente 2: Integration tests
Agente 3: E2E tests
Agente 4: Security audit
```

**Coordinación:**
- Tests corren automáticamente en CI
- Cada agente es responsable de su tipo de test
- Todos los tests deben pasar para considerar VALIDATE completo

**Documentación:**
```
docs/
├── validation-report.md (consolidado)
├── test-results-unit.md
├── test-results-integration.md
├── test-results-e2e.md
└── security-audit.md
```

---

### DELIVER (v0.6.x) - Paralelismo de Entrega

**Estrategia:** División por aspectos de delivery

**Ejemplo en Software:**
```
Agente 1: Deploy de backend
Agente 2: Deploy de frontend
Agente 3: Migración de base de datos
Agente 4: Configuración de monitoring
```

**Coordinación:**
- Runbook documentado (orden de pasos)
- Checklist con dependencies
- Rollback plan

**Documentación:**
```
docs/
├── delivery.md (runbook)
├── deploy-backend.md
├── deploy-frontend.md
├── db-migration.md
└── rollback-plan.md
```

---

### SUPPORT (v0.7.x) - Paralelismo de Soporte

**Estrategia:** Rotación y especialización

**Sistema de guardias:**
```
Semana 1: Agente 1 (on-call)
Semana 2: Agente 2 (on-call)
Semana 3: Agente 3 (on-call)
Semana 4: Agente 4 (on-call)
```

**Especialización por tipo:**
```
Bugs críticos → Agente on-call
Bugs backend → Owner de backend
Bugs frontend → Owner de frontend
Questions → Rotating support
```

**Coordinación:**
- Sistema de tickets (Jira, Linear, GitHub Issues)
- SLA definido (crítico: 2h, normal: 24h)
- Escalation path documentado

---

### EVOLVE (v0.8.x) - Paralelismo de Evolución

**Estrategia:** División por iniciativas de mejora

**Ejemplo en Software:**
```
Agente 1: Performance optimization
Agente 2: New feature X
Agente 3: Refactoring of component Y
Agente 4: Tech debt payback
```

**Coordinación:**
- Roadmap priorizado
- Capacity planning
- Integración continua

---

## Git Branching Strategy para ADD

### Estrategia Recomendada: GitHub Flow Adaptado

```
main (siempre deployable)
  ↓
  ├── feature/v0.4.x-api-users
  ├── feature/v0.4.x-api-posts
  ├── feature/v0.4.x-frontend-login
  └── hotfix/v1.0.1-security-patch
```

**Reglas:**
1. `main` siempre es deployable
2. Todas las features desde `main`
3. Nombre de branch incluye fase: `feature/v0.4.x-nombre`
4. Pull Request obligatorio
5. Tests + Review antes de merge
6. Merge → delete branch

### Commits siguiendo ADD

**ADD usa Conventional Commits estándar:**

```bash
# Nueva funcionalidad
git commit -m "feat: add user authentication endpoint"

# Bug fix
git commit -m "fix: correct validation in checkout form"

# Documentación
git commit -m "docs: update API documentation"

# Mantenimiento
git commit -m "chore: update dependencies to latest versions"

# Refactoring
git commit -m "refactor: simplify user service logic"

# Tests
git commit -m "test: add integration tests for payment flow"

# Performance
git commit -m "perf: optimize database queries in user lookup"

# Estilo/formato
git commit -m "style: format code with prettier"
```

**Tipos de commit:**

| Tipo | Cuándo usar |
|------|-------------|
| `feat:` | Nueva funcionalidad o feature |
| `fix:` | Corrección de bug |
| `docs:` | Cambios en documentación |
| `chore:` | Mantenimiento (deps, configs, versions) |
| `refactor:` | Refactoring sin cambio funcional |
| `test:` | Añadir o modificar tests |
| `perf:` | Mejoras de performance |
| `style:` | Formato, linting, no cambio de código |
| `ci:` | Cambios en CI/CD |
| `build:` | Cambios en build system |

**Commits con scope (opcional):**
```bash
feat(auth): add OAuth2 integration
fix(checkout): correct tax calculation
docs(api): update endpoints documentation
```

**Breaking changes:**
```bash
feat!: change API response format

BREAKING CHANGE: API now returns data in camelCase instead of snake_case
```

---

## Resolución de Conflictos

### Tipos de Conflictos

#### 1. Conflictos de Código (Git)

**Prevención:**
- Integración frecuente (rebase diario)
- Feature branches pequeños (1-3 días)
- Comunicación continua

**Resolución:**
```bash
# En tu feature branch
git fetch origin
git rebase origin/main

# Si hay conflictos
git status  # ver archivos en conflicto
# resolver manualmente
git add <archivos>
git rebase --continue
```

#### 2. Conflictos de Decisión

**Prevención:**
- Decisiones documentadas en DISCOVER/DESIGN
- Architecture Decision Records (ADR)

**Resolución:**
- Escalate a decisor técnico (tech lead, architect)
- Documentar decisión en ADR
- Comunicar a todo el equipo

#### 3. Conflictos de Prioridad

**Prevención:**
- Roadmap claro
- Prioridades explícitas

**Resolución:**
- Product manager decide
- Re-priorización documentada
- Comunicación a stakeholders

---

## Comunicación entre Agentes

### Niveles de Comunicación

#### Nivel 1: Async (Default)

**Herramientas:**
- Documentación (docs/)
- Pull Requests con descripción detallada
- Issues/tickets bien descritos
- Slack/Discord para updates

**Cuándo:**
- Updates de progreso
- Preguntas no urgentes
- Documentación de decisiones

#### Nivel 2: Sync Short (Daily)

**Daily Standup (15 min):**
- ¿Qué hice?
- ¿Qué haré?
- ¿Bloqueado?

**Cuándo:**
- Daily, misma hora
- Todo el equipo
- No para resolver problemas (solo identificar)

#### Nivel 3: Sync Focused (As Needed)

**Working Sessions:**
- Pair programming
- Mob programming
- Architecture discussions
- Troubleshooting

**Cuándo:**
- Problema complejo
- Decisión arquitectónica importante
- Integración crítica
- Bloqueo que afecta a varios

#### Nivel 4: Async Deep (Weekly)

**Sprint Review / Phase Review:**
- ¿Completamos la fase?
- ¿Qué aprendimos?
- ¿Qué cambiar?

**Cuándo:**
- Fin de sprint (si usas Scrum)
- Fin de fase
- Weekly retrospective

---

## Métricas de Coordinación

### Métricas que Importan

**Cycle Time:**
- Tiempo desde commit hasta production
- Objetivo: < 24h

**PR Review Time:**
- Tiempo desde PR creado hasta merge
- Objetivo: < 4h

**Build Success Rate:**
- % de builds que pasan en CI
- Objetivo: > 95%

**Merge Conflicts Rate:**
- % de PRs con conflictos
- Objetivo: < 10%

**Code Review Participation:**
- % del equipo que hace reviews
- Objetivo: 100%

---

## Herramientas Recomendadas

### Para Coordinación

**Project Management:**
- Linear (recomendado)
- Jira
- GitHub Projects

**Comunicación:**
- Slack
- Discord
- Microsoft Teams

**Code:**
- GitHub
- GitLab
- Bitbucket

**CI/CD:**
- GitHub Actions
- GitLab CI
- CircleCI

**Documentación:**
- Markdown en repo (recomendado)
- Notion
- Confluence

---

## Ejemplo Completo: Equipo de 4 Agentes

### Contexto
- Proyecto: API REST para gestión de tareas
- Equipo: 4 desarrolladores
- Fase: BUILD (v0.4.x)
- Duración: 2 semanas

### División de Trabajo

**Agente 1: Backend API**
```
- Endpoints de usuarios
- Endpoints de tareas
- Autenticación
- Tests unitarios
```

**Agente 2: Data Layer**
```
- Schema de base de datos
- Migraciones
- ORM setup
- Tests de integración
```

**Agente 3: Frontend**
```
- UI de login
- UI de lista de tareas
- UI de crear/editar tarea
- Tests E2E
```

**Agente 4: DevOps**
```
- CI/CD pipeline
- Docker setup
- Deploy scripts
- Monitoring
```

### Timeline (Sprint de 2 semanas)

**Día 1-2: Setup + Contratos**
```
- Todos: Review de DESIGN
- Todos: Validar interfaces documentadas
- Agente 4: CI/CD básico funcionando
- Agentes 1-3: Crear feature branches
```

**Día 3-7: Build Paralelo**
```
- Agente 1: Implementa APIs (usa DB mock)
- Agente 2: Implementa Data layer real
- Agente 3: Implementa Frontend (usa API mock)
- Agente 4: Refina CI/CD, prepara staging

Daily standup 10am:
- Sync de progreso
- Identificar blockers
- Ajustar plan si necesario
```

**Día 8: Primera Integración**
```
- Agente 2 completa Data layer → Agente 1 integra
- Agente 1 completa APIs → Agente 3 integra
- Todos: Fix integration issues
- CI: Tests deben pasar
```

**Día 9-12: Build + Fix**
```
- Continuar features pendientes
- Fix de bugs de integración
- Refinamiento
- Tests E2E (Agente 3)
```

**Día 13-14: Final Integration + PR Review**
```
- Merge de todas las features
- Code review final
- Todos los tests deben pasar
- Preparación para VALIDATE
```

### Comunicación

**Async (Slack):**
```
#proyecto-tareas
- Updates de progreso
- Preguntas rápidas
- Links a PRs
```

**Sync (Daily 15min):**
```
Lunes 10am:
Agente 1: "Implementé endpoint users, hoy haré tasks"
Agente 2: "Schema completo, hoy migraciones"
Agente 3: "Mock del API listo, hoy UI de login"
Agente 4: "CI funcionando, hoy Docker setup"
```

**Sync Focused (As Needed):**
```
Miércoles 3pm (2h):
Problema: ¿Cómo manejar relaciones users-tasks?
Participan: Agente 1, 2
Resultado: ADR-003 documenta decisión
```

### Pull Requests

**Agente 1:**
```
Title: [v0.4.5] BUILD: Implementa API de usuarios

Description:
- POST /api/users (create)
- GET /api/users/:id (read)
- GET /api/users (list)
- Tests unitarios (coverage 85%)
- Documentación actualizada en docs/api.md

Reviewers: @agente2, @agente3
```

**Review:**
```
Agente 2 review:
✅ Código limpio
✅ Tests completos
💬 Comentario: ¿Por qué no PATCH para update?
📝 Cambio sugerido: Agregar validación de email

Agente 1 responde:
- PATCH viene en próximo PR
- Validación agregada ✓

Agente 2: Approved ✅
Agente 3: Approved ✅

→ Merge to main
```

---

## Checklist de Coordinación

### Al Empezar un Proyecto

- [ ] Definir equipo y roles
- [ ] Establecer comunicación (canales, meetings)
- [ ] Configurar herramientas (Git, CI, proyecto management)
- [ ] Documentar branching strategy
- [ ] Definir code review process
- [ ] Establecer métricas

### Al Empezar una Fase

- [ ] Review de diseño/plan de la fase
- [ ] División de trabajo clara
- [ ] Dependencias identificadas
- [ ] Estimaciones por agente
- [ ] Contratos/interfaces definidos (si aplica)

### Durante la Fase

- [ ] Daily standups
- [ ] Integración frecuente
- [ ] Code reviews oportunos (< 4h)
- [ ] Tests pasando en CI
- [ ] Documentación actualizada

### Al Terminar la Fase

- [ ] Todos los componentes completados
- [ ] Code reviews completados
- [ ] Tests pasando
- [ ] Documentación actualizada
- [ ] Retrospective (¿qué mejorar?)

---

## Antipatterns (Qué NO Hacer)

### ❌ Trabajar en Silos

```
❌ MAL:
Agente 1 trabaja 2 semanas solo
Agente 2 trabaja 2 semanas solo
Día 14: Intentan integrar → conflictos masivos

✅ BIEN:
Todos integran diariamente
Conflictos se detectan y resuelven temprano
```

### ❌ Saltar Code Review

```
❌ MAL:
"No hay tiempo para review, mergeo directamente"

✅ BIEN:
Code review es obligatorio
Si hay prisa, review más rápido (30 min) pero siempre
```

### ❌ Falta de Comunicación

```
❌ MAL:
Agente 1 cambia una interfaz sin avisar
Agente 2 descubre que su código rompió

✅ BIEN:
Cambios de interfaz se comunican inmediatamente
Consenso antes de cambiar contratos
```

### ❌ Documentación Desactualizada

```
❌ MAL:
Código cambia pero docs/ se queda viejo

✅ BIEN:
Documentación se actualiza en el mismo commit
PR no se aprueba si docs están outdated
```

### ❌ No Resolver Blockers

```
❌ MAL:
Agente 3 está bloqueado 3 días esperando API
Nadie lo escalona

✅ BIEN:
Blocker identificado en standup día 1
Se re-prioriza o se usa mock
```

---

## Conclusión

**Los agentes paralelos coordinados son la clave para escalabilidad en ADD.**

Sin coordinación:
- Conflictos constantes
- Re-trabajo
- Frustración
- Velocidad baja

Con coordinación:
- Trabajo paralelo eficiente
- Integración continua
- Calidad alta
- Velocidad alta

**La coordinación NO es overhead, es inversión.**

---

## Referencias

- [COORDINACION.md](./COORDINACION.md) - Estrategias detalladas
- [AGENTES-CORE.md](./AGENTES-CORE.md) - Agentes fundamentales
- [../ADD-UNIVERSAL.md](../ADD-UNIVERSAL.md) - Metodología completa

---

**Versión**: 2.0-alpha
**Autor**: Héctor Prats
**Fecha**: 2026-01-06
