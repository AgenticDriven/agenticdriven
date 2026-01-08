# Auto-inicialización: Bootstrap de Proyectos Existentes

**Fecha**: 2026-01-08
**Estado**: Especificación Crítica
**Autor**: Héctor Prats + Claude

---

## Problema a Resolver

Cuando el usuario ejecuta el IDE en un proyecto sin ad.yaml:
- ❌ No hay configuración AD
- ❌ No hay estructura docs/
- ❌ Archivos .md dispersos
- ❌ No se sabe en qué fase está
- ❌ No se saben qué features hay

**Solución**: El sistema se auto-inicializa analizando el proyecto.

---

## Flujo de Auto-inicialización

```
┌─────────────────────────────────────┐
│ 1. Usuario ejecuta IDE              │
│    $ claude-code                    │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 2. IA lee claude.md                 │
│    - Aprende reglas AD              │
│    - Aprende workflow               │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ 3. IA busca ad.yaml                 │
│    if [ -f "ad.yaml" ]; then        │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       │               │
    Existe          No existe
       │               │
       ▼               ▼
┌─────────────┐  ┌──────────────────────┐
│ 4a. Workflow│  │ 4b. AUTO-INICIALIZAR │
│     Normal  │  │                      │
│             │  │ - Analizar proyecto  │
│ - Lee ad.yaml│ │ - Reestructurar docs │
│ - Continúa  │  │ - Crear ad.yaml      │
│             │  │ - Preguntar usuario  │
└─────────────┘  └──────────────────────┘
```

---

## Instrucciones en claude.md

```markdown
# ========================================
# SESSION START - CRITICAL FIRST STEP
# ========================================

## 1. Check if ad.yaml Exists

```bash
if [ ! -f "ad.yaml" ]; then
    echo "⚠️  No ad.yaml found. Initializing AD for this project..."
    # Trigger AUTO-INITIALIZATION
else
    echo "✓ ad.yaml found. Reading configuration..."
    # Continue normal workflow
fi
```

## 2. AUTO-INITIALIZATION Process

**If ad.yaml does NOT exist, follow this process:**

### Step 1: Analyze Project

```bash
# Gather information about the project
echo "Analyzing project structure..."

# Check git repo
git status > /dev/null 2>&1 && echo "✓ Git repository"

# Check README
if [ -f "README.md" ]; then
    echo "✓ Found README.md"
    readme_content=$(cat README.md)
fi

# Find all markdown files
md_files=$(find . -type f -name "*.md" -not -path "./node_modules/*" -not -path "./.git/*")
echo "Found $(echo "$md_files" | wc -l) markdown files"

# Check project structure
has_src=$([ -d "src" ] && echo "yes" || echo "no")
has_tests=$([ -d "tests" ] || [ -d "test" ] && echo "yes" || echo "no")
has_docs=$([ -d "docs" ] && echo "yes" || echo "no")

# Detect language/framework
if [ -f "package.json" ]; then
    project_type="javascript"
elif [ -f "requirements.txt" ] || [ -f "setup.py" ]; then
    project_type="python"
elif [ -f "Cargo.toml" ]; then
    project_type="rust"
elif [ -f "go.mod" ]; then
    project_type="go"
else
    project_type="unknown"
fi

echo "Detected project type: $project_type"
```

### Step 2: Ask User Questions

**CRITICAL: Do NOT assume. Ask the user.**

```
AI: "I don't see an ad.yaml file. I can initialize AD for this project.

    I've detected:
    - Project type: JavaScript/Node.js
    - Structure: src/, tests/, README.md
    - 15 markdown files scattered
    - Git repository initialized

    To set up AD, I need to know:

    1. What domain is this project?
       a) Software (default for code projects)
       b) Book/Documentation
       c) Marketing
       d) Other: ___

    2. What mode do you want to use?
       a) Feature-driven (recommended - work on individual features)
       b) Project-driven (classic - complete project through all phases)

    3. Are there existing features/modules I should identify?
       a) Yes, analyze the codebase and suggest features
       b) No, start fresh

    4. Should I reorganize existing markdown files into docs/?
       a) Yes, organize them (recommended)
       b) No, leave them as-is

    Please answer these questions so I can initialize AD properly."
