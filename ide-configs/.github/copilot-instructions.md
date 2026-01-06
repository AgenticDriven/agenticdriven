# GitHub Copilot Instructions for ADD 2.0

**Version**: 2.0.0
**Updated**: 2026-01-06
**For**: GitHub Copilot (Chat, Workspace, CLI)

---

## Overview

This file configures GitHub Copilot to assist with projects following the ADD (Agent-Driven Development) 2.0 Universal methodology.

## How to Use

Place this file at `.github/copilot-instructions.md` in your repository root. GitHub Copilot will automatically use these instructions for context.

---

## CRITICAL RULES FOR COPILOT

When assisting with this project:

1. **ALWAYS read project configuration** first:
   - `add-project.yaml` - Project config
   - `README.md` - Overview
   - `docs/discovery.md` - Problem understanding
   - `docs/design.md` - Solution design

2. **NEVER skip phases** - Each phase must complete before advancing

3. **ALWAYS respect contracts** (in BUILD phase):
   - Read `docs/interfaces.md` before implementing
   - Implement exactly as specified
   - Don't break contracts

4. **NEVER commit across phases** - Group related changes from same phase

5. **ALWAYS validate exit criteria** before considering phase complete

---

## ADD 2.0 PHASES

Current project phase is in `add-project.yaml` → `version` field.

### v0.1.x - DISCOVER (Understanding)
**Purpose**: Understand the problem, context, and requirements

**When you're asked to help with**:
- Research questions
- Requirements gathering
- Problem analysis
- Feasibility studies

**You should**:
- Ask clarifying questions
- Suggest research approaches
- Help document findings in `docs/discovery.md`
- Identify stakeholders and constraints

**Example prompts**:
- "Help me understand the market for [product]"
- "What are the key requirements for [feature]?"
- "Who are the stakeholders for this project?"

---

### v0.2.x - DESIGN (Solution Design)
**Purpose**: Design the complete solution

**When you're asked to help with**:
- Architecture design
- Component design
- Interface/contract definitions
- Prototyping

**You should**:
- Suggest architecture patterns
- Design component interactions
- **CRITICALLY**: Help define contracts in `docs/interfaces.md` if parallel work expected
- Validate design decisions

**Contract Definition Example**:
```yaml
# docs/interfaces.md

API_POST_/api/users:
  input:
    name: string (required, 1-100 chars)
    email: string (required, email format)
  output:
    id: uuid
    name: string
    email: string
    created_at: datetime (ISO 8601)
  errors:
    400: Invalid input
    409: Email already exists
    500: Server error

Component_LoginForm:
  props:
    onSubmit: (credentials: {email: string, password: string}) => Promise<void>
    loading: boolean
    error: string | null
  events:
    onSuccess: (user: User) => void
    onError: (error: Error) => void
```

**Example prompts**:
- "Design architecture for [system]"
- "What's the best way to structure [component]?"
- "Help me define contracts for parallel development"

---

### v0.3.x - PREPARE (Setup)
**Purpose**: Prepare all tools, resources, environment

**When you're asked to help with**:
- Project setup
- Tool configuration
- Framework installation
- CI/CD setup

**You should**:
- Suggest appropriate tools
- Generate configuration files
- Help with setup scripts
- Validate environment works

**Example prompts**:
- "Help me setup a Node.js project with TypeScript"
- "Configure Jest for testing"
- "Setup GitHub Actions CI/CD"

---

### v0.4.x - BUILD (Implementation)
**Purpose**: Build/create/execute the solution

**⚠️ CRITICAL - CONTRACT-FIRST PATTERN**

**When you're asked to help implement**:

1. **ALWAYS read contracts first**:
   ```bash
   # Check if contracts exist
   cat docs/interfaces.md
   ```

2. **Implement EXACTLY to contract**:
   - Input types match
   - Output format matches
   - Error handling as specified
   - Validation rules followed

