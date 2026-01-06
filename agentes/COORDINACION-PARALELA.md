# Coordinación de Agentes en Paralelo

**Técnicas y patrones para que múltiples agentes trabajen simultáneamente**

Versión: 2.0
Fecha: 2026-01-06

---

## El Problema Real

La mayoría de herramientas **NO tienen agentes cooperando en paralelo real**. Lo que tienen es:

❌ **Secuencial con ilusión de paralelo** (Windsurf Cascade)
❌ **Multi-proceso sin comunicación** (múltiples Cursor/Aider)
❌ **Multi-tarea pero un agente** (Cursor Composer)

✅ **Verdadero paralelo cooperativo** = Múltiples agentes ejecutando simultáneamente Y comunicándose

---

## Realidad de las Herramientas (Enero 2026)

### Windsurf Cascade - NO es totalmente paralelo

```
Lo que dice el marketing:
"Multi-agente con Cascade"

La realidad:
┌─────────────────────┐
│   Orquestador       │
└──────┬──────────────┘
       │
   ┌───▼────┐
   │ Agent 1│ ejecuta
   └───┬────┘
       │ termina
   ┌───▼────┐
   │ Agent 2│ ejecuta
   └───┬────┘
       │ termina
   ┌───▼────┐
   │ Agent 3│ ejecuta
   └────────┘

= SECUENCIAL con decisión de qué agente ejecutar
```

**Tiene algo de paralelismo:**
- Search Agent puede correr mientras Code Agent piensa
- Pero NO es "todos trabajando a la vez"
- Orquestador decide secuencia

### Cursor - NO multi-agente

```
Composer = 1 agente potente
No hay coordinación porque solo hay 1 agente
```

### Claude Code + Agent SDK - SÍ es paralelo real

```python
# ESTO SÍ ES PARALELO REAL
import asyncio
from claude_agent import Agent, Coordinator

async def main():
    # 3 agentes ejecutando simultáneamente
    results = await asyncio.gather(
        backend_agent.run("Implementa API"),
        frontend_agent.run("Crea UI"),
        test_agent.run("Escribe tests")
    )
```

**Por qué funciona:**
- Python asyncio = verdadero paralelismo
- Cada agente = proceso independiente
- Pueden comunicarse mientras ejecutan

---

## Técnicas de Coordinación Multi-Agente

### 1. Message Passing (Paso de Mensajes)

**Concepto:** Agentes se envían mensajes entre sí.

```python
# Agente Backend envía mensaje a Frontend
backend_agent.send_message(
    to="frontend_agent",
    type="api_ready",
    payload={
        "endpoint": "/api/users",
        "schema": {...}
    }
)

# Frontend recibe y actúa
frontend_agent.on_message("api_ready", lambda msg:
    frontend_agent.use_api(msg.payload)
)
```

**Ventajas:**
✅ Desacoplado - agentes no necesitan conocerse
✅ Asíncrono - no bloquean
✅ Escalable

**Implementación:**
- **Redis Pub/Sub** - Canal de mensajes
- **RabbitMQ / Kafka** - Message queue enterprise
- **WebSockets** - Comunicación en tiempo real
- **MCP (Model Context Protocol)** - Protocolo de Anthropic

**Herramientas que lo soportan:**
- ✅ Claude Code + Agent SDK (vía MCP)
- ✅ Custom scripts con Redis
- ❌ Windsurf (no expuesto)
- ❌ Cursor (no aplicable)

---

### 2. Shared State / Blackboard Pattern

**Concepto:** Todos los agentes leen/escriben en estado compartido.

```python
# Memoria compartida
shared_state = {
    "api_endpoints": [],
    "components_created": [],
    "tests_passed": 0
}

# Agente Backend escribe
backend_agent.execute():
    shared_state["api_endpoints"].append("/api/users")

# Agente Frontend lee
frontend_agent.execute():
    endpoints = shared_state["api_endpoints"]
    for endpoint in endpoints:
        create_api_client(endpoint)
```

