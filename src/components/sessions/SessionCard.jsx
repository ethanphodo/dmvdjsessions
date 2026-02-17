import { SERIES_COLORS } from '../../utils/constants'

function SessionCard({
  title,
  djName,
  date,
  series = 'studio',
  thumbnail,
  status,
  onClick,
}) {
  const seriesColor = SERIES_COLORS[series] || SERIES_COLORS.studio

  return (
    <div
      className="group cursor-pointer hover-scale-card"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Image container */}
      <div className="relative aspect-video bg-[#0A0A0A] overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-[#333] text-sm uppercase tracking-wide">
              Coming Soon
            </span>
          </div>
        )}

        {/* Series color bar at top */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: seriesColor }}
        />

        {/* Status badge */}
        {status && (
          <span className="absolute top-4 right-4 px-3 py-1 bg-black/80 text-[10px] font-medium uppercase tracking-wide text-white border border-[#333]">
            {status}
          </span>
        )}
      </div>

      {/* Text below */}
      <div className="pt-4">
        <h3 className="text-xl font-bold uppercase tracking-tight text-white group-hover:text-[#888] transition-colors">
          {title}
        </h3>
        {djName && (
          <p className="text-sm text-[#888] mt-1">{djName}</p>
        )}
        {date && (
          <p className="text-xs text-[#666] mt-2">{date}</p>
        )}
      </div>
    </div>
  )
}

export default SessionCard
