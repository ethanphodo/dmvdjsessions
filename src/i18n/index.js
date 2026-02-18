/**
 * i18n (Internationalization) for DMV DJ Sessions
 * Lightweight translation system without external dependencies
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

// Import locale files
import en from './locales/en.json'
import es from './locales/es.json'

// Available locales
export const LOCALES = {
  en: { name: 'English', code: 'en', flag: '🇺🇸' },
  es: { name: 'Español', code: 'es', flag: '🇪🇸' },
}

// Translations map
const translations = { en, es }

// Storage key
const STORAGE_KEY = 'dmvdj-locale'

// Default locale
const DEFAULT_LOCALE = 'en'

/**
 * Get nested value from object using dot notation
 * @param {Object} obj - The object to traverse
 * @param {string} path - Dot-notation path (e.g., 'home.hero.title')
 * @returns {string|undefined}
 */
function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined
  }, obj)
}

/**
 * Interpolate variables in translation string
 * @param {string} str - Translation string with {{var}} placeholders
 * @param {Object} vars - Variables to interpolate
 * @returns {string}
 */
function interpolate(str, vars = {}) {
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return vars[key] !== undefined ? vars[key] : match
  })
}

/**
 * Detect user's preferred locale
 * @returns {string}
 */
function detectLocale() {
  // Check localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && LOCALES[stored]) {
      return stored
    }

    // Check browser language
    const browserLang = navigator.language?.split('-')[0]
    if (browserLang && LOCALES[browserLang]) {
      return browserLang
    }
  }

  return DEFAULT_LOCALE
}

// Create context
const I18nContext = createContext(null)

/**
 * i18n Provider Component
 */
export function I18nProvider({ children, defaultLocale }) {
  const [locale, setLocaleState] = useState(() => {
    return defaultLocale || detectLocale()
  })

  // Update document language attribute
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  // Set locale and persist
  const setLocale = useCallback((newLocale) => {
    if (!LOCALES[newLocale]) {
      console.warn(`[i18n] Unknown locale: ${newLocale}`)
      return
    }

    setLocaleState(newLocale)
    localStorage.setItem(STORAGE_KEY, newLocale)
  }, [])

  // Translation function
  const t = useCallback((key, vars = {}) => {
    const translation = getNestedValue(translations[locale], key)

    if (translation === undefined) {
      // Fallback to English
      const fallback = getNestedValue(translations[DEFAULT_LOCALE], key)
      if (fallback === undefined) {
        console.warn(`[i18n] Missing translation: ${key}`)
        return key
      }
      return interpolate(fallback, vars)
    }

    return interpolate(translation, vars)
  }, [locale])

  // Get all translations for current locale (for passing to components)
  const getTranslations = useCallback((namespace) => {
    const namespaceTranslations = getNestedValue(translations[locale], namespace)
    return namespaceTranslations || {}
  }, [locale])

  const value = {
    locale,
    setLocale,
    t,
    getTranslations,
    locales: LOCALES,
    isRTL: false, // Add RTL locales support if needed
  }

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}

/**
 * Hook to access i18n context
 */
export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}

/**
 * Hook for translations only (convenience)
 */
export function useTranslation(namespace) {
  const { t, locale, getTranslations } = useI18n()

  // If namespace provided, prefix all keys
  const translate = useCallback((key, vars) => {
    const fullKey = namespace ? `${namespace}.${key}` : key
    return t(fullKey, vars)
  }, [t, namespace])

  return {
    t: translate,
    locale,
    translations: namespace ? getTranslations(namespace) : {},
  }
}

/**
 * Format date according to locale
 */
export function formatDate(date, locale, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return new Date(date).toLocaleDateString(locale, { ...defaultOptions, ...options })
}

/**
 * Format number according to locale
 */
export function formatNumber(number, locale, options = {}) {
  return new Intl.NumberFormat(locale, options).format(number)
}

/**
 * Format currency according to locale
 */
export function formatCurrency(amount, locale, currency = 'USD') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date, locale) {
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const now = new Date()
  const diff = new Date(date) - now

  const seconds = Math.round(diff / 1000)
  const minutes = Math.round(diff / 60000)
  const hours = Math.round(diff / 3600000)
  const days = Math.round(diff / 86400000)
  const weeks = Math.round(diff / 604800000)
  const months = Math.round(diff / 2629800000)
  const years = Math.round(diff / 31557600000)

  if (Math.abs(seconds) < 60) return rtf.format(seconds, 'second')
  if (Math.abs(minutes) < 60) return rtf.format(minutes, 'minute')
  if (Math.abs(hours) < 24) return rtf.format(hours, 'hour')
  if (Math.abs(days) < 7) return rtf.format(days, 'day')
  if (Math.abs(weeks) < 4) return rtf.format(weeks, 'week')
  if (Math.abs(months) < 12) return rtf.format(months, 'month')
  return rtf.format(years, 'year')
}

export default {
  I18nProvider,
  useI18n,
  useTranslation,
  formatDate,
  formatNumber,
  formatCurrency,
  formatRelativeTime,
  LOCALES,
}
