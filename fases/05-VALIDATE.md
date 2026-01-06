# Fase 5: VALIDATE (v0.5.x)

**Validar que la solución funciona correctamente**

---

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Versión** | v0.5.x |
| **Fase** | VALIDATE |
| **Duración típica** | 15-20% del proyecto total |
| **Agentes recomendados** | 2-3 (QA, Security, Performance) |
| **Coordinación** | Collaborative + Parallel |
| **Objetivo principal** | Validación completa y calidad asegurada |
| **Dependencias** | BUILD debe estar completo |

---

## 🎯 Propósito

La fase VALIDATE es donde **aseguras la calidad** antes de lanzar.

**Actividades principales**:
- Testing exhaustivo (unit, integration, E2E)
- Validación de requisitos funcionales y no funcionales
- Security testing
- Performance testing
- User acceptance testing (UAT)
- Bug fixing

**Sin VALIDATE adecuado = bugs en producción = usuarios frustrados**

---

## 🎪 Actividades Principales

### 1. Testing Exhaustivo

#### Test Pyramid

```
        /\
       /  \
      / E2E \         ← Pocos tests, lentos, end-to-end
     /______\
    /        \
   /Integration\     ← Tests de integración entre componentes
  /____________\
 /              \
/  Unit Tests    \   ← Muchos tests, rápidos, funciones individuales
/__________________\
```

**Distribución recomendada**:
- **70%**: Unit tests
- **20%**: Integration tests
- **10%**: E2E tests

#### Ejemplo: Test Suite Completo

**Unit Tests** (src/backend/services/user-service.test.ts):
```typescript
import { UserService } from './user-service';
import { MockDatabase } from '../mocks/database';

describe('UserService', () => {
  let userService: UserService;
  let mockDb: MockDatabase;

  beforeEach(() => {
    mockDb = new MockDatabase();
    userService = new UserService(mockDb);
  });

  describe('create', () => {
    it('creates user with valid data', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123'
      };

      const user = await userService.create(userData);

      expect(user.id).toBeDefined();
      expect(user.name).toBe('John Doe');
      expect(user.email).toBe('john@example.com');
      expect(user.password).not.toBe('SecurePass123'); // Should be hashed
    });

    it('throws error for duplicate email', async () => {
      await userService.create({
        name: 'John',
        email: 'john@example.com',
        password: 'pass123'
      });

      await expect(
        userService.create({
          name: 'Jane',
          email: 'john@example.com',
          password: 'pass456'
        })
      ).rejects.toThrow('Email already exists');
    });

    it('hashes password before storing', async () => {
      const user = await userService.create({
        name: 'John',
        email: 'john@example.com',
        password: 'plaintext'
      });

      // Password should be hashed (bcrypt format)
      expect(user.password).toMatch(/^\$2[aby]\$/);
      expect(user.password).not.toBe('plaintext');
    });
  });

  describe('findByEmail', () => {
    it('returns user when found', async () => {
      const created = await userService.create({
        name: 'John',
        email: 'john@example.com',
        password: 'pass123'
      });

      const found = await userService.findByEmail('john@example.com');

      expect(found).toBeDefined();
      expect(found?.id).toBe(created.id);
    });

    it('returns null when not found', async () => {
      const found = await userService.findByEmail('notfound@example.com');
      expect(found).toBeNull();
    });
  });
});
```

**Integration Tests** (tests/integration/auth-flow.test.ts):
```typescript
import request from 'supertest';
import { app } from '../../src/app';
import { db } from '../../src/db';

describe('Authentication Flow (Integration)', () => {
  beforeEach(async () => {
    await db.users.deleteMany();
  });

  afterAll(async () => {
    await db.$disconnect();
  });

  it('complete registration and login flow', async () => {
    // Step 1: Register
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123'
      });

    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body.id).toBeDefined();

    // Step 2: Login
    const loginResponse = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'john@example.com',
        password: 'SecurePass123'
      });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeDefined();

    const token = loginResponse.body.token;

    // Step 3: Access protected route
    const profileResponse = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(profileResponse.status).toBe(200);
    expect(profileResponse.body.email).toBe('john@example.com');
  });

  it('prevents access with invalid token', async () => {
    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', 'Bearer invalid-token');

    expect(response.status).toBe(401);
  });

  it('validates password strength on registration', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'weak' // Too short
      });

    expect(response.status).toBe(400);
    expect(response.body.details[0].field).toBe('password');
  });
});
```