3. **Use mocks for dependencies**:
   ```typescript
   // If backend API not ready yet, use contract-based mock
   const mockAPI = {
     createUser: async (data: CreateUserInput): Promise<User> => ({
       id: 'mock-uuid-' + Date.now(),
       ...data,
       created_at: new Date().toISOString()
     })
   };
   ```

4. **Suggest tests based on contracts**:
   ```typescript
   describe('POST /api/users', () => {
     it('should accept valid input', async () => {
       const input = { name: 'John', email: 'john@example.com' };
       const output = await createUser(input);

       expect(output).toHaveProperty('id');
       expect(output).toHaveProperty('created_at');
       expect(output.name).toBe(input.name);
       expect(output.email).toBe(input.email);
     });

     it('should reject invalid email', async () => {
       const input = { name: 'John', email: 'invalid' };
       await expect(createUser(input)).rejects.toThrow('Invalid email');
     });
   });
   ```

**Example prompts**:
- "Implement POST /api/users following the contract"
- "Create LoginForm component per contract"
- "Generate tests for [component] based on contract"
- "Create mock for [dependency] using contract"

---

### v0.5.x - VALIDATE (Testing & QA)
**Purpose**: Validate solution meets requirements

**When you're asked to help with**:
- Test writing
- Test debugging
- Quality validation
- Requirements verification

**You should**:
- Generate comprehensive tests
- Suggest test cases
- Help debug failing tests
- Validate against requirements from `docs/requirements.md`

**Example prompts**:
- "Write integration tests for [feature]"
- "What edge cases should I test for [component]?"
- "Help me debug this failing test"

---

### v0.6.x - DELIVER (Deployment)
**Purpose**: Deliver/launch the solution

**When you're asked to help with**:
- Deployment scripts
- Configuration for production
- Monitoring setup
- Release preparation

**You should**:
- Generate deployment configs
- Suggest monitoring strategies
- Help with rollback plans
- Validate production readiness

**Example prompts**:
- "Create Dockerfile for production"
- "Setup monitoring for [service]"
- "Generate deployment checklist"

---

### v0.7.x - SUPPORT (Maintenance)
**Purpose**: Support and maintain the solution

**When you're asked to help with**:
- Bug investigation
- Hotfix implementation
- Performance debugging
- Incident response

**You should**:
- Help diagnose issues
- Suggest fixes
- Generate hotfix code
- Document incidents

**Example prompts**:
- "Help me debug [error]"
- "Create hotfix for [bug]"
- "Investigate performance issue in [component]"

---

### v0.8.x - EVOLVE (Optimization & Enhancement)
**Purpose**: Improve, optimize, plan next version

**When you're asked to help with**:
- Performance optimization
- Refactoring
- Technical debt reduction
- Feature enhancements

**You should**:
- Suggest optimizations
- Identify technical debt
- Propose refactoring strategies
- Plan future improvements

**Example prompts**:
- "How can I optimize [component]?"
- "Refactor [code] for better performance"
- "What technical debt should we address?"

---

## MULTI-AGENT COORDINATION

**If this project has multiple developers/agents working in parallel:**

### When suggesting code:
1. **Check if in BUILD phase** (`v0.4.x`)
2. **Verify contracts exist** (`docs/interfaces.md`)
3. **Implement to contract** - Don't deviate
4. **Use mocks** for dependencies not ready yet
5. **Add contract compliance note** in comments:
   ```typescript
   /**
    * POST /api/users endpoint
    *
    * Implements contract from docs/interfaces.md
    * - Input validation: name (required), email (required, format)
    * - Output format: {id, name, email, created_at}
    * - Error handling: 400 (invalid), 409 (duplicate), 500 (server)
    */
   ```

### When reviewing code:
- Validate compliance with contracts
- Check for contract violations
- Suggest fixes that maintain contract compatibility

---

## COMMIT MESSAGE GUIDANCE

**When using Copilot Chat to generate commit messages:**

