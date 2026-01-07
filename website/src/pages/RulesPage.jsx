import { useLanguage } from '../i18n/LanguageContext'
import { useState, useEffect } from 'react'

function RulesPage({ onNavigate }) {
  const { t } = useLanguage()
  const [activeSection, setActiveSection] = useState('installation')

  // Helper to convert \n to actual line breaks
  const formatCode = (text) => {
    return text.replace(/\\n/g, '\n')
  }

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['installation', 'quick-start', 'working-with-adw', 'reference', 'detailed']
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
                      onClick={() => scrollToSection('installation')}
                      className={`toc-link ${activeSection === 'installation' ? 'active' : ''}`}
                    >
                      <span className="toc-icon">📥</span>
                      <span>{t('rules.toc.installation')}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('quick-start')}
                      className={`toc-link ${activeSection === 'quick-start' ? 'active' : ''}`}
                    >
                      <span className="toc-icon">🚀</span>
                      <span>{t('rules.toc.quickStart')}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('working-with-adw')}
                      className={`toc-link ${activeSection === 'working-with-adw' ? 'active' : ''}`}
                    >
                      <span className="toc-icon">💻</span>
                      <span>{t('rules.toc.workingWithADW')}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('reference')}
                      className={`toc-link ${activeSection === 'reference' ? 'active' : ''}`}
                    >
                      <span className="toc-icon">📖</span>
                      <span>{t('rules.toc.reference')}</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => scrollToSection('detailed')}
                      className={`toc-link ${activeSection === 'detailed' ? 'active' : ''}`}
                    >
                      <span className="toc-icon">📚</span>
                      <span>{t('rules.toc.detailed')}</span>
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
              {/* Getting Started Section */}
              <section id="getting-started" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">🚀</span>
                  <h2 className="rules-section-title">{t('rules.gettingStarted.title')}</h2>
                </div>

                {/* Step 1 */}
                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.gettingStarted.step1.title')}</h3>
                <div className="code-block">
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.gettingStarted.step1.commands'))}
                  </code></pre>
                </div>

                {/* Step 2 */}
                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.gettingStarted.step2.title')}</h3>
                <div className="code-block">
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.gettingStarted.step2.commands'))}
                  </code></pre>
                </div>
                <p className="rules-intro" style={{marginTop: '1rem', whiteSpace: 'pre-line'}}>
                  {t('rules.gettingStarted.step2.note')}
                </p>

                {/* Step 3 */}
                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.gettingStarted.step3.title')}</h3>
                <div className="code-block">
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.gettingStarted.step3.commands'))}
                  </code></pre>
                </div>
                <p className="rules-intro" style={{marginTop: '1rem'}}>
                  {t('rules.gettingStarted.step3.note')}
                </p>

                {/* Step 4 */}
                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.gettingStarted.step4.title')}</h3>
                <p className="rules-intro">{t('rules.gettingStarted.step4.desc')}</p>
                <p className="rules-intro" style={{marginTop: '1rem', whiteSpace: 'pre-line'}}>
                  {t('rules.gettingStarted.step4.files')}
                </p>
                <div className="code-block" style={{marginTop: '1.5rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.gettingStarted.step4.commit'))}
                  </code></pre>
                </div>

                {/* Step 5 */}
                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.gettingStarted.step5.title')}</h3>
                <p className="rules-intro">{t('rules.gettingStarted.step5.desc')}</p>
                <div className="code-block" style={{marginTop: '1rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.gettingStarted.step5.commands'))}
                  </code></pre>
                </div>

                {/* Multi-Agent */}
                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.gettingStarted.multiAgent.title')}</h3>
                <p className="rules-intro">{t('rules.gettingStarted.multiAgent.desc')}</p>
                <div className="code-block" style={{marginTop: '1rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.gettingStarted.multiAgent.commands'))}
                  </code></pre>
                </div>
                <div className="code-block" style={{marginTop: '1rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.gettingStarted.multiAgent.commit'))}
                  </code></pre>
                </div>

                {/* Tips */}
                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.gettingStarted.tips.title')}</h3>
                <ol style={{marginLeft: '1.5rem', marginTop: '1rem', lineHeight: '1.8'}}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li key={num}>{t(`rules.gettingStarted.tips.${num}`)}</li>
                  ))}
                </ol>
              </section>

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

                      {/* Domain Examples */}
                      <div className="phase-examples">
                        <h4 className="examples-title">{t(`workflow.phases.${phaseKey}.examples.title`)}</h4>
                        <div className="examples-grid">
                          <div className="example-item">
                            <div className="example-label">💻 Software</div>
                            <p className="example-text">{t(`workflow.phases.${phaseKey}.examples.items.software`)}</p>
                          </div>
                          <div className="example-item">
                            <div className="example-label">📚 Book</div>
                            <p className="example-text">{t(`workflow.phases.${phaseKey}.examples.items.book`)}</p>
                          </div>
                          <div className="example-item">
                            <div className="example-label">🎬 Movie Script</div>
                            <p className="example-text">{t(`workflow.phases.${phaseKey}.examples.items.movie`)}</p>
                          </div>
                          <div className="example-item">
                            <div className="example-label">📊 Marketing Plan</div>
                            <p className="example-text">{t(`workflow.phases.${phaseKey}.examples.items.marketing`)}</p>
                          </div>
                          <div className="example-item">
                            <div className="example-label">📦 Physical Product</div>
                            <p className="example-text">{t(`workflow.phases.${phaseKey}.examples.items.product`)}</p>
                          </div>
                        </div>
                      </div>
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
                      <pre><code style={{whiteSpace: 'pre-wrap'}}>{formatCode(t('rules.versioning.prerelease.example'))}</code></pre>
                    </div>
                  </div>

                  <div className="info-card">
                    <h3 className="info-card-title">{t('rules.versioning.release.title')}</h3>
                    <p className="info-card-desc">{t('rules.versioning.release.desc')}</p>
                    <div className="code-block">
                      <pre><code style={{whiteSpace: 'pre-wrap'}}>{formatCode(t('rules.versioning.release.example'))}</code></pre>
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
                      <pre><code style={{whiteSpace: 'pre-wrap'}}>{formatCode(t('rules.gitCommits.format.example'))}</code></pre>
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
                    <pre><code style={{whiteSpace: 'pre-wrap'}}>{formatCode(t('rules.projectStructure.example'))}</code></pre>
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

              {/* Project Config Section */}
              <section id="project-config" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">⚙️</span>
                  <h2 className="rules-section-title">{t('rules.projectConfig.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.projectConfig.intro')}</p>

                {/* When to use - simple list */}
                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.projectConfig.when.title')}</h3>
                <ul style={{marginLeft: '1.5rem', marginTop: '1rem', lineHeight: '1.8'}}>
                  <li><strong>✅ Proyecto Solo:</strong> {t('rules.projectConfig.when.solo')}</li>
                  <li><strong>⚠️ Multi-Agente:</strong> {t('rules.projectConfig.when.multi')}</li>
                </ul>

                {/* Schema - direct */}
                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.projectConfig.specification.title')}</h3>
                <p className="rules-intro">{t('rules.projectConfig.specification.intro')}</p>
                <div className="code-block" style={{marginTop: '1.5rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.projectConfig.specification.schema'))}
                  </code></pre>
                </div>

                {/* domain field - clean */}
                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.projectConfig.domainField.title')}</h3>
                <p className="rules-intro">{t('rules.projectConfig.domainField.desc')}</p>

                <p style={{marginTop: '1.5rem', fontWeight: 'bold'}}>{t('rules.projectConfig.domainField.values.title')}</p>
                <ul style={{marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8', columns: '2', columnGap: '2rem'}}>
                  {['software', 'book', 'marketing', 'event', 'product', 'research', 'course', 'game'].map((domain) => (
                    <li key={domain} style={{breakInside: 'avoid'}}>{t(`rules.projectConfig.domainField.values.${domain}`)}</li>
                  ))}
                </ul>

                <div className="code-block" style={{marginTop: '1.5rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.projectConfig.domainField.example'))}
                  </code></pre>
                </div>

                {/* agents field - clean */}
                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.projectConfig.agentsField.title')}</h3>
                <p className="rules-intro">{t('rules.projectConfig.agentsField.desc')}</p>

                <ul style={{marginLeft: '1.5rem', marginTop: '1rem', lineHeight: '1.8'}}>
                  <li><strong>✅ Requerido:</strong> {t('rules.projectConfig.agentsField.required')}</li>
                  <li><strong>❌ Omitir:</strong> {t('rules.projectConfig.agentsField.omit')}</li>
                </ul>

                <p style={{marginTop: '1.5rem', fontWeight: 'bold'}}>{t('rules.projectConfig.agentsField.structure.title')}</p>
                <ul style={{marginLeft: '1.5rem', marginTop: '0.5rem', lineHeight: '1.8'}}>
                  <li><code>id</code>: {t('rules.projectConfig.agentsField.structure.id')}</li>
                  <li><code>context</code>: {t('rules.projectConfig.agentsField.structure.context')}</li>
                </ul>

                <div className="code-block" style={{marginTop: '1.5rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.projectConfig.agentsField.structure.example'))}
                  </code></pre>
                </div>

                {/* Examples - minimal boxing */}
                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.projectConfig.allCombinations.title')}</h3>

                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} style={{marginTop: '2rem'}}>
                    <h4 style={{marginBottom: '0.5rem'}}>{t(`rules.projectConfig.allCombinations.${num}.title`)}</h4>
                    <p className="rules-intro">{t(`rules.projectConfig.allCombinations.${num}.desc`)}</p>
                    <div className="code-block" style={{marginTop: '1rem'}}>
                      <pre><code style={{whiteSpace: 'pre-wrap'}}>
                        {formatCode(t(`rules.projectConfig.allCombinations.${num}.example`))}
                      </code></pre>
                    </div>
                  </div>
                ))}

                {/* Validation - simple list */}
                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.projectConfig.validation.title')}</h3>
                <ol style={{marginLeft: '1.5rem', marginTop: '1rem', lineHeight: '1.8'}}>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <li key={num}>{t(`rules.projectConfig.validation.${num}`)}</li>
                  ))}
                </ol>

                {/* Examples by domain - cleaner */}
                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.projectConfig.examples.title')}</h3>

                <div style={{marginTop: '2rem'}}>
                  <h4 style={{marginBottom: '0.5rem'}}>{t('rules.projectConfig.examples.software.title')}</h4>
                  <div className="code-block">
                    <pre><code style={{whiteSpace: 'pre-wrap'}}>{formatCode(t('rules.projectConfig.examples.software.example'))}</code></pre>
                  </div>
                </div>

                <div style={{marginTop: '2rem'}}>
                  <h4 style={{marginBottom: '0.5rem'}}>{t('rules.projectConfig.examples.book.title')}</h4>
                  <div className="code-block">
                    <pre><code style={{whiteSpace: 'pre-wrap'}}>{formatCode(t('rules.projectConfig.examples.book.example'))}</code></pre>
                  </div>
                </div>

                <div style={{marginTop: '2rem'}}>
                  <h4 style={{marginBottom: '0.5rem'}}>{t('rules.projectConfig.examples.marketing.title')}</h4>
                  <div className="code-block">
                    <pre><code style={{whiteSpace: 'pre-wrap'}}>{formatCode(t('rules.projectConfig.examples.marketing.example'))}</code></pre>
                  </div>
                </div>

                {/* Important Rules - simple list */}
                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.projectConfig.rules.title')}</h3>
                <ol style={{marginLeft: '1.5rem', marginTop: '1rem', lineHeight: '1.8'}}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <li key={num}>{t(`rules.projectConfig.rules.${num}`)}</li>
                  ))}
                </ol>
              </section>

              {/* Multi-Agent Section */}
              <section id="multi-agent" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">🤝</span>
                  <h2 className="rules-section-title">{t('rules.multiAgent.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.multiAgent.intro')}</p>

                <div className="rules-grid-cards">
                  {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
                    <div key={num} className="rule-card">
                      <div className="rule-card-header">
                        <div className="rule-number-badge">{num}</div>
                        <h3 className="rule-card-title">{t(`rules.multiAgent.principles.${num}.title`)}</h3>
                      </div>
                      <p className="rule-card-desc">{t(`rules.multiAgent.principles.${num}.desc`)}</p>
                      <p className="rule-card-detail">{t(`rules.multiAgent.principles.${num}.detail`)}</p>
                    </div>
                  ))}
                </div>

                <div className="file-descriptions" style={{marginTop: '3rem'}}>
                  <h3 className="subsection-title">{t('rules.multiAgent.coordination.title')}</h3>
                  <p className="rules-intro">{t('rules.multiAgent.coordination.intro')}</p>
                  <div className="file-list">
                    <div className="file-item">
                      <span className="file-name">📋 {t('rules.multiAgent.coordination.items.standup.title')}</span>
                      <p className="file-desc">{t('rules.multiAgent.coordination.items.standup.desc')}</p>
                    </div>
                    <div className="file-item">
                      <span className="file-name">🔄 {t('rules.multiAgent.coordination.items.integration.title')}</span>
                      <p className="file-desc">{t('rules.multiAgent.coordination.items.integration.desc')}</p>
                    </div>
                    <div className="file-item">
                      <span className="file-name">👀 {t('rules.multiAgent.coordination.items.reviews.title')}</span>
                      <p className="file-desc">{t('rules.multiAgent.coordination.items.reviews.desc')}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Documentation Section */}
              <section id="documentation" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">📚</span>
                  <h2 className="rules-section-title">{t('rules.documentation.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.documentation.intro')}</p>

                <div className="info-card" style={{marginBottom: '2rem'}}>
                  <p className="info-card-highlight">{t('rules.documentation.principle')}</p>
                </div>

                <h3 className="subsection-title">{t('rules.documentation.byPhase.title')}</h3>
                <div className="file-list">
                  <div className="file-item">
                    <span className="file-name">📝 DEFINE (v0.0.x)</span>
                    <p className="file-desc">{t('rules.documentation.byPhase.define')}</p>
                  </div>
                  <div className="file-item">
                    <span className="file-name">🔍 DISCOVER (v0.1.x)</span>
                    <p className="file-desc">{t('rules.documentation.byPhase.discover')}</p>
                  </div>
                  <div className="file-item">
                    <span className="file-name">🎨 DESIGN (v0.2.x)</span>
                    <p className="file-desc">{t('rules.documentation.byPhase.design')}</p>
                  </div>
                  <div className="file-item">
                    <span className="file-name">⚙️ SETUP (v0.3.x)</span>
                    <p className="file-desc">{t('rules.documentation.byPhase.setup')}</p>
                  </div>
                  <div className="file-item">
                    <span className="file-name">🔨 BUILD (v0.4.x)</span>
                    <p className="file-desc">{t('rules.documentation.byPhase.build')}</p>
                  </div>
                  <div className="file-item">
                    <span className="file-name">✅ VALIDATE (v0.5.x)</span>
                    <p className="file-desc">{t('rules.documentation.byPhase.validate')}</p>
                  </div>
                  <div className="file-item">
                    <span className="file-name">📢 MARKET (v0.6.x)</span>
                    <p className="file-desc">{t('rules.documentation.byPhase.market')}</p>
                  </div>
                  <div className="file-item">
                    <span className="file-name">🚀 LAUNCH (v0.7.x)</span>
                    <p className="file-desc">{t('rules.documentation.byPhase.launch')}</p>
                  </div>
                  <div className="file-item">
                    <span className="file-name">🛠️ SUPPORT (v0.8.x)</span>
                    <p className="file-desc">{t('rules.documentation.byPhase.support')}</p>
                  </div>
                  <div className="file-item">
                    <span className="file-name">📈 EVOLVE (v0.9.x)</span>
                    <p className="file-desc">{t('rules.documentation.byPhase.evolve')}</p>
                  </div>
                </div>

                <div className="file-descriptions" style={{marginTop: '3rem'}}>
                  <h3 className="subsection-title">{t('rules.documentation.location.title')}</h3>

                  <h4 style={{marginTop: '1.5rem', marginBottom: '1rem'}}>{t('rules.documentation.location.simple.title')}</h4>
                  <p className="rules-intro">{t('rules.documentation.location.simple.desc')}</p>

                  <h4 style={{marginTop: '1.5rem', marginBottom: '1rem'}}>{t('rules.documentation.location.complex.title')}</h4>
                  <p className="rules-intro">{t('rules.documentation.location.complex.desc')}</p>

                  <div className="code-block" style={{marginTop: '1rem'}}>
                    <pre><code style={{whiteSpace: 'pre-wrap'}}>
                      {formatCode(t('rules.documentation.location.complex.structure'))}
                    </code></pre>
                  </div>

                  <div style={{marginTop: '1.5rem'}}>
                    <strong>{t('rules.documentation.location.workflow.title')}:</strong>
                    <ol style={{marginTop: '0.5rem', marginLeft: '1.5rem'}}>
                      <li>{t('rules.documentation.location.workflow.1')}</li>
                      <li>{t('rules.documentation.location.workflow.2')}</li>
                      <li>{t('rules.documentation.location.workflow.3')}</li>
                      <li>{t('rules.documentation.location.workflow.4')}</li>
                    </ol>
                  </div>

                  <p style={{marginTop: '1.5rem', fontWeight: 'bold'}}>{t('rules.documentation.location.alwaysRoot')}</p>
                  <p style={{marginTop: '1rem'}}>{t('rules.documentation.updates')}</p>
                </div>
              </section>

              {/* Journal Section */}
              <section id="journal" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">📓</span>
                  <h2 className="rules-section-title">{t('rules.journal.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.journal.intro')}</p>

                <h3 className="subsection-title">{t('rules.journal.format.title')}</h3>
                <div className="code-block" style={{marginBottom: '2rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.journal.format.example'))}
                  </code></pre>
                </div>

                <h3 className="subsection-title">{t('rules.journal.exampleEntry.title')}</h3>
                <div className="code-block" style={{marginBottom: '2rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.journal.exampleEntry.example'))}
                  </code></pre>
                </div>

                <h3 className="subsection-title">{t('rules.journal.rules.title')}</h3>
                <div className="file-list">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                    <div key={num} className="file-item">
                      <span className="file-name">{num}.</span>
                      <p className="file-desc">{t(`rules.journal.rules.${num}`)}</p>
                    </div>
                  ))}
                </div>

                <div className="file-descriptions" style={{marginTop: '3rem'}}>
                  <h3 className="subsection-title">{t('rules.journal.multiAgent.title')}</h3>
                  <p className="rules-intro">{t('rules.journal.multiAgent.desc')}</p>
                  <div className="code-block" style={{marginTop: '1rem'}}>
                    <pre><code style={{whiteSpace: 'pre-wrap'}}>
                      {formatCode(t('rules.journal.multiAgent.example'))}
                    </code></pre>
                  </div>
                </div>
              </section>

              {/* Decisions Section */}
              <section id="decisions" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">⚖️</span>
                  <h2 className="rules-section-title">{t('rules.decisions.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.decisions.intro')}</p>

                <h3 className="subsection-title">{t('rules.decisions.format.title')}</h3>
                <div className="code-block" style={{marginBottom: '2rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.decisions.format.example'))}
                  </code></pre>
                </div>

                <h3 className="subsection-title">{t('rules.decisions.example.title')}</h3>
                <div className="code-block" style={{marginBottom: '2rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.decisions.example.example'))}
                  </code></pre>
                </div>

                <h3 className="subsection-title">{t('rules.decisions.when.title')}</h3>
                <div className="rules-grid-cards">
                  <div className="rule-card">
                    <h4>{t('rules.decisions.when.do.title')}</h4>
                    <ul style={{marginTop: '1rem', marginLeft: '1.5rem'}}>
                      {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
                        <li key={num} style={{marginBottom: '0.5rem'}}>{t(`rules.decisions.when.do.${num}`)}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rule-card">
                    <h4>{t('rules.decisions.when.dont.title')}</h4>
                    <ul style={{marginTop: '1rem', marginLeft: '1.5rem'}}>
                      {Array.from({ length: 3 }, (_, i) => i + 1).map((num) => (
                        <li key={num} style={{marginBottom: '0.5rem'}}>{t(`rules.decisions.when.dont.${num}`)}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.decisions.rules.title')}</h3>
                <div className="file-list">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                    <div key={num} className="file-item">
                      <span className="file-name">{num}.</span>
                      <p className="file-desc">{t(`rules.decisions.rules.${num}`)}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Contracts Section */}
              <section id="contracts" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">📋</span>
                  <h2 className="rules-section-title">{t('rules.contracts.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.contracts.intro')}</p>

                <div className="info-card" style={{marginBottom: '2rem'}}>
                  <h3 className="info-card-title">{t('rules.contracts.when.title')}</h3>
                  <div className="file-list">
                    <div className="file-item">
                      <span className="file-name">🎨 {t('rules.contracts.when.design')}</span>
                    </div>
                    <div className="file-item">
                      <span className="file-name">🔨 {t('rules.contracts.when.build')}</span>
                    </div>
                  </div>
                </div>

                <h3 className="subsection-title">{t('rules.contracts.format.title')}</h3>
                <div className="code-block" style={{marginBottom: '2rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.contracts.format.example'))}
                  </code></pre>
                </div>

                <h3 className="subsection-title">{t('rules.contracts.examples.title')}</h3>
                <div className="rules-grid-cards">
                  <div className="rule-card">
                    <h4>{t('rules.contracts.examples.component.title')}</h4>
                    <div className="code-block" style={{marginTop: '1rem'}}>
                      <pre><code style={{whiteSpace: 'pre-wrap', fontSize: '0.85rem'}}>
                        {formatCode(t('rules.contracts.examples.component.example'))}
                      </code></pre>
                    </div>
                  </div>
                  <div className="rule-card">
                    <h4>{t('rules.contracts.examples.data.title')}</h4>
                    <div className="code-block" style={{marginTop: '1rem'}}>
                      <pre><code style={{whiteSpace: 'pre-wrap', fontSize: '0.85rem'}}>
                        {formatCode(t('rules.contracts.examples.data.example'))}
                      </code></pre>
                    </div>
                  </div>
                </div>

                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.contracts.workflow.title')}</h3>
                <div className="file-list">
                  {Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
                    <div key={num} className="file-item">
                      <span className="file-name">{num}.</span>
                      <p className="file-desc">{t(`rules.contracts.workflow.${num}`)}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* AI Workflow Section */}
              <section id="aiWorkflow" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">🤖</span>
                  <h2 className="rules-section-title">{t('rules.aiWorkflow.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.aiWorkflow.intro')}</p>

                <h3 className="subsection-title">{t('rules.aiWorkflow.sessionStart.title')}</h3>
                <div className="file-list">
                  {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                    <div key={num} className="file-item">
                      <span className="file-name">{num}.</span>
                      <p className="file-desc">{t(`rules.aiWorkflow.sessionStart.${num}`)}</p>
                    </div>
                  ))}
                </div>

                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.aiWorkflow.duringWork.title')}</h3>
                <div className="file-list">
                  <div className="file-item">
                    <span className="file-name">🔍 {t('rules.aiWorkflow.duringWork.before')}</span>
                  </div>
                  <div className="file-item">
                    <span className="file-name">✅ {t('rules.aiWorkflow.duringWork.after')}</span>
                  </div>
                </div>

                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.aiWorkflow.sessionEnd.title')}</h3>
                <div className="file-list">
                  <div className="file-item">
                    <span className="file-name">✨ {t('rules.aiWorkflow.sessionEnd.clean')}</span>
                  </div>
                  <div className="file-item">
                    <span className="file-name">⏸️ {t('rules.aiWorkflow.sessionEnd.interrupted')}</span>
                  </div>
                </div>

                <div className="file-descriptions" style={{marginTop: '3rem'}}>
                  <h3 className="subsection-title">{t('rules.aiWorkflow.multiAgent.title')}</h3>
                  <p className="rules-intro">{t('rules.aiWorkflow.multiAgent.desc')}</p>
                  <div className="file-list">
                    {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                      <div key={num} className="file-item">
                        <span className="file-name">{num}.</span>
                        <p className="file-desc">{t(`rules.aiWorkflow.multiAgent.${num}`)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Exit Criteria Section */}
              <section id="exitCriteria" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">🎯</span>
                  <h2 className="rules-section-title">{t('rules.exitCriteria.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.exitCriteria.intro')}</p>

                <div className="file-list">
                  {['define', 'discover', 'design', 'setup', 'build', 'validate', 'market', 'launch', 'support', 'evolve'].map((phase) => (
                    <div key={phase} className="file-item">
                      <span className="file-name">{t(`rules.exitCriteria.byPhase.${phase}.title`)}</span>
                      <p className="file-desc">{t(`rules.exitCriteria.byPhase.${phase}.items`)}</p>
                    </div>
                  ))}
                </div>

                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.exitCriteria.validation.title')}</h3>
                <div className="file-list">
                  {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
                    <div key={num} className="file-item">
                      <span className="file-name">{num}.</span>
                      <p className="file-desc">{t(`rules.exitCriteria.validation.${num}`)}</p>
                    </div>
                  ))}
                </div>

                <div className="code-block" style={{marginTop: '2rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.exitCriteria.example'))}
                  </code></pre>
                </div>

                <p className="rules-intro" style={{marginTop: '2rem'}}>{t('rules.exitCriteria.flexibility')}</p>
              </section>

              {/* Troubleshooting Section */}
              <section id="troubleshooting" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">🔧</span>
                  <h2 className="rules-section-title">{t('rules.troubleshooting.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.troubleshooting.intro')}</p>

                <h3 className="subsection-title">{t('rules.troubleshooting.process.title')}</h3>
                <div className="file-list">
                  {Array.from({ length: 5 }, (_, i) => i + 1).map((num) => (
                    <div key={num} className="file-item">
                      <span className="file-name">{num}.</span>
                      <p className="file-desc">{t(`rules.troubleshooting.process.${num}`)}</p>
                    </div>
                  ))}
                </div>

                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.troubleshooting.common.title')}</h3>
                <div className="file-list">
                  {['tests', 'build', 'git', 'phase', 'multiAgent', 'lost', 'deps', 'contract'].map((issue) => (
                    <div key={issue} className="file-item">
                      <span className="file-name">{t(`rules.troubleshooting.common.${issue}.title`)}</span>
                      <p className="file-desc">{t(`rules.troubleshooting.common.${issue}.solution`)}</p>
                    </div>
                  ))}
                </div>

                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.troubleshooting.rollback.title')}</h3>
                <div className="code-block" style={{marginBottom: '2rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.troubleshooting.rollback.soft'))}{'\n\n'}
                    {formatCode(t('rules.troubleshooting.rollback.hard'))}{'\n\n'}
                    {formatCode(t('rules.troubleshooting.rollback.tag'))}
                  </code></pre>
                </div>

                <h3 className="subsection-title">{t('rules.troubleshooting.help.title')}</h3>
                <p className="rules-intro">{t('rules.troubleshooting.help.provide')}</p>

                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.troubleshooting.document.title')}</h3>
                <p className="rules-intro">{t('rules.troubleshooting.document.desc')}</p>
                <div className="code-block" style={{marginTop: '1rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.troubleshooting.document.example'))}
                  </code></pre>
                </div>

                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.troubleshooting.prevention.title')}</h3>
                <p className="rules-intro">{t('rules.troubleshooting.prevention.tips')}</p>
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
