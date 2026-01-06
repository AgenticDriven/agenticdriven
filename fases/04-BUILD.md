# Fase 4: BUILD (v0.4.x)

**Implementar la solución siguiendo los contratos**

---

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Versión** | v0.4.x |
| **Fase** | BUILD |
| **Duración típica** | 40-50% del proyecto total |
| **Agentes recomendados** | 2-5+ (Frontend, Backend, DB, Test, etc.) |
| **Coordinación** | **CONTRACT-FIRST** (Parallel) |
| **Objetivo principal** | Implementación completa y contract-compliant |
| **Dependencias** | PREPARE debe estar completo |

---

## 🎯 Propósito

La fase BUILD es donde la **implementación real** ocurre.

**Esto es lo más importante**:
- Implementar siguiendo **contratos EXACTOS** de DESIGN
- Múltiples agentes trabajando **en paralelo**
- Usar **mocks** para dependencias no listas
- **Tests incluidos** desde el principio
- Commits incrementales y específicos

**⚠️ CRÍTICO**: En ADD 2.0, BUILD con multi-agente REQUIERE Contract-First. Sin contratos claros = caos.

---

## 🎪 Actividades Principales

### 1. Contract-First Implementation

**🔴 REGLA DE ORO: Lee el contrato ANTES de implementar**

```markdown
# Workflow para cada feature

## Paso 1: Leer Contrato
- Abre `docs/interfaces.md`
- Encuentra tu contrato (ej: POST /api/users)
- Lee TODA la especificación:
  - Input format
  - Output format
  - Validation rules
  - Error cases
  - Test cases

## Paso 2: Implementar Exactamente
- No improvises
- No agregues campos no especificados
- No cambies tipos de datos
- Sigue validaciones al pie de la letra

## Paso 3: Validar Compliance
- Ejecuta test cases del contrato
- Verifica input/output match
- Confirma todos los error cases
- Revisa edge cases

## Paso 4: Commit con Contract Reference
git commit -m "build(api): implement POST /api/users

Contract: docs/interfaces.md#POST-api-users
- Input validation: name (1-100), email (valid), password (min 8)
- Output: {id, name, email, created_at}
- Errors: 400 (validation), 409 (duplicate), 500 (server)
- Tests: 5/5 passing

Contract Compliance: ✓ Yes
"
```

---

### 2. Multi-Agent Parallel Work

**Estrategia recomendada**: Parallel con Contract-First

#### Setup: 3 Agentes en Paralelo

**Agente 1: Backend Developer**
```yaml
name: Backend Agent
responsibility: Implement all API endpoints
context:
  - src/backend/
  - docs/interfaces.md
  - tests/backend/
branch: feature/v0.4.x-backend
contracts:
  - POST /api/users
  - GET /api/users/:id
  - PUT /api/users/:id
  - DELETE /api/users/:id
  - POST /api/auth/login
  - POST /api/auth/register
```

**Agente 2: Frontend Developer**
```yaml
name: Frontend Agent
responsibility: Implement all UI components
context:
  - src/frontend/
  - docs/interfaces.md
  - mocks/api-mock.ts
branch: feature/v0.4.x-frontend
contracts:
  - LoginForm component
  - UserList component
  - UserDetail component
  - CreateUserModal component
uses_mocks: true  # Uses mocks until backend ready
```

**Agente 3: Test Engineer**
```yaml
name: Test Agent
responsibility: Integration and E2E tests
context:
  - tests/integration/
  - tests/e2e/
  - docs/interfaces.md
branch: feature/v0.4.x-tests
contracts:
  - All API endpoints
  - All UI flows
waits_for:
  - Backend: For API implementation
  - Frontend: For UI implementation
```

#### Coordinación Timeline

```
Week 1:
  Day 1-2: Backend Agent implements API endpoints (with contract tests)
  Day 1-2: Frontend Agent implements UI (with mocks)
  Day 3: Backend commits, pushes to feature/v0.4.x-backend
  Day 3: Frontend Agent replaces mocks with real API client
  Day 4-5: Test Agent writes integration tests

Week 2:
  Day 1: All agents merge to feature/v0.4.x
  Day 2: Integration testing
  Day 3-4: Fix integration issues
  Day 5: Merge to main, tag v0.4.9
```

---

### 3. Implementation Examples

#### Ejemplo 1: Backend API Endpoint (Contract-Compliant)

**Contrato (de docs/interfaces.md)**:
```typescript
// POST /api/users
interface CreateUserRequest {
  name: string;      // Required, 1-100 chars
  email: string;     // Required, valid email
  password: string;  // Required, min 8 chars
}

interface CreateUserResponse {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

// Errors:
// - 400: Validation error
// - 409: Email already exists
// - 500: Server error
```

**Implementación (contract-compliant)**:
```typescript
// src/backend/routes/users.ts

import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { UserService } from '../services/user-service';

const router = Router();
const userService = new UserService();

/**
 * POST /api/users
 *
 * Contract: docs/interfaces.md#POST-api-users
 * Input: {name, email, password}
 * Output: {id, name, email, created_at}
 * Errors: 400, 409, 500
 */
router.post(
  '/users',
  // Validation (from contract)
  body('name')
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Name must be 1-100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Must be valid email'),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),

  async (req, res) => {
    try {
      // Validation error handling (contract: 400)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'validation_error',
          details: errors.array().map(err => ({
            field: err.param,
            message: err.msg
          }))
        });
      }

      const { name, email, password } = req.body;

      // Check duplicate (contract: 409)
      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          error: 'email_already_exists'
        });
      }

      // Create user
      const user = await userService.create({ name, email, password });

      // Response (contract: 201 with specific fields)
      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at.toISOString()
        // Note: password NOT included (security + contract)
      });

    } catch (error) {
      // Server error (contract: 500)
      console.error('Error creating user:', error);
      return res.status(500).json({
        error: 'internal_server_error'
      });
    }
  }
);

export default router;
```

