# Integración de Técnicas de Agentes en ad.yaml

**Fecha**: 2026-01-08
**Estado**: Especificación Completa
**Autor**: Héctor Prats + Claude

---

## Problema a Resolver

Actualmente ad.yaml NO especifica:
- ❌ Qué técnicas de coordinación usar
- ❌ Qué agentes crear para cada feature/fase
- ❌ Cómo deben coordinarse los agentes
- ❌ Qué herramientas usar (Claude SDK, Windsurf, etc.)

**Resultado**: La IA no sabe si debe:
- Usar múltiples agentes o uno solo
- Crear agentes en paralelo o secuencial
- Usar Message Passing, Shared State, u otra técnica
- Crear swarms, pipelines, o arquitecturas específicas

---

## Solución: Configuración Completa de Agentes en ad.yaml

```yaml
# ========================================
# AGENTES Y TÉCNICAS
# ========================================

agents:
  enabled: true                    # ¿Usar multi-agente?

  # Modo de ejecución
  execution_mode: "parallel"       # parallel|sequential|hybrid

  # Técnica de coordinación principal
  coordination_technique: "message-passing"
  # Opciones:
  # - message-passing: Agentes se envían mensajes
  # - shared-state: Blackboard compartido
  # - leader-follower: Un líder coordina
  # - pipeline: Cadena de procesamiento
  # - swarm: Inteligencia de enjambre
  # - contract-net: Subastas de tareas

  # Herramienta/plataforma
  platform: "claude-sdk"           # claude-sdk|windsurf|cursor|manual

  # Configuración de la técnica
  technique_config:
    # Para message-passing
    message_broker: "redis"        # redis|mcp|websockets
    message_format: "json"

    # Para shared-state
    state_store: "file"            # file|redis|database
    lock_mechanism: "file-lock"

    # Para swarm
    swarm_size: 10
    pheromone_decay: 0.1

  # Agentes definidos para este proyecto
  team:
    - id: "architect"
      role: "design"
      phases: ["DESIGN"]
      capabilities: ["architecture", "contracts"]

    - id: "backend"
      role: "implementation"
      phases: ["BUILD", "VALIDATE"]
      capabilities: ["api", "database"]
      context_dirs: ["src/backend/", "tests/backend/"]

    - id: "frontend"
      role: "implementation"
      phases: ["BUILD", "VALIDATE"]
      capabilities: ["ui", "components"]
      context_dirs: ["src/frontend/", "tests/frontend/"]

    - id: "tester"
      role: "validation"
      phases: ["VALIDATE"]
      capabilities: ["testing", "qa"]
      context_dirs: ["tests/"]
```

---

## Schema Completo de Agentes en ad.yaml

### Root ad.yaml - Configuración Global