**Ventajas:**
✅ Simple de entender
✅ Todos ven el mismo estado
✅ No necesitas mensajes

**Desventajas:**
❌ Race conditions (conflictos de escritura)
❌ Requiere locks/semaphores
❌ No escala bien (> 5 agentes)

**Implementación:**
- **SQLite shared DB** - Para estado persistente
- **Redis** - Para estado en memoria
- **Filesystem** - Archivos JSON compartidos
- **Git** - Estado = repo, commits = cambios

**Herramientas que lo soportan:**
- ✅ Claude Code + custom (SQLite/Redis)
- ✅ Aider + Git (filesystem como shared state)
- 🟡 Windsurf Cascade (internal, no configurable)

---

### 3. Actor Model (Erlang/Akka style)

**Concepto:** Cada agente es un "actor" con mailbox.

```python
class BackendActor(Actor):
    def __init__(self):
        self.mailbox = Queue()

    def receive(self, message):
        if message.type == "build_api":
            result = self.build_api()
            # Enviar resultado a quien pidió
            message.sender.send(result)

    async def run(self):
        while True:
            msg = await self.mailbox.get()
            self.receive(msg)

# Uso
backend = BackendActor()
frontend = FrontendActor()

# Frontend pide a Backend
backend.mailbox.put(Message(
    type="build_api",
    sender=frontend,
    data={...}
))
```

**Ventajas:**
✅ Muy robusto (Erlang lleva 30 años con esto)
✅ Failure aislado - si un actor falla, otros siguen
✅ Escalable

**Implementación:**
- **Ray** (Python framework para actors)
- **Akka** (JVM)
- **Orleans** (.NET)
- **Custom con asyncio**

**Herramientas que lo soportan:**
- ✅ Claude Code + Ray/custom
- ❌ Ningún IDE lo soporta nativamente

---

### 4. Event-Driven Coordination

**Concepto:** Agentes reaccionan a eventos.

```python
# Event bus
events = EventBus()

# Agente Backend publica evento
@backend_agent.on_finish
def on_api_ready():
    events.publish("api.ready", {
        "endpoints": [...]
    })

# Agente Frontend se suscribe
@events.subscribe("api.ready")
def on_api_ready(data):
    frontend_agent.integrate_api(data)

# Agente Test también se suscribe
@events.subscribe("api.ready")
def on_api_ready(data):
    test_agent.test_api(data)
```

**Ventajas:**
✅ Muy desacoplado
✅ Múltiples agentes pueden reaccionar a mismo evento
✅ Fácil añadir nuevos agentes

**Implementación:**
- **EventEmitter** (Node.js)
- **Celery** (Python)
- **Custom event bus**

**Herramientas que lo soportan:**
- ✅ Claude Code + custom
- ❌ Ningún IDE nativamente

---

### 5. Coordinator Pattern (Orquestador)

**Concepto:** Un agente coordinador orquesta a los demás.

```python
class Coordinator:
    def __init__(self, agents):
        self.agents = agents

    async def run(self, task):
        # Analizar tarea
        plan = self.analyze(task)

        # Asignar subtareas a agentes
        tasks = []
        for subtask in plan:
            agent = self.assign_agent(subtask)
            tasks.append(agent.run(subtask))

        # Ejecutar TODO en paralelo
        results = await asyncio.gather(*tasks)

        # Integrar resultados
        return self.integrate(results)

# Uso
coord = Coordinator([
    backend_agent,
    frontend_agent,
    test_agent
])

result = await coord.run("Implementa login")
```

**Ventajas:**
✅ Control centralizado
✅ Fácil ver qué pasa
✅ Puede re-asignar si agente falla

**Desventajas:**
❌ Coordinador es bottleneck
❌ Single point of failure

**Herramientas que lo soportan:**
- ✅ Windsurf Cascade (pero secuencial)
- ✅ Claude Code + Agent SDK
- ✅ LangGraph
- ✅ CrewAI

---

### 6. Contract-First / API-First

