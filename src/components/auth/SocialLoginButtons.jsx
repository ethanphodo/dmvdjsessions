import { motion } from 'framer-motion'
import { useSocialAuth } from '../../hooks/useSocialAuth'
import { useTheme } from '../../contexts/ThemeContext'

/**
 * Social Login Provider Icons
 */
const ProviderIcon = ({ provider, className = 'w-5 h-5' }) => {
  switch (provider) {
    case 'google':
      return (
        <svg className={className} viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      )
    case 'spotify':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      )
    case 'discord':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
      )
    case 'twitter':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    default:
      return null
  }
}

/**
 * Social Login Buttons Component
 * Displays buttons for enabled OAuth providers
 */
export default function SocialLoginButtons({
  onSuccess,
  onError,
  className = '',
  layout = 'vertical', // 'vertical' | 'horizontal' | 'icons'
  size = 'default', // 'small' | 'default' | 'large'
  showLabels = true,
}) {
  const { providers, signIn, isLoading, error } = useSocialAuth()
  const { isDark } = useTheme()

  const handleSignIn = async (provider) => {
    try {
      await signIn(provider)
      onSuccess?.()
    } catch (err) {
      onError?.(err)
    }
  }

  if (providers.length === 0) {
    return null
  }

  const sizeClasses = {
    small: 'px-3 py-2 text-sm gap-2',
    default: 'px-4 py-3 text-base gap-3',
    large: 'px-6 py-4 text-lg gap-4',
  }

  const iconSizes = {
    small: 'w-4 h-4',
    default: 'w-5 h-5',
    large: 'w-6 h-6',
  }

  const layoutClasses = {
    vertical: 'flex flex-col gap-3',
    horizontal: 'flex flex-wrap gap-3',
    icons: 'flex gap-2 justify-center',
  }

  return (
    <div className={`${layoutClasses[layout]} ${className}`}>
      {providers.map((provider) => (
        <motion.button
          key={provider.key}
          onClick={() => handleSignIn(provider.key)}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            flex items-center justify-center rounded-lg font-medium transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
            ${layout === 'icons' ? 'p-3' : sizeClasses[size]}
            ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                : 'bg-black/5 hover:bg-black/10 text-black border border-black/10'
            }
          `}
          style={{
            '--provider-color': provider.color,
          }}
        >
          <span
            className={iconSizes[size]}
            style={{ color: provider.color }}
          >
            <ProviderIcon provider={provider.key} className="w-full h-full" />
          </span>
          {showLabels && layout !== 'icons' && (
            <span>Continue with {provider.name}</span>
          )}
        </motion.button>
      ))}

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Compact version - just icons
 */
export function SocialLoginIcons({ onSuccess, onError, className = '' }) {
  return (
    <SocialLoginButtons
      onSuccess={onSuccess}
      onError={onError}
      className={className}
      layout="icons"
      showLabels={false}
    />
  )
}

/**
 * Single provider button
 */
export function ProviderButton({
  provider,
  onSuccess,
  onError,
  className = '',
  children,
}) {
  const { signIn, isLoading } = useSocialAuth()
  const { isDark } = useTheme()
  const config = provider.key ? provider : { key: provider, ...require('../../utils/socialAuth').PROVIDERS[provider] }

  const handleClick = async () => {
    try {
      await signIn(config.key)
      onSuccess?.()
    } catch (err) {
      onError?.(err)
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${
          isDark
            ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
            : 'bg-black/5 hover:bg-black/10 text-black border border-black/10'
        }
        ${className}
      `}
    >
      <span style={{ color: config.color }}>
        <ProviderIcon provider={config.key} />
      </span>
      {children || `Continue with ${config.name}`}
    </motion.button>
  )
}
