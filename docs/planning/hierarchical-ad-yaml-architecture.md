# Arquitectura Jerárquica de ad.yaml

**Fecha**: 2026-01-08
**Estado**: Propuesta Refinada
**Autor**: Héctor Prats + Claude

---

## Concepto Clave: ad.yaml Jerárquico

```
/ad.yaml (root - genérico)
    ↓ enlaza a
    ├── /docs/active/user-auth/ad.yaml (feature-específico)
    ├── /docs/active/fix-memory/ad.yaml (feature-específico)
    └── /docs/active/spike-libs/ad.yaml (feature-específico)
```

### Principio de Diseño

**Root ad.yaml**: Información global y enlaces
**Feature ad.yaml**: Información específica de esa feature (contexto, código, docs)

---

## Estructura Completa

```
project-root/
├── ad.yaml                          # ROOT: Global, enlaces a features
├── claude.md                        # Reglas universales (~200 líneas)
├── docs/
│   ├── journal.md                   # Global
│   ├── decisions.md                 # Global
│   ├── conventions.md               # Global
│   ├── interfaces.md                # Global (contratos)
│   │
│   ├── active/                      # Features en progreso
│   │   ├── user-auth/
│   │   │   ├── ad.yaml             # ← Feature-specific config
│   │   │   ├── 00-define/
│   │   │   │   ├── problem.md
│   │   │   │   ├── objectives.md
│   │   │   │   └── scope.md
│   │   │   ├── 02-design/
│   │   │   │   └── design.md
│   │   │   └── 04-build/
│   │   │       └── build-log.md
│   │   │
│   │   ├── fix-memory-leak/
│   │   │   ├── ad.yaml             # ← Feature-specific config
│   │   │   ├── 00-define/
│   │   │   │   └── problem.md
│   │   │   └── 05-validate/
│   │   │       └── test-results.md
│   │   │
│   │   └── spike-auth-libs/
│   │       ├── ad.yaml             # ← Feature-specific config
│   │       └── 01-discover/
│   │           └── research.md
│   │
│   ├── completed/                   # Features terminadas (archivadas)
│   │   └── initial-setup/
│   │       └── ad.yaml             # Archivado con la feature
│   │
│   └── spikes/                      # Experimentos
│
└── src/
    ├── auth/                        # ← Código de user-auth
    ├── services/
    │   └── notification.js          # ← Código de fix-memory-leak
    └── ...
```

---

## Root ad.yaml (Genérico)

```yaml
# ========================================
# /ad.yaml (ROOT - CONFIGURACIÓN GLOBAL)
# ========================================

# Información básica del proyecto
domain: "software"
mode: "feature"                    # "project" o "feature"
version: "v0.7.0"                 # Versión general del proyecto

# ========================================
# CONTEXTO GLOBAL
# ========================================
# Archivos que TODAS las features deben leer
context_files:
  - "docs/decisions.md"           # Decisiones arquitectónicas globales
  - "docs/conventions.md"         # Convenciones del proyecto
  - "docs/interfaces.md"          # Contratos globales
  - "CONTRIBUTING.md"             # Guía de contribución
  - "README.md"                   # Overview del proyecto

# ========================================
# FEATURES ACTIVAS
# ========================================
# Enlaces a las features en progreso
active_features:
  - path: "docs/active/user-auth"
    description: "JWT-based authentication system"
    status: "in-progress"

  - path: "docs/active/fix-memory-leak"
    description: "Fix memory leak in NotificationService"
    status: "testing"

  - path: "docs/active/spike-auth-libs"
    description: "Evaluate Passport.js vs Auth0"
    status: "investigating"

# ========================================
# FEATURES COMPLETADAS (historial)
# ========================================
completed_features:
  - path: "docs/completed/initial-setup"
    completed_at: "2026-01-05"
    description: "Initial project setup"

# ========================================
# MULTI-AGENT (opcional)
# ========================================
agents:
  - id: "backend"
    context: ["src/backend/", "tests/backend/"]
  - id: "frontend"
    context: ["src/frontend/", "tests/frontend/"]

# ========================================
# CONFIGURACIÓN GLOBAL
# ========================================
settings:
  auto_commit: true
  require_tests: true
  min_coverage: 80
  doc_template: "templates/feature-doc.md"
```