Format:
```
type(scope): brief description

Optional longer description:
- What changed
- Why changed
- Breaking changes

Follows ADD 2.0 [PHASE_NAME] phase
Contract compliance: [Yes/No/N/A]
```

**Types** (based on phase):
- `discover`: Research, requirements
- `design`: Architecture, contracts
- `prepare`: Setup, configuration
- `build`: Implementation
- `validate`: Tests, QA
- `deliver`: Deployment
- `support`: Fixes, incidents
- `evolve`: Optimization, enhancement
- `docs`: Documentation only
- `chore`: Maintenance

**Example**:
```
build(api): implement POST /api/users endpoint

Implements user creation according to contract in docs/interfaces.md:
- Input validation for name and email
- Email format validation
- Duplicate email check
- Returns user object with id, created_at

Follows ADD 2.0 BUILD phase
Contract compliance: Yes
Tests: Included (5/5 passing)
```

---

## GITHUB COPILOT WORKSPACE

**When using Copilot Workspace (Issue → PR flow):**

### Issue Analysis
When analyzing GitHub issue:
1. Identify which ADD phase this belongs to
2. Check current project phase in `add-project.yaml`
3. Verify phase is appropriate for the issue
4. If not, suggest: "This issue requires [PHASE], but project is in [CURRENT_PHASE]. Should we address this in current phase or defer?"

### Plan Generation
When generating implementation plan:
1. **Read phase requirements** from docs
2. **Check for contracts** if BUILD phase
3. **Respect phase boundaries** - Don't mix phases
4. **Include exit criteria validation** in plan

### Implementation
When implementing:
1. **Follow contracts strictly** (if BUILD)
2. **One phase per PR** - Don't mix
3. **Include tests** (if BUILD/VALIDATE)
4. **Update documentation** as needed

### PR Description Template
```markdown
## Phase: [PHASE_NAME] (v0.X.x)

### Changes
- [List changes]

### Contract Compliance
- [ ] Follows contracts from docs/interfaces.md
- [ ] No contract violations
- [ ] Backwards compatible

### Testing
- [ ] Tests included
- [ ] All tests passing
- [ ] Coverage maintained/improved

### Documentation
- [ ] Documentation updated
- [ ] Examples included (if applicable)

### Exit Criteria
[Check relevant criteria for current phase]
```

---

## COPILOT CLI

**When using `gh copilot` CLI:**

### Asking for help:
```bash
# Good prompts that respect ADD 2.0:
gh copilot suggest "implement POST /api/users following contract in docs/interfaces.md"
gh copilot suggest "setup test framework for PREPARE phase"
gh copilot suggest "create deployment config for DELIVER phase"

# Bad prompts (cross-phase):
gh copilot suggest "implement API and deploy to production"  # Mixing BUILD and DELIVER
```

### Explaining code:
```bash
gh copilot explain "why does this code violate the contract?"
gh copilot explain "what phase should this change be in?"
```

---

## QUALITY GATES

**Before suggesting code is complete, verify:**

### DISCOVER Phase
- [ ] Problem clearly documented
- [ ] Requirements prioritized
- [ ] Stakeholders identified

### DESIGN Phase
- [ ] Design documented
- [ ] Contracts defined (if parallel work expected)
- [ ] Architecture validated

### PREPARE Phase
- [ ] Environment works
- [ ] Tools configured
- [ ] Tests can run

### BUILD Phase
- [ ] Contracts followed
- [ ] Implementation complete
- [ ] Basic tests pass

### VALIDATE Phase
- [ ] All tests pass
- [ ] Requirements met
- [ ] Quality criteria met

### DELIVER Phase
- [ ] Deployed successfully
- [ ] Monitoring active
- [ ] Stakeholders notified

### SUPPORT Phase
- [ ] Issues resolved
- [ ] SLAs met
- [ ] Performance stable

### EVOLVE Phase
- [ ] Optimizations done
- [ ] Tech debt addressed
- [ ] Roadmap defined

---

## BEST PRACTICES FOR COPILOT WITH ADD 2.0

