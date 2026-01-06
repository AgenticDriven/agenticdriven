import './App.css'

function App() {
  const principles = [
    { num: 1, title: "Agent-Driven", desc: "Humans decide strategy, AI executes" },
    { num: 2, title: "Documentation-First", desc: "Document before, during, after" },
    { num: 3, title: "Phased & Structured", desc: "10 phases with clear objectives" },
    { num: 4, title: "Validation-Driven", desc: "Validate before building and what's built" },
    { num: 5, title: "Iterative", desc: "Improve within phases, document if going back" },
    { num: 6, title: "Traceable", desc: "Every change in git with clear history" },
    { num: 7, title: "Git-First", desc: "Complete + verify = commit immediately" },
    { num: 8, title: "Standards-First", desc: "Prefer rigid standards: Conventional Commits, semver" },
    { num: 9, title: "Explicit over Implicit", desc: "No magic numbers/strings, define terms" },
    { num: 10, title: "Single Responsibility", desc: "One component = one purpose" },
    { num: 11, title: "Contract-Driven", desc: "Define specs before implementation" },
    { num: 12, title: "Test-First", desc: "Define success criteria before starting" },
    { num: 13, title: "Proven Solutions First", desc: "Use established solutions and patterns" }
  ]

  const phases = [
    { phase: "DEFINE", version: "v0.0.x", desc: "Define problem, objectives, scope" },
    { phase: "DISCOVER", version: "v0.1.x", desc: "Investigate options, viability" },
    { phase: "DESIGN", version: "v0.2.x", desc: "Design solution, architecture" },
    { phase: "SETUP", version: "v0.3.x", desc: "Prepare tools, environment" },
    { phase: "BUILD", version: "v0.4.x", desc: "Build/create solution" },
    { phase: "VALIDATE", version: "v0.5.x", desc: "Verify quality, testing" },
    { phase: "MARKET", version: "v0.6.x", desc: "Prepare launch materials" },
    { phase: "LAUNCH", version: "v0.7.x", desc: "Deploy, activate, go-live" },
    { phase: "SUPPORT", version: "v0.8.x", desc: "Maintain, fix issues" },
    { phase: "EVOLVE", version: "v0.9.x", desc: "Improve, optimize, grow" }
  ]

  const ides = [
    { name: "Cursor", file: ".cursorrules" },
    { name: "Claude Code", file: ".clauderc" },
    { name: "Windsurf", file: ".windsurfrules" },
    { name: "GitHub Copilot", file: ".github/copilot-instructions.md" },
    { name: "Aider", file: ".aider.conf.yml" },
    { name: "Continue", file: ".continuerc.json" }
  ]

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <h1 className="hero-title">
            Agentic Driven
            <span className="version">1.0</span>
          </h1>
          <p className="hero-subtitle">
            AI-powered development methodology with 13 principles and 10 phases
          </p>
          <div className="hero-cta">
            <a href="#quick-start" className="btn btn-primary">Get Started</a>
            <a href="https://github.com/AgenticDriven/agenticdriven" className="btn btn-secondary">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </header>

      {/* What is AD Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">What is AD 1.0?</h2>
          <div className="what-is">
            <p>
              Agentic Driven (AD) is a structured methodology for building projects
              with AI agents. It combines proven software engineering practices with AI-first workflows,
              providing clear phases, exit criteria, and documentation standards.
            </p>
            <p>
              Whether you're building software, writing a book, launching a marketing campaign,
              or organizing an event, AD 1.0 provides a universal framework adaptable to any domain.
            </p>
          </div>
        </div>
      </section>

      {/* 13 Principles */}
      <section className="section principles-section">
        <div className="container">
          <h2 className="section-title">13 Core Principles</h2>
          <div className="principles-grid">
            {principles.map((p) => (
              <div key={p.num} className="principle-card">
                <div className="principle-number">{p.num}</div>
                <h3 className="principle-title">{p.title}</h3>
                <p className="principle-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Phases */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">10 Phases</h2>
          <div className="phases-grid">
            {phases.map((phase, idx) => (
              <div key={idx} className="phase-card">
                <div className="phase-header">
                  <span className="phase-name">{phase.phase}</span>
                  <span className="phase-version">{phase.version}</span>
                </div>
                <p className="phase-desc">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDE Configurations */}
      <section className="section ide-section" id="quick-start">
        <div className="container">
          <h2 className="section-title">Quick Start</h2>
          <p className="section-subtitle">Download pre-configured rules for your favorite IDE</p>
          <div className="ide-grid">
            {ides.map((ide) => (
              <a
                key={ide.name}
                href={`https://raw.githubusercontent.com/AgenticDriven/agenticdriven/main/src/rules/ide/${ide.file}`}
                className="ide-card"
                download
              >
                <div className="ide-name">{ide.name}</div>
                <div className="ide-file">{ide.file}</div>
              </a>
            ))}
          </div>
          <div className="quick-install">
            <p>Or use our quick install script:</p>
            <pre><code>curl -sSL https://raw.githubusercontent.com/AgenticDriven/agenticdriven/main/src/rules/ide/download.sh | bash -s cursor</code></pre>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section resources-section">
        <div className="container">
          <h2 className="section-title">Learn More</h2>
          <p className="section-subtitle">Books and courses to master AD 1.0</p>

          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h3>Books on Amazon</h3>
              <p>Comprehensive guides covering AD 1.0 methodology, best practices, and real-world examples.</p>
              <a href="https://amazon.com/dp/YOUR-BOOK-ID" className="resource-link">
                View on Amazon →
              </a>
            </div>

            <div className="resource-card">
              <div className="resource-icon">🎓</div>
              <h3>Courses on Udemy</h3>
              <p>Step-by-step video courses teaching you how to implement AD 1.0 in your projects.</p>
              <a href="https://udemy.com/course/YOUR-COURSE-ID" className="resource-link">
                Enroll on Udemy →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>AD 1.0</h4>
              <p>Agentic Driven methodology</p>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="https://github.com/AgenticDriven/agenticdriven">GitHub</a></li>
                <li><a href="https://github.com/AgenticDriven/agenticdriven/tree/main/src/rules/ide">IDE Configs</a></li>
                <li><a href="#quick-start">Quick Start</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Learn</h4>
              <ul>
                <li><a href="https://amazon.com/dp/YOUR-BOOK-ID">Books</a></li>
                <li><a href="https://udemy.com/course/YOUR-COURSE-ID">Courses</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Agentic Driven. Open Source.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
