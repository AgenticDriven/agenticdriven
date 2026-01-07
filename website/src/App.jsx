import { useState } from 'react'
import './App.css'
import { useLanguage } from './i18n/LanguageContext'
import LanguageSelector from './components/LanguageSelector'

function App() {
  const { t } = useLanguage()
  const [selectedWorkflowPhase, setSelectedWorkflowPhase] = useState(null)
  const [selectedIDE, setSelectedIDE] = useState(null)

  const ides = [
    { name: "Cursor", file: ".cursorrules", icon: "⚡" },
    { name: "Claude Code", file: ".clauderc", icon: "🤖" },
    { name: "Windsurf", file: ".windsurfrules", icon: "🌊" },
    { name: "GitHub Copilot", file: ".github/copilot-instructions.md", icon: "🐙" },
    { name: "Aider", file: ".aider.conf.yml", icon: "🎨" },
    { name: "Continue", file: ".continuerc.json", icon: "⏭️" }
  ]

  return (
    <div className="app">
      {/* Hero Section */}
      {/* Language Selector - Fixed Top Right */}
      <LanguageSelector />

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
                  onClick={() => setSelectedIDE(ide)}
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

      {/* Benefits Section */}
      <section className="section benefits-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('benefits.title')}</h2>
            <p className="section-intro">{t('benefits.subtitle')}</p>
          </div>

          <div className="benefits-grid">
            {['structure', 'collaboration', 'documentation', 'universal', 'quality', 'iterative'].map((key) => (
              <div key={key} className="benefit-card">
                <div className="benefit-icon">{key === 'structure' ? '🎯' : key === 'collaboration' ? '🤝' : key === 'documentation' ? '📚' : key === 'universal' ? '🌍' : key === 'quality' ? '✨' : '🔄'}</div>
                <h3>{t(`benefits.items.${key}.title`)}</h3>
                <p>{t(`benefits.items.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Git Flow Section */}
      <section className="section git-flow-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('gitFlow.title')}</h2>
            <p className="section-intro">{t('gitFlow.subtitle')}</p>
          </div>

          <p className="git-flow-intro">{t('gitFlow.intro')}</p>

          <div className="git-flow-grid">
            {['noLoss', 'clarity', 'noDegradation', 'collaboration'].map((key) => (
              <div key={key} className="git-flow-card">
                <div className="git-flow-icon">{key === 'noLoss' ? '💾' : key === 'clarity' ? '🔍' : key === 'noDegradation' ? '✅' : '🤝'}</div>
                <h3>{t(`gitFlow.items.${key}.title`)}</h3>
                <p>{t(`gitFlow.items.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13 Principles */}
      <section className="section principles-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('principles.title')}</h2>
            <p className="section-intro">
              {t('principles.subtitle')}
            </p>
          </div>

          <div className="principles-grid">
            {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => (
              <div key={num} className="principle-card">
                <div className="principle-header">
                  <div className="principle-number">{num}</div>
                  <h3 className="principle-title">{t(`principles.items.${num}.title`)}</h3>
                </div>
                <p className="principle-desc">{t(`principles.items.${num}.desc`)}</p>
                <p className="principle-detail">{t(`principles.items.${num}.detail`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Diagram */}
      <section className="section workflow-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('workflow.title')}</h2>
            <p className="section-intro">
              {t('workflow.subtitle')}
            </p>
          </div>

          <div className="workflow-diagram">
            {['define', 'discover', 'design', 'setup', 'build', 'validate', 'market', 'launch', 'support', 'evolve'].map((phaseKey, idx) => {
              let phaseClass = 'workflow-step';

              if (selectedWorkflowPhase !== null) {
                if (idx < selectedWorkflowPhase) {
                  phaseClass += ' completed';
                } else if (idx === selectedWorkflowPhase) {
                  phaseClass += ' current';
                } else {
                  phaseClass += ' pending';
                }
              }

              return (
                <div
                  key={idx}
                  className={phaseClass}
                  onClick={() => setSelectedWorkflowPhase(idx)}
                >
                  <div className="workflow-number">{idx + 1}</div>
                  <div className="workflow-icon">{['🎯', '🔍', '📐', '⚙️', '🔨', '✅', '📢', '🚀', '🛟', '📈'][idx]}</div>
                  <div className="workflow-name">{t(`workflow.phases.${phaseKey}.name`)}</div>
                  <div className="workflow-version">{t(`workflow.phases.${phaseKey}.version`)}</div>
                  {idx < 9 && (
                    <div className="workflow-arrow">→</div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedWorkflowPhase !== null && (
            <div className="workflow-detail">
              <div className="workflow-detail-header">
                <span className="workflow-detail-icon">{['🎯', '🔍', '📐', '⚙️', '🔨', '✅', '📢', '🚀', '🛟', '📈'][selectedWorkflowPhase]}</span>
                <h3 className="workflow-detail-title">
                  {t(`workflow.phases.${['define', 'discover', 'design', 'setup', 'build', 'validate', 'market', 'launch', 'support', 'evolve'][selectedWorkflowPhase]}.name`)}
                  <span className="workflow-detail-version">{t(`workflow.phases.${['define', 'discover', 'design', 'setup', 'build', 'validate', 'market', 'launch', 'support', 'evolve'][selectedWorkflowPhase]}.version`)}</span>
                </h3>
              </div>
              <p className="workflow-detail-desc">{t(`workflow.phases.${['define', 'discover', 'design', 'setup', 'build', 'validate', 'market', 'launch', 'support', 'evolve'][selectedWorkflowPhase]}.desc`)}</p>
              <p className="workflow-detail-text">{t(`workflow.phases.${['define', 'discover', 'design', 'setup', 'build', 'validate', 'market', 'launch', 'support', 'evolve'][selectedWorkflowPhase]}.detail`)}</p>
            </div>
          )}
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
                onClick={() => setSelectedIDE(ide)}
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

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>{t('footer.title')}</h4>
              <p>{t('footer.subtitle')}</p>
              <p className="footer-tagline">{t('footer.tagline')}</p>
            </div>
            <div className="footer-section">
              <h4>{t('footer.sections.resources.title')}</h4>
              <ul>
                <li><a href="https://github.com/AgenticDriven/agenticdriven" target="_blank" rel="noopener noreferrer">{t('footer.sections.resources.github')}</a></li>
                <li><a href="https://github.com/AgenticDriven/agenticdriven/tree/main/src/rules/ide" target="_blank" rel="noopener noreferrer">{t('footer.sections.resources.configs')}</a></li>
                <li><a href="#quick-start">{t('footer.sections.resources.quickStart')}</a></li>
                <li><a href="https://github.com/AgenticDriven/agenticdriven#readme" target="_blank" rel="noopener noreferrer">{t('footer.sections.resources.docs')}</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>{t('footer.sections.community.title')}</h4>
              <ul>
                <li><a href="https://github.com/AgenticDriven/agenticdriven/discussions" target="_blank" rel="noopener noreferrer">{t('footer.sections.community.discussions')}</a></li>
                <li><a href="https://github.com/AgenticDriven/agenticdriven/issues" target="_blank" rel="noopener noreferrer">{t('footer.sections.community.issues')}</a></li>
                <li><a href="https://github.com/AgenticDriven/agenticdriven/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">{t('footer.sections.community.contributing')}</a></li>
                <li><a href="https://github.com/AgenticDriven/agenticdriven/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">{t('footer.sections.community.license')}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t('footer.copyright')}</p>
            <p className="footer-built">{t('footer.built')}</p>
          </div>
        </div>
      </footer>

      {/* IDE Download Modal */}
      {selectedIDE && (
        <div className="modal-overlay" onClick={() => setSelectedIDE(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedIDE(null)}>
              ×
            </button>
            <div className="modal-header">
              <span className="modal-icon">{selectedIDE.icon}</span>
              <h3 className="modal-title">{selectedIDE.name}</h3>
            </div>
            <p className="modal-desc">{t('modal.chooseAction')}</p>
            <div className="modal-filename">{selectedIDE.file}</div>
            <div className="modal-actions">
              <a
                href={`https://raw.githubusercontent.com/AgenticDriven/agenticdriven/main/src/rules/ide/${selectedIDE.file}`}
                className="modal-btn modal-btn-view"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>👁️</span>
                <span>{t('modal.viewRaw')}</span>
              </a>
              <a
                href={`https://github.com/AgenticDriven/agenticdriven/raw/main/src/rules/ide/${selectedIDE.file}`}
                className="modal-btn modal-btn-download"
                download={selectedIDE.file.split('/').pop()}
              >
                <span>⬇️</span>
                <span>{t('modal.download')}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
