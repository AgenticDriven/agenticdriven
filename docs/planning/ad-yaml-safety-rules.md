# Reglas de Seguridad para ad.yaml - Prevención de Corrupción

**Fecha**: 2026-01-08
**Estado**: Especificación Crítica
**Autor**: Héctor Prats + Claude

---

## Problema a Resolver

**Riesgo**: Si la IA modifica ad.yaml sin reglas estrictas, puede:
- Corromper la estructura del root ad.yaml
- Modificar campos globales que no debería
- No actualizar los feature ad.yaml consistentemente
- Crear inconsistencias entre root y features

**Solución**: Reglas explícitas y validación automática

---

## Principio de Separación de Responsabilidades

```yaml
# ROOT ad.yaml - La IA puede modificar SOLO estos campos:
✅ active_features[].path          # Añadir/quitar enlaces
✅ active_features[].status        # Actualizar status
✅ active_features[].description   # Actualizar descripción
✅ completed_features[]            # Añadir features completadas

❌ domain                          # NUNCA modificar (definido por usuario)
❌ mode                            # NUNCA modificar (definido por usuario)
❌ context_files[]                 # Solo si usuario lo pide explícitamente
❌ agents[]                        # Solo si usuario lo pide explícitamente
❌ settings{}                      # Solo si usuario lo pide explícitamente

# FEATURE ad.yaml - La IA puede modificar libremente:
✅ phase                           # Avanzar fase
✅ version                         # Actualizar versión
✅ status                          # Actualizar status
✅ context_files[]                 # Añadir docs creados
✅ code_locations[]                # Añadir código creado
✅ tasks[]                         # Gestionar tareas
✅ notes[]                         # Añadir notas
✅ dependencies[]                  # Gestionar dependencias
```

---

## Schema Formal con Validación

### Root ad.yaml Schema

```yaml
# JSON Schema para root ad.yaml
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["domain", "mode"],
  "properties": {
    "domain": {
      "type": "string",
      "enum": ["software", "book", "marketing", "event", "product", "research", "course", "game"],
      "readonly": true,
      "comment": "AI MUST NOT modify this field"
    },
    "mode": {
      "type": "string",
      "enum": ["project", "feature"],
      "readonly": true,
      "comment": "AI MUST NOT modify this field"
    },
    "version": {
      "type": "string",
      "pattern": "^v[0-9]+\\.[0-9]+\\.[0-9]+$",
      "readonly": true,
      "comment": "AI MUST NOT modify this field"
    },
    "context_files": {
      "type": "array",
      "items": {"type": "string"},
      "readonly": true,
      "comment": "AI can only add with explicit user request"
    },
    "active_features": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["path", "description", "status"],
        "properties": {
          "path": {"type": "string"},
          "description": {"type": "string"},
          "status": {
            "type": "string",
            "enum": ["in-progress", "blocked", "testing", "review"]
          }
        }
      },
      "comment": "AI CAN modify this - add/remove features"
    },
    "completed_features": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["path", "completed_at", "description"],
        "properties": {
          "path": {"type": "string"},
          "completed_at": {"type": "string", "format": "date"},
          "description": {"type": "string"}
        }
      },
      "comment": "AI CAN add to this when completing features"
    },
    "agents": {
      "type": "array",
      "readonly": true,
      "comment": "AI MUST NOT modify - multi-agent config"
    },
    "settings": {
      "type": "object",
      "readonly": true,
      "comment": "AI MUST NOT modify - user preferences"
    }
  }
}
```

### Feature ad.yaml Schema