```yaml
# /ad.yaml

domain: "software"
mode: "feature"

# ========================================
# AGENTES - CONFIGURACIÓN GLOBAL
# ========================================
agents:
  # ¿Está habilitado el sistema multi-agente?
  enabled: true                    # true|false

  # Modo de ejecución predeterminado
  default_execution_mode: "parallel"  # parallel|sequential|hybrid

  # Técnica de coordinación predeterminada
  default_coordination: "message-passing"

  # Plataforma/herramienta a usar
  platform: "claude-sdk"           # claude-sdk|windsurf|cursor|aider|manual

  # Configuración de técnicas disponibles
  techniques:
    message-passing:
      enabled: true
      broker: "redis"              # redis|mcp|websockets|file
      host: "localhost:6379"

    shared-state:
      enabled: true
      store: "file"                # file|redis|database
      path: ".ad-state/"
      lock: "file-lock"            # file-lock|redis-lock

    swarm:
      enabled: false
      default_size: 10
      pheromone_decay: 0.1

    pipeline:
      enabled: true

    leader-follower:
      enabled: true

    contract-net:
      enabled: false

  # Equipo de agentes del proyecto
  team:
    - id: "architect"
      role: "architecture"
      description: "Diseña arquitectura y contratos"
      phases: ["DISCOVER", "DESIGN"]
      capabilities:
        - "system-design"
        - "api-contracts"
        - "database-schema"
      context_dirs: ["docs/", "src/"]

    - id: "backend-dev"
      role: "backend-implementation"
      description: "Implementa backend y APIs"
      phases: ["BUILD", "VALIDATE"]
      capabilities:
        - "api-development"
        - "database-implementation"
        - "backend-logic"
      context_dirs: ["src/backend/", "tests/backend/"]
      dependencies: ["architect"]  # Necesita contratos del architect

    - id: "frontend-dev"
      role: "frontend-implementation"
      description: "Implementa UI y componentes"
      phases: ["BUILD", "VALIDATE"]
      capabilities:
        - "ui-development"
        - "component-creation"
        - "state-management"
      context_dirs: ["src/frontend/", "tests/frontend/"]
      dependencies: ["architect", "backend-dev"]

    - id: "qa-engineer"
      role: "quality-assurance"
      description: "Testing y validación"
      phases: ["VALIDATE"]
      capabilities:
        - "unit-testing"
        - "integration-testing"
        - "e2e-testing"
      context_dirs: ["tests/"]
      dependencies: ["backend-dev", "frontend-dev"]

    - id: "devops"
      role: "infrastructure"
      description: "Deploy y CI/CD"
      phases: ["SETUP", "LAUNCH"]
      capabilities:
        - "ci-cd"
        - "deployment"
        - "monitoring"
      context_dirs: ["infrastructure/", ".github/"]
```

### Feature ad.yaml - Agentes para Esta Feature

```yaml
# /docs/active/user-auth/ad.yaml

id: "user-auth"
type: "feat"
phase: "BUILD"
version: "v0.4.2"

# ========================================
# AGENTES PARA ESTA FEATURE
# ========================================
agents:
  # ¿Esta feature usa multi-agente?
  enabled: true

  # Modo para esta feature
  execution_mode: "parallel"       # Sobreescribe default

  # Técnica para esta feature
  coordination_technique: "message-passing"

  # Agentes activos para esta feature
  active:
    - id: "backend-dev"
      status: "working"
      current_task: "Implement JWT generation"
      context: ["src/auth/", "tests/auth/"]

    - id: "frontend-dev"
      status: "blocked"
      current_task: "Create login form"
      blocked_by: "backend-dev"    # Esperando API
      blocked_reason: "Waiting for /api/auth/login endpoint"
      context: ["src/pages/Login/", "src/components/AuthForm/"]

    - id: "qa-engineer"
      status: "ready"
      current_task: "Write auth integration tests"
      context: ["tests/integration/auth/"]

  # Coordinación específica
  coordination:
    # Comunicación entre agentes
    communication:
      - from: "backend-dev"
        to: "frontend-dev"
        channel: "api-contracts"
        last_message: "POST /api/auth/login contract ready"

      - from: "backend-dev"
        to: "qa-engineer"
        channel: "implementation-status"
        last_message: "JWT generation implemented"

    # Estado compartido (si shared-state)
    shared_state:
      api_endpoints_ready: ["/api/auth/login"]
      components_created: ["AuthService"]
      tests_passing: 5
      tests_failing: 0

    # Dependencias entre agentes
    dependencies:
      frontend-dev: ["backend-dev"]  # Frontend depende de Backend
      qa-engineer: ["backend-dev", "frontend-dev"]

  # Sugerencias automáticas del sistema
  suggestions:
    recommended_agents:
      - "security-reviewer"         # Feature de auth necesita security
      reason: "Authentication features require security review"

    recommended_techniques:
      - "pipeline"                  # Backend → Frontend → QA
      reason: "Clear sequential dependency chain"

    optimization:
      message: "Consider parallel execution for backend tests while frontend develops"

# ... resto de feature ad.yaml (context_files, code_locations, etc.)
```

---

## Sugerencias Automáticas por Fase y Tipo

### Sistema de Sugerencias Inteligentes

