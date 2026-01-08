# Validación Simplificada - Sin Scripts Externos

**Fecha**: 2026-01-08
**Estado**: Propuesta Simplificada
**Autor**: Héctor Prats + Claude

---

## Principio: Validación Integrada, No Scripts

```
❌ NO: scripts/validate-ad-yaml.sh (archivo externo)
✅ SÍ: Validación inline en git hook
✅ SÍ: Instrucciones en claude.md para que IA valide
✅ SÍ: Herramientas existentes (yq)
```

---

## Solución 1: Git Hook con Validación Inline

```bash
#!/bin/bash
# .git/hooks/pre-commit
# Validación simple y directa

set -e

# Check if claude.md is being modified (should never happen)
if git diff --cached --name-only | grep -q "^claude.md$"; then
    echo "❌ ERROR: claude.md should never be modified"
    echo "   All changes go to ad.yaml and docs/"
    exit 1
fi

# Validate ad.yaml if being committed
if git diff --cached --name-only | grep -q "ad.yaml"; then
    echo "Validating ad.yaml..."

    # Check YAML syntax
    if ! yq eval ad.yaml > /dev/null 2>&1; then
        echo "❌ ERROR: Invalid YAML syntax in ad.yaml"
        exit 1
    fi

    # Check required fields
    if ! yq eval '.domain' ad.yaml > /dev/null 2>&1; then
        echo "❌ ERROR: Missing required field: domain"
        exit 1
    fi

    if ! yq eval '.mode' ad.yaml > /dev/null 2>&1; then
        echo "❌ ERROR: Missing required field: mode"
        exit 1
    fi

    echo "✓ ad.yaml is valid"
fi

# Validate feature ad.yaml files if being committed
for file in $(git diff --cached --name-only | grep "docs/active/.*/ad.yaml"); do
    echo "Validating $file..."

    # Check YAML syntax
    if ! yq eval "$file" > /dev/null 2>&1; then
        echo "❌ ERROR: Invalid YAML syntax in $file"
        exit 1
    fi

    # Check required fields
    if ! yq eval '.id' "$file" > /dev/null 2>&1; then
        echo "❌ ERROR: Missing required field 'id' in $file"
        exit 1
    fi

    if ! yq eval '.type' "$file" > /dev/null 2>&1; then
        echo "❌ ERROR: Missing required field 'type' in $file"
        exit 1
    fi

    if ! yq eval '.phase' "$file" > /dev/null 2>&1; then
        echo "❌ ERROR: Missing required field 'phase' in $file"
        exit 1
    fi

    echo "✓ $file is valid"
done

echo "✓ All validations passed"
exit 0
```

**Instalación:**
```bash
# Una vez por proyecto
cp templates/pre-commit .git/hooks/
chmod +x .git/hooks/pre-commit
```

---

## Solución 2: Instrucciones en claude.md

```markdown
# ========================================
# VALIDATION - Simple and Inline
# ========================================

## Before Every Commit with ad.yaml Changes

**Run these checks inline:**

```bash
# 1. Check YAML syntax is valid
yq eval ad.yaml > /dev/null
# If error → Fix YAML syntax

# 2. Verify required fields exist
yq eval '.domain' ad.yaml       # Should output: software|book|etc
yq eval '.mode' ad.yaml         # Should output: project|feature

# 3. For feature ad.yaml
yq eval docs/active/user-auth/ad.yaml > /dev/null
yq eval '.id' docs/active/user-auth/ad.yaml      # Should output: user-auth
yq eval '.type' docs/active/user-auth/ad.yaml    # Should output: feat|fix|etc
yq eval '.phase' docs/active/user-auth/ad.yaml   # Should output: DEFINE|DISCOVER|etc
```

**If any command fails:**
1. Fix the syntax error
2. Do NOT commit until fixed
3. Explain error to user

## Common Validation Errors

### YAML Syntax Error
```bash
$ yq eval ad.yaml
Error: yaml: line 10: did not find expected key

# FIX: Check line 10 for syntax error
# Common issues: missing colon, wrong indentation, unquoted strings
```

### Missing Required Field
```bash
$ yq eval '.domain' ad.yaml
null

# FIX: Add domain field
yq eval '.domain = "software"' -i ad.yaml
```

### Invalid Value
```bash
$ yq eval '.mode' ad.yaml
feture  # typo

# FIX: Correct the value
yq eval '.mode = "feature"' -i ad.yaml
```

## Validation Pattern

**Use this pattern before every ad.yaml modification:**

```bash
# 1. Backup
cp ad.yaml ad.yaml.backup

# 2. Modify
yq eval '[your modification]' -i ad.yaml

# 3. Validate inline
if ! yq eval ad.yaml > /dev/null 2>&1; then
    echo "ERROR: Invalid YAML, restoring backup"
    mv ad.yaml.backup ad.yaml
    # Explain to user what went wrong
    exit 1
fi