**Concepto:** Define contratos primero, agentes trabajan en paralelo respetándolos.

```yaml
# contracts.yaml
API:
  endpoint: /api/users
  methods:
    POST:
      input: { name, email }
      output: { id, name, email, created_at }
    GET:
      input: { id }
      output: { id, name, email }

# Ahora agentes trabajan en paralelo
Backend Agent:
  - Implementa API según contrato
  - No necesita esperar a Frontend

Frontend Agent:
  - Implementa UI usando contrato (mock)
  - Cuando Backend termina, cambia mock por real

Test Agent:
  - Escribe tests basados en contrato
  - Tests pasan con mock o real
```

**Ventajas:**
✅ **Máximo paralelismo** - nadie espera a nadie
✅ Cada agente independiente
✅ Tests desde día 1

**Implementación:**
- **OpenAPI/Swagger** - Para APIs
- **JSON Schema** - Para data structures
- **Interface definitions** - Para componentes

**Herramientas que lo soportan:**
- ✅ Cualquier IDE (manual)
- ✅ Claude Code (puedes configurarlo)
- ❌ No hay IDE que lo haga automático

**Esto es lo que usamos en ADD 2.0:**
```
Fase DESIGN:
  - Define contratos (interfaces.md)

Fase BUILD:
  - Agente 1: Backend (implementa contrato)
  - Agente 2: Frontend (usa mock del contrato)
  - Agente 3: Tests (basados en contrato)

  Todos trabajan EN PARALELO
  Cuando Backend termina, Frontend integra
```

---

## Patrones de Comunicación

### Síncrono vs Asíncrono

**Síncrono (bloqueante):**
```python
# Frontend espera a Backend
api = backend_agent.build_api()  # BLOQUEA
frontend_agent.use_api(api)
```

❌ No es paralelo real
✅ Simple de entender

**Asíncrono (no bloqueante):**
```python
# Frontend no espera
backend_future = backend_agent.build_api_async()
# Frontend hace otras cosas
frontend_agent.build_ui()
# Cuando necesita API
api = await backend_future
frontend_agent.integrate_api(api)
```

✅ Paralelo real
❌ Más complejo

---

### Request-Reply vs Fire-and-Forget

**Request-Reply:**
```python
# Agente 1 pide a Agente 2 y espera respuesta
response = await agent2.request("dame_datos")
agent1.process(response)
```

**Fire-and-Forget:**
```python
# Agente 1 envía mensaje y sigue
agent2.notify("datos_listos", data)
# Agente 1 no espera confirmación
```

---

### Push vs Pull

**Push (Event-driven):**
```python
# Agente notifica cuando termina
@agent1.on_finish
def notify_others():
    agent2.handle_completion()
    agent3.handle_completion()
```

**Pull (Polling):**
```python
# Agente 2 pregunta si Agente 1 terminó
while not agent1.is_done():
    await asyncio.sleep(1)
agent2.continue_work()
```

---

## Implementaciones Reales

### Setup 1: Claude Code + Agent SDK (Python)

**Mejor opción para paralelo real + control**