```yaml
# La IA lee esta configuración y sugiere automáticamente

agent_suggestions:
  # Por fase
  by_phase:
    DEFINE:
      recommended_agents: []
      recommended_techniques: []
      execution_mode: "solo"
      reason: "DEFINE is usually single-person work"

    DISCOVER:
      recommended_agents: ["researcher", "analyst"]
      recommended_techniques: ["swarm", "parallel-research"]
      execution_mode: "parallel"
      reason: "Research benefits from parallel exploration"

    DESIGN:
      recommended_agents: ["architect", "reviewer"]
      recommended_techniques: ["leader-follower", "contract-driven"]
      execution_mode: "sequential"
      reason: "Design needs coherence, architect leads"

    BUILD:
      recommended_agents: ["backend-dev", "frontend-dev", "tester"]
      recommended_techniques: ["message-passing", "pipeline"]
      execution_mode: "parallel"
      reason: "Implementation can be parallelized with contracts"

    VALIDATE:
      recommended_agents: ["qa-engineer", "security-reviewer"]
      recommended_techniques: ["shared-state", "parallel-testing"]
      execution_mode: "parallel"
      reason: "Tests can run in parallel"

  # Por tipo de feature
  by_type:
    feat:
      complexity: "high"
      recommended_agents: ["backend-dev", "frontend-dev", "qa-engineer"]
      recommended_techniques: ["message-passing"]
      phases_with_multi_agent: ["DESIGN", "BUILD", "VALIDATE"]

    fix:
      complexity: "low"
      recommended_agents: ["developer", "qa-engineer"]
      recommended_techniques: ["sequential"]
      phases_with_multi_agent: ["VALIDATE"]

    spike:
      complexity: "medium"
      recommended_agents: ["researcher", "architect"]
      recommended_techniques: ["swarm", "parallel-research"]
      phases_with_multi_agent: ["DISCOVER"]

    refactor:
      complexity: "medium"
      recommended_agents: ["developer", "reviewer"]
      recommended_techniques: ["sequential"]
      phases_with_multi_agent: []

  # Por complejidad del proyecto
  by_project_size:
    small:
      max_agents: 2
      default_execution: "sequential"

    medium:
      max_agents: 5
      default_execution: "hybrid"

    large:
      max_agents: 10
      default_execution: "parallel"

  # Por dominio
  by_domain:
    software:
      typical_agents: ["backend-dev", "frontend-dev", "qa-engineer", "devops"]
      typical_techniques: ["message-passing", "pipeline"]

    book:
      typical_agents: ["writer", "editor", "researcher"]
      typical_techniques: ["sequential", "review-chain"]

    marketing:
      typical_agents: ["strategist", "content-creator", "analyst"]
      typical_techniques: ["parallel", "shared-state"]
```

---

## Workflow de la IA con Agentes

### Session Start

