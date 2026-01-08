# Propuesta: AD Feature-Driven con Contexto Inteligente

**Fecha**: 2026-01-08
**Estado**: Propuesta para Discusión
**Autor**: Héctor Prats + Claude

---

## Resumen Ejecutivo

Transformar AD de un sistema **project-driven** (para proyectos completos) a un sistema **feature-driven** (para funcionalidades iterativas), con mejor gestión de contexto para mantener `claude.md` ligero y eficiente.

---

## Problemas Identificados

### 1. DEFINE no es interactivo
**Problema**: Actualmente la IA crea documentos directamente sin preguntar.
**Impacto**: Los documentos pueden no reflejar correctamente las intenciones del usuario.

### 2. Enfoque solo en proyectos completos
**Problema**: AD está diseñado para proyectos que pasan por todas las 10 fases.
**Impacto**: No es práctico para desarrollo iterativo de funcionalidades individuales.

### 3. claude.md es monolítico (586 líneas)
**Problema**: Todo el contexto está en un solo archivo.
**Impacto**:
- La IA lee 586 líneas en cada sesión (costoso en tokens)
- Difícil de mantener y actualizar
- No se adapta al contexto específico del proyecto

### 4. ad.yaml está infrautilizado
**Problema**: Solo tiene 3 campos (domain, phase, version).
**Impacto**: No almacena contexto rico del proyecto.

### 5. No hay guía clara para usar ad.yaml
**Problema**: Las reglas no enseñan bien cómo usar y mantener ad.yaml.
**Impacto**: Los usuarios no aprovechan ad.yaml, la IA no lo actualiza consistentemente.

---

## Solución Propuesta

### Arquitectura: Separación de Responsabilidades

```
claude.md (universal)          ad.yaml (proyecto-específico)
    ↓                                    ↓
Reglas generales              Contexto del proyecto
Principios                    Features activas
Workflow básico               Archivos a leer
13 principios                 Fase actual
                              Configuración custom
```

### 1. Feature-Driven Workflow

#### Modo Dual en ad.yaml

```yaml
# Modo 1: PROJECT (proyecto completo - actual)
mode: "project"
domain: "software"
phase: "BUILD"
version: "v0.4.0"

# Modo 2: FEATURE (desarrollo iterativo - nuevo)
mode: "feature"
domain: "software"
active_features:
  - id: "user-auth"
    type: "feat"
    phase: "BUILD"
    version: "v0.4.2"
    status: "in-progress"
    docs: "docs/active/user-auth/"
  - id: "fix-login-bug"
    type: "fix"
    phase: "VALIDATE"
    version: "v0.5.0"
    status: "testing"
    docs: "docs/active/fix-login-bug/"
```

#### Estructura de Documentación por Feature

```
docs/
├── journal.md                    # Global
├── decisions.md                  # Global
├── active/                       # Features en progreso
│   ├── user-auth/               # Feature 1
│   │   ├── 00-define/
│   │   │   ├── problem.md
│   │   │   ├── objectives.md
│   │   │   └── scope.md
│   │   ├── 01-discover/
│   │   │   └── options.md
│   │   ├── 02-design/
│   │   │   └── design.md
│   │   └── 04-build/
│   │       └── build-log.md
│   └── fix-login-bug/            # Feature 2
│       ├── 00-define/
│       │   └── problem.md
│       └── 05-validate/
│           └── test-results.md
├── completed/                    # Features terminadas
│   └── initial-setup/
└── spikes/                       # Experimentos
    └── evaluate-auth-lib/
```

#### Tipos de Features

```yaml
types:
  - feat: Nueva funcionalidad (pasa por mini-ciclo completo)
  - fix: Corrección de bug (DEFINE → VALIDATE → done)
  - spike: Investigación/experimento (DISCOVER → DESIGN → done)
  - refactor: Refactorización (DESIGN → BUILD → VALIDATE)
  - docs: Solo documentación (DEFINE → done)
  - chore: Tarea técnica (según necesidad)
```

#### Fases por Tipo de Feature

