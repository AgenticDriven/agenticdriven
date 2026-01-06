# Fase 2: DESIGN (v0.2.x)

**Diseñar la solución completa**

---

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Versión** | v0.2.x |
| **Fase** | DESIGN |
| **Duración típica** | 15-25% del proyecto total |
| **Agentes recomendados** | 2-3 (Architect, Designer, Reviewer) |
| **Coordinación** | Collaborative + Review |
| **Objetivo principal** | Diseño completo y validado de la solución |
| **Dependencias** | DISCOVER debe estar completo |

---

## 🎯 Propósito

La fase DESIGN transforma requisitos (qué) en **diseño de solución** (cómo).

**Aquí defines**:
- Arquitectura / Estructura
- Componentes y sus responsabilidades
- Interfaces entre componentes (**CRÍTICO para multi-agente**)
- Prototipos (si aplicable)
- Diseño visual (si aplicable)

**Sin un buen DESIGN, BUILD será caótico y con constantes re-trabajos.**

---

## 🎪 Actividades Principales

### 1. Diseño de Arquitectura / Estructura

**Objetivo**: Definir la estructura de alto nivel de la solución.

#### Para Software: Arquitectura de Software

```markdown
# docs/architecture.md

## Arquitectura General

### Estilo Arquitectónico
**Seleccionado**: Microservicios

**Razones**:
- Escalabilidad independiente de servicios
- Deploy independiente
- Tech stack flexible por servicio

**Alternativas consideradas**:
- Monolito: Más simple pero menos escalable
- Serverless: Más complejo, vendor lock-in

### Diagrama de Arquitectura

```
┌─────────────────────────────────────────────┐
│           Client (React SPA)                │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌──────────────────────────────────────────────┐
│         API Gateway (Kong)                   │
│  - Authentication                            │
│  - Rate Limiting                             │
│  - Routing                                   │
└───────┬──────────────┬───────────────────────┘
        │              │
        ▼              ▼
┌───────────────┐  ┌───────────────┐
│ Auth Service  │  │ Task Service  │
│ (Node.js)     │  │ (Node.js)     │
│               │  │               │
│ - JWT tokens  │  │ - CRUD tasks  │
│ - User mgmt   │  │ - Assignments │
└───────┬───────┘  └───────┬───────┘
        │                  │
        ▼                  ▼
