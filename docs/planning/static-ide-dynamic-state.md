# Separación: IDE Estático vs Estado Dinámico

**Fecha**: 2026-01-08
**Estado**: Principio Fundamental
**Autor**: Héctor Prats + Claude

---

## Principio Fundamental

```
claude.md (y otros IDE configs) = ESTÁTICO (NUNCA se modifica)
ad.yaml + context_files = DINÁMICO (Se actualiza constantemente)
```

### ❌ MAL (No queremos esto):
```bash
# NO: Modificar claude.md según el proyecto
echo "# Project: MyApp" >> claude.md
echo "Phase: BUILD" >> claude.md
```

### ✅ BIEN (Lo que queremos):
```bash
# SÍ: claude.md lee ad.yaml para conocer el estado
cat ad.yaml  # phase: BUILD
cat docs/active/user-auth/ad.yaml  # Contexto específico
```

---

## Arquitectura: Capas de Información

```
┌─────────────────────────────────────────────┐
│ CAPA 1: IDE CONFIG (ESTÁTICO)              │
│                                             │
│ claude.md / .cursorrules / .windsurfrules  │
│                                             │
│ - Reglas universales                       │
│ - Principios AD                            │
│ - Instrucciones de workflow                │
│ - Cómo leer ad.yaml                        │
│                                             │
│ ❌ NO contiene estado del proyecto         │
│ ❌ NO se modifica nunca                    │
│ ✅ Se versiona en git una vez              │
│ ✅ Se copia a proyectos nuevos             │
└─────────────────────────────────────────────┘
                    │
                    │ lee ↓
┌─────────────────────────────────────────────┐
│ CAPA 2: MANIFIESTO DEL PROYECTO (DINÁMICO) │
│                                             │
│ ad.yaml (root + features)                  │
│                                             │
│ - Estado actual del proyecto               │
│ - Features activas                         │
│ - Agentes configurados                     │
│ - Enlaces a context_files                  │
│ - Configuración específica                 │
│                                             │
│ ✅ Se modifica constantemente              │
│ ✅ Refleja estado real                     │
│ ✅ Commiteado en cada cambio               │
└─────────────────────────────────────────────┘
                    │
                    │ referencia ↓
┌─────────────────────────────────────────────┐
│ CAPA 3: DOCUMENTACIÓN (DINÁMICO)          │
│                                             │
│ docs/ + context_files                      │
│                                             │
│ - Documentación del proyecto               │
│ - Decisiones (decisions.md)                │
│ - Contratos (interfaces.md)                │
│ - Features activas                         │
│ - Código fuente                            │
│                                             │
│ ✅ Se crea/actualiza según necesidad       │
│ ✅ Referenciado desde ad.yaml              │
└─────────────────────────────────────────────┘
```

---

## Contenido de Cada Capa

### CAPA 1: claude.md (Estático)

```markdown
# Agentic Driven (AD) 1.0

## Principios Universales
[13 principios que nunca cambian]

## Workflow General
[Descripción de las 10 fases]

## AI Workflow - Session Start

**CRITICAL: ALWAYS read ad.yaml first**

1. Read root ad.yaml
   ```bash
   cat ad.yaml
   ```
   - Get domain, mode, context_files
   - Get active_features list
   - Get agents configuration

2. For each active feature, read its ad.yaml
   ```bash
   # User chose to work on "user-auth"
   cat docs/active/user-auth/ad.yaml
   ```
   - Get phase, version, status
   - Get context_files to read
   - Get code_locations
   - Get agent status

3. Read ALL context files
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

4. Ask user what to work on

## During Work

**Update ad.yaml, NOT claude.md**

When you:
- Advance phase → Update feature ad.yaml
- Create document → Add to context_files in ad.yaml
- Create code → Add to code_locations in ad.yaml
- Complete task → Update tasks[] in ad.yaml
- Change agent status → Update agents[] in ad.yaml

**NEVER modify claude.md or .cursorrules or .windsurfrules**

## Phase-Specific Instructions

[Instrucciones para cada fase - NO cambian]

## Exit Criteria

[Criterios de salida - NO cambian]

---

# That's it. This file NEVER changes.
# All dynamic state is in ad.yaml and referenced files.
```

