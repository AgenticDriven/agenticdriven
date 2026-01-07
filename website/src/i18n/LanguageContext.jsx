import { createContext, useContext, useState, useEffect } from 'react'

// Import all translations
import en from './locales/en.json'
import es from './locales/es.json'
import zh from './locales/zh.json'
import de from './locales/de.json'
import ru from './locales/ru.json'
import hi from './locales/hi.json'

const translations = {
  en,
  es,
  zh,
  de,
  ru,
  hi
}

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  // Get initial language from localStorage or browser, default to 'en'
  const getInitialLanguage = () => {
    const stored = localStorage.getItem('language')
    if (stored && translations[stored]) {
      return stored
    }

    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0]
    if (translations[browserLang]) {
      return browserLang
    }

    return 'en'
  }

  const [language, setLanguage] = useState(getInitialLanguage)

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const t = (path) => {
    const keys = path.split('.')
    let value = translations[language]

    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key]
      } else {
        return path // Return the path if translation not found
      }
    }

    return value || path
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
]
