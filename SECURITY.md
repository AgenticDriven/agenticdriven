# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in ADD 1.0, please report it by:

1. **DO NOT** create a public GitHub issue
2. Email: security@agenticdriven.dev (or create a private security advisory on GitHub)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Release**: Depends on severity
  - Critical: Within 7 days
  - High: Within 30 days
  - Medium: Within 90 days
  - Low: Next regular release

## Security Best Practices

When using ADD 1.0:

1. **Never commit secrets**: Don't commit API keys, passwords, tokens to `docs/` or anywhere
2. **Review IDE configs**: Check generated `.cursorrules`, `claude.md` etc. before committing
3. **Validate inputs**: If building tools that generate code, validate all inputs
4. **Keep dependencies updated**: Regularly update project dependencies
5. **Follow principle of least privilege**: AI agents should only access what they need

## Disclosure Policy

Once a vulnerability is fixed:

1. We will release a security advisory
2. Credit will be given to the reporter (if desired)
3. Details will be published after users have time to update

## Comments on This Policy

If you have suggestions for improving this policy, please submit a pull request.