### CAPA 2: ad.yaml (Dinámico)

```yaml
# /ad.yaml (ROOT)
# Este archivo SE MODIFICA constantemente

domain: "software"              # Set once, no change
mode: "feature"                 # Set once, no change

# Contexto global (puede crecer)
context_files:
  - "docs/decisions.md"
  - "docs/conventions.md"
  - "docs/interfaces.md"
  # Más archivos según necesidad

# Features (cambia constantemente)
active_features:
  - path: "docs/active/user-auth"
    description: "JWT authentication"
    status: "in-progress"        # Actualiza según avanza
  - path: "docs/active/fix-memory"
    description: "Fix memory leak"
    status: "testing"

# Historial (crece)
completed_features:
  - path: "docs/completed/initial-setup"
    completed_at: "2026-01-05"

# Agentes (puede cambiar)
agents:
  enabled: true
  platform: "claude-sdk"
  default_coordination: "message-passing"
  team:
    - id: "backend-dev"
      role: "backend"
      phases: ["BUILD", "VALIDATE"]
      # ...más configuración
```

```yaml
# /docs/active/user-auth/ad.yaml (FEATURE)
# Este archivo SE MODIFICA constantemente

id: "user-auth"
type: "feat"
description: "JWT authentication"

# Estado actual (cambia constantemente)
phase: "BUILD"                  # DEFINE → DISCOVER → DESIGN → BUILD ...
version: "v0.4.2"              # Incrementa con cada avance
status: "in-progress"          # in-progress|blocked|testing|completed

# Context (crece según se crea documentación)
context_files:
  - "docs/active/user-auth/00-define/problem.md"
  - "docs/active/user-auth/02-design/design.md"
  - "docs/active/user-auth/04-build/build-log.md"
  # Más archivos según se crean

# Code (crece según se escribe código)
code_locations:
  - "src/auth/"
  - "src/middleware/auth.js"
  - "tests/auth/"
  # Más directorios según se crean

# Agentes (estado cambia constantemente)
agents:
  active:
    - id: "backend-dev"
      status: "working"         # working|blocked|idle
      current_task: "Implement JWT"
    - id: "frontend-dev"
      status: "blocked"
      blocked_by: "backend-dev"
  coordination:
    communication: [...]       # Log de mensajes
    shared_state: {...}        # Estado compartido

# Tareas (se completan progresivamente)
tasks:
  - description: "Define requirements"
    status: "done"             # pending → in-progress → done
  - description: "Design API"
    status: "done"
  - description: "Implement JWT"
    status: "in-progress"
  - description: "Write tests"
    status: "pending"
```

### CAPA 3: Documentación (Dinámico)

```
docs/
├── decisions.md              # Crece con cada decisión
├── conventions.md            # Puede actualizarse
├── interfaces.md             # Crece con contratos
│
├── active/
│   ├── user-auth/
│   │   ├── ad.yaml          # Feature config (DINÁMICO)
│   │   ├── 00-define/
│   │   │   ├── problem.md   # Creado en DEFINE
│   │   │   └── scope.md
│   │   ├── 02-design/
│   │   │   └── design.md    # Creado en DESIGN
│   │   └── 04-build/
│   │       └── build-log.md # Actualizado en BUILD
│   │
│   └── fix-memory/
│       ├── ad.yaml
│       └── ...

src/                          # Código (DINÁMICO)
├── auth/                     # Creado durante BUILD
└── ...
```

---

## Flujo de Trabajo: Cómo Funciona

### Inicio de Sesión

```bash
1. Usuario ejecuta IDE
   $ claude-code

2. IDE lee claude.md (ESTÁTICO)
   - Aprende las reglas universales
   - Aprende cómo leer ad.yaml
   - Aprende el workflow general

3. IA ejecuta instrucciones de claude.md:
   # Primera instrucción: Lee ad.yaml
   cat ad.yaml

   # Segunda instrucción: Lee feature ad.yaml
   cat docs/active/user-auth/ad.yaml

   # Tercera instrucción: Lee context_files
   cat docs/decisions.md
   cat docs/active/user-auth/00-define/problem.md
   cat docs/active/user-auth/02-design/design.md

4. IA tiene contexto completo sin modificar claude.md
```