```yaml
feat (nueva funcionalidad):
  phases: [DEFINE, DISCOVER, DESIGN, BUILD, VALIDATE]

fix (bug):
  phases: [DEFINE, VALIDATE]
  # DEFINE: ¿qué está roto y por qué?
  # VALIDATE: ¿está arreglado?

spike (investigación):
  phases: [DEFINE, DISCOVER]
  # DEFINE: ¿qué queremos investigar?
  # DISCOVER: investigación y conclusiones

refactor:
  phases: [DESIGN, BUILD, VALIDATE]
  # DESIGN: ¿cómo mejoramos la estructura?
  # BUILD: implementar refactor
  # VALIDATE: tests siguen pasando
```

### 2. ad.yaml Extendido (El Manifiesto del Proyecto)

```yaml
# ========================================
# CONFIGURACIÓN BÁSICA
# ========================================
domain: "software"              # Tipo de proyecto
mode: "feature"                 # "project" o "feature"

# ========================================
# FEATURES ACTIVAS (si mode=feature)
# ========================================
active_features:
  - id: "user-authentication"
    type: "feat"
    phase: "BUILD"
    version: "v0.4.2"
    status: "in-progress"
    docs: "docs/active/user-authentication/"
    description: "Implementar sistema de autenticación con JWT"

  - id: "fix-memory-leak"
    type: "fix"
    phase: "VALIDATE"
    version: "v0.5.0"
    status: "testing"
    docs: "docs/active/fix-memory-leak/"
    description: "Resolver memory leak en el servicio de notificaciones"

# ========================================
# PROYECTO COMPLETO (si mode=project)
# ========================================
project:
  phase: "BUILD"
  version: "v0.4.0"
  docs: "docs/active/main-project/"

# ========================================
# CONTEXTO: Archivos que la IA debe leer SIEMPRE
# ========================================
context_files:
  - "docs/decisions.md"          # Decisiones arquitectónicas
  - "docs/interfaces.md"         # Contratos (si existen)
  - "docs/conventions.md"        # Convenciones del proyecto
  - "CONTRIBUTING.md"            # Guía de contribución

# Opcional: Contexto por fase
context_by_phase:
  BUILD:
    - "docs/architecture.md"
    - "src/README.md"
  VALIDATE:
    - "docs/testing-guide.md"

# ========================================
# MULTI-AGENT (opcional)
# ========================================
agents:
  - id: "backend"
    context: ["src/backend/", "tests/backend/"]
  - id: "frontend"
    context: ["src/frontend/", "tests/frontend/"]

# ========================================
# CONFIGURACIÓN CUSTOM
# ========================================
settings:
  auto_commit: true              # Commit automático después de completar task
  require_tests: true            # Require tests para feat/fix
  min_coverage: 80               # Coverage mínimo
  doc_template: "templates/feature-doc.md"  # Template para features
```

### 3. claude.md Ligero y Universal

#### Nuevo tamaño objetivo: ~200 líneas (vs 586 actual)

