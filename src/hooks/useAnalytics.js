import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView, initAnalytics, hasAnalyticsConsent } from '../utils/analytics'

/**
 * Hook to automatically track page views on route changes
 * Also initializes analytics on mount if consent has been given
 */
export function usePageTracking() {
  const location = useLocation()

  // Initialize analytics on mount if consent exists
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      initAnalytics()
    }
  }, [])

  // Track page views on route change
  useEffect(() => {
    if (hasAnalyticsConsent()) {
      trackPageView(location.pathname, document.title)
    }
  }, [location.pathname])
}

/**
 * Hook for scroll depth tracking
 * Tracks when user scrolls to 25%, 50%, 75%, and 100% of page
 */
export function useScrollDepthTracking() {
  const location = useLocation()

  useEffect(() => {
    if (!hasAnalyticsConsent()) return

    const depths = [25, 50, 75, 100]
    const tracked = new Set()

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return

      const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100)

      depths.forEach((depth) => {
        if (scrollPercent >= depth && !tracked.has(depth)) {
          tracked.add(depth)
          import('../utils/analytics').then(({ trackScrollDepth }) => {
            trackScrollDepth(depth, location.pathname)
          })
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])
}

export default usePageTracking