### Durante el Trabajo

```bash
Usuario: "Implement JWT generation"

# IA lee claude.md → Sabe que debe:
# 1. Implementar código
# 2. Actualizar ad.yaml
# 3. Actualizar documentación
# 4. Commit

# IA ejecuta:
1. Implementa src/auth/jwt.js

2. Actualiza feature ad.yaml (NO claude.md)
   yq eval '.code_locations += ["src/auth/jwt.js"]' -i docs/active/user-auth/ad.yaml
   yq eval '(.tasks[] | select(.description == "Implement JWT") | .status) = "done"' -i docs/active/user-auth/ad.yaml
   yq eval '(.agents.active[] | select(.id == "backend-dev") | .status) = "idle"' -i docs/active/user-auth/ad.yaml

3. Actualiza build-log.md
   echo "## JWT Generation - Completed" >> docs/active/user-auth/04-build/build-log.md

4. Commit
   git add src/auth/jwt.js docs/active/user-auth/ad.yaml docs/active/user-auth/04-build/build-log.md
   git commit -m "feat(auth): implement JWT generation"

# claude.md NO se tocó
```

### Cambio de Feature

```bash
Usuario: "Switch to fix-memory"

# IA lee claude.md → Sabe que debe:
# 1. Leer ad.yaml del nuevo feature
# 2. Leer context_files del nuevo feature
# 3. Cambiar contexto

# IA ejecuta:
1. cat docs/active/fix-memory/ad.yaml
2. cat docs/active/fix-memory/00-define/problem.md
3. Cambia contexto completamente

# claude.md sigue siendo el mismo
```

---

## Beneficios de Esta Arquitectura

### ✅ IDE Config es Portable

```bash
# Copias claude.md a un proyecto nuevo
cp /path/to/templates/claude.md .

# Ya funciona - no necesitas modificarlo
# Solo necesitas crear ad.yaml para ese proyecto
```

### ✅ IDE Config es Versionable

```bash
# Una vez creado, claude.md se versiona
git add claude.md
git commit -m "chore: add AD methodology config"

# Nunca más lo modificas
# Todos los cambios futuros van a ad.yaml
```

### ✅ Múltiples Proyectos, Mismo Config

```bash
project-1/
├── claude.md    # Mismo archivo
└── ad.yaml      # Específico de project-1

project-2/
├── claude.md    # Mismo archivo (copia)
└── ad.yaml      # Específico de project-2

# claude.md es universal
# ad.yaml es específico
```

### ✅ Actualización de Metodología es Fácil

```bash
# AD 1.0 → AD 2.0
# Solo actualizas el template de claude.md
# Copias a proyectos existentes
cp /templates/claude.md-v2.0 ./claude.md

# ad.yaml sigue siendo compatible
# (si diseñamos schema retrocompatible)
```

### ✅ No Hay Drift entre IDEs

```bash
# Todos los IDEs leen el mismo ad.yaml
# No importa si usas Cursor, Windsurf, o Claude Code

# Cursor lee:
.cursorrules (ESTÁTICO) → ad.yaml (DINÁMICO)

# Windsurf lee:
.windsurfrules (ESTÁTICO) → ad.yaml (DINÁMICO)

# Claude Code lee:
claude.md (ESTÁTICO) → ad.yaml (DINÁMICO)

# ad.yaml es la fuente de verdad
```

---

## Instrucciones Explícitas en claude.md

