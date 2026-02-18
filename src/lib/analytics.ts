/**
 * Analytics Utilities
 * Event tracking and user behavior analytics
 */

import type { AnalyticsEvent, Session, DJ } from '../types'

const ANALYTICS_STORAGE_KEY = 'dmvdj-analytics'

interface AnalyticsStore {
  events: AnalyticsEvent[]
  sessionStarts: Record<string, number>
  pageViews: Record<string, number>
}

/**
 * Initialize analytics store
 */
function getStore(): AnalyticsStore {
  if (typeof window === 'undefined') {
    return { events: [], sessionStarts: {}, pageViews: {} }
  }

  try {
    const stored = localStorage.getItem(ANALYTICS_STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    console.warn('[Analytics] Failed to load store')
  }

  return { events: [], sessionStarts: {}, pageViews: {} }
}

/**
 * Save analytics store
 */
function saveStore(store: AnalyticsStore): void {
  try {
    // Keep only last 100 events
    store.events = store.events.slice(-100)
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(store))
  } catch {
    console.warn('[Analytics] Failed to save store')
  }
}

/**
 * Track an analytics event
 */
export function trackEvent(
  name: string,
  category: string,
  properties?: Record<string, unknown>
): void {
  const store = getStore()

  const event: AnalyticsEvent = {
    name,
    category,
    properties,
    timestamp: Date.now(),
  }

  store.events.push(event)
  saveStore(store)

  // Log in development
  if (import.meta.env.DEV) {
    console.log('[Analytics]', name, category, properties)
  }
}

/**
 * Track page view
 */
export function trackPageView(path: string): void {
  const store = getStore()
  store.pageViews[path] = (store.pageViews[path] ?? 0) + 1
  saveStore(store)

  trackEvent('page_view', 'navigation', { path })
}

/**
 * Track session play start
 */
export function trackSessionPlay(session: Session): void {
  const store = getStore()
  store.sessionStarts[session.id] = Date.now()
  saveStore(store)

  trackEvent('session_play', 'engagement', {
    sessionId: session.id,
    djId: session.djId,
    djName: session.djName,
    series: session.series,
    genres: session.genres,
  })
}

/**
 * Track session play end
 */
export function trackSessionEnd(session: Session, completionPercent: number): void {
  const store = getStore()
  const startTime = store.sessionStarts[session.id]

  const watchDuration = startTime ? Date.now() - startTime : 0

  trackEvent('session_end', 'engagement', {
    sessionId: session.id,
    djId: session.djId,
    completionPercent,
    watchDurationMs: watchDuration,
    completed: completionPercent >= 90,
  })

  // Clean up
  delete store.sessionStarts[session.id]
  saveStore(store)
}

/**
 * Track DJ profile view
 */
export function trackDJView(dj: DJ): void {
  trackEvent('dj_view', 'discovery', {
    djId: dj.id,
    djName: dj.name,
    genres: dj.genres,
    location: dj.location,
  })
}

/**
 * Track search
 */
export function trackSearch(query: string, resultCount: number): void {
  trackEvent('search', 'discovery', {
    query,
    resultCount,
    hasResults: resultCount > 0,
  })
}

/**
 * Track filter usage
 */
export function trackFilter(filterType: string, value: string): void {
  trackEvent('filter_apply', 'interaction', {
    filterType,
    value,
  })
}

/**
 * Track social share
 */
export function trackShare(platform: string, contentType: string, contentId: string): void {
  trackEvent('share', 'engagement', {
    platform,
    contentType,
    contentId,
  })
}

/**
 * Track favorite action
 */
export function trackFavorite(action: 'add' | 'remove', type: 'dj' | 'genre', id: string): void {
  trackEvent('favorite', 'engagement', {
    action,
    type,
    id,
  })
}

/**
 * Track newsletter signup
 */
export function trackNewsletterSignup(source: string): void {
  trackEvent('newsletter_signup', 'conversion', {
    source,
  })
}

/**
 * Track talent form submission
 */
export function trackTalentSubmission(): void {
  trackEvent('talent_form_submit', 'conversion', {})
}

/**
 * Get analytics summary
 */
export function getAnalyticsSummary(): {
  totalEvents: number
  topPages: Array<{ path: string; views: number }>
  recentEvents: AnalyticsEvent[]
} {
  const store = getStore()

  const topPages = Object.entries(store.pageViews)
    .map(([path, views]) => ({ path, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10)

  return {
    totalEvents: store.events.length,
    topPages,
    recentEvents: store.events.slice(-20).reverse(),
  }
}

/**
 * Clear analytics data
 */
export function clearAnalytics(): void {
  localStorage.removeItem(ANALYTICS_STORAGE_KEY)
}