```python
# agents.py
from claude_agent import Agent, Coordinator
import asyncio

# Definir agentes
backend = Agent(
    name="backend",
    role="Backend developer",
    model="claude-3-5-sonnet",
    tools=["filesystem", "bash"],
    context_dirs=["src/backend/"]
)

frontend = Agent(
    name="frontend",
    role="Frontend developer",
    model="claude-3-5-sonnet",
    tools=["filesystem", "bash"],
    context_dirs=["src/frontend/"]
)

tester = Agent(
    name="tester",
    role="QA engineer",
    model="claude-3-5-sonnet",
    tools=["filesystem", "bash", "pytest"],
    context_dirs=["tests/"]
)

# Coordinador con comunicación
class SmartCoordinator(Coordinator):
    def __init__(self, agents):
        super().__init__(agents)
        self.events = {}

    def subscribe(self, event, agent):
        if event not in self.events:
            self.events[event] = []
        self.events[event].append(agent)

    def publish(self, event, data):
        if event in self.events:
            for agent in self.events[event]:
                agent.notify(event, data)

    async def run_parallel(self, tasks):
        """Ejecuta agentes en paralelo con comunicación"""

        # Setup event subscriptions
        self.subscribe("api_ready", frontend)
        self.subscribe("api_ready", tester)

        # Launch all agents in parallel
        agent_tasks = []

        # Backend task
        async def backend_task():
            result = await backend.run(tasks["backend"])
            # Notify when API is ready
            self.publish("api_ready", result)
            return result

        # Frontend task (with waiting for API)
        async def frontend_task():
            # Start with mocks
            await frontend.run("Setup UI with mocks")
            # Wait for API ready event
            await self.wait_for_event("api_ready")
            # Integrate real API
            await frontend.run("Integrate real API")

        # Test task
        async def test_task():
            # Wait for API
            await self.wait_for_event("api_ready")
            # Run tests
            await tester.run(tasks["test"])

        # Execute all in parallel
        results = await asyncio.gather(
            backend_task(),
            frontend_task(),
            test_task()
        )

        return results

# Uso
async def main():
    coord = SmartCoordinator([backend, frontend, tester])

    results = await coord.run_parallel({
        "backend": "Implementa API de users con JWT",
        "frontend": "Crea UI de login y dashboard",
        "test": "Tests de integración completos"
    })

    print(f"Backend: {results[0]}")
    print(f"Frontend: {results[1]}")
    print(f"Tests: {results[2]}")

if __name__ == "__main__":
    asyncio.run(main())
```

**Cómo funciona:**
1. Tres agentes se lanzan EN PARALELO
2. Backend trabaja independiente
3. Frontend empieza con mocks (no espera)
4. Cuando Backend termina → evento "api_ready"
5. Frontend y Tester reciben evento y continúan
6. **Verdadero paralelismo: Backend + Frontend (con mocks) + Test (esperando)**

---

### Setup 2: Windsurf + Custom Orchestration

**Aprovecha Cascade pero añades lógica**

```python
# orchestrator.py
import subprocess
import time
from threading import Thread

def run_windsurf_agent(task_file):
    """Ejecuta Windsurf con un task file"""
    subprocess.run([
        "windsurf",
        "--cascade",
        "--task-file", task_file
    ])

# Tasks
tasks = [
    "tasks/backend.md",
    "tasks/frontend.md",
    "tasks/tests.md"
]

# Launch en paralelo
threads = []
for task in tasks:
    t = Thread(target=run_windsurf_agent, args=(task,))
    t.start()
    threads.append(t)

# Wait all
for t in threads:
    t.join()

print("All agents finished")
```

**Limitaciones:**
- No hay comunicación entre agentes Windsurf
- Solo paralelismo de ejecución
- Coordinación manual via filesystem/Git

---

### Setup 3: Multiple Aider + Redis

**Aider + message queue**

```python
# coordinator.py
import redis
import subprocess
from threading import Thread

r = redis.Redis()

def backend_agent():
    # Ejecuta Aider
    result = subprocess.run([
        "aider",
        "src/backend/",
        "--message", "Implementa API users"
    ], capture_output=True)

    # Publica evento
    r.publish("api_ready", "Backend API completed")

def frontend_agent():
    # Espera evento
    pubsub = r.pubsub()
    pubsub.subscribe("api_ready")

    # Trabaja con mock mientras tanto
    subprocess.run([
        "aider",
        "src/frontend/",
        "--message", "Setup UI with API mocks"
    ])

    # Espera API real
    for message in pubsub.listen():
        if message['type'] == 'message':
            break

    # Integra API real
    subprocess.run([
        "aider",
        "src/frontend/",
        "--message", "Integrate real API"
    ])

# Launch parallel
t1 = Thread(target=backend_agent)
t2 = Thread(target=frontend_agent)

t1.start()
t2.start()

t1.join()
t2.join()
```