```yaml
# JSON Schema para feature ad.yaml
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "type", "phase", "context_files", "code_locations"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "readonly": true,
      "comment": "Set once on creation, never modified"
    },
    "type": {
      "type": "string",
      "enum": ["feat", "fix", "spike", "refactor", "docs", "chore"],
      "readonly": true,
      "comment": "Set once on creation, never modified"
    },
    "description": {
      "type": "string",
      "comment": "AI can update if needed"
    },
    "phase": {
      "type": "string",
      "enum": ["DEFINE", "DISCOVER", "DESIGN", "SETUP", "BUILD", "VALIDATE", "MARKET", "LAUNCH", "SUPPORT", "EVOLVE"],
      "comment": "AI MUST update when advancing phase"
    },
    "version": {
      "type": "string",
      "pattern": "^v0\\.[0-9]+\\.[0-9]+$",
      "comment": "AI MUST update when advancing phase"
    },
    "status": {
      "type": "string",
      "enum": ["in-progress", "blocked", "testing", "review", "completed"],
      "comment": "AI should update as work progresses"
    },
    "context_files": {
      "type": "array",
      "items": {"type": "string"},
      "comment": "AI should add files it creates"
    },
    "code_locations": {
      "type": "array",
      "items": {"type": "string"},
      "comment": "AI should add code directories/files it creates"
    },
    "tasks": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["description", "status"],
        "properties": {
          "description": {"type": "string"},
          "status": {
            "type": "string",
            "enum": ["pending", "in-progress", "done", "blocked"]
          },
          "commit": {"type": "string"}
        }
      },
      "comment": "AI can freely manage tasks"
    },
    "dependencies": {
      "type": "array",
      "comment": "AI can add/update dependencies"
    },
    "notes": {
      "type": "array",
      "items": {"type": "string"},
      "comment": "AI can add notes"
    },
    "next_phase": {
      "type": "string",
      "comment": "AI can update"
    }
  }
}
```

---

## Reglas Explícitas para claude.md

```markdown
# ========================================
# CRITICAL: ad.yaml Modification Rules
# ========================================

## NEVER Modify These Fields in ROOT ad.yaml

**These fields are USER-DEFINED and must NEVER be changed by AI:**

```bash
# ❌ FORBIDDEN - DO NOT MODIFY
yq eval '.domain = "..."' ad.yaml              # NEVER
yq eval '.mode = "..."' ad.yaml                # NEVER
yq eval '.version = "..."' ad.yaml             # NEVER
yq eval '.context_files = [...]' ad.yaml       # Only if user explicitly asks
yq eval '.agents = [...]' ad.yaml              # Only if user explicitly asks
yq eval '.settings = {...}' ad.yaml            # Only if user explicitly asks
```

## Allowed Operations on ROOT ad.yaml

**You CAN ONLY modify these fields:**

### Adding a New Feature

```bash
# ✅ ALLOWED - Adding to active_features
yq eval '.active_features += [{
  "path": "docs/active/new-feature",
  "description": "Feature description",
  "status": "in-progress"
}]' -i ad.yaml
```

### Updating Feature Status

```bash
# ✅ ALLOWED - Updating status
yq eval '(.active_features[] | select(.path == "docs/active/user-auth") | .status) = "testing"' -i ad.yaml
```

### Completing a Feature

```bash
# ✅ ALLOWED - Moving to completed
yq eval '.completed_features += [{
  "path": "docs/completed/user-auth",
  "completed_at": "2026-01-08",
  "description": "JWT authentication"
}]' -i ad.yaml

yq eval 'del(.active_features[] | select(.path == "docs/active/user-auth"))' -i ad.yaml
```

### Adding Global Context File (WITH USER PERMISSION)

```bash
# ⚠️ ASK USER FIRST
AI: "I've created docs/architecture.md. Should I add it to the global context_files?"
User: "Yes"

# Then and only then:
yq eval '.context_files += ["docs/architecture.md"]' -i ad.yaml
```

## ALWAYS Modify Feature ad.yaml

**When working on a feature, you MUST keep its ad.yaml updated:**

### Advancing Phase

```bash
# ✅ REQUIRED - Update both phase and version
yq eval '.phase = "BUILD"' -i docs/active/user-auth/ad.yaml
yq eval '.version = "v0.4.0"' -i docs/active/user-auth/ad.yaml