**E2E Tests** (tests/e2e/user-journey.spec.ts):
```typescript
import { test, expect } from '@playwright/test';

test.describe('User Journey: Sign up to Task Creation', () => {
  test('new user can register, login, and create task', async ({ page }) => {
    const uniqueEmail = `user-${Date.now()}@example.com`;

    // Step 1: Navigate to homepage
    await page.goto('http://localhost:3000');

    // Step 2: Click "Sign up"
    await page.click('text=Sign up');
    await expect(page).toHaveURL(/\/register/);

    // Step 3: Fill registration form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', uniqueEmail);
    await page.fill('input[name="password"]', 'SecurePass123');
    await page.fill('input[name="confirmPassword"]', 'SecurePass123');

    // Step 4: Submit
    await page.click('button[type="submit"]');

    // Step 5: Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/, { timeout: 5000 });
    await expect(page.locator('text=Welcome, Test User')).toBeVisible();

    // Step 6: Create a task
    await page.click('button:has-text("New Task")');
    await page.fill('input[name="title"]', 'My First Task');
    await page.fill('textarea[name="description"]', 'This is a test task');
    await page.selectOption('select[name="priority"]', 'high');
    await page.click('button:has-text("Create Task")');

    // Step 7: Verify task appears in list
    await expect(page.locator('text=My First Task')).toBeVisible();
    await expect(page.locator('text=high')).toBeVisible();

    // Step 8: Logout
    await page.click('button:has-text("Logout")');
    await expect(page).toHaveURL(/\/login/);
  });

  test('shows validation errors for invalid registration', async ({ page }) => {
    await page.goto('http://localhost:3000/register');

    // Try to submit with invalid email
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'SecurePass123');
    await page.click('button[type="submit"]');

    // Should show validation error
    await expect(page.locator('text=Invalid email format')).toBeVisible();
  });
});
```

---

### 2. Validación de Requisitos

**Checklist de requisitos funcionales**:
```markdown
# Validación de Requisitos Funcionales

## RF-001: Autenticación con Email
- [x] Usuario puede registrarse con email + password
- [x] Validación de formato de email
- [x] Confirmación por email enviada
- [x] Usuario puede iniciar sesión
- [x] Recuperación de contraseña funciona
**Status**: ✅ PASS (5/5)

## RF-002: Gestión de Tareas
- [x] Usuario puede crear tarea
- [x] Usuario puede editar tarea
- [x] Usuario puede eliminar tarea
- [x] Usuario puede marcar tarea como completa
- [ ] Usuario puede asignar tarea a otro usuario  ← PENDING
**Status**: ⚠️ PARTIAL (4/5)

## RF-003: Notificaciones
- [ ] Usuario recibe notificación cuando se le asigna tarea
- [ ] Usuario recibe notificación cuando tarea vence
- [x] Usuario puede ver historial de notificaciones
**Status**: ⚠️ PARTIAL (1/3)
```

**Checklist de requisitos no funcionales**:
```markdown
# Validación de Requisitos No Funcionales

## RNF-001: Performance
**Requisito**: Tiempo de respuesta < 200ms para 95% de requests

**Test**:
```bash
# Load test con Artillery
artillery quick --count 100 --num 1000 http://localhost:3000/api/users

# Results:
# p50: 45ms   ✓
# p95: 180ms  ✓
# p99: 350ms  ✗ (requirement: < 200ms)
```

**Status**: ⚠️ PARTIAL
**Action**: Optimize p99 (database query optimization needed)

## RNF-002: Security
**Requisito**: Contraseñas hasheadas (bcrypt)

**Test**:
```sql
SELECT password FROM users LIMIT 1;
-- Result: $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36...
```

**Status**: ✅ PASS

## RNF-003: Disponibilidad
**Requisito**: 99.9% uptime (3 nines)

**Test**:
- Staging uptime (last 7 days): 99.95% ✓
- Health check endpoint: Responding ✓
- Database failover: Tested ✓

**Status**: ✅ PASS
```

