import { useLanguage } from '../i18n/LanguageContext'
import { useState, useEffect } from 'react'

function RulesPage({ onNavigate }) {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState('principles')

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['principles', 'phases', 'versioning', 'git-commits', 'project-structure']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="rules-page">
      {/* Navigation Header */}
      <div className="rules-header">
        <div className="container-fluid">
          <button onClick={() => onNavigate('home')} className="back-button">
            ← {t('rules.backToHome')}
          </button>
          <h1 className="rules-title">{t('rules.title')}</h1>
          <p className="rules-subtitle">{t('rules.subtitle')}</p>
        </div>
      </div>

      <div className="rules-layout">
        <div className="container-fluid">
          <div className="rules-grid">
            {/* Sidebar TOC */}
            <aside className="rules-sidebar">
              <nav className="rules-toc">
                <h3 className="toc-title">{t('rules.toc.title')}</h3>
                <ul className="toc-list">
                  <li>
                    <button
                      onClick={() => scrollToSection('principles')}
                      className={`toc-link ${activeSection === 'principles' ? 'active' : ''}`}
                    >
                      <span className="toc-icon">⚡</span>
                      <span>{t('rules.toc.principles')}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('phases')}
                      className={`toc-link ${activeSection === 'phases' ? 'active' : ''}`}
                    >
                      <span className="toc-icon">🎯</span>
                      <span>{t('rules.toc.phases')}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('versioning')}
                      className={`toc-link ${activeSection === 'versioning' ? 'active' : ''}`}
                    >
                      <span className="toc-icon">🔖</span>
                      <span>{t('rules.toc.versioning')}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('git-commits')}
                      className={`toc-link ${activeSection === 'git-commits' ? 'active' : ''}`}
                    >
                      <span className="toc-icon">💾</span>
                      <span>{t('rules.toc.gitCommits')}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('project-structure')}
                      className={`toc-link ${activeSection === 'project-structure' ? 'active' : ''}`}
                    >
                      <span className="toc-icon">📁</span>
                      <span>{t('rules.toc.projectStructure')}</span>
                    </button>
                  </li>
                </ul>

                <div className="toc-actions">
                  <button onClick={() => onNavigate('home')} className="btn btn-secondary btn-sm">
                    ← {t('rules.backToHome')}
                  </button>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="rules-main">
              {/* Principles Section */}
              <section id="principles" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">⚡</span>
                  <h2 className="rules-section-title">{t('principles.title')}</h2>
                </div>
                <p className="rules-intro">{t('principles.intro')}</p>

                <div className="rules-grid-cards">
                  {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => (
                    <div key={num} className="rule-card">
                      <div className="rule-card-header">
                        <div className="rule-number-badge">{num}</div>
                        <h3 className="rule-card-title">{t(`principles.items.${num}.title`)}</h3>
                      </div>
                      <p className="rule-card-desc">{t(`principles.items.${num}.desc`)}</p>
                      <p className="rule-card-detail">{t(`principles.items.${num}.detail`)}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Phases Section */}
              <section id="phases" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">🎯</span>
                  <h2 className="rules-section-title">{t('workflow.title')}</h2>
                </div>
                <p className="rules-intro">{t('workflow.intro')}</p>

                <div className="phases-timeline">
                  {['define', 'discover', 'design', 'setup', 'build', 'validate', 'market', 'launch', 'support', 'evolve'].map((phaseKey, idx) => (
                    <div key={idx} className="phase-card">
                      <div className="phase-card-header">
                        <div className="phase-number">{idx + 1}</div>
                        <span className="phase-emoji">{['🎯', '🔍', '📐', '⚙️', '🔨', '✅', '📢', '🚀', '🛟', '📈'][idx]}</span>
                        <div className="phase-info">
                          <h3 className="phase-title">{t(`workflow.phases.${phaseKey}.name`)}</h3>
                          <span className="phase-version">{t(`workflow.phases.${phaseKey}.version`)}</span>
                        </div>
                      </div>
                      <p className="phase-desc">{t(`workflow.phases.${phaseKey}.desc`)}</p>
                      <p className="phase-detail">{t(`workflow.phases.${phaseKey}.detail`)}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Versioning Section */}
              <section id="versioning" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">🔖</span>
                  <h2 className="rules-section-title">{t('rules.versioning.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.versioning.intro')}</p>

                <div className="info-cards">
                  <div className="info-card">
                    <h3 className="info-card-title">{t('rules.versioning.prerelease.title')}</h3>
                    <p className="info-card-desc">{t('rules.versioning.prerelease.desc')}</p>
                    <div className="code-block">
                      <pre><code>{t('rules.versioning.prerelease.example')}</code></pre>
                    </div>
                  </div>

                  <div className="info-card">
                    <h3 className="info-card-title">{t('rules.versioning.release.title')}</h3>
                    <p className="info-card-desc">{t('rules.versioning.release.desc')}</p>
                    <div className="code-block">
                      <pre><code>{t('rules.versioning.release.example')}</code></pre>
                    </div>
                  </div>
                </div>
              </section>

              {/* Git Commits Section */}
              <section id="git-commits" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">💾</span>
                  <h2 className="rules-section-title">{t('rules.gitCommits.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.gitCommits.intro')}</p>

                <div className="info-cards">
                  <div className="info-card">
                    <h3 className="info-card-title">{t('rules.gitCommits.format.title')}</h3>
                    <p className="info-card-desc">{t('rules.gitCommits.format.desc')}</p>
                    <div className="code-block">
                      <pre><code>{t('rules.gitCommits.format.example')}</code></pre>
                    </div>
                  </div>

                  <div className="info-card">
                    <h3 className="info-card-title">{t('rules.gitCommits.types.title')}</h3>
                    <p className="info-card-desc">{t('rules.gitCommits.types.desc')}</p>
                    <div className="commit-types">
                      {['feat', 'fix', 'docs', 'chore', 'test', 'refactor', 'perf', 'style', 'ci', 'build'].map(type => (
                        <span key={type} className="commit-type-badge">{type}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Project Structure Section */}
              <section id="project-structure" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">📁</span>
                  <h2 className="rules-section-title">{t('rules.projectStructure.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.projectStructure.intro')}</p>

                <div className="structure-example">
                  <div className="code-block code-block-large">
                    <pre><code>{t('rules.projectStructure.example')}</code></pre>
                  </div>
                </div>

                <div className="file-descriptions">
                  <h3 className="subsection-title">{t('rules.projectStructure.files.title')}</h3>
                  <div className="file-list">
                    <div className="file-item">
                      <span className="file-name">📄 README.md</span>
                      <p className="file-desc">{t('rules.projectStructure.files.readme')}</p>
                    </div>
                    <div className="file-item">
                      <span className="file-name">⚙️ adw.yaml</span>
                      <p className="file-desc">{t('rules.projectStructure.files.adw')}</p>
                    </div>
                    <div className="file-item">
                      <span className="file-name">📓 docs/journal.md</span>
                      <p className="file-desc">{t('rules.projectStructure.files.journal')}</p>
                    </div>
                    <div className="file-item">
                      <span className="file-name">📂 src/</span>
                      <p className="file-desc">{t('rules.projectStructure.files.src')}</p>
                    </div>
                    <div className="file-item">
                      <span className="file-name">🧪 tests/</span>
                      <p className="file-desc">{t('rules.projectStructure.files.tests')}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Download Section */}
              <section className="rules-section download-section">
                <div className="download-card">
                  <h2 className="download-title">{t('rules.download.title')}</h2>
                  <p className="download-desc">{t('rules.download.desc')}</p>
                  <div className="download-actions">
                    <button onClick={() => onNavigate('home', '#quick-start')} className="btn btn-primary btn-lg">
                      📦 {t('rules.download.getIDEConfigs')}
                    </button>
                    <a href="https://github.com/AgenticDriven/agenticdriven" className="btn btn-secondary btn-lg" target="_blank" rel="noopener noreferrer">
                      🐙 {t('rules.download.viewGitHub')}
                    </a>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        className="scroll-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={t('rules.backToTop')}
      >
        ↑
      </button>
    </div>
  )
}

export default RulesPage