---

## Feature ad.yaml (Específico)

### Ejemplo 1: Feature Nueva (user-auth)

```yaml
# ========================================
# /docs/active/user-auth/ad.yaml
# ========================================

# Identificación de la feature
id: "user-auth"
type: "feat"                      # feat|fix|spike|refactor|docs|chore
description: "JWT-based authentication system with email/password"

# Estado actual
phase: "BUILD"                    # Fase actual de esta feature
version: "v0.4.2"                # Versión de esta feature
status: "in-progress"            # in-progress|blocked|testing|review

# ========================================
# CONTEXTO ESPECÍFICO DE ESTA FEATURE
# ========================================
# Archivos que la IA DEBE leer para trabajar en esta feature
context_files:
  # Docs de esta feature
  - "docs/active/user-auth/00-define/problem.md"
  - "docs/active/user-auth/00-define/objectives.md"
  - "docs/active/user-auth/00-define/scope.md"
  - "docs/active/user-auth/02-design/design.md"
  - "docs/active/user-auth/02-design/api-contracts.md"
  - "docs/active/user-auth/04-build/build-log.md"

  # Docs globales relevantes
  - "docs/decisions.md#auth-decisions"
  - "docs/interfaces.md#auth-endpoints"

# ========================================
# CARPETAS DE CÓDIGO
# ========================================
# Dónde está el código de esta feature
code_locations:
  - "src/auth/"                   # Código principal
  - "src/middleware/auth.js"      # Middleware relacionado
  - "src/models/User.js"          # Modelos relacionados
  - "tests/auth/"                 # Tests de esta feature

# ========================================
# DEPENDENCIAS
# ========================================
# Otras features o componentes de los que depende
dependencies:
  - component: "database"
    status: "ready"
  - component: "email-service"
    status: "ready"
  - feature: "user-profile"
    status: "blocked"             # Esta feature está bloqueada esperando user-auth

# ========================================
# TAREAS PENDIENTES
# ========================================
# Tareas específicas dentro de esta fase
tasks:
  - description: "Implement JWT token generation"
    status: "done"
    commit: "a1b2c3d"

  - description: "Implement login endpoint"
    status: "done"
    commit: "e4f5g6h"

  - description: "Implement refresh token logic"
    status: "in-progress"

  - description: "Add password hashing with bcrypt"
    status: "pending"

  - description: "Write unit tests for auth service"
    status: "pending"

# ========================================
# NOTAS Y DECISIONES
# ========================================
notes:
  - "Using bcrypt with salt rounds = 10"
  - "JWT expiry: 15 minutes, refresh token: 7 days"
  - "Decided against social auth for v1 (see spike-auth-libs)"

# ========================================
# SIGUIENTE PASO
# ========================================
next_phase: "VALIDATE"
exit_criteria:
  - "All endpoints implemented and working"
  - "Unit tests passing (coverage > 80%)"
  - "Integration tests passing"
  - "Code reviewed"
  - "Documentation complete"
```

### Ejemplo 2: Fix (fix-memory-leak)

