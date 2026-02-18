import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

/**
 * Theme options
 * - 'dark': Dark mode (default for this site)
 * - 'light': Light mode
 * - 'system': Follow system preference
 */
const THEMES = ['dark', 'light', 'system']
const STORAGE_KEY = 'dmvdj-theme'

/**
 * Get the actual theme based on preference and system setting
 */
function getResolvedTheme(preference) {
  if (preference === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return preference
}

/**
 * Theme Provider Component
 * Manages theme state, persistence, and applies to document
 */
export function ThemeProvider({ children, defaultTheme = 'dark' }) {
  const [theme, setThemeState] = useState(() => {
    // Get from localStorage or use default
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored && THEMES.includes(stored)) {
        return stored
      }
    }
    return defaultTheme
  })

  const [resolvedTheme, setResolvedTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return getResolvedTheme(theme)
    }
    return defaultTheme
  })

  // Apply theme class to document
  useEffect(() => {
    const root = document.documentElement
    const resolved = getResolvedTheme(theme)
    setResolvedTheme(resolved)

    // Remove both classes first
    root.classList.remove('dark', 'light')
    // Add the resolved theme class
    root.classList.add(resolved)

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', resolved === 'dark' ? '#000000' : '#ffffff')
    }
  }, [theme])

  // Listen for system preference changes when using 'system' theme
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e) => {
      setResolvedTheme(e.matches ? 'dark' : 'light')
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  // Set theme and persist
  const setTheme = (newTheme) => {
    if (!THEMES.includes(newTheme)) return

    setThemeState(newTheme)
    localStorage.setItem(STORAGE_KEY, newTheme)
  }

  // Toggle between dark and light
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  // Cycle through all themes
  const cycleTheme = () => {
    const currentIndex = THEMES.indexOf(theme)
    const nextIndex = (currentIndex + 1) % THEMES.length
    setTheme(THEMES[nextIndex])
  }

  const value = {
    theme,           // User preference ('dark', 'light', 'system')
    resolvedTheme,   // Actual applied theme ('dark' or 'light')
    setTheme,        // Set specific theme
    toggleTheme,     // Toggle between dark/light
    cycleTheme,      // Cycle through all options
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isSystem: theme === 'system',
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Hook to access theme context
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