**Tests (from contract test cases)**:
```typescript
// tests/backend/users.test.ts

import request from 'supertest';
import { app } from '../src/app';
import { db } from '../src/db';

describe('POST /api/users (Contract Compliance)', () => {
  beforeEach(async () => {
    await db.users.deleteMany();
  });

  // Test case from contract
  it('creates user with valid data', async () => {
    const response = await request(app)
      .post('/api/users')
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

  // Test case from contract
  it('rejects invalid email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'invalid-email',
        password: 'SecurePass123'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('validation_error');
    expect(response.body.details[0].field).toBe('email');
  });

  // Test case from contract
  it('rejects duplicate email', async () => {
    // First registration
    await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'SecurePass123'
      });

    // Second registration with same email
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'Jane Doe',
        email: 'john@example.com',
        password: 'AnotherPass123'
      });

    expect(response.status).toBe(409);
    expect(response.body.error).toBe('email_already_exists');
  });

  // Test case from contract
  it('rejects short password', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'short'
      });

    expect(response.status).toBe(400);
    expect(response.body.details[0].field).toBe('password');
  });

  // Test case from contract
  it('rejects name too long', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'A'.repeat(101),
        email: 'john@example.com',
        password: 'SecurePass123'
      });

    expect(response.status).toBe(400);
    expect(response.body.details[0].field).toBe('name');
  });
});
```

---

#### Ejemplo 2: Frontend Component (Contract-Compliant con Mock)

**Contrato (de docs/interfaces.md)**:
```typescript
// LoginForm Component Contract
interface LoginFormProps {
  onSubmit: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;

  loading?: boolean;          // Optional, default: false
  error?: string | null;      // Optional, error message
  onForgotPassword?: () => void;
}

// Validation Rules:
// - Email: Required, valid email format
// - Password: Required, min 1 char (server validates)
```

**Mock (para desarrollo paralelo)**:
```typescript
// src/frontend/mocks/api-mock.ts

export const mockAPI = {
  auth: {
    login: async (credentials: { email: string; password: string }) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock validation
      if (!credentials.email.includes('@')) {
        throw new Error('Invalid email');
      }

      // Mock success response (matching contract)
      return {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 'mock-user-id',
          name: 'Mock User',
          email: credentials.email
        }
      };
    }
  }
};
```

**Implementación (contract-compliant)**:
```typescript
// src/frontend/components/LoginForm.tsx

import React, { useState } from 'react';

/**
 * LoginForm Component
 *
 * Contract: docs/interfaces.md#LoginForm
 * Props: {onSubmit, loading?, error?, onForgotPassword?}
 * Validation: email (required, valid), password (required)
 */
interface LoginFormProps {
  onSubmit: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  onForgotPassword?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
  error = null,
  onForgotPassword
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Client-side validation (per contract)
  const validate = (): boolean => {
    const errors: { email?: string; password?: string } = {};

    // Email validation (contract: required, valid format)
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email format';
    }

    // Password validation (contract: required, min 1 char)
    if (!password) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    // Call parent onSubmit (per contract)
    await onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>

      {/* Server error display (from props.error) */}
      {error && (
        <div className="error-banner" role="alert">
          {error}
        </div>
      )}

      {/* Email field */}
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          aria-invalid={!!validationErrors.email}
          aria-describedby={validationErrors.email ? 'email-error' : undefined}
        />
        {validationErrors.email && (
          <span id="email-error" className="error-text" role="alert">
            {validationErrors.email}
          </span>
        )}
      </div>

      {/* Password field */}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          aria-invalid={!!validationErrors.password}
          aria-describedby={validationErrors.password ? 'password-error' : undefined}
        />
        {validationErrors.password && (
          <span id="password-error" className="error-text" role="alert">
            {validationErrors.password}
          </span>
        )}
      </div>

      {/* Forgot password link (optional per contract) */}
      {onForgotPassword && (
        <button
          type="button"
          className="link-button"
          onClick={onForgotPassword}
          disabled={loading}
        >
          Forgot password?
        </button>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="submit-button"
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};
```

**Tests (contract-compliant)**:
```typescript
// tests/frontend/LoginForm.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../../src/components/LoginForm';

describe('LoginForm (Contract Compliance)', () => {
  // Test case from contract
  it('renders with required props', () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  // Test case from contract
  it('validates email format', async () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'invalid-email' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeInTheDocument();
    });
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  // Test case from contract
  it('calls onSubmit with credentials when valid', async () => {
    const mockSubmit = jest.fn().mockResolvedValue(undefined);
    render(<LoginForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' }
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' }
    });
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: 'john@example.com',
        password: 'password123'
      });
    });
  });

  // Test case from contract
  it('shows loading state when loading prop is true', () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} loading={true} />);

    expect(screen.getByRole('button', { name: 'Logging in...' })).toBeDisabled();
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByLabelText('Password')).toBeDisabled();
  });

  // Test case from contract
  it('displays error message when error prop is provided', () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} error="Invalid credentials" />);

    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  // Test case from contract (optional prop)
  it('shows forgot password link when callback provided', () => {
    const mockSubmit = jest.fn();
    const mockForgotPassword = jest.fn();
    render(
      <LoginForm
        onSubmit={mockSubmit}
        onForgotPassword={mockForgotPassword}
      />
    );

    const forgotLink = screen.getByRole('button', { name: 'Forgot password?' });
    expect(forgotLink).toBeInTheDocument();

    fireEvent.click(forgotLink);
    expect(mockForgotPassword).toHaveBeenCalled();
  });
});
```

**Uso con Mock (mientras backend no está listo)**:
```typescript
// src/frontend/pages/LoginPage.tsx

import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { mockAPI } from '../mocks/api-mock';  // Using mock during parallel development

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with real API when backend ready
      const response = await mockAPI.auth.login(credentials);

      // Store token
      localStorage.setItem('auth_token', response.token);

      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </div>
  );
};
```

**Luego, cuando backend está listo**:
```typescript
// src/frontend/pages/LoginPage.tsx

import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
// import { mockAPI } from '../mocks/api-mock';  // Remove mock
import { apiClient } from '../api/client';       // Use real API

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      // Real API call (contract-compliant)
      const response = await apiClient.auth.login(credentials);

      localStorage.setItem('auth_token', response.token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <LoginForm
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </div>
  );
};
```

---

