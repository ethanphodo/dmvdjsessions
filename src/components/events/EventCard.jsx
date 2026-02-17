import { motion } from 'framer-motion'
import { SERIES_COLORS } from '../../utils/constants'

function EventCard({ event }) {
  const {
    title,
    date,
    time,
    location,
    address,
    type,
    description,
    capacity,
    ticketUrl,
    status,
  } = event

  // Determine accent color based on location/type
  const getAccentColor = () => {
    if (location.toLowerCase().includes('studio') || address.toLowerCase().includes('dc')) {
      return SERIES_COLORS.studio
    }
    if (location.toLowerCase().includes('warehouse') || address.toLowerCase().includes('md')) {
      return SERIES_COLORS.warehouse
    }
    if (location.toLowerCase().includes('rooftop') || address.toLowerCase().includes('va')) {
      return SERIES_COLORS.rooftop
    }
    return SERIES_COLORS.studio
  }

  const accentColor = getAccentColor()

  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
  }

  const getTypeBadge = () => {
    switch (type) {
      case 'recording':
        return 'Recording'
      case 'live':
        return 'Live Event'
      case 'premiere':
        return 'Premiere'
      default:
        return type
    }
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative group overflow-hidden rounded-xl bg-white/5 border border-white/10 backdrop-blur-md"
    >
      {/* Dynamic Glow Background */}
      <div
        className="absolute -inset-1 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"
        style={{ background: `linear-gradient(135deg, ${accentColor}, transparent)` }}
      />

      <div className="relative">
        {/* Aspect Ratio Header */}
        <div className="relative aspect-[21/9] overflow-hidden bg-gradient-to-br from-[#1A1A1A] to-black">
          {/* Gradient accent */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 20% 80%, ${accentColor}50 0%, transparent 50%)`,
            }}
          />

          {/* Top Badge */}
          <div className="absolute top-4 left-4">
            <span
              className="bg-black/60 backdrop-blur-xl text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 border border-white/20 font-mono"
              style={{ color: accentColor }}
            >
              {getTypeBadge()}
            </span>
          </div>

          {/* Status badge */}
          {status === 'past' && (
            <span className="absolute top-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-xl text-[10px] font-mono uppercase tracking-wide text-white/50 border border-white/10">
              Past
            </span>
          )}

          {/* Date overlay */}
          <div className="absolute bottom-4 left-4">
            <p className="text-white/60 font-mono text-[10px] tracking-widest uppercase">
              {formatDate(date)} · {time}
            </p>
          </div>
        </div>

        <div className="p-6">
          {/* Title */}
          <h3 className="text-2xl font-black uppercase tracking-tighter text-white italic mb-2 group-hover:text-white/80 transition-colors">
            {title}
          </h3>

          {/* Location */}
          <p className="text-sm font-mono text-gray-400 uppercase tracking-widest mb-4">
            {location} — {address}
          </p>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
            {description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            {capacity && status !== 'past' && (
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                {capacity} capacity
              </span>
            )}
            {status === 'past' && (
              <span className="text-[10px] text-gray-600 uppercase tracking-widest font-mono">
                Event ended
              </span>
            )}

            {ticketUrl && status !== 'past' ? (
              <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-white text-black text-xs font-black uppercase italic tracking-widest hover:bg-opacity-90 transition-colors"
              >
                RSVP
              </a>
            ) : status !== 'past' ? (
              <span
                className="px-6 py-2.5 border text-xs font-mono uppercase tracking-widest"
                style={{ borderColor: `${accentColor}50`, color: accentColor }}
              >
                Free Entry
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default EventCard