### 1. Context-Aware Suggestions
Always consider:
- Current phase
- Existing contracts
- Project structure
- Team coordination needs

### 2. Contract-First in BUILD
When in BUILD phase, ALWAYS:
- Read `docs/interfaces.md` first
- Implement exactly to specification
- Use mocks for missing dependencies
- Include contract compliance in comments

### 3. Phase Boundaries
Respect phase boundaries:
- Don't suggest deployment code in BUILD phase
- Don't suggest implementation in DESIGN phase
- Stay focused on current phase objectives

### 4. Team Coordination
If multiple people:
- Suggest branch names: `feature/v0.4.x-component-name`
- Recommend contract-based mocks
- Warn about potential conflicts

### 5. Documentation
Always suggest updating:
- `docs/journal.md` - Daily progress
- Phase-specific docs
- Contract docs if interfaces change (with approval)

---

## EXAMPLES

### Example 1: Implementing API Endpoint

**User**: "Help me implement the user creation endpoint"

**Copilot should**:
1. Check current phase (should be BUILD - v0.4.x)
2. Read `docs/interfaces.md` for contract
3. Generate implementation that matches contract exactly:

```typescript
import { Request, Response } from 'express';
import { db } from './db';
import { validateEmail } from './utils/validation';

/**
 * POST /api/users - Create new user
 *
 * Implements contract from docs/interfaces.md
 * Input: {name: string, email: string}
 * Output: {id: uuid, name: string, email: string, created_at: datetime}
 * Errors: 400 (invalid), 409 (duplicate), 500 (server)
 */
export async function createUser(req: Request, res: Response) {
  try {
    // Input validation (contract requirement)
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: 'name and email are required'
      });
    }

    // Email format validation (contract requirement)
    if (!validateEmail(email)) {
      return res.status(400).json({
        error: 'invalid email format'
      });
    }

    // Check for duplicate (contract requirement)
    const existing = await db.users.findByEmail(email);
    if (existing) {
      return res.status(409).json({
        error: 'email already exists'
      });
    }

    // Create user
    const user = await db.users.create({ name, email });

    // Output format (contract requirement)
    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at.toISOString()
    });

  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      error: 'internal server error'
    });
  }
}
```

4. Suggest tests:
```typescript
describe('POST /api/users', () => {
  it('creates user with valid input', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', email: 'john@example.com' });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'john@example.com',
      created_at: expect.any(String)
    });
  });

  it('rejects invalid email', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', email: 'invalid' });

    expect(response.status).toBe(400);
  });

  it('rejects duplicate email', async () => {
    await createTestUser({ email: 'john@example.com' });

    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Jane Doe', email: 'john@example.com' });

    expect(response.status).toBe(409);
  });
});
```

---

### Example 2: Reviewing Contract Compliance

**User**: "@workspace is this code contract-compliant?"

**Copilot should**:
1. Read `docs/interfaces.md`
2. Compare code against contract
3. Report any violations:

```markdown
## Contract Compliance Review

### POST /api/users implementation

✅ Input validation: Correct
✅ Email format check: Correct
✅ Duplicate check: Correct
✅ Output format: Correct
❌ Error response: Missing 500 error handling

### Recommendation:
Add try-catch for server errors to match contract:
```typescript
} catch (error) {
  console.error('Error creating user:', error);
  return res.status(500).json({ error: 'internal server error' });
}
```

---

## REFERENCE

- **Full ADD 2.0 Documentation**: `/var/add/ADD-UNIVERSAL.md`
- **Multi-Agent Coordination**: `/var/add/agentes/COORDINACION-PARALELA.md`
- **Framework Design**: `/var/add/FRAMEWORK-DESIGN.md`
- **GitHub**: https://github.com/add-framework/add-framework

---

**Version**: 2.0.0 for GitHub Copilot
**Compatible With**: Copilot Chat, Workspace, CLI
**Methodology**: ADD 2.0 Universal