### 4. Integration Strategy

**Cuándo integrar frontend + backend**:

```markdown
## Integration Workflow

### Fase 1: Implementación Paralela (Week 1)
- Backend: Implementa APIs + tests
- Frontend: Implementa UI + tests con mocks
- No integration yet

### Fase 2: Backend Ready (Week 1, Day 3)
Backend commits:
```bash
git add src/backend/
git add tests/backend/
git commit -m "build(api): all user endpoints implemented

Endpoints:
- POST /api/users (create)
- GET /api/users/:id (read)
- PUT /api/users/:id (update)
- DELETE /api/users/:id (delete)

Contract Compliance: ✓ Yes
Tests: 20/20 passing
Coverage: 95%
"
git push origin feature/v0.4.x-backend
```

### Fase 3: Frontend Integration (Week 1, Day 4)
Frontend pulls backend changes:
```bash
git pull origin feature/v0.4.x-backend

# Replace mocks with real API
# Update: src/frontend/api/client.ts
# Remove: src/frontend/mocks/api-mock.ts
```

Frontend commits:
```bash
git commit -m "build(frontend): integrate real API, remove mocks

Changes:
- Replace mockAPI with apiClient in all pages
- Remove api-mock.ts
- Update error handling for real API responses

Integration Tests: 15/15 passing
"
git push origin feature/v0.4.x-frontend
```

### Fase 4: Merge & Integration Tests (Week 2, Day 1)
```bash
git checkout feature/v0.4.x
git merge feature/v0.4.x-backend
git merge feature/v0.4.x-frontend

# Run full integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

### Fase 5: Fix Integration Issues (Week 2, Day 2-3)
- Any issues found in integration
- Frontend/Backend adjust as needed
- Tests must pass

### Fase 6: Ready for VALIDATE (Week 2, Day 5)
```bash
git checkout main
git merge feature/v0.4.x
git tag v0.4.9

# Push to staging
git push origin main --tags
```
```

---

### 5. Commit Strategy

**Commits incrementales y específicos**

#### ❌ MAL: Commit monolítico
```bash
git add .
git commit -m "build: implemented everything"

# Problema:
# - No sabes qué se implementó
# - No puedes revert parcial
# - No hay trazabilidad
# - No sabes si es contract-compliant
```

#### ✅ BIEN: Commits incrementales
```bash
# Commit 1: POST /api/users
git add src/backend/routes/users.ts
git add tests/backend/users.test.ts
git commit -m "build(api): implement POST /api/users endpoint

Contract: docs/interfaces.md#POST-api-users
Input: {name, email, password}
Output: {id, name, email, created_at}
Validation: name (1-100), email (valid), password (min 8)
Errors: 400, 409, 500

Contract Compliance: ✓ Yes
Tests: 5/5 passing
"

# Commit 2: GET /api/users/:id
git add src/backend/routes/users.ts
git add tests/backend/users.test.ts
git commit -m "build(api): implement GET /api/users/:id endpoint

Contract: docs/interfaces.md#GET-api-users-id
Input: id (UUID)
Output: {id, name, email, created_at}
Errors: 404, 500

Contract Compliance: ✓ Yes
Tests: 3/3 passing
"

# Commit 3: LoginForm component
git add src/frontend/components/LoginForm.tsx
git add tests/frontend/LoginForm.test.tsx
git commit -m "build(frontend): implement LoginForm component

Contract: docs/interfaces.md#LoginForm
Props: {onSubmit, loading?, error?, onForgotPassword?}
Validation: email (required, valid), password (required)

Contract Compliance: ✓ Yes
Tests: 6/6 passing
Using: Mock API (backend not ready yet)
"
```

---

### 6. Contract Validation

**Cómo validar que tu implementación sigue el contrato**

#### Validation Checklist

```markdown
## Contract Compliance Checklist

### ✅ Input Validation
- [ ] All required fields validated
- [ ] Field types match contract
- [ ] Min/max lengths enforced
- [ ] Format validations implemented (email, date, etc.)
- [ ] Custom validations from contract

### ✅ Output Format
- [ ] Response structure matches contract exactly
- [ ] All required fields present
- [ ] No extra fields (unless contract allows)
- [ ] Field types match contract
- [ ] Date formats (ISO 8601 if specified)

### ✅ Error Handling
- [ ] All error codes from contract implemented
- [ ] Error response format matches contract
- [ ] Error messages clear and helpful
- [ ] Edge cases covered

### ✅ Business Rules
- [ ] All business rules from contract implemented
- [ ] Constraints enforced (unique email, etc.)
- [ ] Side effects documented

### ✅ Tests
- [ ] All test cases from contract implemented
- [ ] Tests pass
- [ ] Coverage adequate (80%+)
- [ ] Edge cases tested
```

#### Automated Validation Script

```typescript
// scripts/validate-contract-compliance.ts

import { validateContract } from './validators';

async function main() {
  console.log('🔍 Validating contract compliance...\n');

  const results = [];

  // Validate each implemented endpoint
  const endpoints = [
    { method: 'POST', path: '/api/users', implementation: 'src/backend/routes/users.ts' },
    { method: 'GET', path: '/api/users/:id', implementation: 'src/backend/routes/users.ts' },
    // ... more endpoints
  ];

  for (const endpoint of endpoints) {
    const result = await validateContract({
      contract: 'docs/interfaces.md',
      endpoint: `${endpoint.method} ${endpoint.path}`,
      implementation: endpoint.implementation
    });

    results.push(result);

    if (result.compliant) {
      console.log(`✅ ${endpoint.method} ${endpoint.path}: COMPLIANT`);
    } else {
      console.log(`❌ ${endpoint.method} ${endpoint.path}: VIOLATIONS FOUND`);
      result.violations.forEach(v => {
        console.log(`   - ${v.type}: ${v.message}`);
      });
    }
  }

  console.log('\n' + '='.repeat(50));
  const compliantCount = results.filter(r => r.compliant).length;
  console.log(`${compliantCount}/${results.length} endpoints contract-compliant`);

  if (compliantCount < results.length) {
    console.log('\n⚠️  Fix violations before merging to main');
    process.exit(1);
  } else {
    console.log('\n✅ All contracts validated!');
    process.exit(0);
  }
}