```markdown
## AI Workflow - Session Start with Agents

1. **Read root ad.yaml**
   ```bash
   cat ad.yaml
   ```
   - Check if `agents.enabled = true`
   - Read `agents.platform` (claude-sdk, windsurf, etc.)
   - Read `agents.team[]` configuration
   - Read `agents.techniques` available

2. **Read feature ad.yaml**
   ```bash
   cat docs/active/user-auth/ad.yaml
   ```
   - Check if feature uses multi-agent
   - Read `agents.active[]` status
   - Read `agents.coordination` state
   - Check blocked agents

3. **Analyze and Suggest**
   ```
   AI: "Feature: user-auth (BUILD phase, type: feat)

        Current agents:
        - backend-dev: working on JWT generation
        - frontend-dev: BLOCKED waiting for API
        - qa-engineer: ready

        Recommendations:
        ✓ Use message-passing (already configured)
        ✓ Backend should notify frontend when API ready
        ✓ QA can start writing tests in parallel

        Suggested next steps:
        1. Backend: Complete JWT generation
        2. Backend: Notify frontend via message channel
        3. QA: Write integration tests (can start now)

        Would you like me to:
        a) Continue as backend-dev?
        b) Switch to qa-engineer (parallel work)?
        c) Show coordination status?"
   ```

4. **Execute with Technique**

   **If message-passing:**
   ```bash
   # Backend completes task
   # Send message to frontend
   redis-cli PUBLISH api-contracts '{
     "from": "backend-dev",
     "to": "frontend-dev",
     "type": "api-ready",
     "endpoint": "/api/auth/login",
     "schema": {...}
   }'

   # Update feature ad.yaml
   yq eval '.agents.coordination.communication += [{
     "from": "backend-dev",
     "to": "frontend-dev",
     "channel": "api-contracts",
     "message": "POST /api/auth/login ready"
   }]' -i docs/active/user-auth/ad.yaml

   # Unblock frontend
   yq eval '(.agents.active[] | select(.id == "frontend-dev") | .status) = "ready"' -i docs/active/user-auth/ad.yaml
   yq eval '(.agents.active[] | select(.id == "frontend-dev") | .blocked_by) = null' -i docs/active/user-auth/ad.yaml
   ```

   **If shared-state:**
   ```bash
   # Write to shared state
   yq eval '.agents.coordination.shared_state.api_endpoints_ready += ["/api/auth/login"]' -i docs/active/user-auth/ad.yaml

   # Frontend reads shared state next time
   ```

   **If swarm:**
   ```bash
   # Create 10 micro-agents to explore solution space
   # Each writes findings to .ad-state/pheromones/
   # Best solutions converge
   ```

5. **Update Agent Status**
   ```bash
   # Mark task complete
   yq eval '(.agents.active[] | select(.id == "backend-dev") | .status) = "idle"' -i docs/active/user-auth/ad.yaml
   yq eval '(.agents.active[] | select(.id == "backend-dev") | .current_task) = null' -i docs/active/user-auth/ad.yaml

   # Commit
   git add docs/active/user-auth/ad.yaml src/auth/
   git commit -m "feat(auth): complete JWT generation, unblock frontend"
   ```
```

---

## Técnicas Disponibles - Referencia Rápida

### 6 Técnicas Fundamentales

```yaml
techniques:
  # 1. Message Passing
  message-passing:
    description: "Agentes se envían mensajes entre sí"
    use_when: "Agentes independientes que necesitan comunicarse"
    platforms: ["claude-sdk", "redis", "mcp"]
    complexity: "medium"

  # 2. Shared State / Blackboard
  shared-state:
    description: "Todos leen/escriben en estado compartido"
    use_when: "Estado global necesario, pocos agentes (<5)"
    platforms: ["file", "redis", "database"]
    complexity: "low"

  # 3. Leader-Follower
  leader-follower:
    description: "Un líder coordina, otros ejecutan"
    use_when: "Necesitas coordinación centralizada"
    platforms: ["any"]
    complexity: "low"

  # 4. Pipeline
  pipeline:
    description: "Cadena de procesamiento secuencial"
    use_when: "Dependencias claras en cadena"
    platforms: ["any"]
    complexity: "low"

  # 5. Swarm Intelligence
  swarm:
    description: "Muchos agentes simples, comportamiento emergente"
    use_when: "Exploración de soluciones, optimización"
    platforms: ["custom"]
    complexity: "high"

  # 6. Contract-Net
  contract-net:
    description: "Subasta de tareas entre agentes"
    use_when: "Recursos limitados, priorización dinámica"
    platforms: ["custom"]
    complexity: "high"
```

### Técnicas Avanzadas (Resumen)

```yaml
advanced_techniques:
  # Bio-inspiradas
  - ant-colony-optimization
  - particle-swarm-optimization
  - genetic-algorithms

  # Basadas en mercado
  - auction-based
  - market-based-coordination

  # Basadas en IA
  - reinforcement-learning-coordination
  - neural-coordination

  # Basadas en matemáticas
  - game-theory-coordination
  - graph-based-coordination

  # Basadas en concurrencia
  - actor-model
  - csp-coordination
```

---

## Instrucciones para claude.md