```

### Step 3: Infer Project State

Based on analysis + user answers:

```python
# Pseudo-code for inference

def infer_domain(project_type, user_answer):
    if user_answer:
        return user_answer
    elif has_src_code:
        return "software"
    elif mostly_markdown:
        return "book"
    else:
        return "software"  # default

def infer_phase(project_analysis):
    if has_tests and tests_passing:
        return "VALIDATE"
    elif has_significant_code:
        return "BUILD"
    elif has_design_docs:
        return "DESIGN"
    elif has_requirements:
        return "DISCOVER"
    elif only_readme:
        return "DEFINE"
    else:
        return "DEFINE"  # default

def infer_features(codebase):
    features = []

    # Look for logical modules
    if os.path.isdir("src/auth"):
        features.append({
            "id": "auth",
            "description": "Authentication system",
            "code": ["src/auth/"]
        })

    if os.path.isdir("src/api"):
        features.append({
            "id": "api",
            "description": "API layer",
            "code": ["src/api/"]
        })

    # Look for open PRs/branches
    branches = git.branches()
    for branch in branches:
        if branch.startswith("feature/"):
            feature_name = branch.replace("feature/", "")
            features.append({
                "id": feature_name,
                "description": f"Feature: {feature_name}",
                "status": "in-progress"
            })

    return features
```

### Step 4: Reorganize Markdown Files

**If user said yes to reorganization:**

```bash
# Create docs/ structure
mkdir -p docs/active docs/completed docs/planning docs/archived

# Categorize existing .md files
for file in $md_files; do
    # Skip README and standard files
    if [[ "$file" == "./README.md" ]] || [[ "$file" == "./CONTRIBUTING.md" ]]; then
        continue
    fi

    # Read file to categorize
    content=$(cat "$file")

    # Heuristics for categorization
    if echo "$content" | grep -qi "decision"; then
        # Looks like a decision document
        suggested_dest="docs/decisions.md"
    elif echo "$content" | grep -qi "interface\|contract\|api"; then
        # Looks like interface/contract
        suggested_dest="docs/interfaces.md"
    elif echo "$content" | grep -qi "convention\|style\|guide"; then
        # Looks like conventions
        suggested_dest="docs/conventions.md"
    elif echo "$content" | grep -qi "todo\|plan\|roadmap"; then
        # Looks like planning
        suggested_dest="docs/planning/$(basename "$file")"
    else
        # Default: active documentation
        suggested_dest="docs/active/$(basename "$file")"
    fi

    # Ask user before moving
    echo "File: $file"
    echo "Suggested: $suggested_dest"
    echo "Move? (y/n)"
    # Or just move with git to preserve history
    git mv "$file" "$suggested_dest" 2>/dev/null || mv "$file" "$suggested_dest"
done
```

### Step 5: Create Root ad.yaml

```bash
cat > ad.yaml << EOF
# Auto-generated by AD initialization
# Date: $(date -Iseconds)

domain: "$inferred_domain"
mode: "$user_chosen_mode"

# Global context
context_files:
  - "README.md"
  - "docs/decisions.md"
  - "docs/conventions.md"

# Active features (auto-detected)
active_features:
$(for feature in $inferred_features; do
    echo "  - path: \"docs/active/$feature_id\""
    echo "    description: \"$feature_description\""
    echo "    status: \"in-progress\""
done)

# Completed features
completed_features: []

# Agents (disabled by default)
agents:
  enabled: false
  # Enable later with: yq eval '.agents.enabled = true' -i ad.yaml

# Settings
settings:
  auto_commit: true
  require_tests: true
