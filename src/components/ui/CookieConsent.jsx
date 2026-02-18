import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { setAnalyticsConsent, hasAnalyticsConsent } from '../../utils/analytics'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = localStorage.getItem('analytics-consent')
    if (consentStatus === null) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAcceptAll = () => {
    setPreferences({ necessary: true, analytics: true })
    setAnalyticsConsent(true)
    localStorage.setItem('cookie-preferences', JSON.stringify({ necessary: true, analytics: true }))
    setIsVisible(false)
  }

  const handleDecline = () => {
    setPreferences({ necessary: true, analytics: false })
    setAnalyticsConsent(false)
    localStorage.setItem('cookie-preferences', JSON.stringify({ necessary: true, analytics: false }))
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    setAnalyticsConsent(preferences.analytics)
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences))
    setIsVisible(false)
    setShowPreferences(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-lg shadow-2xl overflow-hidden">
            {!showPreferences ? (
              /* Main Banner */
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">We value your privacy</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      We use cookies to enhance your experience and analyze site traffic.
                      You can customize your preferences or accept all cookies.{' '}
                      <Link to="/privacy" className="text-[#D6A756] hover:underline">
                        Learn more
                      </Link>
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="px-4 py-2.5 text-sm text-gray-400 hover:text-white border border-white/20 hover:border-white/40 rounded transition-colors"
                    >
                      Customize
                    </button>
                    <button
                      onClick={handleDecline}
                      className="px-4 py-2.5 text-sm text-gray-400 hover:text-white border border-white/20 hover:border-white/40 rounded transition-colors"
                    >
                      Decline
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="px-6 py-2.5 text-sm font-medium bg-white text-black hover:bg-gray-200 rounded transition-colors"
                    >
                      Accept All
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Preferences Panel */
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-medium">Cookie Preferences</h3>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="text-gray-500 hover:text-white transition-colors"
                    aria-label="Close preferences"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-medium text-sm">Essential Cookies</h4>
                        <span className="px-2 py-0.5 text-xs bg-white/10 text-gray-400 rounded">Required</span>
                      </div>
                      <p className="text-gray-500 text-sm">
                        These cookies are necessary for the website to function and cannot be disabled.
                      </p>
                    </div>
                    <div className="pt-1">
                      <div className="w-10 h-6 bg-[#D6A756] rounded-full flex items-center justify-end px-1 opacity-60 cursor-not-allowed">
                        <div className="w-4 h-4 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-lg">
                    <div className="flex-1">
                      <h4 className="text-white font-medium text-sm mb-1">Analytics Cookies</h4>
                      <p className="text-gray-500 text-sm">
                        Help us understand how visitors interact with our website by collecting anonymous information.
                      </p>
                    </div>
                    <div className="pt-1">
                      <button
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                        className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.analytics ? 'bg-[#D6A756] justify-end' : 'bg-white/20 justify-start'
                        }`}
                        role="switch"
                        aria-checked={preferences.analytics}
                      >
                        <div className="w-4 h-4 bg-white rounded-full shadow" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-white/10">
                  <button
                    onClick={handleDecline}
                    className="px-4 py-2.5 text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Decline All
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-2.5 text-sm font-medium bg-white text-black hover:bg-gray-200 rounded transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