```markdown
# ========================================
# AGENT COORDINATION - CRITICAL
# ========================================

## Reading Agent Configuration

### Session Start - ALWAYS check agents

1. **Read root ad.yaml agents section**
   ```bash
   # Check if agents enabled
   agents_enabled=$(yq eval '.agents.enabled' ad.yaml)

   if [ "$agents_enabled" = "true" ]; then
       # Read configuration
       platform=$(yq eval '.agents.platform' ad.yaml)
       default_technique=$(yq eval '.agents.default_coordination' ad.yaml)
       team=$(yq eval '.agents.team[]' ad.yaml)

       echo "Multi-agent enabled"
       echo "Platform: $platform"
       echo "Default technique: $default_technique"
       echo "Team size: $(echo "$team" | wc -l) agents"
   fi
   ```

2. **Read feature ad.yaml agents section**
   ```bash
   feature_agents_enabled=$(yq eval '.agents.enabled' docs/active/user-auth/ad.yaml)

   if [ "$feature_agents_enabled" = "true" ]; then
       # Read active agents
       active_agents=$(yq eval '.agents.active[]' docs/active/user-auth/ad.yaml)

       # Check blocked agents
       blocked=$(yq eval '.agents.active[] | select(.status == "blocked")' docs/active/user-auth/ad.yaml)

       if [ -n "$blocked" ]; then
           echo "⚠️  Some agents are blocked:"
           echo "$blocked"
       fi
   fi
   ```

3. **Suggest agents and techniques**
   ```
   AI: "Based on your feature:
        - Type: feat
        - Phase: BUILD
        - Domain: software

        Recommended agents:
        ✓ backend-dev (from team)
        ✓ frontend-dev (from team)
        ✓ qa-engineer (from team)

        Recommended technique:
        ✓ message-passing (async communication)

        Would you like me to:
        a) Enable multi-agent for this feature?
        b) Continue solo?
        c) Configure custom agents?"
   ```

## Executing with Agent Coordination

### If message-passing enabled:

```bash
# When completing a task that others depend on
# 1. Complete the work
# 2. Send message to dependents
# 3. Update coordination state in ad.yaml

# Example: Backend completes API
# 1. Implement code
# 2. Send message
redis-cli PUBLISH api-updates '{
  "from": "backend-dev",
  "to": ["frontend-dev", "qa-engineer"],
  "type": "api-ready",
  "endpoint": "/api/auth/login",
  "contract": "docs/active/user-auth/02-design/api-contracts.md#login"
}'

# 3. Update ad.yaml
yq eval '.agents.coordination.communication += [{
  "from": "backend-dev",
  "to": "frontend-dev",
  "channel": "api-updates",
  "message": "POST /api/auth/login ready",
  "timestamp": "'$(date -Iseconds)'"
}]' -i docs/active/user-auth/ad.yaml

# 4. Unblock dependent agents
yq eval '(.agents.active[] | select(.id == "frontend-dev") | .status) = "ready"' -i docs/active/user-auth/ad.yaml
yq eval 'del(.agents.active[] | select(.id == "frontend-dev") | .blocked_by)' -i docs/active/user-auth/ad.yaml
```

### If shared-state enabled:

```bash
# Write to shared state
yq eval '.agents.coordination.shared_state.api_endpoints_ready += ["/api/auth/login"]' -i docs/active/user-auth/ad.yaml

# Other agents will read this state when they start
```

### If pipeline enabled:

```bash
# Pass output to next agent in pipeline
# Pipeline order defined in ad.yaml
# Example: backend-dev → frontend-dev → qa-engineer

# Current agent (backend-dev) completes
# Mark as complete
yq eval '(.agents.active[] | select(.id == "backend-dev") | .status) = "complete"' -i docs/active/user-auth/ad.yaml

# Activate next agent in pipeline (frontend-dev)
yq eval '(.agents.active[] | select(.id == "frontend-dev") | .status) = "active"' -i docs/active/user-auth/ad.yaml
```

## Agent Status Management

**ALWAYS update agent status in feature ad.yaml:**

```bash
# When starting work
yq eval '(.agents.active[] | select(.id == "backend-dev") | .status) = "working"' -i feature/ad.yaml
yq eval '(.agents.active[] | select(.id == "backend-dev") | .current_task) = "Implement JWT"' -i feature/ad.yaml