main();
```

---

## 📦 Entregables de BUILD

```
src/
├── backend/
│   ├── routes/
│   │   ├── users.ts          ← All user endpoints
│   │   └── auth.ts           ← All auth endpoints
│   ├── services/
│   │   ├── user-service.ts   ← Business logic
│   │   └── auth-service.ts
│   ├── models/
│   │   └── user.ts           ← Data models
│   └── middleware/
│       ├── auth.ts           ← Auth middleware
│       └── validation.ts     ← Validation middleware
├── frontend/
│   ├── components/
│   │   ├── LoginForm.tsx     ← All components
│   │   ├── UserList.tsx
│   │   └── UserDetail.tsx
│   ├── pages/
│   │   ├── LoginPage.tsx     ← All pages
│   │   └── DashboardPage.tsx
│   ├── api/
│   │   └── client.ts         ← API client (contract-based)
│   └── mocks/
│       └── api-mock.ts       ← Mocks (remove after integration)
└── tests/
    ├── backend/
    │   ├── users.test.ts     ← Contract compliance tests
    │   └── auth.test.ts
    ├── frontend/
    │   ├── LoginForm.test.tsx
    │   └── UserList.test.tsx
    └── integration/
        └── user-flow.test.ts  ← Integration tests

docs/
└── journal.md                 ← Updated with BUILD progress
```

---

## ✅ Criterios de Salida

### Criterio 1: Todas las Features Implementadas
- [ ] Todos los endpoints de `docs/interfaces.md` implementados
- [ ] Todos los componentes de `docs/interfaces.md` implementados
- [ ] Todos los modelos de datos implementados
- [ ] Business logic completa

**Validación**:
```
¿Cada contrato tiene implementación correspondiente?
¿Alguna feature quedó pendiente?
```

---

### Criterio 2: Contract Compliance 100%
- [ ] Cada implementación sigue su contrato EXACTAMENTE
- [ ] Input validation matches contract
- [ ] Output format matches contract
- [ ] Error codes match contract
- [ ] Business rules implemented

**Validación**:
```bash
npm run validate:contracts
# All tests must pass
```

---

### Criterio 3: Tests Passing
- [ ] Unit tests: 100% passing
- [ ] Integration tests: 100% passing
- [ ] Contract compliance tests: 100% passing
- [ ] Coverage mínimo: 80%

**Validación**:
```bash
npm test
npm run test:coverage
# Coverage >= 80%
```

---

### Criterio 4: Code Quality
- [ ] Linter passing (no errors)
- [ ] Type checking passing (TypeScript)
- [ ] Code review completado
- [ ] No TODOs críticos pendientes

**Validación**:
```bash
npm run lint
npm run type-check
```

---

### Criterio 5: Integration Successful
- [ ] Frontend + Backend integrados
- [ ] Mocks removidos
- [ ] E2E tests passing
- [ ] Staging deployment exitoso

**Validación**:
```bash
npm run test:e2e
npm run deploy:staging
# Smoke tests on staging
```

---

### Criterio 6: Documentation Updated
- [ ] `docs/journal.md` actualizado
- [ ] ADRs para decisiones importantes durante BUILD
- [ ] Known issues documentados
- [ ] Migration/deployment notes

**Validación**:
```
¿Journal tiene todas las decisiones de BUILD?
¿Problemas encontrados están documentados?
```

---

## 🚨 Errores Comunes

### ❌ Error 1: No Leer el Contrato

**Problema**: Implementas sin leer `docs/interfaces.md`

**Consecuencia**:
```typescript
// Backend implementó:
{
  user_id: "123",         // Contrato dice "id"
  userName: "John",       // Contrato dice "name"
  mail: "john@test.com"   // Contrato dice "email"
}

// Frontend esperaba:
{
  id: "123",
  name: "John",
  email: "john@test.com"
}

// Result: NOTHING WORKS
```

**Solución**: SIEMPRE lee contrato primero. Lee completo. Implementa exacto.

---

### ❌ Error 2: Improvisar Validaciones

**Problema**: Agregas validaciones "por las dudas"

**Malo**:
```typescript
// Contrato dice: password min 8 chars
// Backend implementa: password min 12 chars + must have special char

// Frontend valida: min 8
// Backend rechaza: min 12 + special

// Result: User frustration
```

**Solución**: Implementa EXACTAMENTE las validaciones del contrato. Ni más, ni menos.

---

### ❌ Error 3: No Usar Mocks

**Problema**: Frontend espera a que Backend termine

**Consecuencia**:
```
Week 1:
  Backend: Implementing APIs (busy)
  Frontend: Waiting (idle) ❌

Week 2:
  Backend: Done
  Frontend: Now implementing (busy)
  Backend: Waiting (idle) ❌

Total time: 2 weeks sequential
```

**Solución con Mocks**:
```
Week 1:
  Backend: Implementing APIs (busy) ✅
  Frontend: Implementing UI with mocks (busy) ✅

Week 2:
  Both: Integration + tests

Total time: 1.5 weeks parallel ✅
```

---

### ❌ Error 4: Commits Gigantes

**Problema**: Un commit con todo

```bash
git commit -m "build: implemented all features"

# Changed files: 150
# Lines changed: +15,000 -500
```

**Consecuencia**:
- Imposible de revisar
- Imposible de revert parcialmente
- No trazabilidad
- No sabes qué es contract-compliant

**Solución**: Commits pequeños y frecuentes
```bash
git commit -m "build(api): implement POST /api/users"  # +100 lines
git commit -m "build(api): implement GET /api/users/:id"  # +50 lines
git commit -m "build(frontend): implement LoginForm"  # +150 lines
```

---

### ❌ Error 5: Integration al Final

**Problema**: Integras todo al final del BUILD

**Consecuencia**:
```
Week 1-2: Backend implementation
Week 3-4: Frontend implementation
Week 5: Integration

Integration problems discovered:
- API response format mismatch
- Missing error handling
- Performance issues
- CORS problems