# 4. Check required fields still exist
if [ "$(yq eval '.domain' ad.yaml)" = "null" ]; then
    echo "ERROR: Lost domain field, restoring backup"
    mv ad.yaml.backup ad.yaml
    exit 1
fi

# 5. Success - remove backup
rm ad.yaml.backup

# 6. Commit
git add ad.yaml
git commit -m "chore: update ad.yaml"
```

**This pattern is sufficient. No external script needed.**
```

---

## Solución 3: Validación Implícita (Reglas Estrictas)

Si la IA sigue reglas estrictas, la validación es innecesaria:

### Regla 1: Solo Operaciones Permitidas

```markdown
## Allowed Operations on Root ad.yaml

**ONLY these yq commands are allowed:**

```bash
# ✅ Add to active_features
yq eval '.active_features += [{...}]' -i ad.yaml

# ✅ Update feature status
yq eval '(.active_features[] | select(.path == "...") | .status) = "testing"' -i ad.yaml

# ✅ Remove from active_features
yq eval 'del(.active_features[] | select(.path == "..."))' -i ad.yaml

# ✅ Add to completed_features
yq eval '.completed_features += [{...}]' -i ad.yaml

# ✅ Add to context_files (with user permission)
yq eval '.context_files += ["..."]' -i ad.yaml
```

**Any other operation is FORBIDDEN.**

If you need to do something else, ASK USER FIRST.
```

### Regla 2: Template-Based Creation

```markdown
## Creating New Feature ad.yaml

**ALWAYS use this template:**

```bash
cat > docs/active/new-feature/ad.yaml << 'EOF'
id: "new-feature"
type: "feat"
description: "Description here"
phase: "DEFINE"
version: "v0.0.0"
status: "in-progress"
context_files: []
code_locations: []
tasks: []
EOF
```

**This guarantees valid YAML with all required fields.**
```

### Regla 3: Atomic Updates

```markdown
## Update Pattern

**NEVER modify multiple fields in one command. Use atomic updates:**

```bash
# ❌ BAD - Complex modification
yq eval '
  .phase = "BUILD" |
  .version = "v0.4.0" |
  .status = "in-progress"
' -i ad.yaml

# ✅ GOOD - Atomic updates
yq eval '.phase = "BUILD"' -i ad.yaml
yq eval '.version = "v0.4.0"' -i ad.yaml
yq eval '.status = "in-progress"' -i ad.yaml
```

**Atomic updates are:**
- Easier to debug
- Harder to corrupt
- Can be validated between steps
```

---

## Implementación Final

### Git Hook (Simple)

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Prevent claude.md modifications
if git diff --cached --name-only | grep -q "^claude.md$"; then
    echo "❌ claude.md should not be modified"
    exit 1
fi

# Validate ad.yaml files (simple YAML syntax check)
for file in $(git diff --cached --name-only | grep "ad.yaml"); do
    if ! yq eval "$file" > /dev/null 2>&1; then
        echo "❌ Invalid YAML in $file"
        exit 1
    fi
done

exit 0
```

**Eso es todo. 10 líneas.**

### claude.md Instructions

```markdown
## Validation

**Before committing ad.yaml changes:**

1. Check syntax: `yq eval ad.yaml > /dev/null`
2. If error: Fix it, don't commit
3. The git hook will catch any remaining errors

**If git hook fails:**
- Fix the YAML syntax error
- Re-commit
```

---

## ¿Por qué No Necesitamos Script Externo?

### 1. yq Ya Valida Sintaxis
```bash
yq eval ad.yaml
# Si hay error, yq lo muestra claramente
```

### 2. Git Hook es Suficiente
```bash
# Bloquea commits con errores
# Simple y efectivo
```

### 3. Templates Garantizan Estructura
```bash
# Si usas templates para crear
# Ya tiene todos los campos requeridos
```

### 4. Reglas Estrictas Previenen Errores
```bash
# Si solo permites operaciones específicas
# No puedes corromper el archivo
```

### 5. La IA Puede Auto-validar
```markdown
## AI Instruction

After every ad.yaml modification:
1. Run: yq eval ad.yaml > /dev/null
2. If error: Restore backup and explain
3. If success: Continue
```

---

## Resumen

| Método | Complejidad | Efectividad | Mantenimiento |
|--------|-------------|-------------|---------------|
| Script externo | Alta | Alta | Alto |
| Git hook simple | Baja | Media | Bajo |
| Instrucciones en claude.md | Media | Alta | Bajo |
| Templates + Reglas | Baja | Alta | Bajo |

**Recomendación:**
- Git hook simple (10 líneas) para sintaxis
- Instrucciones en claude.md para reglas
- Templates para crear nuevos archivos
- Reglas estrictas para operaciones permitidas

**No necesitas script externo.**

---

## Próximos Pasos

1. ✅ Crear git hook simple (10 líneas)
2. ✅ Añadir instrucciones de validación a claude.md
3. ✅ Crear templates de ad.yaml (root + feature)
4. ✅ Documentar operaciones permitidas
5. ✅ Probar con proyecto real

**¿Te parece bien este enfoque simplificado?**
