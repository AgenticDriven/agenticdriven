import { useLanguage } from '../i18n/LanguageContext'

function RulesPage({ onNavigate }) {
  const { t } = useLanguage()

  return (
    <div className="rules-page">
      {/* Navigation Header */}
      <div className="rules-header">
        <div className="container">
          <button onClick={() => onNavigate('home')} className="back-button">
            ← {t('rules.backToHome')}
          </button>
          <h1 className="rules-title">{t('rules.title')}</h1>
          <p className="rules-subtitle">{t('rules.subtitle')}</p>
        </div>
      </div>

      <div className="rules-content">
        <div className="container">
          {/* Table of Contents */}
          <nav className="rules-toc">
            <h3>{t('rules.toc.title')}</h3>
            <ul>
              <li><a href="#principles">{t('rules.toc.principles')}</a></li>
              <li><a href="#phases">{t('rules.toc.phases')}</a></li>
              <li><a href="#versioning">{t('rules.toc.versioning')}</a></li>
              <li><a href="#git-commits">{t('rules.toc.gitCommits')}</a></li>
              <li><a href="#project-structure">{t('rules.toc.projectStructure')}</a></li>
            </ul>
          </nav>

          {/* Principles Section */}
          <section id="principles" className="rules-section">
            <h2 className="rules-section-title">{t('principles.title')}</h2>
            <p className="rules-intro">{t('principles.intro')}</p>

            {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => (
              <div key={num} className="rule-item">
                <div className="rule-header">
                  <span className="rule-number">{num}</span>
                  <h3 className="rule-title">{t(`principles.items.${num}.title`)}</h3>
                </div>
                <p className="rule-desc"><strong>{t(`principles.items.${num}.desc`)}</strong></p>
                <p className="rule-detail">{t(`principles.items.${num}.detail`)}</p>
              </div>
            ))}
          </section>

          {/* Phases Section */}
          <section id="phases" className="rules-section">
            <h2 className="rules-section-title">{t('workflow.title')}</h2>
            <p className="rules-intro">{t('workflow.intro')}</p>

            {['define', 'discover', 'design', 'setup', 'build', 'validate', 'market', 'launch', 'support', 'evolve'].map((phaseKey, idx) => (
              <div key={idx} className="rule-item">
                <div className="rule-header">
                  <span className="rule-number">{idx + 1}</span>
                  <span className="phase-icon">{['🎯', '🔍', '📐', '⚙️', '🔨', '✅', '📢', '🚀', '🛟', '📈'][idx]}</span>
                  <h3 className="rule-title">{t(`workflow.phases.${phaseKey}.name`)}</h3>
                  <span className="phase-version">{t(`workflow.phases.${phaseKey}.version`)}</span>
                </div>
                <p className="rule-desc"><strong>{t(`workflow.phases.${phaseKey}.desc`)}</strong></p>
                <p className="rule-detail">{t(`workflow.phases.${phaseKey}.detail`)}</p>
              </div>
            ))}
          </section>

          {/* Versioning Section */}
          <section id="versioning" className="rules-section">
            <h2 className="rules-section-title">{t('rules.versioning.title')}</h2>
            <p className="rules-intro">{t('rules.versioning.intro')}</p>

            <div className="rule-item">
              <h3 className="rule-title">{t('rules.versioning.prerelease.title')}</h3>
              <p className="rule-detail">{t('rules.versioning.prerelease.desc')}</p>
              <div className="code-example">
                <code>{t('rules.versioning.prerelease.example')}</code>
              </div>
            </div>

            <div className="rule-item">
              <h3 className="rule-title">{t('rules.versioning.release.title')}</h3>
              <p className="rule-detail">{t('rules.versioning.release.desc')}</p>
              <div className="code-example">
                <code>{t('rules.versioning.release.example')}</code>
              </div>
            </div>
          </section>

          {/* Git Commits Section */}
          <section id="git-commits" className="rules-section">
            <h2 className="rules-section-title">{t('rules.gitCommits.title')}</h2>
            <p className="rules-intro">{t('rules.gitCommits.intro')}</p>

            <div className="rule-item">
              <h3 className="rule-title">{t('rules.gitCommits.format.title')}</h3>
              <p className="rule-detail">{t('rules.gitCommits.format.desc')}</p>
              <div className="code-example">
                <code>{t('rules.gitCommits.format.example')}</code>
              </div>
            </div>

            <div className="rule-item">
              <h3 className="rule-title">{t('rules.gitCommits.types.title')}</h3>
              <p className="rule-detail">{t('rules.gitCommits.types.desc')}</p>
              <div className="types-list">
                <span className="type-badge">feat</span>
                <span className="type-badge">fix</span>
                <span className="type-badge">docs</span>
                <span className="type-badge">chore</span>
                <span className="type-badge">test</span>
                <span className="type-badge">refactor</span>
                <span className="type-badge">perf</span>
                <span className="type-badge">style</span>
                <span className="type-badge">ci</span>
                <span className="type-badge">build</span>
              </div>
            </div>
          </section>

          {/* Project Structure Section */}
          <section id="project-structure" className="rules-section">
            <h2 className="rules-section-title">{t('rules.projectStructure.title')}</h2>
            <p className="rules-intro">{t('rules.projectStructure.intro')}</p>

            <div className="code-example code-example-large">
              <pre>{t('rules.projectStructure.example')}</pre>
            </div>

            <div className="rule-item">
              <h3 className="rule-title">{t('rules.projectStructure.files.title')}</h3>
              <ul className="rule-list">
                <li><strong>README.md</strong>: {t('rules.projectStructure.files.readme')}</li>
                <li><strong>adw.yaml</strong>: {t('rules.projectStructure.files.adw')}</li>
                <li><strong>docs/journal.md</strong>: {t('rules.projectStructure.files.journal')}</li>
                <li><strong>src/</strong>: {t('rules.projectStructure.files.src')}</li>
                <li><strong>tests/</strong>: {t('rules.projectStructure.files.tests')}</li>
              </ul>
            </div>
          </section>

          {/* Download Rules Section */}
          <section className="rules-section rules-download-section">
            <h2 className="rules-section-title">{t('rules.download.title')}</h2>
            <p className="rules-intro">{t('rules.download.desc')}</p>

            <div className="download-buttons">
              <button onClick={() => onNavigate('home', '#quick-start')} className="btn btn-primary">
                {t('rules.download.getIDEConfigs')} →
              </button>
              <a href="https://github.com/AgenticDriven/agenticdriven" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                {t('rules.download.viewGitHub')} →
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* Back to Top */}
      <div className="back-to-top">
        <a href="#" className="btn btn-secondary">↑ {t('rules.backToTop')}</a>
      </div>
    </div>
  )
}

export default RulesPage
