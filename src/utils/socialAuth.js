/**
 * Social Authentication Utilities for DMV DJ Sessions
 * Provides OAuth integration with various social providers
 *
 * Configuration:
 * Set environment variables for each provider you want to enable:
 * - VITE_GOOGLE_CLIENT_ID
 * - VITE_SPOTIFY_CLIENT_ID
 * - VITE_DISCORD_CLIENT_ID
 * - VITE_TWITTER_CLIENT_ID
 */

// OAuth Provider configurations
export const PROVIDERS = {
  google: {
    name: 'Google',
    icon: 'google',
    color: '#4285F4',
    scopes: ['openid', 'profile', 'email'],
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    userInfoUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
  },
  spotify: {
    name: 'Spotify',
    icon: 'spotify',
    color: '#1DB954',
    scopes: ['user-read-email', 'user-read-private'],
    authUrl: 'https://accounts.spotify.com/authorize',
    tokenUrl: 'https://accounts.spotify.com/api/token',
    userInfoUrl: 'https://api.spotify.com/v1/me',
  },
  discord: {
    name: 'Discord',
    icon: 'discord',
    color: '#5865F2',
    scopes: ['identify', 'email'],
    authUrl: 'https://discord.com/api/oauth2/authorize',
    tokenUrl: 'https://discord.com/api/oauth2/token',
    userInfoUrl: 'https://discord.com/api/users/@me',
  },
  twitter: {
    name: 'Twitter',
    icon: 'twitter',
    color: '#1DA1F2',
    scopes: ['users.read', 'tweet.read'],
    authUrl: 'https://twitter.com/i/oauth2/authorize',
    tokenUrl: 'https://api.twitter.com/2/oauth2/token',
    userInfoUrl: 'https://api.twitter.com/2/users/me',
  },
}

// Get client ID from environment
const getClientId = (provider) => {
  const envKey = `VITE_${provider.toUpperCase()}_CLIENT_ID`
  return import.meta.env[envKey] || ''
}

// Get redirect URI
const getRedirectUri = (provider) => {
  const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin
  return `${baseUrl}/auth/callback/${provider}`
}

// Check if provider is configured
export const isProviderEnabled = (provider) => {
  return !!getClientId(provider)
}

// Get list of enabled providers
export const getEnabledProviders = () => {
  return Object.keys(PROVIDERS).filter(isProviderEnabled)
}

/**
 * Generate a random state for CSRF protection
 */
export const generateState = () => {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Generate PKCE code verifier and challenge
 */
export const generatePKCE = async () => {
  // Generate code verifier
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  const codeVerifier = base64UrlEncode(array)

  // Generate code challenge
  const encoder = new TextEncoder()
  const data = encoder.encode(codeVerifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  const codeChallenge = base64UrlEncode(new Uint8Array(digest))

  return { codeVerifier, codeChallenge }
}

// Base64 URL encode
const base64UrlEncode = (buffer) => {
  return btoa(String.fromCharCode(...buffer))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/**
 * Initiate OAuth flow for a provider
 */
export const initiateOAuth = async (provider, options = {}) => {
  const config = PROVIDERS[provider]
  if (!config) {
    throw new Error(`Unknown provider: ${provider}`)
  }

  const clientId = getClientId(provider)
  if (!clientId) {
    throw new Error(`Provider ${provider} is not configured. Set VITE_${provider.toUpperCase()}_CLIENT_ID`)
  }

  const { codeVerifier, codeChallenge } = await generatePKCE()
  const state = generateState()

  // Store PKCE verifier and state for callback
  sessionStorage.setItem(`oauth_verifier_${provider}`, codeVerifier)
  sessionStorage.setItem(`oauth_state_${provider}`, state)

  // Build authorization URL
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getRedirectUri(provider),
    response_type: 'code',
    scope: (options.scopes || config.scopes).join(' '),
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
    ...options.extraParams,
  })

  const authUrl = `${config.authUrl}?${params.toString()}`

  // Redirect to provider
  if (options.popup) {
    return openPopup(authUrl, provider)
  } else {
    window.location.href = authUrl
  }
}

/**
 * Open OAuth in popup window
 */
const openPopup = (url, provider) => {
  const width = 500
  const height = 600
  const left = window.screenX + (window.outerWidth - width) / 2
  const top = window.screenY + (window.outerHeight - height) / 2

  const popup = window.open(
    url,
    `oauth_${provider}`,
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
  )

  return new Promise((resolve, reject) => {
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        clearInterval(checkClosed)
        reject(new Error('Popup closed by user'))
      }
    }, 500)

    // Listen for message from popup
    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return

      if (event.data?.type === 'oauth_callback' && event.data?.provider === provider) {
        clearInterval(checkClosed)
        window.removeEventListener('message', handleMessage)
        popup.close()

        if (event.data.error) {
          reject(new Error(event.data.error))
        } else {
          resolve(event.data)
        }
      }
    }

    window.addEventListener('message', handleMessage)
  })
}