Week 6-7: Fixing integration issues ❌
```

**Solución**: Integrate incrementalmente
```
Day 1: Backend implements POST /api/users
Day 2: Frontend integrates POST /api/users
Day 3: Backend implements GET /api/users/:id
Day 4: Frontend integrates GET
...
Integration problems discovered early ✅
```

---

## 🎨 Ejemplos por Dominio

### Software (SaaS - TaskFlow)

Ya cubierto extensamente arriba.

**Summary**:
- Backend: Express + TypeScript + PostgreSQL
- Frontend: React + TypeScript
- Tests: Jest + Supertest
- Integration: Week 2
- Deployment: Staging on Vercel/Railway

---

### Libro: ADD 2.0

**BUILD para un libro**:

```markdown
# BUILD Phase: Writing the Book

## Contratos (DESIGN phase output)

### Chapter Contract
**Structure**:
- Title (3-8 words)
- Objectives (3-5 bullets)
- Content (20-30 pages)
  - Introduction (2 pages)
  - Concepts (10 pages)
  - Practical example (8 pages)
  - Exercises (3 pages)
  - Summary (2 pages)
- Code examples (runnable)
- Exercises with solutions

## Parallel Writing (3 Agents)

### Agent 1: Content Writer
**Responsibility**: Write chapters 1-6 (Part I)
**Branch**: `feature/v0.4.x-part-1`
**Contract**: Chapter structure from DESIGN
**Output**:
- chapters/01-introduction.md
- chapters/02-phases.md
- ...

### Agent 2: Content Writer
**Responsibility**: Write chapters 7-12 (Part II)
**Branch**: `feature/v0.4.x-part-2`
**Contract**: Chapter structure from DESIGN
**Output**:
- chapters/07-discover.md
- chapters/08-design.md
- ...

### Agent 3: Code Examples Developer
**Responsibility**: Write all code examples
**Branch**: `feature/v0.4.x-code-examples`
**Contract**: Code example specs from DESIGN
**Output**:
- examples/taskflow/
- examples/multi-agent/
- examples/contract-first/

## Implementation Example: Chapter 5

**Contract (from DESIGN)**:
```markdown
## Capítulo 5: DISCOVER - Entender el Problema

**Objetivos**:
- Comprender el propósito de DISCOVER
- Aprender las 6 actividades principales
- Aplicar DISCOVER en proyecto real

**Estructura**:
- Introducción (2 páginas): Por qué DISCOVER es crítico
- Conceptos (10 páginas): 6 actividades detalladas
- Ejemplo práctico (8 páginas): TaskFlow app DISCOVER phase
- Ejercicios (3 páginas): 5 ejercicios con soluciones
- Summary (2 páginas): Key takeaways

**Tono**: Conversacional pero profesional
**Código**: Markdown + code blocks runnable
```

**Implementation (contract-compliant)**:
```markdown
# Capítulo 5: DISCOVER - Entender el Problema

> "Without understanding the problem, you can't build the right solution."

## Objetivos del Capítulo

Al terminar este capítulo, serás capaz de:

- Entender por qué DISCOVER es el fundamento de todo proyecto
- Aplicar las 6 actividades principales de DISCOVER
- Documentar requisitos de forma clara y priorizada
- Identificar y gestionar stakeholders efectivamente
- Crear ADRs para decisiones importantes

---

## Por Qué DISCOVER es Crítico

Imagina esto: Tu equipo pasa 3 meses construyendo una app perfecta...
que nadie usa. ¿Por qué? Porque no entendiste el problema real.

DISCOVER previene esto. Es el **fundamento** de todo proyecto.

### El Costo de Saltar DISCOVER

[... 2 páginas de introducción ...]

---

## Las 6 Actividades Principales

### 1. Investigación del Problema

El primer paso es **entender profundamente** el problema.

**Preguntas clave**:
- ¿Qué problema estamos resolviendo?
- ¿Para quién?
- ¿Por qué es importante?

[... 10 páginas de conceptos ...]

---

## Ejemplo Práctico: TaskFlow App

Veamos cómo aplicar DISCOVER a un proyecto real.

**Contexto**: Estamos construyendo TaskFlow, una app de gestión de tareas.

### Investigación

```markdown
# Discovery: TaskFlow

## Problema
Equipos pierden 2.5h/día en emails sobre status de tareas

## Investigación de Mercado
- 67% de workers se sienten overwhelmed por comunicación
- Soluciones existentes:
  - Asana: $10/usuario/mes, completo pero caro
  - Trello: Gratis pero muy básico

[...]
```

[... 8 páginas de ejemplo práctico ...]

---

## Ejercicios

### Ejercicio 1: Problem Statement

**Contexto**: Tu startup quiere crear una app de budgeting.

**Tarea**: Escribe el problem statement en 2-3 frases.

**Tu respuesta**:
[Espacio para que el lector escriba]

**Solución**:
```markdown
## Problem Statement: BudgetApp

Personas ganan entre $30k-80k/año pero no saben a dónde va su dinero.
Gastan impulsivamente y llegan con deudas a fin de mes.
Apps existentes son demasiado complejas (requieren contabilidad)
o muy simples (solo tracking sin insights).
```

[... 3 páginas de ejercicios con soluciones ...]

---

## Key Takeaways

1. DISCOVER es 10-20% del tiempo pero determina 80% del éxito
2. Sin stakeholder alignment, tu proyecto fallará
3. Requirements vagos = implementación caótica
4. ADRs previenen "¿por qué hicimos esto?" en el futuro
5. Viabilidad técnica + económica + operativa = proyecto viable

[... 2 páginas de summary ...]
```

**Tests para este capítulo**:
```bash
# Validation checklist
- [ ] 25 páginas ± 2
- [ ] 5 objetivos cubiertos
- [ ] Ejemplo práctico completo
- [ ] 5 ejercicios con soluciones
- [ ] Código runnable (los snippets markdown)
- [ ] Tono conversacional
- [ ] Sin errores ortográficos

# Technical validation
npm run spell-check chapters/05-discover.md
npm run link-check chapters/05-discover.md
npm run code-validate chapters/05-discover.md
```

---

### Marketing: Campaña Lanzamiento

**BUILD para campaña de marketing**:

