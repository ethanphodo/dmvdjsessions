/**
 * PWA React Hooks for DMV DJ Sessions
 * Provides hooks for PWA features like install prompts and online status
 */

import { useState, useEffect, useCallback } from 'react'
import {
  isAppInstalled,
  isInstallPromptReady,
  promptInstall,
  isOnline,
  onNetworkChange,
} from '../utils/pwa'

/**
 * Hook to detect online/offline status
 * @returns {boolean} Current online status
 */
export function useOnlineStatus() {
  const [online, setOnline] = useState(isOnline())

  useEffect(() => {
    return onNetworkChange(setOnline)
  }, [])

  return online
}

/**
 * Hook to manage PWA install prompt
 * @returns {{ canInstall: boolean, isInstalled: boolean, install: () => Promise<boolean> }}
 */
export function useInstallPrompt() {
  const [canInstall, setCanInstall] = useState(isInstallPromptReady())
  const [isInstalled, setIsInstalled] = useState(isAppInstalled())

  useEffect(() => {
    // Listen for install prompt availability
    const handleBeforeInstall = () => {
      setCanInstall(true)
    }

    const handleAppInstalled = () => {
      setIsInstalled(true)
      setCanInstall(false)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const install = useCallback(async () => {
    const accepted = await promptInstall()
    if (accepted) {
      setIsInstalled(true)
      setCanInstall(false)
    }
    return accepted
  }, [])

  return { canInstall, isInstalled, install }
}

/**
 * Hook to detect if app is running in standalone mode
 * @returns {boolean}
 */
export function useStandaloneMode() {
  const [isStandalone, setIsStandalone] = useState(isAppInstalled())

  useEffect(() => {
    const mediaQuery = window.matchMedia('(display-mode: standalone)')

    const handleChange = (e) => {
      setIsStandalone(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isStandalone
}

/**
 * Hook to show update notification when new content is available
 * @returns {{ updateAvailable: boolean, updateApp: () => void }}
 */
export function useServiceWorkerUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [registration, setRegistration] = useState(null)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    const handleControllerChange = () => {
      // New service worker activated
      window.location.reload()
    }

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange)

    // Check for waiting service worker
    navigator.serviceWorker.ready.then((reg) => {
      if (reg.waiting) {
        setUpdateAvailable(true)
        setRegistration(reg)
      }

      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true)
              setRegistration(reg)
            }
          })
        }
      })
    })

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange)
    }
  }, [])

  const updateApp = useCallback(() => {
    if (registration?.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
  }, [registration])

  return { updateAvailable, updateApp }
}

export default {
  useOnlineStatus,
  useInstallPrompt,
  useStandaloneMode,
  useServiceWorkerUpdate,
}