# When blocked
yq eval '(.agents.active[] | select(.id == "frontend-dev") | .status) = "blocked"' -i feature/ad.yaml
yq eval '(.agents.active[] | select(.id == "frontend-dev") | .blocked_by) = "backend-dev"' -i feature/ad.yaml
yq eval '(.agents.active[] | select(.id == "frontend-dev") | .blocked_reason) = "Waiting for API"' -i feature/ad.yaml

# When unblocking
yq eval '(.agents.active[] | select(.id == "frontend-dev") | .status) = "ready"' -i feature/ad.yaml
yq eval 'del(.agents.active[] | select(.id == "frontend-dev") | .blocked_by)' -i feature/ad.yaml

# When completing
yq eval '(.agents.active[] | select(.id == "backend-dev") | .status) = "idle"' -i feature/ad.yaml
yq eval '(.agents.active[] | select(.id == "backend-dev") | .current_task) = null' -i feature/ad.yaml
```

## Suggesting Agents Proactively

**When user starts a new feature:**

```
User: "Start new feature: user-auth"

AI: "I'll start the user-auth feature.

     Based on type (feat) and domain (software), I recommend:

     Multi-agent configuration:
     ✓ backend-dev: Implement authentication API
     ✓ frontend-dev: Create login UI
     ✓ qa-engineer: Write authentication tests
     ✓ security-reviewer: Review auth implementation

     Coordination technique:
     ✓ message-passing (async, scalable)

     Would you like me to:
     a) Enable multi-agent with these recommendations?
     b) Work solo?
     c) Customize agent configuration?"
```

**When entering a new phase:**

```
User: "Advance user-auth to BUILD phase"

AI: "Advancing to BUILD phase.

     For BUILD phase with type feat, I recommend:

     Active agents:
     ✓ backend-dev (implement API)
     ✓ frontend-dev (implement UI)
     ✓ qa-engineer (write tests in parallel)

     Execution mode: parallel
     Technique: message-passing

     This allows:
     - Backend and Frontend work simultaneously
     - QA writes tests while code is being written
     - Coordination via API contract messages

     Should I configure this?"
```
```

---

## Ejemplo Completo: Feature con Multi-Agente

```yaml
# /docs/active/user-auth/ad.yaml

id: "user-auth"
type: "feat"
description: "JWT-based authentication system"
phase: "BUILD"
version: "v0.4.2"
status: "in-progress"

# Context files
context_files:
  - "docs/active/user-auth/00-define/problem.md"
  - "docs/active/user-auth/02-design/design.md"
  - "docs/active/user-auth/02-design/api-contracts.md"

# Code locations
code_locations:
  - "src/auth/"
  - "src/middleware/auth.js"
  - "tests/auth/"

# ========================================
# AGENT CONFIGURATION
# ========================================
agents:
  enabled: true
  execution_mode: "parallel"
  coordination_technique: "message-passing"

  # Active agents
  active:
    - id: "backend-dev"
      status: "working"
      current_task: "Implement JWT token generation"
      progress: "70%"
      context: ["src/auth/", "tests/auth/unit/"]

    - id: "frontend-dev"
      status: "blocked"
      current_task: "Create login form"
      blocked_by: "backend-dev"
      blocked_reason: "Waiting for POST /api/auth/login endpoint"
      context: ["src/pages/Login/", "src/components/AuthForm/"]

    - id: "qa-engineer"
      status: "working"
      current_task: "Write integration tests"
      progress: "40%"
      context: ["tests/integration/auth/"]

  # Coordination
  coordination:
    # Communication log
    communication:
      - from: "backend-dev"
        to: "frontend-dev"
        channel: "api-contracts"
        message: "Login endpoint contract defined"
        timestamp: "2026-01-08T10:30:00Z"

      - from: "backend-dev"
        to: "qa-engineer"
        channel: "implementation-status"
        message: "JWT generation module ready for testing"
        timestamp: "2026-01-08T11:15:00Z"

    # Shared state
    shared_state:
      api_endpoints_ready: []
      api_endpoints_in_progress: ["/api/auth/login"]
      components_created: ["JWTService"]
      tests_passing: 5
      tests_failing: 0
      coverage: 75

    # Dependencies
    dependencies:
      frontend-dev:
        depends_on: ["backend-dev"]
        waiting_for: "POST /api/auth/login implementation"

      qa-engineer:
        depends_on: ["backend-dev", "frontend-dev"]
        can_work_parallel: true
        notes: "Can write tests before implementation complete"

  # System suggestions
  suggestions:
    next_actions:
      - agent: "backend-dev"
        action: "Complete JWT generation and notify frontend"
        priority: "high"

      - agent: "qa-engineer"
        action: "Continue integration tests in parallel"
        priority: "medium"

      - agent: "frontend-dev"
        action: "Wait for backend or mock API"
        priority: "low"

    optimization:
      message: "QA can continue in parallel. Frontend can use mock API to unblock."
      suggested_technique: "Keep message-passing, consider adding shared-state for test results"

# Tasks
tasks:
  - description: "Define authentication requirements"
    status: "done"
    agent: "architect"

  - description: "Design API contracts"
    status: "done"
    agent: "architect"

  - description: "Implement JWT generation"
    status: "in-progress"
    agent: "backend-dev"
    progress: 70

  - description: "Implement login endpoint"
    status: "pending"
    agent: "backend-dev"

  - description: "Create login form UI"
    status: "blocked"
    agent: "frontend-dev"
    blocked_by: "Waiting for API"

  - description: "Write integration tests"
    status: "in-progress"
    agent: "qa-engineer"
    progress: 40
```

