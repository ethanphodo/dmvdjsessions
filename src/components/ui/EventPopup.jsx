import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useExitIntent } from '../../hooks/useExitIntent'
import { getUpcomingEvents } from '../../data/events'
import { SERIES_COLORS } from '../../utils/constants'

function EventPopup({ delay = 30000 }) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  const upcomingEvents = getUpcomingEvents()
  const nextEvent = upcomingEvents[0]

  // Exit-intent trigger
  const handleExitIntent = useCallback(() => {
    const wasDismissed = sessionStorage.getItem('eventPopupDismissed')
    if (!hasShown && !wasDismissed && nextEvent) {
      setIsVisible(true)
      setHasShown(true)
    }
  }, [hasShown, nextEvent])

  useExitIntent(handleExitIntent)

  const handleClose = () => {
    setIsVisible(false)
    sessionStorage.setItem('eventPopupDismissed', 'true')
  }

  if (!nextEvent) return null

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  // Determine accent based on location
  const getAccent = () => {
    if (nextEvent.address.toLowerCase().includes('dc')) return SERIES_COLORS.studio
    if (nextEvent.address.toLowerCase().includes('md')) return SERIES_COLORS.warehouse
    if (nextEvent.address.toLowerCase().includes('va')) return SERIES_COLORS.rooftop
    return SERIES_COLORS.studio
  }

  const accent = getAccent()

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Flyer Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0A0A0A] border border-white/20 overflow-hidden rounded-2xl"
            style={{ boxShadow: `0 0 60px ${accent}15` }}
          >
            {/* Visual Header */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-black">
              {/* Gradient overlay with accent */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `radial-gradient(circle at 30% 50%, ${accent}40 0%, transparent 60%)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />

              {/* Content */}
              <div className="absolute bottom-6 left-6 right-6">
                <p
                  className="font-mono text-[10px] tracking-[0.4em] uppercase mb-2"
                  style={{ color: accent }}
                >
                  Exclusive Access
                </p>
                <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
                  {nextEvent.title}
                </h2>
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content & Urgency */}
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-center border-y border-white/10 py-4">
                <div>
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">Date</p>
                  <p className="text-xl font-bold text-white uppercase italic">
                    {formatDate(nextEvent.date)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest">Location</p>
                  <p className="text-sm font-mono text-white">{nextEvent.address}</p>
                </div>
              </div>

              {nextEvent.capacity && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '76%' }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                  </div>
                  <span className="text-xs font-mono text-white/60">
                    {Math.round(nextEvent.capacity * 0.76)}/{nextEvent.capacity} spots filled
                  </span>
                </div>
              )}

              <p className="text-gray-400 text-sm leading-relaxed">
                {nextEvent.description}
              </p>

              <Link
                to="/events"
                onClick={handleClose}
                className="block w-full py-4 bg-white text-black font-black uppercase italic tracking-widest hover:bg-opacity-90 transition-colors duration-300 text-center text-sm"
              >
                View All Events
              </Link>

              <button
                onClick={handleClose}
                className="w-full text-[10px] text-gray-600 uppercase tracking-[0.3em] hover:text-white transition-colors"
              >
                Maybe Next Time
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default EventPopup