**Ventajas:**
✅ Paralelo real
✅ Comunicación via Redis
✅ Funciona con cualquier herramienta CLI

**Desventajas:**
❌ Mucho código glue
❌ Mantenimiento complejo

---

### Setup 4: LangGraph (Framework Multi-Agente)

**Framework especializado**

```python
from langgraph.graph import StateGraph
from langgraph.prebuilt import ToolExecutor
from langchain_anthropic import ChatAnthropic

# Define state
class State:
    api_ready: bool = False
    ui_ready: bool = False
    tests_done: bool = False

# Define nodes (agentes)
def backend_node(state):
    llm = ChatAnthropic(model="claude-3-5-sonnet")
    result = llm.invoke("Implementa API users")
    state.api_ready = True
    return state

def frontend_node(state):
    if not state.api_ready:
        # Trabaja con mock
        llm.invoke("Setup UI with mocks")
        return state  # Re-ejecutará cuando api_ready
    else:
        llm.invoke("Integrate real API")
        state.ui_ready = True
        return state

def test_node(state):
    if not state.api_ready:
        return state
    llm.invoke("Run integration tests")
    state.tests_done = True
    return state

# Build graph
workflow = StateGraph(State)
workflow.add_node("backend", backend_node)
workflow.add_node("frontend", frontend_node)
workflow.add_node("test", test_node)

# Define edges (dependencias)
workflow.set_entry_point("backend")
workflow.add_edge("backend", "frontend")
workflow.add_edge("backend", "test")

# Compile
app = workflow.compile()

# Run (paralelo donde puede)
result = app.invoke(State())
```

**Ventajas:**
✅ Framework maduro
✅ Gestiona dependencias automáticamente
✅ Visualización del grafo

**Desventajas:**
❌ Curva de aprendizaje
❌ No integrado con IDEs

---

### Setup 5: CrewAI (Team of Agents)

**Framework especializado en crews**

```python
from crewai import Agent, Task, Crew

# Define agents
backend = Agent(
    role="Backend Developer",
    goal="Implement secure APIs",
    backstory="Expert in Node.js and Express",
    llm="claude-3-5-sonnet"
)

frontend = Agent(
    role="Frontend Developer",
    goal="Create beautiful UIs",
    backstory="React expert",
    llm="claude-3-5-sonnet"
)

tester = Agent(
    role="QA Engineer",
    goal="Ensure quality",
    backstory="Testing expert",
    llm="claude-3-5-sonnet"
)

# Define tasks
task1 = Task(
    description="Implement /api/users endpoint with JWT",
    agent=backend
)

task2 = Task(
    description="Create login and dashboard UI",
    agent=frontend,
    depends_on=[task1]  # Espera a task1
)

task3 = Task(
    description="Write integration tests",
    agent=tester,
    depends_on=[task1]  # Espera a task1
)

# Create crew
crew = Crew(
    agents=[backend, frontend, tester],
    tasks=[task1, task2, task3],
    process="parallel"  # Paralelo donde es posible
)

# Execute
result = crew.kickoff()
```

**Ventajas:**
✅ Muy fácil de usar
✅ Gestión de dependencias clara
✅ Logs y debugging buenos

---

## Comparativa de Técnicas

| Técnica | Paralelismo Real | Complejidad | IDE Support | Escalabilidad |
|---------|------------------|-------------|-------------|---------------|
| Message Passing | ✅ Sí | ⭐⭐⭐ Alta | ❌ No | ✅ Excelente |
| Shared State | 🟡 Limitado | ⭐⭐ Media | 🟡 Parcial | 🟡 Media |
| Actor Model | ✅ Sí | ⭐⭐⭐⭐ Muy Alta | ❌ No | ✅ Excelente |
| Event-Driven | ✅ Sí | ⭐⭐ Media | ❌ No | ✅ Muy Buena |
| Coordinator | 🟡 Depende | ⭐⭐ Media | ✅ Windsurf | 🟡 Media |
| Contract-First | ✅ Sí | ⭐ Baja | ✅ Cualquiera | ✅ Excelente |