```markdown
# BUILD Phase: Create All Campaign Assets

## Contratos (from DESIGN)

### Landing Page Contract
**Structure**:
- Hero section (headline + CTA)
- Benefits (3 columns)
- Social proof (3-5 testimonials)
- Pricing table
- FAQ (10 questions)
- Footer with links

**Copy**:
- Headline: Max 10 words, clear value prop
- Benefits: 3 benefits, each 2-3 sentences
- CTA: Action-oriented, 2-4 words

### Blog Post Contract
**Structure**:
- Title (60-80 chars, SEO-optimized)
- Hook (100 words)
- Problem (200 words)
- Solution (1000 words with examples)
- Conclusion + CTA (200 words)

**SEO**:
- Primary keyword: Density 1-2%
- Secondary keywords: 3-5
- Meta description: 150-160 chars
- Images: Min 3

## Parallel Creation (4 Agents)

### Agent 1: Copywriter
**Responsibility**: All copy (landing, emails, ads)
**Branch**: `feature/v0.4.x-copy`
**Deliverables**:
- landing-page-copy.md
- email-sequence.md (5 emails)
- linkedin-ads-copy.md (5 variations)

### Agent 2: Designer
**Responsibility**: All visuals
**Branch**: `feature/v0.4.x-design`
**Deliverables**:
- landing-page-mockup.figma
- email-templates.html
- linkedin-ad-creatives/ (10 images)

### Agent 3: Developer
**Responsibility**: Landing page implementation
**Branch**: `feature/v0.4.x-landing`
**Deliverables**:
- pages/landing.tsx
- components/Hero.tsx
- components/Benefits.tsx

### Agent 4: Content Writer
**Responsibility**: Blog posts
**Branch**: `feature/v0.4.x-blog`
**Deliverables**:
- blog/post-01-collaboration.md
- blog/post-02-taskflow-vs-asana.md
- ... (10 posts total)

## Implementation Example: Landing Page Copy

**Contract**:
```markdown
### Hero Section
- Headline: 10 words max, clear value proposition
- Subheadline: 20 words, explain benefit
- CTA button: 2-4 words, action-oriented
- Hero image: Product screenshot or illustration
```

**Implementation (contract-compliant)**:
```markdown
# landing-page-copy.md

## Hero Section

### Headline (9 words ✓)
"Stop Losing Time. Start Managing Tasks Effectively."

### Subheadline (18 words ✓)
"TaskFlow helps teams coordinate effortlessly. Track tasks, assign work, and stay aligned—without endless emails and meetings."

### CTA Button (3 words ✓)
"Start Free Trial"

### Hero Image
- Type: Product screenshot
- Content: TaskFlow dashboard with 5 tasks visible
- Alt text: "TaskFlow dashboard showing task management"
```

**Tests**:
```bash
# Word count validation
headline=$(cat landing-page-copy.md | grep "Headline" -A 1 | tail -1 | wc -w)
if [ $headline -le 10 ]; then
  echo "✅ Headline: $headline words (contract: max 10)"
else
  echo "❌ Headline too long: $headline words"
fi

# CTA validation
cta=$(cat landing-page-copy.md | grep "CTA Button" -A 1 | tail -1 | wc -w)
if [ $cta -ge 2 ] && [ $cta -le 4 ]; then
  echo "✅ CTA: $cta words (contract: 2-4)"
else
  echo "❌ CTA word count out of range: $cta words"
fi
```

---

### Producto Físico: Teclado Ergonómico

**BUILD para producto físico**:

```markdown
# BUILD Phase: Prototype & Manufacturing

## Contratos (from DESIGN)

### PCB Contract
**Specs**:
- Material: FR4, 1.6mm thickness
- Finish: ENIG (gold)
- Components: ATmega32U4, WS2812B LEDs, Kailh sockets
- Size: 180mm × 120mm per half
- Layers: 4-layer

### Case Contract
**Specs**:
- Material: ABS plastic
- Finish: Matte black
- Method: Injection molding
- Thickness: 2mm walls
- Features: Cable routing, tenting mechanism

## Parallel Manufacturing (3 "Agents")

### Manufacturer 1: PCB Fabrication
**Responsibility**: PCB production
**Location**: JLCPCB (China)
**Deliverables**:
- 1000 PCBs manufactured
- Electrical testing (100%)
- Gerber files validated

### Manufacturer 2: Case Production
**Responsibility**: Plastic case injection molding
**Location**: Local factory (EU)
**Deliverables**:
- Injection mold created
- 1000 cases manufactured
- Quality control (sample testing)

### Manufacturer 3: Assembly
**Responsibility**: SMT + THT assembly
**Location**: Local assembly house
**Deliverables**:
- 1000 keyboards assembled
- Functional testing (100%)
- QC report

## Implementation Example: PCB Manufacturing

**Contract Specs**:
```yaml
pcb:
  material: FR4
  thickness: 1.6mm
  layers: 4
  finish: ENIG
  color: Black
  dimensions:
    width: 180mm
    height: 120mm
  quantity: 1000
  testing: 100% electrical test
```

**Implementation Order (to JLCPCB)**:
```json
{
  "order_details": {
    "pcb_qty": 1000,
    "length": 180,
    "width": 120,
    "layers": 4,
    "thickness": "1.6",
    "color": "Black",
    "surface_finish": "ENIG",
    "copper_weight": "1 oz",
    "material": "FR-4 TG155",
    "min_track_spacing": "6/6mil",
    "min_hole_size": "0.3mm",
    "electrical_test": "Flying Probe (100%)"
  },
  "gerber_files": "ergokey-pcb-v1.0.zip",
  "bom": "ergokey-bom-v1.0.csv",
  "pick_place": "ergokey-cpl-v1.0.csv"
}
```