```markdown
# Agentic Driven (AD) 1.0

## Principios (13 core principles)
...

## Workflow General
...

## AI Workflow - CRITICAL

### Session Start (MUST DO)

1. **Read ad.yaml FIRST**
   ```bash
   cat ad.yaml
   ```
   - Understand project mode (project vs feature)
   - Identify active features and their phases
   - Load context_files defined in ad.yaml

2. **Read context files from ad.yaml**
   ```bash
   for file in $(yq '.context_files[]' ad.yaml); do
     cat "$file"
   done
   ```

3. **Read feature-specific docs** (if mode=feature)
   - For each active feature, read its phase docs
   - Example: If user-auth is in BUILD phase, read docs/active/user-auth/04-build/

4. **Standard context**
   - git status
   - README.md
   - docs/journal.md
   - Recent commits

5. **Ask user**: "Ready to work. What would you like to do?"

### During Work

**ALWAYS update ad.yaml when**:
- Changing feature phase
- Completing a feature (move to completed_features)
- Starting a new feature (add to active_features)
- Making architectural decisions (update context_files)

### Feature Commands

User says: "Start new feature: user authentication"
→ AI:
  1. Ask questions (DEFINE interactive)
  2. Create docs/active/user-authentication/00-define/
  3. Add to ad.yaml active_features
  4. Commit

User says: "Continue with user-auth"
→ AI:
  1. Read ad.yaml → find user-auth
  2. Check phase (e.g., BUILD)
  3. Read docs/active/user-authentication/04-build/
  4. Ask: "What would you like to build next?"

User says: "Finish user-auth"
→ AI:
  1. Verify all tasks complete
  2. Move docs/active/user-authentication/ → docs/completed/
  3. Remove from active_features in ad.yaml
  4. Add to completed_features in ad.yaml
  5. Commit

## Phase-Specific Instructions

### DEFINE (Interactive - MUST ASK FIRST)

**CRITICAL: DO NOT create documents without asking questions first**

Process:
1. **Ask questions** to understand:
   - What problem are we solving?
   - What are the objectives?
   - What's in scope and out of scope?
   - What are the constraints?

2. **User provides answers**

3. **Create documents** based on answers:
   - problem.md
   - objectives.md
   - scope.md

4. **Review with user** before finalizing

Example dialogue:
```
AI: "I see you want to start a new feature. Let me ask some questions:

1. What problem does this feature solve?
2. What are the main objectives? (List 2-3 SMART goals)
3. What's in scope for this feature?
4. What's explicitly out of scope?
5. Are there any constraints? (time, tech, resources)"

User: [provides answers]

AI: "Thanks! Based on your answers, I'll create:
- docs/active/your-feature/00-define/problem.md
- docs/active/your-feature/00-define/objectives.md
- docs/active/your-feature/00-define/scope.md

Let me show you the drafts..."
```

### BUILD
...

### Other phases
...

## Exit Criteria by Phase
...

## Troubleshooting
...
```

### 4. Gestión Automática de ad.yaml

#### Reglas claras en claude.md:

```markdown
## Managing ad.yaml - AI Responsibilities

### When to Update ad.yaml

**Starting a new feature**:
```bash
# 1. User says: "Start new feature: user auth"
# 2. You do DEFINE (ask questions)
# 3. Update ad.yaml:
yq eval '.active_features += [{"id": "user-auth", "type": "feat", "phase": "DEFINE", "version": "v0.0.0", "status": "in-progress", "docs": "docs/active/user-auth/", "description": "User authentication system"}]' -i ad.yaml
git add ad.yaml
git commit -m "chore: start feature user-auth (v0.0.0)"
```

**Advancing a feature phase**:
```bash
# User completed DEFINE, moving to DISCOVER
yq eval '(.active_features[] | select(.id == "user-auth") | .phase) = "DISCOVER"' -i ad.yaml
yq eval '(.active_features[] | select(.id == "user-auth") | .version) = "v0.1.0"' -i ad.yaml
git add ad.yaml
git commit -m "chore: user-auth advance to DISCOVER (v0.1.0)"
```

**Completing a feature**:
```bash
# Feature is done
# 1. Move docs
mv docs/active/user-auth docs/completed/

# 2. Update ad.yaml
yq eval '.completed_features += [{"id": "user-auth", "completed_at": "2026-01-08", "final_version": "v0.5.0"}]' -i ad.yaml
yq eval 'del(.active_features[] | select(.id == "user-auth"))' -i ad.yaml

git add ad.yaml docs/
git commit -m "feat: complete user authentication feature"
```

**Adding context files**:
```bash
# When you create a new architectural decision or convention
yq eval '.context_files += ["docs/architecture.md"]' -i ad.yaml
git add ad.yaml
git commit -m "docs: add architecture doc to context"
```

### Validation

**ALWAYS validate ad.yaml after updating**:
```bash
yq eval ad.yaml  # Should not error
```
```

### 5. Compatibilidad con Todos los IDEs

#### La solución funciona para todos los IDEs porque:

1. **Cursor (.cursorrules)**:
   - Lee el archivo .cursorrules al inicio
   - Puede ejecutar comandos bash para leer ad.yaml
   - Funciona igual