---

## Recomendaciones Prácticas

### Para ADD (Agent-Driven Development)

**Opción 1: Contract-First (Más Simple)**

```
Fase DESIGN:
  ├── Define interfaces.md (contratos)
  └── Todos los agentes los leen

Fase BUILD:
  ├── Backend Agent: Implementa contratos
  ├── Frontend Agent: Usa mocks de contratos
  └── Test Agent: Tests basados en contratos

  Coordinación: Git + PR reviews
  Comunicación: Filesystem (contratos + Git)
```

**Ventajas:**
✅ Funciona con ANY IDE (Cursor, Windsurf, Aider...)
✅ Simple, no requiere frameworks
✅ Máximo paralelismo
✅ Ya parte de ADD 2.0 (DESIGN phase)

**Cómo implementar:**
1. En DESIGN, crea `docs/interfaces.md`
2. Define todos los contratos (APIs, schemas, componentes)
3. En BUILD, cada agente lee contratos y trabaja independiente
4. Git branches + PRs para integración
5. Tests validan contratos

---

**Opción 2: Claude Code + Agent SDK (Más Potente)**

```
Fase BUILD:
  ├── coordinator.py (orquestador)
  ├── backend_agent (Claude Agent SDK)
  ├── frontend_agent (Claude Agent SDK)
  └── test_agent (Claude Agent SDK)

  Coordinación: Python asyncio
  Comunicación: Events + Shared State
```

**Ventajas:**
✅ Paralelismo REAL
✅ Comunicación entre agentes
✅ Control total

**Desventajas:**
❌ Requiere programación
❌ CLI only (no IDE)
❌ Setup complejo

---

**Opción 3: Windsurf + Manual Coordination (Intermedio)**

```
Fase BUILD:
  ├── Windsurf Cascade (UI)
  ├── orchestrator.py (custom)
  └── Git (sincronización)

  Coordinación: Script custom
  Comunicación: Filesystem + Git
```

**Ventajas:**
✅ UI de Windsurf
🟡 Algo de paralelismo
✅ Más simple que Claude Code

**Desventajas:**
🟡 No completamente paralelo
❌ Requiere algo de scripting

---

## Mejores Prácticas

### 1. Siempre Define Contratos Primero

```markdown
# docs/interfaces.md

## API Contracts

### POST /api/users
Input:
```json
{
  "name": "string",
  "email": "string"
}
```

Output:
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "created_at": "timestamp"
}
```

## Component Interfaces

### LoginForm
Props:
- onSubmit: (credentials) => Promise<void>
- loading: boolean

Events:
- success: (user) => void
- error: (error) => void
```

**Por qué:**
- Agentes pueden trabajar en paralelo desde día 1
- Mocks basados en contratos
- Tests desde el inicio
- Menos conflictos de integración

---

### 2. Git como Sistema de Mensajes

```bash
# Backend Agent
git checkout -b feature/backend-api
# ... hace trabajo ...
git commit -m "[API] Users endpoint ready"
git push

# Frontend Agent detecta (webhook, polling, manual)
git fetch
git checkout feature/backend-api
# Ve que API está lista
git checkout -b feature/frontend-integration
# Integra API real
```

**Ventajas:**
- Git es universal
- History completo
- Code review integrado
- Funciona con cualquier herramienta

---

### 3. Status Files para Coordinación

```yaml
# status.yaml (compartido)
backend:
  status: done
  endpoints:
    - POST /api/users
    - GET /api/users/:id

frontend:
  status: in_progress
  dependencies:
    - backend  # esperando

tests:
  status: in_progress
  dependencies:
    - backend  # esperando
```

**Agentes leen status.yaml:**
```python
# Frontend agent
status = yaml.load("status.yaml")
if status['backend']['status'] == 'done':
    integrate_real_api()
else:
    use_mocks()
```

---

### 4. Automated Integration Tests

```python
# integration_check.py (corre continuamente)
import time
import subprocess