/**
 * Handle OAuth callback
 * Call this from your callback page
 */
export const handleOAuthCallback = async (provider) => {
  const config = PROVIDERS[provider]
  if (!config) {
    throw new Error(`Unknown provider: ${provider}`)
  }

  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  const state = params.get('state')
  const error = params.get('error')

  if (error) {
    throw new Error(params.get('error_description') || error)
  }

  if (!code) {
    throw new Error('No authorization code received')
  }

  // Verify state
  const storedState = sessionStorage.getItem(`oauth_state_${provider}`)
  if (state !== storedState) {
    throw new Error('Invalid state parameter')
  }

  // Get stored code verifier
  const codeVerifier = sessionStorage.getItem(`oauth_verifier_${provider}`)
  if (!codeVerifier) {
    throw new Error('No code verifier found')
  }

  // Clean up session storage
  sessionStorage.removeItem(`oauth_state_${provider}`)
  sessionStorage.removeItem(`oauth_verifier_${provider}`)

  // Exchange code for tokens
  // NOTE: This should be done on your backend for security
  // The client_secret should never be exposed in frontend code
  return {
    provider,
    code,
    codeVerifier,
    redirectUri: getRedirectUri(provider),
  }
}

/**
 * Post message to opener window (for popup flow)
 */
export const postOAuthResult = (data) => {
  if (window.opener) {
    window.opener.postMessage(
      { type: 'oauth_callback', ...data },
      window.location.origin
    )
    window.close()
  }
}

/**
 * Sign out / revoke token
 * NOTE: Actual token revocation should be done on backend
 */
export const signOut = (provider) => {
  // Clear any stored tokens
  localStorage.removeItem(`auth_token_${provider}`)
  sessionStorage.removeItem(`oauth_verifier_${provider}`)
  sessionStorage.removeItem(`oauth_state_${provider}`)
}

/**
 * Get stored auth token
 */
export const getStoredToken = (provider) => {
  try {
    const data = localStorage.getItem(`auth_token_${provider}`)
    if (!data) return null

    const parsed = JSON.parse(data)
    // Check if expired
    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
      localStorage.removeItem(`auth_token_${provider}`)
      return null
    }

    return parsed
  } catch {
    return null
  }
}

/**
 * Store auth token
 */
export const storeToken = (provider, token) => {
  const data = {
    ...token,
    storedAt: Date.now(),
    expiresAt: token.expires_in ? Date.now() + token.expires_in * 1000 : null,
  }
  localStorage.setItem(`auth_token_${provider}`, JSON.stringify(data))
}

/**
 * Normalize user profile from different providers
 */
export const normalizeUserProfile = (provider, data) => {
  switch (provider) {
    case 'google':
      return {
        id: data.sub,
        email: data.email,
        name: data.name,
        avatar: data.picture,
        provider,
      }
    case 'spotify':
      return {
        id: data.id,
        email: data.email,
        name: data.display_name,
        avatar: data.images?.[0]?.url,
        provider,
      }
    case 'discord':
      return {
        id: data.id,
        email: data.email,
        name: data.username,
        avatar: data.avatar
          ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`
          : null,
        provider,
      }
    case 'twitter':
      return {
        id: data.data?.id,
        email: null, // Twitter doesn't provide email by default
        name: data.data?.name,
        username: data.data?.username,
        avatar: data.data?.profile_image_url,
        provider,
      }
    default:
      return { ...data, provider }
  }
}

export default {
  PROVIDERS,
  isProviderEnabled,
  getEnabledProviders,
  generateState,
  generatePKCE,
  initiateOAuth,
  handleOAuthCallback,
  postOAuthResult,
  signOut,
  getStoredToken,
  storeToken,
  normalizeUserProfile,
}
