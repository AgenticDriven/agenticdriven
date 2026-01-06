# Fase 3: SETUP (v0.3.x)

**Preparar y configurar herramientas, recursos y entorno**

---

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Versión** | v0.3.x |
| **Fase** | SETUP |
| **Duración típica** | 5-10% del proyecto total |
| **Agentes** | 1-2 (DevOps, Setup Engineer) |
| **Coordinación** | Sequential |
| **Objetivo** | Todo listo para BUILD |

---

## 🎯 Propósito

SETUP configura el entorno para que BUILD sea fluido. Incluye:
- Instalación de herramientas
- Configuración de entorno de desarrollo
- Setup de CI/CD
- Framework de testing
- Procesos y workflows
- Validación de que todo funciona

---

## 🎪 Actividades Principales

### 1. Setup de Entorno de Desarrollo

#### Software Projects

```bash
# setup.sh

#!/bin/bash

echo "Setting up TaskFlow development environment..."

# Check prerequisites
command -v node >/dev/null 2>&1 || { echo "Node.js required"; exit 1; }
command -v git >/dev/null 2>&1 || { echo "Git required"; exit 1; }

# Clone repo
git clone https://github.com/org/taskflow
cd taskflow

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
echo "Edit .env with your configuration"

# Setup database
docker-compose up -d postgres
npx prisma migrate dev

# Verify setup
npm run lint
npm test

echo "✅ Environment ready!"
echo "Run 'npm run dev' to start development server"
```

**Entregable**: `docs/setup.md`
```markdown
# Development Setup Guide

## Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker (optional, for local DB)

## Installation

1. Clone repository:
   ```bash
   git clone https://github.com/org/taskflow
   cd taskflow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment:
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

4. Setup database:
   ```bash
   docker-compose up -d
   npx prisma migrate dev
   ```

5. Run tests:
   ```bash
   npm test
   ```

6. Start dev server:
   ```bash
   npm run dev
   ```

## Verification

All checks passing:
- ✅ `npm run lint` passes
- ✅ `npm test` all tests green
- ✅ Server starts on http://localhost:3000
- ✅ Database connection works

## Troubleshooting

### Port 3000 already in use
```bash
kill $(lsof -t -i:3000)
```

### Database connection fails
Check Docker:
```bash
docker-compose ps
docker-compose logs postgres
```
```

---

### 2. CI/CD Pipeline Setup

```yaml
# .github/workflows/ci.yml

name: CI