EOF

echo "✓ Created ad.yaml"
```

### Step 6: Create Feature ad.yaml Files

```bash
# For each detected feature
for feature in $inferred_features; do
    feature_dir="docs/active/$feature_id"
    mkdir -p "$feature_dir"

    cat > "$feature_dir/ad.yaml" << EOF
id: "$feature_id"
type: "feat"  # Default to feat
description: "$feature_description"

# Inferred from codebase analysis
phase: "$inferred_phase"
version: "v0.$phase_number.0"
status: "in-progress"

# Context files for this feature
context_files:
  # TODO: Add feature-specific docs as you create them
  # - "$feature_dir/00-define/problem.md"

# Code locations (auto-detected)
code_locations:
$(for code_path in $feature_code_paths; do
    echo "  - \"$code_path\""
done)

# Tasks
tasks:
  # TODO: Break down into specific tasks

# Agents
agents:
  enabled: false

# Notes
notes:
  - "Auto-generated during AD initialization"
  - "Review and update this configuration"
EOF

    echo "✓ Created $feature_dir/ad.yaml"
done
```

### Step 7: Create Initial Documentation

```bash
# Create docs/journal.md if doesn't exist
if [ ! -f "docs/journal.md" ]; then
    cat > docs/journal.md << EOF
# Project Journal

## $(date +%Y-%m-%d) - AD Initialization

- **Action**: Initialized AD for existing project
- **Domain**: $domain
- **Mode**: $mode
- **Detected Features**: $feature_count
- **Current Phase**: $inferred_phase

### Next Steps
- Review auto-generated ad.yaml files
- Fill in missing documentation
- Continue development with AD workflow
EOF
fi

# Create docs/decisions.md if doesn't exist
if [ ! -f "docs/decisions.md" ]; then
    cat > docs/decisions.md << EOF
# Architecture Decision Records

## $(date +%Y-%m-%d) - Initialize AD Methodology

**Status**: Accepted

**Context**: Project existed without structured methodology.

**Decision**: Adopt Agentic Driven (AD) methodology.

**Consequences**:
✅ Structured workflow with clear phases
✅ Feature-driven development
✅ Better documentation practices

**Alternatives**:
- Continue without methodology: Too chaotic
- Other methodologies (Agile, Scrum): Not designed for AI collaboration
EOF
fi

# Create docs/conventions.md if doesn't exist
if [ ! -f "docs/conventions.md" ]; then
    cat > docs/conventions.md << EOF
# Project Conventions

## Code Style

[TODO: Document your code style conventions]

## Git Workflow

- Use Conventional Commits (feat:, fix:, docs:, etc.)
- One feature per branch
- Commit frequently

## Documentation

- All docs in docs/
- Feature docs in docs/active/feature-name/
- Follow AD phase structure

## Testing

- Write tests for all features
- Aim for 80%+ coverage
- Tests in tests/ directory
EOF
fi
```

### Step 8: Commit Initialization

```bash
# Stage everything
git add .

# Commit
git commit -m "chore: initialize AD methodology

- Created ad.yaml (domain: $domain, mode: $mode)
- Reorganized documentation into docs/
- Created feature ad.yaml files
- Detected $feature_count active features
- Current inferred phase: $inferred_phase

Auto-initialized by AD system.

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "✓ Committed AD initialization"
```

### Step 9: Report to User

```
AI: "✓ AD initialization complete!

    Created:
    - ad.yaml (root configuration)
    - docs/ directory structure
    - $feature_count feature ad.yaml files
    - Initial documentation (journal.md, decisions.md, conventions.md)

    Detected features:
    1. auth (src/auth/) - Authentication system
    2. api (src/api/) - API layer
    3. ui (src/components/) - User interface

    Current phase: BUILD (inferred from codebase analysis)

    You can now:
    - Review ad.yaml and feature configurations
    - Continue working with AD workflow
    - Ask me to work on any feature: 'Continue with auth'

    Would you like me to:
    a) Show you the generated ad.yaml?
    b) Start working on a specific feature?
    c) Explain the AD workflow?"
