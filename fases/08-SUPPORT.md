# Fase 8: SUPPORT (v0.8.x)

**Mantener y dar soporte continuo a la solución en producción**

---

## 📋 Información General

| Campo | Valor |
|-------|-------|
| **Versión** | v0.8.x |
| **Fase** | SUPPORT |
| **Duración típica** | Ongoing (indefinida) |
| **Agentes recomendados** | 2-4 (Support, DevOps, Incident Response) |
| **Coordinación** | On-Call + Reactive |
| **Objetivo principal** | Estabilidad y disponibilidad |
| **Dependencias** | LAUNCH debe estar completo |

---

## 🎯 Propósito

La fase SUPPORT es donde **mantienes el producto funcionando**.

**Actividades principales**:
- Monitoreo 24/7
- Resolución de incidentes
- Bug fixing (hotfixes)
- User support
- Performance tuning
- Security patches
- Backups y disaster recovery

**SUPPORT nunca termina mientras el producto esté en producción.**

---

## 🎪 Actividades Principales

### 1. Monitoreo 24/7

#### Monitoring Stack

```yaml
# monitoring-stack.yaml

components:
  # Metrics collection
  prometheus:
    scrape_interval: 15s
    retention: 30d
    metrics:
      - http_requests_total
      - http_request_duration_seconds
      - database_connections
      - memory_usage
      - cpu_usage

  # Visualization
  grafana:
    dashboards:
      - "System Health"
      - "Application Metrics"
      - "Database Performance"
      - "User Activity"

  # Logging
  loki:
    retention: 90d
    log_levels:
      - ERROR
      - WARN
      - INFO

  # Alerting
  alertmanager:
    routes:
      - severity: critical
        notify: pagerduty
      - severity: warning
        notify: slack

  # Error tracking
  sentry:
    enabled: true
    environment: production
    sample_rate: 1.0
```

#### Key Metrics Dashboard

```javascript
// grafana-dashboard.json

{
  "title": "Production Health Dashboard",
  "panels": [
    {
      "title": "System Health",
      "queries": [
        "up{job='app'}", // Is the app running?
        "rate(http_requests_total[5m])", // Request rate
        "rate(http_errors_total[5m])" // Error rate
      ],
      "thresholds": {
        "error_rate": 0.01 // Alert if > 1%
      }
    },
    {
      "title": "Response Time",
      "queries": [
        "histogram_quantile(0.50, http_request_duration_seconds)",
        "histogram_quantile(0.95, http_request_duration_seconds)",
        "histogram_quantile(0.99, http_request_duration_seconds)"
      ],
      "thresholds": {
        "p95": 0.2, // 200ms
        "p99": 0.5  // 500ms
      }
    },
    {
      "title": "Active Users",
      "query": "sum(active_sessions)"
    },
    {
      "title": "Database",
      "queries": [
        "pg_stat_database_numbackends", // Active connections
        "pg_stat_database_xact_commit", // Transactions
        "pg_slow_queries" // Slow queries
      ]
    }
  ]
}
```

---

### 2. Incident Response

#### Incident Severity Levels

```markdown
# Incident Severity Matrix

| Level | Description | Impact | Example | Response Time | Who |
|-------|-------------|--------|---------|---------------|-----|
| **P0** | **Critical** | Complete outage | App down, database unavailable | Immediate | All hands |
| **P1** | **High** | Major feature broken | Login fails, payments broken | < 1 hour | On-call + Lead |
| **P2** | **Medium** | Feature degraded | Slow performance, minor bugs | < 4 hours | On-call |
| **P3** | **Low** | Minor issue | UI glitch, typo | Next business day | Support team |
| **P4** | **Trivial** | Cosmetic | Color inconsistency | Backlog | When available |
```

#### Incident Response Runbook

```markdown
# Incident Response Runbook

## P0: Critical Incident (App Down)

### 1. Detect (Automated)
```
PagerDuty alert: "Production app DOWN"
Alert sent to: On-call engineer + Incident Commander
```

### 2. Acknowledge (< 5 min)
```bash
# On-call engineer acknowledges
pagerduty-cli ack --incident-id=12345

# Update status page
curl -X POST https://status.taskflow.com/api/incidents \
  -d "status=investigating" \
  -d "message=We are investigating reports of service unavailability"