2. **Windsurf (.windsurfrules)**:
   - Igual que Cursor
   - Cascade puede leer múltiples archivos

3. **Claude Code (claude.md)**:
   - Funciona perfectamente
   - Ya tiene capacidad de ejecutar bash

4. **GitHub Copilot (.github/copilot-instructions.md)**:
   - Puede referenciar archivos en el workspace
   - Syntax: `@workspace` + instrucciones

5. **Continue (.continuerc.json + .continue-rules.md)**:
   - JSON puede definir context providers
   - .continue-rules.md tiene las instrucciones

6. **Aider (.aider.conf.yml + .aider-rules.md)**:
   - --read flag para leer archivos
   - Instrucciones en .aider-rules.md

**El patrón universal es**:
- IDE config file: Instrucciones para "SIEMPRE lee ad.yaml y los archivos en context_files"
- ad.yaml: El manifiesto con el contexto del proyecto
- La IA lee ambos y actúa en consecuencia

---

## Ejemplo de Uso: Desarrollo de 3 Features en Paralelo

### Situación Inicial

```yaml
# ad.yaml
mode: "feature"
domain: "software"
active_features: []
completed_features: []
context_files:
  - "docs/decisions.md"
  - "docs/interfaces.md"
```

### Feature 1: User Authentication (feat)

```bash
# User: "Start new feature: user authentication with JWT"

# AI: [hace preguntas DEFINE]
# AI: [crea docs/active/user-auth/00-define/]
# AI: [actualiza ad.yaml]
```

```yaml
# ad.yaml después
active_features:
  - id: "user-auth"
    type: "feat"
    phase: "DEFINE"
    version: "v0.0.0"
    status: "in-progress"
    docs: "docs/active/user-auth/"
    description: "JWT-based authentication system"
```

### Feature 2: Fix Memory Leak (fix)

```bash
# User: "Start fix: memory leak in notifications service"

# AI: [DEFINE interactivo - qué está roto, cómo reproducir]
# AI: [crea docs/active/fix-memory-leak/00-define/]
```

```yaml
# ad.yaml después
active_features:
  - id: "user-auth"
    type: "feat"
    phase: "DISCOVER"  # Avanzó
    version: "v0.1.0"
    status: "in-progress"
    docs: "docs/active/user-auth/"

  - id: "fix-memory-leak"
    type: "fix"
    phase: "DEFINE"
    version: "v0.0.0"
    status: "in-progress"
    docs: "docs/active/fix-memory-leak/"
    description: "Memory leak in NotificationService"
```

### Feature 3: Spike - Evaluate Auth Libraries (spike)

```bash
# User: "Start spike: evaluate Passport.js vs Auth0"
```

```yaml
# ad.yaml después
active_features:
  - id: "user-auth"
    type: "feat"
    phase: "DESIGN"
    version: "v0.2.0"

  - id: "fix-memory-leak"
    type: "fix"
    phase: "VALIDATE"
    version: "v0.5.0"

  - id: "spike-auth-libs"
    type: "spike"
    phase: "DISCOVER"
    version: "v0.1.0"
    status: "investigating"
    docs: "docs/spikes/spike-auth-libs/"
    description: "Evaluate Passport.js vs Auth0 for user-auth feature"
```

### Switching Context

```bash
# User: "Continue with user-auth"

# AI:
# 1. Read ad.yaml
# 2. Find user-auth → phase: DESIGN, version: v0.2.0
# 3. Read docs/active/user-auth/02-design/
# 4. Read context_files from ad.yaml
# 5. Ask: "What would you like to design next?"

# User: "Continue with memory leak fix"

# AI:
# 1. Read ad.yaml
# 2. Find fix-memory-leak → phase: VALIDATE
# 3. Read docs/active/fix-memory-leak/05-validate/
# 4. Ask: "Ready to test the fix. What would you like to validate?"
```

### Completing Features

```bash
# User: "The spike is done, we'll use Passport.js"

# AI:
# 1. Move docs/spikes/spike-auth-libs/ → docs/completed/
# 2. Update ad.yaml:
#    - Remove from active_features
#    - Add to completed_features
#    - Update user-auth with decision
# 3. Update docs/decisions.md with the decision
# 4. Commit
```