**Validation (Quality Control)**:
```markdown
## QC Checklist (Contract Compliance)

### Visual Inspection (Sample: 10 units)
- [ ] PCB color: Black ✓
- [ ] Silkscreen legible ✓
- [ ] No scratches or damage ✓
- [ ] Dimensions: 180mm × 120mm ± 0.1mm ✓

### Electrical Testing (100% of units)
- [ ] Continuity test: PASS (1000/1000) ✓
- [ ] Short circuit test: PASS (1000/1000) ✓
- [ ] Component placement: PASS (1000/1000) ✓

### Final Verification
- [ ] Matches Gerber files ✓
- [ ] Matches BOM ✓
- [ ] All pads have proper finish ✓
- [ ] Holes correctly sized ✓

**Result**: ✅ 1000/1000 PCBs pass QC (100%)
**Contract Compliance**: ✅ Yes
```

---

### Evento: ADD Conference

**BUILD para evento**:

```markdown
# BUILD Phase: Execute Event Setup

## Contratos (from DESIGN)

### Venue Setup Contract
**Requirements**:
- Main hall: 500 seats, theater style
- Stage: 8m × 6m with podium
- AV: Projector (4K), sound system, 3 mics
- Breakout rooms: 3 rooms, 100 seats each, classroom style
- Networking area: 200m², standing tables

### Speaker Contract
**Deliverables per speaker**:
- Slide deck (16:9, PDF + PowerPoint)
- Talk duration: 30 minutes
- Q&A: 10 minutes
- Bio (100 words) + photo (high-res)
- Session description (200 words)

### Catering Contract
**Requirements**:
- Day 1 breakfast: 500 people, continental
- Day 1 lunch: 500 people, buffet
- Day 1 snacks: 500 people, afternoon
- Day 1 reception: 500 people, hors d'oeuvres + drinks
- Day 2: Same as Day 1

## Parallel Execution (5 "Agents")

### Agent 1: Venue Coordinator
**Responsibility**: Venue setup and logistics
**Tasks**:
- Coordinate with venue for setup
- AV equipment testing
- Seating arrangements
- Signage placement

### Agent 2: Speaker Liaison
**Responsibility**: Speaker management
**Tasks**:
- Collect all speaker materials
- Tech rehearsals (15 speakers)
- Schedule coordination
- Speaker hospitality

### Agent 3: Catering Manager
**Responsibility**: Food and beverage
**Tasks**:
- Coordinate with caterer
- Dietary restrictions tracking
- Delivery and setup timing
- Quality control

### Agent 4: Registration Manager
**Responsibility**: Attendee check-in
**Tasks**:
- Registration desk setup
- Badge printing (500 badges)
- Check-in app configuration
- Volunteer training

### Agent 5: Marketing Coordinator
**Responsibility**: Day-of marketing
**Tasks**:
- Social media coverage
- Photography
- Livestream coordination
- Attendee engagement

## Implementation Example: Speaker Material Collection

**Contract (per speaker)**:
```markdown
### Speaker Deliverables

**Due Date**: 2 weeks before event

**Materials Required**:
1. Slide Deck
   - Format: PowerPoint (.pptx) + PDF
   - Aspect ratio: 16:9
   - Fonts: Embedded
   - File size: Max 50MB

2. Talk Details
   - Title: 60 chars max
   - Description: 200 words
   - Key takeaways: 3-5 bullets

3. Bio & Photo
   - Bio: 100 words
   - Photo: High-res (min 1000×1000px)
   - Photo format: JPG

4. Technical Requirements
   - Laptop: Own or venue-provided
   - Special adapters needed
   - Internet: Required or not
```

**Implementation (Speaker #5: John Doe)**:
```yaml
# speakers/john-doe/materials.yaml

speaker:
  name: "John Doe"
  email: "john@example.com"
  talk_title: "Contract-First Development with Multi-Agent AI"

deliverables:
  slide_deck:
    powerpoint: "john-doe-slides.pptx"  # ✓ 45MB
    pdf: "john-doe-slides.pdf"           # ✓ 8MB
    aspect_ratio: "16:9"                 # ✓
    fonts_embedded: true                 # ✓

  description:
    title: "Contract-First Development with Multi-Agent AI"  # ✓ 57 chars
    summary: |                                               # ✓ 198 words
      Learn how to coordinate multiple AI agents working in parallel
      using the Contract-First pattern from ADD 2.0 methodology.
      We'll cover real examples from production systems, common pitfalls,
      and best practices for ensuring agents stay synchronized.
      [... 198 words total ...]

    takeaways:                                              # ✓ 4 bullets
      - "Understand Contract-First pattern fundamentals"
      - "Implement parallel agent coordination"
      - "Avoid common multi-agent pitfalls"
      - "Apply ADD 2.0 to your projects"

  bio:
    text: |                                                 # ✓ 97 words
      John Doe is a software architect with 15 years of experience
      in distributed systems. He pioneered the use of AI agents in
      production at Scale Corp, where he led a team that implemented
      the first fully autonomous deployment pipeline using ADD 2.0.
      [... 97 words total ...]

    photo: "john-doe-photo.jpg"                            # ✓ 1500×1500px

  technical:
    laptop: "own"                                           # ✓
    adapters: "USB-C to HDMI"                              # ✓
    internet_required: true                                 # ✓

status:
  submitted: "2026-08-15"
  reviewed: "2026-08-16"
  approved: true
  contract_compliance: "✓ Yes"
```

**Validation Script**:
```python
# scripts/validate-speaker-materials.py

import yaml
import os
from PIL import Image

def validate_speaker(speaker_dir):
    # Load materials
    with open(f"{speaker_dir}/materials.yaml") as f:
        materials = yaml.safe_load(f)

    errors = []

    # Check slide deck
    pptx_size = os.path.getsize(f"{speaker_dir}/{materials['deliverables']['slide_deck']['powerpoint']}")
    if pptx_size > 50 * 1024 * 1024:
        errors.append(f"PowerPoint too large: {pptx_size / 1024 / 1024:.1f}MB (max 50MB)")

    # Check title length
    title_len = len(materials['deliverables']['description']['title'])
    if title_len > 60:
        errors.append(f"Title too long: {title_len} chars (max 60)")

    # Check description word count
    desc_words = len(materials['deliverables']['description']['summary'].split())
    if desc_words > 200:
        errors.append(f"Description too long: {desc_words} words (max 200)")

    # Check takeaways count
    takeaways = len(materials['deliverables']['description']['takeaways'])
    if takeaways < 3 or takeaways > 5:
        errors.append(f"Takeaways count wrong: {takeaways} (should be 3-5)")

    # Check bio word count
    bio_words = len(materials['deliverables']['bio']['text'].split())
    if bio_words > 100:
        errors.append(f"Bio too long: {bio_words} words (max 100)")

    # Check photo resolution
    photo_path = f"{speaker_dir}/{materials['deliverables']['bio']['photo']}"
    img = Image.open(photo_path)
    if img.width < 1000 or img.height < 1000:
        errors.append(f"Photo too small: {img.width}×{img.height} (min 1000×1000)")

    if errors:
        print(f"❌ {materials['speaker']['name']}: {len(errors)} errors")
        for error in errors:
            print(f"   - {error}")
        return False
    else:
        print(f"✅ {materials['speaker']['name']}: All materials valid")
        return True

