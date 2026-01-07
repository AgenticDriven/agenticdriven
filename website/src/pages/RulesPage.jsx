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

              {/* 3. Working with ADW Section */}
              <section id="working-with-adw" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">💻</span>
                  <h2 className="rules-section-title">{t('rules.workingWithADW.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.workingWithADW.intro')}</p>

                {/* Phases with Prompts */}
                {['define', 'discover', 'design', 'setup', 'build', 'validate', 'market', 'launch', 'support', 'evolve'].map((phase) => (
                  <div key={phase} style={{marginTop: '3rem', padding: '2rem', background: 'var(--bg-white)', border: '2px solid var(--border-color)', borderRadius: 'var(--radius-lg)'}}>
                    <h3 style={{marginTop: 0, color: 'var(--color-primary)'}}>{t(`rules.workingWithADW.phases.${phase}.name`)}</h3>
                    <p style={{fontWeight: 600, marginBottom: '1rem'}}>🎯 {t(`rules.workingWithADW.phases.${phase}.goal`)}</p>
                    
                    <h4 style={{marginTop: '1.5rem', marginBottom: '0.5rem'}}>Prompt para tu IA:</h4>
                    <div style={{background: '#f0f4ff', padding: '1.5rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--color-primary)'}}>
                      <pre style={{whiteSpace: 'pre-wrap', fontFamily: 'inherit', margin: 0, fontSize: '0.95rem'}}>
                        {formatCode(t(`rules.workingWithADW.phases.${phase}.prompt`))}
                      </pre>
                    </div>

                    <div style={{marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
                      <div style={{flex: 1, minWidth: '200px'}}>
                        <strong>Entregables:</strong>
                        <p style={{margin: '0.5rem 0 0 0', fontSize: '0.9rem'}}>{t(`rules.workingWithADW.phases.${phase}.deliverables`)}</p>
                      </div>
                      <div style={{flex: 1, minWidth: '200px'}}>
                        <strong>Exit Criteria:</strong>
                        <p style={{margin: '0.5rem 0 0 0', fontSize: '0.9rem'}}>{t(`rules.workingWithADW.phases.${phase}.exit`)}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Common Commands */}
                <h3 className="subsection-title" style={{marginTop: '3rem'}}>{t('rules.workingWithADW.commonCommands.title')}</h3>
                <ul style={{listStyle: 'none', padding: 0, marginTop: '1rem'}}>
                  <li style={{padding: '0.75rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem'}}>
                    <code>{t('rules.workingWithADW.commonCommands.status')}</code>
                  </li>
                  <li style={{padding: '0.75rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem'}}>
                    <code>{t('rules.workingWithADW.commonCommands.log')}</code>
                  </li>
                  <li style={{padding: '0.75rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem'}}>
                    <code>{t('rules.workingWithADW.commonCommands.journal')}</code>
                  </li>
                  <li style={{padding: '0.75rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem'}}>
                    <code>{t('rules.workingWithADW.commonCommands.version')}</code>
                  </li>
                  <li style={{padding: '0.75rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem'}}>
                    <code>{t('rules.workingWithADW.commonCommands.commit')}</code>
                  </li>
                  <li style={{padding: '0.75rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem'}}>
                    <code>{t('rules.workingWithADW.commonCommands.tag')}</code>
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

              {/* 5. Detailed Documentation - Placeholder for now */}
              <section id="detailed" className="rules-section">
                <div className="section-header-fancy">
                  <span className="section-icon">📚</span>
                  <h2 className="rules-section-title">{t('rules.detailed.title')}</h2>
                </div>
                <p className="rules-intro">{t('rules.detailed.intro')}</p>
                <p className="rules-intro" style={{marginTop: '1rem', padding: '1rem', background: 'var(--bg-light)', borderRadius: 'var(--radius-md)'}}>
                  🚧 Esta sección contendrá toda la documentación detallada (13 Principios explicados, 10 Fases con ejemplos, Configuraciones avanzadas, etc.). En desarrollo.
                </p>
              </section>

            </main>

          </div>
        </div>
      </div>
    </div>
  )
}

export default RulesPage