```

### 3. Assess (< 10 min)
```bash
# Check app health
kubectl get pods
kubectl logs -f deployment/app --tail=100

# Check database
pg_isready -h prod-db.example.com

# Check recent deploys
kubectl rollout history deployment/app

# Check metrics
# Go to Grafana → Production Health dashboard
```

### 4. Mitigate (< 30 min)

**Option A: Rollback (if recent deploy)**
```bash
# Rollback to previous version
kubectl rollout undo deployment/app

# Verify
kubectl rollout status deployment/app
curl https://taskflow.com/health
```

**Option B: Scale up (if resource issue)**
```bash
# Scale up replicas
kubectl scale deployment app --replicas=10

# Increase resources
kubectl set resources deployment app \
  --limits=cpu=2,memory=4Gi
```

**Option C: Database failover (if DB issue)**
```bash
# Promote replica to primary
pg_ctl promote -D /var/lib/postgresql/data

# Update connection string
kubectl set env deployment/app \
  DATABASE_URL=postgres://new-primary:5432/taskflow
```

### 5. Communicate

**To users (every 15 min while investigating)**:
```
Status page update:
"We have identified the issue and are working on a fix.
Next update in 15 minutes."
```

**To team (Slack #incidents)**:
```
[12:05] INCIDENT: P0 - App DOWN
[12:10] Root cause: OOM (out of memory) on app pods
[12:15] Mitigating: Restarting pods + increasing memory
[12:20] RESOLVED: App healthy, monitoring
```

### 6. Resolve
```bash
# Verify resolution
curl https://taskflow.com/health
# {"status": "ok"}

# Update status page
curl -X POST https://status.taskflow.com/api/incidents \
  -d "status=resolved" \
  -d "message=Issue resolved. All systems operational."

# Close PagerDuty incident
pagerduty-cli resolve --incident-id=12345
```

### 7. Post-Incident Review (within 24h)

**Post-Mortem Template**:
```markdown
# Post-Incident Review: P0 Outage (2026-01-20)

## Summary
App was down for 15 minutes due to OOM (out of memory).

## Timeline
- 12:05: Alert triggered (automated)
- 12:06: On-call engineer acknowledged
- 12:10: Root cause identified (OOM)
- 12:15: Mitigation applied (pod restart + memory increase)
- 12:20: Service restored
- 12:25: Monitoring confirmed stable

**Total Downtime**: 15 minutes
**Users Affected**: ~5,000 (all users)
**Data Loss**: None

## Root Cause
Memory leak in new feature (real-time notifications).
WebSocket connections not being properly closed.

## What Went Well
✅ Automated alerting worked
✅ Fast acknowledgment (1 minute)
✅ Clear runbook followed
✅ Good communication to users

## What Went Wrong
❌ Memory leak not caught in testing
❌ No memory limit set on pods (could have triggered earlier restart)
❌ Status page update delayed (10 min after incident start)

## Action Items
- [ ] Fix memory leak in WebSocket handler (@charlie, P0)
- [ ] Add memory limits to pod spec (@bob, P1)
- [ ] Improve memory leak detection in testing (@alice, P2)
- [ ] Automate status page updates (@diana, P3)
- [ ] Add memory usage alerting (@bob, P2)

## Prevention
To prevent this in the future:
1. Add memory leak detection to CI/CD
2. Set resource limits on all pods
3. Load test WebSocket connections
```
```

---

### 3. Bug Fixing (Hotfixes)

#### Hotfix Workflow

```
Bug Reported → Triage → Fix → Test → Deploy → Verify
```

**Example: Critical Bug (P1)**

```markdown
# Bug Report

**Title**: Users can't login with Google OAuth
**Severity**: P1 (High)
**Reporter**: 15 users via support tickets
**Impact**: 30% of users use Google OAuth
**First Seen**: 2026-01-20 14:30 UTC

## Steps to Reproduce
1. Go to login page
2. Click "Sign in with Google"
3. Authorize on Google
4. Redirect back to app
5. Error: "Invalid state parameter"

## Expected
User should be logged in

## Actual
Error message shown, user not logged in
```

**Hotfix Process**:

```bash
# 1. Create hotfix branch
git checkout main
git pull
git checkout -b hotfix/google-oauth-state

# 2. Reproduce locally
npm run dev
# Try Google OAuth login
# Confirmed: Bug reproduced

# 3. Investigate
git log --all --grep="OAuth" --since="2 days ago"
# Found: Commit abc123 changed session storage

# 4. Fix
# File: src/auth/oauth.ts
# Issue: Session state not being stored correctly in Redis
# Fix: Use correct Redis key format

git diff
```

```diff
// src/auth/oauth.ts

export async function initiateGoogleOAuth(req, res) {
  const state = generateRandomState();

- await redis.set(`oauth_state_${state}`, state, 'EX', 300);
+ await redis.set(`oauth:state:${state}`, state, 'EX', 300);

  const authUrl = buildGoogleAuthUrl(state);
  res.redirect(authUrl);
}

export async function handleGoogleCallback(req, res) {
  const { state, code } = req.query;

- const storedState = await redis.get(`oauth_state_${state}`);
+ const storedState = await redis.get(`oauth:state:${state}`);

  if (storedState !== state) {
    return res.status(400).json({ error: 'Invalid state parameter' });
  }

  // ... rest of OAuth flow
}
```

```bash
# 5. Test locally
npm test src/auth/oauth.test.ts
# ✓ OAuth state validation works

# Manual test
npm run dev
# Try Google OAuth → Works ✓

# 6. Commit
git add src/auth/oauth.ts
git commit -m "fix(auth): Google OAuth state validation

Redis key format was inconsistent between set and get.
Changed to use consistent 'oauth:state:' prefix.

Fixes: #456
Impact: 30% of users (Google OAuth users)
Tested: Manually + unit tests
"

# 7. Deploy to staging
git push origin hotfix/google-oauth-state
# CI/CD deploys to staging

# 8. Test on staging
curl -X GET https://staging.taskflow.com/auth/google
# Follow OAuth flow
# Works ✓

# 9. Deploy to production (fast-track)
# Option A: Merge and deploy normally
git checkout main
git merge hotfix/google-oauth-state
git push

# Option B: Direct hotfix deploy (for P0/P1)
kubectl set image deployment/app \
  app=taskflow/app:hotfix-google-oauth-state

# 10. Verify in production
# Try Google OAuth on production
# Works ✓

# 11. Monitor for 15 minutes
# Watch error logs
kubectl logs -f deployment/app | grep -i oauth
# No errors ✓

# Watch login metrics
# Google OAuth logins: Back to normal ✓

# 12. Notify users
# Support team: "Issue resolved"
# Status page: "Google OAuth login issue resolved"

# 13. Close bug ticket
# GitHub issue #456: Closed
# Support tickets: Responded to all 15 users
```

---

### 4. User Support

#### Support Tiers

```markdown
# Support Structure

## Tier 1: Customer Support (First Line)
**Team**: 5 support reps
**Hours**: 9 AM - 6 PM (business hours)
**Channels**: Email, in-app chat
**Handle**:
- Account questions
- How-to questions
- Bug reports (triage and escalate)
- Feature requests (document and escalate)

**SLA**:
- First response: < 4 hours
- Resolution: 80% of tickets resolved at Tier 1

## Tier 2: Technical Support (Second Line)
**Team**: 2 engineers (on rotation)
**Hours**: 24/7 (on-call)
**Handle**:
- Complex technical issues
- Bug investigation
- Performance issues
- Escalations from Tier 1

**SLA**:
- Response: < 1 hour for escalations
- Resolution: 24 hours for P2, 1 week for P3

## Tier 3: Engineering (Third Line)
**Team**: Dev team
**Handle**:
- Code bugs
- Architecture issues
- Complex investigations
- Hotfixes

**SLA**:
- P0: Immediate
- P1: < 24 hours
- P2: < 3 days
```

#### Support Ticket Example