# Validate all speakers
speakers = os.listdir("speakers/")
results = [validate_speaker(f"speakers/{s}") for s in speakers]

print(f"\n{sum(results)}/{len(results)} speakers validated")
```

---

## 🛠️ Herramientas Recomendadas

### Para Backend
- **Node.js + Express** o **Fastify**: API frameworks
- **Prisma** o **TypeORM**: Database ORM
- **Jest** + **Supertest**: Testing
- **ESLint** + **Prettier**: Code quality

### Para Frontend
- **React** + **TypeScript**: UI framework
- **Next.js**: If SSR needed
- **Tailwind CSS**: Styling
- **React Testing Library**: Component tests

### Para Testing
- **Jest**: Unit tests
- **Cypress** o **Playwright**: E2E tests
- **Postman** o **Insomnia**: API testing

### Para CI/CD
- **GitHub Actions**: CI/CD automation
- **Docker**: Containerization
- **Vercel** / **Railway** / **Render**: Deployment

---

## 👥 Multi-Agente en BUILD

### Estrategia: **Contract-First Parallel**

**Es la ÚNICA estrategia recomendada para BUILD con multi-agente.**

### Por Qué Contract-First

```
Sin Contract-First:
- Agent 1: "Hice la API, devuelve esto"
- Agent 2: "Yo esperaba otra cosa"
- Result: Re-trabajo, frustración, delays

Con Contract-First:
- DESIGN phase: Contracts definidos
- Agent 1: Implementa API siguiendo contrato
- Agent 2: Implementa UI siguiendo mismo contrato
- Result: Integration works first time ✅
```

### Configuración Típica

**Para proyecto web app (3 agentes)**:
```yaml
agents:
  - name: Backend Developer
    context_dirs:
      - src/backend/
      - docs/interfaces.md
      - tests/backend/
    branch: feature/v0.4.x-backend
    contracts:
      - All API endpoints

  - name: Frontend Developer
    context_dirs:
      - src/frontend/
      - docs/interfaces.md
      - src/frontend/mocks/
    branch: feature/v0.4.x-frontend
    contracts:
      - All UI components
    uses_mocks: true

  - name: Test Engineer
    context_dirs:
      - tests/
      - docs/interfaces.md
    branch: feature/v0.4.x-tests
    contracts:
      - Integration tests for all endpoints
      - E2E tests for all flows
    waits_for:
      - Backend
      - Frontend
```

### Coordinación con Git

```bash
# Día 1-3: Parallel work
# Backend Agent
git checkout -b feature/v0.4.x-backend
# ... implements APIs ...
git commit -m "build(api): all endpoints implemented"
git push

# Frontend Agent (simultaneous)
git checkout -b feature/v0.4.x-frontend
# ... implements UI with mocks ...
git commit -m "build(frontend): all components implemented (with mocks)"
git push

# Día 4: Integration
# Frontend Agent integrates
git checkout feature/v0.4.x-frontend
git merge feature/v0.4.x-backend
# Replace mocks with real API
git commit -m "build(frontend): integrate real API"
git push

# Día 5: Tests
# Test Agent runs integration tests
git checkout feature/v0.4.x-tests
git merge feature/v0.4.x-backend
git merge feature/v0.4.x-frontend
npm run test:integration

# Día 6: Merge to main
git checkout main
git merge feature/v0.4.x-backend
git merge feature/v0.4.x-frontend
git merge feature/v0.4.x-tests
git tag v0.4.9
git push --tags
```

---

## 📚 Recursos

- **"Test-Driven Development"** - Kent Beck (testing best practices)
- **"Clean Code"** - Robert C. Martin (code quality)
- **"The Pragmatic Programmer"** - Hunt & Thomas (implementation wisdom)
- **"Working Effectively with Legacy Code"** - Michael Feathers (refactoring)

---

## ✅ Checklist Final

### Implementación
- [ ] Todos los endpoints implementados
- [ ] Todos los componentes implementados
- [ ] Todos los modelos de datos implementados
- [ ] Business logic completa

### Contract Compliance
- [ ] Cada implementación sigue su contrato
- [ ] Input validation matches
- [ ] Output format matches
- [ ] Error handling matches
- [ ] Business rules implemented

### Testing
- [ ] Unit tests: 100% passing
- [ ] Integration tests: 100% passing
- [ ] E2E tests: 100% passing
- [ ] Coverage >= 80%

### Code Quality
- [ ] Linter passing
- [ ] Type checking passing
- [ ] Code review done
- [ ] No critical TODOs

### Integration
- [ ] Frontend + Backend integrated
- [ ] Mocks removed
- [ ] Staging deployment successful
- [ ] Smoke tests passing

### Documentation
- [ ] `docs/journal.md` updated
- [ ] ADRs for BUILD decisions
- [ ] Known issues documented
- [ ] Deployment notes ready

### Git
- [ ] All work in `feature/v0.4.x` branches
- [ ] Merged to `main`
- [ ] Tag `v0.4.9` created
- [ ] Ready for VALIDATE phase

---

**Versión**: 2.0.0
**Fase**: BUILD (v0.4.x)
**Última actualización**: 2026-01-06
**Próxima fase**: VALIDATE (v0.5.x)

**🔑 Key Takeaway**: Contract-First + Parallel Agents + Tests = BUILD exitoso sin caos.