┌────────────────────────────────────┐
│     PostgreSQL Database            │
│  - users table                     │
│  - tasks table                     │
└────────────────────────────────────┘
```

### Componentes

#### API Gateway
**Responsabilidad**: Routing, auth, rate limiting
**Tecnología**: Kong
**Endpoints**:
- `/api/auth/*` → Auth Service
- `/api/tasks/*` → Task Service

#### Auth Service
**Responsabilidad**: Autenticación y autorización
**Tecnología**: Node.js + Express + JWT
**Base de datos**: PostgreSQL (users table)
**Endpoints**: Ver `docs/interfaces.md`

#### Task Service
**Responsabilidad**: Gestión de tareas
**Tecnología**: Node.js + Express
**Base de datos**: PostgreSQL (tasks table)
**Endpoints**: Ver `docs/interfaces.md`

### Decisiones Arquitectónicas

**DA-001: Microservicios vs Monolito**
- Decisión: Microservicios
- Razón: Permitir escalar Auth y Tasks independientemente
- Trade-off: Mayor complejidad operativa

**DA-002: PostgreSQL vs MongoDB**
- Decisión: PostgreSQL
- Razón: Datos relacionales (users ↔ tasks)
- Trade-off: Menos flexible para cambios de schema

**DA-003: Sync vs Async communication**
- Decisión: Sync (HTTP/REST) para v1.0
- Razón: Simplicidad para MVP
- Futuro: Message queue para v2.0 si escalamos
```

#### Para Libro: Estructura del Contenido

```markdown
# docs/structure.md

## Estructura del Libro: ADD 2.0

### Formato
- **Páginas**: 300-350
- **Capítulos**: 12
- **Apéndices**: 3
- **Código**: Repositorios GitHub + snippets inline

### Tabla de Contenidos

#### Parte I: Fundamentos (100 páginas)

**Capítulo 1: Introducción a ADD**
- Qué es ADD y por qué importa
- Historia: de Waterfall a Agile a ADD
- ADD 1.0 vs ADD 2.0
- Estimado: 25 páginas

**Capítulo 2: Las 8 Fases Universales**
- DISCOVER, DESIGN, PREPARE, BUILD, VALIDATE, DELIVER, SUPPORT, EVOLVE
- Flujo entre fases
- Criterios de salida
- Estimado: 30 páginas

**Capítulo 3: Principios Core de ADD**
- Agent-Driven
- Documentation-First
- Phased & Structured
- Validation-Driven
- Iterative
- Traceable
- Estimado: 20 páginas

**Capítulo 4: Herramientas para ADD**
- Cursor, Windsurf, Claude Code
- GitHub Copilot, Continue, Aider
- Configuración para ADD
- Estimado: 25 páginas

#### Parte II: ADD en Práctica (150 páginas)

**Capítulo 5: DISCOVER - Entender el Problema**
- Investigación efectiva
- Requirements gathering
- Stakeholder management
- Ejemplo completo: TaskFlow app
- Estimado: 25 páginas

**Capítulo 6: DESIGN - Diseñar la Solución**
- Arquitectura de software
- Contract-First pattern
- Prototyping
- Ejemplo completo: TaskFlow app
- Estimado: 25 páginas

[... Capítulos 7-11: Otras fases ...]

**Capítulo 12: ADD Más Allá del Software**
- ADD para libros
- ADD para marketing
- ADD para productos físicos
- ADD para eventos
- Estimado: 30 páginas

#### Parte III: Multi-Agente (50 páginas)

**Capítulo 13: Coordinación Multi-Agente**
- Contract-First
- Work Stealing
- Auction-Based
- Ejemplos con Windsurf Cascade
- Estimado: 25 páginas

**Capítulo 14: Técnicas Avanzadas**
- Swarm Intelligence
- Consensus Algorithms
- Emerging patterns
- Estimado: 25 páginas

#### Apéndices

**Apéndice A**: Templates y Checklists
**Apéndice B**: Configuraciones completas de IDEs
**Apéndice C**: Glosario

### Estilo de Escritura

- **Tono**: Conversacional pero profesional
- **Ejemplos**: Código real, runnable
- **Longitud**: Capítulos 20-30 páginas
- **Imágenes**: Diagramas, screenshots, flowcharts
- **Boxes**: Tips, Warnings, Best Practices
```

---

### 2. Definición de Interfaces / Contratos

**🔴 CRÍTICO PARA MULTI-AGENTE**

Si vas a tener agentes trabajando en paralelo en BUILD, **debes definir todos los contratos aquí**.

```markdown
# docs/interfaces.md

## Contratos de Interfaces

**Propósito**: Define cómo interactúan los componentes.
**Uso**: En fase BUILD, los agentes implementan EXACTAMENTE según estos contratos.

---

## API Contracts

### Auth Service

#### POST /api/auth/register
**Descripción**: Registrar nuevo usuario

**Request**:
```json
{
  "name": "string",       // Required, 1-100 chars
  "email": "string",      // Required, valid email
  "password": "string"    // Required, min 8 chars
}
```

**Response 201 (Success)**:
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "created_at": "datetime"  // ISO 8601
}
```

**Response 400 (Validation Error)**:
```json
{
  "error": "string",
  "details": [
    {
      "field": "string",
      "message": "string"
    }
  ]
}
```

**Response 409 (Email Exists)**:
```json
{
  "error": "email_already_exists"
}
```

**Validations**:
- `name`: Required, 1-100 characters
- `email`: Required, valid email format
- `password`: Required, min 8 characters, must contain: letter + number

**Business Rules**:
- Email must be unique
- Password must be hashed (bcrypt, salt rounds: 10)
- Email confirmation sent (async, non-blocking)

**Test Cases**:
```typescript
describe('POST /api/auth/register', () => {
  it('creates user with valid data', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123'
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john@example.com',
      created_at: expect.any(String)
    });
    expect(response.body).not.toHaveProperty('password');
  });

  it('rejects invalid email', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'invalid-email',
        password: 'SecurePass123'
      });

    expect(response.status).toBe(400);
    expect(response.body.details[0].field).toBe('email');
  });

  it('rejects duplicate email', async () => {
    // First registration
    await createUser({ email: 'john@example.com' });

    // Second registration with same email
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Jane Doe',
        email: 'john@example.com',
        password: 'AnotherPass123'
      });

    expect(response.status).toBe(409);
  });
});
```

---

#### POST /api/auth/login
**Descripción**: Autenticar usuario

**Request**:
```json
{
  "email": "string",      // Required
  "password": "string"    // Required
}
```

**Response 200 (Success)**:
```json
{
  "token": "string",      // JWT token
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string"
  }
}
```

**Response 401 (Invalid Credentials)**:
```json
{
  "error": "invalid_credentials"
}
```

**Business Rules**:
- JWT token valid for 7 days
- Token includes: user_id, email, issued_at, expires_at
- Max 5 failed attempts per email per hour (rate limiting)

---

### Task Service

#### POST /api/tasks
**Descripción**: Crear nueva tarea

**Headers**:
```
Authorization: Bearer {jwt_token}  // Required
```

**Request**:
```json
{
  "title": "string",          // Required, 1-200 chars
  "description": "string",    // Optional, max 2000 chars
  "due_date": "datetime",     // Optional, ISO 8601
  "priority": "low|medium|high"  // Optional, default: medium
}
```

**Response 201 (Success)**:
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "due_date": "datetime",
  "priority": "string",
  "status": "pending",
  "created_by": "uuid",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

**Response 401 (Unauthorized)**:
```json
{
  "error": "unauthorized"
}
```

**Response 400 (Validation Error)**:
```json
{
  "error": "validation_error",
  "details": [...]
}
```

---

## Frontend Component Contracts

### LoginForm Component

**Props**:
```typescript
interface LoginFormProps {
  onSubmit: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;

  loading?: boolean;          // Optional, default: false
  error?: string | null;      // Optional, error message
  onForgotPassword?: () => void;  // Optional callback
}
```

**Events**:
```typescript
interface LoginFormEvents {
  onSuccess: (user: User) => void;
  onError: (error: Error) => void;
}
```

**State**:
```typescript
interface LoginFormState {
  email: string;
  password: string;
  errors: {
    email?: string;
    password?: string;
  };
}
```

**Validation Rules**:
- Email: Required, valid email format
- Password: Required, min 1 char (actual validation server-side)

**Example Usage**:
```typescript
<LoginForm
  onSubmit={handleLogin}
  loading={isLoading}
  error={errorMessage}
  onForgotPassword={() => navigate('/forgot-password')}
/>
```

**Mock for Testing**:
```typescript
const mockLoginForm = {
  onSubmit: jest.fn().mockResolvedValue(undefined),
  loading: false,
  error: null
};
```

---

### TaskList Component

**Props**:
```typescript
interface TaskListProps {
  tasks: Task[];              // Array of tasks
  onTaskClick: (task: Task) => void;
  onTaskComplete: (taskId: string) => Promise<void>;
  onTaskDelete: (taskId: string) => Promise<void>;
  loading?: boolean;
  emptyMessage?: string;
}
```

**Task Type**:
```typescript
interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  created_by: string;
  created_at: string;
  updated_at: string;
}
```

---

## Database Schema Contracts

### users table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

### tasks table

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  due_date TIMESTAMP,
  priority VARCHAR(20) DEFAULT 'medium',
    CHECK (priority IN ('low', 'medium', 'high')),
  status VARCHAR(20) DEFAULT 'pending',
    CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_by UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tasks_created_by ON tasks(created_by);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
```

---

## Mocks para Desarrollo Paralelo

### API Mock (Frontend Development)

```typescript
// src/mocks/api.mock.ts

export const mockAPI = {
  auth: {
    register: async (data: RegisterData): Promise<User> => {
      // Simulate network delay
      await delay(500);

      // Simulate validation
      if (!data.email.includes('@')) {
        throw new Error('Invalid email');
      }

      // Return mock user
      return {
        id: 'mock-uuid-' + Date.now(),
        name: data.name,
        email: data.email,
        created_at: new Date().toISOString()
      };
    },

    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
      await delay(500);

      // Mock success
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 'mock-user-id',
          name: 'Mock User',
          email: credentials.email
        }
      };
    }
  },

  tasks: {
    create: async (data: CreateTaskData): Promise<Task> => {
      await delay(500);

      return {
        id: 'mock-task-' + Date.now(),
        ...data,
        status: 'pending',
        created_by: 'mock-user-id',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    },

    list: async (): Promise<Task[]> => {
      await delay(500);

      return [
        {
          id: 'mock-task-1',
          title: 'Example Task 1',
          description: 'This is a mock task',
          priority: 'medium',
          status: 'pending',
          created_by: 'mock-user-id',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'mock-task-2',
          title: 'Example Task 2',
          priority: 'high',
          status: 'in_progress',
          created_by: 'mock-user-id',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
  }
};

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Usage in frontend
// import { mockAPI } from './mocks/api.mock';
// const user = await mockAPI.auth.register(data);
```

---

## Contract Validation

### How to Validate Implementation Matches Contract

**Step 1**: Generate tests from contract
**Step 2**: Run tests against implementation
**Step 3**: All tests must pass before integration

**Example validation script**:
```typescript
// scripts/validate-contracts.ts

import { validateAPIContract } from './validators';

async function main() {
  console.log('Validating API contracts...');

  // Validate Auth Service
  const authResults = await validateAPIContract({
    service: 'auth',
    baseURL: 'http://localhost:3001',
    contracts: loadContracts('auth')
  });

  // Validate Task Service
  const taskResults = await validateAPIContract({
    service: 'tasks',
    baseURL: 'http://localhost:3002',
    contracts: loadContracts('tasks')
  });

  // Report
  if (authResults.passed && taskResults.passed) {
    console.log('✅ All contracts validated successfully');
    process.exit(0);
  } else {
    console.error('❌ Contract validation failed');
    console.error(authResults.failures);
    console.error(taskResults.failures);
    process.exit(1);
  }
}

main();
```

---

**IMPORTANTE**: Estos contratos son **inmutables** durante BUILD.

Si necesitas cambiar un contrato:
1. Volver a DESIGN
2. Actualizar contrato
3. Documentar cambio en ADR
4. Comunicar a todos los agentes
5. Re-implementar afectados
```

---

### 3. Prototyping (Si Aplicable)

**Cuándo hacer prototipos**:
- Cuando UX es crítico
- Cuando hay incertidumbre técnica
- Cuando stakeholders necesitan ver algo tangible

```markdown
# docs/prototypes.md

## Prototipos

### Prototipo 1: UX Flow

**Herramienta**: Figma
**Objetivo**: Validar flujo de usuario completo
**Link**: https://figma.com/file/taskflow-prototype

**Screens**:
1. Landing page
2. Sign up
3. Login
4. Dashboard (task list)
5. Create task
6. Task detail

**Feedback de usuarios** (5 usuarios testeados):
- ✅ Flujo claro y simple
- ⚠️ Create task debería ser modal, no página completa
- ⚠️ Dashboard needs filters

**Cambios aplicados**:
- Create task ahora es modal
- Dashboard tiene filtros por status y priority

**Decisión**: ✅ Prototipo validado, continuar con este diseño

---

### Prototipo 2: Arquitectura Real-time

**Herramienta**: Code spike
**Objetivo**: Validar que WebSockets funciona para notificaciones real-time
**Repo**: https://github.com/taskflow/spike-websockets

**Implementación**:
- Socket.io en backend
- React + socket.io-client en frontend
- PostgreSQL + notify/listen para eventos

**Pruebas**:
- ✅ Latencia < 100ms
- ✅ Escala a 1000 conexiones concurrentes
- ✅ Reconnection automática funciona

**Decisión**: ✅ Usar Socket.io para real-time en v1.0
```

---

### 4. Diseño Visual (Si Aplicable)

Para productos con UI:

```markdown
# docs/visual-design.md

## Design System

### Colors

**Primary**: #3B82F6 (Blue 500)
**Secondary**: #10B981 (Green 500)
**Accent**: #F59E0B (Amber 500)
**Error**: #EF4444 (Red 500)
**Warning**: #F59E0B (Amber 500)
**Success**: #10B981 (Green 500)

**Neutrals**:
- Gray 50-900 (Tailwind scale)
- White: #FFFFFF
- Black: #000000

### Typography

**Font Family**: Inter (Google Fonts)

**Sizes**:
- xs: 12px / 1rem
- sm: 14px / 1.25rem
- base: 16px / 1.5rem
- lg: 18px / 1.75rem
- xl: 20px / 2rem
- 2xl: 24px / 2.5rem
- 3xl: 30px / 3rem

### Spacing

**Scale**: 4px base (Tailwind)
- 1: 4px
- 2: 8px
- 3: 12px
- 4: 16px
- 6: 24px
- 8: 32px
- 12: 48px

### Components

**Button**:
- Primary: bg-blue-500, hover:bg-blue-600
- Secondary: bg-gray-200, hover:bg-gray-300
- Sizes: sm (32px), md (40px), lg (48px)
- Border radius: 8px

**Input**:
- Border: 1px solid gray-300
- Focus: border-blue-500, ring-2 ring-blue-200
- Height: 40px
- Padding: 12px
- Border radius: 8px

**Card**:
- Background: white
- Border: 1px solid gray-200
- Shadow: shadow-md
- Padding: 24px
- Border radius: 12px
```

---

## 📦 Entregables de DESIGN

```
docs/
├── design.md                  ← Resumen de diseño
├── architecture.md            ← Arquitectura/estructura
├── interfaces.md              ← Contratos (CRÍTICO)
├── prototypes.md              ← Prototipos y validaciones
├── visual-design.md           ← Design system (si UI)
├── diagrams/                  ← Diagramas (arquitectura, flujos, etc.)
│   ├── architecture.png
│   ├── user-flow.png
│   └── database-schema.png
└── decisions.md               ← ADRs adicionales de DESIGN
```

---

## ✅ Criterios de Salida

### Criterio 1: Diseño Completo Documentado
- [ ] Arquitectura/estructura definida y documentada
- [ ] Todos los componentes identificados
- [ ] Responsabilidades claras por componente
- [ ] Diagramas de arquitectura creados

**Validación**:
```
¿Un developer nuevo puede entender la arquitectura leyendo docs/architecture.md?
```

---

### Criterio 2: Todos los Contratos/Interfaces Definidos
- [ ] **CRÍTICO**: `docs/interfaces.md` completo
- [ ] Todos los endpoints API especificados
- [ ] Todos los componentes con props/events definidos
- [ ] Database schema (si aplicable) definido
- [ ] Validation rules documentadas
- [ ] Test cases de ejemplo incluidos
- [ ] Mocks generados para desarrollo paralelo

**Validación**:
```
¿Dos agentes pueden trabajar en paralelo usando estos contratos?
¿Los contratos son lo suficientemente detallados?
¿Incluyen validaciones y casos de error?
```

---

### Criterio 3: Tecnologías Justificadas
- [ ] Stack tecnológico decidido
- [ ] Cada elección tiene ADR con razones
- [ ] Alternativas consideradas documentadas
- [ ] Trade-offs entendidos y aceptados

**Validación**:
```
¿Sabemos por qué elegimos cada tecnología?
¿Consideramos al menos 2 alternativas por decisión importante?
```

---

### Criterio 4: Diseño Aprobado por Stakeholders
- [ ] Tech Lead ha revisado y aprobado arquitectura
- [ ] Product Owner ha revisado y aprobado diseño
- [ ] UX ha aprobado prototipos (si aplicable)
- [ ] Security ha revisado (si es crítico)

**Validación**:
```
¿Todos los stakeholders clave firmaron approval?
¿Hay feedback pendiente de incorporar?
```

---

### Criterio 5: Prototipos Validados (Si Aplicable)
- [ ] Prototipos creados para áreas de incertidumbre
- [ ] Prototipos testeados con usuarios/stakeholders
- [ ] Feedback incorporado
- [ ] Spikes técnicos resueltos

**Validación**:
```
¿Resolvimos las incertidumbres principales?
¿Tenemos confianza en que el diseño funcionará?
```

---

## 🚨 Errores Comunes

### ❌ Error 1: Contratos Incompletos o Vagos

**Malo**:
```typescript
// ❌ Vago, no sirve para BUILD paralelo
interface LoginFormProps {
  onSubmit: Function;  // ¿Qué parámetros? ¿Qué retorna?
  data?: any;          // ¿Qué tipo de data?
}
```

**Bueno**:
```typescript
// ✅ Específico, sirve para BUILD paralelo
interface LoginFormProps {
  onSubmit: (credentials: {
    email: string;      // Valid email format
    password: string;   // Min 8 chars
  }) => Promise<void>;  // Async, returns nothing

  loading?: boolean;    // Optional, default: false
  error?: string | null; // Optional, error message to display
}
```

---

### ❌ Error 2: Diseñar Demasiado (Overengineering)

**Problema**: Diseñar para casos que puede que nunca pasen.

**Ejemplo**:
```
"Vamos a hacer microservicios con Kubernetes, service mesh,
event sourcing, CQRS, y DDD para una app de 100 usuarios"
```

**Solución**: Diseña para requisitos reales, no hipotéticos.
- YAGNI (You Ain't Gonna Need It)
- Start simple, evolve later

---

### ❌ Error 3: No Definir Contratos

**Consecuencia en BUILD**:
```
Backend developer: "Hice la API"
Frontend developer: "No matchea lo que esperaba"
Backend: "No me dijiste qué esperabas"
Frontend: "No sabía que tenía que decírtelo"
→ Días de re-trabajo
```

**Solución**: Contratos ANTES de BUILD, siempre.

---

### ❌ Error 4: Diseño Sin Validación

**Problema**: Diseñar en vacío sin validar con nadie.

**Consecuencia**:
- Asunciones incorrectas
- Diseño que no resuelve el problema real
- Rechazo de stakeholders en BUILD (tarde)

**Solución**: Validar diseño con:
- Tech lead (viabilidad técnica)
- Product owner (cumple requisitos)
- UX (usable)
- Security (seguro)

---

## 🎨 Ejemplos por Dominio

### Software (SaaS - TaskFlow)

Ya cubierto arriba extensamente.

---

### Libro: ADD 2.0

```markdown
# docs/structure.md (detallado arriba)

## Contratos Libro

### Capítulo Contract

**Estructura de cada capítulo**:
```markdown
# Capítulo X: [Título]

## Objetivos del Capítulo
[3-5 bullet points de qué aprenderás]

## Contenido
[20-30 páginas]
- Introducción (2 páginas)
- Conceptos (10 páginas)
- Ejemplo práctico (8 páginas)
- Ejercicios (3 páginas)
- Resumen (2 páginas)

## Entregables del Capítulo
- Código ejemplo en GitHub
- Ejercicios con soluciones

## Criterios de Éxito
- Lector puede aplicar conceptos en su proyecto
- Ejemplos son runnable
```

### Diagrama de Flujo de Lectura

```
Parte I: Fundamentos
      ↓
Parte II: ADD en Práctica
      ↓
Parte III: Multi-Agente
      ↓
Apéndices (referencia)
```
```

---

### Marketing: Campaña Lanzamiento

```markdown
# docs/campaign-design.md

## Estructura de Campaña

### Funnel

```
Awareness (10,000 visitors)
    ↓ 20% CTR
Landing Page (2,000 visitors)
    ↓ 10% conversion
Lead Magnet (200 leads)
    ↓ 50% nurture
Email Sequence (100 engaged)
    ↓ 10% conversion
Sign-up (10 customers)
```

### Assets a Crear

**1. Landing Page**
- Hero section
- Benefits (3 columnas)
- Social proof (testimonials)
- Pricing
- CTA principal
- Footer

**2. Blog Posts** (10 posts)
- "5 Ways to Improve Team Collaboration"
- "TaskFlow vs Asana: Which is Better?"
- "How to Organize Your Team's Tasks"
- [7 more...]

**3. Email Sequence** (5 emails)
- Email 1 (Day 0): Welcome + lead magnet
- Email 2 (Day 2): Case study
- Email 3 (Day 5): Feature highlight
- Email 4 (Day 7): Social proof
- Email 5 (Day 10): Offer + CTA

**4. LinkedIn Ads**
- 5 ad variations (A/B test)
- 10 creatives (images + copy)

### Contratos Marketing

**Blog Post Contract**:
```markdown
## Blog Post Structure

**Length**: 1500-2000 words
**SEO**:
- Primary keyword: Density 1-2%
- Secondary keywords: 3-5
- Meta description: 150-160 chars

**Structure**:
1. Hook (100 words)
2. Problem statement (200 words)
3. Solution with examples (1000 words)
4. Conclusion + CTA (200 words)

**Images**: Minimum 3 (header + 2 inline)
**Links**: 3-5 internal, 2-3 external (authority)
```
```

---

### Producto Físico: Teclado Ergonómico

```markdown
# docs/product-design.md

## Diseño Industrial

### Especificaciones Físicas

**Dimensiones**:
- Split: 2 mitades
- Cada mitad: 180mm × 120mm × 30mm
- Distancia entre mitades: Ajustable 0-400mm
- Peso: 600g total

**Materiales**:
- Case: ABS plastic (inyección)
- Keycaps: PBT (doubleshot)
- PCB: FR4, 1.6mm
- Cable: USB-C, trenzado

### Componentes

**Electronics**:
- MCU: ATmega32U4
- Switches: Hot-swappable (Kailh socket)
- RGB LEDs: WS2812B (per-key)
- OLED Display: 128x32 (opcional)

### Contratos de Fabricación

**PCB Fabrication Contract**:
```
Supplier: JLCPCB
Quantity: 1000 units
Material: FR4 1.6mm
Finish: ENIG (gold)
Color: Black
Lead time: 15 days
Cost: $2.50/unit
```

**Assembly Contract**:
```
Supplier: Local assembly house
Process: SMT + THT
Components: Provided by us
Testing: 100% functional test
Lead time: 10 days
Cost: $8/unit
```

### Prototyping Plan

**Prototype 1**: 3D print
- Goal: Validate form factor
- Quantity: 5 units
- Cost: $50/unit
- Timeline: 1 week

**Prototype 2**: CNC machined
- Goal: Validate fit and finish
- Quantity: 10 units
- Cost: $150/unit
- Timeline: 2 weeks

**Prototype 3**: Injection molded (pilot)
- Goal: Final validation
- Quantity: 100 units
- Cost: $25/unit (includes tooling)
- Timeline: 4 weeks
```

---

### Evento: ADD Conference

```markdown
# docs/event-design.md

## Estructura del Evento

### Timeline

**Día 1**:
- 09:00-09:30: Registration + breakfast
- 09:30-10:00: Opening keynote
- 10:00-12:00: Morning talks (3 talks × 30min + Q&A)
- 12:00-13:30: Lunch + networking
- 13:30-15:30: Afternoon talks (3 talks)
- 15:30-17:00: Workshop track A
- 17:00-18:00: Evening keynote
- 18:00-20:00: Networking reception

**Día 2**:
- Similar structure

### Tracks

**Track 1**: ADD Fundamentals
- Talk 1: "Introduction to ADD 2.0"
- Talk 2: "Contract-First Development"
- Talk 3: "Multi-Agent Coordination"

**Track 2**: Advanced Topics
- Talk 1: "Scaling ADD to Large Teams"
- Talk 2: "ADD for Non-Software Projects"
- Talk 3: "Future of Agent-Driven Development"

**Track 3**: Workshops (hands-on)
- Workshop 1: "Build Your First ADD Project"
- Workshop 2: "Multi-Agent with Windsurf"
- Workshop 3: "ADD Framework Deep Dive"

### Venue Requirements

**Main Hall**: 500 capacity
- Stage: 8m × 6m
- AV: Projector, sound system, livestream setup
- Seating: Theater style

**Breakout Rooms**: 3 rooms × 100 capacity each
- For workshops
- Tables + chairs, classroom style
- Whiteboards

**Networking Area**: 200m²
- Standing tables
- Food + drinks

### Contratos de Proveedores

**Venue Contract**:
```
Venue: Convention Center XYZ
Dates: September 15-16, 2026
Capacity: 500 main + 3×100 breakout
Included: AV equipment, WiFi, tables, chairs
Cost: $15,000 for 2 days
Deposit: $5,000 (non-refundable)
```

**Catering Contract**:
```
Provider: Catering Co.
Service: Breakfast, lunch, snacks, reception
Quantity: 500 people × 2 days
Menu: Continental breakfast, buffet lunch, hors d'oeuvres
Cost: $50/person/day = $50,000 total
```

**AV/Streaming Contract**:
```
Provider: TechAV Inc.
Services: Livestream, recording, slides management
Equipment: 3 cameras, switcher, streaming setup
Cost: $8,000
```
```

---

## 🛠️ Herramientas Recomendadas

### Diseño de Arquitectura
- **Miro**: Diagramas colaborativos
- **Excalidraw**: Diagramas rápidos
- **Lucidchart**: Diagramas profesionales
- **Draw.io**: Gratis, open source
- **Structurizr**: Architecture as code (C4 model)

### Diseño de UI/UX
- **Figma**: Diseño colaborativo (preferido)
- **Adobe XD**: Alternativa
- **Sketch**: Mac only
- **InVision**: Prototyping

### Documentación
- **Notion**: Docs colaborativos modernos
- **Confluence**: Enterprise
- **GitBook**: Docs como código
- **MkDocs**: Static site para docs

### Diagramas
- **PlantUML**: Diagramas as code
- **Mermaid**: Diagramas en markdown
- **dbdiagram.io**: Database schemas

---

## 👥 Multi-Agente en DESIGN

### Estrategia Recomendada: **Collaborative + Review**

**Setup con 3 Agentes**:

**Agente 1: Architect**
- Diseña arquitectura general
- Define componentes principales
- Output: architecture.md

**Agente 2: Contract Designer**
- Define todos los contratos/interfaces
- Escribe `interfaces.md` completo
- Genera mocks
- Output: interfaces.md

**Agente 3: Reviewer**
- Revisa diseño de Architect
- Valida contratos de Contract Designer
- Identifica inconsistencias
- Output: feedback + approval

**Coordinación**:
```
Día 1-2: Architect diseña arquitectura
Día 3: Reviewer valida arquitectura
Día 4-5: Contract Designer escribe contratos
Día 6: Reviewer valida contratos
Día 7: Architect + Contract Designer ajustan basado en feedback
Día 8: Review final + approval
```

**Branching**:
```bash
git checkout -b feature/v0.2.x-design

# Agente 1
git commit -m "design(architecture): define system architecture"

# Agente 2
git pull
git commit -m "design(contracts): define all API and component contracts"

# Agente 3
git pull
# Reviews, comments, requests changes
git commit -m "design(review): incorporate feedback and finalize design"

git tag v0.2.9
```

---

## 📚 Recursos

- **"Software Architecture Patterns"** - Mark Richards
- **"Designing Data-Intensive Applications"** - Martin Kleppmann
- **"Domain-Driven Design"** - Eric Evans
- **"The Design of Everyday Things"** - Don Norman (para productos físicos/UI)

---

## ✅ Checklist Final

### Documentación
- [ ] `docs/design.md` completo
- [ ] `docs/architecture.md` con diagramas
- [ ] `docs/interfaces.md` con TODOS los contratos ⚠️ CRÍTICO
- [ ] `docs/prototypes.md` (si aplica)
- [ ] `docs/visual-design.md` (si UI)
- [ ] Diagramas en `docs/diagrams/`
- [ ] ADRs adicionales en `docs/decisions.md`

### Validación
- [ ] Arquitectura revisada por Tech Lead
- [ ] Contratos completos y detallados
- [ ] Todos los componentes tienen contratos
- [ ] Mocks generados para desarrollo paralelo
- [ ] Prototipos validados (si aplica)
- [ ] Stakeholders han aprobado

### Preparación para BUILD
- [ ] BUILD puede comenzar con contratos claros
- [ ] Agentes saben qué implementar
- [ ] No hay ambigüedades en interfaces
- [ ] Test cases de ejemplo incluidos

### Git
- [ ] Branch `feature/v0.2.x-design`
- [ ] Tag `v0.2.9`
- [ ] Ready to merge o merged

---

**Versión**: 2.0.0
**Fase**: DESIGN (v0.2.x)
**Última actualización**: 2026-01-06
**Próxima fase**: PREPARE (v0.3.x)

**🔑 Key Takeaway**: Un buen DESIGN con contratos claros = BUILD paralelo sin caos.
