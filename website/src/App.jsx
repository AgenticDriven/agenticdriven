import { useState } from 'react'
import './App.css'

function App() {
  const [selectedPhase, setSelectedPhase] = useState(null)

  const principles = [
    {
      num: 1,
      title: "Agent-Driven",
      desc: "Humans decide strategy, AI executes",
      detail: "You define what needs to be done and why. AI agents handle the how, freeing you to focus on high-level decisions and creative work."
    },
    {
      num: 2,
      title: "Documentation-First",
      desc: "Document before, during, after",
      detail: "Clear documentation is essential for AI collaboration. Write docs before coding, update during work, and polish after completion."
    },
    {
      num: 3,
      title: "Phased & Structured",
      desc: "10 phases with clear objectives",
      detail: "From DEFINE to EVOLVE, each phase has specific goals and exit criteria. Know exactly where you are and what comes next."
    },
    {
      num: 4,
      title: "Validation-Driven",
      desc: "Validate before and after building",
      detail: "Test assumptions early, validate continuously. Catch issues before they become problems. Quality built-in, not bolted-on."
    },
    {
      num: 5,
      title: "Iterative",
      desc: "Improve within phases",
      detail: "Refinement is expected. Iterate quickly within phases, but document when you need to go back. Progress isn't always linear."
    },
    {
      num: 6,
      title: "Traceable",
      desc: "Every change in git with clear history",
      detail: "Complete audit trail of all changes. Know who changed what, when, and why. Essential for AI collaboration and team transparency."
    },
    {
      num: 7,
      title: "Git-First",
      desc: "Complete task = commit immediately",
      detail: "One logical change per commit. Clear messages using Conventional Commits. Commit when task is done and verified."
    },
    {
      num: 8,
      title: "Standards-First",
      desc: "Prefer rigid standards over custom solutions",
      detail: "Use Conventional Commits, semver, ISO-8601, JSON:API. Established patterns reduce decisions and improve AI understanding."
    },
    {
      num: 9,
      title: "Explicit over Implicit",
      desc: "No magic numbers, define everything",
      detail: "Named constants, clear variable names, explicit interfaces. Code that reads like documentation. AI and humans both benefit."
    },
    {
      num: 10,
      title: "Single Responsibility",
      desc: "One component = one purpose",
      detail: "Keep functions, files, and components focused. Easier to understand, test, and maintain. Simpler for AI to work with."
    },
    {
      num: 11,
      title: "Contract-Driven",
      desc: "Define interfaces before implementation",
      detail: "Specify exactly what you're building in docs/interfaces.md. Then implement to spec. No surprises, clear expectations."
    },
    {
      num: 12,
      title: "Test-First",
      desc: "Define success criteria upfront",
      detail: "Know what 'done' looks like before starting. Write tests or acceptance criteria first. Validate as you build."
    },
    {
      num: 13,
      title: "Proven Solutions",
      desc: "Use established patterns and frameworks",
      detail: "Don't reinvent the wheel. Leverage design patterns, proven frameworks, and standard structures. Build on solid foundations."
    }
  ]

  const phases = [
    {
      phase: "DEFINE",
      version: "v0.0.x",
      icon: "🎯",
      desc: "Define problem, objectives, scope",
      detail: "Start with clarity. What problem are you solving? What are your goals? What's in scope, what's not? Document constraints and success criteria. Foundation for everything that follows."
    },
    {
      phase: "DISCOVER",
      version: "v0.1.x",
      icon: "🔍",
      desc: "Investigate options, viability",
      detail: "Research and explore. Gather requirements, identify risks, assess feasibility. What already exists? What approaches are possible? Make informed decisions before committing."
    },
    {
      phase: "DESIGN",
      version: "v0.2.x",
      icon: "📐",
      desc: "Design solution, architecture",
      detail: "Plan before building. Design your solution, define architecture, specify interfaces. Make key decisions documented. Ready to implement with confidence."
    },
    {
      phase: "SETUP",
      version: "v0.3.x",
      icon: "⚙️",
      desc: "Prepare tools, environment",
      detail: "Get organized. Configure tools, set up environment, define validation criteria. Everything ready so you can focus on building."
    },
    {
      phase: "BUILD",
      version: "v0.4.x",
      icon: "🔨",
      desc: "Build/create solution",
      detail: "Time to create. Implement components, write code, develop content. Follow contracts, test as you go, document changes. Bulk of the work happens here."
    },
    {
      phase: "VALIDATE",
      version: "v0.5.x",
      icon: "✅",
      desc: "Verify quality, testing",
      detail: "Ensure quality. Run comprehensive tests, validate against criteria, check performance. Fix issues found. Only proceed when validation passes."
    },
    {
      phase: "MARKET",
      version: "v0.6.x",
      icon: "📢",
      desc: "Prepare launch materials",
      detail: "Get ready to share. Create marketing materials, prepare documentation, plan launch strategy. Build awareness before launch."
    },
    {
      phase: "LAUNCH",
      version: "v0.7.x",
      icon: "🚀",
      desc: "Deploy, activate, go-live",
      detail: "Make it public. Deploy to production, announce to users, monitor initial response. Launch day execution and immediate follow-up."
    },
    {
      phase: "SUPPORT",
      version: "v0.8.x",
      icon: "🛟",
      desc: "Maintain, fix issues",
      detail: "Keep it running. Handle bug reports, respond to users, maintain stability. Critical fixes and immediate support. Build confidence."
    },
    {
      phase: "EVOLVE",
      version: "v0.9.x",
      icon: "📈",
      desc: "Improve, optimize, grow",
      detail: "Make it better. Add features, optimize performance, respond to feedback. Plan next version. Continuous improvement cycle."
    }
  ]

  const ides = [
    { name: "Cursor", file: ".cursorrules", icon: "⚡" },
    { name: "Claude Code", file: ".clauderc", icon: "🤖" },
    { name: "Windsurf", file: ".windsurfrules", icon: "🌊" },
    { name: "GitHub Copilot", file: ".github/copilot-instructions.md", icon: "🐙" },
    { name: "Aider", file: ".aider.conf.yml", icon: "🎨" },
    { name: "Continue", file: ".continuerc.json", icon: "⏭️" }
  ]

  const benefits = [
    {
      icon: "🎯",
      title: "Clear Structure",
      desc: "Know exactly where you are in your project. No more wandering in the dark. Every phase has clear goals and exit criteria."
    },
    {
      icon: "🤝",
      title: "Better AI Collaboration",
      desc: "AI agents work best with structure. AD provides the framework for effective human-AI teamwork on any project."
    },
    {
      icon: "📚",
      title: "Built-in Documentation",
      desc: "Documentation isn't an afterthought. It's integrated into every phase. Your future self will thank you."
    },
    {
      icon: "🌍",
      title: "Universal Application",
      desc: "Not just for software. Use AD for content creation, marketing campaigns, event planning, research, and more."
    },
    {
      icon: "✨",
      title: "Quality Focused",
      desc: "Validation and testing built into the workflow. Catch issues early, deliver quality results consistently."
    },
    {
      icon: "🔄",
      title: "Iterative Progress",
      desc: "Improve within phases, document when going back. Real progress isn't linear, and AD acknowledges that."
    }
  ]

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-background"></div>
        <div className="container">
          <div className="hero-badge">Now Available</div>
          <h1 className="hero-title">
            Agentic Driven Workflow
            <span className="version-badge">1.0</span>
          </h1>
          <p className="hero-subtitle">
            The first AI-native methodology for structured development
          </p>
          <p className="hero-description">
            13 principles • 10 phases • Universal framework<br/>
            From idea to launch with AI agents
          </p>

          <div className="ai-logos">
            <div className="ai-logos-label">Works with leading AI assistants:</div>
            <div className="ai-logos-grid">
              <div className="ai-logo">
                <span className="ai-logo-icon">🤖</span>
                <span className="ai-logo-name">Claude</span>
              </div>
              <div className="ai-logo">
                <span className="ai-logo-icon">💬</span>
                <span className="ai-logo-name">ChatGPT</span>
              </div>
              <div className="ai-logo">
                <span className="ai-logo-icon">✨</span>
                <span className="ai-logo-name">Gemini</span>
              </div>
              <div className="ai-logo">
                <span className="ai-logo-icon">🔷</span>
                <span className="ai-logo-name">Copilot</span>
              </div>
              <div className="ai-logo">
                <span className="ai-logo-icon">🔮</span>
                <span className="ai-logo-name">Perplexity</span>
              </div>
            </div>
          </div>

          <div className="hero-cta">
            <a href="#quick-start" className="btn btn-primary">
              <span>Get Started</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href="https://github.com/AgenticDriven/agenticdriven" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">13</div>
              <div className="stat-label">Core Principles</div>
            </div>
            <div className="stat">
              <div className="stat-value">10</div>
              <div className="stat-label">Development Phases</div>
            </div>
            <div className="stat">
              <div className="stat-value">6</div>
              <div className="stat-label">IDE Integrations</div>
            </div>
          </div>

          <div className="ide-logos">
            <div className="ide-logos-label">Pre-configured for:</div>
            <div className="ide-logos-grid">
              {ides.map((ide) => (
                <div key={ide.name} className="ide-logo-item">
                  <span className="ide-logo-icon">{ide.icon}</span>
                  <span className="ide-logo-name">{ide.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* What is AD Section */}
      <section className="section what-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">What is Agentic Driven?</h2>
            <p className="section-intro">
              A structured methodology designed specifically for AI-agent collaboration
            </p>
          </div>

          <div className="what-content">
            <div className="what-main">
              <p className="lead">
                <strong>Agentic Driven (AD)</strong> is the first universal methodology created for the AI era.
                It provides clear structure through <strong>13 principles</strong> and <strong>10 phases</strong>
                that work for any project—software, content, marketing, events, and more.
              </p>
              <p>
                Traditional methodologies like Agile and Waterfall weren't designed for AI collaboration.
                They assume humans write code and make every decision. AD flips this:
                <strong> humans define strategy, AI executes</strong>.
              </p>
              <p>
                Whether you're building an app with Cursor, writing a book with Claude, or managing
                a project with Copilot, AD gives you the framework to work effectively with AI agents.
              </p>
            </div>

            <div className="what-features">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Clear Phases</h3>
                <p>10 phases from DEFINE to EVOLVE. Always know where you are and what comes next.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📋</div>
                <h3>Exit Criteria</h3>
                <p>Each phase has clear completion requirements. No guessing when to move forward.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>Documentation Built-in</h3>
                <p>Documentation isn't optional—it's integrated into every phase of the workflow.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>Universal Framework</h3>
                <p>Not just software. Use for any structured project in any domain.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section benefits-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Agentic Driven?</h2>
            <p className="section-intro">Built for the way you actually work with AI</p>
          </div>

          <div className="benefits-grid">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 Principles */}
      <section className="section principles-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">13 Core Principles</h2>
            <p className="section-intro">
              The foundation of effective AI collaboration
            </p>
          </div>

          <div className="principles-grid">
            {principles.map((p) => (
              <div key={p.num} className="principle-card">
                <div className="principle-header">
                  <div className="principle-number">{p.num}</div>
                  <h3 className="principle-title">{p.title}</h3>
                </div>
                <p className="principle-desc">{p.desc}</p>
                <p className="principle-detail">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Diagram */}
      <section className="section workflow-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The AD Workflow</h2>
            <p className="section-intro">
              From idea to launch in 10 structured phases
            </p>
          </div>

          <div className="workflow-diagram">
            {phases.map((phase, idx) => (
              <div key={idx} className="workflow-step">
                <div className="workflow-number">{idx + 1}</div>
                <div className="workflow-icon">{phase.icon}</div>
                <div className="workflow-name">{phase.phase}</div>
                <div className="workflow-version">{phase.version}</div>
                {idx < phases.length - 1 && (
                  <div className="workflow-arrow">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="workflow-legend">
            <div className="legend-item">
              <div className="legend-dot legend-start"></div>
              <span>Start Here</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot legend-progress"></div>
              <span>In Development</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot legend-launch"></div>
              <span>Launch Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* 10 Phases */}
      <section className="section phases-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Phase Details</h2>
            <p className="section-intro">
              Click any phase to learn more
            </p>
          </div>

          <div className="phases-timeline">
            {phases.map((phase, idx) => (
              <div
                key={idx}
                className={`phase-item ${selectedPhase === idx ? 'active' : ''}`}
                onClick={() => setSelectedPhase(selectedPhase === idx ? null : idx)}
              >
                <div className="phase-card">
                  <div className="phase-icon">{phase.icon}</div>
                  <div className="phase-info">
                    <div className="phase-header-row">
                      <span className="phase-name">{phase.phase}</span>
                      <span className="phase-version">{phase.version}</span>
                    </div>
                    <p className="phase-desc">{phase.desc}</p>
                    {selectedPhase === idx && (
                      <p className="phase-detail">{phase.detail}</p>
                    )}
                  </div>
                  <div className="phase-expand">
                    {selectedPhase === idx ? '−' : '+'}
                  </div>
                </div>
                {idx < phases.length - 1 && <div className="phase-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDE Configurations */}
      <section className="section ide-section" id="quick-start">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Quick Start</h2>
            <p className="section-intro">
              Pre-configured for your favorite AI IDE
            </p>
          </div>

          <div className="ide-grid">
            {ides.map((ide) => (
              <a
                key={ide.name}
                href={`https://raw.githubusercontent.com/AgenticDriven/agenticdriven/main/src/rules/ide/${ide.file}`}
                className="ide-card"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="ide-icon">{ide.icon}</div>
                <div className="ide-name">{ide.name}</div>
                <div className="ide-file">{ide.file}</div>
                <div className="ide-download">
                  <span>Download</span>
                  <span className="download-arrow">↓</span>
                </div>
              </a>
            ))}
          </div>

          <div className="install-script">
            <h3>Or use our quick install script:</h3>
            <div className="code-block">
              <code>curl -sSL https://agenticdriven.dev/download.sh | bash -s cursor</code>
              <button className="copy-btn" onClick={() => navigator.clipboard.writeText('curl -sSL https://agenticdriven.dev/download.sh | bash -s cursor')}>
                Copy
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section resources-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Learn More</h2>
            <p className="section-intro">
              Deep dive into the methodology
            </p>
          </div>

          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h3>Documentation</h3>
              <p>Complete methodology documentation, principles explained, and phase-by-phase guides.</p>
              <a href="https://github.com/AgenticDriven/agenticdriven#readme" className="resource-link" target="_blank" rel="noopener noreferrer">
                Read Docs →
              </a>
            </div>

            <div className="resource-card">
              <div className="resource-icon">💬</div>
              <h3>Community</h3>
              <p>Join discussions, share experiences, and get help from the AD community.</p>
              <a href="https://github.com/AgenticDriven/agenticdriven/discussions" className="resource-link" target="_blank" rel="noopener noreferrer">
                Join Discussions →
              </a>
            </div>

            <div className="resource-card resource-card-soon">
              <div className="resource-icon">📖</div>
              <div className="coming-soon-badge">Coming Soon</div>
              <h3>Books</h3>
              <p>Comprehensive guides covering AD methodology, best practices, and real-world examples.</p>
              <span className="resource-link disabled">
                Coming Soon
              </span>
            </div>

            <div className="resource-card resource-card-soon">
              <div className="resource-icon">🎓</div>
              <div className="coming-soon-badge">Coming Soon</div>
              <h3>Courses</h3>
              <p>Step-by-step video courses teaching you how to implement AD in your projects.</p>
              <span className="resource-link disabled">
                Coming Soon
              </span>
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
              <p className="footer-tagline">Built for the AI era</p>
            </div>
            <div className="footer-section">
              <h4>Resources</h4>
              <ul>
                <li><a href="https://github.com/AgenticDriven/agenticdriven" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://github.com/AgenticDriven/agenticdriven/tree/main/src/rules/ide" target="_blank" rel="noopener noreferrer">IDE Configs</a></li>
                <li><a href="#quick-start">Quick Start</a></li>
                <li><a href="https://github.com/AgenticDriven/agenticdriven#readme" target="_blank" rel="noopener noreferrer">Documentation</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Community</h4>
              <ul>
                <li><a href="https://github.com/AgenticDriven/agenticdriven/discussions" target="_blank" rel="noopener noreferrer">Discussions</a></li>
                <li><a href="https://github.com/AgenticDriven/agenticdriven/issues" target="_blank" rel="noopener noreferrer">Issues</a></li>
                <li><a href="https://github.com/AgenticDriven/agenticdriven/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">Contributing</a></li>
                <li><a href="https://github.com/AgenticDriven/agenticdriven/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License (MIT)</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Agentic Driven. Open Source under MIT License.</p>
            <p className="footer-built">Built using AD 1.0 itself (dogfooding from day one)</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