---

### 3. Security Testing

#### OWASP Top 10 Checklist

```markdown
# Security Validation (OWASP Top 10)

## A01: Broken Access Control
- [x] Authentication required for protected routes
- [x] User can only access own data
- [x] Admin routes require admin role
- [x] JWT tokens validated properly
**Status**: ✅ PASS

## A02: Cryptographic Failures
- [x] Passwords hashed with bcrypt (salt rounds: 10)
- [x] HTTPS enforced in production
- [x] Sensitive data not in logs
- [x] Environment variables not committed to git
**Status**: ✅ PASS

## A03: Injection
- [x] SQL injection prevented (using ORM with parameterized queries)
- [x] XSS prevented (React escapes by default)
- [x] Command injection prevented (no shell commands with user input)
**Status**: ✅ PASS

## A04: Insecure Design
- [x] Rate limiting implemented (5 req/min per IP)
- [x] CSRF protection enabled
- [x] CORS configured properly
**Status**: ✅ PASS

## A05: Security Misconfiguration
- [x] Debug mode OFF in production
- [x] Default credentials changed
- [x] Error messages don't leak sensitive info
- [x] Security headers set (helmet.js)
**Status**: ✅ PASS

## A06: Vulnerable Components
- [x] npm audit: 0 critical vulnerabilities
- [x] Dependencies up to date
- [x] Regular security updates scheduled
**Status**: ✅ PASS

## A07: Authentication Failures
- [x] Password complexity enforced (min 8 chars)
- [x] Account lockout after 5 failed attempts
- [x] JWT tokens expire (7 days)
- [x] Refresh token rotation implemented
**Status**: ✅ PASS

## A08: Data Integrity Failures
- [x] Input validation on all endpoints
- [x] Data sanitization before storage
- [x] Backup verification (weekly)
**Status**: ✅ PASS

## A09: Logging Failures
- [x] Security events logged (login attempts, etc.)
- [x] Logs stored securely
- [x] Log retention policy (90 days)
**Status**: ✅ PASS

## A10: Server-Side Request Forgery
- [x] No user-controlled URLs fetched
- [x] Whitelist for allowed external services
**Status**: ✅ PASS

**Overall Security**: ✅ 10/10 categories PASS
```

#### Penetration Testing

```bash
# Automated security scan with OWASP ZAP
docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t http://staging.taskflow.com \
  -r security-report.html

# Manual penetration testing checklist
- [x] Attempted SQL injection on all inputs
- [x] Attempted XSS on all text fields
- [x] Attempted authentication bypass
- [x] Attempted CSRF attacks
- [x] Checked for sensitive data exposure
- [x] Verified rate limiting works
```

---

### 4. Performance Testing

#### Load Testing

```javascript
// load-test.js (using k6)

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 },   // Ramp up to 100 users
    { duration: '5m', target: 100 },   // Stay at 100 users
    { duration: '2m', target: 200 },   // Ramp up to 200 users
    { duration: '5m', target: 200 },   // Stay at 200 users
    { duration: '2m', target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],  // 95% of requests < 200ms
    http_req_failed: ['rate<0.01'],    // Error rate < 1%
  },
};

export default function () {
  // Test 1: GET homepage
  let res1 = http.get('https://staging.taskflow.com');
  check(res1, { 'status is 200': (r) => r.status === 200 });

  sleep(1);

  // Test 2: Login
  let res2 = http.post('https://staging.taskflow.com/api/auth/login', {
    email: 'test@example.com',
    password: 'TestPass123',
  });
  check(res2, { 'logged in': (r) => r.status === 200 });

  let token = res2.json('token');

  sleep(1);

  // Test 3: GET user tasks
  let res3 = http.get('https://staging.taskflow.com/api/tasks', {
    headers: { Authorization: `Bearer ${token}` },
  });
  check(res3, { 'got tasks': (r) => r.status === 200 });

  sleep(1);
}
```

