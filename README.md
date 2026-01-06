# Agent-Driven Development (ADD) 1.0

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com/agenticdriven/add)

**Universal methodology for structured AI-assisted development**

ADD (Agent-Driven Development) is a structured methodology for building projects with AI agents. It combines proven engineering practices with AI-first workflows, providing clear phases, exit criteria, and documentation standards.

🌐 **Website**: [agenticdriven.dev](https://agenticdriven.dev) (coming soon)

## ✨ Features

- **13 Core Principles** - From Agent-Driven to Proven Solutions First
- **10 Clear Phases** - DEFINE → DISCOVER → DESIGN → SETUP → BUILD → VALIDATE → MARKET → LAUNCH → SUPPORT → EVOLVE
- **Universal** - Works for software, books, marketing, events, products, and more
- **Phase-based Versioning** - `v0.PHASE.ITERATION` format
- **Multi-Agent Ready** - Built-in support for parallel agent collaboration
- **IDE Integrations** - Pre-configured for Cursor, Claude Code, Windsurf, GitHub Copilot, Aider, Continue

## 🚀 Quick Start

### 1. Download IDE Configuration

```bash
# For Cursor
curl -sSL https://agenticdriven.dev/rules/ide/download.sh | bash -s cursor

# For Claude Code
curl -sSL https://agenticdriven.dev/rules/ide/download.sh | bash -s claude

# Other IDEs: windsurf, copilot, aider, continue
```

### 2. Initialize Project

```bash
git init
echo "# My Project" > README.md
mkdir -p docs src tests
touch docs/journal.md
git add .
git commit -m "chore: initialize ADD project"
git tag -a v0.0.0 -m "Initial commit"
```

### 3. Start First Phase

```bash
# Create phase documentation
echo "# DEFINE Phase" > docs/problem-statement.md
# Work on your project following ADD principles
git commit -m "feat: define project objectives"
git tag -a v0.0.1 -m "DEFINE iteration 1"
```

## 📚 13 Core Principles

1. **Agent-Driven** - Humans decide strategy, AI executes
2. **Documentation-First** - Document before, during, after
3. **Phased & Structured** - 10 phases with clear objectives and exit criteria
4. **Validation-Driven** - Validate before building and what's built
5. **Iterative** - Improve within phases, document if going back
6. **Traceable** - Every change in git with clear history
7. **Git-First** - Complete + verify = commit immediately
8. **Standards-First** - Prefer rigid standards (Conventional Commits, semver, ISO-8601)
9. **Explicit over Implicit** - No magic numbers/strings, define terms
10. **Single Responsibility** - One component = one purpose
11. **Contract-Driven** - Define specifications before implementation
12. **Test-First** - Define success criteria before starting
13. **Proven Solutions First** - Use established solutions and patterns

## 🔄 10 Phases

```
v0.0.x → DEFINE      Define problem, objectives, scope
v0.1.x → DISCOVER    Investigate options, viability
v0.2.x → DESIGN      Design solution, architecture
v0.3.x → SETUP       Prepare tools, environment
v0.4.x → BUILD       Build/create solution
v0.5.x → VALIDATE    Verify quality, testing
v0.6.x → MARKET      Prepare launch materials
v0.7.x → LAUNCH      Deploy, activate, go-live
v0.8.x → SUPPORT     Maintain, fix issues
v0.9.x → EVOLVE      Improve, optimize, grow
v1.0.0 → RELEASE     First stable version
```

## 🏗️ Project Structure

```
project-root/
├── README.md
├── add.yaml           # Optional, multi-agent only
├── docs/
│   ├── journal.md     # Daily progress log
│   ├── decisions.md   # Architecture Decision Records
│   ├── interfaces.md  # Contracts (multi-agent)
│   └── ...
├── src/               # Adapt by domain
├── tests/             # Adapt by domain
└── assets/            # Optional
```

## 🌍 Universal Domains

ADD 1.0 works for any domain:

- **Software** - Backend, frontend, APIs, mobile apps
- **Books** - Chapters, editing, publishing
- **Marketing** - Campaigns, content, analytics
- **Events** - Planning, logistics, promotion
- **Products** - Design, prototyping, manufacturing
- And more...

## 📖 Documentation

- **[Rules](src/rules/)** - Complete ADD 1.0 rules in markdown
- **[IDE Configs](src/rules/ide/)** - Pre-generated IDE configurations
- **[Website](website/)** - Official website source code
- **[Deployment Guide](DEPLOYMENT.md)** - How to deploy the website

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting PRs.

- Report bugs via [Issues](https://github.com/agenticdriven/add/issues)
- Suggest features via [Issues](https://github.com/agenticdriven/add/issues)
- Submit improvements via [Pull Requests](https://github.com/agenticdriven/add/pulls)
- Ask questions in [Discussions](https://github.com/agenticdriven/add/discussions)

## 📚 Learn More

- **Books**: Available on [Amazon](https://amazon.com/dp/YOUR-BOOK-ID) (coming soon)
- **Courses**: Available on [Udemy](https://udemy.com/course/YOUR-COURSE-ID) (coming soon)
- **Website**: [agenticdriven.dev](https://agenticdriven.dev) (coming soon)

## 📋 Requirements

- Git for version control
- AI IDE (Cursor, Claude Code, Windsurf, etc.) or AI assistant
- Your domain-specific tools (Node.js, Python, etc. for software)

## 🔒 Security

Please report security vulnerabilities to security@agenticdriven.dev or via [private security advisory](https://github.com/agenticdriven/add/security/advisories).

See [SECURITY.md](SECURITY.md) for details.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by proven software engineering methodologies
- Built for the AI-first development era
- Community-driven and open source

## 📊 Status

Version: **1.0**
Status: **Active Development**
Last Updated: 2026-01-06

---

**Made with ❤️ for the ADD community**

[Website](https://agenticdriven.dev) • [GitHub](https://github.com/agenticdriven/add) • [Issues](https://github.com/agenticdriven/add/issues) • [Discussions](https://github.com/agenticdriven/add/discussions)
