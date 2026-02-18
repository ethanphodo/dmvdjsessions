/**
 * PWA Utilities for DMV DJ Sessions
 * Service worker registration and PWA features
 */

/**
 * Register the service worker
 * Only registers in production by default
 */
export async function registerServiceWorker(options = {}) {
  const {
    immediate = false,
    onSuccess = () => {},
    onUpdate = () => {},
    onError = () => {},
  } = options

  // Check for service worker support
  if (!('serviceWorker' in navigator)) {
    console.log('[PWA] Service workers not supported')
    return null
  }

  // Only register in production unless forced
  if (!immediate && import.meta.env.DEV) {
    console.log('[PWA] Skipping SW registration in development')
    return null
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    })

    console.log('[PWA] Service worker registered:', registration.scope)

    // Check for updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing

      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // New content available
              console.log('[PWA] New content available')
              onUpdate(registration)
            } else {
              // Content cached for offline use
              console.log('[PWA] Content cached for offline use')
              onSuccess(registration)
            }
          }
        })
      }
    })

    return registration
  } catch (error) {
    console.error('[PWA] Service worker registration failed:', error)
    onError(error)
    return null
  }
}

/**
 * Unregister all service workers
 */
export async function unregisterServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return false
  }

  try {
    const registration = await navigator.serviceWorker.ready
    const success = await registration.unregister()
    console.log('[PWA] Service worker unregistered:', success)
    return success
  } catch (error) {
    console.error('[PWA] Failed to unregister service worker:', error)
    return false
  }
}

/**
 * Check if app is installed (standalone mode)
 */
export function isAppInstalled() {
  // Check display-mode
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return true
  }

  // iOS Safari
  if (window.navigator.standalone === true) {
    return true
  }

  return false
}

/**
 * Check if app can be installed
 */
export function canInstallApp() {
  return 'BeforeInstallPromptEvent' in window ||
         // iOS doesn't have BeforeInstallPromptEvent but supports Add to Home Screen
         (/iPhone|iPad|iPod/.test(navigator.userAgent) && !window.navigator.standalone)
}

/**
 * Install prompt handler
 * Usage:
 *   const { prompt, isReady } = useInstallPrompt()
 *   if (isReady) prompt()
 */
let deferredPrompt = null

export function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67+ from automatically showing the prompt
    e.preventDefault()
    // Stash the event for later
    deferredPrompt = e
    console.log('[PWA] Install prompt ready')
  })

  window.addEventListener('appinstalled', () => {
    console.log('[PWA] App installed')
    deferredPrompt = null
  })
}

export async function promptInstall() {
  if (!deferredPrompt) {
    console.log('[PWA] No install prompt available')
    return false
  }

  // Show the install prompt
  deferredPrompt.prompt()

  // Wait for user choice
  const { outcome } = await deferredPrompt.userChoice
  console.log('[PWA] Install prompt outcome:', outcome)

  // Clear the prompt
  deferredPrompt = null

  return outcome === 'accepted'
}

export function isInstallPromptReady() {
  return deferredPrompt !== null
}

/**
 * Request persistent storage
 */
export async function requestPersistentStorage() {
  if (!navigator.storage?.persist) {
    return false
  }

  const isPersisted = await navigator.storage.persist()
  console.log('[PWA] Persistent storage:', isPersisted)
  return isPersisted
}

/**
 * Get storage estimate
 */
export async function getStorageEstimate() {
  if (!navigator.storage?.estimate) {
    return null
  }

  const estimate = await navigator.storage.estimate()
  return {
    usage: estimate.usage,
    quota: estimate.quota,
    usagePercent: ((estimate.usage / estimate.quota) * 100).toFixed(2),
  }
}

/**
 * Clear all caches
 */
export async function clearCaches() {
  if (!('caches' in window)) {
    return false
  }

  const cacheNames = await caches.keys()
  await Promise.all(cacheNames.map((name) => caches.delete(name)))
  console.log('[PWA] All caches cleared')
  return true
}

/**
 * Check online status
 */
export function isOnline() {
  return navigator.onLine
}

/**
 * Subscribe to online/offline events
 */
export function onNetworkChange(callback) {
  const handleOnline = () => callback(true)
  const handleOffline = () => callback(false)

  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}

export default {
  registerServiceWorker,
  unregisterServiceWorker,
  isAppInstalled,
  canInstallApp,
  setupInstallPrompt,
  promptInstall,
  isInstallPromptReady,
  requestPersistentStorage,
  getStorageEstimate,
  clearCaches,
  isOnline,
  onNetworkChange,
}