```

---

## Algoritmo de Inferencia Detallado

### Inferir Domain

```python
def infer_domain(project_structure):
    # Check file types
    code_files = count_files([".js", ".py", ".java", ".go", ".rs"])
    markdown_files = count_files([".md"])
    total_files = code_files + markdown_files

    if code_files / total_files > 0.7:
        return "software"

    # Check README content
    readme = read_file("README.md")
    if "book" in readme.lower() or "chapter" in readme.lower():
        return "book"

    # Check directory names
    if has_dir("campaigns") or has_dir("marketing"):
        return "marketing"

    # Check package.json or similar
    if exists("package.json"):
        package = read_json("package.json")
        if "keywords" in package:
            if "marketing" in package["keywords"]:
                return "marketing"

    # Default
    return "software"
```

### Inferir Phase

```python
def infer_phase(project_structure):
    # Check test status
    if has_dir("tests") and tests_are_passing():
        return "VALIDATE"

    # Check if there's significant code
    lines_of_code = count_lines_of_code()
    if lines_of_code > 1000:
        return "BUILD"

    # Check for design documents
    if has_file("docs/architecture.md") or has_file("docs/design.md"):
        return "DESIGN"

    # Check for requirements/discovery docs
    if has_file("docs/requirements.md") or has_file("docs/discovery.md"):
        return "DISCOVER"

    # Check if only README exists
    if only_has("README.md"):
        return "DEFINE"

    # Default to BUILD if there's code
    if lines_of_code > 100:
        return "BUILD"

    # Default
    return "DEFINE"
```

### Inferir Features

```python
def infer_features(project_structure):
    features = []

    # Strategy 1: Analyze directory structure
    if has_dir("src"):
        for subdir in list_dirs("src"):
            if is_feature_dir(subdir):
                features.append({
                    "id": subdir,
                    "description": f"{subdir.capitalize()} module",
                    "code": [f"src/{subdir}/"],
                    "confidence": "high"
                })

    # Strategy 2: Analyze git branches
    branches = git_branches()
    for branch in branches:
        if branch.startswith("feature/"):
            feature_name = branch.replace("feature/", "")
            if not any(f["id"] == feature_name for f in features):
                features.append({
                    "id": feature_name,
                    "description": f"Feature: {feature_name}",
                    "status": "in-progress",
                    "confidence": "medium"
                })

    # Strategy 3: Analyze package.json scripts
    if exists("package.json"):
        package = read_json("package.json")
        if "scripts" in package:
            # If there's "test:auth", there's probably an auth feature
            for script_name in package["scripts"]:
                if ":" in script_name:
                    possible_feature = script_name.split(":")[1]
                    if not any(f["id"] == possible_feature for f in features):
                        features.append({
                            "id": possible_feature,
                            "description": f"{possible_feature.capitalize()} feature",
                            "confidence": "low"
                        })

    # Strategy 4: Ask user
    # Show detected features and ask if correct

    return features

def is_feature_dir(dir_name):
    # Heuristics
    if dir_name in ["utils", "helpers", "common", "shared"]:
        return False  # Too generic

    # Check if has substantial code
    lines = count_lines_in_dir(f"src/{dir_name}")
    if lines < 50:
        return False  # Too small

    return True
```

---

## Casos Especiales

### Caso 1: Proyecto Muy Temprano (Solo README)

```
Input:
- README.md
- No src/
- No tests/

Output:
domain: "software" (inferido)
mode: "feature"
phase: "DEFINE"
active_features: []
```

**Acción**: Crear estructura mínima

### Caso 2: Proyecto en Desarrollo (Código pero Sin Docs)

```
Input:
- src/auth/, src/api/, src/ui/
- tests/
- No docs/
- README.md básico

