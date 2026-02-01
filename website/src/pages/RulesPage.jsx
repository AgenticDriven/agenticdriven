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
                      <span>{t('rules.toc.workingWithAD')}</span>
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
              
              {/* 1. Installation Section */}
              <section id="installation" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">📥</span>
                  <h2 className="rules-section-title">{t('rules.installation.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.installation.intro')}</p>

                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.installation.chooseIDE')}</h3>
                
                {/* IDEs List */}
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem'}}>
                  {['cursor', 'claude', 'windsurf', 'copilot', 'aider', 'continue'].map((ide) => (
                    <div key={ide} style={{border: '2px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1.5rem'}}>
                      <h4 style={{marginTop: 0, marginBottom: '0.5rem'}}>{t(`rules.installation.ides.${ide}.name`)}</h4>
                      <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem'}}>{t(`rules.installation.ides.${ide}.desc`)}</p>
                      <code style={{fontSize: '0.75rem', display: 'block', padding: '0.5rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', wordBreak: 'break-all'}}>{t(`rules.installation.ides.${ide}.file`)}</code>
                      <div className="code-block" style={{marginTop: '1rem'}}>
                        <pre><code style={{whiteSpace: 'pre-wrap', fontSize: '0.8rem'}}>
                          {t(`rules.installation.ides.${ide}.command`)}
                        </code></pre>
                      </div>
                    </div>
                  ))}
                </div>

                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.installation.quickInstall')}</h3>
                <div className="code-block">
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {t('rules.installation.quickCommand')}
                  </code></pre>
                </div>
                <div className="code-block" style={{marginTop: '1rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.installation.quickExample'))}
                  </code></pre>
                </div>

                <p className="rules-intro" style={{marginTop: '2rem', padding: '1rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-md)'}}>
                  <strong>{t('rules.installation.afterInstall')}</strong>
                </p>
              </section>

              {/* 2. Quick Start Section */}
              <section id="quick-start" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">🚀</span>
                  <h2 className="rules-section-title">{t('rules.quickStart.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.quickStart.intro')}</p>

                {/* Step 1 */}
                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.quickStart.step1.title')}</h3>
                <div className="code-block">
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.quickStart.step1.commands'))}
                  </code></pre>
                </div>

                {/* Step 2 */}
                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.quickStart.step2.title')}</h3>
                <div className="code-block">
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.quickStart.step2.commands'))}
                  </code></pre>
                </div>

                {/* Step 3 */}
                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.quickStart.step3.title')}</h3>
                <div className="code-block">
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.quickStart.step3.commands'))}
                  </code></pre>
                </div>

                {/* Step 4 */}
                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.quickStart.step4.title')}</h3>
                <p style={{fontWeight: 600, marginBottom: '0.5rem'}}>{t('rules.quickStart.step4.prompt')}</p>
                <div style={{background: 'var(--bg-light)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)'}}>
                  <pre style={{whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0}}>
                    {formatCode(t('rules.quickStart.step4.promptText'))}
                  </pre>
                </div>
                <p className="rules-intro" style={{marginTop: '1rem', fontStyle: 'italic'}}>{t('rules.quickStart.step4.note')}</p>

                {/* Step 5 */}
                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.quickStart.step5.title')}</h3>
                <p style={{fontWeight: 600, marginBottom: '0.5rem'}}>{t('rules.quickStart.step5.prompt')}</p>
                <div style={{background: 'var(--bg-light)', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)'}}>
                  <pre style={{whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0}}>
                    {formatCode(t('rules.quickStart.step5.promptText'))}
                  </pre>
                </div>
                <div className="code-block" style={{marginTop: '1rem'}}>
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.quickStart.step5.commands'))}
                  </code></pre>
                </div>

                <p className="rules-intro" style={{marginTop: '2rem', padding: '1rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: 600}}>
                  ✅ {t('rules.quickStart.done')}
                </p>
              </section>

              {/* 3. Working with AD Section */}
              <section id="working-with-adw" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">💻</span>
                  <h2 className="rules-section-title">{t('rules.workingWithAD.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.workingWithAD.intro')}</p>

                {/* Phases with Prompts */}
                {['define', 'discover', 'design', 'setup', 'build', 'validate'].map((phase) => (
                  <div key={phase} style={{marginTop: '3rem', padding: '2rem', background: 'var(--bg-white)', border: '2px solid var(--border-color)', borderRadius: 'var(--radius-lg)'}}>
                    <h3 style={{marginTop: 0, color: 'var(--color-primary)'}}>{t(`rules.workingWithAD.phases.${phase}.name`)}</h3>
                    <p style={{fontWeight: 600, marginBottom: '1rem'}}>🎯 {t(`rules.workingWithAD.phases.${phase}.goal`)}</p>
                    
                    <h4 style={{marginTop: '1.5rem', marginBottom: '0.5rem'}}>Prompt para tu IA:</h4>
                    <div style={{background: '#f0f4ff', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)'}}>
                      <pre style={{whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, fontSize: '0.95rem'}}>
                        {formatCode(t(`rules.workingWithAD.phases.${phase}.prompt`))}
                      </pre>
                    </div>

                    <div style={{marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                      <div style={{flex: 1, minWidth: '200px'}}>
                        <strong>Entregables:</strong>
                        <p style={{margin: '0.5rem 0 0 0', fontSize: '0.9rem'}}>{t(`rules.workingWithAD.phases.${phase}.deliverables`)}</p>
                      </div>
                      <div style={{flex: 1, minWidth: '200px'}}>
                        <strong>Exit Criteria:</strong>
                        <p style={{margin: '0.5rem 0 0 0', fontSize: '0.9rem'}}>{t(`rules.workingWithAD.phases.${phase}.exit`)}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Common Commands */}
                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.workingWithAD.commonCommands.title')}</h3>
                <ul style={{listStyle: 'none', padding: 0, marginTop: '1rem'}}>
                  <li style={{padding: '0.75rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem'}}>
                    <code>{t('rules.workingWithAD.commonCommands.status')}</code>
                  </li>
                  <li style={{padding: '0.75rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem'}}>
                    <code>{t('rules.workingWithAD.commonCommands.log')}</code>
                  </li>
                  <li style={{padding: '0.75rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem'}}>
                    <code>{t('rules.workingWithAD.commonCommands.journal')}</code>
                  </li>
                  <li style={{padding: '0.75rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem'}}>
                    <code>{t('rules.workingWithAD.commonCommands.version')}</code>
                  </li>
                  <li style={{padding: '0.75rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem'}}>
                    <code>{t('rules.workingWithAD.commonCommands.commit')}</code>
                  </li>
                  <li style={{padding: '0.75rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem'}}>
                    <code>{t('rules.workingWithAD.commonCommands.tag')}</code>
                  </li>
                </ul>
              </section>

              {/* 4. Reference Section */}
              <section id="reference" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">📖</span>
                  <h2 className="rules-section-title">{t('rules.reference.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.reference.intro')}</p>

                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.reference.principles.title')}</h3>
                <div className="code-block">
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.reference.principles.list'))}
                  </code></pre>
                </div>

                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.reference.phases.title')}</h3>
                <div className="code-block">
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.reference.phases.list'))}
                  </code></pre>
                </div>

                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.reference.versioning.title')}</h3>
                <div className="code-block">
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.reference.versioning.scheme'))}
                  </code></pre>
                </div>

                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.reference.commits.title')}</h3>
                <div className="code-block">
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.reference.commits.format'))}
                  </code></pre>
                </div>

                <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.reference.docs.title')}</h3>
                <div className="code-block">
                  <pre><code style={{whiteSpace: 'pre-wrap'}}>
                    {formatCode(t('rules.reference.docs.structure'))}
                  </code></pre>
                </div>
              </section>

              {/* 5. Detailed Documentation */}
              <section id="detailed" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">📚</span>
                  <h2 className="rules-section-title">{t('rules.detailed.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.detailed.intro')}</p>

                {/* Internal TOC for Detailed section */}
                <div style={{background: 'var(--bg-light)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginTop: '2rem'}}>
                  <h3 style={{marginTop: 0, marginBottom: '1rem'}}>{t('rules.detailed.toc.title')}</h3>
                  <ul style={{listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '0.5rem'}}>
                    {['principles', 'phases', 'versioning', 'gitCommits', 'projectStructure', 'projectConfig', 'multiAgent', 'documentation', 'journal', 'decisions', 'contracts', 'aiWorkflow', 'exitCriteria', 'troubleshooting'].map((section) => (
                      <li key={section}>
                        <button
                          onClick={() => scrollToSection(`detailed-${section}`)}
                          style={{background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', textAlign: 'left', padding: '0.25rem 0', fontSize: '0.95rem'}}
                        >
                          → {t(`rules.detailed.toc.${section}`)}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 7 Principles Detailed */}
                <div id="detailed-principles" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>⚡ {t('principles.title')}</h2>
                  <p className="rules-intro">{t('principles.intro')}</p>
                  <div className="rules-grid-cards" style={{marginTop: '2rem'}}>
                    {Array.from({ length: 13 }, (_, i) => i + 1).map((num) => (
                      <div key={num} className="rule-card">
                        <div className="rule-card-header">
                          <h3 className="rule-card-title">{t(`principles.items.${num}.title`)}</h3>
                        </div>
                        <p className="rule-card-desc">{t(`principles.items.${num}.desc`)}</p>
                        <p className="rule-card-detail">{t(`principles.items.${num}.detail`)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6 Phases Detailed */}
                <div id="detailed-phases" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>🎯 {t('phases.title')}</h2>
                  <p className="rules-intro">{t('phases.intro')}</p>

                  <div className="phases-timeline" style={{marginTop: '2rem'}}>
                    {['define', 'discover', 'design', 'setup', 'build', 'validate'].map((phase, index) => (
                      <div key={phase} style={{marginBottom: '3rem', padding: '2rem', background: 'var(--bg-white)', border: '2px solid var(--border-color)', borderRadius: 'var(--radius-lg)'}}>
                        <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                          <span style={{fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)'}}>0.{index}</span>
                          <h3 style={{margin: 0}}>{t(`phases.${phase}.name`)}</h3>
                        </div>
                        <p style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem'}}>{t(`phases.${phase}.description`)}</p>
                        
                        <h4 style={{marginTop: '1.5rem', marginBottom: '0.5rem'}}>Ejemplos por Dominio:</h4>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                          {['software', 'book', 'marketing', 'event', 'product'].map((domain) => (
                            <div key={domain} style={{padding: '1rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)'}}>
                              <strong style={{textTransform: 'capitalize'}}>{domain}:</strong>
                              <p style={{margin: '0.5rem 0 0 0', fontSize: '0.9rem'}}>{t(`phases.${phase}.examples.${domain}`)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Versioning Detailed */}
                <div id="detailed-versioning" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>🔖 {t('rules.versioning.title')}</h2>
                  <p className="rules-intro">{t('rules.versioning.intro')}</p>
                  
                  <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.versioning.prerelease.title')}</h3>
                  <p className="rules-intro">{t('rules.versioning.prerelease.desc')}</p>
                  <div className="code-block" style={{marginTop: '1rem'}}>
                    <pre><code style={{whiteSpace: 'pre-wrap'}}>
                      {formatCode(t('rules.versioning.prerelease.example'))}
                    </code></pre>
                  </div>

                  <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.versioning.release.title')}</h3>
                  <p className="rules-intro">{t('rules.versioning.release.desc')}</p>
                  <div className="code-block" style={{marginTop: '1rem'}}>
                    <pre><code style={{whiteSpace: 'pre-wrap'}}>
                      {formatCode(t('rules.versioning.release.example'))}
                    </code></pre>
                  </div>
                </div>

                {/* Git Commits Detailed */}
                <div id="detailed-gitCommits" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>💾 {t('rules.gitCommits.title')}</h2>
                  <p className="rules-intro">{t('rules.gitCommits.intro')}</p>
                  
                  <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.gitCommits.format.title')}</h3>
                  <p className="rules-intro">{t('rules.gitCommits.format.desc')}</p>
                  <div className="code-block" style={{marginTop: '1rem'}}>
                    <pre><code style={{whiteSpace: 'pre-wrap'}}>
                      {formatCode(t('rules.gitCommits.format.example'))}
                    </code></pre>
                  </div>

                  <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.gitCommits.types.title')}</h3>
                  <p className="rules-intro">{t('rules.gitCommits.types.desc')}</p>
                </div>

                {/* Project Structure Detailed */}
                <div id="detailed-projectStructure" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>📁 {t('rules.projectStructure.title')}</h2>
                  <p className="rules-intro">{t('rules.projectStructure.intro')}</p>
                  <div className="code-block" style={{marginTop: '1rem'}}>
                    <pre><code style={{whiteSpace: 'pre-wrap'}}>
                      {formatCode(t('rules.projectStructure.example'))}
                    </code></pre>
                  </div>

                  <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.projectStructure.files.title')}</h3>
                  <ul style={{marginLeft: '1.5rem', marginTop: '1rem', lineHeight: '1.8'}}>
                    <li><strong>README.md:</strong> {t('rules.projectStructure.files.readme')}</li>
                    <li><strong>ad.yaml:</strong> {t('rules.projectStructure.files.ad')}</li>
                    <li><strong>docs/journal.md:</strong> {t('rules.projectStructure.files.journal')}</li>
                    <li><strong>src/:</strong> {t('rules.projectStructure.files.src')}</li>
                    <li><strong>tests/:</strong> {t('rules.projectStructure.files.tests')}</li>
                  </ul>
                </div>

                {/* Project Config Detailed */}
                <div id="detailed-projectConfig" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>⚙️ {t('rules.projectConfig.title')}</h2>
                  <p className="rules-intro">{t('rules.projectConfig.intro')}</p>

                  {/* Mode: Feature vs Project */}
                  <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.projectConfig.mode.title')}</h3>
                  <p className="rules-intro">{t('rules.projectConfig.mode.intro')}</p>

                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1.5rem'}}>
                    <div style={{padding: '1.5rem', background: 'var(--bg-white)', border: '2px solid var(--color-primary)', borderRadius: 'var(--radius-lg)'}}>
                      <h4 style={{marginTop: 0, color: 'var(--color-primary)'}}>{t('rules.projectConfig.mode.feature.title')}</h4>
                      <p style={{fontSize: '0.95rem'}}>{t('rules.projectConfig.mode.feature.desc')}</p>
                    </div>
                    <div style={{padding: '1.5rem', background: 'var(--bg-white)', border: '2px solid var(--border-color)', borderRadius: 'var(--radius-lg)'}}>
                      <h4 style={{marginTop: 0}}>{t('rules.projectConfig.mode.project.title')}</h4>
                      <p style={{fontSize: '0.95rem'}}>{t('rules.projectConfig.mode.project.desc')}</p>
                    </div>
                  </div>

                  <div style={{marginTop: '1rem', padding: '1rem', background: '#fff3cd', borderLeft: '4px solid #ffc107', borderRadius: 'var(--radius-sm)'}}>
                    <strong>⚠️ Important:</strong> {t('rules.projectConfig.mode.important')}
                  </div>

                  {/* Feature Types */}
                  <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.projectConfig.featureTypes.title')}</h3>
                  <p className="rules-intro">{t('rules.projectConfig.featureTypes.intro')}</p>

                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem'}}>
                    {['feat', 'fix', 'spike', 'refactor', 'docs', 'chore'].map((type) => (
                      <div key={type} style={{padding: '1rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem'}}>
                        <code style={{fontWeight: 'bold', color: 'var(--color-primary)'}}>{type}</code>
                        <p style={{margin: '0.5rem 0 0 0'}}>{t(`rules.projectConfig.featureTypes.${type}`)}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.projectConfig.when.title')}</h3>
                  <ul style={{marginLeft: '1.5rem', marginTop: '1rem', lineHeight: '1.8'}}>
                    <li>{t('rules.projectConfig.when.solo')}</li>
                    <li>{t('rules.projectConfig.when.multi')}</li>
                  </ul>

                  <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.projectConfig.specification.title')}</h3>
                  <p className="rules-intro">{t('rules.projectConfig.specification.intro')}</p>
                  <div className="code-block" style={{marginTop: '1rem'}}>
                    <pre><code style={{whiteSpace: 'pre-wrap'}}>
                      {formatCode(t('rules.projectConfig.specification.schema'))}
                    </code></pre>
                  </div>

                  <h3 className="subsection-title" style={{marginTop: '2rem'}}>{t('rules.projectConfig.domainField.title')}</h3>
                  <p className="rules-intro">{t('rules.projectConfig.domainField.desc')}</p>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem'}}>
                    {['software', 'book', 'marketing', 'event', 'product', 'research', 'course', 'game'].map((domain) => (
                      <div key={domain} style={{padding: '1rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)'}}>
                        <code style={{fontWeight: 'bold'}}>{domain}</code>
                        <p style={{margin: '0.5rem 0 0 0', fontSize: '0.9rem'}}>{t(`rules.projectConfig.domainField.values.${domain}`)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rest of sections with similar structure... */}
                <div id="detailed-multiAgent" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>🤝 {t('rules.multiAgent.title')}</h2>
                  <p className="rules-intro">{t('rules.multiAgent.intro')}</p>
                </div>

                <div id="detailed-documentation" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>📚 {t('rules.documentation.title')}</h2>
                  <p className="rules-intro">{t('rules.documentation.intro')}</p>
                </div>

                <div id="detailed-journal" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>📓 {t('rules.journal.title')}</h2>
                  <p className="rules-intro">{t('rules.journal.intro')}</p>
                </div>

                <div id="detailed-decisions" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>⚖️ {t('rules.decisions.title')}</h2>
                  <p className="rules-intro">{t('rules.decisions.intro')}</p>
                </div>

                <div id="detailed-contracts" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>📋 {t('rules.contracts.title')}</h2>
                  <p className="rules-intro">{t('rules.contracts.intro')}</p>
                </div>

                <div id="detailed-aiWorkflow" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>🤖 {t('rules.aiWorkflow.title')}</h2>
                  <p className="rules-intro">{t('rules.aiWorkflow.intro')}</p>

                  {/* Auto-Initialization */}
                  <h3 className="subsection-title" style={{marginTop: '2rem'}}>🚀 {t('rules.aiWorkflow.autoInit.title')}</h3>
                  <p className="rules-intro">{t('rules.aiWorkflow.autoInit.intro')}</p>

                  <div style={{marginTop: '1.5rem', padding: '1.5rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-md)'}}>
                    <h4 style={{marginTop: 0, marginBottom: '1rem'}}>{t('rules.aiWorkflow.autoInit.questions.title')}</h4>
                    <ol style={{marginLeft: '1.5rem', lineHeight: '2'}}>
                      <li>{t('rules.aiWorkflow.autoInit.questions.domain')}</li>
                      <li>{t('rules.aiWorkflow.autoInit.questions.mode')}</li>
                      <li>{t('rules.aiWorkflow.autoInit.questions.detectFeatures')}</li>
                      <li>{t('rules.aiWorkflow.autoInit.questions.reorganize')}</li>
                      <li>{t('rules.aiWorkflow.autoInit.questions.multiAgent')}</li>
                    </ol>
                  </div>

                  <div style={{marginTop: '1rem', padding: '1rem', background: '#e3f2fd', borderLeft: '4px solid #2196f3', borderRadius: 'var(--radius-sm)'}}>
                    <strong>Process:</strong> {t('rules.aiWorkflow.autoInit.process')}
                  </div>

                  {/* Session Start */}
                  <h3 className="subsection-title" style={{marginTop: '2rem'}}>📋 {t('rules.aiWorkflow.sessionStart.title')}</h3>
                  <ol style={{marginLeft: '1.5rem', marginTop: '1rem', lineHeight: '2'}}>
                    <li>{t('rules.aiWorkflow.sessionStart.0')}</li>
                    <li>{t('rules.aiWorkflow.sessionStart.1')}</li>
                    <li>{t('rules.aiWorkflow.sessionStart.2')}</li>
                    <li>{t('rules.aiWorkflow.sessionStart.3')}</li>
                    <li>{t('rules.aiWorkflow.sessionStart.4')}</li>
                    <li>{t('rules.aiWorkflow.sessionStart.5')}</li>
                    <li>{t('rules.aiWorkflow.sessionStart.6')}</li>
                    <li>{t('rules.aiWorkflow.sessionStart.7')}</li>
                    <li>{t('rules.aiWorkflow.sessionStart.8')}</li>
                    <li>{t('rules.aiWorkflow.sessionStart.9')}</li>
                  </ol>
                </div>

                <div id="detailed-exitCriteria" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>🎯 {t('rules.exitCriteria.title')}</h2>
                  <p className="rules-intro">{t('rules.exitCriteria.intro')}</p>
                </div>

                <div id="detailed-troubleshooting" style={{marginTop: '4rem'}}>
                  <h2 className="rules-section-title" style={{marginBottom: '1rem'}}>🔧 {t('rules.troubleshooting.title')}</h2>
                  <p className="rules-intro">{t('rules.troubleshooting.intro')}</p>
                </div>

              </section>

            </main>

          </div>
        </div>
      </div>
    </div>
  )
}

export default RulesPage