**Results**:
```
scenarios: (100.00%) 1 scenario, 200 max VUs, 18m30s max duration
default: 0.00 iters/s

     ✓ status is 200
     ✓ logged in
     ✓ got tasks

     checks.........................: 100.00% ✓ 45000    ✗ 0
     data_received..................: 180 MB  1.5 MB/s
     data_sent......................: 15 MB   125 kB/s
     http_req_blocked...............: avg=1.2ms    min=1µs  med=5µs   max=500ms  p(95)=10µs
     http_req_connecting............: avg=500µs    min=0s   med=0s    max=200ms  p(95)=0s
   ✓ http_req_duration..............: avg=85ms     min=15ms med=75ms  max=1.2s   p(95)=180ms
       { expected_response:true }...: avg=85ms     min=15ms med=75ms  max=1.2s   p(95)=180ms
   ✓ http_req_failed................: 0.00%   ✓ 0        ✗ 45000
     http_req_receiving.............: avg=500µs    min=50µs med=400µs max=50ms   p(95)=1ms
     http_req_sending...............: avg=100µs    min=10µs med=80µs  max=20ms   p(95)=200µs
     http_req_tls_handshaking.......: avg=0s       min=0s   med=0s    max=0s     p(95)=0s
     http_req_waiting...............: avg=84.5ms   min=14ms med=74ms  max=1.19s  p(95)=179ms
     http_reqs......................: 45000   375/s
     iteration_duration.............: avg=3.08s    min=3s   med=3.07s max=4.2s   p(95)=3.18s
     iterations.....................: 15000   125/s
     vus............................: 1       min=1      max=200
     vus_max........................: 200     min=200    max=200

**Performance**: ✅ PASS (p95 < 200ms requirement met)
```

---

### 5. User Acceptance Testing (UAT)

**UAT Plan**:
```markdown
# User Acceptance Testing Plan

## Participants
- 10 beta users (target audience)
- Product Owner
- 1 QA lead

## Duration
- 1 week (2026-01-13 to 2026-01-19)

## Environment
- Staging: staging.taskflow.com
- Each user gets test account

## Test Scenarios

### Scenario 1: New User Onboarding
**Goal**: User can register and create first task

**Steps**:
1. Navigate to homepage
2. Click "Sign up"
3. Complete registration
4. Confirm email
5. Login
6. Create first task

**Success Criteria**:
- [ ] All users complete registration
- [ ] All users create at least 1 task
- [ ] No confusion during onboarding
- [ ] Time to first task < 5 minutes

### Scenario 2: Daily Task Management
**Goal**: User can manage daily tasks effectively

**Steps**:
1. Login
2. View task list
3. Create 3 tasks with different priorities
4. Edit a task
5. Complete a task
6. Delete a task

**Success Criteria**:
- [ ] All operations intuitive
- [ ] No bugs encountered
- [ ] UI responsive
- [ ] Users satisfied with workflow

### Scenario 3: Collaboration
**Goal**: Users can assign tasks to each other

**Steps**:
1. User A creates task
2. User A assigns to User B
3. User B receives notification
4. User B completes task
5. User A sees completion

**Success Criteria**:
- [ ] Assignment works smoothly
- [ ] Notifications received
- [ ] Status updates visible
```

**UAT Results**:
```markdown
# UAT Results (2026-01-19)

## Overall Feedback
- **Participation**: 10/10 users completed testing
- **Satisfaction Score**: 8.5/10 average
- **Would recommend**: 9/10 users

## Bugs Found
1. **[P1] Task creation fails on mobile Safari**
   - Reproducible: Yes
   - Users affected: 3/10
   - Status: CRITICAL, needs fix before launch

2. **[P2] Notification badge doesn't update immediately**
   - Reproducible: Sometimes
   - Users affected: 5/10
   - Status: Should fix, not blocker

3. **[P3] Date picker UI confusing on first use**
   - Reproducible: Yes
   - Users affected: 4/10
   - Status: UX improvement, not blocker

## Feature Requests
1. "Add dark mode" (7 users)
2. "Calendar view for tasks" (5 users)
3. "Recurring tasks" (4 users)

**Decision**: Fix P1 before launch. P2 and P3 go to backlog.
```