# Then commit
git add docs/active/user-auth/ad.yaml
git commit -m "chore(user-auth): advance to BUILD phase (v0.4.0)"
```

### Adding New Context File

```bash
# ✅ REQUIRED - When you create a new doc
# Example: You just created docs/active/user-auth/02-design/design.md

yq eval '.context_files += ["docs/active/user-auth/02-design/design.md"]' -i docs/active/user-auth/ad.yaml

git add docs/active/user-auth/ad.yaml docs/active/user-auth/02-design/design.md
git commit -m "docs(user-auth): add design document"
```

### Adding Code Location

```bash
# ✅ REQUIRED - When you create new code
# Example: You just created src/auth/

yq eval '.code_locations += ["src/auth/"]' -i docs/active/user-auth/ad.yaml

git add docs/active/user-auth/ad.yaml src/auth/
git commit -m "feat(user-auth): add authentication service"
```

### Updating Tasks

```bash
# ✅ REQUIRED - When completing a task
yq eval '(.tasks[] | select(.description == "Implement login endpoint") | .status) = "done"' -i docs/active/user-auth/ad.yaml
yq eval '(.tasks[] | select(.description == "Implement login endpoint") | .commit) = "'$(git rev-parse HEAD)'"' -i docs/active/user-auth/ad.yaml

git add docs/active/user-auth/ad.yaml
git commit -m "chore(user-auth): mark login endpoint task as complete"
```

### Adding Notes

```bash
# ✅ OPTIONAL - Add important notes/decisions
yq eval '.notes += ["Using bcrypt with 10 salt rounds"]' -i docs/active/user-auth/ad.yaml
```

## Validation After Every Modification

**CRITICAL: After EVERY modification to ANY ad.yaml, you MUST validate:**

```bash
# 1. Check YAML is valid
yq eval ad.yaml > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "ERROR: Root ad.yaml is invalid YAML!"
  git restore ad.yaml
  exit 1
fi

# 2. Check required fields exist
yq eval '.domain' ad.yaml > /dev/null || echo "ERROR: Missing domain"
yq eval '.mode' ad.yaml > /dev/null || echo "ERROR: Missing mode"

# 3. For feature ad.yaml
yq eval docs/active/user-auth/ad.yaml > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "ERROR: Feature ad.yaml is invalid!"
  git restore docs/active/user-auth/ad.yaml
  exit 1
fi

# 4. Check required fields in feature
yq eval '.id' docs/active/user-auth/ad.yaml > /dev/null || echo "ERROR: Missing id"
yq eval '.type' docs/active/user-auth/ad.yaml > /dev/null || echo "ERROR: Missing type"
yq eval '.phase' docs/active/user-auth/ad.yaml > /dev/null || echo "ERROR: Missing phase"
```

## Checklist Before Committing

**Before every commit that touches ad.yaml files, verify:**

- [ ] Is the YAML valid? (`yq eval file.yaml`)
- [ ] Did I only modify allowed fields?
- [ ] Did I update both root AND feature ad.yaml if needed?
- [ ] Are paths in active_features correct?
- [ ] Are all context_files actual existing files?
- [ ] Are all code_locations actual existing directories?
- [ ] Does the commit message reflect the ad.yaml change?

## What to Do on Error

If validation fails:

```bash
# 1. Show the error to user
echo "ERROR: ad.yaml validation failed. Details: ..."

# 2. Restore the file
git restore ad.yaml

# 3. Explain what went wrong
AI: "I attempted to modify ad.yaml but validation failed.
     The file has been restored to its previous state.
     Error: [specific error]

     I should not have modified [field X] because [reason]."

# 4. Ask user what to do
AI: "Would you like me to:
     1. Try a different approach?
     2. Ask you to manually update ad.yaml?
     3. Skip this update?"
```
```

---

## Script de Validación Automática