```markdown
# Support Ticket #789

**Subject**: Tasks not syncing between devices
**User**: john@company.com (Premium plan)
**Priority**: P2 (Medium)
**Created**: 2026-01-20 10:30 AM
**Assigned**: Sarah (Tier 1)

## User Message
"I create tasks on my desktop but they don't show up on my phone.
I've tried refreshing and logging out/in. Still doesn't work."

## Tier 1 Response (10:45 AM)
"Hi John, thanks for reaching out!

I can help you troubleshoot this. Let's try a few things:

1. Are you logged in with the same account on both devices?
2. Is your phone connected to the internet?
3. Can you try force-closing the app and reopening?

Please let me know the results and I'll help further.

Best,
Sarah"

## User Reply (11:00 AM)
"Yes same account. Internet works. Force-closing didn't help.
Tasks I create on phone DO show on desktop though. One-way sync issue."

## Tier 1 Escalation (11:15 AM)
**Escalated to**: Tier 2 (Technical Support)
**Reason**: One-directional sync issue suggests technical problem
**Info gathered**:
- User: john@company.com
- Devices: Desktop (Chrome, Windows 11), Phone (iOS 17, native app)
- Sync direction: Desktop → Phone broken, Phone → Desktop works
- Started: Yesterday (2026-01-19)

## Tier 2 Investigation (11:30 AM)
```bash
# Check user's sync logs
SELECT * FROM sync_logs
WHERE user_id = 'john@company.com'
ORDER BY created_at DESC
LIMIT 20;

# Result: Desktop sync events missing "device_id"
# Root cause: Desktop app v1.0.1 has bug in sync event payload
```

## Tier 2 → Tier 3 Escalation (11:45 AM)
**Escalated to**: Engineering
**Bug**: Desktop app v1.0.1 not sending device_id in sync events
**Impact**: All desktop users (estimated 3,000 users)
**Severity**: P1 (High)
**Created**: GitHub issue #460

## Engineering Response (12:00 PM)
**Status**: Confirmed bug in desktop app v1.0.1
**Fix**: In progress (hotfix branch created)
**ETA**: Fix deployed within 2 hours

## Resolution (14:30 PM)
**Fix deployed**: Desktop app v1.0.2 released
**User notified**:
"Hi John,

We've identified and fixed the issue! It was a bug in the desktop app.

Please update to v1.0.2 (should auto-update when you reopen the app).
After updating, your tasks should sync properly.

Sorry for the inconvenience. Let me know if you still have issues.

Best,
Sarah"

**User confirmed**: "Works now, thanks!"
**Ticket closed**: 2026-01-20 15:00 PM
```

---

### 5. Performance Tuning

#### Performance Optimization Workflow

```markdown
# Performance Optimization

## 1. Identify Bottleneck

**Symptoms**:
- Users report slow loading
- p95 response time increased from 150ms to 350ms
- Database CPU at 80%

**Investigation**:
```sql
-- Find slow queries
SELECT
  query,
  mean_exec_time,
  calls
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Result: This query is slow (800ms average)
SELECT *
FROM tasks
WHERE user_id = $1
ORDER BY due_date DESC;

-- Explain plan
EXPLAIN ANALYZE
SELECT * FROM tasks WHERE user_id = 'abc123' ORDER BY due_date DESC;

-- Result: Sequential scan (no index on user_id)
```

## 2. Optimize

**Solution**: Add index on user_id

```sql
-- Create index
CREATE INDEX idx_tasks_user_id ON tasks(user_id);

-- Verify
EXPLAIN ANALYZE
SELECT * FROM tasks WHERE user_id = 'abc123' ORDER BY due_date DESC;

-- Result: Index scan (10ms) ✓
```

## 3. Deploy

```bash
# Create migration
npm run migration:create add-index-tasks-user-id

# migration file:
export async function up(db) {
  await db.raw('CREATE INDEX CONCURRENTLY idx_tasks_user_id ON tasks(user_id)');
}

# Deploy (CONCURRENTLY = no downtime)
npm run migration:run
```

## 4. Verify

**Before**:
- p95 response time: 350ms
- Database CPU: 80%

**After**:
- p95 response time: 120ms ✓ (66% improvement)
- Database CPU: 40% ✓

**Users**: Happy ✓
```

---

### 6. Security Patches

#### Security Patch Workflow

```markdown
# Security Patch Process

## 1. Vulnerability Detected

**Alert**: npm audit (automated, runs daily)

```bash
$ npm audit

found 1 high severity vulnerability

Package: jsonwebtoken
Vulnerable versions: < 9.0.0
Patched in: >= 9.0.0
Dependency of: our app (direct)
Path: jsonwebtoken
More info: https://github.com/advisories/GHSA-...

Vulnerability: JWT token validation bypass
```

## 2. Assess Impact

**Questions**:
- Do we use this library? **Yes** (for authentication)
- Are we vulnerable? **Check usage**

```typescript
// src/auth/jwt.ts
import jwt from 'jsonwebtoken';