Output:
domain: "software"
mode: "feature"
phase: "BUILD"
active_features:
  - auth (src/auth/)
  - api (src/api/)
  - ui (src/ui/)
```

**Acción**: Crear docs/ y feature ad.yaml para cada uno

### Caso 3: Proyecto Maduro (Todo Existente)

```
Input:
- src/ completo
- tests/ completo
- docs/ existente (pero no AD)
- Documentación dispersa

Output:
domain: "software"
mode: "feature"
phase: "VALIDATE"
active_features: (detectadas)
```

**Acción**: Reorganizar docs/ y crear ad.yaml sin mover mucho

### Caso 4: Proyecto Sin Git

```
Input:
- Código
- No .git/

Output:
ERROR o WARNING
```

**Acción**: Sugerir inicializar git primero

```
AI: "⚠️  This project is not a git repository.

    AD relies on git for:
    - Version control
    - Phase tracking
    - Commit history

    Would you like me to initialize git first?
    $ git init"
```

---

## Seguridad y Validación

### Antes de Modificar Archivos

```
AI: "I'm about to:
     1. Create ad.yaml
     2. Create docs/ directory
     3. Move $count files to docs/
     4. Create feature ad.yaml files
     5. Commit changes

     This will modify your project structure.

     Proceed? (y/n)"

User: y

AI: "Creating backup first..."
git add -A
git stash push -m "backup before AD initialization"

# ... do initialization ...

AI: "Initialization complete.
     If anything went wrong, restore with:
     git stash pop"
```

### Dry-Run Mode

```
AI: "Would you like me to:
     a) Initialize with changes (recommended)
     b) Dry-run (show what I would do, don't execute)
     c) Cancel"

User: b

AI: "DRY-RUN - Would execute:

     CREATE ad.yaml
     CREATE docs/journal.md
     CREATE docs/decisions.md
     MOVE doc1.md → docs/planning/doc1.md
     MOVE doc2.md → docs/active/doc2.md
     CREATE docs/active/auth/ad.yaml
     CREATE docs/active/api/ad.yaml
     COMMIT 'chore: initialize AD methodology'

     Total: 7 operations

     Proceed with actual initialization? (y/n)"
```

---

## Resumen de Auto-inicialización

```
┌─────────────────────────────────────────────────┐
│ 1. Detectar ausencia de ad.yaml                │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│ 2. Analizar proyecto                           │
│    - Estructura de archivos                    │
│    - Tipo de proyecto                          │
│    - .md existentes                            │
│    - Código/módulos                            │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│ 3. Preguntar al usuario                        │
│    - Domain                                     │
│    - Mode                                       │
│    - Reorganizar archivos?                     │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│ 4. Inferir estado                              │
│    - Phase actual                              │
│    - Features existentes                       │
│    - code_locations                            │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│ 5. Reorganizar docs/                           │
│    - Mover .md existentes                      │
│    - Categorizar automáticamente               │
│    - Crear estructura AD                       │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│ 6. Crear ad.yaml                               │
│    - Root ad.yaml                              │
│    - Feature ad.yaml por cada feature          │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│ 7. Crear docs básicos                          │
│    - journal.md                                │
│    - decisions.md                              │
│    - conventions.md                            │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│ 8. Commit                                      │
│    "chore: initialize AD methodology"          │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│ 9. Reportar al usuario                         │
│    - Mostrar lo creado                         │
│    - Sugerir próximos pasos                    │
└─────────────────────────────────────────────────┘
```

---

## Próximos Pasos

1. Implementar auto-inicialización en claude.md
2. Crear algoritmos de inferencia
3. Probar con proyectos reales:
   - Proyecto nuevo (solo README)
   - Proyecto en desarrollo (código sin docs)
   - Proyecto maduro (todo existente)
4. Refinar heurísticas según resultados

**¿Listo para implementar esto?**
