import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n, LOCALES } from '../../i18n'
import { useTheme } from '../../contexts/ThemeContext'

/**
 * Language Switcher Dropdown
 * Allows users to switch between available languages
 */
export default function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale } = useI18n()
  const { isDark } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLocale = LOCALES[locale]
  const otherLocales = Object.values(LOCALES).filter((l) => l.code !== locale)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSelect = (code) => {
    setLocale(code)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
          isDark
            ? 'hover:bg-white/10 text-gray-400 hover:text-white'
            : 'hover:bg-black/10 text-gray-600 hover:text-black'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={`Language: ${currentLocale.name}`}
      >
        <span className="text-base" aria-hidden="true">
          {currentLocale.flag}
        </span>
        <span className="text-xs uppercase tracking-wider font-medium">
          {currentLocale.code}
        </span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 mt-2 py-1 rounded-lg shadow-xl border z-50 min-w-[140px] ${
              isDark
                ? 'bg-black/95 border-white/10 backdrop-blur-xl'
                : 'bg-white border-gray-200'
            }`}
            role="listbox"
            aria-label="Select language"
          >
            {/* Current locale (highlighted) */}
            <li
              className={`flex items-center gap-3 px-4 py-2 ${
                isDark ? 'text-white bg-white/5' : 'text-black bg-black/5'
              }`}
              role="option"
              aria-selected="true"
            >
              <span className="text-base">{currentLocale.flag}</span>
              <span className="text-sm font-medium">{currentLocale.name}</span>
              <svg
                className="w-4 h-4 ml-auto text-[#D6A756]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </li>

            {/* Other locales */}
            {otherLocales.map((localeOption) => (
              <li key={localeOption.code}>
                <button
                  onClick={() => handleSelect(localeOption.code)}
                  className={`w-full flex items-center gap-3 px-4 py-2 transition-colors ${
                    isDark
                      ? 'text-gray-400 hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-black hover:bg-black/5'
                  }`}
                  role="option"
                  aria-selected="false"
                >
                  <span className="text-base">{localeOption.flag}</span>
                  <span className="text-sm">{localeOption.name}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Compact Language Switcher (just flags)
 */
export function LanguageSwitcherCompact({ className = '' }) {
  const { locale, setLocale } = useI18n()
  const { isDark } = useTheme()

  const localeOptions = Object.values(LOCALES)

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {localeOptions.map((localeOption) => (
        <button
          key={localeOption.code}
          onClick={() => setLocale(localeOption.code)}
          className={`p-2 rounded-lg transition-all ${
            locale === localeOption.code
              ? isDark
                ? 'bg-white/10 scale-110'
                : 'bg-black/10 scale-110'
              : isDark
                ? 'opacity-50 hover:opacity-100'
                : 'opacity-50 hover:opacity-100'
          }`}
          aria-label={localeOption.name}
          aria-pressed={locale === localeOption.code}
        >
          <span className="text-lg">{localeOption.flag}</span>
        </button>
      ))}
    </div>
  )
}
