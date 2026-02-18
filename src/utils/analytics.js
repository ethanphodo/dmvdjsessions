/**
 * Analytics utility for DMV DJ Sessions
 * Supports Google Analytics 4 and Plausible Analytics
 *
 * Configuration:
 * - Set VITE_ANALYTICS_PROVIDER to 'ga4' or 'plausible' in .env
 * - Set VITE_GA4_ID for Google Analytics (e.g., 'G-XXXXXXXXXX')
 * - Set VITE_PLAUSIBLE_DOMAIN for Plausible (e.g., 'dmvdjsessions.com')
 */

// Analytics configuration
const config = {
  provider: import.meta.env.VITE_ANALYTICS_PROVIDER || 'none',
  ga4Id: import.meta.env.VITE_GA4_ID || '',
  plausibleDomain: import.meta.env.VITE_PLAUSIBLE_DOMAIN || '',
}

// Check if analytics consent has been given
export const hasAnalyticsConsent = () => {
  return localStorage.getItem('analytics-consent') === 'accepted'
}

// Set analytics consent
export const setAnalyticsConsent = (accepted) => {
  localStorage.setItem('analytics-consent', accepted ? 'accepted' : 'declined')
  if (accepted) {
    initAnalytics()
  }
}

// Initialize analytics based on provider
export const initAnalytics = () => {
  if (!hasAnalyticsConsent()) return

  if (config.provider === 'ga4' && config.ga4Id) {
    initGA4()
  } else if (config.provider === 'plausible' && config.plausibleDomain) {
    initPlausible()
  }
}

// Initialize Google Analytics 4
const initGA4 = () => {
  if (window.gtag) return // Already initialized

  // Load GA4 script
  const script = document.createElement('script')
  script.src = `https://www.googletagmanager.com/gtag/js?id=${config.ga4Id}`
  script.async = true
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  window.gtag = function() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', config.ga4Id, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  })
}

// Initialize Plausible Analytics
const initPlausible = () => {
  if (document.querySelector('script[data-domain]')) return // Already initialized

  const script = document.createElement('script')
  script.defer = true
  script.setAttribute('data-domain', config.plausibleDomain)
  script.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(script)

  // Initialize plausible function
  window.plausible = window.plausible || function() {
    (window.plausible.q = window.plausible.q || []).push(arguments)
  }
}

// Track page view
export const trackPageView = (path, title) => {
  if (!hasAnalyticsConsent()) return

  if (config.provider === 'ga4' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    })
  } else if (config.provider === 'plausible' && window.plausible) {
    window.plausible('pageview', { u: path })
  }
}

// Track custom event
export const trackEvent = (eventName, props = {}) => {
  if (!hasAnalyticsConsent()) return

  if (config.provider === 'ga4' && window.gtag) {
    window.gtag('event', eventName, props)
  } else if (config.provider === 'plausible' && window.plausible) {
    window.plausible(eventName, { props })
  }
}

// Pre-defined event trackers

// Video events
export const trackVideoPlay = (videoId, videoTitle, djName) => {
  trackEvent('video_play', {
    video_id: videoId,
    video_title: videoTitle,
    dj_name: djName,
  })
}

export const trackVideoComplete = (videoId, videoTitle, watchTime) => {
  trackEvent('video_complete', {
    video_id: videoId,
    video_title: videoTitle,
    watch_time_seconds: watchTime,
  })
}

// Form events
export const trackFormStart = (formName) => {
  trackEvent('form_start', {
    form_name: formName,
  })
}

export const trackFormSubmit = (formName, success = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  })
}

// Filter events
export const trackFilterUse = (filterType, filterValue) => {
  trackEvent('filter_use', {
    filter_type: filterType,
    filter_value: filterValue,
  })
}

// Search events
export const trackSearch = (searchTerm, resultCount) => {
  trackEvent('search', {
    search_term: searchTerm,
    result_count: resultCount,
  })
}

// DJ profile events
export const trackDJProfileView = (djId, djName) => {
  trackEvent('dj_profile_view', {
    dj_id: djId,
    dj_name: djName,
  })
}

// Social link clicks
export const trackSocialClick = (platform, djName = null) => {
  trackEvent('social_click', {
    platform: platform,
    dj_name: djName,
  })
}

// Newsletter signup
export const trackNewsletterSignup = (source) => {
  trackEvent('newsletter_signup', {
    source: source,
  })
}

// External link clicks
export const trackExternalLink = (url, context) => {
  trackEvent('external_link_click', {
    url: url,
    context: context,
  })
}

// Scroll depth tracking
export const trackScrollDepth = (depth, pagePath) => {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
    page_path: pagePath,
  })
}

export default {
  initAnalytics,
  hasAnalyticsConsent,
  setAnalyticsConsent,
  trackPageView,
  trackEvent,
  trackVideoPlay,
  trackVideoComplete,
  trackFormStart,
  trackFormSubmit,
  trackFilterUse,
  trackSearch,
  trackDJProfileView,
  trackSocialClick,
  trackNewsletterSignup,
  trackExternalLink,
  trackScrollDepth,
}