---

### 6. Bug Fixing

**Bug Workflow**:
```
Bug Found → Triage → Fix → Test → Verify → Close
```

**Bug Triage Matrix**:
```markdown
| Priority | Severity | Impact | Example | SLA |
|----------|----------|--------|---------|-----|
| P0 | Critical | System down | Production crash | Fix immediately |
| P1 | High | Feature broken | Login doesn't work | Fix within 24h |
| P2 | Medium | Feature degraded | Slow loading | Fix within 3 days |
| P3 | Low | Minor issue | Typo in UI | Fix within 1 week |
| P4 | Trivial | Cosmetic | Button color | Backlog |
```

**Bug Fix Example**:
```typescript
// Bug: Task creation fails on mobile Safari
// Issue: Date picker returns invalid format

// Before (buggy):
const handleDateChange = (date: Date) => {
  setTaskDate(date.toString());  // Safari toString() format incompatible
};

// After (fixed):
const handleDateChange = (date: Date) => {
  // Use ISO format for consistency across browsers
  setTaskDate(date.toISOString());
};

// Test:
describe('Task creation on mobile Safari', () => {
  it('accepts date from Safari date picker', () => {
    const safariDate = new Date('2026-01-20');
    const task = createTask({
      title: 'Test',
      date: safariDate
    });

    expect(task.date).toMatch(/^\d{4}-\d{2}-\d{2}T/); // ISO format
  });
});
```

**Commit**:
```bash
git commit -m "fix(mobile): task creation on Safari

Safari date picker returns incompatible format.
Changed to use toISOString() for consistency.

Fixes: #123
Tested on: Safari 17 (iOS 17)
Tests: Added regression test
"
```

---

## 📦 Entregables de VALIDATE

```
tests/
├── unit/
│   ├── backend/
│   │   ├── services/
│   │   └── utils/
│   └── frontend/
│       ├── components/
│       └── hooks/
├── integration/
│   ├── auth-flow.test.ts
│   ├── task-management.test.ts
│   └── notifications.test.ts
├── e2e/
│   ├── user-journey.spec.ts
│   ├── admin-flow.spec.ts
│   └── error-scenarios.spec.ts
├── performance/
│   ├── load-test.js
│   └── stress-test.js
└── security/
    ├── owasp-zap-report.html
    └── penetration-test-report.md

docs/
├── test-results.md               ← Test execution results
├── uat-report.md                 ← User acceptance testing results
├── security-audit.md             ← Security testing report
├── performance-report.md         ← Performance testing results
├── bugs-found.md                 ← List of bugs found + status
└── validation-sign-off.md        ← Stakeholder approval

coverage/
└── lcov-report/                  ← Code coverage report
    └── index.html
```

---

## ✅ Criterios de Salida

### Criterio 1: Test Coverage >= 80%
- [ ] Unit test coverage >= 80%
- [ ] Integration tests cover all happy paths
- [ ] E2E tests cover critical user journeys
- [ ] All tests passing

**Validación**:
```bash
npm run test:coverage
# Coverage: 85% ✓
```

---

### Criterio 2: All P0 and P1 Bugs Fixed
- [ ] No P0 bugs open
- [ ] No P1 bugs open
- [ ] P2 bugs documented (can defer to post-launch)
- [ ] Known issues documented

**Validación**:
```
Bug report:
P0: 0 open ✓
P1: 0 open ✓
P2: 3 open (deferred to v1.1)
```

---

### Criterio 3: Security Validated
- [ ] OWASP Top 10 checklist complete
- [ ] Penetration testing done
- [ ] No critical security vulnerabilities
- [ ] Security audit approved

**Validación**:
```bash
npm audit
# 0 vulnerabilities ✓
```

---