```yaml
# ========================================
# /docs/active/fix-memory-leak/ad.yaml
# ========================================

id: "fix-memory-leak"
type: "fix"
description: "Fix memory leak in NotificationService causing crashes"

phase: "VALIDATE"
version: "v0.5.0"
status: "testing"

# ========================================
# CONTEXTO
# ========================================
context_files:
  - "docs/active/fix-memory-leak/00-define/problem.md"
  - "docs/active/fix-memory-leak/00-define/reproduction.md"
  - "docs/active/fix-memory-leak/05-validate/test-results.md"

# ========================================
# CÓDIGO
# ========================================
code_locations:
  - "src/services/NotificationService.js"    # Archivo con el bug
  - "tests/services/NotificationService.test.js"

# ========================================
# BUG INFO
# ========================================
bug:
  reported_by: "monitoring-alerts"
  severity: "high"
  reproduction:
    - "Send 1000 notifications"
    - "Memory usage grows to 2GB"
    - "Never gets garbage collected"
  root_cause: "Event listeners not being removed"
  fix: "Added cleanup in destroy() method"

# ========================================
# TAREAS
# ========================================
tasks:
  - description: "Reproduce the memory leak"
    status: "done"

  - description: "Identify root cause"
    status: "done"

  - description: "Implement fix (cleanup event listeners)"
    status: "done"
    commit: "abc123d"

  - description: "Verify fix with load testing"
    status: "in-progress"

  - description: "Add test to prevent regression"
    status: "pending"

next_phase: "COMPLETED"
exit_criteria:
  - "Memory leak no longer occurs in load tests"
  - "Regression test added"
  - "Fix deployed to production"
```

### Ejemplo 3: Spike (spike-auth-libs)

```yaml
# ========================================
# /docs/active/spike-auth-libs/ad.yaml
# ========================================

id: "spike-auth-libs"
type: "spike"
description: "Evaluate Passport.js vs Auth0 vs custom JWT"

phase: "DISCOVER"
version: "v0.1.0"
status: "investigating"

# ========================================
# CONTEXTO
# ========================================
context_files:
  - "docs/active/spike-auth-libs/00-define/questions.md"
  - "docs/active/spike-auth-libs/01-discover/research.md"
  - "docs/active/spike-auth-libs/01-discover/comparison-table.md"

# ========================================
# CÓDIGO (demos/prototipos)
# ========================================
code_locations:
  - "spikes/passport-demo/"
  - "spikes/auth0-demo/"
  - "spikes/custom-jwt-demo/"

# ========================================
# INVESTIGACIÓN
# ========================================
investigation:
  options:
    - name: "Passport.js"
      pros: ["Open source", "Flexible", "Many strategies"]
      cons: ["More setup", "More code to maintain"]

    - name: "Auth0"
      pros: ["Managed service", "Easy setup", "Enterprise features"]
      cons: ["Cost", "Vendor lock-in"]

    - name: "Custom JWT"
      pros: ["Full control", "No dependencies"]
      cons: ["Security risk", "Reinventing wheel"]

# ========================================
# DECISIÓN
# ========================================
decision:
  chosen: "Passport.js"
  reason: "Balance between flexibility and ease of use. No vendor lock-in."
  documented_in: "docs/decisions.md#ADR-005"

# ========================================
# TAREAS
# ========================================
tasks:
  - description: "Research Passport.js"
    status: "done"

  - description: "Build Passport.js demo"
    status: "done"

  - description: "Research Auth0"
    status: "done"

  - description: "Build Auth0 demo"
    status: "done"

  - description: "Document comparison and recommendation"
    status: "in-progress"

next_phase: "COMPLETED"
exit_criteria:
  - "All options researched"
  - "Decision made and documented"
  - "Recommendation provided to user-auth feature"
```

---

## Cómo la IA Lee el Contexto

### Secuencia al Iniciar Sesión

```bash
# 1. La IA SIEMPRE lee root ad.yaml primero
cat ad.yaml

# 2. Ve las active_features y pregunta al usuario
AI: "I see you have 3 active features:
     1. user-auth (BUILD phase)
     2. fix-memory-leak (VALIDATE phase)
     3. spike-auth-libs (DISCOVER phase)

     Which one would you like to work on?"

# 3. Usuario elige: "user-auth"

# 4. La IA lee el ad.yaml de esa feature
cat docs/active/user-auth/ad.yaml

# 5. La IA lee TODOS los context_files del root
cat docs/decisions.md
cat docs/conventions.md
cat docs/interfaces.md
# ...

# 6. La IA lee TODOS los context_files de la feature
cat docs/active/user-auth/00-define/problem.md
cat docs/active/user-auth/00-define/objectives.md
cat docs/active/user-auth/02-design/design.md
cat docs/active/user-auth/04-build/build-log.md
# ...

# 7. La IA sabe dónde está el código
# code_locations: src/auth/, src/middleware/auth.js

# 8. La IA está lista para trabajar
AI: "I'm ready to continue with user-auth (BUILD phase).
     Current task: 'Implement refresh token logic'
     What would you like me to do?"
```