on:
  push:
    branches: [main, develop, feature/**]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test

      - name: Build
        run: npm run build

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/coverage-final.json

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run security audit
        run: npm audit --audit-level=high

  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    needs: [test, security]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to staging
        run: |
          echo "Deploying to staging..."
          # Deploy logic here
```

---

### 3. Testing Framework Setup

```typescript
// jest.config.ts

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
};

export default config;
```

```typescript
// tests/setup.ts

import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

beforeAll(async () => {
  prisma = new PrismaClient();
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

afterEach(async () => {
  // Clean up database after each test
  const tables = await prisma.$queryRaw`
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public'
  `;

  for (const { tablename } of tables) {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "${tablename}" CASCADE;`
    );
  }
});

global.prisma = prisma;
```

---

### 4. Validation Criteria Definition

```markdown
# docs/validation-criteria.md

## Validation Criteria for TaskFlow

### Functional Tests

#### User Authentication
- [ ] User can register with email + password
- [ ] User receives confirmation email
- [ ] User can login with credentials
- [ ] Invalid credentials are rejected
- [ ] Password reset works
- [ ] JWT tokens are issued correctly

#### Task Management
- [ ] User can create task
- [ ] User can view their tasks
- [ ] User can update task
- [ ] User can complete task
- [ ] User can delete task
- [ ] Tasks are filtered correctly

### Non-Functional Tests

#### Performance
- [ ] API response time < 200ms (p95)
- [ ] Page load time < 2s
- [ ] Supports 100 concurrent users (load test)

#### Security
- [ ] Passwords are hashed (bcrypt)
- [ ] HTTPS enforced
- [ ] SQL injection tests pass
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented

#### Reliability
- [ ] 99% uptime in staging
- [ ] Graceful error handling
- [ ] Database transactions rollback on error

### Code Quality

- [ ] Linter passes (no errors)
- [ ] Type check passes (TypeScript)
- [ ] Test coverage > 80%
- [ ] No critical Sonar issues
- [ ] Dependencies up to date (no vulnerabilities)

### Browser/Device Compatibility

- [ ] Chrome (latest 2 versions)
- [ ] Firefox (latest 2 versions)
- [ ] Safari (latest 2 versions)
- [ ] Mobile responsive (iOS/Android)

### Acceptance Criteria by Stakeholder

**Product Owner**:
- [ ] All MUST HAVE features work
- [ ] UX matches approved designs

**Tech Lead**:
- [ ] Code quality standards met
- [ ] Architecture implemented as designed
- [ ] Documentation complete

**Security**:
- [ ] Security audit passed
- [ ] Penetration test passed
```

---

## 📦 Entregables de PREPARE

```
/
├── .github/workflows/        ← CI/CD configurations
│   ├── ci.yml
│   └── deploy.yml
├── docs/
│   ├── setup.md             ← Setup instructions
│   ├── validation-criteria.md ← How to validate
│   └── processes.md         ← Workflows and processes
├── scripts/
│   ├── setup.sh             ← Setup script
│   └── seed-db.sh           ← Database seeding
├── tests/
│   ├── setup.ts             ← Test setup
│   └── fixtures/            ← Test data
├── .env.example             ← Environment template
├── docker-compose.yml       ← Local services
├── jest.config.ts           ← Test configuration
└── package.json             ← With all scripts defined
```

---

## ✅ Criterios de Salida

### Criterio 1: Environment Works for All Team
- [ ] Setup docs are clear and complete
- [ ] Every team member can run project locally
- [ ] All dependencies install successfully
- [ ] Database seeds successfully
- [ ] Dev server starts without errors

**Test**: Ask a new team member to set up. Should take < 30 minutes.

---

### Criterio 2: CI/CD Pipeline Functional
- [ ] CI pipeline runs on every commit
- [ ] All checks pass (lint, test, build)
- [ ] Deploy to staging works
- [ ] Rollback process documented

**Test**: Make a commit, verify pipeline runs and passes.

---

### Criterio 3: Testing Framework Ready
- [ ] Test framework configured
- [ ] Can run unit tests
- [ ] Can run integration tests
- [ ] Coverage reports generated
- [ ] Test fixtures/mocks available

**Test**: Run `npm test`, all infrastructure tests pass.

---

### Criterio 4: Validation Criteria Defined
- [ ] Clear checklist of what to validate in VALIDATE phase
- [ ] Acceptance criteria by stakeholder
- [ ] Performance benchmarks defined
- [ ] Security requirements listed

**Test**: Product Owner approves validation-criteria.md

---

### Criterio 5: Processes Documented
- [ ] Git workflow documented
- [ ] Code review process defined
- [ ] Release process defined
- [ ] Incident response process defined

**Test**: Team understands and agrees on all processes.

---

## 🚨 Errores Comunes

### ❌ Error 1: "Works on My Machine"

**Problema**: Setup sólo funciona para quien lo configuró.

**Solución**:
- Docker para servicios (database, redis, etc.)
- Scripts de setup automatizados
- `.env.example` con todas las variables
- Documentación paso a paso

---

### ❌ Error 2: CI/CD Como Afterthought

**Problema**: "Lo configuramos después" → nunca se configura bien.

**Solución**: CI/CD en PREPARE, no en BUILD.

---

### ❌ Error 3: No Definir Validation Criteria

**Problema**: En VALIDATE nadie sabe qué validar exactamente.

**Solución**: Escribir `validation-criteria.md` ahora con Product Owner.

---

## 🎨 Ejemplos por Dominio

### Software: TaskFlow (cubierto arriba)

### Libro: ADD 2.0

```markdown
# docs/writing-setup.md

## Writing Environment Setup

### Tools
- **Writing**: Google Docs (draft), Markdown (final)
- **Code examples**: VSCode + GitHub repos
- **Diagrams**: Excalidraw
- **Version control**: Git

### Repository Structure
```
add-book/
├── chapters/
│   ├── 01-introduction.md
│   ├── 02-phases.md
│   └── ...
├── code-examples/
│   ├── chapter-01/
│   └── ...
├── images/
│   ├── diagrams/
│   └── screenshots/
└── scripts/
    ├── generate-pdf.sh
    └── validate-links.sh
```

### Writing Process
1. Draft in Google Docs (collaborative editing)
2. Convert to Markdown
3. Add code examples (tested, runnable)
4. Generate diagrams
5. Review by editor
6. Commit to Git

### Validation Criteria
- [ ] All code examples are tested and work
- [ ] All internal links are valid
- [ ] Images are high-resolution
- [ ] Grammar check passes
- [ ] Technical review done
```

---

### Marketing: Campaign Launch

```markdown
# docs/campaign-setup.md

## Campaign Setup

### Tools Setup
- **Landing page**: Webflow (design + hosting)
- **Email**: Mailchimp
- **Analytics**: Google Analytics 4
- **Ads**: LinkedIn Campaign Manager
- **CRM**: HubSpot
- **Calendar**: Asana (timeline)

### Asset Templates
- Blog post template (1500 words)
- Email template (HTML)
- Social media templates (LinkedIn, Twitter)
- Ad creative specifications

### Approval Process
1. Draft copy
2. Design mockup
3. Stakeholder review
4. Revision
5. Final approval
6. Schedule publish

### Validation Checklist
- [ ] Landing page loads < 2s
- [ ] Forms submit correctly
- [ ] Analytics tracking works
- [ ] Emails send to test list
- [ ] Ads display correctly
- [ ] All links work
```

---

### Product: Ergonomic Keyboard

```markdown
# docs/manufacturing-setup.md

## Manufacturing Setup

### Supplier Agreements
- [ ] PCB fabrication contract signed
- [ ] Assembly house contract signed
- [ ] Component suppliers confirmed
- [ ] Logistics partner contracted
- [ ] Quality control process defined

### Tooling Setup
- [ ] Injection mold designed
- [ ] Mold fabricated and tested
- [ ] First article inspection passed
- [ ] Production line configured
- [ ] Testing jigs created

### Quality Control
- [ ] Visual inspection checklist
- [ ] Functional test procedure
- [ ] Packaging inspection
- [ ] Sample testing (1 per 100 units)

### Validation Criteria
- [ ] First production run (100 units) passes QC
- [ ] Defect rate < 2%
- [ ] Assembly time < 15 min/unit
- [ ] Cost per unit within budget
```

---

### Event: ADD Conference

```markdown
# docs/event-setup.md

## Event Logistics Setup

### Venue Confirmed
- [ ] Contract signed
- [ ] Deposit paid
- [ ] Floor plan approved
- [ ] AV equipment tested
- [ ] WiFi capacity verified

### Registration System
- [ ] Eventbrite setup
- [ ] Ticketing configured
- [ ] Email confirmations automated
- [ ] Badge printing integrated
- [ ] Check-in app ready

### Speaker Management
- [ ] Speaker agreements signed
- [ ] Travel arrangements confirmed
- [ ] Hotel bookings done
- [ ] Presentation templates sent
- [ ] Rehearsal scheduled

### Promotion Setup
- [ ] Event website live
- [ ] Social media accounts ready
- [ ] Email campaigns scheduled
- [ ] Ads configured (LinkedIn, Twitter)
- [ ] PR contacts list prepared

### Validation Checklist
- [ ] Mock event walkthrough done
- [ ] Registration flow tested
- [ ] AV equipment tested end-to-end
- [ ] Backup plans documented
- [ ] Emergency contacts list created
```

---

## 🛠️ Herramientas Recomendadas

### Development Environment
- **Docker**: Local services
- **Docker Compose**: Multi-container setup
- **nvm/pyenv**: Version managers
- **VSCode/Cursor**: IDE with extensions

### CI/CD
- **GitHub Actions**: Simple, integrated
- **GitLab CI**: Self-hosted option
- **Jenkins**: Enterprise, customizable
- **CircleCI**: Fast, parallelizable

### Testing
- **Jest**: JavaScript/TypeScript
- **Pytest**: Python
- **JUnit**: Java
- **Cypress**: E2E testing
- **Playwright**: E2E modern alternative

### Code Quality
- **ESLint**: Linting
- **Prettier**: Formatting
- **SonarQube**: Code quality metrics
- **Dependabot**: Dependency updates

---

## 👥 Multi-Agente en PREPARE

**Estrategia**: Sequential (one agent usually sufficient)

Si necesitas 2 agentes:

**Agent 1: Infrastructure**
- Docker, CI/CD, deployment
- Output: .github/workflows/, docker-compose.yml

**Agent 2: Testing**
- Test framework, fixtures, validation criteria
- Output: jest.config.ts, tests/setup.ts, validation-criteria.md

---

## ✅ Checklist Final

- [ ] `docs/setup.md` complete
- [ ] `docs/validation-criteria.md` complete
- [ ] CI/CD pipeline working
- [ ] Testing framework configured
- [ ] All team can run project locally
- [ ] Environment variables documented
- [ ] Scripts for common tasks
- [ ] Git workflow defined

---

**Versión**: 2.0.0
**Fase**: PREPARE (v0.3.x)
**Próxima fase**: BUILD (v0.4.x)
