import { useState, useEffect, useCallback } from 'react'
import type { UserPreferences, ThemeMode, Locale, Genre } from '../types'

const STORAGE_KEY = 'dmvdj-user-preferences'

const defaultPreferences: UserPreferences = {
  theme: 'dark',
  locale: 'en',
  favoriteGenres: [],
  viewedSessions: [],
  favoriteDJs: [],
  lastVisitedPages: [],
  notificationsEnabled: false,
}

/**
 * Hook to manage user preferences with localStorage persistence
 * Enables personalization features without external services
 */
export function useUserPreferences() {
  const [preferences, setPreferencesState] = useState<UserPreferences>(() => {
    if (typeof window === 'undefined') return defaultPreferences

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return { ...defaultPreferences, ...JSON.parse(stored) }
      }
    } catch {
      console.warn('[useUserPreferences] Failed to load preferences')
    }
    return defaultPreferences
  })

  // Persist preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
    } catch {
      console.warn('[useUserPreferences] Failed to save preferences')
    }
  }, [preferences])

  // Update preferences
  const setPreferences = useCallback((updates: Partial<UserPreferences>) => {
    setPreferencesState((prev) => ({ ...prev, ...updates }))
  }, [])

  // Theme management
  const setTheme = useCallback((theme: ThemeMode) => {
    setPreferences({ theme })
  }, [setPreferences])

  // Locale management
  const setLocale = useCallback((locale: Locale) => {
    setPreferences({ locale })
  }, [setPreferences])

  // Track session view
  const trackSessionView = useCallback((sessionId: string) => {
    setPreferencesState((prev) => {
      const viewedSessions = prev.viewedSessions.filter((id) => id !== sessionId)
      // Keep last 50 viewed sessions
      return {
        ...prev,
        viewedSessions: [sessionId, ...viewedSessions].slice(0, 50),
      }
    })
  }, [])

  // Track page visit
  const trackPageVisit = useCallback((path: string) => {
    setPreferencesState((prev) => {
      const lastVisitedPages = prev.lastVisitedPages.filter((p) => p !== path)
      // Keep last 20 pages
      return {
        ...prev,
        lastVisitedPages: [path, ...lastVisitedPages].slice(0, 20),
      }
    })
  }, [])

  // Add favorite genre
  const addFavoriteGenre = useCallback((genre: Genre) => {
    setPreferencesState((prev) => {
      if (prev.favoriteGenres.includes(genre)) return prev
      return {
        ...prev,
        favoriteGenres: [...prev.favoriteGenres, genre],
      }
    })
  }, [])

  // Remove favorite genre
  const removeFavoriteGenre = useCallback((genre: Genre) => {
    setPreferencesState((prev) => ({
      ...prev,
      favoriteGenres: prev.favoriteGenres.filter((g) => g !== genre),
    }))
  }, [])

  // Toggle favorite DJ
  const toggleFavoriteDJ = useCallback((djId: string) => {
    setPreferencesState((prev) => {
      const isFavorite = prev.favoriteDJs.includes(djId)
      return {
        ...prev,
        favoriteDJs: isFavorite
          ? prev.favoriteDJs.filter((id) => id !== djId)
          : [...prev.favoriteDJs, djId],
      }
    })
  }, [])

  // Check if DJ is favorite
  const isDJFavorite = useCallback(
    (djId: string) => preferences.favoriteDJs.includes(djId),
    [preferences.favoriteDJs]
  )

  // Check if session was viewed
  const hasViewedSession = useCallback(
    (sessionId: string) => preferences.viewedSessions.includes(sessionId),
    [preferences.viewedSessions]
  )

  // Toggle notifications
  const toggleNotifications = useCallback(() => {
    setPreferencesState((prev) => ({
      ...prev,
      notificationsEnabled: !prev.notificationsEnabled,
    }))
  }, [])

  // Clear all preferences
  const clearPreferences = useCallback(() => {
    setPreferencesState(defaultPreferences)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  // Get genre affinity scores based on viewing history
  const getGenreAffinityScores = useCallback((): Record<string, number> => {
    const scores: Record<string, number> = {}

    // Weight favorite genres heavily
    preferences.favoriteGenres.forEach((genre) => {
      scores[genre] = (scores[genre] ?? 0) + 10
    })

    return scores
  }, [preferences.favoriteGenres])

  return {
    preferences,
    setPreferences,
    setTheme,
    setLocale,
    trackSessionView,
    trackPageVisit,
    addFavoriteGenre,
    removeFavoriteGenre,
    toggleFavoriteDJ,
    isDJFavorite,
    hasViewedSession,
    toggleNotifications,
    clearPreferences,
    getGenreAffinityScores,
  }
}

export default useUserPreferences