```bash
#!/bin/bash
# validate-ad-yaml.sh - Validar ad.yaml después de modificación

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to validate YAML syntax
validate_yaml_syntax() {
    local file=$1
    if ! yq eval "$file" > /dev/null 2>&1; then
        echo -e "${RED}✗ YAML syntax error in $file${NC}"
        return 1
    fi
    echo -e "${GREEN}✓ YAML syntax valid: $file${NC}"
    return 0
}

# Function to validate root ad.yaml
validate_root_ad_yaml() {
    local file="ad.yaml"

    echo "Validating root ad.yaml..."

    # Check syntax
    validate_yaml_syntax "$file" || return 1

    # Check required fields
    local required_fields=("domain" "mode")
    for field in "${required_fields[@]}"; do
        if ! yq eval ".$field" "$file" > /dev/null 2>&1; then
            echo -e "${RED}✗ Missing required field: $field${NC}"
            return 1
        fi
    done

    # Validate domain value
    local domain=$(yq eval '.domain' "$file")
    local valid_domains=("software" "book" "marketing" "event" "product" "research" "course" "game")
    if [[ ! " ${valid_domains[@]} " =~ " ${domain} " ]]; then
        echo -e "${RED}✗ Invalid domain: $domain${NC}"
        echo -e "${YELLOW}  Valid domains: ${valid_domains[*]}${NC}"
        return 1
    fi

    # Validate mode value
    local mode=$(yq eval '.mode' "$file")
    if [[ "$mode" != "project" && "$mode" != "feature" ]]; then
        echo -e "${RED}✗ Invalid mode: $mode (must be 'project' or 'feature')${NC}"
        return 1
    fi

    # Check active_features paths exist
    if yq eval '.active_features' "$file" > /dev/null 2>&1; then
        local paths=$(yq eval '.active_features[].path' "$file")
        for path in $paths; do
            if [ ! -d "$path" ]; then
                echo -e "${YELLOW}⚠ Warning: active_features path does not exist: $path${NC}"
            fi
        done
    fi

    echo -e "${GREEN}✓ Root ad.yaml is valid${NC}"
    return 0
}

# Function to validate feature ad.yaml
validate_feature_ad_yaml() {
    local file=$1

    echo "Validating feature ad.yaml: $file"

    # Check syntax
    validate_yaml_syntax "$file" || return 1

    # Check required fields
    local required_fields=("id" "type" "phase" "context_files" "code_locations")
    for field in "${required_fields[@]}"; do
        if ! yq eval ".$field" "$file" > /dev/null 2>&1; then
            echo -e "${RED}✗ Missing required field: $field${NC}"
            return 1
        fi
    done

    # Validate type
    local type=$(yq eval '.type' "$file")
    local valid_types=("feat" "fix" "spike" "refactor" "docs" "chore")
    if [[ ! " ${valid_types[@]} " =~ " ${type} " ]]; then
        echo -e "${RED}✗ Invalid type: $type${NC}"
        echo -e "${YELLOW}  Valid types: ${valid_types[*]}${NC}"
        return 1
    fi

    # Validate phase
    local phase=$(yq eval '.phase' "$file")
    local valid_phases=("DEFINE" "DISCOVER" "DESIGN" "SETUP" "BUILD" "VALIDATE" "MARKET" "LAUNCH" "SUPPORT" "EVOLVE")
    if [[ ! " ${valid_phases[@]} " =~ " ${phase} " ]]; then
        echo -e "${RED}✗ Invalid phase: $phase${NC}"
        echo -e "${YELLOW}  Valid phases: ${valid_phases[*]}${NC}"
        return 1
    fi

    # Check context_files exist
    local context_files=$(yq eval '.context_files[]' "$file" 2>/dev/null)
    for cf in $context_files; do
        if [ ! -f "$cf" ]; then
            echo -e "${YELLOW}⚠ Warning: context_file does not exist: $cf${NC}"
        fi
    done

    # Check code_locations exist
    local code_locations=$(yq eval '.code_locations[]' "$file" 2>/dev/null)
    for cl in $code_locations; do
        if [ ! -e "$cl" ]; then
            echo -e "${YELLOW}⚠ Warning: code_location does not exist: $cl${NC}"
        fi
    done

    echo -e "${GREEN}✓ Feature ad.yaml is valid: $file${NC}"
    return 0
}

# Main validation
main() {
    echo "========================================="
    echo "AD.YAML Validation"
    echo "========================================="
    echo ""

    # Validate root
    if [ -f "ad.yaml" ]; then
        validate_root_ad_yaml || exit 1
    else
        echo -e "${RED}✗ Root ad.yaml not found${NC}"
        exit 1
    fi

    echo ""

    # Validate all feature ad.yaml files
    local feature_yamls=$(find docs/active -name "ad.yaml" 2>/dev/null)
    if [ -z "$feature_yamls" ]; then
        echo -e "${YELLOW}⚠ No feature ad.yaml files found${NC}"
    else
        for fy in $feature_yamls; do
            validate_feature_ad_yaml "$fy" || exit 1
            echo ""
        done
    fi

    echo "========================================="
    echo -e "${GREEN}✓ All ad.yaml files are valid${NC}"
    echo "========================================="
}

main "$@"
```