// We use jwt.verify() which is affected ✓
// Impact: CRITICAL - authentication bypass possible
```

**Decision**: P0 - Fix immediately

## 3. Test Patch

```bash
# Create test branch
git checkout -b security/jsonwebtoken-upgrade

# Upgrade package
npm install jsonwebtoken@9.0.0

# Run tests
npm test
# All tests passing ✓

# Test authentication manually
npm run dev
# Login, API calls → Works ✓
```

## 4. Deploy

```bash
# Commit
git add package.json package-lock.json
git commit -m "security: upgrade jsonwebtoken to 9.0.0

Fixes authentication bypass vulnerability (GHSA-...)
CVE-2022-23529

npm audit: 1 high → 0
Tested: All auth tests passing
"

# Fast-track to production
git checkout main
git merge security/jsonwebtoken-upgrade
git push

# Deploy (triggers CI/CD)
# Deployed in 10 minutes ✓
```

## 5. Verify

```bash
# Verify in production
npm audit --production
# 0 vulnerabilities ✓

# Test authentication
curl -X POST https://taskflow.com/api/auth/login \
  -d '{"email":"test@example.com","password":"test"}'
# Works ✓
```

## 6. Document

```markdown
# Security Bulletin: JWT Vulnerability Patched

**Date**: 2026-01-20
**Severity**: High
**Impact**: Authentication bypass possible
**Status**: Patched

**Details**:
We identified and patched a vulnerability in the jsonwebtoken library.
No evidence of exploitation.
All users remain secure.

**Action Required**: None (automatically patched)
```
```

---

### 7. Backups & Disaster Recovery

#### Backup Strategy

```yaml
# backup-strategy.yaml

database:
  type: PostgreSQL
  backups:
    # Full backup
    full:
      schedule: "Daily at 2 AM UTC"
      retention: 30 days
      storage: AWS S3
      encryption: AES-256

    # Incremental backup
    incremental:
      schedule: "Every 6 hours"
      retention: 7 days

    # Point-in-time recovery
    wal_archiving:
      enabled: true
      retention: 7 days

  restore_testing:
    schedule: "Weekly"
    process: |
      1. Restore backup to test database
      2. Verify data integrity
      3. Test critical queries
      4. Document restore time

files:
  type: User uploads
  backups:
    schedule: "Daily at 3 AM UTC"
    retention: 90 days
    storage: AWS S3
    versioning: enabled

code:
  type: Git repository
  backups:
    primary: GitHub
    mirror: GitLab (automated)
    local: Daily clone to backup server

configuration:
  type: Environment variables, secrets
  backups:
    storage: 1Password (encrypted)
    documentation: In repository (without secrets)
```

#### Disaster Recovery Plan

```markdown
# Disaster Recovery Plan

## Scenarios

### Scenario 1: Database Corruption

**Detection**:
- Database health check fails
- Data inconsistency errors
- Replication lag alerts

**Recovery**:
```bash
# 1. Stop application
kubectl scale deployment app --replicas=0

# 2. Restore from latest backup
pg_restore -d taskflow_new backup-2026-01-20.sql

# 3. Verify data
psql taskflow_new -c "SELECT COUNT(*) FROM users;"
# Expected: ~10,000

# 4. Switch to restored database
kubectl set env deployment/app \
  DATABASE_URL=postgres://taskflow_new

# 5. Restart application
kubectl scale deployment app --replicas=3

# 6. Verify
curl https://taskflow.com/health
```

**RTO** (Recovery Time Objective): 1 hour
**RPO** (Recovery Point Objective): 6 hours (last incremental backup)

### Scenario 2: Complete AWS Region Outage

**Detection**:
- All services in us-east-1 unreachable
- AWS status page confirms region issue

**Recovery** (Failover to us-west-2):
```bash
# 1. Update DNS to point to DR region
aws route53 change-resource-record-sets \
  --hosted-zone-id Z123 \
  --change-batch '{
    "Changes": [{
      "Action": "UPSERT",
      "ResourceRecordSet": {
        "Name": "taskflow.com",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z456",
          "DNSName": "dr-lb-us-west-2.amazonaws.com"
        }
      }
    }]
  }'

# 2. Restore database from latest backup to DR region
# (Database replicated continuously to DR region)

