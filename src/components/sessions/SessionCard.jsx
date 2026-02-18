import { motion } from 'framer-motion'
import { SERIES_COLORS } from '../../utils/constants'
import OptimizedImage from '../ui/OptimizedImage'

function SessionCard({
  title,
  djName,
  date,
  series = 'studio',
  thumbnail,
  status,
  isNew,
  isFeatured,
  genres = [],
  onClick,
}) {
  const seriesColor = SERIES_COLORS[series] || SERIES_COLORS.studio

  // Build accessible label
  const ariaLabel = [
    title,
    djName && `by ${djName}`,
    status && `(${status})`,
    isNew && 'New',
    isFeatured && 'Featured',
  ]
    .filter(Boolean)
    .join(' ')

  const handleKeyDown = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative group cursor-pointer"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? ariaLabel : undefined}
    >
      {/* Dynamic Glow Background */}
      <div
        className="absolute -inset-1 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-500"
        style={{ background: `linear-gradient(135deg, ${seriesColor}, transparent)` }}
      />

      <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
        {/* Image container */}
        <div className="relative aspect-video overflow-hidden scanlines">
          {thumbnail ? (
            <OptimizedImage
              src={thumbnail}
              alt={title}
              className="grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-110 group-hover:scale-100"
              wrapperClassName="absolute inset-0"
              aspectRatio="16/9"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1A1A1A] to-black">
              {/* Gradient accent */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at 30% 70%, ${seriesColor}60 0%, transparent 50%)`,
                }}
              />
              <span className="relative text-white/30 text-sm uppercase tracking-[0.3em] font-mono">
                Coming Soon
              </span>
            </div>
          )}

          {/* Series color bar at top */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: seriesColor }}
          />

          {/* Badges - top left */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {isNew && (
              <span className="font-display bg-white text-black text-[10px] font-bold uppercase tracking-wide-caps px-3 py-1">
                New
              </span>
            )}
            {isFeatured && (
              <span
                className="font-display text-[10px] font-bold uppercase tracking-wide-caps px-3 py-1"
                style={{ backgroundColor: seriesColor, color: '#000' }}
              >
                Featured
              </span>
            )}
          </div>

          {/* Status badge - top right */}
          {status && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-xl font-technical text-[9px] uppercase tracking-wide-caps text-white border border-white/20">
              {status}
            </span>
          )}

          {/* Play overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20"
              style={{ backgroundColor: `${seriesColor}80` }}
            >
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Text below */}
        <div className="p-5">
          <h3 className="font-display text-xl font-bold italic uppercase tracking-ultra-tight text-white group-hover:text-white/80 transition-colors">
            {title}
          </h3>
          {djName && (
            <p className="font-technical text-xs text-gray-400 mt-1 uppercase tracking-super-wide">{djName}</p>
          )}
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="font-technical text-[9px] uppercase tracking-wide-caps px-2 py-1 border border-white/10 text-gray-500"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
          {date && (
            <p className="font-technical text-[9px] text-gray-600 mt-3 uppercase tracking-super-wide">{date}</p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default SessionCard
