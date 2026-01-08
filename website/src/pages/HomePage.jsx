import { useLanguage } from '../i18n/LanguageContext'
import { useState } from 'react'

function HomePage({ onNavigate, onSelectIDE }) {
  const { t } = useLanguage()
  const [selectedWorkflowPhase, setSelectedWorkflowPhase] = useState(null)

  const ides = [
    { name: "Cursor", file: ".cursorrules", icon: "⚡" },
    { name: "Claude Code", file: "claude.md", icon: "🤖" },
    { name: "Windsurf", file: ".windsurfrules", icon: "🌊" },
    { name: "GitHub Copilot", file: ".github/copilot-instructions.md", icon: "🐙" },
    { name: "Aider", file: ".aider.conf.yml", icon: "🎨" },
    { name: "Continue", file: ".continuerc.json", icon: "⏭️" }
  ]

  return (
    <>
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-background"></div>
        <div className="container">
          <h1 className="hero-title">
            {t('hero.title')}
            <span className="version-badge">{t('hero.version')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <p className="hero-description" dangerouslySetInnerHTML={{ __html: t('hero.description') }}></p>

          <div className="ai-logos">
            <div className="ai-logos-label">{t('hero.aiLabel')}</div>
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
              <span>{t('hero.cta.getStarted')}</span>
              <span className="btn-arrow">→</span>
            </a>
            <button onClick={() => onNavigate('rules')} className="btn btn-secondary">
              <span>📖</span>
              <span>{t('hero.cta.viewRules')}</span>
            </button>
            <a href="https://github.com/AgenticDriven/agenticdriven" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
              <span>{t('hero.cta.github')}</span>
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">13</div>
              <div className="stat-label">{t('hero.stats.principles')}</div>
            </div>
            <div className="stat">
              <div className="stat-value">10</div>
              <div className="stat-label">{t('hero.stats.phases')}</div>
            </div>
            <div className="stat">
              <div className="stat-value">6</div>
              <div className="stat-label">{t('hero.stats.integrations')}</div>
            </div>
          </div>

          <div className="ide-logos">
            <div className="ide-logos-label">{t('hero.ideLabel')}</div>
            <div className="ide-logos-grid">
              {ides.map((ide) => (
                <div
                  key={ide.name}
                  className="ide-logo-item clickable"
                  onClick={() => onSelectIDE(ide)}
                >
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
            <h2 className="section-title">{t('what.title')}</h2>
            <p className="section-intro">
              {t('what.subtitle')}
            </p>
          </div>

          <div className="what-content">
            <div className="what-main">
              <p className="lead" dangerouslySetInnerHTML={{ __html: t('what.lead') }}></p>
              <p dangerouslySetInnerHTML={{ __html: t('what.p1') }}></p>
              <p>{t('what.p2')}</p>
            </div>

            <div className="what-features">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>{t('what.features.phases.title')}</h3>
                <p>{t('what.features.phases.desc')}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📋</div>
                <h3>{t('what.features.exitCriteria.title')}</h3>
                <p>{t('what.features.exitCriteria.desc')}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📚</div>
                <h3>{t('what.features.documentation.title')}</h3>
                <p>{t('what.features.documentation.desc')}</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🌍</div>
                <h3>{t('what.features.universal.title')}</h3>
                <p>{t('what.features.universal.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Human-AI Collaboration Visual */}
      <section className="section collaboration-visual-section">
        <div className="container">
          <h2 className="section-title">{t('collaboration.title')}</h2>

          <div className="collaboration-flow">
            <div className="collaboration-box human">
              <span className="collaboration-icon">🧠</span>
              <div className="collaboration-label">{t('collaboration.human.label')}</div>
              <div className="collaboration-role">{t('collaboration.human.role')}</div>
              <div className="collaboration-details">{t('collaboration.human.details')}</div>
            </div>

            <div className="collaboration-arrow">→</div>

            <div className="collaboration-box ai">
              <div className="collaboration-icon-circle">
                <span className="ai-mini-icon">🤖</span>
                <span className="ai-mini-icon">💬</span>
                <span className="ai-mini-icon">✨</span>
                <span className="ai-mini-icon">🔷</span>
                <span className="ai-mini-icon">🔮</span>
              </div>
              <div className="collaboration-label">{t('collaboration.ai.label')}</div>
              <div className="collaboration-role">{t('collaboration.ai.role')}</div>
              <div className="collaboration-details">{t('collaboration.ai.details')}</div>
            </div>
          </div>

          <div className="collaboration-emphasis" dangerouslySetInnerHTML={{ __html: t('collaboration.emphasis') }}></div>
        </div>
      </section>

      {/* Quick Overview - Principles, Phases, Benefits */}
      <section className="section overview-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('home.overview.title')}</h2>
            <p className="section-intro">{t('home.overview.subtitle')}</p>
          </div>

          <div className="overview-grid">
            <div className="overview-card" onClick={() => onNavigate('rules')}>
              <div className="overview-icon">⚡</div>
              <h3>{t('home.overview.principles.title')}</h3>
              <p>{t('home.overview.principles.desc')}</p>
              <div className="overview-link">
                {t('home.overview.learnMore')} →
              </div>
            </div>

            <div className="overview-card" onClick={() => onNavigate('rules')}>
              <div className="overview-icon">🎯</div>
              <h3>{t('home.overview.phases.title')}</h3>
              <p>{t('home.overview.phases.desc')}</p>
              <div className="overview-link">
                {t('home.overview.learnMore')} →
              </div>
            </div>

            <div className="overview-card" onClick={() => onNavigate('rules')}>
              <div className="overview-icon">💎</div>
              <h3>{t('home.overview.git.title')}</h3>
              <p>{t('home.overview.git.desc')}</p>
              <div className="overview-link">
                {t('home.overview.learnMore')} →
              </div>
            </div>
          </div>

          <div className="view-full-rules">
            <button onClick={() => onNavigate('rules')} className="btn btn-primary btn-large">
              <span>📖</span>
              <span>{t('home.overview.viewFullRules')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* IDE Configurations */}
      <section className="section ide-section" id="quick-start">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('quickStart.title')}</h2>
            <p className="section-intro">
              {t('quickStart.subtitle')}
            </p>
          </div>

          <div className="ide-grid">
            {ides.map((ide) => (
              <div
                key={ide.name}
                className="ide-card clickable"
                onClick={() => onSelectIDE(ide)}
              >
                <div className="ide-icon">{ide.icon}</div>
                <div className="ide-name">{ide.name}</div>
                <div className="ide-file">{ide.file}</div>
                <div className="ide-download">
                  <span>{t('quickStart.getConfig')}</span>
                  <span className="download-arrow">↓</span>
                </div>
              </div>
            ))}
          </div>

          <div className="install-script">
            <h3>{t('quickStart.installTitle')}</h3>
            <div className="script-options">
              {ides.map((ide) => {
                const ideParam = ide.name.toLowerCase().replace(/\s+/g, '-').replace('github-', '').replace('claude-code', 'claude');
                const command = `curl -sSL https://agenticdriven.dev/download.sh | bash -s ${ideParam}`;
                return (
                  <div key={ide.name} className="script-option">
                    <div className="script-option-header">
                      <span className="script-option-icon">{ide.icon}</span>
                      <span className="script-option-name">{ide.name}</span>
                    </div>
                    <div className="code-block-mini">
                      <code>{command}</code>
                      <button
                        className="copy-btn-mini"
                        onClick={() => navigator.clipboard.writeText(command)}
                        title={t('quickStart.copyCommand')}
                      >
                        📋
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section resources-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('resources.title')}</h2>
            <p className="section-intro">
              {t('resources.subtitle')}
            </p>
          </div>

          <div className="resources-grid">
            <div className="resource-card" onClick={() => onNavigate('rules')}>
              <div className="resource-icon">📖</div>
              <h3>{t('resources.items.fullRules.title')}</h3>
              <p>{t('resources.items.fullRules.desc')}</p>
              <span className="resource-link">
                {t('resources.items.fullRules.link')}
              </span>
            </div>

            <div className="resource-card">
              <div className="resource-icon">📚</div>
              <h3>{t('resources.items.docs.title')}</h3>
              <p>{t('resources.items.docs.desc')}</p>
              <a href="https://github.com/AgenticDriven/agenticdriven#readme" className="resource-link" target="_blank" rel="noopener noreferrer">
                {t('resources.items.docs.link')}
              </a>
            </div>

            <div className="resource-card">
              <div className="resource-icon">💬</div>
              <h3>{t('resources.items.community.title')}</h3>
              <p>{t('resources.items.community.desc')}</p>
              <a href="https://github.com/AgenticDriven/agenticdriven/discussions" className="resource-link" target="_blank" rel="noopener noreferrer">
                {t('resources.items.community.link')}
              </a>
            </div>

            <div className="resource-card resource-card-soon">
              <div className="resource-icon">📖</div>
              <div className="coming-soon-badge">{t('resources.items.books.comingSoon')}</div>
              <h3>{t('resources.items.books.title')}</h3>
              <p>{t('resources.items.books.desc')}</p>
              <span className="resource-link disabled">
                {t('resources.items.books.comingSoon')}
              </span>
            </div>

            <div className="resource-card resource-card-soon">
              <div className="resource-icon">🎓</div>
              <div className="coming-soon-badge">{t('resources.items.courses.comingSoon')}</div>
              <h3>{t('resources.items.courses.title')}</h3>
              <p>{t('resources.items.courses.desc')}</p>
              <span className="resource-link disabled">
                {t('resources.items.courses.comingSoon')}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