### Cambiar de Feature

```bash
User: "Switch to fix-memory-leak"

# La IA repite el proceso con la nueva feature
cat docs/active/fix-memory-leak/ad.yaml
# Lee context_files de fix-memory-leak
# Cambia contexto completamente
```

---

## Ventajas de Esta Arquitectura

### 1. **Modularidad Perfecta**
- Cada feature es **autocontenida**
- Su ad.yaml tiene TODO lo necesario para trabajar en ella
- Mover/archivar feature = mover carpeta completa

### 2. **Context Preciso**
- La IA lee **solo lo relevante** para la feature actual
- No se contamina con contexto de otras features
- **Eficiencia de tokens**: No lee 50 features si solo trabajas en 1

### 3. **Escalabilidad**
- Puedes tener **100 features** sin que el root se llene
- Root ad.yaml siempre pequeño (solo enlaces)
- Feature ad.yaml siempre enfocado (solo esa feature)

### 4. **Claridad Total**
```bash
# ¿Qué features están activas?
yq '.active_features' ad.yaml

# ¿En qué fase está user-auth?
yq '.phase' docs/active/user-auth/ad.yaml

# ¿Dónde está el código de user-auth?
yq '.code_locations' docs/active/user-auth/ad.yaml
```

### 5. **Fácil de Archivar**
```bash
# Completar feature = mover carpeta
mv docs/active/user-auth docs/completed/

# Actualizar root ad.yaml
yq eval 'del(.active_features[] | select(.path == "docs/active/user-auth"))' -i ad.yaml
yq eval '.completed_features += [{"path": "docs/completed/user-auth", "completed_at": "2026-01-08"}]' -i ad.yaml
```

### 6. **Multi-feature Paralelo sin Confusión**
- Cada feature en su propia carpeta
- Cada feature con su ad.yaml
- Cambiar de feature = cambiar de contexto completamente

---

## Instrucciones en claude.md

```markdown
# AI Workflow - Session Start

## CRITICAL: Always Read ad.yaml Hierarchy

1. **Read ROOT ad.yaml**
   ```bash
   cat ad.yaml
   ```
   - Get global context_files
   - Get list of active_features
   - Understand project structure

2. **Ask user which feature to work on**
   ```
   AI: "I see you have 3 active features:
        1. user-auth (BUILD phase, v0.4.2)
        2. fix-memory-leak (VALIDATE phase, v0.5.0)
        3. spike-auth-libs (DISCOVER phase, v0.1.0)

        Which one would you like to work on?"
   ```

3. **Read FEATURE ad.yaml**
   ```bash
   # User chose "user-auth"
   cat docs/active/user-auth/ad.yaml
   ```
   - Get feature-specific context_files
   - Get code_locations
   - Get current phase and tasks
   - Get dependencies

4. **Read ALL context files (global + feature)**
   ```bash
   # Global context (from root ad.yaml)
   for file in $(yq '.context_files[]' ad.yaml); do
     cat "$file"
   done

   # Feature context (from feature ad.yaml)
   for file in $(yq '.context_files[]' docs/active/user-auth/ad.yaml); do
     cat "$file"
   done
   ```

5. **Verify code locations exist**
   ```bash
   # Check code_locations from feature ad.yaml
   ls -la src/auth/
   ls -la src/middleware/auth.js
   ```

6. **Read journal and recent commits**
   ```bash
   cat docs/journal.md | head -50
   git log -5 --oneline
   ```

7. **Report status and ask what to do**
   ```
   AI: "Context loaded for user-auth:
        - Phase: BUILD (v0.4.2)
        - Current task: Implement refresh token logic
        - Code: src/auth/
        - 3/7 tasks completed

        What would you like me to do?"
   ```

## Managing Features

### Starting a New Feature

User: "Start new feature: user profile page"

AI Process:
1. Ask DEFINE questions (interactive)
2. Create feature directory structure
3. Create feature ad.yaml
4. Update root ad.yaml
5. Commit

```bash
# Create structure
mkdir -p docs/active/user-profile/{00-define,01-discover,02-design,04-build,05-validate}