```markdown
# ========================================
# CRITICAL: NEVER MODIFY THIS FILE
# ========================================

**This file (claude.md) is STATIC and must NEVER be modified by AI or user during project work.**

All dynamic project state lives in:
- ad.yaml (root + features)
- context_files referenced in ad.yaml
- docs/ directory
- src/ code

## What This File Contains (STATIC)

- Universal AD principles
- Phase descriptions
- Workflow instructions
- How to read ad.yaml
- How to update ad.yaml
- Exit criteria

## What This File DOES NOT Contain

❌ Project-specific state
❌ Current phase (that's in ad.yaml)
❌ Active features (that's in ad.yaml)
❌ Context files (those are referenced in ad.yaml)
❌ Agent status (that's in feature ad.yaml)

## How to Work

1. Read claude.md (this file) once at session start
   - Learn the rules
   - Learn the workflow
   - Learn how to use ad.yaml

2. Read ad.yaml for project state
   - What phase are we in?
   - What features are active?
   - What agents are configured?

3. Read context_files for project knowledge
   - Decisions, conventions, interfaces
   - Feature documentation
   - Code

4. DO YOUR WORK

5. Update ad.yaml and context_files
   - NOT this file (claude.md)

## Validation

Before every commit, check:

- [ ] Is claude.md unmodified? (git diff claude.md should be empty)
- [ ] Are ad.yaml changes valid? (run validate-ad-yaml.sh)
- [ ] Are context_files updated?

If claude.md was modified:
```bash
git restore claude.md
echo "ERROR: claude.md should never be modified"
echo "All changes should go to ad.yaml and context_files"
```

## Remember

```
claude.md = TEMPLATE (never changes per project)
ad.yaml = STATE (changes constantly)
```
```

---

## Validación en Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Check if claude.md is being committed with modifications
if git diff --cached --name-only | grep -q "^claude.md$"; then
    echo "============================================"
    echo "ERROR: Attempting to commit changes to claude.md"
    echo "============================================"
    echo ""
    echo "claude.md is a STATIC template and should not be modified."
    echo ""
    echo "If you need to update project state, modify:"
    echo "  - ad.yaml"
    echo "  - docs/active/*/ad.yaml"
    echo "  - context_files"
    echo ""
    echo "If you're updating the AD methodology itself (rare):"
    echo "  1. Update the template in /templates/"
    echo "  2. Copy to all projects manually"
    echo ""
    echo "Commit aborted."
    echo "============================================"
    exit 1
fi

# Validate ad.yaml if being committed
if git diff --cached --name-only | grep -q "ad.yaml"; then
    echo "Validating ad.yaml changes..."
    bash scripts/validate-ad-yaml.sh || exit 1
fi

exit 0
```

---

## Migración de Proyectos Existentes

```bash
# Si tienes un proyecto con configuración vieja:

# 1. Backup del config viejo
cp claude.md claude.md.old

# 2. Copia el template nuevo
cp /templates/claude.md-v2.0 claude.md

# 3. Extrae estado del viejo config a ad.yaml
# (esto puede requerir script de migración)
python scripts/migrate-config-to-ad-yaml.py claude.md.old

# 4. Valida
bash scripts/validate-ad-yaml.sh

# 5. Commit
git add claude.md ad.yaml
git commit -m "refactor: migrate to static claude.md + dynamic ad.yaml"

# 6. Delete backup
rm claude.md.old
```

---

## Resumen

| Archivo | Tipo | ¿Se modifica? | Contiene | Versionado |
|---------|------|---------------|----------|------------|
| **claude.md** | ESTÁTICO | ❌ NUNCA | Reglas universales, workflow, instrucciones | ✅ Una vez |
| **.cursorrules** | ESTÁTICO | ❌ NUNCA | Reglas universales (formato Cursor) | ✅ Una vez |
| **.windsurfrules** | ESTÁTICO | ❌ NUNCA | Reglas universales (formato Windsurf) | ✅ Una vez |
| **ad.yaml** (root) | DINÁMICO | ✅ SÍ | Estado del proyecto, features, agentes | ✅ Cada cambio |
| **feature/ad.yaml** | DINÁMICO | ✅ SÍ | Estado de feature, tareas, código | ✅ Cada cambio |
| **docs/\*.md** | DINÁMICO | ✅ SÍ | Documentación del proyecto | ✅ Cada cambio |
| **src/\*** | DINÁMICO | ✅ SÍ | Código fuente | ✅ Cada cambio |

---

## Próximos Pasos

1. **Refactor claude.md** para que sea completamente estático
2. **Asegurar que NO hay instrucciones** que modifiquen claude.md
3. **Añadir validación** en pre-commit hook
4. **Crear template oficial** de claude.md
5. **Documentar proceso** de copia a proyectos nuevos
6. **Probar con proyecto real**

**¿Está claro el concepto ahora?**