while True:
    # Check if all agents updated
    if all_agents_committed():
        # Run integration tests
        result = subprocess.run(["npm", "test"])
        if result.returncode != 0:
            notify_agents("Integration broken!")

    time.sleep(60)  # Check cada minuto
```

---

## Conclusión: ¿Qué usar?

### Para Equipos Pequeños (1-3 personas)

**Recomendación: Contract-First + Cursor/Windsurf**

```
1. DESIGN phase: Define contratos
2. BUILD phase:
   - Usa Cursor o Windsurf
   - Cada dev trabaja en su área
   - Mocks basados en contratos
3. Git para coordinar
4. Daily sync 15 min
```

**Por qué:**
- Simple
- No requiere programación extra
- Funciona con herramientas que ya conoces
- 80% del beneficio, 20% de la complejidad

---

### Para Equipos Grandes (4+ personas)

**Recomendación: Claude Code + Agent SDK**

```
1. DESIGN: Contratos
2. PREPARE: Setup Agent SDK
3. BUILD:
   - coordinator.py orquesta
   - Cada dev = 1+ agentes
   - Agentes se comunican via events
4. CI/CD automático
```

**Por qué:**
- Necesitas coordinación automática
- Paralelismo real importa
- Vale la pena la inversión en setup

---

### Para Proyectos Complejos (Microservicios, Monorepos)

**Recomendación: LangGraph o CrewAI**

```
1. DESIGN: Contratos + grafo de dependencias
2. PREPARE: Setup framework
3. BUILD:
   - Framework gestiona coordinación
   - Visualización del workflow
   - Automatic retry/error handling
```

**Por qué:**
- Muchas dependencias entre componentes
- Necesitas visualizar el flujo
- Error handling crítico

---

## Herramienta Final de Decisión

```
¿Cuántos agentes en paralelo?
├─ 1-2: Cursor (no necesitas paralelo)
├─ 3-4: Windsurf (Cascade suficiente) o Contract-First
├─ 5-10: Claude Code + Agent SDK
└─ 10+: LangGraph/CrewAI

¿Qué tan crítica es coordinación?
├─ Baja: Contract-First + Git
├─ Media: Windsurf + custom scripts
└─ Alta: Claude Code + Agent SDK + Redis/Events

¿Presupuesto para setup?
├─ Bajo (< 1 día): Contract-First
├─ Medio (2-3 días): Windsurf + orchestration
└─ Alto (1+ semana): Agent SDK custom
```

---

## Ejemplo Completo: Sistema Real

**Proyecto:** E-commerce con microservicios

**Setup:**
```
Tools: Claude Code + Agent SDK
Coordinación: Event-Driven + Contracts
Agentes: 6 en paralelo

1. API Gateway Agent
2. Auth Service Agent
3. Product Service Agent
4. Order Service Agent
5. Frontend Agent
6. Test Agent
```

**Workflow:**
```python
# Phase: BUILD
async def build_phase():
    # Contracts definidos en DESIGN
    contracts = load_contracts()

    # Launch todos los agentes en paralelo
    results = await asyncio.gather(
        api_gateway_agent.run(contracts['gateway']),
        auth_agent.run(contracts['auth']),
        product_agent.run(contracts['products']),
        order_agent.run(contracts['orders']),
        frontend_agent.run(contracts['ui']),
        test_agent.run(contracts['tests'])
    )

    # Event: auth_ready
    # → API Gateway integra auth
    # → Frontend integra auth

    # Event: products_ready
    # → Frontend muestra productos
    # → Order service puede crear orders

    # Event: all_services_ready
    # → Test agent ejecuta E2E tests
```

**Resultado:**
- 6 agentes trabajando simultáneamente
- Integración automática via eventos
- Tests continuos
- **Tiempo: 1/6 del secuencial** (teórico)
- **Tiempo: 1/3 del secuencial** (real, por dependencias)

---

**Versión:** 2.0
**Autor:** Héctor Prats
**Fecha:** 2026-01-06