# Create feature ad.yaml
cat > docs/active/user-profile/ad.yaml << 'EOF'
id: "user-profile"
type: "feat"
description: "User profile page with avatar and bio"
phase: "DEFINE"
version: "v0.0.0"
status: "in-progress"
context_files:
  - "docs/active/user-profile/00-define/problem.md"
  - "docs/active/user-profile/00-define/objectives.md"
code_locations:
  - "src/pages/Profile/"
  - "src/components/Avatar/"
tasks: []
EOF

# Update root ad.yaml
yq eval '.active_features += [{"path": "docs/active/user-profile", "description": "User profile page", "status": "in-progress"}]' -i ad.yaml

# Commit
git add .
git commit -m "feat: start user-profile feature (v0.0.0)"
```

### Advancing a Feature Phase

```bash
# User completed BUILD phase for user-auth

# Update feature ad.yaml
yq eval '.phase = "VALIDATE"' -i docs/active/user-auth/ad.yaml
yq eval '.version = "v0.5.0"' -i docs/active/user-auth/ad.yaml

# Commit
git add docs/active/user-auth/ad.yaml
git commit -m "chore: user-auth advance to VALIDATE (v0.5.0)"
```

### Completing a Feature

```bash
# User completed user-auth feature

# Move to completed
mv docs/active/user-auth docs/completed/

# Update root ad.yaml
yq eval 'del(.active_features[] | select(.path == "docs/active/user-auth"))' -i ad.yaml
yq eval '.completed_features += [{"path": "docs/completed/user-auth", "completed_at": "2026-01-08", "description": "JWT authentication"}]' -i ad.yaml

# Commit
git add ad.yaml docs/
git commit -m "feat: complete user-auth feature"
```

## Feature ad.yaml Updates

**ALWAYS update feature ad.yaml when**:
- Changing phase: Update `.phase` and `.version`
- Completing a task: Update `.tasks[].status = "done"`
- Adding new code: Add to `.code_locations[]`
- Finding dependencies: Update `.dependencies[]`
- Making decisions: Add to `.notes[]`
```

---

## Ejemplo Completo: Sesión de Trabajo

### Estado Inicial

```yaml
# /ad.yaml
domain: "software"
mode: "feature"
context_files:
  - "docs/decisions.md"
  - "docs/conventions.md"
active_features:
  - path: "docs/active/user-auth"
    description: "JWT authentication"
    status: "in-progress"
  - path: "docs/active/fix-memory"
    description: "Fix memory leak"
    status: "testing"
```

```yaml
# /docs/active/user-auth/ad.yaml
id: "user-auth"
type: "feat"
phase: "BUILD"
version: "v0.4.2"
context_files:
  - "docs/active/user-auth/00-define/problem.md"
  - "docs/active/user-auth/02-design/design.md"
  - "docs/active/user-auth/04-build/build-log.md"
code_locations:
  - "src/auth/"
  - "src/middleware/auth.js"
tasks:
  - description: "Implement JWT generation"
    status: "done"
  - description: "Implement login endpoint"
    status: "done"
  - description: "Implement refresh token"
    status: "in-progress"
```

### Usuario Inicia Sesión