---

## Git Hook Pre-commit

```bash
#!/bin/bash
# .git/hooks/pre-commit
# Validar ad.yaml antes de commit

# Check if any ad.yaml file is being committed
if git diff --cached --name-only | grep -q "ad.yaml"; then
    echo "Validating ad.yaml files..."

    # Run validation script
    if [ -f "scripts/validate-ad-yaml.sh" ]; then
        bash scripts/validate-ad-yaml.sh
        if [ $? -ne 0 ]; then
            echo ""
            echo "ERROR: ad.yaml validation failed!"
            echo "Commit aborted."
            echo ""
            echo "Fix the errors above or use 'git commit --no-verify' to bypass (not recommended)"
            exit 1
        fi
    else
        echo "Warning: validate-ad-yaml.sh not found, skipping validation"
    fi

    echo "ad.yaml validation passed ✓"
fi

exit 0
```

---

## Instrucciones para IDEs (claude.md)

```markdown
# ========================================
# CRITICAL: Always Validate ad.yaml
# ========================================

## After EVERY ad.yaml modification:

1. **Validate syntax**:
   ```bash
   yq eval ad.yaml > /dev/null
   # If this fails, RESTORE the file immediately
   ```

2. **Run validation script** (if exists):
   ```bash
   bash scripts/validate-ad-yaml.sh
   # If this fails, RESTORE and explain error to user
   ```

3. **Verify changes manually**:
   ```bash
   git diff ad.yaml
   # Review what changed - does it match the allowed operations?
   ```

4. **If validation fails**:
   ```bash
   git restore ad.yaml
   git restore docs/active/*/ad.yaml

   # Explain to user
   AI: "I attempted to modify ad.yaml but made an error.
        Files have been restored to their previous state.
        Error: [specific error]

        I will not modify ad.yaml unless I'm certain it's correct."
   ```

## Pattern for Safe Updates

```bash
# 1. Backup current state
cp ad.yaml ad.yaml.backup

# 2. Make modification
yq eval '[modification]' -i ad.yaml

# 3. Validate
if ! yq eval ad.yaml > /dev/null 2>&1; then
    echo "Validation failed, restoring backup"
    mv ad.yaml.backup ad.yaml
    exit 1
fi

# 4. Check required fields still exist
if ! yq eval '.domain' ad.yaml > /dev/null 2>&1; then
    echo "ERROR: Lost domain field, restoring"
    mv ad.yaml.backup ad.yaml
    exit 1
fi

# 5. Success - remove backup
rm ad.yaml.backup

# 6. Commit
git add ad.yaml
git commit -m "chore: update ad.yaml"
```

## When in Doubt - ASK USER

```
AI: "I need to update ad.yaml to [action].
     This will modify [field].

     Current value:
     [show current value]

     New value:
     [show new value]

     Is this correct?"

User: "Yes" or "No"
```
```

---

## Ejemplos de Errores Comunes y Prevención

### ❌ Error 1: Modificar domain sin querer

```bash
# MAL - Esto eliminaría domain
yq eval 'del(.domain)' -i ad.yaml

# PREVENCIÓN en claude.md:
"NEVER use 'del()' on root ad.yaml fields except:
 - .active_features[]
 - .completed_features[]"
```

### ❌ Error 2: Sobrescribir context_files

```bash
# MAL - Esto reemplaza todo el array
yq eval '.context_files = ["new-file.md"]' -i ad.yaml

# BIEN - Esto añade al array
yq eval '.context_files += ["new-file.md"]' -i ad.yaml

# PREVENCIÓN:
"ALWAYS use += to add to arrays
 NEVER use = to replace arrays unless user explicitly asks"
```

### ❌ Error 3: No actualizar feature ad.yaml

```bash
# MAL - Solo actualizar root
yq eval '(.active_features[] | select(.path == "docs/active/user-auth") | .status) = "testing"' -i ad.yaml
git commit -m "update status"

# BIEN - Actualizar ambos
yq eval '(.active_features[] | select(.path == "docs/active/user-auth") | .status) = "testing"' -i ad.yaml
yq eval '.status = "testing"' -i docs/active/user-auth/ad.yaml
git add ad.yaml docs/active/user-auth/ad.yaml
git commit -m "chore(user-auth): update status to testing"
```

### ❌ Error 4: Referencias a archivos que no existen

```bash
# MAL - Añadir archivo que no existe
yq eval '.context_files += ["docs/nonexistent.md"]' -i ad.yaml

# BIEN - Verificar primero
if [ -f "docs/nonexistent.md" ]; then
    yq eval '.context_files += ["docs/nonexistent.md"]' -i ad.yaml
else
    echo "ERROR: File does not exist"
fi

# PREVENCIÓN:
"ALWAYS verify files/directories exist before adding to:
 - context_files
 - code_locations"
```

---

## Checklist de Implementación

### Para claude.md (y otros IDE configs)

- [ ] Añadir sección "CRITICAL: ad.yaml Modification Rules"
- [ ] Listar campos que NUNCA debe modificar
- [ ] Listar campos que SÍ puede modificar
- [ ] Incluir ejemplos de comandos yq correctos
- [ ] Incluir patrón de validación después de cada cambio
- [ ] Incluir instrucciones de "what to do on error"
- [ ] Añadir checklist pre-commit

### Scripts a Crear

- [ ] `scripts/validate-ad-yaml.sh` - Validador completo
- [ ] `.git/hooks/pre-commit` - Hook automático
- [ ] `scripts/feature-new.sh` - Helper para crear feature (opcional)
- [ ] `scripts/feature-complete.sh` - Helper para completar feature (opcional)

### Testing

- [ ] Probar modificación correcta de root ad.yaml
- [ ] Probar modificación correcta de feature ad.yaml
- [ ] Probar validación detecta errores de sintaxis
- [ ] Probar validación detecta campos faltantes
- [ ] Probar validación detecta valores inválidos
- [ ] Probar git hook bloquea commits con errores

---

## Resumen de Garantías

Con estas reglas implementadas:

✅ **La IA NO PUEDE** modificar campos críticos del root (domain, mode, settings)
✅ **La IA DEBE** validar después de cada cambio
✅ **El git hook** bloquea commits con ad.yaml inválidos
✅ **El usuario** recibe error claro si algo falla
✅ **Los archivos** se restauran automáticamente si hay error
✅ **Ambos ad.yaml** (root y feature) se actualizan consistentemente

---

## Próximos Pasos

1. ¿Aprobar estas reglas?
2. Implementar validación en `scripts/validate-ad-yaml.sh`
3. Actualizar claude.md con reglas estrictas
4. Actualizar otros IDE configs (.cursorrules, etc.)
5. Crear git hook pre-commit
6. Probar con proyecto real

**¿Te parece bien este nivel de protección?**