---

## Beneficios

### 1. Desarrollo Iterativo Real
- Múltiples features en paralelo
- Cada feature tiene su propio mini-ciclo
- No necesitas completar 10 fases para una feature

### 2. Contexto Inteligente
- claude.md: 200 líneas (vs 586)
- ad.yaml: contexto rico del proyecto
- La IA lee solo lo relevante para la feature actual

### 3. DEFINE Interactivo
- La IA pregunta antes de crear documentos
- Documentos reflejan correctamente las intenciones
- Mejor colaboración humano-IA

### 4. ad.yaml como "Source of Truth"
- Siempre actualizado
- Refleja el estado real del proyecto
- Fácil de revisar (`cat ad.yaml`)

### 5. Escalable
- Funciona para proyectos pequeños (1 feature)
- Funciona para proyectos grandes (100+ features)
- docs/ organizado automáticamente

### 6. Compatible con Todos los IDEs
- Mismo patrón para Cursor, Windsurf, Claude, etc.
- Solo cambiar el formato del config file
- ad.yaml es universal

---

## Plan de Implementación

### Fase 1: Ampliar ad.yaml
- [ ] Definir schema completo de ad.yaml
- [ ] Crear validador de schema
- [ ] Documentar todos los campos
- [ ] Crear templates de ejemplo

### Fase 2: Feature-Driven Workflow
- [ ] Definir tipos de features (feat, fix, spike, etc.)
- [ ] Definir fases por tipo
- [ ] Crear estructura docs/active/ para features
- [ ] Actualizar reglas en claude.md

### Fase 3: DEFINE Interactivo
- [ ] Escribir prompts para preguntas DEFINE
- [ ] Crear templates de respuesta
- [ ] Integrar en claude.md
- [ ] Probar con casos reales

### Fase 4: Gestión Automática de ad.yaml
- [ ] Escribir comandos yq para todas las operaciones
- [ ] Documentar en claude.md cuándo actualizar
- [ ] Crear helpers/scripts si es necesario
- [ ] Validación automática

### Fase 5: Actualizar Todos los IDE Configs
- [ ] claude.md (Claude Code)
- [ ] .cursorrules (Cursor)
- [ ] .windsurfrules (Windsurf)
- [ ] .github/copilot-instructions.md (Copilot)
- [ ] .continue-rules.md (Continue)
- [ ] .aider-rules.md (Aider)

### Fase 6: Testing y Refinamiento
- [ ] Probar con proyecto real
- [ ] Iterar basado en feedback
- [ ] Crear ejemplos completos
- [ ] Documentar best practices

---

## Preguntas para Discusión

1. **Schema de ad.yaml**: ¿El schema propuesto cubre todos los casos? ¿Falta algo?

2. **Tipos de features**: ¿Son suficientes feat, fix, spike, refactor, docs, chore? ¿Hay otros?

3. **Fases por tipo**: ¿Las fases propuestas por cada tipo tienen sentido?
   - feat: DEFINE → DISCOVER → DESIGN → BUILD → VALIDATE
   - fix: DEFINE → VALIDATE
   - spike: DEFINE → DISCOVER

4. **Tamaño de claude.md**: ¿200 líneas es realista? ¿Qué debe quedarse y qué debe salir?

5. **Retrocompatibilidad**: ¿Necesitamos soportar el modo "project" antiguo o solo migrar a "feature"?

6. **Multi-feature paralelo**: ¿Hay límite de features activas recomendado? ¿3? ¿5?

7. **DEFINE interactivo**: ¿Qué preguntas específicas debe hacer la IA para cada tipo de feature?

8. **Comandos yq**: ¿Usamos yq directamente en las reglas o creamos un helper script?

---

## Próximos Pasos

1. **Revisar esta propuesta** y discutir puntos clave
2. **Decidir qué implementar primero** (probablemente ad.yaml extendido)
3. **Crear POC** con un proyecto de ejemplo
4. **Iterar** basado en uso real

---

**¿Listo para discutir y refinar la propuesta?**