```bash
$ claude-code

# La IA lee automáticamente:

# 1. Root ad.yaml
cat ad.yaml
# → Ve 2 features activas

# 2. Pregunta
AI: "I see you have 2 active features:
     1. user-auth (BUILD phase, v0.4.2) - JWT authentication
     2. fix-memory (VALIDATE phase, v0.5.0) - Fix memory leak

     Which one would you like to work on?"

User: "user-auth"

# 3. Lee feature ad.yaml
cat docs/active/user-auth/ad.yaml

# 4. Lee context global
cat docs/decisions.md
cat docs/conventions.md

# 5. Lee context de feature
cat docs/active/user-auth/00-define/problem.md
cat docs/active/user-auth/02-design/design.md
cat docs/active/user-auth/04-build/build-log.md

# 6. Verifica código
ls -la src/auth/

# 7. Reporta estado
AI: "Context loaded for user-auth:
     - Phase: BUILD (v0.4.2)
     - Type: feat
     - Code: src/auth/, src/middleware/auth.js
     - Progress: 2/3 tasks done
     - Current task: Implement refresh token

     What would you like me to work on?"
```

### Usuario Trabaja en la Feature

```bash
User: "Implement the refresh token endpoint"

# La IA:
# 1. Ya tiene TODO el contexto cargado
# 2. Sabe dónde está el código (src/auth/)
# 3. Conoce el diseño (leyó design.md)
# 4. Implementa el endpoint

AI: "I've implemented the refresh token endpoint:
     - POST /api/auth/refresh
     - Validates refresh token
     - Returns new access + refresh tokens
     - Added to src/auth/refreshToken.js

     Should I update the task status?"

User: "Yes"

# La IA actualiza feature ad.yaml
yq eval '(.tasks[] | select(.description == "Implement refresh token") | .status) = "done"' -i docs/active/user-auth/ad.yaml

git add docs/active/user-auth/ad.yaml src/auth/refreshToken.js
git commit -m "feat(auth): implement refresh token endpoint"
```

### Usuario Cambia de Feature

```bash
User: "Switch to fix-memory"

# La IA:
# 1. Lee feature ad.yaml de fix-memory
cat docs/active/fix-memory/ad.yaml

# 2. Lee context de fix-memory
cat docs/active/fix-memory/00-define/problem.md
cat docs/active/fix-memory/05-validate/test-results.md

# 3. Verifica código
ls -la src/services/NotificationService.js

# 4. Reporta
AI: "Context loaded for fix-memory:
     - Phase: VALIDATE (v0.5.0)
     - Type: fix
     - Bug: Memory leak in NotificationService
     - Fix applied: Cleanup event listeners
     - Current task: Verify fix with load testing

     What would you like me to do?"
```

---

## Próximos Pasos

### Para Implementar

1. **Definir schema completo de feature ad.yaml**
   - Todos los campos posibles
   - Validación con JSON Schema
   - Templates para cada tipo (feat, fix, spike, etc.)

2. **Actualizar claude.md con instrucciones jerárquicas**
   - Cómo leer root ad.yaml
   - Cómo leer feature ad.yaml
   - Cómo cambiar entre features
   - Cómo actualizar ad.yaml

3. **Crear comandos/helpers**
   - `ad-feature-new <name> <type>` → Crea estructura
   - `ad-feature-switch <name>` → Cambia contexto
   - `ad-feature-complete <name>` → Archiva feature
   - O incluirlo todo en claude.md como instrucciones yq

4. **Probar con proyecto real**
   - Crear 2-3 features de prueba
   - Verificar que la IA lea correctamente
   - Iterar basado en experiencia

---

## Preguntas

1. **¿Esto se alinea con tu visión?**

2. **¿Qué campos debe tener obligatoriamente cada feature ad.yaml?**
   - id, type, phase, version, context_files, code_locations
   - ¿Qué más?

3. **¿Límite de features activas?**
   - ¿Recomendar máximo 3-5 activas a la vez?

4. **¿Estructura de tasks dentro de feature ad.yaml?**
   - ¿Es útil o mejor solo usar build-log.md?

5. **¿Templates por tipo de feature?**
   - feat-template.yaml
   - fix-template.yaml
   - spike-template.yaml

**¿Listo para empezar a implementar esto?**