---

## Validación de Agentes

Añadir a `validate-ad-yaml.sh`:

```bash
# Validate agents configuration
validate_agents() {
    local file=$1

    # Check if agents.enabled exists
    local enabled=$(yq eval '.agents.enabled' "$file" 2>/dev/null)

    if [ "$enabled" = "true" ]; then
        echo "Validating agents configuration..."

        # Check required fields
        local technique=$(yq eval '.agents.coordination_technique' "$file")
        if [ -z "$technique" ] || [ "$technique" = "null" ]; then
            echo "ERROR: agents.coordination_technique is required when agents.enabled=true"
            return 1
        fi

        # Validate technique is valid
        valid_techniques=("message-passing" "shared-state" "leader-follower" "pipeline" "swarm" "contract-net")
        if [[ ! " ${valid_techniques[@]} " =~ " ${technique} " ]]; then
            echo "ERROR: Invalid coordination_technique: $technique"
            return 1
        fi

        # Check active agents have required fields
        local active_agents=$(yq eval '.agents.active[]' "$file" 2>/dev/null)
        if [ -n "$active_agents" ]; then
            for agent_id in $(yq eval '.agents.active[].id' "$file"); do
                local status=$(yq eval ".agents.active[] | select(.id == \"$agent_id\") | .status" "$file")
                if [ -z "$status" ] || [ "$status" = "null" ]; then
                    echo "ERROR: Agent $agent_id missing status"
                    return 1
                fi
            done
        fi

        echo "✓ Agents configuration valid"
    fi

    return 0
}
```

---

## Próximos Pasos

1. **Aprobar el schema de agentes** para ad.yaml
2. **Definir cuáles técnicas soportar primero** (empezar con las 6 fundamentales)
3. **Implementar sugerencias automáticas** por fase/tipo
4. **Actualizar claude.md** con instrucciones de agentes
5. **Crear ejemplos** de cada técnica
6. **Probar con feature real** usando multi-agente

## Preguntas

1. **¿Qué técnicas priorizar?** (Sugerencia: message-passing + shared-state primero)
2. **¿Plataforma principal?** (claude-sdk, windsurf, manual)
3. **¿Nivel de automatización?** (¿Crear agentes automáticamente o siempre preguntar?)
4. **¿Sugerencias obligatorias o opcionales?** (¿Forzar multi-agente en BUILD de feat?)

**¿Listo para implementar esto?**
