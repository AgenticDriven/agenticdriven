import { useState, useEffect } from 'react'
import './App.css'
import { useLanguage } from './i18n/LanguageContext'
import LanguageSelector from './components/LanguageSelector'
import HomePage from './pages/HomePage'
import RulesPage from './pages/RulesPage'

function App() {
  const { t } = useLanguage()
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedIDE, setSelectedIDE] = useState(null)

  // Handle hash navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) // Remove #
      if (hash === 'rules') {
        setCurrentPage('rules')
      } else if (hash === '' || hash === 'home') {
        setCurrentPage('home')
      }
    }

    // Check initial hash
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleNavigate = (page, anchor = '') => {
    setCurrentPage(page)
    window.location.hash = page

    // Scroll to top or anchor
    if (anchor) {
      setTimeout(() => {
        const element = document.querySelector(anchor)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }

  return (
    <div className="app">
      {/* Language Selector - Fixed Top Right */}
      <LanguageSelector />

      {/* Page Content */}
      {currentPage === 'home' && (
        <HomePage
          onNavigate={handleNavigate}
          onSelectIDE={setSelectedIDE}
        />
      )}

      {currentPage === 'rules' && (
        <RulesPage
          onNavigate={handleNavigate}
        />
      )}

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
                <li><a href="#quick-start" onClick={() => handleNavigate('home', '#quick-start')}>{t('footer.sections.resources.quickStart')}</a></li>
                <li><a href="#rules" onClick={() => handleNavigate('rules')}>{t('footer.sections.resources.fullRules')}</a></li>
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
                href={`/rules/ide/${selectedIDE.file}`}
                className="modal-btn modal-btn-view"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>👁️</span>
                <span>{t('modal.viewRaw')}</span>
              </a>
              <a
                href={`/rules/ide/${selectedIDE.file}`}
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
