import { motion } from 'framer-motion'
import { useTheme } from '../../contexts/ThemeContext'

/**
 * Theme Toggle Button
 * Cycles through dark, light, and system themes
 */
export default function ThemeToggle({ className = '' }) {
  const { theme, resolvedTheme, cycleTheme, isDark } = useTheme()

  // Get label for current theme
  const getLabel = () => {
    switch (theme) {
      case 'dark':
        return 'Dark'
      case 'light':
        return 'Light'
      case 'system':
        return 'System'
      default:
        return 'Theme'
    }
  }

  return (
    <button
      onClick={cycleTheme}
      className={`group relative flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
        isDark
          ? 'hover:bg-white/10 text-gray-400 hover:text-white'
          : 'hover:bg-black/10 text-gray-600 hover:text-black'
      } ${className}`}
      title={`Current: ${getLabel()}. Click to change.`}
      aria-label={`Theme: ${getLabel()}. Click to cycle themes.`}
    >
      {/* Icon container with animation */}
      <div className="relative w-5 h-5">
        {/* Sun icon (light mode) */}
        <motion.svg
          className="absolute inset-0 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1,
            rotate: isDark ? -90 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </motion.svg>

        {/* Moon icon (dark mode) */}
        <motion.svg
          className="absolute inset-0 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5,
            rotate: isDark ? 0 : 90,
          }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </motion.svg>
      </div>

      {/* System indicator dot */}
      {theme === 'system' && (
        <motion.span
          className="absolute -top-1 -right-1 w-2 h-2 bg-[#D6A756] rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}
    </button>
  )
}

/**
 * Expanded Theme Selector
 * Shows all three options with labels
 */
export function ThemeSelector({ className = '' }) {
  const { theme, setTheme, isDark } = useTheme()

  const options = [
    { value: 'light', label: 'Light', icon: SunIcon },
    { value: 'dark', label: 'Dark', icon: MoonIcon },
    { value: 'system', label: 'System', icon: ComputerIcon },
  ]

  return (
    <div className={`flex items-center gap-1 p-1 rounded-lg ${
      isDark ? 'bg-white/5' : 'bg-black/5'
    } ${className}`}>
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-all ${
            theme === value
              ? isDark
                ? 'bg-white/10 text-white'
                : 'bg-black/10 text-black'
              : isDark
                ? 'text-gray-500 hover:text-white'
                : 'text-gray-500 hover:text-black'
          }`}
          aria-pressed={theme === value}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  )
}

// Icon components
function SunIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}

function MoonIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}

function ComputerIcon({ className }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  )
}
