/**
 * Social Authentication Hook for DMV DJ Sessions
 * Provides React hook for OAuth authentication flow
 */

import { useState, useEffect, useCallback } from 'react'
import {
  initiateOAuth,
  handleOAuthCallback,
  signOut as authSignOut,
  getStoredToken,
  getEnabledProviders,
  normalizeUserProfile,
  PROVIDERS,
} from '../utils/socialAuth'

/**
 * Hook for social authentication
 * @returns {Object} Auth state and methods
 */
export function useSocialAuth() {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeProvider, setActiveProvider] = useState(null)

  // Check for existing auth on mount
  useEffect(() => {
    const providers = getEnabledProviders()
    for (const provider of providers) {
      const token = getStoredToken(provider)
      if (token?.user) {
        setUser(token.user)
        setActiveProvider(provider)
        break
      }
    }
  }, [])

  /**
   * Sign in with a provider
   */
  const signIn = useCallback(async (provider, options = {}) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await initiateOAuth(provider, {
        popup: options.popup ?? true,
        ...options,
      })

      // If using popup, result contains the auth data
      if (result && result.code) {
        // At this point, you would typically:
        // 1. Send the code to your backend
        // 2. Backend exchanges code for tokens
        // 3. Backend fetches user info
        // 4. Backend creates session/JWT
        // 5. Return user data to frontend

        // For now, we'll just store that auth was initiated
        console.log('[Auth] OAuth code received:', result)

        // You would replace this with actual backend call
        // const response = await fetch('/api/auth/callback', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(result),
        // })
        // const userData = await response.json()
        // setUser(userData)
        // setActiveProvider(provider)
      }
    } catch (err) {
      setError(err.message)
      console.error('[Auth] Sign in failed:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  /**
   * Sign out
   */
  const signOut = useCallback(() => {
    if (activeProvider) {
      authSignOut(activeProvider)
    }
    setUser(null)
    setActiveProvider(null)
    setError(null)
  }, [activeProvider])

  /**
   * Get available providers
   */
  const providers = getEnabledProviders().map((key) => ({
    key,
    ...PROVIDERS[key],
  }))

  return {
    user,
    isLoading,
    error,
    activeProvider,
    isAuthenticated: !!user,
    providers,
    signIn,
    signOut,
    clearError: () => setError(null),
  }
}

/**
 * Hook for handling OAuth callback page
 * @param {string} provider - The OAuth provider
 */
export function useOAuthCallback(provider) {
  const [status, setStatus] = useState('processing')
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    const processCallback = async () => {
      try {
        const result = await handleOAuthCallback(provider)
        setData(result)
        setStatus('success')

        // If in popup, post message to opener
        if (window.opener) {
          window.opener.postMessage(
            { type: 'oauth_callback', provider, ...result },
            window.location.origin
          )
          // Close popup after short delay
          setTimeout(() => window.close(), 1000)
        }
      } catch (err) {
        setError(err.message)
        setStatus('error')

        // If in popup, post error to opener
        if (window.opener) {
          window.opener.postMessage(
            { type: 'oauth_callback', provider, error: err.message },
            window.location.origin
          )
        }
      }
    }

    processCallback()
  }, [provider])

  return { status, error, data }
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const providers = getEnabledProviders()
    const hasAuth = providers.some((provider) => {
      const token = getStoredToken(provider)
      return !!token?.user
    })
    setIsAuthenticated(hasAuth)
  }, [])

  return isAuthenticated
}

export default useSocialAuth
