/**
 * Error Tracking Utility for DMV DJ Sessions
 * Provides error monitoring API that works with or without Sentry
 *
 * Configuration:
 * - Set VITE_SENTRY_DSN in .env for Sentry integration
 * - Set VITE_SENTRY_ENVIRONMENT for environment tagging
 *
 * To enable Sentry:
 * 1. Install: npm install @sentry/react
 * 2. Import and initialize in main.jsx:
 *    import * as Sentry from '@sentry/react'
 *    Sentry.init({ dsn: import.meta.env.VITE_SENTRY_DSN })
 * 3. The functions below will automatically use Sentry when available
 */

// Configuration
const config = {
  dsn: import.meta.env.VITE_SENTRY_DSN || '',
  environment: import.meta.env.VITE_SENTRY_ENVIRONMENT || import.meta.env.MODE || 'development',
  release: import.meta.env.VITE_APP_VERSION || '1.0.0',
  enabled: import.meta.env.PROD && !!import.meta.env.VITE_SENTRY_DSN,
}

/**
 * Check if Sentry is available (loaded via separate script or import)
 */
const getSentry = () => {
  if (typeof window !== 'undefined' && window.Sentry) {
    return window.Sentry
  }
  return null
}

/**
 * Initialize error tracking
 * This is a no-op if Sentry isn't loaded - actual initialization
 * should happen in main.jsx with the Sentry SDK
 */
export const initErrorTracking = () => {
  if (!config.enabled) {
    console.log('[ErrorTracking] Disabled (development mode or missing DSN)')
    return
  }

  const Sentry = getSentry()
  if (Sentry) {
    console.log('[ErrorTracking] Sentry is available')
  } else {
    console.log('[ErrorTracking] Sentry not loaded - errors will be logged to console only')
    console.log('[ErrorTracking] To enable Sentry, install @sentry/react and initialize in main.jsx')
  }
}

/**
 * Capture an exception
 * Falls back to console.error if Sentry isn't available
 */
export const captureException = (error, context = {}) => {
  console.error('[Error]', error, context)

  const Sentry = getSentry()
  if (Sentry) {
    Sentry.captureException(error, { extra: context })
  }
}

/**
 * Capture a message (non-error event)
 */
export const captureMessage = (message, level = 'info', context = {}) => {
  console.log(`[${level.toUpperCase()}]`, message, context)

  const Sentry = getSentry()
  if (Sentry) {
    Sentry.captureMessage(message, { level, extra: context })
  }
}

/**
 * Set user context for error tracking
 */
export const setUser = (user) => {
  const Sentry = getSentry()
  if (Sentry) {
    Sentry.setUser(user)
  }
}

/**
 * Clear user context
 */
export const clearUser = () => {
  const Sentry = getSentry()
  if (Sentry) {
    Sentry.setUser(null)
  }
}

/**
 * Add breadcrumb for debugging
 */
export const addBreadcrumb = (breadcrumb) => {
  const Sentry = getSentry()
  if (Sentry) {
    Sentry.addBreadcrumb(breadcrumb)
  }
}

/**
 * Set custom tag
 */
export const setTag = (key, value) => {
  const Sentry = getSentry()
  if (Sentry) {
    Sentry.setTag(key, value)
  }
}

/**
 * Set extra context data
 */
export const setExtra = (key, value) => {
  const Sentry = getSentry()
  if (Sentry) {
    Sentry.setExtra(key, value)
  }
}

/**
 * Wrap a function with error tracking
 */
export const withErrorTracking = (fn, context = {}) => {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      captureException(error, { ...context, args })
      throw error
    }
  }
}

/**
 * Get Sentry configuration for reference
 */
export const getConfig = () => ({
  dsn: config.dsn,
  environment: config.environment,
  release: config.release,
  enabled: config.enabled,
})

/**
 * Example Sentry initialization for main.jsx:
 *
 * import * as Sentry from '@sentry/react'
 * import { getConfig } from './utils/errorTracking'
 *
 * const sentryConfig = getConfig()
 * if (sentryConfig.enabled) {
 *   Sentry.init({
 *     dsn: sentryConfig.dsn,
 *     environment: sentryConfig.environment,
 *     release: sentryConfig.release,
 *     integrations: [
 *       Sentry.browserTracingIntegration(),
 *       Sentry.replayIntegration(),
 *     ],
 *     tracesSampleRate: 0.2,
 *     replaysSessionSampleRate: 0.1,
 *     replaysOnErrorSampleRate: 1.0,
 *   })
 * }
 */

export default {
  initErrorTracking,
  captureException,
  captureMessage,
  setUser,
  clearUser,
  addBreadcrumb,
  setTag,
  setExtra,
  withErrorTracking,
  getConfig,
}