# 3. Scale up DR environment
kubectl --context=us-west-2 scale deployment app --replicas=10

# 4. Verify
curl https://taskflow.com/health
# (DNS propagation: 5-10 minutes)
```

**RTO**: 15 minutes
**RPO**: Near-zero (continuous replication)
```

---

## 📦 Entregables de SUPPORT

```
monitoring/
├── dashboards/
│   ├── system-health.json
│   ├── application-metrics.json
│   └── user-activity.json
├── alerts/
│   ├── critical-alerts.yaml
│   ├── warning-alerts.yaml
│   └── info-alerts.yaml
└── runbooks/
    ├── incident-response.md
    ├── database-failover.md
    ├── rollback-procedure.md
    └── disaster-recovery.md

support/
├── tickets/
│   └── (Zendesk/Jira/etc)
├── knowledge-base/
│   ├── common-issues.md
│   ├── troubleshooting-guide.md
│   └── faq.md
└── escalation-procedures.md

backups/
├── database/
│   ├── full/
│   └── incremental/
├── files/
└── restore-tests/
    └── weekly-test-results.md

docs/
├── on-call-schedule.md
├── post-mortems/
│   ├── 2026-01-20-app-down.md
│   └── 2026-01-15-slow-performance.md
├── security-bulletins/
└── support-metrics.md
```

---

## ✅ Criterios de Salida

**SUPPORT no tiene criterios de salida tradicionales** (es ongoing).

En su lugar, métricas de éxito continuas:

### Métrica 1: Availability >= 99.9%
```
Uptime último mes: 99.95% ✓
Downtime: 21 minutes (allowed: 43 minutes)
```

### Métrica 2: Incident Response Time
```
P0: Avg 5 minutes to acknowledge ✓ (goal: < 5 min)
P1: Avg 30 minutes to resolve ✓ (goal: < 1 hour)
P2: Avg 3 hours to resolve ✓ (goal: < 4 hours)
```

### Métrica 3: Support Satisfaction
```
User satisfaction: 4.5/5 ✓ (goal: >= 4.0)
First response time: 2 hours avg ✓ (goal: < 4 hours)
Resolution rate: 85% at Tier 1 ✓ (goal: >= 80%)
```

### Métrica 4: Performance Stability
```
p95 response time: 150ms ✓ (goal: < 200ms)
Error rate: 0.2% ✓ (goal: < 1%)
No performance degradation ✓
```

---

## 🚨 Errores Comunes

### ❌ Error 1: No On-Call Rotation

**Problema**: Un solo engineer de guardia todo el tiempo

**Consecuencia**: Burnout, slow response, resignations

**Solución**: Rotating on-call schedule (1 week rotations)

---

### ❌ Error 2: No Post-Mortems

**Problema**: Incident happens, fix it, move on

**Consecuencia**: Same incident repeats, no learning

**Solución**: ALWAYS do post-mortem for P0/P1 incidents (blameless)

---

### ❌ Error 3: Reactive Only

**Problema**: Only fix things when they break

**Consecuencia**: Constant firefighting, no improvements

**Solución**: Reserve 20% time for proactive improvements

---

## 👥 Multi-Agente en SUPPORT

**Estrategia**: On-Call + Reactive

**Roles**:
- **On-Call Engineer**: First responder for incidents
- **Support Team**: User support tickets
- **DevOps**: Infrastructure monitoring
- **Dev Team**: Bug fixes and hotfixes

---

## ✅ Checklist de Operación

### Daily
- [ ] Check monitoring dashboards
- [ ] Review overnight alerts
- [ ] Triage new support tickets
- [ ] Review error logs (Sentry)

### Weekly
- [ ] Review metrics (uptime, performance, errors)
- [ ] On-call rotation handoff
- [ ] Backup restore test
- [ ] Security scan (npm audit)
- [ ] Review open bugs

### Monthly
- [ ] Support metrics report
- [ ] Incident review (count P0/P1/P2)
- [ ] Performance baseline update
- [ ] Cost analysis
- [ ] Team retrospective

---

**Versión**: 2.0.0
**Fase**: SUPPORT (v0.7.x)
**Última actualización**: 2026-01-06
**Próxima fase**: EVOLVE (v0.8.x)

**🔑 Key Takeaway**: Support is not a phase, it's a continuous commitment to your users.