### Criterio 4: Performance Requirements Met
- [ ] Load testing passed
- [ ] Response time < 200ms (p95)
- [ ] Error rate < 1%
- [ ] Can handle target load (10k concurrent users)

**Validación**:
```bash
k6 run load-test.js
# p95 < 200ms ✓
# Error rate: 0.2% ✓
```

---

### Criterio 5: UAT Approved
- [ ] UAT completed with representative users
- [ ] Satisfaction score >= 7/10
- [ ] Critical feedback addressed
- [ ] Product Owner approval

**Validación**:
```
UAT satisfaction: 8.5/10 ✓
Product Owner: Approved ✓
```

---

### Criterio 6: Documentation Complete
- [ ] Test results documented
- [ ] Known issues documented
- [ ] Performance baseline documented
- [ ] Security audit report complete

**Validación**:
```
All validation docs in docs/ ✓
Stakeholder sign-off received ✓
```

---

## 🚨 Errores Comunes

### ❌ Error 1: Solo Unit Tests

**Problema**: Solo escribes unit tests, no integration ni E2E

**Consecuencia**:
```
Unit tests: 100% passing ✓
Integration: Not tested
E2E: Not tested

Deploy to production...
User: "Login doesn't work!"

Reason: Unit tests mocked everything, never tested real integration
```

**Solución**: Test pyramid balanceado (70% unit, 20% integration, 10% E2E)

---

### ❌ Error 2: Testing en Producción

**Problema**: "Testeamos después del deploy"

**Consecuencia**:
```
Deploy to production
Users report bugs
Emergency hotfix
Reputation damage
```

**Solución**: VALIDATE before DELIVER, always.

---

### ❌ Error 3: Ignorar Performance

**Problema**: Solo testeas funcionalidad, no performance

**Consecuencia**:
```
Feature works ✓
But: Takes 5 seconds to load
Users leave
Conversion drops 50%
```

**Solución**: Load testing y performance monitoring desde VALIDATE

---

## 👥 Multi-Agente en VALIDATE

### Estrategia: **Collaborative + Parallel**

**Setup con 3 Agentes**:

**Agente 1: QA Engineer**
- Functional testing
- Regression testing
- UAT coordination

**Agente 2: Security Tester**
- Security audit
- Penetration testing
- Vulnerability scanning

**Agente 3: Performance Engineer**
- Load testing
- Stress testing
- Performance optimization

**Coordinación**:
```
Week 1:
  Day 1-3: All agents test in parallel
  Day 4: Bug triage meeting
  Day 5: Prioritize bug fixes

Week 2:
  Day 1-3: Dev team fixes P0/P1 bugs
  Day 4-5: Regression testing

Week 3:
  Day 1-2: Final validation
  Day 3: Stakeholder sign-off
```

---

## ✅ Checklist Final

### Testing
- [ ] Unit tests: >= 80% coverage
- [ ] Integration tests: All critical paths
- [ ] E2E tests: All user journeys
- [ ] All tests passing

### Requirements
- [ ] All functional requirements validated
- [ ] All non-functional requirements validated
- [ ] Gaps documented

### Security
- [ ] OWASP Top 10 validated
- [ ] Penetration testing complete
- [ ] No critical vulnerabilities
- [ ] Security audit approved

### Performance
- [ ] Load testing complete
- [ ] Performance requirements met
- [ ] Baseline documented

### Bugs
- [ ] P0 bugs: 0
- [ ] P1 bugs: 0
- [ ] P2+ documented

### UAT
- [ ] UAT completed
- [ ] Satisfaction >= 7/10
- [ ] Product Owner approval

### Documentation
- [ ] Test results documented
- [ ] Known issues documented
- [ ] Stakeholder sign-off received

### Git
- [ ] Branch `feature/v0.5.x-validation`
- [ ] Tag `v0.5.9`
- [ ] Ready for DELIVER

---

**Versión**: 2.0.0
**Fase**: VALIDATE (v0.5.x)
**Última actualización**: 2026-01-06
**Próxima fase**: DELIVER (v0.6.x)

**🔑 Key Takeaway**: Quality is not an afterthought. Validate exhaustively before delivering.
