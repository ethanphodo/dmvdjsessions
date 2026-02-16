import { formatDate, formatDuration } from '../../utils/helpers'
import Badge from '../ui/Badge'

export default function VideoCard({
  video,
  onSelect,
  isSelected = false,
  className = '',
}) {
  const {
    title,
    djName,
    date,
    duration,
    genres,
    thumbnail,
    series,
    views,
  } = video

  return (
    <div
      onClick={() => onSelect?.(video)}
      className={`
        group border bg-[#0A0A0A]
        hover:border-[#E21D1D] hover:shadow-[4px_4px_0_0_#E21D1D]
        transition-all duration-75 cursor-cross
        ${isSelected ? 'border-[#E21D1D]' : 'border-[#1A1A1A]'}
        ${className}
      `}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-[#1A1A1A] overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs text-[#888] uppercase">
              THUMBNAIL
            </span>
          </div>
        )}

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80">
          <span className="font-mono text-[10px] text-white">
            {formatDuration(duration)}
          </span>
        </div>

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-[#E21D1D] flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Series Badge */}
        <div className="mb-2">
          <Badge variant={series === 'studio' ? 'active' : 'default'}>
            {series.toUpperCase()}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="text-sm font-black uppercase tracking-tighter mb-1 text-white group-hover:text-[#E21D1D] transition-colors">
          {title}
        </h3>

        {/* DJ Name */}
        <p className="font-mono text-xs text-[#888] uppercase mb-2">
          {djName}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between font-mono text-[10px] text-[#888] uppercase">
          <span>{formatDate(date)}</span>
          {views && <span>{views.toLocaleString()} views</span>}
        </div>

        {/* Genres */}
        <div className="mt-3 flex flex-wrap gap-1">
          {genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 bg-[#1A1A1A] font-mono text-[10px] text-[#888] uppercase"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
